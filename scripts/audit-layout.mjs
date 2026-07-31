// Dev-only layout audit: drives the installed Chrome over CDP (no extra
// deps — node 24 has a global WebSocket) and reports elements that overflow
// the viewport horizontally, plus full-page screenshots.
//
// Usage: node scripts/audit-layout.mjs <url> <width> <height> [shotPath]
import { execFile } from "node:child_process";
import { writeFileSync } from "node:fs";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [url, w = "390", h = "844", shotPath] = process.argv.slice(2);
const PORT = 9222;

const chrome = execFile(CHROME, [
  "--headless=new",
  "--disable-gpu",
  `--remote-debugging-port=${PORT}`,
  "--no-first-run",
  `--window-size=${w},${h}`,
  "about:blank",
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getWsUrl() {
  for (let i = 0; i < 40; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const tabs = await res.json();
      const page = tabs.find((t) => t.type === "page");
      if (page) return page.webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("chrome did not come up");
}

const ws = new WebSocket(await getWsUrl());
await new Promise((r) => (ws.onopen = r));
let id = 0;
const pending = new Map();
ws.onmessage = (ev) => {
  const msg = JSON.parse(ev.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}) =>
  new Promise((resolve) => {
    const msgId = ++id;
    pending.set(msgId, resolve);
    ws.send(JSON.stringify({ id: msgId, method, params }));
  });

await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: Number(w),
  height: Number(h),
  deviceScaleFactor: 1,
  mobile: Number(w) < 600,
});
await send("Page.navigate", { url });
await sleep(6000); // dev server compile + hydration

const evalJs = async (expression) => {
  const res = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
  });
  return res.result?.result?.value;
};

const report = await evalJs(`(() => {
  const vw = document.documentElement.clientWidth;
  const bad = [];
  for (const el of document.querySelectorAll('*')) {
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.left < -1) {
      // Only report the outermost offenders to keep the list readable.
      if (el.parentElement) {
        const pr = el.parentElement.getBoundingClientRect();
        if (pr.right > vw + 1 || pr.left < -1) continue;
      }
      bad.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.className?.toString() ?? '').slice(0, 120),
        left: Math.round(r.left), right: Math.round(r.right),
        width: Math.round(r.width),
      });
    }
  }
  return {
    viewport: vw,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    offenders: bad.slice(0, 20),
  };
})()`);

console.log(JSON.stringify(report, null, 2));

if (shotPath) {
  const shot = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
  });
  writeFileSync(shotPath, Buffer.from(shot.result.data, "base64"));
  console.log(`shot -> ${shotPath}`);
}

ws.close();
chrome.kill();
process.exit(0);
