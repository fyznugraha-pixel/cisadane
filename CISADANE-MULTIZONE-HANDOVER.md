# 🤝 Handover — Festival Cisadane on `tactlink.com/festivalcisadane` (Next.js Multi-Zone)

**To:** whoever owns the **Cisadane app repo + `cisadane.vercel.app` Vercel project**
**From:** Gene (TactLink) · **Date:** 2026-06-23 · **Status:** ⛔ Page loads **unstyled** through `tactlink.com` — one config change on your side fixes it.

---

## 🎯 TL;DR
TactLink's landing page (which owns `tactlink.com`) now **proxies `/festivalcisadane/*`** to your Cisadane deployment, so the festival can live at **`tactlink.com/festivalcisadane`** while staying its own app/repo/Vercel project. That proxy is **live and working** — the HTML loads.

**But the page renders with no CSS/JS.** Cause: your app emits its assets at the **root** (`/_next/static/…`) instead of under the sub-path (`/festivalcisadane/_next/…`). Those root requests can't be proxied (they collide with the landing page's own `/_next`), so every stylesheet/script 404s.

✅ **Fix is one Next.js setting on your side: `basePath: "/festivalcisadane"`.** Same setup the Asia-Africa Festival uses on `tactlink.com/aaf2026`.

---

## 🔬 Evidence (so it's not hand-wavy)
Your HTML references assets at the root, with no sub-path prefix:
```html
<link href="/_next/static/chunks/1y3wcprol0hwk.css">     <!-- should be /festivalcisadane/_next/... -->
<script src="/_next/static/chunks/…">
<img src="/_next/image?url=%2Flogo%2Flogo.png&w=3840&q=75">
```
Live status codes today:

| URL | Code | |
|---|---|---|
| `cisadane.vercel.app/_next/static/…css` | **200** | assets served at root |
| `cisadane.vercel.app/festivalcisadane/_next/…css` | **404** | ❌ not under the sub-path (= no basePath) |
| `tactlink.com/_next/…css` | **404** | hits the *landing* app, which doesn't have your chunks |
| `tactlink.com/festivalcisadane/…` (HTML) | **200** | ✅ the page proxies fine — only assets fail |

Routing today: `cisadane.vercel.app/` → 307 → `/festivalcisadane` → 307 → `/festivalcisadane/id`. So `/festivalcisadane` is currently a **literal in-app route prefix** — that's why assets stay at root.

---

## 🔧 The fix (in the Cisadane repo)
1. **Add `basePath: "/festivalcisadane"`** to `next.config.(ts|js)`:
   ```ts
   const nextConfig = {
     basePath: "/festivalcisadane",
     // ...existing config
   };
   ```
   This namespaces **everything** — `_next/static`, `_next/image`, fonts — under `/festivalcisadane/…`, which the proxy already forwards.

2. **Remove the literal `/festivalcisadane`** you currently bake into routes/redirects. With `basePath` set, Next prepends it automatically — leaving it in would double up to `/festivalcisadane/festivalcisadane`. So internally the app goes back to `/` → `/id`; the public URL stays `tactlink.com/festivalcisadane/id`.

3. **Prefix any raw `fetch("/api/…")`** calls (e.g. registration, admin) with the basePath — raw `fetch` does **not** auto-apply basePath and will 404 otherwise:
   ```ts
   const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
   fetch(`${bp}/api/…`)
   ```
   (`next/link`, `next/image`, and `<Image>` already honor basePath — only raw `fetch`/`<a href>` to APIs need this.)

4. **Redeploy.** After deploy:
   - `cisadane.vercel.app/festivalcisadane` → still works standalone, now with assets at `/festivalcisadane/_next/…`.
   - `cisadane.vercel.app/` (bare root) → will now **404 — that's expected/correct** (content lives under the sub-path).

> 💡 Lighter alternative = `assetPrefix: "https://cisadane.vercel.app"`. Avoid it: it doesn't reliably cover the `/_next/image` optimizer, so images would still 404 through the proxy. **`basePath` is the complete fix.**

---

## ✅ Verify (after your redeploy)
- [ ] `tactlink.com/festivalcisadane` → fully **styled**, countdown timer ticking, images visible.
- [ ] DevTools → Network: **no 404s** on `/festivalcisadane/_next/…`.
- [ ] URL stays on **`tactlink.com`** (no jump to `cisadane.vercel.app`).
- [ ] Registration / any API form still submits.

---

## ℹ️ Already handled (no action needed)
- **Landing-side proxy** (`/festivalcisadane/*` → `cisadane.vercel.app`) — done & deployed by TactLink.
- **Stable alias** — TactLink proxies to `https://cisadane.vercel.app` (the Production alias).
- **Deployment Protection** — already OFF on your Production (verified — the page reaches us, no 401).

**Questions on the landing/domain side → Gene (TactLink). Questions on the Cisadane code → your team.**
