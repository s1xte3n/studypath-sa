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


test("correcting invalid marks clears the error and valid entries still do not imply eligibility", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("101");
  await page.getByRole("button", { name: /Check my entries/ }).click();
  await expect(page.getByRole("status")).toContainText("whole-number mark from 0 to 100");

  await page.locator("#mark-0").fill("90");
  await expect(page.getByRole("status")).toHaveCount(0);
  await page.getByRole("button", { name: /Check my entries/ }).click();
  await expect(page.getByRole("status")).toContainText("basic form validation");
  await expect(page.getByRole("status")).toContainText("no eligibility result has been calculated");
});

test("changing the study stage clears a stale validation notice", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("");
  await page.getByRole("button", { name: /Check my entries/ }).click();
  await expect(page.getByRole("status")).toContainText("Choose a subject");

  await page.getByLabel("Your current stage").selectOption("GRADE_11");
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("reset from an error state restores the default form and removes the notice", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("");
  await page.locator("#mark-0").fill("101");
  await page.getByRole("button", { name: /Check my entries/ }).click();
  await expect(page.getByRole("status")).toBeVisible();

  await page.getByRole("button", { name: "Reset" }).click();
  await expect(page.getByLabel("Your current stage")).toHaveValue("GRADE_12");
  await expect(page.locator("#subject-0")).toHaveValue("English Home Language");
  await expect(page.locator("#mark-0")).toHaveValue("");
  await expect(page.getByRole("status")).toHaveCount(0);
});

test("home-anchor back and forward navigation keeps transient form data out of the URL", async ({ page }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("82");

  await page.getByRole("link", { name: "StudyPath SA home" }).click();
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
  await expect(page.getByRole("link", { name: "StudyPath SA home" })).toBeFocused();
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
  await expect(page.getByRole("button", { name: /Check my entries/ })).toBeVisible();

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
  await expect(page.getByRole("link", { name: "StudyPath SA home" })).toBeFocused();
  await expect(page.getByRole("link", { name: "StudyPath SA home" })).toHaveCSS("outline-style", "solid");
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
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      this.__studyPathAuditRequest = { method: String(method), url: String(url) };
      record({ channel: "XMLHttpRequest.open", method: String(method), url: String(url) });
      return originalOpen.call(this, method, url, ...args);
    };
    XMLHttpRequest.prototype.send = function(body) {
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
    OriginalWebSocket.prototype.send = function(data) {
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
  await page.locator("#subject-0").selectOption(subjectMarker);
  await page.locator("#mark-0").fill(mark);
  await page.getByRole("button", { name: /Check my entries/ }).click();
  await expect(page.getByRole("status")).toContainText("basic form validation");

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

test("transient learner entries are not persisted in browser storage or restored across tabs and reloads", async ({ page, context }) => {
  await page.goto("/");
  await page.locator("#subject-0").selectOption("Mathematics");
  await page.locator("#mark-0").fill("74");
  await page.getByRole("button", { name: /Check my entries/ }).click();

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
  await expect(secondPage.locator("#subject-0")).toHaveValue("English Home Language");
  await secondPage.close();

  await page.reload();
  await expect(page.locator("#mark-0")).toHaveValue("");
  await expect(page.locator("#subject-0")).toHaveValue("English Home Language");
});
