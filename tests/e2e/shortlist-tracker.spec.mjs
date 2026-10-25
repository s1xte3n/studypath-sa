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
  await expect(page.locator(".comparison-table tbody tr")).toHaveCount(3);
  await expect(page.getByRole("status").filter({ hasText: "Three pathways are saved" })).toBeVisible();
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


test("comparison reflects saved pathway facts, eligibility uncertainty, and recorded source links", async ({ page }) => {
  await createResults(page);

  const cards = page.locator(".result-card");
  const sourceCard = cards.filter({ has: page.locator(".pathway-details .official-links a") }).first();
  const targetCard = await sourceCard.count() ? sourceCard : cards.first();
  const pathwayName = await targetCard.locator("h3").innerText();
  const sourceLinks = await targetCard.locator(".pathway-details .official-links a").evaluateAll(links =>
    links.map(link => link.href)
  );

  await targetCard.getByRole("button", { name: "Save to shortlist" }).click();

  const comparison = page.locator(".comparison-table");
  await expect(comparison).toBeVisible();
  await expect(comparison.locator("tbody tr")).toHaveCount(1);
  const row = comparison.locator("tbody tr").first();
  await expect(row.getByRole("rowheader")).toHaveText(pathwayName);
  await expect(row).toContainText("Unknown");
  await expect(row.locator(".comparison-explanation")).not.toBeEmpty();

  const comparisonLinks = await row.locator(".comparison-sources a").evaluateAll(links =>
    links.map(link => ({ name: link.innerText.trim(), href: link.href }))
  );
  expect(comparisonLinks.map(link => link.href)).toEqual(sourceLinks);
  expect(comparisonLinks.every(link => link.name.length > 0)).toBe(true);

  await expect(comparison.locator("caption")).toContainText(/not recorded/i);
  await expect(comparison).toContainText("Comparison of saved pathways");
});

test("saved pathways remain available in comparison when filters hide their result cards", async ({ page }) => {
  await createResults(page);
  const firstCard = page.locator(".result-card").first();
  const pathwayName = await firstCard.locator("h3").innerText();
  await firstCard.getByRole("button", { name: "Save to shortlist" }).click();

  await page.locator("#eligibility-filter").selectOption("ELIGIBLE");

  await expect(page.locator(".result-card")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "No pathways match these filters" })).toBeVisible();
  await expect(page.locator(".shortlist-card")).toHaveCount(1);
  await expect(page.locator(".comparison-table tbody tr")).toHaveCount(1);
  await expect(page.locator(".comparison-table tbody tr").first()).toContainText(pathwayName);
});

test("issue 219 fresh-session discovery journey reconciles counts, sources, shortlist, and reset", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#stage")).toHaveValue("");
  await expect(page.locator(".result-card")).toHaveCount(0);

  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Add another subject/ }).click();
  await page.locator("#subject-1").selectOption("Physical Sciences");
  await page.locator("#mark-1").fill("81");
  await expect(page.getByRole("progressbar", { name: "Profile completeness" })).toHaveAttribute("aria-valuenow", "100");

  await page.getByRole("button", { name: /Explore pathways/ }).click();
  const cards = page.locator(".result-card");
  await expect(cards).toHaveCount(30);
  await expect(page.getByText("30 total catalogue candidates")).toBeVisible();
  await expect(page.getByText("30 currently shown")).toBeVisible();
  await expect(page.locator(".eligibility-state")).toHaveText(Array(30).fill("Unknown"));
  await expect(page.locator(".discovery-counts")).toContainText("30");

  await page.locator("#eligibility-filter").selectOption("UNKNOWN");
  await expect(cards).toHaveCount(30);
  await expect(page.getByText("30 currently shown")).toBeVisible();

  const sourceCard = cards.filter({ has: page.locator(".pathway-details .official-links a") }).first();
  await sourceCard.locator(".pathway-details summary").click();
  const sourceLink = sourceCard.locator(".pathway-details .official-links a").first();
  const expectedSourceUrl = await sourceLink.getAttribute("href");
  expect(expectedSourceUrl).toMatch(/^https:\/\//);
  const sourcePopupPromise = page.waitForEvent("popup");
  await sourceLink.click();
  const sourcePopup = await sourcePopupPromise;
  await expect.poll(() => sourcePopup.url()).toBe(expectedSourceUrl);
  await sourcePopup.close();

  const save = sourceCard.getByRole("button", { name: "Save to shortlist" });
  await save.click();
  await expect(page.locator(".shortlist-card")).toHaveCount(1);
  await expect(page.locator(".comparison-table tbody tr")).toHaveCount(1);
  await expect(sourceCard.getByRole("button", { name: "Remove from shortlist" })).toHaveAttribute("aria-pressed", "true");

  // The existing save control toggles the same pathway off; it must not create duplicate entries.
  await sourceCard.getByRole("button", { name: "Remove from shortlist" }).click();
  await expect(page.locator(".shortlist-card")).toHaveCount(0);
  await expect(page.locator(".comparison-table")).toHaveCount(0);

  await sourceCard.getByRole("button", { name: "Save to shortlist" }).click();
  await expect(page.locator(".shortlist-card")).toHaveCount(1);
  await expect(page.locator(".comparison-table tbody tr")).toHaveCount(1);
  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator("#stage")).toHaveValue("");
  await expect(page.locator("#subject-0")).toHaveValue("");
  await expect(page.locator(".result-card")).toHaveCount(0);
  await expect(page.locator(".shortlist-card")).toHaveCount(0);

  await page.reload();
  await expect(page.locator("#stage")).toHaveValue("");
  await expect(page.locator(".result-card")).toHaveCount(0);
  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
    cookies: document.cookie
  }))).toEqual({ local: [], session: [], cookies: "" });
});
