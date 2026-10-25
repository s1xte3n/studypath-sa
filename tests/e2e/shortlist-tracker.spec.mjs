import { test, expect } from "@playwright/test";

async function createResults(page) {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("78");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.getByRole("heading", { name: "Pathways to investigate" })).toBeVisible();
}

test("learner can save, compare, and unsave pathways with a three-item limit", async ({ page }) => {
  await createResults(page);
  await expect(page.getByRole("heading", { name: "Saved pathways and application tracker" })).toBeVisible();
  await expect(page.getByText(/No pathways saved yet/)).toBeVisible();

  const cards = page.locator(".result-card");
  await cards.nth(0).getByRole("button", { name: "Save to shortlist" }).click();
  await cards.nth(1).getByRole("button", { name: "Save to shortlist" }).click();
  await cards.nth(2).getByRole("button", { name: "Save to shortlist" }).click();
  await expect(page.locator(".shortlist-card")).toHaveCount(3);
  await expect(page.locator(".shortlist-section .step-count")).toHaveText("3 / 3 SAVED");
  await expect(cards.nth(3).getByRole("button", { name: "Save to shortlist" })).toBeDisabled();

  await page.locator(".shortlist-card").first().getByRole("button", { name: "Remove" }).click();
  await expect(page.locator(".shortlist-card")).toHaveCount(2);
  await expect(cards.nth(3).getByRole("button", { name: "Save to shortlist" })).toBeEnabled();
});

test("manual tracker updates status and next action without claiming to submit an application", async ({ page }) => {
  await createResults(page);
  await page.locator(".result-card").first().getByRole("button", { name: "Save to shortlist" }).click();

  const status = page.getByLabel("My application progress");
  await status.selectOption("PREPARING");
  await expect(status).toHaveValue("PREPARING");
  const nextAction = page.getByLabel("My next action (optional)");
  await nextAction.fill("Confirm the current subject requirements with UJ");
  await expect(nextAction).toHaveValue("Confirm the current subject requirements with UJ");

  await expect(page.getByText(/StudyPath does not submit applications or contact institutions/)).toBeVisible();
  await expect(page.getByText(/Manual note only/)).toBeVisible();
});

test("reset clears saved pathways and tracker state", async ({ page }) => {
  await createResults(page);
  await page.locator(".result-card").first().getByRole("button", { name: "Save to shortlist" }).click();
  await page.getByLabel("My application progress").selectOption("SUBMITTED");
  await page.getByLabel("My next action (optional)").fill("Check confirmation email");
  await page.getByRole("button", { name: "Reset" }).click();

  await expect(page.locator(".result-card")).toHaveCount(0);
  await createResults(page);
  await expect(page.locator(".shortlist-card")).toHaveCount(0);
  await expect(page.getByText(/No pathways saved yet/)).toBeVisible();
  await page.locator(".result-card").first().getByRole("button", { name: "Save to shortlist" }).click();
  await expect(page.getByLabel("My application progress")).toHaveValue("NOT_STARTED");
  await expect(page.getByLabel("My next action (optional)")).toHaveValue("");
});

test("shortlist and tracker remain transient across reload", async ({ page }) => {
  await createResults(page);
  await page.locator(".result-card").first().getByRole("button", { name: "Save to shortlist" }).click();
  await page.getByLabel("My application progress").selectOption("FOLLOW_UP");
  await page.getByLabel("My next action (optional)").fill("Ask about application dates");

  await page.reload();
  await expect(page.locator(".result-card")).toHaveCount(0);
  await expect(page.locator(".shortlist-card")).toHaveCount(0);
  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
    cookies: document.cookie
  }))).toEqual({ local: [], session: [], cookies: "" });
});

test("shortlist controls are labelled and work with keyboard interaction", async ({ page }) => {
  await createResults(page);
  const save = page.locator(".result-card").first().getByRole("button", { name: "Save to shortlist" });
  await save.focus();
  await expect(save).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator(".shortlist-card")).toHaveCount(1);
  await expect(page.getByLabel("My application progress")).toBeVisible();
  await expect(page.getByLabel("My next action (optional)")).toBeVisible();
});
