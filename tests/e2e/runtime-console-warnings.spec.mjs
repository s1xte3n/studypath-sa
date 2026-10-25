import { test, expect } from "@playwright/test";

test("core learner journey produces no browser console warnings, errors, or uncaught exceptions", async ({ page }) => {
  const diagnostics = [];

  page.on("console", message => {
    if (message.type() === "warning" || message.type() === "error") {
      diagnostics.push({
        source: "console",
        type: message.type(),
        text: message.text(),
        location: message.location()
      });
    }
  });
  page.on("pageerror", error => {
    diagnostics.push({
      source: "pageerror",
      type: error.name,
      text: error.message,
      stack: error.stack
    });
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Find a study path/ })).toBeVisible();

  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".result-card")).toHaveCount(30);

  await page.locator(".pathway-details").first().locator("summary").click();
  await page.locator(".save-pathway-button").first().click();
  await expect(page.locator(".shortlist-card")).toHaveCount(1);

  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator(".app-shell")).toHaveClass(/theme-dark/);
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator(".app-shell")).toHaveClass(/theme-light/);

  expect(diagnostics, JSON.stringify(diagnostics, null, 2)).toEqual([]);
});
