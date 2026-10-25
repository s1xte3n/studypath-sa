

test("issue 238 starts a pathway-specific manual action plan, tracks progress, adds tasks and clears on reset", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  const firstResult = page.locator(".result-card").first();
  const pathwayName = await firstResult.locator("h3").innerText();
  await firstResult.getByRole("button", { name: "Save to shortlist" }).click();
  const card = page.locator(".shortlist-card").first();
  await expect(card.getByRole("heading", { name: pathwayName })).toBeVisible();
  await expect(card.getByRole("button", { name: "Start action plan" })).toBeVisible();
  await card.getByRole("button", { name: "Start action plan" }).click();

  const plan = card.locator(".pathway-action-plan");
  await expect(plan.getByRole("heading", { name: "Pathway action plan" })).toBeVisible();
  await expect(plan).toContainText(pathwayName);
  await expect(plan).toContainText("Manual tracking only");
  await expect(plan).toContainText("does not submit applications");
  await expect(plan).toContainText("Generic learner task; not an official institution requirement.");
  const initialTaskCount = await plan.locator(".action-plan-task").count();
  expect(initialTaskCount).toBeGreaterThanOrEqual(2);
  await expect(plan.locator(".action-plan-progress")).toHaveText(`0 of ${initialTaskCount} done`);

  const status = plan.locator("select").first();
  await status.selectOption("IN_PROGRESS");
  await expect(status).toHaveValue("IN_PROGRESS");
  await status.selectOption("DONE");
  await expect(plan.locator(".action-plan-progress")).toHaveText(`1 of ${initialTaskCount} done`);

  await plan.getByLabel("Add your own task").fill("Ask about required documents");
  await plan.getByRole("button", { name: "Add task" }).click();
  await expect(plan.locator(".action-plan-task")).toHaveCount(initialTaskCount + 1);
  await expect(plan).toContainText("Ask about required documents");
  await expect(plan).toContainText("Learner-created task; not an official institution requirement.");

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator(".pathway-action-plan")).toHaveCount(0);
  await expect(page.locator("#stage")).toHaveValue("");
});
