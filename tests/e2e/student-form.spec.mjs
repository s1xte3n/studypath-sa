import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("learner can edit rows, validate entries, and reset the form", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Tell us about your studies" })).toBeVisible();

  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Add another subject/ }).click();
  await expect(page.locator("#subject-1")).toBeVisible();
  await page.locator("#subject-1").selectOption("Physical Sciences");
  await page.locator("#mark-1").fill("81");
  await page.getByRole("button", { name: /Remove subject row 2/ }).click();
  await expect(page.locator("#subject-1")).toHaveCount(0);

  await page.getByRole("button", { name: /Check my entries/ }).click();
  await expect(page.getByRole("status")).toContainText("basic form validation");
  await expect(page.getByRole("status")).toContainText("no eligibility result has been calculated");

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByLabel("Your current stage")).toHaveValue("GRADE_12");
  await expect(page.locator("#subject-0")).toHaveValue("English Home Language");
  await expect(page.locator("#mark-0")).toHaveValue("");
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("invalid learner input is announced and does not produce an eligibility result", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("101");
  await page.getByRole("button", { name: /Check my entries/ }).click();

  await expect(page.getByRole("status")).toContainText("whole-number mark from 0 to 100");
  await expect(page.getByRole("status")).toHaveAttribute("aria-live", "polite");
  await expect(page.getByRole("status")).not.toContainText("ELIGIBLE");
});

test("keyboard users can reach the form controls and see focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "StudyPath SA home" })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
  await expect(page.locator(":focus")).toHaveCSS("outline-style", "solid");
});

test("no learner entries are transmitted or persisted across reload", async ({ page }) => {
  const requests = [];
  const consoleMessages = [];
  page.on("request", request => requests.push({
    url: request.url(),
    method: request.method(),
    postData: request.postData() ?? ""
  }));
  page.on("console", message => consoleMessages.push(message.text()));

  await page.goto("/");
  const learnerMarker = "SYNTHETIC-MARK-93";
  const subjectMarker = "Mathematics";
  await page.locator("#subject-0").selectOption(subjectMarker);
  await page.locator("#mark-0").fill("93");
  await page.getByRole("button", { name: /Check my entries/ }).click();
  await expect(page.getByRole("status")).toContainText("basic form validation");

  const currentUrl = page.url();
  expect(currentUrl).not.toContain(learnerMarker);
  expect(currentUrl).not.toContain("93");
  expect(currentUrl).not.toContain(subjectMarker);
  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
    cookies: document.cookie
  }))).toEqual({ local: [], session: [], cookies: "" });

  for (const request of requests) {
    expect(new URL(request.url).origin).toBe("http://127.0.0.1:4173");
    expect(request.url).not.toContain(learnerMarker);
    expect(request.url).not.toContain("93");
    expect(request.postData).not.toContain(learnerMarker);
    expect(request.postData).not.toContain("93");
    expect(request.postData).not.toContain(subjectMarker);
  }
  expect(consoleMessages.join("\n")).not.toContain(learnerMarker);

  await page.reload();
  await expect(page.locator("#mark-0")).toHaveValue("");
  await expect(page.locator("#subject-0")).toHaveValue("English Home Language");
});

test("automated accessibility scan has no critical or serious WCAG violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const blocking = results.violations.filter(violation =>
    violation.impact === "critical" || violation.impact === "serious"
  );
  expect(blocking, JSON.stringify(blocking.map(item => ({
    id: item.id,
    impact: item.impact,
    description: item.description,
    nodes: item.nodes.map(node => node.target)
  })), null, 2)).toEqual([]);
});
