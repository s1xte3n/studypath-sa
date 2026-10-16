import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { validateStudentEntries } from "./domain/student-input-validation.mjs";

const STAGES = [
  { value: "GRADE_11", label: "Grade 11" },
  { value: "GRADE_12", label: "Grade 12" },
  { value: "MATRIC_GRADUATE", label: "Matric graduate" }
];

const SUBJECTS = [
  "English Home Language",
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

  function updateSubject(index, field, value) {
    setSubjects(current => current.map((item, i) => i === index ? { ...item, [field]: value } : item));
    setSubmitted(false);
    setNotice("");
  }

  function addSubject() {
    setSubjects(current => [...current, { subject: "", mark: "" }]);
    setSubmitted(false);
    setNotice("");
  }

  function removeSubject(index) {
    setSubjects(current => current.filter((_, i) => i !== index));
    setSubmitted(false);
    setNotice("");
  }

  function resetForm() {
    setStage("GRADE_12");
    setSubjects([{ subject: "English Home Language", mark: "" }]);
    setNotice("");
    setSubmitted(false);
  }

  function submitForm(event) {
    event.preventDefault();
    const errors = validateStudentEntries({ stage, subjects });
    setNotice(errors.length ? errors.join(" ") : "Your entries passed basic form validation. Pathway matching is not enabled in this scaffold, so no eligibility result has been calculated.");
    setSubmitted(errors.length === 0);
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="StudyPath SA home"><span className="mark">S</span> StudyPath <span className="country">SA</span></a>
        <span className="topbar-note">Study options, made clearer</span>
      </header>

      <main id="home">
        <section className="hero">
          <p className="eyebrow">YOUR NEXT STEP STARTS HERE</p>
          <h1>Find a study path<br /><span>that fits your future.</span></h1>
          <p className="hero-copy">Start with your subjects and marks. Explore what to check next, with requirements and uncertainty made clear.</p>
          <div className="privacy-note" role="note">
            <span className="privacy-icon" aria-hidden="true">●</span>
            <div><strong>Private by design in this demo</strong><p>Your entries stay in this page's memory. They are not sent to a server or saved across a reload. Use fictional details only.</p></div>
          </div>
        </section>

        <section className="explorer" aria-labelledby="explorer-title">
          <div className="section-heading">
            <div><p className="eyebrow">STEP 1 · YOUR STARTING POINT</p><h2 id="explorer-title">Tell us about your studies</h2></div>
            <span className="step-count">01 / 03</span>
          </div>
          <p className="section-copy">You do not need an account. Add the subjects and marks you want to explore.</p>

          <form onSubmit={submitForm} noValidate>
            <label className="field-label" htmlFor="stage">Your current stage <span aria-hidden="true">*</span></label>
            <select id="stage" value={stage} onChange={event => { setStage(event.target.value); setSubmitted(false); }} required>
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
              <button className="primary-button" type="submit">Check my entries <span aria-hidden="true">→</span></button>
              <button className="text-button" type="button" onClick={resetForm}>Reset</button>
            </div>
            {notice && <p className={`form-notice ${submitted ? "notice-info" : "notice-error"}`} role="status" aria-live="polite">{notice}</p>}
          </form>
        </section>

        <section className="next-steps" aria-labelledby="next-title">
          <p className="eyebrow">WHAT COMES NEXT</p>
          <h2 id="next-title">A pathway, with the facts behind it.</h2>
          <div className="steps-grid">
            <article><span className="step-number">02</span><h3>Explore matches</h3><p>Compare study options against published requirements. This matching step is not yet implemented.</p></article>
            <article><span className="step-number">03</span><h3>Know your next move</h3><p>Check official requirements, deadlines and funding details before applying.</p></article>
          </div>
        </section>
      </main>
      <footer><span>StudyPath SA</span><span>Prototype · Synthetic data only · Not an admission decision</span></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
