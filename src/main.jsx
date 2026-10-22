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

function App() {
  const [stage, setStage] = useState("GRADE_12");
  const [subjects, setSubjects] = useState([{ subject: "English Home Language", mark: "" }]);
  const [notice, setNotice] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState([]);

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
    setStage("GRADE_12");
    setSubjects([{ subject: "English Home Language", mark: "" }]);
    setResults([]);
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
              <strong>Important: draft catalogue</strong>
              <p>The University of Johannesburg 2027 pilot data has not been approved for definitive eligibility screening. Every result is marked UNKNOWN until the source rules are fully reconciled and curator-approved. These results do not predict or guarantee admission.</p>
            </div>
            <div className="results-grid">
              {results.map(item => (
                <article className="result-card" key={item.id}>
                  <div className="result-card-top"><span className="eligibility-state state-unknown">UNKNOWN</span><span className="result-cycle">2027 pilot</span></div>
                  <h3>{item.name}</h3>
                  <p className="result-institution">{item.institution}{item.campus ? ` · ${item.campus}` : ""}</p>
                  <p>{item.reason}</p>
                  <p className="result-limitation">{item.limitation}</p>
                  {item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noreferrer">Review official UJ source <span aria-hidden="true">↗</span></a>}
                </article>
              ))}
            </div>
            <div className="next-action">
              <h3>What you can do next</h3>
              <p>Check the current requirements with the institution, confirm which subject streams and admission rules apply to your programme, and review official application information before making decisions.</p>
              <a href="https://www.uj.ac.za/" target="_blank" rel="noreferrer">Visit the University of Johannesburg website <span aria-hidden="true">↗</span></a>
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
