# Golden Horn Construction (FF-013) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bespoke featured case-study page at `/portfolio/goldenhorn-construction` that presents the Golden Horn identity — three lock-up files in navy and gold — plus the four-page site FrameFlow built, described only in terms that survive checking.

**Architecture:** One client component, `GoldenHornPage.tsx`, in the shape of the six sibling featured pages: module-scope data arrays, `<style jsx global>` carrying the prototype CSS under a `gh-` prefix, per-page Google Fonts. Assets are pulled from the live site into `public/portfolio/goldenhorn-construction/`. The site showcase uses static full-page captures, not an iframe.

**Tech Stack:** Next.js 16.2.1 (App Router, Turbopack), React 19.2.4, TypeScript, Tailwind v4, styled-jsx. No new dependencies.

**Spec:** `docs/superpowers/specs/2026-08-01-golden-horn-featured-page-design.md` — read it before Task 1. It carries the evidence behind every copy decision here.

## Global Constraints

Every task's requirements implicitly include this section.

- **Palette, exact values.** Navy `#122640`, gold `#db9420`, white `#ffffff`, light grey `#f7f7f7`. Page paper is `#fcf9f4`, ink `#21201e` — these are the case-study document's own styling and must never be presented as Golden Horn brand colours.
- **Gold never carries text on a light ground.** Measured: `#db9420` on `#fcf9f4` is **2.42:1** — fails even the large-text 3:1 floor. Use `--gold-deep: #96650f` (**4.80:1** on wash, 5.04:1 on white) for any gold-coloured text on paper. Plain `#db9420` is fine on navy (**6.00:1**) and as a fill behind navy text (**6.00:1**) and for non-text rules and chips.
- **Type system is Oswald + Montserrat only.** Roboto renders zero faces on the live site. Never name it.
- **The brand is "Golden Horn Construction"** — two words, everywhere.
- **Services are Logo and Website Design.** No photography claim anywhere.
- **No unverifiable claims.** Every factual statement traces to the spec's evidence table. If a sentence cannot be checked against the logo files or the live site, cut it.
- **Lightbox definite height.** The modal must have a *definite* height, not `max-height` — the IYN crop regression. Verify at every breakpoint.
- **Reduced motion.** `@media (prefers-reduced-motion: reduce)` disables transitions.
- **No prev/next client navigation.**
- **Alt text describes the image**, not the label beside it.
- **Verification per task:** `npx tsc --noEmit` clean, and `npm run lint` with no NEW errors over the known baseline of **6 pre-existing errors** (`MarkScene.tsx` hooks, one `setState`-in-effect) plus font/img warnings.

---

### Task 1: Asset pipeline

**Files:**
- Create: `public/portfolio/goldenhorn-construction/logo/{primary.png,knockout.png,mark.png}`
- Create: `public/portfolio/goldenhorn-construction/website/{home.jpg,services.jpg,work.jpg,contact.jpg}`

**Interfaces:**
- Produces: the seven asset paths above, referenced by every later task.

- [ ] **Step 1: Create the directories and pull the three logo files**

```bash
cd "$(git rev-parse --show-toplevel)"
D=public/portfolio/goldenhorn-construction
mkdir -p $D/logo $D/website
curl -sS -o $D/logo/primary.png  "https://ghconstruct.ca/wp-content/uploads/2025/05/x150.png"
curl -sS -o $D/logo/knockout.png "https://ghconstruct.ca/wp-content/uploads/2025/05/x150-White.png"
curl -sS -o $D/logo/mark.png     "https://ghconstruct.ca/wp-content/uploads/2025/07/cropped-site-identity-1.png"
file $D/logo/*.png
```

Expected exactly: `primary.png` PNG 527×150 RGBA, `knockout.png` PNG 810×238 RGBA, `mark.png` PNG 512×512. If any dimension differs, stop and report — the source was replaced.

- [ ] **Step 2: Capture the four pages**

Write `/tmp/gh-capture.mjs`. Chrome must already be listening on the CDP port (the repo's headless verification port is 9461; confirm with `curl -s http://127.0.0.1:9461/json/version`).

```js
const [, , port] = process.argv;
const rpc=(ws,id,m,p)=>new Promise((res,rej)=>{const on=e=>{const x=JSON.parse(e.data);if(x.id!==id)return;ws.removeEventListener("message",on);x.error?rej(new Error(JSON.stringify(x.error))):res(x.result)};ws.addEventListener("message",on);ws.send(JSON.stringify({id,method:m,params:p}))});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const fs=await import("node:fs");
const t=await(await fetch(`http://127.0.0.1:${port}/json/list`)).json();
const ws=new WebSocket(t.find(x=>x.type==="page").webSocketDebuggerUrl);
await new Promise(r=>ws.addEventListener("open",r,{once:true}));
let id=0; await rpc(ws,++id,"Page.enable",{}); await rpc(ws,++id,"Runtime.enable",{});
await rpc(ws,++id,"Emulation.setDeviceMetricsOverride",{width:1440,height:900,deviceScaleFactor:1,mobile:false});
const ev=async x=>{const{result}=await rpc(ws,++id,"Runtime.evaluate",{expression:x,awaitPromise:true,returnByValue:true});return result.value};
const OUT="public/portfolio/goldenhorn-construction/website";
for (const [name,url] of [["home","https://ghconstruct.ca/"],["services","https://ghconstruct.ca/services/"],["work","https://ghconstruct.ca/work/"],["contact","https://ghconstruct.ca/contact/"]]) {
  await rpc(ws,++id,"Page.navigate",{url}); await sleep(6000);
  await ev(`(()=>{let y=0;const t=setInterval(()=>{y+=600;window.scrollTo(0,y);if(y>document.body.scrollHeight)clearInterval(t)},50)})()`);
  await sleep(9000);
  await ev(`window.scrollTo(0,0)`); await sleep(1500);
  const h = await ev(`document.body.scrollHeight`);
  const {data}=await rpc(ws,++id,"Page.captureScreenshot",{format:"jpeg",quality:82,
    clip:{x:0,y:0,width:1440,height:Math.min(h,20000),scale:1},captureBeyondViewport:true});
  fs.writeFileSync(`${OUT}/${name}.jpg`,Buffer.from(data,"base64"));
  console.log(name,h);
}
ws.close();
```

Run: `node /tmp/gh-capture.mjs 9461`

Expected heights, within ±400px (the site is live and may drift): home ~8622, services ~4546, work ~4307, contact ~1927.

- [ ] **Step 3: Verify the captures are real page content, not an error or cookie wall**

```bash
python3 - <<'EOF'
from PIL import Image
import os
D="public/portfolio/goldenhorn-construction/website"
for n in ["home","services","work","contact"]:
    p=f"{D}/{n}.jpg"; im=Image.open(p)
    kb=os.path.getsize(p)//1024
    print(f"{n:9s} {im.size[0]}x{im.size[1]:5d} {kb:5d}KB")
    assert im.size[0]==1440, f"{n} wrong width"
    assert im.size[1]>1500, f"{n} suspiciously short — check for an error page"
EOF
```

Open `home.jpg` and confirm by eye that it shows the Golden Horn header and a hero, not a 404 or a consent overlay.

- [ ] **Step 4: Commit**

```bash
git add public/portfolio/goldenhorn-construction
git commit -m "feat(portfolio): Golden Horn assets — 3 lock-ups, 4 page captures"
```

---

### Task 2: Roster promotion and route wiring

**Files:**
- Modify: `src/data/clients.ts` — the `goldenhorn-construction` entry, in place
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/GoldenHornPage.tsx` (stub)

**Interfaces:**
- Consumes: asset paths from Task 1.
- Produces: `export function GoldenHornPage({ client }: FeaturedPageProps)`; a promoted `Client` with `brand.palette`, `brand.typefaces`, `brand.eyebrow`, `brand.tagline`.

- [ ] **Step 1: Replace the roster one-liner, in place**

`getFrameNumber` is `findIndex + 1`, so **position is the frame number**. Golden Horn is at index 12 → frame 13. Replace the existing single line — do not move it, do not append.

```ts
  {
    slug: "goldenhorn-construction",
    name: "Golden Horn Construction",
    services: ["Logo", "Website Design"],
    year: "2026",
    location: "Stittsville, ON",
    runtime: "Live since 2025",
    scene: "INT. FINISH SCHEDULE — DAY",
    synopsis:
      "An identity and a website for an Ottawa interior-finishing contractor. One gold horse drawn as an open line figure, cut into three files — primary, knockout, and a standalone mark for the favicon — against a navy grotesque wordmark. Plus ghconstruct.ca: four pages, live, with a consented contact form on two of them.",
    featured: true,
    brand: {
      palette: [
        { name: "Horn Navy",  hex: "#122640", role: "surface"   },
        { name: "Gold",       hex: "#db9420", role: "accent"    },
        { name: "White",      hex: "#ffffff", role: "secondary" },
        { name: "Light Grey", hex: "#f7f7f7", role: "ink"       },
      ],
      typefaces: [
        { role: "Display", name: "Oswald",     googleFontName: "Oswald",     weights: "300;400;500;600;700" },
        { role: "Text",    name: "Montserrat", googleFontName: "Montserrat", weights: "400;500;600;700" },
      ],
      eyebrow: "Reel 013 · Golden Horn · Case Study",
      tagline: "Drawn once. Cut three ways.",
    },
  },
```

- [ ] **Step 2: Write the stub component**

```tsx
"use client";

import type { FeaturedPageProps } from "@/app/portfolio/[slug]/featured";

export function GoldenHornPage({ client }: FeaturedPageProps) {
  return <main className="gh-page">{client.name}</main>;
}
```

- [ ] **Step 3: Register it**

In `src/app/portfolio/[slug]/featured.ts`, add the import beside its siblings and the map entry:

```ts
import { GoldenHornPage } from "@/components/portfolio/featured/GoldenHornPage";
```
```ts
  "goldenhorn-construction":        GoldenHornPage,
```

- [ ] **Step 4: Verify the frame number is still 13**

```bash
npx tsc --noEmit && node -e "
const s=require('fs').readFileSync('src/data/clients.ts','utf8');
const slugs=[...s.matchAll(/^\s*slug: \"([a-z0-9-]+)\"/gm)].map(m=>m[1]);
const i=slugs.indexOf('goldenhorn-construction');
console.log('index',i,'-> frame',String(i+1).padStart(2,'0'));
if(i+1!==13) throw new Error('frame drifted from 13');
"
```
Expected: `index 12 -> frame 13`.

- [ ] **Step 5: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/\[slug\]/featured.ts src/components/portfolio/featured/GoldenHornPage.tsx
git commit -m "feat(portfolio): promote Golden Horn, wire FF-013 route"
```

---

### Task 3: Shell — tokens, fonts, rail, hero

**Files:**
- Modify: `src/components/portfolio/featured/GoldenHornPage.tsx`

**Interfaces:**
- Consumes: `client` prop from Task 2; asset paths from Task 1.
- Produces: the `.gh-page` root, the CSS custom properties every later section uses (`--navy`, `--gold`, `--gold-deep`, `--wash`, `--ink`, `--grey`, `--rule`), and the `<style jsx global>` block later tasks append to.

Port the prototype's CSS **verbatim** for `.gh-rail`, `.gh-hero*`, `.gh-kicker`, `.gh-stamp`, `.gh-h1`, `.gh-deck`, `.gh-facts`, `.gh-plate*`, `.gh-trades-strip`, `.gh-sec-head` — the timing, spacing and letter-spacing values are why it looks right. Two deliberate changes: add `--gold-deep`, and drop the `Roboto` family from the font stack and the Google Fonts URL.

- [ ] **Step 1: Token block and fonts**

```tsx
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
/>
```

```css
.gh-page{
  --navy:#122640; --gold:#db9420; --gold-deep:#96650f;
  --wash:#fcf9f4; --sand:#e0ded2; --ink:#21201e; --grey:#55534f;
  --rule:rgba(18,38,64,.16);
  background:var(--wash); color:var(--ink);
  font-family:"Montserrat",system-ui,sans-serif; -webkit-font-smoothing:antialiased;
}
```

`--grey` is darkened from the prototype's `#7d7a74` to `#55534f`. On `#fcf9f4` the original measures **4.07:1** — under the 4.5 floor, and it is used only on small text (9.5–11.5px plate dimensions, swatch labels, the page counter, the figcaption, the sign-off labels). `#55534f` measures **7.31:1**.

- [ ] **Step 2: The rail**

```tsx
<header className="gh-rail">
  <Link className="gh-back" href="/portfolio">← Portfolio</Link>
  <span className="gh-rail-mid">FINISH SCHEDULE <b>FF-013</b> · GOLDEN HORN CONSTRUCTION</span>
  <span className="gh-rail-end">STITTSVILLE, ON · 2026</span>
</header>
```

- [ ] **Step 3: The hero**

Copy is final — use it verbatim. It leads on the mark because the site half of the prototype's story did not survive verification (spec, evidence table rows 1–5).

```tsx
<section className="gh-hero">
  <div className="gh-hero-grid">
    <div>
      <p className="gh-kicker"><span className="gh-stamp">ID</span>Logo · Website Design</p>
      <h1 className="gh-h1">A NEW MARK.<br />DRAWN ONCE.<br /><em>CUT THREE WAYS.</em></h1>
      <p className="gh-deck">
        <b>Golden Horn Construction</b> finishes interiors in Ottawa — drywall, paint, floors,
        and the property management work that keeps the same buildings calling back. They needed
        a mark that could sit on a white page and a navy one <b>without being redrawn</b>, and a
        site to put it on. One gold horse, a navy grotesque, three files — and ghconstruct.ca,
        four pages, live.
      </p>
      <dl className="gh-facts">
        <div><dt>We built</dt><dd>Identity · Website</dd></div>
        <div><dt>We set</dt><dd>Navy &amp; gold · Oswald</dd></div>
        <div><dt>We shipped</dt><dd>ghconstruct.ca — live</dd></div>
      </dl>
    </div>
    <aside className="gh-plate">
      <div className="gh-plate-head"><span>PRIMARY LOCK-UP</span><span className="gh-plate-dim">1 OF 3</span></div>
      <div className="gh-plate-art">
        <img className="gh-plate-img"
             src="/portfolio/goldenhorn-construction/logo/primary.png"
             alt="Gold line-drawn horse head beside a navy Golden Horn Construction wordmark" />
      </div>
      <p className="gh-plate-foot">
        Gold mark, navy wordmark. The site header, the footer and the favicon are all cut from this drawing.
      </p>
    </aside>
  </div>
  <ul className="gh-trades-strip">
    <li>Drywall Installation &amp; Repair</li><li>Interior &amp; Exterior Painting</li>
    <li>Flooring Installation &amp; Renovation</li><li>Property Management Services</li>
  </ul>
</section>
```

- [ ] **Step 4: Verify**

`npx tsc --noEmit`, then load `http://localhost:3000/portfolio/goldenhorn-construction` and confirm the rail, hero, logo plate and trade strip render with no console errors.

- [ ] **Step 5: Commit**

```bash
git commit -am "feat(portfolio): Golden Horn shell — tokens, rail, hero"
```

---

### Task 4: The Mark and The Lock-ups

**Files:**
- Modify: `src/components/portfolio/featured/GoldenHornPage.tsx`

**Interfaces:**
- Consumes: tokens from Task 3.
- Produces: `MARK_NOTES` and `GROUNDS` module-scope arrays; the `.gh-mark`, `.gh-stage*`, `.gh-swatch-row`, `.gh-note*` CSS.

- [ ] **Step 1: The Mark section**

Notes are final. They replace the prototype's three, which asserted a uniform stroke weight and a 32px reduction — both measured false (spec, evidence rows 6–7).

```tsx
const MARK_NOTES = [
  { no: "01", title: "One colour, one contour",
    body: "The horse is a single open line figure in gold — no fills, no second colour, no gradient. That is what lets the same drawing sit on a white page and a navy one without a redraw." },
  { no: "02", title: "A calligraphic stroke",
    body: "The mane is not a uniform weight. Strands swell and taper to points, from roughly one pixel to nineteen across the master file. It reads as drawn rather than constructed, which is what gives it warmth beside a hard grotesque wordmark." },
  { no: "03", title: "Three files, three jobs",
    body: "Primary for light grounds. Knockout for navy. And the mark on its own, without the wordmark, for the favicon and the social avatar — anywhere the name is already on the page." },
];
```

The section shows `logo/mark.png` large on the paper ground beside the three notes. Numerals use `--gold-deep`.

- [ ] **Step 2: The Lock-ups ground switcher**

Two grounds, because two are real. The prototype's third ("Sand") is the case-study document's own paper, not a Golden Horn ground.

```tsx
const GROUNDS = [
  { key: "white", label: "White", hex: "#ffffff",
    src: "/portfolio/goldenhorn-construction/logo/primary.png",
    alt: "Golden Horn primary lock-up on white — navy wordmark, gold mark",
    note: "The site's own ground, and the default. Navy wordmark, gold mark — the pairing everything else is measured against." },
  { key: "navy", label: "Horn Navy", hex: "#122640",
    src: "/portfolio/goldenhorn-construction/logo/knockout.png",
    alt: "Golden Horn knockout lock-up on navy — white wordmark, gold mark",
    note: "The knockout, for the navy bands that run through the site and anything printed dark. The mark stays gold; only the type drops out." },
];
```

The stage background is driven by `hex`; the active button gets `.on`. Keep the prototype's 260ms background transition.

- [ ] **Step 3: Verify contrast on both grounds**

Confirm no gold text sits on the paper ground. Section meta, numerals and stage notes must resolve to `--gold-deep` or navy. Measure on the rendered page:

```js
// in the browser console on the page
[...document.querySelectorAll('.gh-mark *')].filter(e=>{
  const c=getComputedStyle(e).color; return /219,\s*148,\s*32/.test(c);
}).map(e=>e.className)
```
Expected: empty array.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat(portfolio): Golden Horn mark + lock-up grounds"
```

---

### Task 5: Colour & Type, What They Do, Finish Schedule

**Files:**
- Modify: `src/components/portfolio/featured/GoldenHornPage.tsx`

**Interfaces:**
- Produces: `PALETTE`, `TRADES`, `SCHEDULE` arrays; `.gh-spec*`, `.gh-swatches`, `.gh-type*`, `.gh-trades-sec`, `.gh-trades-list`, `.gh-sched`, `.gh-table*`, `.gh-status` CSS.

- [ ] **Step 1: Palette and type (navy ground)**

```tsx
const PALETTE = [
  { name: "Horn Navy",  hex: "#122640" },
  { name: "Gold",       hex: "#db9420" },
  { name: "White",      hex: "#ffffff" },
  { name: "Light Grey", hex: "#f7f7f7" },
];
```

Type list is two entries, not three. Roboto is declared by the client site's theme and renders zero faces:

```tsx
const TYPE = [
  { role: "Display", name: "Oswald", cls: "gh-type-oswald",
    note: "Condensed, tall x-height. Headlines and card titles — it holds a long trade name on one line without shrinking." },
  { role: "Text & UI", name: "Montserrat", cls: "gh-type-mont",
    note: "Body copy, buttons, labels and the nav. One face doing the reading and the interface both." },
];
```

- [ ] **Step 2: What They Do (navy ground)**

Lines describe the trade's scope only — no method claims, which cannot be verified.

```tsx
const TRADES = [
  { name: "Drywall Installation & Repair",       line: "Board, tape, mud and sand — installation and repair." },
  { name: "Interior & Exterior Painting",        line: "Inside and out, residential and commercial." },
  { name: "Flooring Installation & Renovation",  line: "Installation and renovation, subfloor up." },
  { name: "Property Management Services",        line: "The recurring side — maintain, upgrade, protect." },
];
```

- [ ] **Step 3: Finish Schedule table (paper ground)**

Seven rows, every one verified in the spec.

```tsx
const SCHEDULE: [string, string, string][] = [
  ["Primary lock-up",  "Horse mark + wordmark, horizontal",     "Delivered"],
  ["Knockout lock-up", "White type, gold mark, dark grounds",   "Delivered"],
  ["Standalone mark",  "Square, favicon and avatars",           "Delivered"],
  ["Colour system",    "Navy #122640, gold #db9420",            "Delivered"],
  ["Type system",      "Oswald display · Montserrat text",      "Delivered"],
  ["Website",          "Four pages — home, services, work, contact", "Live"],
  ["Contact form",     "Consent + CAPTCHA, on two pages",       "Live"],
];
```

`.gh-status` is navy text on a gold fill — 6.00:1, passes.

- [ ] **Step 4: Verify and commit**

`npx tsc --noEmit`; confirm the table scrolls horizontally below 560px rather than overflowing the document.

```bash
git commit -am "feat(portfolio): Golden Horn spec, trades, finish schedule"
```

---

### Task 6: The Site showcase

**Files:**
- Modify: `src/components/portfolio/featured/GoldenHornPage.tsx`

**Interfaces:**
- Consumes: the four captures from Task 1.
- Produces: `SHOTS` array; `.gh-site*`, `.gh-shot-bar`, `.gh-visit` CSS.

- [ ] **Step 1: The SHOTS array**

Captions describe verifiable page structure. The prototype's captions claimed the site "answers the question before the scroll", opened navy-and-gold "from the first screen", and had a "portfolio shelf" — all three contradicted (spec, evidence rows 1, 3, 5).

```tsx
const SHOTS = [
  { label: "Home", path: "/", src: "/portfolio/goldenhorn-construction/website/home.jpg",
    note: "The longest of the four — hero, a stat band, service blocks, a testimonial and a closing call to action." },
  { label: "Services", path: "/services/", src: "/portfolio/goldenhorn-construction/website/services.jpg",
    note: "Where the navy-and-gold system lands hardest: the four trades as four cards, then a navy band of capability blocks." },
  { label: "Work", path: "/work/", src: "/portfolio/goldenhorn-construction/website/work.jpg",
    note: "A project grid, and the second placement of the contact form — consent checkbox and CAPTCHA included." },
  { label: "Contact", path: "/contact/", src: "/portfolio/goldenhorn-construction/website/contact.jpg",
    note: "The shortest page. Address, hours, socials, and the same form." },
];
```

- [ ] **Step 2: The browser frame**

Port the prototype's markup: `.gh-shot-bar` (dots, live URL, "BUILT BY US", "● LIVE"), `.gh-site-tabs`, `.gh-site-window` (fixed height `620px`, `overflow-y:auto`), prev/next, and the gold "Visit this page ↗" anchor pointing at `https://ghconstruct.ca{path}` with `target="_blank" rel="noopener noreferrer"`.

Three requirements the prototype does not meet:
- Tabs are `<button type="button">` with `aria-selected` and `role="tab"`; the window is `role="tabpanel"`.
- Changing tab resets `scrollTop` to 0 (the prototype does this — keep it).
- The `<img>` carries `loading="lazy"` and explicit `width={1440}` `height={<real height>}` per shot, so the window does not jump as each capture loads. Read the real heights from Task 1's output.

- [ ] **Step 3: Verify**

At 1440, 880 and 520: the window scrolls internally, the document does not scroll horizontally, all four tabs switch, and each "Visit this page" resolves to the right live URL. Below 560px the window height drops to 420px per the prototype's media query.

- [ ] **Step 4: Commit**

```bash
git commit -am "feat(portfolio): Golden Horn site showcase — 4 pages, tabbed"
```

---

### Task 7: Sign-off, modal with focus trap, motion, responsive

**Files:**
- Modify: `src/components/portfolio/featured/GoldenHornPage.tsx`

**Interfaces:**
- Consumes: everything above.
- Produces: the finished page.

- [ ] **Step 1: Sign-off footer**

Three cells — PREPARED BY / FrameFlow, SCHEDULE / FF-013, STATUS / SHIPPED (the status uses `--gold-deep`, not `--gold`, because it sits on paper). Then the lock-up button that opens the modal, and `← Back to portfolio` linking to `/portfolio`.

- [ ] **Step 2: The modal, with a definite height**

The IYN regression: a lightbox sized with `max-height` crops its image. Give the inner panel a **definite** height.

```css
.gh-modal-inner{
  background:#fcf9f4; padding:48px 56px;
  width:min(680px,88vw);
  height:min(70vh,520px);
  display:flex; align-items:center; justify-content:center;
}
.gh-modal-img{max-width:100%; max-height:100%; width:auto; height:auto; display:block}
```

- [ ] **Step 3: Focus trap**

This is the first featured page to trap focus; the other fifteen do not. On open, store `document.activeElement`, move focus to the close button, and confine Tab within the modal. On close, restore focus to the opener.

```tsx
useEffect(() => {
  if (!open) return;
  const prev = document.activeElement as HTMLElement | null;
  const panel = panelRef.current;
  closeRef.current?.focus();
  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key !== "Tab" || !panel) return;
    const f = panel.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };
  document.addEventListener("keydown", onKey);
  return () => { document.removeEventListener("keydown", onKey); prev?.focus(); };
}, [open]);
```

The modal root gets `role="dialog" aria-modal="true"` and an `aria-label`.

- [ ] **Step 4: Reduced motion**

```css
@media (prefers-reduced-motion: reduce){
  .gh-page *,.gh-page *::before,.gh-page *::after{
    transition-duration:.01ms !important; animation-duration:.01ms !important; animation-iteration-count:1 !important;
  }
}
```

- [ ] **Step 5: Full verification pass**

- `npm run build` — all static pages generate, including `/portfolio/goldenhorn-construction`.
- Breakpoints 1440 / 1080 / 880 / 520 / 390: no horizontal document overflow (`scrollWidth === clientWidth`), no clipped headings (`clientHeight === scrollHeight` on every `h1`/`h2` inside an `overflow:hidden` ancestor).
- Modal at each breakpoint: opens, image is fully visible with nothing cropped, Escape closes, backdrop click closes, Tab cycles inside, focus returns to the opener.
- Measure contrast on the rendered page; every text node must clear 4.5:1 (or 3:1 at ≥24px / ≥18.66px bold).
- Zero console errors.

- [ ] **Step 6: Commit**

```bash
git commit -am "feat(portfolio): Golden Horn sign-off, trapped modal, motion guards"
```

---

## Self-review

**Spec coverage.** All nine sections of the spec's section-flow table map to a task: rail and hero → Task 3; The Mark and The Lock-ups → Task 4; Colour & Type, What They Do, Finish Schedule → Task 5; The Site → Task 6; Sign-off → Task 7. Assets → Task 1, wiring → Task 2. Every one of the spec's nine corrected claims is enacted: rows 1–5 in the Task 3 hero copy and Task 6 captions, rows 6–7 in the Task 4 mark notes, row 8 in the Task 5 type list, row 9 in the Task 5 palette.

**Placeholder scan.** No TBDs. Every copy string, hex value, array and CSS block is written out. The only value read at implementation time is the four captures' pixel heights (Task 6 `height` attributes), which Task 1 Step 2 prints.

**Type consistency.** `GROUNDS` items carry `{key,label,hex,src,alt,note}` and are consumed only in Task 4. `SHOTS` carry `{label,path,src,note}` and are consumed only in Task 6. `SCHEDULE` is typed `[string,string,string][]` and indexed positionally in Task 5. `MARK_NOTES` carry `{no,title,body}`. `--gold-deep` is defined in Task 3 and referenced in Tasks 4, 5 and 7.
