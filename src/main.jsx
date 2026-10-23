import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { validateStudentEntries } from "./domain/student-input-validation.mjs";
import { buildPathwayResults } from "./domain/pathway-matching.mjs";
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
          <div><dt>Eligibility</dt><dd>UNKNOWN — the pilot catalogue is a draft and is not approved for definitive screening.</dd></div>
          <div><dt>Costs, deadlines and funding</dt><dd>Not provided in this catalogue. Check current official UJ information; no estimate is shown.</dd></div>
        </dl>
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

function App() {
  const [stage, setStage] = useState("");
  const [subjects, setSubjects] = useState([{ subject: "", mark: "" }]);
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const [savedPathways, setSavedPathways] = useState([]);
  const [tracking, setTracking] = useState({});
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
    setSubmitted(false);
    setNotice("");
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
    setNotice("");
    setSubmitted(false);
  }

  function submitForm(event) {
    event.preventDefault();
    const errors = validateStudentEntries({ stage, subjects });
    if (errors.length) {
      setResults([]);
      setNotice(errors.join(" "));
      setSubmitted(false);
      return;
    }

    try {
      const nextResults = buildPathwayResults({ stage, subjects }, catalogue);
      setResults(nextResults);
      setNotice("Pathway exploration completed. The current UJ 2027 catalogue is still a draft, so these results are UNKNOWN—not admission decisions.");
      setSubmitted(true);
    } catch {
      setResults([]);
      setNotice("We could not evaluate these entries. Check the subjects and marks, then try again.");
      setSubmitted(false);
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#home"><span className="mark">S</span> StudyPath <span className="country">SA</span></a>
        <span className="topbar-note">Study options, made clearer</span>
      </header>

      <main id="home">
        <section className="hero">
          <p className="eyebrow">YOUR NEXT STEP STARTS HERE</p>
          <h1>Find a study path<br /><span>that fits your future.</span></h1>
          <p className="hero-copy">Explore study options using your subjects and marks. See what is known, what still needs checking, and where to find official information.</p>
          <div className="privacy-note" role="note">
            <span className="privacy-icon" aria-hidden="true">●</span>
            <div><strong>Private by design in this demo</strong><p>Your entries and results stay in this page's memory. They are not sent to a server or saved across a reload. Use fictional details only.</p></div>
          </div>
        </section>

        <section className="explorer" aria-labelledby="explorer-title">
          <div className="section-heading">
            <div><p className="eyebrow">STEP 1 · YOUR STARTING POINT</p><h2 id="explorer-title">Tell us about your studies</h2></div>
            <span className="step-count">01 / 03</span>
          </div>
          <p className="section-copy">No account is needed. Add the subjects and marks you want to explore. Use whole-number marks from 0 to 100.</p>

          <form onSubmit={submitForm} noValidate>
            <label className="field-label" htmlFor="stage">Your current stage <span aria-hidden="true">*</span></label>
            <select id="stage" value={stage} onChange={event => { setStage(event.target.value); clearResults(); }} required>
              <option value="">Choose current stage</option>
              {STAGES.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>

            <div className="subject-heading"><span className="field-label">Subjects and marks <span aria-hidden="true">*</span></span><span className="hint">Whole numbers · 0–100</span></div>
            <div className="subject-list">
              {subjects.map((item, index) => (
                <div className="subject-row" key={index}>
                  <label className="visually-hidden" htmlFor={`subject-${index}`}>Subject {index + 1}</label>
                  <select id={`subject-${index}`} value={item.subject} onChange={event => updateSubject(index, "subject", event.target.value)} required>
                    <option value="">Choose a subject</option>
                    {SUBJECTS.map(subject => <option key={subject} value={subject}>{subject}</option>)}
                  </select>
                  <label className="visually-hidden" htmlFor={`mark-${index}`}>Mark for subject {index + 1}</label>
                  <input id={`mark-${index}`} inputMode="numeric" type="number" min="0" max="100" step="1" placeholder="Mark %" value={item.mark} onChange={event => updateSubject(index, "mark", event.target.value)} required />
                  <button className="remove-button" type="button" onClick={() => removeSubject(index)} disabled={subjects.length === 1} aria-label={`Remove subject row ${index + 1}`}>×</button>
                </div>
              ))}
            </div>
            <button className="add-button" type="button" onClick={addSubject}>+ Add another subject</button>

            <div className="form-actions">
              <button className="primary-button" type="submit">Explore pathways <span aria-hidden="true">→</span></button>
              <button className="text-button" type="button" onClick={resetForm}>Reset</button>
            </div>
            {notice && <p className={`form-notice ${submitted ? "notice-info" : "notice-error"}`} role="status" aria-live="polite">{notice}</p>}
          </form>
        </section>

        {results.length > 0 && (
          <section className="results-section" aria-labelledby="results-title" aria-live="polite">
            <div className="section-heading">
              <div><p className="eyebrow">STEP 2 · YOUR EXPLORATION</p><h2 id="results-title">Pathways to investigate</h2></div>
              <span className="step-count">{results.length} OPTIONS</span>
            </div>
            <div className="catalogue-warning" role="note">
              <strong>Exploration results · 2027 pilot</strong>
              <p>This catalogue is still being reviewed, so eligibility remains UNKNOWN. Use these matches to decide which official requirements to investigate next.</p>
            </div>
            <aside className="results-guidance" aria-labelledby="results-guidance-title">
              <h3 id="results-guidance-title">How to read these options</h3>
              <p>These pathways are shown for exploration, not ranked by suitability. Because the catalogue is still a draft, StudyPath cannot confirm that you meet admission requirements or compare your chances of admission.</p>
              <p><strong>Your next step:</strong> open pathway details, review the unresolved items, and confirm the current rules using the official UJ links before deciding where to apply.</p>
            </aside>
            <div className="results-grid">
              {results.map(item => (
                <article className="result-card" key={item.id}>
                  <div className="result-card-top"><span className="eligibility-state state-unknown">UNKNOWN</span><span className="result-cycle">2027 pilot</span></div>
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
            </div>
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
                        <div className="shortlist-card-heading"><span className="eligibility-state state-unknown">{item.state}</span><button className="remove-saved-button" type="button" onClick={() => toggleSavedPathway(item)} aria-label={`Remove ${item.name} from shortlist`}>Remove</button></div>
                        <h3>{item.name}</h3>
                        <p className="result-institution">{item.institution}{item.campus ? ` · ${item.campus}` : ""}</p>
                        <dl className="shortlist-facts">
                          <div><dt>Programme code</dt><dd>{item.code || "Not recorded"}</dd></div>
                          <div><dt>Duration</dt><dd>{item.durationYears ? `${item.durationYears} years (confirm with UJ)` : "Not recorded"}</dd></div>
                          <div><dt>Eligibility</dt><dd>UNKNOWN — confirm current official requirements.</dd></div>
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
