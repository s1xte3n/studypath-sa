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
