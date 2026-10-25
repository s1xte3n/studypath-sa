import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { validateStudentEntries } from "./domain/student-input-validation.mjs";
import { buildPathwayResults } from "./domain/pathway-matching.mjs";
import { getDiscoverySummary } from "./domain/discovery-summary.mjs";
import { calculateProvisionalAps, APS_SOURCE } from "./domain/eligibility/provisional-aps.mjs";
import catalogue from "../docs/product/uj-2027-pilot-catalogue-draft.json";

const STAGES = [
  { value: "GRADE_11", label: "Grade 11" },
  { value: "GRADE_12", label: "Grade 12" },
  { value: "MATRIC_GRADUATE", label: "Matric graduate" }
];

const SUBJECTS = [
  "English Home Language",
  "English First Additional Language",
  "English Second Additional Language",
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Geography",
  "History",
  "Business Studies",
  "Accounting",
  "Life Orientation"
];

const STATE_LABELS = {
  ELIGIBLE: "Provisional match",
  NOT_ELIGIBLE: "Not eligible",
  UNKNOWN: "Unknown"
};

function getStateClass(state) {
  return `state-${state.toLowerCase().replaceAll("_", "-")}`;
}

function PathwayDetails({ item }) {
  return (
    <details className="pathway-details">
      <summary>View pathway details and next steps</summary>
      <div className="pathway-details-content">
        <dl className="pathway-facts">
          {item.code && <div><dt>Programme code</dt><dd>{item.code}</dd></div>}
          {item.faculty && <div><dt>Faculty / college</dt><dd>{item.faculty}</dd></div>}
          {item.campus && <div><dt>Campus</dt><dd>{item.campus}</dd></div>}
          {item.durationYears && <div><dt>Published duration</dt><dd>{item.durationYears} years (confirm with UJ)</dd></div>}
          <div><dt>Eligibility</dt><dd>{STATE_LABELS[item.state]} — {item.limitation}</dd></div>
          <div><dt>Costs, deadlines and funding</dt><dd>Not provided in this catalogue. Check current official UJ information; no estimate is shown.</dd></div>
        </dl>
        <section className="requirement-evidence" aria-labelledby={`requirement-evidence-${item.id}`}>
          <h4 id={`requirement-evidence-${item.id}`}>Requirement-by-requirement check</h4>
          <p className="requirement-evidence-intro">These comparisons use the rules and source records currently stored in the demo catalogue. “Unknown” means the available information is insufficient; it is not a rejection.</p>
          {item.requirementEvidence?.length ? (
            <ul className="requirement-evidence-list">
              {item.requirementEvidence.map(check => (
                <li className="requirement-evidence-item" key={check.id}>
                  <div className="requirement-evidence-heading">
                    <strong>{check.label}</strong>
                    <span className={`requirement-check-state evidence-state-${check.status.toLowerCase().replaceAll("_", "-")}`}>
                      {check.status === "MET" ? "Meets recorded rule" : check.status === "NOT_MET" ? "Does not meet recorded rule" : check.status === "NOT_APPLICABLE" ? "Not applicable" : "Unknown"}
                    </span>
                  </div>
                  <dl className="requirement-evidence-facts">
                    <div><dt>Recorded rule</dt><dd>{check.rule}</dd></div>
                    <div><dt>Your input</dt><dd>{check.learnerValue}</dd></div>
                  </dl>
                  <p>{check.explanation}</p>
                  {check.sourceLinks?.length > 0 ? (
                    <ul className="requirement-source-links">
                      {check.sourceLinks.map(source => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>{source.location && <span className="source-meta"> · {source.location}</span>}{source.verificationDate && <span className="source-meta"> · Source checked {source.verificationDate}</span>}</li>)}
                    </ul>
                  ) : <p className="source-meta">No source link is attached to this recorded rule.</p>}
                </li>
              ))}
            </ul>
          ) : <p>No requirement-level evidence is available for this pathway result.</p>}
          <p className="requirement-evidence-caveat">This is a provisional comparison, not an admission decision. Source links show evidence recorded by StudyPath and do not by themselves prove that a rule is current or complete.</p>
        </section>
        {item.requirementNotes.length > 0 && (
          <div className="detail-note">
            <h4>Items still requiring confirmation</h4>
            <ul>{item.requirementNotes.map(note => <li key={note}>{note}</li>)}</ul>
          </div>
        )}
        <div className="official-links">
          <h4>Official information</h4>
          {item.sourceLinks.length > 0 ? (
            <ul>
              {item.sourceLinks.map(source => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <span aria-hidden="true">↗</span></a>
                  {source.role && <span className="source-role"> — {source.role}</span>}
                  {source.location && <span className="source-meta"> · {source.location}</span>}
                  {source.verificationDate && <span className="source-meta"> · Source checked {source.verificationDate}</span>}
                </li>
              ))}
            </ul>
          ) : <p>No programme-specific source link is recorded. Visit the official UJ website to find current information.</p>}
          <p className="application-note">These links provide information only. StudyPath does not submit applications.</p>
        </div>
      </div>
    </details>
  );
}

function ProvisionalApsPanel({ subjects }) {
  const estimate = calculateProvisionalAps(subjects);
  return (
    <section className="aps-panel" aria-labelledby="aps-title">
      <p className="eyebrow">YOUR MARKS · INDICATIVE ONLY</p>
      <h3 id="aps-title">Provisional APS estimate</h3>
      <p className="aps-caveat">Based on mark-to-level bands recorded in the UJ 2027 Undergraduate Prospectus (printed p. 16). This hackathon estimate uses the project-owner-approved catalogue for demo scope only; it is not an official or verified APS result. Source-version and subject-selection rules are not approved for definitive screening.</p>
      {estimate.state === "PROVISIONAL" ? (
        <>
          <p className="aps-total"><span>Indicative total</span><strong>{estimate.aps}</strong></p>
          <h4>Subjects counted</h4>
          <ul className="aps-subject-list">
            {estimate.includedSubjects.map(row => <li key={row.subject}><span>{row.subject} · {row.mark}%</span><strong>Level {row.level}</strong></li>)}
          </ul>
          {estimate.excludedSubjects.length > 0 && <p className="aps-excluded">Excluded: {estimate.excludedSubjects.map(row => row.subject).join(", ")}.</p>}
        </>
      ) : (
        <p className={estimate.state === "INPUT_REJECTED" ? "aps-error" : "aps-pending"} role="status">{estimate.reason}</p>
      )}
      {estimate.state === "PROVISIONAL" && <p className="aps-limitation">{estimate.reason}</p>}
      <p className="aps-source">Sources: <a href={APS_SOURCE.url} target="_blank" rel="noopener noreferrer">{APS_SOURCE.title} <span aria-hidden="true">↗</span></a> · printed p. {APS_SOURCE.printedPage}; <a href={APS_SOURCE.policyUrl} target="_blank" rel="noopener noreferrer">{APS_SOURCE.policyTitle} <span aria-hidden="true">↗</span></a>. Provisional demo rule.</p>
      <p className="aps-limitation">This is separate from NSC pass or achievement status. Life Orientation is excluded from this provisional UJ APS input. A total is shown only when exactly six supported non-Life-Orientation subjects are supplied. Fewer or more than six returns UNKNOWN: the applicable selection and programme-required-subject rules have not been verified, so the demo does not choose a subset. This estimate never changes pathway eligibility.</p>
    </section>
  );
}


function PathwayComparison({ items }) {
  return (
    <section className="comparison-section" aria-labelledby="comparison-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">COMPARE YOUR OPTIONS</p>
          <h2 id="comparison-title">Compare saved pathways</h2>
        </div>
        <span className="step-count">{items.length} / 3 SAVED</span>
      </div>
      {items.length === 0 ? (
        <p className="comparison-empty">Save up to three pathways from the results above to compare the details the current catalogue actually provides.</p>
      ) : (
        <div className="comparison-table-wrap" role="region" aria-label="Saved pathway comparison table" tabIndex="0">
          <table className="comparison-table">
            <caption>Comparison of saved pathways. Missing catalogue fields are labelled as not recorded.</caption>
            <thead>
              <tr>
                <th scope="col">Pathway</th>
                <th scope="col">Institution</th>
                <th scope="col">Campus</th>
                <th scope="col">Programme code</th>
                <th scope="col">Duration</th>
                <th scope="col">Eligibility state and explanation</th>
                <th scope="col">Official source links</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <th scope="row">{item.name}</th>
                  <td>{item.institution || "Not recorded"}</td>
                  <td>{item.campus || "Not recorded"}</td>
                  <td>{item.code || "Not recorded"}</td>
                  <td>{item.durationYears ? `${item.durationYears} years (confirm with UJ)` : "Not recorded"}</td>
                  <td>
                    <span className={`eligibility-state ${getStateClass(item.state)}`}>{STATE_LABELS[item.state] || "Unknown"}</span>
                    <p className="comparison-explanation">{item.reason || "No explanation is recorded for this result."}</p>
                    {item.requirementNotes?.length > 0 && (
                      <details className="comparison-notes">
                        <summary>Unresolved requirements ({item.requirementNotes.length})</summary>
                        <ul>{item.requirementNotes.map(note => <li key={note}>{note}</li>)}</ul>
                      </details>
                    )}
                  </td>
                  <td>
                    {item.sourceLinks?.length > 0 ? (
                      <ul className="comparison-sources">
                        {item.sourceLinks.map(source => (
                          <li key={source.url}>
                            <a href={source.url} target="_blank" rel="noopener noreferrer">{source.title} <span aria-hidden="true">↗</span></a>
                            {source.location && <span className="source-meta"> · {source.location}</span>}
                          </li>
                        ))}
                      </ul>
                    ) : "No programme-specific source link recorded."}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [stage, setStage] = useState("");
  const [subjects, setSubjects] = useState([{ subject: "", mark: "" }]);
  const [notice, setNotice] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ stage: "", subjects: {} });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const [savedPathways, setSavedPathways] = useState([]);
  const [tracking, setTracking] = useState({});
  const [eligibilityFilter, setEligibilityFilter] = useState("ALL");
  const [campusFilter, setCampusFilter] = useState("ALL");
  const TRACKING_STATUSES = [
    { value: "NOT_STARTED", label: "Not started" },
    { value: "RESEARCHING", label: "Researching requirements" },
    { value: "PREPARING", label: "Preparing application" },
    { value: "SUBMITTED", label: "Marked as submitted" },
    { value: "FOLLOW_UP", label: "Follow-up needed" },
    { value: "OUTCOME_RECEIVED", label: "Outcome received" }
  ];

  function toggleSavedPathway(item) {
    setSavedPathways(current => current.some(saved => saved.id === item.id)
      ? current.filter(saved => saved.id !== item.id)
      : current.length < 3 ? [...current, item] : current);
  }

  function updateTracking(id, field, value) {
    setTracking(current => ({
      ...current,
      [id]: { status: current[id]?.status || "NOT_STARTED", nextAction: current[id]?.nextAction || "", [field]: value }
    }));
  }

  function clearResults() {
    setResults([]);
    setSavedPathways([]);
    setTracking({});
    setEligibilityFilter("ALL");
    setCampusFilter("ALL");
    setSubmitted(false);
    setNotice("");
    setFieldErrors({ stage: "", subjects: {} });
  }

  function updateSubject(index, field, value) {
    setSubjects(current => current.map((item, i) => i === index ? { ...item, [field]: value } : item));
    clearResults();
  }

  function addSubject() {
    setSubjects(current => [...current, { subject: "", mark: "" }]);
    clearResults();
  }

  function removeSubject(index) {
    setSubjects(current => current.filter((_, i) => i !== index));
    clearResults();
  }

  function resetForm() {
    setStage("");
    setSubjects([{ subject: "", mark: "" }]);
    setResults([]);
    setSavedPathways([]);
    setTracking({});
    setEligibilityFilter("ALL");
    setCampusFilter("ALL");
    setNotice("");
    setFieldErrors({ stage: "", subjects: {} });
    setSubmitted(false);
  }

  function submitForm(event) {
    event.preventDefault();
    const errors = validateStudentEntries({ stage, subjects });
    if (errors.length) {
      const nextFieldErrors = { stage: "", subjects: {} };
      for (const error of errors) {
        if (error.startsWith("Select your current")) {
          nextFieldErrors.stage = error;
          continue;
        }
        if (error.includes("is listed more than once.")) {
          const duplicateSubject = error.slice(0, error.indexOf(" is listed more than once."));
          subjects.forEach((item, duplicateIndex) => {
            if (item.subject === duplicateSubject) {
              const duplicateErrors = nextFieldErrors.subjects[duplicateIndex] || { subject: [], mark: [] };
              duplicateErrors.subject.push(error);
              nextFieldErrors.subjects[duplicateIndex] = duplicateErrors;
            }
          });
          continue;
        }
        const row = error.match(/row (\d+)/)?.[1];
        if (!row) continue;
        const index = Number(row) - 1;
        const rowErrors = nextFieldErrors.subjects[index] || { subject: [], mark: [] };
        if (error.startsWith("Choose a subject") || error.startsWith("Choose a supported subject")) {
          rowErrors.subject.push(error);
        } else if (error.startsWith("Enter a whole-number mark")) {
          rowErrors.mark.push(error);
        }
        nextFieldErrors.subjects[index] = rowErrors;
      }
      setFieldErrors(nextFieldErrors);
      setResults([]);
      setNotice(errors.join(" "));
      setSubmitted(false);
      return;
    }
    setFieldErrors({ stage: "", subjects: {} });

    try {
      const nextResults = buildPathwayResults({ stage, subjects }, catalogue);
      if (nextResults.length === 0) {
        setResults([]);
        setNotice("No pathways are available from the current draft catalogue. Check the official UJ sources or try again later; this is not an admission decision.");
        setSubmitted(true);
        return;
      }
      setResults(nextResults);
      setNotice("Pathway exploration completed. Results compare your marks with minimum requirements currently recorded in the UJ 2027 pilot catalogue. Outcomes are provisional, and meeting listed minimums does not guarantee admission.");
      setSubmitted(true);
    } catch {
      setResults([]);
      setNotice("We could not evaluate these entries. Check the subjects and marks, then try again.");
      setSubmitted(false);
    }
  }

  const discovery = getDiscoverySummary({ stage, subjects, results, eligibilityFilter, campusFilter });

  return (
    <div className={`app-shell ${darkMode ? "theme-dark" : "theme-light"}`}>
      <header className="topbar">
        <a className="wordmark" href="#home"><span className="mark">S</span> StudyPath <span className="country">SA</span></a>
        <div className="topbar-actions">
          <span className="topbar-note">Study options, made clearer</span>
          <button className="theme-toggle" type="button" onClick={() => setDarkMode(current => !current)} aria-pressed={darkMode} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            <span aria-hidden="true">{darkMode ? "☀" : "◐"}</span> {darkMode ? "Light mode" : "Dark mode"}
          </button>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">YOUR NEXT STEP STARTS HERE</p>
            <h1>Find a study path<br /><span>that fits your future.</span></h1>
            <p className="hero-copy">Explore study options using your subjects and marks. See what is known, what still needs checking, and where to find official information.</p>
            <div className="privacy-note" role="note">
              <span className="privacy-icon" aria-hidden="true">●</span>
              <div><strong>Private by design in this demo</strong><p>Your entries and results stay in this page's memory. They are not sent to a server or saved across a reload. Use fictional details only.</p></div>
            </div>
          </div>
          <aside className="hero-visual" aria-label="How StudyPath works">
            <div className="visual-card visual-card-input">
              <span className="visual-step">01</span>
              <span className="visual-card-title">Your subjects</span>
              <span className="visual-lines" aria-hidden="true"><i></i><i></i><i></i></span>
            </div>
            <span className="visual-connector" aria-hidden="true">↓</span>
            <div className="visual-card visual-card-pathway">
              <span className="visual-step">02</span>
              <span className="visual-card-title">Study pathways</span>
              <span className="visual-status"><span aria-hidden="true"></span> Check what is known</span>
            </div>
            <span className="visual-connector" aria-hidden="true">↓</span>
            <div className="visual-card visual-card-source">
              <span className="visual-step">03</span>
              <span className="visual-card-title">Official sources</span>
              <span className="visual-status">Your next step</span>
            </div>
          </aside>
        </section>

        <section className="explorer" aria-labelledby="explorer-title">
          <div className="section-heading">
            <div><p className="eyebrow">STEP 1 · YOUR STARTING POINT</p><h2 id="explorer-title">Tell us about your studies</h2></div>
            <span className="step-count">01 / 03</span>
          </div>
          <p className="section-copy">No account is needed. Add the subjects and marks you want to explore. Use whole-number marks from 0 to 100.</p>
          <p className="aps-caveat" role="note">An NSC subject profile commonly contains seven subjects. You can enter all seven here. This demo does not determine whether you have passed the NSC or achieved a Bachelor’s, Diploma or Higher Certificate access level. The separate provisional UJ APS estimate uses exactly six supported non-Life-Orientation subjects only when exactly six are entered; it does not choose the top six automatically. <a href="https://www.education.gov.za/Informationfor/Learners/SubjectChoiceandCareerPathing.aspx" target="_blank" rel="noopener noreferrer">Read the Department of Basic Education’s subject guidance</a>.</p>

          <form onSubmit={submitForm} noValidate>
            <label className="field-label" htmlFor="stage">Your current stage <span aria-hidden="true">*</span></label>
            <select id="stage" value={stage} aria-invalid={Boolean(fieldErrors.stage)} aria-describedby={fieldErrors.stage ? "stage-error" : undefined} onChange={event => { setStage(event.target.value); clearResults(); }} required>
              <option value="">Choose current stage</option>
              {STAGES.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            {fieldErrors.stage && <p className="field-error" id="stage-error">{fieldErrors.stage}</p>}

            <div className="subject-heading"><span className="field-label">Subjects and marks <span aria-hidden="true">*</span></span><span className="hint">Whole numbers · 0–100</span></div>
            <div className="subject-list">
              {subjects.map((item, index) => (
                <div className="subject-row" key={index}>
                  <label className="visually-hidden" htmlFor={`subject-${index}`}>Subject {index + 1}</label>
                  <select id={`subject-${index}`} value={item.subject} aria-invalid={Boolean(fieldErrors.subjects[index]?.subject?.length)} aria-describedby={fieldErrors.subjects[index]?.subject?.length ? `subject-error-${index}` : undefined} onChange={event => updateSubject(index, "subject", event.target.value)} required>
                    <option value="">Choose a subject</option>
                    {SUBJECTS.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                  <label className="visually-hidden" htmlFor={`mark-${index}`}>Mark for subject {index + 1}</label>
                  <input id={`mark-${index}`} inputMode="numeric" type="number" min="0" max="100" step="1" placeholder="Mark %" value={item.mark} aria-invalid={Boolean(fieldErrors.subjects[index]?.mark?.length)} aria-describedby={fieldErrors.subjects[index]?.mark?.length ? `mark-error-${index}` : undefined} onChange={event => updateSubject(index, "mark", event.target.value)} required />
                  {fieldErrors.subjects[index]?.subject?.length > 0 && <p className="field-error subject-error" id={`subject-error-${index}`}>{fieldErrors.subjects[index].subject.join(" ")}</p>}
                  {fieldErrors.subjects[index]?.mark?.length > 0 && <p className="field-error subject-error" id={`mark-error-${index}`}>{fieldErrors.subjects[index].mark.join(" ")}</p>}
                  <button className="remove-button" type="button" onClick={() => removeSubject(index)} disabled={subjects.length === 1} aria-label={`Remove subject row ${index + 1}`}>×</button>
                </div>
              ))}
            </div>
            <button className="add-button" type="button" onClick={addSubject}>+ Add another subject</button>

            <div className="form-actions">
              <button className="primary-button" type="submit">Explore pathways <span aria-hidden="true">→</span></button>
              <button className="text-button" type="button" onClick={resetForm}>Reset</button>
            </div>
            <section className="profile-completeness" aria-labelledby="profile-completeness-title">
              <div className="profile-completeness-heading">
                <h3 id="profile-completeness-title">Profile completeness</h3>
                <strong>{discovery.profile.percentage}%</strong>
              </div>
              <div className="completeness-track" role="progressbar" aria-label="Profile completeness" aria-valuemin={0} aria-valuemax={100} aria-valuenow={discovery.profile.percentage} aria-valuetext={`${discovery.profile.completedSections} of ${discovery.profile.requiredSections} required sections complete`}>
                <span style={{ width: `${discovery.profile.percentage}%` }} />
              </div>
              <p>{discovery.profile.completedSections} of {discovery.profile.requiredSections} required sections complete: select your current stage and enter at least one unique subject with a whole-number mark from 0 to 100. Extra subject rows are optional.</p>
            </section>
            {notice && <p className={`form-notice ${submitted ? "notice-info" : "notice-error"}`} role="status" aria-live="polite">{notice}</p>}
          </form>
        </section>

        {results.length > 0 && (
          <section className="results-section" aria-labelledby="results-title">
            <div className="section-heading">
              <div><p className="eyebrow">STEP 2 · YOUR EXPLORATION</p><h2 id="results-title">Pathways to investigate</h2></div>
              <span className="step-count">{discovery.totalCandidates} CANDIDATES</span>
            </div>
            <ProvisionalApsPanel subjects={subjects.map(item => ({ subject: item.subject, mark: item.mark }))} />
            <div className="catalogue-warning" role="note">
              <strong>Exploration results · 2027 pilot</strong>
              <p>Results are based on the minimum requirements currently recorded in source-backed catalogue entries. Some programme rules still need interpretation; UNKNOWN is retained where a material rule or required input prevents a result. Positive results are provisional and do not guarantee admission.</p>
            </div>
            <aside className="results-guidance" aria-labelledby="results-guidance-title">
              <h3 id="results-guidance-title">How to read these options</h3>
              <p>These pathways are not ranked by suitability. A provisional match means your marks meet the minimum requirements currently recorded for that pathway; it is not an admission decision and does not compare your chances of admission.</p>
              <p><strong>Your next step:</strong> open pathway details, review the unresolved items, and confirm the current rules using the official UJ links before deciding where to apply.</p>
            </aside>
            <section className="discovery-summary" aria-labelledby="discovery-summary-title">
              <div className="discovery-summary-heading">
                <div><h3 id="discovery-summary-title">Explore the catalogue</h3><p>Counts below describe the currently visible results after filters.</p></div>
                <p className="candidate-count"><strong>{discovery.totalCandidates}</strong> total catalogue candidates · <strong>{discovery.visibleCount}</strong> currently shown</p>
              </div>
              <div className="discovery-counts" aria-live="polite" aria-atomic="true">
                <div><span>Unknown</span><strong>{discovery.stateCounts.UNKNOWN}</strong></div>
                <div><span>Eligible</span><strong>{discovery.stateCounts.ELIGIBLE}</strong></div>
                <div><span>Not eligible</span><strong>{discovery.stateCounts.NOT_ELIGIBLE}</strong></div>
              </div>
              <div className="discovery-filters">
                <div>
                  <label className="field-label" htmlFor="eligibility-filter">Eligibility state</label>
                  <select id="eligibility-filter" value={eligibilityFilter} onChange={event => setEligibilityFilter(event.target.value)}>
                    <option value="ALL">All states</option>
                    <option value="UNKNOWN">Unknown</option>
                    <option value="ELIGIBLE">Eligible</option>
                    <option value="NOT_ELIGIBLE">Not eligible</option>
                  </select>
                </div>
                {discovery.campuses.length > 0 && <div>
                  <label className="field-label" htmlFor="campus-filter">Campus</label>
                  <select id="campus-filter" value={campusFilter} onChange={event => setCampusFilter(event.target.value)}>
                    <option value="ALL">All campuses</option>
                    {discovery.campuses.map(campus => <option key={campus} value={campus}>{campus}</option>)}
                  </select>
                </div>}
                {(eligibilityFilter !== "ALL" || campusFilter !== "ALL") && <button className="clear-filters-button" type="button" onClick={() => { setEligibilityFilter("ALL"); setCampusFilter("ALL"); }}>Clear filters</button>}
              </div>
            </section>
            {discovery.visibleCount === 0 ? (
              <div className="filter-empty" role="status">
                <h3>No pathways match these filters</h3>
                <p>The catalogue still has {discovery.totalCandidates} candidates, but none match the current filter selection. Remove filters or revise your learner inputs.</p>
                <div><button className="clear-filters-button" type="button" onClick={() => { setEligibilityFilter("ALL"); setCampusFilter("ALL"); }}>Clear filters</button> <a href="#explorer-title">Revise learner inputs</a></div>
              </div>
            ) : <div className="results-grid">
              {discovery.visibleResults.map(item => (
                <article className="result-card" key={item.id}>
                  <div className="result-card-top"><span className={`eligibility-state ${getStateClass(item.state)}`}>{STATE_LABELS[item.state]}</span><span className="result-cycle">2027 pilot</span></div>
                  <h3>{item.name}</h3>
                  <p className="result-institution">{item.institution}{item.campus ? ` · ${item.campus}` : ""}</p>
                  <p className="result-reason">{item.reason}</p>
                  <PathwayDetails item={item} />
                  <button
                    className={`save-pathway-button ${savedPathways.some(saved => saved.id === item.id) ? "is-saved" : ""}`}
                    type="button"
                    onClick={() => toggleSavedPathway(item)}
                    disabled={!savedPathways.some(saved => saved.id === item.id) && savedPathways.length >= 3}
                    aria-pressed={savedPathways.some(saved => saved.id === item.id)}
                  >
                    {savedPathways.some(saved => saved.id === item.id) ? "Remove from shortlist" : "Save to shortlist"}
                  </button>
                </article>
              ))}
            </div>}
            {savedPathways.length >= 3 && <p className="shortlist-capacity-note" role="status">Three pathways are saved. Remove one from the shortlist before saving another.</p>}
            <PathwayComparison items={savedPathways} />
            <section className="shortlist-section" aria-labelledby="shortlist-title">
              <div className="section-heading">
                <div><p className="eyebrow">STEP 3 · YOUR NEXT STEPS</p><h2 id="shortlist-title">Saved pathways and application tracker</h2></div>
                <span className="step-count">{savedPathways.length} / 3 SAVED</span>
              </div>
              <p className="section-copy">Save up to three options to compare key details. Track your own progress manually; StudyPath does not submit applications or contact institutions.</p>
              {savedPathways.length === 0 ? (
                <p className="shortlist-empty">No pathways saved yet. Choose “Save to shortlist” on any result to compare it and track your next action.</p>
              ) : (
                <div className="shortlist-grid">
                  {savedPathways.map(item => {
                    const progress = tracking[item.id] || { status: "NOT_STARTED", nextAction: "" };
                    return (
                      <article className="shortlist-card" key={item.id}>
                        <div className="shortlist-card-heading"><span className={`eligibility-state ${getStateClass(item.state)}`}>{STATE_LABELS[item.state]}</span><button className="remove-saved-button" type="button" onClick={() => toggleSavedPathway(item)} aria-label={`Remove ${item.name} from shortlist`}>Remove</button></div>
                        <h3>{item.name}</h3>
                        <p className="result-institution">{item.institution}{item.campus ? ` · ${item.campus}` : ""}</p>
                        <dl className="shortlist-facts">
                          <div><dt>Programme code</dt><dd>{item.code || "Not recorded"}</dd></div>
                          <div><dt>Duration</dt><dd>{item.durationYears ? `${item.durationYears} years (confirm with UJ)` : "Not recorded"}</dd></div>
                          <div><dt>Eligibility</dt><dd>{STATE_LABELS[item.state]} — {item.reason} Confirm current official requirements before applying.</dd></div>
                        </dl>
                        <label className="field-label" htmlFor={`tracking-status-${item.id}`}>My application progress</label>
                        <select id={`tracking-status-${item.id}`} value={progress.status} onChange={event => updateTracking(item.id, "status", event.target.value)}>
                          {TRACKING_STATUSES.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
                        </select>
                        <label className="field-label next-action-label" htmlFor={`tracking-action-${item.id}`}>My next action (optional)</label>
                        <textarea id={`tracking-action-${item.id}`} rows="3" maxLength="240" placeholder="e.g. Confirm 2027 subject requirements with UJ" value={progress.nextAction} onChange={event => updateTracking(item.id, "nextAction", event.target.value)} />
                        <p className="manual-tracking-note">Manual note only. This tracker is temporary and clears when you reset or reload the page.</p>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
            <div className="next-action">
              <h3>What you can do next</h3>
              <p>Check the current requirements with the institution, confirm which subject streams and admission rules apply to your programme, and review official application information before making decisions.</p>
              <a href="https://www.uj.ac.za/" target="_blank" rel="noopener noreferrer">Visit the University of Johannesburg website <span aria-hidden="true">↗</span></a>
            </div>
          </section>
        )}

        <section className="next-steps" aria-labelledby="next-title">
          <p className="eyebrow">HOW STUDYPATH HELPS</p>
          <h2 id="next-title">A pathway, with the facts behind it.</h2>
          <div className="steps-grid">
            <article><span className="step-number">01</span><h3>Start with your results</h3><p>Enter the subjects and marks you want to explore. Your entries stay in this page during the session.</p></article>
            <article><span className="step-number">02</span><h3>Understand uncertainty</h3><p>StudyPath shows when catalogue evidence is incomplete instead of claiming that you qualify.</p></article>
            <article><span className="step-number">03</span><h3>Check official sources</h3><p>Use institution-published information to confirm requirements and your next steps.</p></article>
          </div>
        </section>
      </main>
      <footer><span>StudyPath SA</span><span>Hackathon prototype · Synthetic data only · Not an admission decision</span></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
