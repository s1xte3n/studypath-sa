import { test, expect } from "@playwright/test";

test("homepage explains the current value proposition and links learners to the explorer", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");

  await expect(page).toHaveTitle(/Turn your marks into study options/);
  await expect(page.getByRole("heading", { name: /Find a study path/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Explore my pathways/ })).toHaveAttribute("href", "#explorer-title");
  await expect(page.getByRole("link", { name: /See what you can do/ })).toHaveAttribute("href", "#capabilities-title");

  const capabilities = page.locator(".capability-card");
  await expect(capabilities).toHaveCount(6);
  await expect(page.getByRole("heading", { name: "Understand each result" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Check the evidence" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Compare your shortlist" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Explore hypothetical marks" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Turn options into next steps" })).toBeVisible();
  await expect(page.locator(".capabilities-scope")).toContainText("draft UJ 2027 pilot catalogue");
  await expect(page.locator(".capabilities-scope")).toContainText("does not submit applications");
});
