import { test, expect } from "@playwright/test";

test("discovery dashboard reflects current profile completeness and draft UNKNOWN results", async ({ page }) => {
  await page.goto("/");
  const completeness = page.getByRole("progressbar", { name: "Profile completeness" });
  await expect(completeness).toHaveAttribute("aria-valuenow", "0");

  await page.locator("#stage").selectOption("GRADE_12");
  await expect(completeness).toHaveAttribute("aria-valuenow", "33");
  await expect(completeness).toHaveAttribute("aria-valuetext", "1 of 3 required sections complete; 0 of 6 unique subjects selected; 0 of 6 valid marks entered");

  await page.locator("#subject-0").selectOption("Mathematics");
  await expect(completeness).toHaveAttribute("aria-valuenow", "39");

  await page.locator("#mark-0").fill("75");
  await expect(completeness).toHaveAttribute("aria-valuenow", "44");
  await expect(completeness).toHaveAttribute("aria-valuetext", "1 of 3 required sections complete; 1 of 6 unique subjects selected; 1 of 6 valid marks entered");

  const remainingSubjects = ["Physical Sciences", "Life Sciences", "Geography", "History", "Accounting"];
  for (let index = 0; index < remainingSubjects.length; index += 1) {
    await page.getByRole("button", { name: "+ Add another subject" }).click();
    const row = index + 1;
    await page.locator(`#subject-${row}`).selectOption(remainingSubjects[index]);
    await page.locator(`#mark-${row}`).fill(String(70 + index));
  }
  await expect(completeness).toHaveAttribute("aria-valuenow", "100");
  await expect(completeness).toHaveAttribute("aria-valuetext", "3 of 3 required sections complete; 6 of 6 unique subjects selected; 6 of 6 valid marks entered");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.getByText("30 total catalogue candidates")).toBeVisible();
  await expect(page.getByText("30 currently shown")).toBeVisible();
  await expect(page.locator(".discovery-counts")).toContainText("Unknown");
  await expect(page.locator(".discovery-counts")).toContainText("30");
  const eligibilityLabels = await page.locator(".result-card-top > .eligibility-state").allTextContents();
  expect(eligibilityLabels).toHaveLength(30);
  expect(eligibilityLabels.every(label => ["Eligible", "Not eligible", "Unknown"].includes(label.trim()))).toBe(true);
});

test("adding a subject preserves entries and completeness grows until six are complete", async ({ page }) => {
  await page.goto("/");
  const completeness = page.getByRole("progressbar", { name: "Profile completeness" });

  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await expect(completeness).toHaveAttribute("aria-valuenow", "44");

  await page.getByRole("button", { name: "+ Add another subject" }).click();
  await expect(page.locator("#stage")).toHaveValue("GRADE_12");
  await expect(page.locator("#subject-0")).toHaveValue("Mathematics");
  await expect(page.locator("#mark-0")).toHaveValue("75");
  await expect(page.locator("#subject-1")).toHaveValue("");
  await expect(completeness).toHaveAttribute("aria-valuenow", "44");

  const secondSubjectOptions = await page.locator("#subject-1 option").evaluateAll(options => options.map(option => option.value));
  expect(secondSubjectOptions).not.toContain("Mathematics");
  expect(secondSubjectOptions).toContain("Physical Sciences");
  await page.locator("#subject-1").selectOption("Physical Sciences");
  await page.locator("#mark-1").fill("80");
  await expect(completeness).toHaveAttribute("aria-valuenow", "56");

  // Selecting Other reveals a textbox and its subject/mark contributes to progress.
  await page.getByRole("button", { name: "+ Add another subject" }).click();
  await page.locator("#subject-2").selectOption("OTHER");
  await expect(page.locator("#custom-subject-2")).toBeVisible();
  await page.locator("#custom-subject-2").fill("Computer Applications Technology");
  await page.locator("#mark-2").fill("82");
  await expect(completeness).toHaveAttribute("aria-valuenow", "67");
  await expect(page.locator("#subject-1 option")).not.toContainText("Mathematics");

  // Custom entries remain in the profile but are not supported by catalogue matching.
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toContainText("Computer Applications Technology");
  await expect(page.locator(".form-notice")).toContainText("not included in catalogue matching");
  await expect(page.locator(".result-card")).toHaveCount(30);
  await expect(page.locator("#custom-subject-2")).toHaveValue("Computer Applications Technology");
});

test("eligibility filters update visible counts and provide a recoverable empty state", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await page.getByLabel("Eligibility state").selectOption("ELIGIBLE");
  await expect(page.getByText("30 total catalogue candidates")).toBeVisible();
  await expect(page.getByText("0 currently shown")).toBeVisible();
  await expect(page.getByRole("heading", { name: "No pathways match these filters" })).toBeVisible();
  await expect(page.locator(".result-card")).toHaveCount(0);

  await page.getByRole("button", { name: "Clear filters" }).first().click();
  await expect(page.locator(".result-card")).toHaveCount(30);
  await expect(page.getByText("30 currently shown")).toBeVisible();
});

test("discovery filters and summary remain usable at 320px in both themes", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  for (const themeButton of ["Switch to dark mode", "Switch to light mode"]) {
    const layout = await page.evaluate(() => ({
      viewportWidth: window.innerWidth,
      documentWidth: document.documentElement.scrollWidth
    }));
    expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
    await expect(page.getByLabel("Eligibility state")).toBeVisible();
    await page.getByRole("button", { name: themeButton }).click();
  }
});

test("pathway details expose requirement evidence by keyboard at mobile width", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  await page.locator("#stage").selectOption("MATRIC_GRADUATE");

  const subjects = [
    "English Home Language",
    "Mathematics",
    "Physical Sciences",
    "Life Sciences",
    "Geography",
    "Accounting"
  ];
  for (let index = 0; index < subjects.length; index += 1) {
    if (index > 0) await page.getByRole("button", { name: "+ Add another subject" }).click();
    await page.locator(`#subject-${index}`).selectOption(subjects[index]);
    await page.locator(`#mark-${index}`).fill("90");
  }

  await page.getByRole("button", { name: /Explore pathways/ }).click();
  const firstCard = page.locator(".result-card").first();
  const summary = firstCard.locator("summary").first().first();
  await summary.focus();
  await page.keyboard.press("Enter");

  await expect(firstCard.getByRole("heading", { name: "Requirement-by-requirement check" })).toBeVisible();
  await expect(firstCard.getByText("Recorded rule", { exact: true }).first()).toBeVisible();
  await expect(firstCard.getByText("Your input", { exact: true }).first()).toBeVisible();
  await expect(firstCard.locator(".requirement-evidence-caveat")).toContainText(/not an admission decision/i);

  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth
  }));
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
});


test("Why Not Yet distinguishes missing information from a recorded shortfall on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 820 });
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  const unknownCard = page.locator(".result-card").filter({ has: page.getByText("Unknown", { exact: true }) }).first();
  await unknownCard.locator("summary").first().focus();
  await page.keyboard.press("Enter");
  await expect(unknownCard.getByRole("heading", { name: "More information is needed" })).toBeVisible();
  await expect(unknownCard.locator(".why-not-yet-caveat")).toContainText("Unknown is not a rejection");
  await expect(unknownCard.locator(".why-not-yet")).not.toContainText("Not eligible");

  await page.getByRole("button", { name: "Reset" }).click();
  await page.locator("#stage").selectOption("MATRIC_GRADUATE");
  const profile = [
    ["English Home Language", "90"],
    ["Mathematical Literacy", "90"],
    ["Physical Sciences", "90"],
    ["Life Sciences", "90"],
    ["Geography", "90"],
    ["Accounting", "90"]
  ];
  for (let index = 0; index < profile.length; index += 1) {
    if (index > 0) await page.getByRole("button", { name: /Add another subject/ }).click();
    await page.locator(`#subject-${index}`).selectOption(profile[index][0]);
    await page.locator(`#mark-${index}`).fill(profile[index][1]);
  }
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  const rejectedCard = page.locator(".result-card").filter({ has: page.getByText("Not eligible", { exact: true }) }).first();
  await expect(rejectedCard).toBeVisible();
  await rejectedCard.locator("summary").first().click();
  await expect(rejectedCard.getByRole("heading", { name: "Recorded requirement not met" })).toBeVisible();
  await expect(rejectedCard.locator(".why-not-yet-blockers li").first()).toBeVisible();

  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth
  }));
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
});


test("blocked pathway offers catalogue-backed alternatives and links to the selected result", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/");
  await page.locator("#stage").selectOption("MATRIC_GRADUATE");
  const subjects = [
    ["English Home Language", "90"],
    ["Mathematics", "50"],
    ["Physical Sciences", "75"],
    ["Life Sciences", "70"],
    ["Geography", "65"],
    ["Accounting", "60"]
  ];
  for (let index = 0; index < subjects.length; index += 1) {
    if (index > 0) await page.getByRole("button", { name: "+ Add another subject" }).click();
    await page.locator("#subject-" + index).selectOption(subjects[index][0]);
    await page.locator("#mark-" + index).fill(subjects[index][1]);
  }
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  const preferredCard = page.locator("#pathway-UJ-2027-BSC-IT");
  await expect(preferredCard).toBeVisible();
  await preferredCard.locator("summary").first().click();
  const alternatives = preferredCard.locator(".alternative-pathways");
  await expect(alternatives).toBeVisible();
  await expect(alternatives.getByRole("heading", { name: "Other pathways to explore" })).toBeVisible();
  const evidenceToggle = alternatives.getByText("View eligibility evidence").first();
  await expect(evidenceToggle).toBeVisible();
  await evidenceToggle.click();
  await expect(alternatives.locator(".alternative-evidence-list").first()).toBeVisible();

  const alternativeLink = alternatives.getByRole("link", { name: "View this pathway in results" }).first();
  await expect(alternativeLink).toBeVisible();
  const href = await alternativeLink.getAttribute("href");
  expect(href).toMatch(/^#pathway-UJ-2027-/);
  await alternativeLink.click();
  await expect(page).toHaveURL(new RegExp(href + "$"));
  await expect(page.locator(href)).toBeVisible();
  const layout = await page.evaluate(() => ({ viewportWidth: window.innerWidth, documentWidth: document.documentElement.scrollWidth }));
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
});


test("what-if planner recalculates hypothetically and keeps actual marks/results isolated on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 850 });
  await page.goto("/");
  await page.locator("#stage").selectOption("MATRIC_GRADUATE");
  const subjects = [
    ["English Home Language", "80"],
    ["Mathematics", "69"],
    ["Physical Sciences", "75"],
    ["Life Sciences", "75"],
    ["Geography", "75"],
    ["Accounting", "75"]
  ];
  for (let index = 0; index < subjects.length; index += 1) {
    if (index > 0) await page.getByRole("button", { name: "+ Add another subject" }).click();
    await page.locator(`#subject-${index}`).selectOption(subjects[index][0]);
    await page.locator(`#mark-${index}`).fill(subjects[index][1]);
  }
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  const actualResultCount = await page.locator(".result-card").count();
  const actualMath = page.locator("#mark-1");

  await page.getByRole("button", { name: "Try hypothetical marks" }).click();
  await expect(page.getByText("Hypothetical scenario.", { exact: false })).toBeVisible();
  const hypotheticalMath = page.getByRole("spinbutton", { name: "Hypothetical mark for Mathematics" });
  await expect(hypotheticalMath).toHaveValue("69");
  await hypotheticalMath.fill("70");
  await expect(actualMath).toHaveValue("69");
  await page.getByRole("button", { name: "Simulate marks" }).click();
  await expect(page.getByRole("heading", { name: "Hypothetical comparison" })).toBeVisible();
  await expect(page.locator(".what-if-results")).toContainText("Before and after states");
  await expect(page.locator(".what-if-change-list")).toBeVisible();
  await expect(actualMath).toHaveValue("69");
  await expect(page.locator(".result-card")).toHaveCount(actualResultCount);

  await page.getByRole("button", { name: "Exit what-if" }).click();
  await expect(page.getByRole("heading", { name: "Hypothetical comparison" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Try hypothetical marks" })).toBeVisible();
  await expect(actualMath).toHaveValue("69");
  await expect(page.locator(".result-card")).toHaveCount(actualResultCount);

  const layout = await page.evaluate(() => ({ viewportWidth: window.innerWidth, documentWidth: document.documentElement.scrollWidth }));
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
});


test("pilot limitations are available on demand instead of displayed as a warning banner", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  const summary = page.locator(".pilot-disclosure > summary");
  await expect(summary).toBeVisible();
  await expect(page.locator(".pilot-disclosure")).not.toHaveAttribute("open", "");
  await expect(page.getByText(/Some programme rules still need interpretation/)).toBeHidden();

  await summary.click();
  await expect(page.getByText(/Some programme rules still need interpretation/)).toBeVisible();
  await expect(page.getByText(/do not guarantee admission/i)).toBeVisible();
});


test("demo privacy guidance is available on demand instead of shown as a warning banner", async ({ page }) => {
  await page.goto("/");
  const disclosure = page.locator(".privacy-disclosure");
  await expect(disclosure.locator("summary")).toBeVisible();
  await expect(disclosure).not.toHaveAttribute("open", "");
  await expect(disclosure.getByText(/Your entries and results stay in this page's memory/)).toBeHidden();

  await disclosure.locator("summary").click();
  await expect(disclosure.getByText(/Your entries and results stay in this page's memory/)).toBeVisible();
  await expect(disclosure.getByText(/Use fictional details only/)).toBeVisible();
});


test("NSC subject and APS guidance is available on demand instead of shown as a warning", async ({ page }) => {
  await page.goto("/");
  const disclosure = page.locator(".profile-guidance-disclosure");
  await expect(disclosure.locator("summary")).toBeVisible();
  await expect(disclosure).not.toHaveAttribute("open", "");
  await expect(disclosure.getByText(/An NSC subject profile commonly contains seven subjects/)).toBeHidden();

  await disclosure.locator("summary").click();
  await expect(disclosure.getByText(/An NSC subject profile commonly contains seven subjects/)).toBeVisible();
  await expect(disclosure.getByRole("link", { name: "Read the Department of Basic Education’s subject guidance" }))
    .toHaveAttribute("href", "https://www.education.gov.za/Informationfor/Learners/SubjectChoiceandCareerPathing.aspx");
});


test("provisional APS methodology and limitations are available on demand", async ({ page }) => {
  await page.goto("/");
  const disclosure = page.locator(".aps-disclosure");
  await expect(disclosure.locator("summary")).toHaveText("How the provisional APS estimate works");
  await expect(disclosure).not.toHaveAttribute("open", "");
  await expect(disclosure.getByText(/not an official or verified APS result/i)).toBeHidden();

  await disclosure.locator("summary").click();
  await expect(disclosure.getByText(/not an official or verified APS result/i)).toBeVisible();
  await expect(disclosure.getByRole("link", { name: /UJ 2027 Undergraduate Prospectus/ }))
    .toHaveAttribute("href", "https://www.uj.ac.za/wp-content/uploads/2026/07/uj_undergrad_prospectus2027_online_25jun2026.pdf");
  await expect(disclosure.getByRole("link", { name: /UJ frequently asked questions/ }))
    .toHaveAttribute("href", "https://www.uj.ac.za/frequently-asked-questions");
  await expect(disclosure.getByText(/This estimate never changes pathway eligibility/i)).toBeVisible();
});

test("pathway interpretation guidance is available on demand", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  const disclosure = page.locator(".results-guidance-disclosure");
  await expect(disclosure.locator("summary")).toHaveText("How to read these options");
  await expect(disclosure).not.toHaveAttribute("open", "");
  await expect(disclosure.getByText(/not ranked by suitability/i)).toBeHidden();
  await expect(disclosure.getByText(/Your next step:/i)).toBeHidden();

  await disclosure.locator("summary").click();
  await expect(disclosure.getByText(/not ranked by suitability/i)).toBeVisible();
  await expect(disclosure.getByText(/does not compare your chances of admission/i)).toBeVisible();
  await expect(disclosure.getByText(/confirm the current rules using the official UJ links/i)).toBeVisible();
});
