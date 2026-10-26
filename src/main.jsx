import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { validateStudentEntries } from "./domain/student-input-validation.mjs";
import { buildPathwayResults } from "./domain/pathway-matching.mjs";
import { buildWhyNotYet } from "./domain/why-not-yet.mjs";
import { suggestAlternativePathways } from "./domain/alternative-pathways.mjs";
import { simulateWhatIfMarks } from "./domain/what-if-mark-planner.mjs";
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

function createEmptySubjectRows() {
  return Array.from({ length: 6 }, () => ({ subject: "", mark: "", customSubject: false }));
}

function getStateClass(state) {
  return `state-${state.toLowerCase().replaceAll("_", "-")}`;
}

function PathwayDetails({ item, allResults, activeCatalogue, onNavigateToAlternative }) {
  const whyNotYet = buildWhyNotYet(item);
  const alternatives = suggestAlternativePathways({ preferred: item, results: allResults, catalogue: activeCatalogue });
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
        <section className={`why-not-yet why-not-yet-${item.state.toLowerCase().replaceAll("_", "-")}`} aria-labelledby={`why-not-yet-${item.id}`}>
          <h4 id={`why-not-yet-${item.id}`}>{whyNotYet.title}</h4>
          <p>{whyNotYet.explanation}</p>
          {whyNotYet.blockers.length > 0 && (
            <details className="compact-evidence-disclosure">
              <summary>View key gaps ({whyNotYet.blockers.length})</summary>
              <ul className="why-not-yet-blockers">
                {whyNotYet.blockers.map(blocker => (
                  <li key={blocker.id}>
                    <strong>{blocker.label}</strong>
                    {blocker.rule && <p><span className="why-not-yet-label">Recorded rule:</span> {blocker.rule}</p>}
                    {blocker.learnerValue && <p><span className="why-not-yet-label">Your input:</span> {blocker.learnerValue}</p>}
                    <p>{blocker.explanation}</p>
                  </li>
                ))}
              </ul>
            </details>
          )}
          {whyNotYet.nextSteps.length > 0 && (
            <div>
              <h5>Suggested next step</h5>
              <ul>{whyNotYet.nextSteps.map(step => <li key={step}>{step}</li>)}</ul>
            </div>
          )}
          {item.state === "UNKNOWN" && <p className="why-not-yet-caveat">Unknown is not a rejection. No conclusion is drawn where an input or material rule is missing.</p>}
        </section>
        <details className="requirement-evidence compact-evidence-disclosure">
          <summary>View requirement-by-requirement evidence ({item.requirementEvidence?.length || 0})</summary>
          <div className="requirement-evidence-content">
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
            <p className="requirement-evidence-caveat">Provisional comparison only—not an admission decision. Source links do not prove a rule is current or complete.</p>
            {item.requirementNotes.length > 0 && (
              <div className="detail-note">
                <h4>Still to confirm</h4>
                <ul>{item.requirementNotes.map(note => <li key={note}>{note}</li>)}</ul>
              </div>
            )}
          </div>
        </details>
        {item.state !== "ELIGIBLE" && (
          <details className="alternative-pathways compact-evidence-disclosure">
            <summary id={`alternative-pathways-${item.id}`}>Other pathways to explore ({alternatives.length})</summary>
            <p>These options share recorded catalogue attributes with this pathway. This is an exploration aid, not evidence of progression or articulation. Each option has its own eligibility result.</p>
            {alternatives.length > 0 ? (
              <ul className="alternative-pathway-list">
                {alternatives.map(alternative => (
                  <li className="alternative-pathway-item" key={alternative.id}>
                    <div className="alternative-pathway-heading">
                      <strong>{alternative.name}</strong>
                      <span className={`eligibility-state ${getStateClass(alternative.state)}`}>{STATE_LABELS[alternative.state]}</span>
                    </div>
                    <p>{alternative.relevanceReason}</p>
                    <p className="alternative-pathway-result">{alternative.reason}</p>
                    <details className="alternative-evidence-details">
                      <summary>View eligibility evidence</summary>
                      {alternative.requirementEvidence?.length ? (
                        <ul className="alternative-evidence-list">
                          {alternative.requirementEvidence.map(check => (
                            <li key={check.id}>
                              <strong>{check.label}: {check.status === "MET" ? "Meets recorded rule" : check.status === "NOT_MET" ? "Does not meet recorded rule" : check.status === "NOT_APPLICABLE" ? "Not applicable" : "Unknown"}</strong>
                              <p><span className="why-not-yet-label">Recorded rule:</span> {check.rule}</p>
                              <p><span className="why-not-yet-label">Learner input:</span> {check.learnerValue}</p>
                              <p>{check.explanation}</p>
                              {check.sourceLinks?.map(source => <p key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.title}</a>{source.location ? ` · ${source.location}` : ""}{source.verificationDate ? ` · Checked ${source.verificationDate}` : ""}</p>)}
                            </li>
                          ))}
                        </ul>
                      ) : <p>No requirement-level evidence is available for this result.</p>}
                    </details>
                    <p className="alternative-pathway-caveat">{alternative.relationshipDisclaimer}</p>
                    <a href={`#pathway-${alternative.id}`} onClick={() => onNavigateToAlternative(alternative.id)}>View this pathway in results</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="alternative-pathways-empty" role="status">No supported alternatives can be suggested from the current catalogue attributes. No progression route has been inferred.</p>
            )}
          </details>
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
      <details className="aps-disclosure">
        <summary>How the provisional APS estimate works</summary>
        <div className="aps-disclosure-content">
          <p>Based on mark-to-level bands recorded in the UJ 2027 Undergraduate Prospectus (printed p. 16). This hackathon estimate uses the project-owner-approved catalogue for demo scope only; it is not an official or verified APS result. Source-version and subject-selection rules are not approved for definitive screening.</p>
          {estimate.state === "PROVISIONAL" && <p>{estimate.reason}</p>}
          <p>Sources: <a href={APS_SOURCE.url} target="_blank" rel="noopener noreferrer">{APS_SOURCE.title} <span aria-hidden="true">↗</span></a> · printed p. {APS_SOURCE.printedPage}; <a href={APS_SOURCE.policyUrl} target="_blank" rel="noopener noreferrer">{APS_SOURCE.policyTitle} <span aria-hidden="true">↗</span></a>. Provisional demo rule.</p>
          <p>This is separate from NSC pass or achievement status. Life Orientation is excluded from this provisional UJ APS input. A total is shown only when exactly six supported non-Life-Orientation subjects are supplied. Fewer or more than six returns UNKNOWN: the applicable selection and programme-required-subject rules have not been verified, so the demo does not choose a subset. This estimate never changes pathway eligibility.</p>
        </div>
      </details>
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


const ACTION_STATUSES = [
  { value: "NOT_STARTED", label: "Not started" },
  { value: "IN_PROGRESS", label: "In progress" },
  { value: "DONE", label: "Done" }
];

function PathwayActionPlan({ item, plan, onStart, onAddTask, onUpdateTask }) {
  const [draftTask, setDraftTask] = useState("");
  const started = Boolean(plan);
  const tasks = plan?.tasks || [];
  const completed = tasks.filter(task => task.status === "DONE").length;

  function addTask(event) {
    event.preventDefault();
    const title = draftTask.trim();
    if (!title) return;
    onAddTask(item.id, title);
    setDraftTask("");
  }

  return (
    <section className="pathway-action-plan" aria-labelledby={`action-plan-title-${item.id}`}>
      <div className="action-plan-heading">
        <div>
          <h4 id={`action-plan-title-${item.id}`}>Pathway action plan</h4>
          <p className="action-plan-pathway-name">{item.name}</p>
          <p>Turn this saved option into manageable next steps.</p>
        </div>
        {started && <span className="action-plan-progress">{completed} of {tasks.length} done</span>}
      </div>
      {!started ? (
        <div>
          <p>No action plan started for this pathway.</p>
          <button className="secondary-button" type="button" onClick={() => onStart(item)}>Start action plan</button>
        </div>
      ) : (
        <>
          <p className="action-plan-manual-note">Manual tracking only. StudyPath SA does not submit applications, contact institutions, or confirm application status. Completing this checklist does not guarantee admission or funding.</p>
          {tasks.length > 0 ? (
            <ul className="action-plan-task-list">
              {tasks.map(task => (
                <li className="action-plan-task" key={task.id}>
                  <div className="action-plan-task-copy">
                    <strong>{task.title}</strong>
                    {task.kind === "SOURCE" ? (
                      <p className="action-plan-task-provenance">
                        Source-backed review task, not an official application requirement.
                        {task.source?.location ? ` ${task.source.location}.` : ""}
                        {task.source?.verificationDate ? ` Source checked ${task.source.verificationDate}.` : " Verification date not recorded."}
                      </p>
                    ) : (
                      <p className="action-plan-task-provenance">{task.kind === "MANUAL" ? "Learner-created task; not an official institution requirement." : "Generic learner task; not an official institution requirement."}</p>
                    )}
                    {task.source?.url && <a href={task.source.url} target="_blank" rel="noopener noreferrer">Open source: {task.source.title || task.source.url}</a>}
                  </div>
                  <label className="action-plan-status-label" htmlFor={`action-task-status-${item.id}-${task.id}`}>Task status</label>
                  <select id={`action-task-status-${item.id}-${task.id}`} value={task.status} onChange={event => onUpdateTask(item.id, task.id, event.target.value)}>
                    {ACTION_STATUSES.map(status => <option key={status.value} value={status.value}>{status.label}</option>)}
                  </select>
                </li>
              ))}
            </ul>
          ) : (
            <p className="action-plan-empty" role="status">No tasks yet. Add a personal task below.</p>
          )}
          <form className="action-plan-add-form" onSubmit={addTask}>
            <label className="field-label" htmlFor={`action-plan-new-task-${item.id}`}>Add your own task</label>
            <div className="action-plan-add-controls">
              <input id={`action-plan-new-task-${item.id}`} value={draftTask} onChange={event => setDraftTask(event.target.value)} maxLength="160" placeholder="e.g. Ask the institution about required documents" />
              <button className="secondary-button" type="submit" disabled={!draftTask.trim()}>Add task</button>
            </div>
          </form>
          <p className="action-plan-unavailable">Deadlines, required documents, fees and funding: unavailable or unverified unless shown in the source linked above. No missing values are estimated.</p>
        </>
      )}
    </section>
  );
}


function WhatIfMarkPlanner({ stage, actualSubjects, activeCatalogue }) {
  const [open, setOpen] = useState(false);
  const [draftSubjects, setDraftSubjects] = useState([]);
  const [comparison, setComparison] = useState(null);
  const [message, setMessage] = useState("");

  function startSimulation() {
    setDraftSubjects(actualSubjects.map(item => ({ subject: item.subject, mark: item.mark })));
    setComparison(null);
    setMessage("");
    setOpen(true);
  }

  function updateDraftMark(index, mark) {
    setDraftSubjects(current => current.map((item, itemIndex) => itemIndex === index ? { ...item, mark } : item));
    setComparison(null);
    setMessage("");
  }

  function runSimulation(event) {
    event.preventDefault();
    const result = simulateWhatIfMarks({ stage, actualSubjects, simulatedSubjects: draftSubjects, catalogue: activeCatalogue });
    setComparison(result);
    setMessage(result.valid
      ? "Hypothetical comparison recalculated using the existing deterministic evaluator."
      : result.errors.join(" "));
  }

  function exitSimulation() {
    setOpen(false);
    setDraftSubjects([]);
    setComparison(null);
    setMessage("");
  }

  return (
    <section className="what-if-planner" aria-labelledby="what-if-title">
      <div className="what-if-heading">
        <div>
          <p className="eyebrow">OPTIONAL · HYPOTHETICAL ONLY</p>
          <h3 id="what-if-title">What-if mark planner</h3>
        </div>
        <span className="what-if-label">Does not edit your profile</span>
      </div>
      <p>Explore how different marks would compare with requirements currently recorded in the pilot catalogue. This is a hypothetical scenario, not an admission prediction or guarantee. Your actual marks and results stay unchanged.</p>
      {!open ? (
        <button className="primary-button what-if-open" type="button" onClick={startSimulation}>Try hypothetical marks</button>
      ) : (
        <div className="what-if-workspace">
          <p className="what-if-banner" role="note"><strong>Hypothetical scenario.</strong> These draft marks are separate from the actual learner profile. Only supported subjects already in your profile can be simulated.</p>
          <form onSubmit={runSimulation} noValidate>
            <div className="what-if-mark-list">
              {draftSubjects.map((item, index) => (
                <div className="what-if-mark-row" key={item.subject}>
                  <label htmlFor={`what-if-mark-${index}`}>{item.subject}</label>
                  <div>
                    <input
                      id={`what-if-mark-${index}`}
                      aria-label={`Hypothetical mark for ${item.subject}`}
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="100"
                      step="1"
                      value={item.mark}
                      onChange={event => updateDraftMark(index, event.target.value)}
                      required
                    />
                    <span>%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="what-if-actions">
              <button className="primary-button" type="submit">Simulate marks</button>
              <button className="text-button" type="button" onClick={startSimulation}>Reset draft to actual marks</button>
              <button className="text-button" type="button" onClick={exitSimulation}>Exit what-if</button>
            </div>
          </form>
          {message && <p className={comparison?.valid ? "what-if-status" : "what-if-error"} role="status" aria-live="polite">{message}</p>}
          {comparison?.valid && (
            <section className="what-if-results" aria-labelledby="what-if-results-title">
              <h4 id="what-if-results-title">Hypothetical comparison</h4>
              <p>Before and after states are produced by the existing deterministic evaluator. UNKNOWN remains unknown when required information or rule interpretation is unresolved. Meeting recorded minimums does not guarantee admission.</p>
              {comparison.changes.length === 0 ? (
                <p className="what-if-empty" role="status">No pathway requirement comparisons changed for these marks.</p>
              ) : (
                <ul className="what-if-change-list">
                  {comparison.changes.map(item => (
                    <li key={item.id} className="what-if-change-item">
                      <h5>{item.name}</h5>
                      <p><strong>Eligibility state:</strong> {item.beforeState} → {item.afterState}{item.stateChanged ? " (changed)" : " (unchanged)"}</p>
                      {item.requirements.length > 0 && (
                        <div>
                          <strong>Requirement comparisons that changed</strong>
                          <ul>
                            {item.requirements.map(requirement => (
                              <li key={requirement.id}>
                                <strong>{requirement.label}</strong>
                                <p><span>Before:</span> {requirement.before ? `${requirement.before.status} — ${requirement.before.learnerValue}` : "Not recorded"}</p>
                                <p><span>After:</span> {requirement.after ? `${requirement.after.status} — ${requirement.after.learnerValue}` : "Not recorded"}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </div>
      )}
    </section>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [stage, setStage] = useState("");
  const [subjects, setSubjects] = useState(createEmptySubjectRows);
  const [notice, setNotice] = useState("");
  const [fieldErrors, setFieldErrors] = useState({ stage: "", subjects: {} });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);
  const [savedPathways, setSavedPathways] = useState([]);
  const [tracking, setTracking] = useState({});
  const [actionPlans, setActionPlans] = useState({});
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

  function navigateToAlternative() {
    setEligibilityFilter("ALL");
    setCampusFilter("ALL");
  }

  function toggleSavedPathway(item) {
    const alreadySaved = savedPathways.some(saved => saved.id === item.id);
    if (alreadySaved) {
      setActionPlans(current => {
        const next = { ...current };
        delete next[item.id];
        return next;
      });
      setTracking(current => {
        const next = { ...current };
        delete next[item.id];
        return next;
      });
    }
    setSavedPathways(current => alreadySaved
      ? current.filter(saved => saved.id !== item.id)
      : current.length < 3 ? [...current, item] : current);
  }

  function startActionPlan(item) {
    setActionPlans(current => {
      if (current[item.id]) return current;
      const sourceTasks = (item.sourceLinks || []).map((source, index) => ({
        id: `source-${index}`,
        title: `Review official information: ${source.title || "source link"}`,
        kind: "SOURCE",
        source,
        status: "NOT_STARTED"
      }));
      const genericTasks = [
        { id: "confirm-requirements", title: "Confirm current admission requirements directly with the institution", kind: "GENERIC", source: null, status: "NOT_STARTED" },
        { id: "check-application-details", title: "Find and review the current official application instructions", kind: "GENERIC", source: null, status: "NOT_STARTED" }
      ];
      if (sourceTasks.length === 0) {
        genericTasks.unshift({ id: "find-official-source", title: "Find an official source for this programme", kind: "GENERIC", source: null, status: "NOT_STARTED" });
      }
      return { ...current, [item.id]: { pathwayId: item.id, tasks: [...sourceTasks, ...genericTasks] } };
    });
  }

  function addActionTask(pathwayId, title) {
    setActionPlans(current => {
      const plan = current[pathwayId];
      if (!plan) return current;
      const nextIndex = plan.tasks.filter(task => task.kind === "MANUAL").length + 1;
      return {
        ...current,
        [pathwayId]: {
          ...plan,
          tasks: [...plan.tasks, { id: `manual-${nextIndex}`, title, kind: "MANUAL", source: null, status: "NOT_STARTED" }]
        }
      };
    });
  }

  function updateActionTask(pathwayId, taskId, status) {
    if (!ACTION_STATUSES.some(item => item.value === status)) return;
    setActionPlans(current => {
      const plan = current[pathwayId];
      if (!plan) return current;
      return {
        ...current,
        [pathwayId]: {
          ...plan,
          tasks: plan.tasks.map(task => task.id === taskId ? { ...task, status } : task)
        }
      };
    });
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
    setActionPlans({});
    setEligibilityFilter("ALL");
    setCampusFilter("ALL");
    setSubmitted(false);
    setNotice("");
    setFieldErrors({ stage: "", subjects: {} });
  }

  function updateStage(value) {
    setStage(value);
    setResults([]);
    setSavedPathways([]);
    setTracking({});
    setActionPlans({});
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

  function chooseSubject(index, value) {
    setSubjects(current => current.map((item, i) => {
      if (i !== index) return item;
      if (value === "OTHER") return { ...item, subject: "", customSubject: true };
      return { ...item, subject: value, customSubject: false };
    }));
    clearResults();
  }

  function addSubject() {
    setSubjects(current => [...current, { subject: "", mark: "", customSubject: false }]);
    clearResults();
  }

  function removeSubject(index) {
    setSubjects(current => current.filter((_, i) => i !== index));
    clearResults();
  }

  function resetForm() {
    setStage("");
    setSubjects(createEmptySubjectRows());
    setResults([]);
    setSavedPathways([]);
    setTracking({});
    setActionPlans({});
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
      // Custom "Other" entries are valid learner input, but the catalogue evaluator
      // only understands explicitly mapped subjects. Keep custom entries in the
      // profile while excluding them from deterministic catalogue matching.
      const customSubjects = subjects.filter(item => item.customSubject);
      const catalogueSubjects = subjects.filter(item => !item.customSubject);
      const nextResults = buildPathwayResults({ stage, subjects: catalogueSubjects }, catalogue);
      if (nextResults.length === 0) {
        setResults([]);
        setNotice("No pathways are available from the current draft catalogue. Check the official UJ sources or try again later; this is not an admission decision.");
        setSubmitted(true);
        return;
      }
      setResults(nextResults);
      const standardNotice = "Pathway exploration completed. Results compare your marks with minimum requirements currently recorded in the UJ 2027 pilot catalogue. Outcomes are provisional, and meeting listed minimums does not guarantee admission.";
      const customNotice = customSubjects.length
        ? ` Custom subject names (${customSubjects.map(item => item.subject.trim()).filter(Boolean).join(", ")}) are not included in catalogue matching; the results use only supported subjects. The provisional APS panel cannot calculate a total from unsupported custom subjects.`
        : "";
      setNotice(standardNotice + customNotice);
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
        <a className="wordmark" href="#home" onClick={() => setMenuOpen(false)}>
          <span className="mark">S</span> StudyPath <span className="country">SA</span>
        </a>

        <nav className="topbar-nav" aria-label="Main">
          <a href="#explorer-title" onClick={() => setMenuOpen(false)}>Start</a>
          {results.length > 0 && <a href="#results-title" onClick={() => setMenuOpen(false)}>Results</a>}
          {results.length > 0 && <a href="#shortlist-title" onClick={() => setMenuOpen(false)}>Shortlist</a>}
          <a href="#next-title" onClick={() => setMenuOpen(false)}>How it works</a>
        </nav>

        <div className="topbar-actions">
          <span className="topbar-note">Study options, made clearer</span>
          <button className="theme-toggle" type="button" onClick={() => setDarkMode(current => !current)} aria-pressed={darkMode} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
            <span aria-hidden="true">{darkMode ? "☀" : "◐"}</span>
            <span className="theme-toggle-text">{darkMode ? "Light mode" : "Dark mode"}</span>
          </button>

          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen(open => !open)}
          >
            <span className="menu-icon" aria-hidden="true"><i></i><i></i></span>
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <nav id="mobile-menu" className="mobile-menu" aria-label="Mobile">
            <a href="#explorer-title" onClick={() => setMenuOpen(false)}>Enter my marks <span aria-hidden="true">→</span></a>
            {results.length > 0 && <a href="#results-title" onClick={() => setMenuOpen(false)}>My results <span aria-hidden="true">→</span></a>}
            {results.length > 0 && <a href="#shortlist-title" onClick={() => setMenuOpen(false)}>My shortlist <span aria-hidden="true">→</span></a>}
            <a href="#next-title" onClick={() => setMenuOpen(false)}>How it works <span aria-hidden="true">→</span></a>
          </nav>
        )}
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">YOUR NEXT STEP STARTS HERE</p>
            <h1>Find a study path<br /><span>that fits your future.</span></h1>
            <p className="hero-copy">Turn your school marks into clearer next steps. Explore study pathways, understand how your results compare with recorded requirements, and keep the questions you still need to answer in one place.</p>
            <div className="hero-actions"><a className="primary-button hero-cta" href="#explorer-title">Explore my pathways <span aria-hidden="true">→</span></a><a className="hero-secondary-link" href="#capabilities-title">See what you can do</a></div>
            <ul className="hero-proof-points" aria-label="StudyPath benefits"><li>No account needed</li><li>Understand the “unknowns”</li><li>Keep your next steps together</li></ul>
            <details className="privacy-disclosure">
              <summary>Privacy in this demo</summary>
              <div className="privacy-disclosure-content">
                <p><strong>Private by design in this demo.</strong> Your entries and results stay in this page's memory. They are not sent to a server or saved across a reload. Use fictional details only.</p>
              </div>
            </details>
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

        <section className="capabilities-section" aria-labelledby="capabilities-title">
          <div className="capabilities-intro">
            <p className="eyebrow">MORE THAN A LIST OF COURSES</p>
            <h2 id="capabilities-title">From marks to a plan you can act on.</h2>
            <p>StudyPath SA helps you explore your options step by step—with explanations, source links and a clear view of what still needs checking.</p>
          </div>
          <div className="capabilities-grid">
            <article className="capability-card"><span className="capability-number">01</span><h3>Explore with your marks</h3><p>Enter your school stage, subjects and marks to compare your profile with requirements recorded in the current pilot catalogue.</p></article>
            <article className="capability-card"><span className="capability-number">02</span><h3>Understand each result</h3><p>See provisional matches, results marked not eligible, and unknowns when information is missing. Review requirement-by-requirement explanations instead of guessing.</p></article>
            <article className="capability-card"><span className="capability-number">03</span><h3>Check the evidence</h3><p>Open linked institution sources, see what is recorded and identify details you still need to confirm with the institution.</p></article>
            <article className="capability-card"><span className="capability-number">04</span><h3>Compare your shortlist</h3><p>Save up to three pathways, compare the available details and manually track your own application progress.</p></article>
            <article className="capability-card"><span className="capability-number">05</span><h3>Explore hypothetical marks</h3><p>Try a hypothetical marks scenario to see how recorded requirement comparisons might change—without editing your actual profile.</p></article>
            <article className="capability-card"><span className="capability-number">06</span><h3>Turn options into next steps</h3><p>Create a personal checklist, review source links, add your own tasks and mark progress as you go.</p></article>
          </div>
          <p className="capabilities-scope"><strong>Clear about the limits:</strong> this demo currently uses a draft UJ 2027 pilot catalogue. Results are provisional, not an admission decision. Missing or unverified information stays uncertain; current fees, deadlines, funding and requirements must be confirmed through official sources. StudyPath does not submit applications or guarantee admission or funding.</p>
        </section>

        <section className="explorer" aria-labelledby="explorer-title">
          <div className="section-heading">
            <div><p className="eyebrow">STEP 1 · YOUR STARTING POINT</p><h2 id="explorer-title">Tell us about your studies</h2></div>
            <span className="step-count">01 / 03</span>
          </div>
          <p className="section-copy">No account is needed. Add the subjects and marks you want to explore. Use whole-number marks from 0 to 100.</p>
          <details className="profile-guidance-disclosure">
            <summary>About NSC subjects and the provisional APS estimate</summary>
            <div className="profile-guidance-content">
              <p>An NSC subject profile commonly contains seven subjects. You can enter all seven here. This demo does not determine whether you have passed the NSC or achieved a Bachelor’s, Diploma or Higher Certificate access level. The separate provisional UJ APS estimate uses exactly six supported non-Life-Orientation subjects only when exactly six are entered; it does not choose the top six automatically. <a href="https://www.education.gov.za/Informationfor/Learners/SubjectChoiceandCareerPathing.aspx" target="_blank" rel="noopener noreferrer">Read the Department of Basic Education’s subject guidance</a>.</p>
            </div>
          </details>

          <form onSubmit={submitForm} noValidate>
            <label className="field-label" htmlFor="stage">Your current stage <span aria-hidden="true">*</span></label>
            <select id="stage" value={stage} aria-invalid={Boolean(fieldErrors.stage)} aria-describedby={fieldErrors.stage ? "stage-error" : undefined} onChange={event => updateStage(event.target.value)} required>
              <option value="">Choose current stage</option>
              {STAGES.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
            </select>
            {fieldErrors.stage && <p className="field-error" id="stage-error">{fieldErrors.stage}</p>}

            <div className="subject-heading"><span className="field-label">Subjects and marks <span aria-hidden="true">*</span></span><span className="hint">Whole numbers · 0–100</span></div>
            <div className="subject-list">
              {subjects.map((item, index) => (
                <div className="subject-row" key={index}>
                  <label className="visually-hidden" htmlFor={`subject-${index}`}>Subject {index + 1}</label>
                  <select id={`subject-${index}`} value={item.customSubject ? "OTHER" : item.subject} aria-invalid={Boolean(fieldErrors.subjects[index]?.subject?.length)} aria-describedby={fieldErrors.subjects[index]?.subject?.length ? `subject-error-${index}` : undefined} onChange={event => chooseSubject(index, event.target.value)} required={Boolean(item.subject || item.mark || item.customSubject)}>
                    <option value="">Choose a subject</option>
                    {SUBJECTS.filter(subject => subject === item.subject || !subjects.some((selected, selectedIndex) => selectedIndex !== index && !selected.customSubject && selected.subject === subject)).map(subject => <option key={subject} value={subject}>{subject}</option>)}
                    <option value="OTHER">Other (enter subject name)</option>
                  </select>
                  {item.customSubject && <div className="custom-subject-field">
                    <label className="visually-hidden" htmlFor={`custom-subject-${index}`}>Custom subject name for row {index + 1}</label>
                    <input id={`custom-subject-${index}`} type="text" value={item.subject} placeholder="Enter subject name" maxLength="100" onChange={event => updateSubject(index, "subject", event.target.value)} required={item.customSubject} />
                  </div>}
                  <label className="visually-hidden" htmlFor={`mark-${index}`}>Mark for subject {index + 1}</label>
                  <input id={`mark-${index}`} inputMode="numeric" type="number" min="0" max="100" step="1" placeholder="Mark %" value={item.mark} aria-invalid={Boolean(fieldErrors.subjects[index]?.mark?.length)} aria-describedby={fieldErrors.subjects[index]?.mark?.length ? `mark-error-${index}` : undefined} onChange={event => updateSubject(index, "mark", event.target.value)} required={Boolean(item.subject || item.mark || item.customSubject)} />
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
              <div className="completeness-track" role="progressbar" aria-label="Profile completeness" aria-valuemin={0} aria-valuemax={100} aria-valuenow={discovery.profile.percentage} aria-valuetext={`${discovery.profile.completedSections} of ${discovery.profile.requiredSections} required sections complete; ${discovery.profile.subjectCount} of 6 unique subjects selected; ${discovery.profile.markedSubjectCount} of 6 valid marks entered`}>
                <span style={{ width: `${discovery.profile.percentage}%` }} />
              </div>
              <p>{discovery.profile.completedSections} of {discovery.profile.requiredSections} required sections complete. Subject progress: {discovery.profile.subjectCount} of 6 distinct subjects; valid marks: {discovery.profile.markedSubjectCount} of 6. Complete all six subject-and-mark entries to reach 100%; additional subjects are optional.</p>
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
            <details className="pilot-disclosure">
              <summary>About the 2027 pilot and result limitations</summary>
              <div className="pilot-disclosure-content">
                <p>These exploration results use the minimum requirements currently recorded in source-backed catalogue entries for the 2027 pilot. Some programme rules still need interpretation; UNKNOWN is retained where a material rule or required input prevents a result.</p>
                <p>Positive results are provisional and do not guarantee admission. Confirm current requirements with the institution using the official source links on each pathway.</p>
              </div>
            </details>
            <details className="results-guidance-disclosure aps-disclosure">
              <summary>How to read these options</summary>
              <div className="aps-disclosure-content">
                <p>These pathways are not ranked by suitability. A provisional match means your marks meet the minimum requirements currently recorded for that pathway; it is not an admission decision and does not compare your chances of admission.</p>
                <p><strong>Your next step:</strong> open pathway details, review the unresolved items, and confirm the current rules using the official UJ links before deciding where to apply.</p>
              </div>
            </details>
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
                <article className="result-card" id={`pathway-${item.id}`} key={item.id}>
                  <div className="result-card-top"><span className={`eligibility-state ${getStateClass(item.state)}`}>{STATE_LABELS[item.state]}</span><span className="result-cycle">2027 pilot</span></div>
                  <h3>{item.name}</h3>
                  <p className="result-institution">{item.institution}{item.campus ? ` · ${item.campus}` : ""}</p>
                  <p className="result-reason">{item.reason}</p>
                  <PathwayDetails item={item} allResults={results} activeCatalogue={catalogue} onNavigateToAlternative={navigateToAlternative} />
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
            <WhatIfMarkPlanner stage={stage} actualSubjects={subjects.map(item => ({ subject: item.subject, mark: item.mark }))} activeCatalogue={catalogue} />
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
                        <PathwayActionPlan
                          item={item}
                          plan={actionPlans[item.id]}
                          onStart={startActionPlan}
                          onAddTask={addActionTask}
                          onUpdateTask={updateActionTask}
                        />
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