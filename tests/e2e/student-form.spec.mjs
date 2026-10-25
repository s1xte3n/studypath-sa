import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";


test("saved pathways compare supported fields, enforce the three-item limit, and clear on reset/reload", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  const profile = [
    ["English Home Language", "70"],
    ["Mathematics", "75"],
    ["Physical Sciences", "72"],
    ["Life Sciences", "68"],
    ["Geography", "71"],
    ["Business Studies", "74"]
  ];
  for (const [index, [subject, mark]] of profile.entries()) {
    if (index > 0) await page.getByRole("button", { name: /Add another subject/ }).click();
    await page.locator(`#subject-${index}`).selectOption(subject);
    await page.locator(`#mark-${index}`).fill(mark);
  }
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".result-card")).toHaveCount(30);
  await expect(page.getByRole("heading", { name: "Compare saved pathways" })).toBeVisible();
  await expect(page.locator(".comparison-empty")).toBeVisible();

  for (let index = 0; index < 3; index += 1) {
    await page.locator(".result-card").nth(index).getByRole("button", { name: "Save to shortlist" }).click();
  }
  await expect(page.locator(".comparison-table tbody tr")).toHaveCount(3);
  await expect(page.locator(".comparison-table thead th")).toHaveCount(7);
  await expect(page.locator(".comparison-table")).toContainText("Eligibility state and explanation");
  await expect(page.locator(".comparison-table")).toContainText("Official source links");
  await expect(page.getByRole("status").filter({ hasText: "Three pathways are saved" })).toBeVisible();
  await expect(page.locator(".result-card").nth(3).getByRole("button", { name: "Save to shortlist" })).toBeDisabled();

  await page.locator(".shortlist-card").first().getByRole("button", { name: /^Remove / }).click();
  await expect(page.locator(".comparison-table tbody tr")).toHaveCount(2);
  await page.locator(".result-card").nth(3).getByRole("button", { name: "Save to shortlist" }).click();
  await expect(page.locator(".comparison-table tbody tr")).toHaveCount(3);

  const viewport = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    comparisonWidth: document.querySelector(".comparison-table-wrap").clientWidth,
    tableWidth: document.querySelector(".comparison-table").scrollWidth
  }));
  expect(viewport.documentWidth).toBeLessThanOrEqual(viewport.viewportWidth);
  expect(viewport.tableWidth).toBeGreaterThan(viewport.comparisonWidth);

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator(".result-card")).toHaveCount(0);
  await expect(page.locator(".comparison-table")).toHaveCount(0);
  await expect(page.locator(".comparison-empty")).toHaveCount(0);
  await expect(page.locator("#stage")).toHaveValue("");

  await page.reload();
  await expect(page.locator("#stage")).toHaveValue("");
  await expect(page.locator(".result-card")).toHaveCount(0);
});

test("learner can edit rows, validate entries, and reset the form", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Tell us about your studies" })).toBeVisible();
  await expect(page.locator("#stage option:checked")).toHaveText("Choose current stage");
  await expect(page.locator("#subject-0 option:checked")).toHaveText("Choose a subject");

  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Add another subject/ }).click();
  await expect(page.locator("#subject-1")).toBeVisible();
  await page.locator("#subject-1").selectOption("Physical Sciences");
  await page.locator("#mark-1").fill("81");
  await page.getByRole("button", { name: /Remove subject row 2/ }).click();
  await expect(page.locator("#subject-1")).toHaveCount(0);

  await page.locator("#stage").selectOption("GRADE_12");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toContainText("Pathway exploration completed");
  await expect(page.locator(".form-notice")).toContainText("results are UNKNOWN");
  await expect(page.getByRole("heading", { name: "Pathways to investigate" })).toBeVisible();
  await expect(page.locator(".result-card")).toHaveCount(30);
  await expect(page.locator(".eligibility-state")).toHaveText(Array(30).fill("Unknown"));
  await expect(page.getByRole("heading", { name: "How to read these options" })).toBeVisible();
  await expect(page.getByText("These pathways are shown for exploration, not ranked by suitability.")).toBeVisible();
  await expect(page.getByText("confirm the current rules using the official UJ links")).toBeVisible();
  const sourceDetails = page
    .locator(".pathway-details")
    .filter({ hasText: "printed p. 86" })
    .first();

  await sourceDetails.locator("summary").click();

  await expect(sourceDetails.getByText("printed p. 86")).toBeVisible();
  await expect(
    sourceDetails.getByText("Source checked 2026-10-14")
  ).toBeVisible();

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator("#stage")).toHaveValue("");
  await expect(page.locator("#stage option:checked")).toHaveText("Choose current stage");
  await expect(page.locator("#subject-0")).toHaveValue("");
  await expect(page.locator("#mark-0")).toHaveValue("");
  await expect(page.locator(".form-notice")).toHaveCount(0);
});

test("invalid learner input is announced and does not produce an eligibility result", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("101");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.locator(".form-notice")).toContainText("whole-number mark from 0 to 100");
  await expect(page.locator(".form-notice")).toHaveAttribute("aria-live", "polite");
  await expect(page.locator(".form-notice")).not.toContainText("ELIGIBLE");
});


test("correcting invalid marks clears the error and valid entries still do not imply eligibility", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("101");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toContainText("whole-number mark from 0 to 100");

  await page.locator("#mark-0").fill("90");
  await page.locator("#stage").selectOption("GRADE_12");
  await expect(page.locator(".form-notice")).toHaveCount(0);
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toContainText("Pathway exploration completed");
  await expect(page.locator(".form-notice")).toContainText("results are UNKNOWN");
  await expect(page.locator(".result-card")).toHaveCount(30);
});

test("changing the study stage clears a stale validation notice", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toContainText("Choose a subject");

  await page.getByLabel("Your current stage").selectOption("GRADE_11");
  await expect(page.locator(".form-notice")).toHaveCount(0);
});

test("reset from an error state restores the default form and removes the notice", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("");
  await page.locator("#mark-0").fill("101");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toBeVisible();

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator("#stage")).toHaveValue("");
  await expect(page.locator("#subject-0")).toHaveValue("");
  await expect(page.locator("#mark-0")).toHaveValue("");
  await expect(page.locator(".form-notice")).toHaveCount(0);
});

test("home-anchor back and forward navigation keeps transient form data out of the URL", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("82");

  await page.getByRole("link", { name: "StudyPath SA" }).click();
  await expect(page).toHaveURL(/#home$/);
  await expect(page.locator("#mark-0")).toHaveValue("82");

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator("#mark-0")).toHaveValue("82");

  await page.goForward();
  await expect(page).toHaveURL(/#home$/);
  const url = new URL(page.url());
  expect(url.href).not.toContain("Mathematics");
  expect(url.search).toBe("");
  await expect(page.locator("#subject-0")).toHaveValue("Mathematics");
  await expect(page.locator("#mark-0")).toHaveValue("82");
});

test("keyboard users can reach the form controls and see focus", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "StudyPath SA" })).toBeFocused();
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  await expect(page.locator(":focus")).toBeVisible();
  await expect(page.locator(":focus")).toHaveCSS("outline-style", "solid");
});

test("mobile viewport keeps the learner form visible without horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Tell us about your studies" })).toBeVisible();
  await expect(page.locator("#stage")).toBeVisible();
  await expect(page.locator("#subject-0")).toBeVisible();
  await expect(page.locator("#mark-0")).toBeVisible();
  await expect(page.getByRole("button", { name: /Explore pathways/ })).toBeVisible();

  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    controls: ["#stage", "#subject-0", "#mark-0"].map(selector => {
      const rect = document.querySelector(selector).getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    })
  }));

  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
  for (const control of layout.controls) {
    expect(control.left).toBeGreaterThanOrEqual(0);
    expect(control.right).toBeLessThanOrEqual(layout.viewportWidth);
  }

  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "StudyPath SA" })).toBeFocused();
  await expect(page.getByRole("link", { name: "StudyPath SA" })).toHaveCSS("outline-style", "solid");
});

test("no learner entries are transmitted or persisted across reload", async ({ page }) => {
  const requests = [];
  const consoleMessages = [];
  const browserErrors = [];
  page.on("pageerror", error => browserErrors.push(error.message));
  page.on("request", request => requests.push({
    url: request.url(),
    method: request.method(),
    postData: request.postData() ?? ""
  }));
  page.on("console", message => consoleMessages.push(message.text()));

  await page.addInitScript(() => {
    const audit = [];
    const hooks = [
      "fetch", "XMLHttpRequest.open", "XMLHttpRequest.send",
      "navigator.sendBeacon", "WebSocket", "WebSocket.send",
      "history.pushState", "history.replaceState", "window.error",
      "unhandledrejection"
    ];
    Object.defineProperty(window, "__studyPathPrivacyAudit", { value: audit });
    Object.defineProperty(window, "__studyPathPrivacyAuditHooks", { value: hooks });
    const serialize = value => {
      if (typeof value === "string") return value;
      try { return JSON.stringify(value); } catch { return String(value); }
    };
    const record = entry => audit.push(entry);

    const originalFetch = window.fetch.bind(window);
    window.fetch = (input, init = {}) => {
      const requestUrl = typeof input === "string" ? input : input?.url;
      record({
        channel: "fetch",
        url: requestUrl ?? "",
        method: init.method ?? input?.method ?? "GET",
        body: serialize(init.body ?? "")
      });
      return originalFetch(input, init);
    };

    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function (method, url, ...args) {
      this.__studyPathAuditRequest = { method: String(method), url: String(url) };
      record({ channel: "XMLHttpRequest.open", method: String(method), url: String(url) });
      return originalOpen.call(this, method, url, ...args);
    };
    XMLHttpRequest.prototype.send = function (body) {
      record({
        channel: "XMLHttpRequest.send",
        method: this.__studyPathAuditRequest?.method ?? "",
        url: this.__studyPathAuditRequest?.url ?? "",
        body: serialize(body ?? "")
      });
      return originalSend.call(this, body);
    };

    if (typeof navigator.sendBeacon === "function") {
      Object.defineProperty(navigator, "sendBeacon", {
        configurable: true,
        value: (url, body) => {
          record({ channel: "navigator.sendBeacon", url: String(url), body: serialize(body ?? "") });
          return false;
        }
      });
    }

    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = new Proxy(OriginalWebSocket, {
      construct(target, args) {
        const url = String(args[0]);
        record({ channel: "WebSocket", url, protocols: serialize(args[1] ?? "") });
        if (new URL(url, location.href).host !== location.host) {
          throw new DOMException("External WebSocket blocked by privacy test", "SecurityError");
        }
        return Reflect.construct(target, args, target);
      }
    });
    const originalSocketSend = OriginalWebSocket.prototype.send;
    OriginalWebSocket.prototype.send = function (data) {
      record({ channel: "WebSocket.send", url: this.url, body: serialize(data) });
      return originalSocketSend.call(this, data);
    };

    for (const method of ["pushState", "replaceState"]) {
      const original = history[method].bind(history);
      history[method] = (state, unused, url) => {
        record({ channel: "history." + method, state: serialize(state), url: String(url ?? location.href) });
        return original(state, unused, url);
      };
    }
    window.addEventListener("error", event => {
      record({ channel: "window.error", message: event.message ?? "", source: event.filename ?? "" });
    });
    window.addEventListener("unhandledrejection", event => {
      record({ channel: "unhandledrejection", reason: serialize(event.reason) });
    });
  });
  await page.route("**/*", route => {
    const destination = new URL(route.request().url());
    if (destination.origin !== "http://127.0.0.1:4173") return route.abort();
    return route.continue();
  });
  await page.goto("/");
  const subjectMarker = "Mathematics";
  const mark = "93";
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption(subjectMarker);
  await page.locator("#mark-0").fill(mark);
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toContainText("Pathway exploration completed");

  const currentUrl = new URL(page.url());
  expect(currentUrl.href).not.toContain(subjectMarker);
  for (const value of currentUrl.searchParams.values()) {
    expect(value).not.toBe(mark);
    expect(value).not.toContain(subjectMarker);
  }

  expect(await page.evaluate(() => ({
    local: Object.keys(localStorage),
    session: Object.keys(sessionStorage),
    cookies: document.cookie
  }))).toEqual({ local: [], session: [], cookies: "" });

  for (const request of requests) {
    const url = new URL(request.url);
    expect(url.origin).toBe("http://127.0.0.1:4173");
    expect(request.method).toBe("GET");
    expect(url.href).not.toContain(subjectMarker);
    for (const value of url.searchParams.values()) {
      expect(value).not.toBe(mark);
      expect(value).not.toContain(subjectMarker);
    }
    expect(request.postData).toBe("");
  }
  expect(consoleMessages.join("\n")).not.toContain(subjectMarker);
  expect(browserErrors.join("\n")).not.toContain(subjectMarker);

  const audit = await page.evaluate(() => ({
    hooks: window.__studyPathPrivacyAuditHooks,
    calls: window.__studyPathPrivacyAudit
  }));
  expect(audit.hooks).toEqual([
    "fetch", "XMLHttpRequest.open", "XMLHttpRequest.send",
    "navigator.sendBeacon", "WebSocket", "WebSocket.send",
    "history.pushState", "history.replaceState", "window.error",
    "unhandledrejection"
  ]);
  const auditText = JSON.stringify(audit.calls);
  expect(auditText).not.toContain(subjectMarker);
  expect(audit.calls.filter(call => call.url).every(call => {
    const destination = new URL(call.url, "http://127.0.0.1:4173");
    return destination.host === "127.0.0.1:4173";
  })).toBe(true);

  await page.reload();
  await expect(page.locator("#mark-0")).toHaveValue("");
  await expect(page.locator("#subject-0")).toHaveValue("");
});

test("malformed, fractional, negative, missing and over-range marks are rejected in the browser", async ({ page }) => {
  for (const mark of ["72.5", "-1", "101", ""]) {
    await page.goto("/");
    await page.locator("#stage").selectOption("GRADE_12");
    await page.locator("#subject-0").selectOption("Mathematics");
    await page.locator("#mark-0").fill(mark);
    await page.getByRole("button", { name: /Explore pathways/ }).click();

    await expect(page.locator(".form-notice")).toContainText("whole-number mark from 0 to 100");
    await expect(page.locator("#mark-0")).toHaveAttribute("aria-invalid", "true");
    await expect(page.locator(".result-card")).toHaveCount(0);
  }
});

test("duplicate subjects are rejected before pathway results are produced", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Add another subject/ }).click();
  await page.locator("#subject-1").selectOption("Mathematics");
  await page.locator("#mark-1").fill("80");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.locator(".form-notice")).toContainText("Mathematics is listed more than once");
  await expect(page.locator(".result-card")).toHaveCount(0);
  await expect(page.locator(".form-notice")).not.toContainText("Pathway exploration completed");
});

test("missing study stage is field-associated and blocks evaluation", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.locator(".form-notice")).toContainText("Select your current study stage");
  await expect(page.locator("#stage")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#stage")).toHaveAttribute("aria-describedby", "stage-error");
  await expect(page.locator(".result-card")).toHaveCount(0);
});

test("desktop viewport keeps the main journey and result cards within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Tell us about your studies" })).toBeVisible();

  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("80");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.getByRole("heading", { name: "Pathways to investigate" })).toBeVisible();
  await expect(page.locator(".result-card")).toHaveCount(30);

  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    shell: (() => {
      const rect = document.querySelector(".app-shell").getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    })()
  }));
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
  expect(layout.shell.left).toBeGreaterThanOrEqual(0);
  expect(layout.shell.right).toBeLessThanOrEqual(layout.viewportWidth);
});

test("theme toggle works and light/dark surfaces have no critical or serious WCAG violations", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const scanBlockingViolations = async () => {
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
  };

  const darkButton = page.getByRole("button", { name: "Switch to dark mode" });
  await expect(darkButton).toBeVisible();
  await expect(darkButton).toHaveAttribute("aria-pressed", "false");
  await scanBlockingViolations();

  await darkButton.click();
  await expect(page.locator(".app-shell")).toHaveClass(/theme-dark/);
  const lightButton = page.getByRole("button", { name: "Switch to light mode" });
  await expect(lightButton).toHaveAttribute("aria-pressed", "true");
  await scanBlockingViolations();

  await lightButton.click();
  await expect(page.locator(".app-shell")).toHaveClass(/theme-light/);
  await expect(page.getByRole("button", { name: "Switch to dark mode" })).toHaveAttribute("aria-pressed", "false");
});

test("transient learner entries are not persisted in browser storage or restored across tabs and reloads", async ({ page, context }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("74");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  const browserState = await page.evaluate(async () => {
    return {
      localStorageKeys: Object.keys(localStorage),
      sessionStorageKeys: Object.keys(sessionStorage),
      cookie: document.cookie,
      indexedDbNames: typeof indexedDB.databases === "function"
        ? (await indexedDB.databases()).map(db => db.name ?? "")
        : ["unsupported"],
      cacheNames: await caches.keys()
    };
  });

  expect(browserState.localStorageKeys).toEqual([]);
  expect(browserState.sessionStorageKeys).toEqual([]);
  expect(browserState.cookie).toBe("");
  expect(browserState.indexedDbNames).toEqual([]);
  expect(browserState.cacheNames).toEqual([]);

  const secondPage = await context.newPage();
  await secondPage.goto("/");
  await expect(secondPage.locator("#mark-0")).toHaveValue("");
  await expect(secondPage.locator("#subject-0")).toHaveValue("");
  await secondPage.close();

  await page.reload();
  await expect(page.locator("#mark-0")).toHaveValue("");
  await expect(page.locator("#subject-0")).toHaveValue("");
});


test("populated dark-theme pathway details and shortlist have no color-contrast violations", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator(".app-shell")).toHaveClass(/theme-dark/);

  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Add another subject/ }).click();
  await page.locator("#subject-1").selectOption("Physical Sciences");
  await page.locator("#mark-1").fill("81");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.locator(".result-card")).toHaveCount(30);
  const details = page.locator(".pathway-details").first();
  await details.locator("summary").click();
  await expect(details.locator(".pathway-details-content")).toBeVisible();
  await page.locator(".save-pathway-button").first().click();
  await expect(page.locator(".shortlist-card")).toHaveCount(1);

  const contrast = await new AxeBuilder({ page })
    .withRules(["color-contrast"])
    .analyze();
  expect(contrast.violations, JSON.stringify(contrast.violations.map(item => ({
    id: item.id,
    nodes: item.nodes.map(node => ({
      target: node.target,
      summary: node.failureSummary
    }))
  })), null, 2)).toEqual([]);
});


test("only the missing mark field is highlighted when a subject is selected", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.locator(".form-notice")).toContainText("whole-number mark from 0 to 100");
  await expect(page.locator("#subject-0")).toHaveAttribute("aria-invalid", "false");
  await expect(page.locator("#mark-0")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#subject-0")).not.toHaveCSS("border-color", "rgb(181, 82, 55)");
});

test("eligibility filters show a recoverable empty state and clear filters restores UNKNOWN draft results", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("84");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.locator(".result-card")).toHaveCount(30);
  await expect(page.locator(".eligibility-state")).toHaveText(Array(30).fill("Unknown"));

  await page.locator("#eligibility-filter").selectOption("ELIGIBLE");
  await expect(page.locator(".filter-empty")).toHaveAttribute("role", "status");
  await expect(page.getByRole("heading", { name: "No pathways match these filters" })).toBeVisible();
  await expect(page.locator(".result-card")).toHaveCount(0);
  await expect(page.locator(".candidate-count")).toContainText("30 total catalogue candidates");
  await expect(page.locator(".candidate-count")).toContainText("0 currently shown");

  await page.locator(".filter-empty .clear-filters-button").click();
  await expect(page.locator("#eligibility-filter")).toHaveValue("ALL");
  await expect(page.locator(".result-card")).toHaveCount(30);
  await expect(page.locator(".eligibility-state")).toHaveText(Array(30).fill("Unknown"));
});

test("pathway details can be opened using the keyboard", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("84");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  const summary = page.locator(".pathway-details").first().locator("summary");
  await summary.focus();
  await expect(summary).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator(".pathway-details").first()).toHaveAttribute("open", "");
  await expect(page.locator(".pathway-details-content").first()).toBeVisible();
});

test("only the subject field is highlighted when a mark is entered without a subject", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.locator(".form-notice")).toContainText("Choose a subject");
  await expect(page.locator("#subject-0")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#mark-0")).toHaveAttribute("aria-invalid", "false");
});


test("editing a learner profile clears its saved pathways and tracker notes", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".result-card")).toHaveCount(30);

  const firstResult = page.locator(".result-card").first();
  const pathwayName = await firstResult.locator("h3").innerText();
  await firstResult.getByRole("button", { name: "Save to shortlist" }).click();
  await expect(page.getByRole("heading", { name: "Saved pathways and application tracker" })).toBeVisible();
  await expect(page.getByText(pathwayName, { exact: true }).last()).toBeVisible();

  const nextAction = page.getByLabel("My next action (optional)");
  await nextAction.fill("Confirm the requirements for my original profile");
  await expect(page.getByText("Confirm the requirements for my original profile")).toBeVisible();

  await page.locator("#mark-0").fill("76");
  await expect(page.locator(".result-card")).toHaveCount(0);
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".result-card")).toHaveCount(30);
  await expect(page.locator(".shortlist-section .step-count")).toHaveText("0 / 3 SAVED");
  await expect(page.getByText("Confirm the requirements for my original profile")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Save to shortlist" }).first()).toBeVisible();
});


test("whole-number mark boundaries reject fractional, negative, blank, and over-range values", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");

  for (const value of ["75.5", "-1", "", "101"]) {
    await page.locator("#mark-0").fill(value);
    await page.getByRole("button", { name: /Explore pathways/ }).click();
    await expect(page.locator(".form-notice")).toContainText("whole-number mark from 0 to 100");
    await expect(page.locator("#mark-0")).toHaveAttribute("aria-invalid", "true");
    const describedBy = await page.locator("#mark-0").getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toBeVisible();
  }

  await page.locator("#mark-0").fill("0");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toContainText("Pathway exploration completed");
  await expect(page.locator(".eligibility-state")).toHaveText(Array(30).fill("Unknown"));
});

test("duplicate subjects associate validation with each affected subject field", async ({ page }) => {
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Add another subject/ }).click();
  await page.locator("#subject-1").selectOption("Mathematics");
  await page.locator("#mark-1").fill("80");

  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".form-notice")).toContainText("Mathematics is listed more than once");
  for (const selector of ["#subject-0", "#subject-1"]) {
    await expect(page.locator(selector)).toHaveAttribute("aria-invalid", "true");
    const describedBy = await page.locator(selector).getAttribute("aria-describedby");
    expect(describedBy).toBeTruthy();
    await expect(page.locator(`#${describedBy}`)).toBeVisible();
  }
  await expect(page.locator(".result-card")).toHaveCount(0);
});

test("missing stage is associated with its field and reset clears validation", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("75");
  await page.getByRole("button", { name: /Explore pathways/ }).click();

  await expect(page.locator(".form-notice")).toContainText("Select your current study stage");
  await expect(page.locator("#stage")).toHaveAttribute("aria-invalid", "true");
  await expect(page.locator("#stage")).toHaveAttribute("aria-describedby", "stage-error");
  await expect(page.locator("#stage-error")).toBeVisible();

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.locator("#stage")).toHaveAttribute("aria-invalid", "false");
  await expect(page.locator("#stage")).not.toHaveAttribute("aria-describedby", "stage-error");
  await expect(page.locator(".form-notice")).toHaveCount(0);
});

test("desktop results layout has no horizontal overflow", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page.locator("#stage").selectOption("GRADE_12");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("85");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(page.locator(".result-card")).toHaveCount(30);

  const layout = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    resultCards: [...document.querySelectorAll(".result-card")].map(card => {
      const rect = card.getBoundingClientRect();
      return { left: rect.left, right: rect.right };
    })
  }));
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewportWidth);
  for (const card of layout.resultCards) {
    expect(card.left).toBeGreaterThanOrEqual(0);
    expect(card.right).toBeLessThanOrEqual(layout.viewportWidth);
  }
});


test("provisional APS fails closed when subject-selection rules are unresolved and keeps pathway eligibility UNKNOWN", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("note").filter({ hasText: "An NSC subject profile commonly contains seven subjects." })).toBeVisible();
  await expect(page.getByRole("link", { name: "Read the Department of Basic Education’s subject guidance" })).toHaveAttribute("href", /SubjectChoiceandCareerPathing/);
  await page.locator("#stage").selectOption("GRADE_12");
  const rows = [
    ["Mathematics", "29"],
    ["Physical Sciences", "30"],
    ["Life Sciences", "40"],
    ["Geography", "50"],
    ["History", "60"],
    ["Accounting", "80"],
    ["Life Orientation", "100"]
  ];
  for (let index = 0; index < rows.length; index += 1) {
    if (index > 0) await page.getByRole("button", { name: /Add another subject/ }).click();
    await page.locator(`#subject-${index}`).selectOption(rows[index][0]);
    await page.locator(`#mark-${index}`).fill(rows[index][1]);
  }
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  const aps = page.getByRole("region", { name: /Provisional APS estimate/ });
  await expect(aps).toBeVisible();
  await expect(aps.getByText("Indicative total", { exact: true })).toBeVisible();
  await expect(aps.locator(".aps-total strong")).toHaveText("22");
  await expect(aps.locator(".aps-excluded")).toContainText("Life Orientation.");
  await expect(aps).toContainText("separate from NSC pass or achievement status");
  await expect(aps.getByRole("link", { name: /UJ 2027 Undergraduate Prospectus/ })).toHaveAttribute("href", /uj_undergrad_prospectus2027/);
  await expect(page.locator(".result-card .eligibility-state").first()).toHaveText("Unknown");

  await page.getByRole("button", { name: /Add another subject/ }).click();
  await page.locator("#subject-7").selectOption("Business Studies");
  await page.locator("#mark-7").fill("100");
  await page.getByRole("button", { name: /Explore pathways/ }).click();
  await expect(aps.getByText("Indicative total", { exact: true })).toHaveCount(0);
  await expect(aps.getByRole("status")).toContainText(/subject-selection and programme-required-subject rules have not been verified/);
  await expect(page.locator(".result-card .eligibility-state").first()).toHaveText("Unknown");
});


test("issue 206 visual system remains readable and overflow-free at target widths", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Find a study path/ })).toBeVisible();
  await expect(page.getByRole("complementary", { name: "How StudyPath works" })).toBeVisible();
  await expect(page.getByText("Your subjects", { exact: true })).toBeVisible();
  await expect(page.getByText("Study pathways", { exact: true })).toBeVisible();
  await expect(page.getByText("Official sources", { exact: true })).toBeVisible();

  for (const width of [320, 480, 760, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await expect(page.locator(".hero-visual")).toBeVisible();
    const dimensions = await page.evaluate(() => ({
      documentWidth: document.documentElement.scrollWidth,
      viewportWidth: document.documentElement.clientWidth,
      bodyWidth: document.body.scrollWidth
    }));
    expect(dimensions.documentWidth, `document overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewportWidth);
    expect(dimensions.bodyWidth, `body overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewportWidth);
  }

  await page.getByRole("button", { name: /Switch to dark mode/ }).click();
  await expect(page.locator(".app-shell")).toHaveClass(/theme-dark/);
  await expect(page.getByRole("complementary", { name: "How StudyPath works" })).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  const transitionDuration = await page.locator(".primary-button").evaluate(element => getComputedStyle(element).transitionDuration);
  expect(transitionDuration.split(",").every(value => value.trim() === "0s" || value.trim() === "0ms")).toBeTruthy();
});
