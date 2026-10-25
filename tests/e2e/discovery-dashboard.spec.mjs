import { test, expect } from "@playwright/test";

test("discovery dashboard reflects current profile completeness and draft UNKNOWN results", async ({ page }) => {
  await page.goto("/");
  const completeness = page.getByRole("progressbar", { name: "Profile completeness" });
  await expect(completeness).toHaveAttribute("aria-valuenow", "0");

  await page.locator("#stage").selectOption("GRADE_12");
  await expect(completeness).toHaveAttribute("aria-valuenow", "50");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await expect(completeness).toHaveAttribute("aria-valuenow", "100");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.getByText("30 total catalogue candidates")).toBeVisible();
  await expect(page.getByText("30 currently shown")).toBeVisible();
  await expect(page.locator(".discovery-counts")).toContainText("Unknown");
  await expect(page.locator(".discovery-counts")).toContainText("30");
  await expect(page.locator(".eligibility-state")).toHaveText(Array(30).fill("Unknown"));
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
  const summary = firstCard.locator("summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");

  await expect(firstCard.getByRole("heading", { name: "Requirement-by-requirement check" })).toBeVisible();
  await expect(firstCard.getByText("Recorded rule", { exact: true }).first()).toBeVisible();
  await expect(firstCard.getByText("Your input", { exact: true }).first()).toBeVisible();
  await expect(firstCard.getByText(/not an admission decision/i)).toBeVisible();

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
  await unknownCard.locator("summary").focus();
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
  await rejectedCard.locator("summary").click();
  await expect(rejectedCard.getByRole("heading", { name: "Recorded requirement not met" })).toBeVisible();
  await expect(rejectedCard.locator(".why-not-yet-blockers li").first()).toBeVisible();

  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth
  }));
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
});
