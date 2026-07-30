# IYN Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for IYN Education & Consultancy at `/portfolio/iyn`, with a live same-origin embed of the client's own marketing site.

**Architecture:** One self-contained client component (`IYNPage.tsx`) with scoped `styled-jsx`, its own gradient rail + sign-off (no global Navbar/Footer), reusing `LoadingTransition` and the styled lightbox. Four numbered sections: the Portal (real launch film), the Site (interactive snapshot embed), the Feed (4 pillars + 6 posts → lightbox), the Reel (real vertical film). Assets: 6 provided posts, 2 provided videos + posters, the client's white logo, and a static snapshot of 5 marketing routes built from the client's source. Stacked on `feat/aydin-cpa-case-study`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, ffmpeg + pngquant (asset prep).

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"`, fully bespoke, **no global `<Navbar>`/`<Footer>`**. This page **does** use `LoadingTransition` (consistent with all siblings).
- **All content real** — copy verbatim from the approved prototype; the 6 posts map to fixed registers (verified by viewing); both videos are the client's real films.
- Palette: blue-a `#0349AA`, blue-b `#0091FF`, amber `#EC8D13`, light `#F4F5FA`, paper `#FFF`, ink `#10151F`, mute `#6B7280`, rule `rgba(16,21,31,.12)`.
- Type: **Oswald** (300;400;500;700) + **Poppins** (300;400;500;600) via Google Fonts `<link>` with two `<link rel="preconnect">` (incl. `crossOrigin=""` on gstatic). The prototype's body stack begins with `"Garet"` (not a Google font) — keep the stack verbatim; Poppins is the shipped face.
- JSX text must escape apostrophes/quotes (`&rsquo;` `&ldquo;` `&amp;`) for `react/no-unescaped-entities`. Data in plain JS string literals does **not** need escaping.
- **`prefers-reduced-motion` must disable** the lightbox fade/pop, post-cell hover transform, and nav/tab transitions.
- **Never modify the client's repo** at `/Users/barandiloglu/Desktop/Projects/iyn-app` — all snapshot work happens in a throwaway copy.
- No unit-test framework; verification per task = `npx tsc --noEmit` + `npm run lint` (no NEW errors vs the known baseline: **6 pre-existing errors** in unrelated files — ThemeProvider/ThemeToggle/MarkScene/admin-analytics — plus `no-page-custom-font` / `no-img-element` warnings every featured page carries) + `npm run build`. Portfolio pages client-render — verify routes via `npm run build`, not curl HTML.
- Frame number derives from `getFrameNumber(client)` (roster index 15 → `"016"`) — never hardcoded.
- Shell note: some sandboxed shells reset `PATH`; prefix asset/build commands with
  `export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"`.

---

### Task 1: Media assets (posts, videos, posters, logo)

Place the 6 posts, 2 videos, 2 posters and the white logo under `public/portfolio/iyn/`. No app code, no site snapshot (that is Task 2).

**Files:**
- Create: `public/portfolio/iyn/posts/{01-hook-pahali-okul,02-davet-siradaki-adim,03-garip-bolum-turfgrass,04-garip-bolum-bioinformatik,05-kritik-tarihler,06-portal-lansman}.jpg`
- Create: `public/portfolio/iyn/video/{portal-tour.mp4,portal-tour-poster.jpg,imperial-reel.mp4,imperial-reel-poster.jpg}`
- Create: `public/portfolio/iyn/brand/logo-white.png`

**Source mapping (verified by viewing — do not re-derive):** all under `/Users/barandiloglu/Downloads/IYN Portfolio/`

| Source | Target |
|---|---|
| `WhatsApp Image 2026-07-29 at 14.34.19 (2).jpeg` | `posts/01-hook-pahali-okul.jpg` |
| `WhatsApp Image 2026-07-29 at 14.34.19 (5).jpeg` | `posts/02-davet-siradaki-adim.jpg` |
| `WhatsApp Image 2026-07-29 at 14.34.19.jpeg`     | `posts/03-garip-bolum-turfgrass.jpg` |
| `WhatsApp Image 2026-07-29 at 14.34.19 (1).jpeg` | `posts/04-garip-bolum-bioinformatik.jpg` |
| `WhatsApp Image 2026-07-29 at 14.34.19 (4).jpeg` | `posts/05-kritik-tarihler.jpg` |
| `WhatsApp Image 2026-07-29 at 14.34.19 (3).jpeg` | `posts/06-portal-lansman.jpg` |
| `WhatsApp Video 2026-07-29 at 14.34.26 (1).mp4` (1280×720) | `video/portal-tour.mp4` |
| `WhatsApp Image 2026-07-29 at 14.34.26 (1).jpeg` (1280×720) | `video/portal-tour-poster.jpg` |
| `WhatsApp Video 2026-07-29 at 14.34.26.mp4` (720×1290) | `video/imperial-reel.mp4` |
| `WhatsApp Image 2026-07-29 at 14.34.26.jpeg` (720×1290) | `video/imperial-reel-poster.jpg` |

- [ ] **Step 1: Create directories**

```bash
export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/iyn"
mkdir -p "$R/posts" "$R/video" "$R/brand"
```

- [ ] **Step 2: Copy + compress the 6 posts** (1080×1350 sources; keep width, re-encode)

```bash
S="/Users/barandiloglu/Downloads/IYN Portfolio"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/iyn"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 14.34.19 (2).jpeg" -q:v 5 "$R/posts/01-hook-pahali-okul.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 14.34.19 (5).jpeg" -q:v 5 "$R/posts/02-davet-siradaki-adim.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 14.34.19.jpeg"     -q:v 5 "$R/posts/03-garip-bolum-turfgrass.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 14.34.19 (1).jpeg" -q:v 5 "$R/posts/04-garip-bolum-bioinformatik.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 14.34.19 (4).jpeg" -q:v 5 "$R/posts/05-kritik-tarihler.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 14.34.19 (3).jpeg" -q:v 5 "$R/posts/06-portal-lansman.jpg"
```

- [ ] **Step 3: Transcode both videos + compress both posters**

```bash
S="/Users/barandiloglu/Downloads/IYN Portfolio"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/iyn"
ffmpeg -y -loglevel error -i "$S/WhatsApp Video 2026-07-29 at 14.34.26 (1).mp4" -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k -movflags +faststart "$R/video/portal-tour.mp4"
ffmpeg -y -loglevel error -i "$S/WhatsApp Video 2026-07-29 at 14.34.26.mp4"     -c:v libx264 -crf 26 -preset slow -c:a aac -b:a 128k -movflags +faststart "$R/video/imperial-reel.mp4"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 14.34.26 (1).jpeg" -q:v 4 "$R/video/portal-tour-poster.jpg"
ffmpeg -y -loglevel error -i "$S/WhatsApp Image 2026-07-29 at 14.34.26.jpeg"     -q:v 4 "$R/video/imperial-reel-poster.jpg"
```

- [ ] **Step 4: Download the client's white logo**

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/iyn"
curl -sL -A "Mozilla/5.0" "https://www.iyn.com.tr/logo-white.png" -o "$R/brand/logo-white.png" -w "logo-white -> %{http_code} %{size_download}b\n" --max-time 40
pngquant --force --skip-if-larger --output "$R/brand/logo-white.png" "$R/brand/logo-white.png" 2>/dev/null || true
```
If the download is not HTTP 200 or the file is not a valid PNG, fall back to
`https://www.iyn.com.tr/logo.png` and report the substitution.

- [ ] **Step 5: Verify** — 6 posts + 2 videos + 2 posters + logo; sizes sane.

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/iyn"
ls -1 "$R/posts" | wc -l   # expect 6
du -h "$R"/posts/*.jpg "$R"/video/* "$R"/brand/*.png | sort -k2
ffprobe -v error -show_entries format=duration -of csv=p=0 "$R/video/portal-tour.mp4"    # ~74.8
ffprobe -v error -show_entries format=duration -of csv=p=0 "$R/video/imperial-reel.mp4"  # ~25.8
```
Expected: posts ≤ ~350 KB each; videos ≤ ~10 MB each; posters ≤ ~250 KB; logo ≤ ~60 KB.
**Read these files with the Read tool** to confirm content matches the name:
`posts/01-hook-pahali-okul.jpg` (ochre band, "PAHALI OKUL = İYİ OKUL MU?"),
`posts/03-garip-bolum-turfgrass.jpg` (Turfgrass Science), `posts/06-portal-lansman.jpg`
(portal device mockups), `video/imperial-reel-poster.jpg` (vertical), and
`brand/logo-white.png` (white İYN wordmark). If any mismatch, STOP and report.

- [ ] **Step 6: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/iyn
git commit -m "feat(portfolio): add IYN media (6 posts, 2 films, posters, logo)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: Static snapshot of the client's marketing site

Build the 5 marketing routes from the client's source into `public/portfolio/iyn/site/`. **The client's repo must not be modified** — work in a throwaway copy.

**Files:**
- Create: `public/portfolio/iyn/site/**` (static export)

**Interfaces:**
- Produces: `site/en/index.html`, `site/en/exams/index.html`, `site/en/courses/index.html`, `site/en/study-abroad/index.html`, `site/en/services/index.html` — the paths Task 5's `SHOTS` array references.

- [ ] **Step 1: Copy the client's app to a temp dir (repo untouched) and hard-link node_modules.** Turbopack rejects a symlinked `node_modules`, so hard-link it.

```bash
export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
SRC="/Users/barandiloglu/Desktop/Projects/iyn-app"
W="/tmp/iyn-export"; rm -rf "$W"; mkdir -p "$W"
rsync -a --exclude node_modules --exclude .next --exclude .git "$SRC/" "$W/"
cp -al "$SRC/node_modules" "$W/node_modules" 2>/dev/null || cp -a "$SRC/node_modules" "$W/node_modules"
echo "repo untouched: $([ -d "$SRC/.git" ] && echo yes)"
```

- [ ] **Step 2: Strip everything except the 5 marketing routes.** The Portal, dashboards and 223 API routes are DB/auth-bound and cannot be statically exported.

```bash
W="/tmp/iyn-export"; L="$W/src/app/[lang]"
# remove all API routes and non-marketing app segments
rm -rf "$W/src/app/api"
find "$W/src/app" -maxdepth 1 -mindepth 1 -type d ! -name '[lang]' -exec rm -rf {} + 2>/dev/null
# keep only the 5 marketing routes under [lang]
find "$L" -maxdepth 1 -mindepth 1 -type d \
  ! -name exams ! -name courses ! -name study-abroad ! -name services \
  -exec rm -rf {} + 2>/dev/null
# remove metadata routes that block static export
find "$W/src/app" -maxdepth 2 \( -name "sitemap.*" -o -name "robots.*" -o -name "opengraph-image*" -o -name "manifest.*" \) -exec rm -rf {} + 2>/dev/null
ls "$L"
```
Expected remaining under `[lang]`: `exams`, `courses`, `study-abroad`, `services`, plus `page.tsx` and `layout.tsx` and any shared files.

- [ ] **Step 3: Write the export config** at `/tmp/iyn-export/next.config.ts` (overwrite whatever is there):

```ts
import type { NextConfig } from "next";

/** Export-only config for the portfolio snapshot of the IYN marketing site. */
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio/iyn/site",
  images: { unoptimized: true },
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
```

- [ ] **Step 4: Build.** Fix-forward: if the build fails naming a route/file that still pulls the DB, auth, or a removed API path, delete that file from the **copy** and rebuild. Do not edit the client's repo.

```bash
cd /tmp/iyn-export && npm run build 2>&1 | tail -25
ls /tmp/iyn-export/out
```
Expected: `out/` containing `en/index.html` plus the four sub-route folders.

- [ ] **Step 5: Compress the snapshot's images.** Cap width at 1400 and re-encode; convert photo PNGs to JPEG only if a single PNG exceeds ~1 MB (then rewrite its references, as in Step 6).

```bash
O="/tmp/iyn-export/out"
find "$O" \( -iname "*.jpg" -o -iname "*.jpeg" \) -print0 | while IFS= read -r -d '' f; do
  ffmpeg -y -loglevel error -i "$f" -vf "scale='min(1400,iw)':-2" -q:v 6 "$f.t.jpg" 2>/dev/null && mv "$f.t.jpg" "$f"
done
find "$O" -iname "*.png" -print0 | while IFS= read -r -d '' f; do
  pngquant --force --quality=60-88 --skip-if-larger --output "$f" "$f" 2>/dev/null || true
done
du -sh "$O"
```

- [ ] **Step 6: Install the snapshot and fix asset URLs.** `next/image` with `unoptimized` does **not** apply `basePath`, so root-absolute asset URLs 404. Rewrite them for every top-level asset root that is not a route dir or `_next`.

```bash
D="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/iyn/site"
rm -rf "$D"; mkdir -p "$D"; cp -a /tmp/iyn-export/out/. "$D/"
BP="/portfolio/iyn/site"
# asset roots = top-level entries that are files, or dirs without an index.html
ROOTS=$(cd "$D" && for e in *; do
  if [ -f "$e" ]; then echo "$e";
  elif [ -d "$e" ] && [ ! -f "$e/index.html" ] && [ "$e" != "_next" ]; then echo "$e"; fi
done)
echo "rewriting roots: $ROOTS"
for r in $ROOTS; do
  find "$D" \( -name "*.html" -o -name "*.js" -o -name "*.txt" \) -type f -print0 \
  | xargs -0 perl -pi -e "s{([\"'(])/\Q$r\E(?=[/\"')])}{\$1$BP/$r}g"
done
```

- [ ] **Step 7: Verify the snapshot** — the 5 pages exist and every rewritten asset resolves on disk.

```bash
D="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/iyn/site"; BP="/portfolio/iyn/site"
for p in en en/exams en/courses en/study-abroad en/services; do
  [ -f "$D/$p/index.html" ] && echo "  ok  $p" || echo "  MISSING  $p"
done
miss=0
for u in $(grep -rhoE "$BP/[A-Za-z0-9_.-][^\"')]*\.(png|jpg|jpeg|webp|svg|css|js)" "$D" 2>/dev/null | sort -u); do
  [ -f "$D${u#$BP}" ] || { echo "MISSING ASSET $u"; miss=1; }
done
[ $miss -eq 0 ] && echo "all assets resolve"
du -sh "$D"
```
Expected: all 5 pages present, all assets resolve, total ≤ ~20 MB. If assets are
missing, widen the roots list in Step 6 and re-run from Step 6.

- [ ] **Step 8: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/iyn/site
git commit -m "feat(portfolio): add IYN marketing-site snapshot for live embed

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Data promotion, wiring, and component stub

**Files:**
- Modify: `src/data/clients.ts` (the `iyn` entry, ~line 390)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/IYNPage.tsx` (stub)

**Interfaces:**
- Produces: `export function IYNPage({ client }: { client: Client })`.

- [ ] **Step 1: Promote the `clients.ts` entry.** Replace
  `{ slug: "iyn",                         name: "IYN",                                       services: ["App", "Social Media", "Website Design"] },`
  with:

```ts
  {
    slug: "iyn",
    name: "IYN",
    services: ["Website Design", "App", "Social Media"],
    year: "2026",
    location: "İzmir, Türkiye",
    runtime: "Ongoing · since 2024",
    scene: "INT. THE STUDY — DAY",
    synopsis:
      "A bilingual marketing site, a student portal that makes exam progress visible to students and parents alike, the film that launched it, and a two-year Instagram system running four content pillars across four visual registers — for an İzmir consultancy preparing students for AP, IB, SAT and the British admissions exams.",
    featured: true,
  },
```

- [ ] **Step 2: Create the stub** at `src/components/portfolio/featured/IYNPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function IYNPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`** — import + map entry, aligned with neighbours:

```ts
import { IYNPage } from "@/components/portfolio/featured/IYNPage";
```
```ts
  "iyn":                            IYNPage,
```

- [ ] **Step 4: Typecheck, lint, build**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; lint at baseline (no new errors in touched files); build succeeds with `.next/server/app/portfolio/iyn.html` present.

- [ ] **Step 5: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/IYNPage.tsx
git commit -m "feat(portfolio): promote IYN to featured + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Shell — CSS port, LoadingTransition, gradient rail, hero

Replace the stub with the shell: `.iy-page` root + token system, font `<link>` (+ preconnects), `LoadingTransition`, the sticky gradient rail, and the hero (kicker + white logo + headline + deck + the 6-item built list).

**CSS source of truth:** `/Users/barandiloglu/Downloads/iyn-preview.html` (`<style>`, lines 10–144). Port into `styled-jsx global`. Reproduce the `.iy-*` rules and both `@media` blocks verbatim. **DROP** the `*{box-sizing:border-box}` and `body{margin:0}` reset (styled-jsx global would leak them). Keep the `.iy-page` CSS-variable block (including `--grad`) verbatim. The `.iy-modal*` rules will be replaced in Task 6 — porting them now is fine.

**Files:**
- Modify: `src/components/portfolio/featured/IYNPage.tsx`

**Interfaces:**
- Consumes: `LoadingTransition` — props `{ frameNumber, clientName, scope, location?, year? }`; `getFrameNumber`.
- Produces: the `.iy-page` root and the `BUILT` const.

- [ ] **Step 1: Write the shell.** Replace the stub with:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const BUILT = [
  "iyn.com.tr — bilingual marketing site",
  "İYN Student Portal — dashboard, mock exams, progress tracking",
  "Portal launch film",
  "Instagram content system — 4 pillars, 4 visual registers",
  "Reels — programme and admission stories",
  "Midjourney prompt architecture for the illustrated pillar",
] as const;

export function IYNPage({ client }: Props) {
  const frame = getFrameNumber(client); // "016"

  return (
    <div className="iy-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Website", "App", "Social"]}
        location="İzmir, Türkiye"
        year={client.year}
      />

      <header className="iy-rail">
        <Link className="iy-back" href="/portfolio">← Portfolio</Link>
        <span className="iy-rail-mid">IYN EDUCATION &amp; CONSULTANCY · İZMİR</span>
        <span className="iy-rail-end">Reel {frame} · 2026</span>
      </header>

      <section className="iy-hero">
        <div className="iy-hero-inner">
          <div className="iy-hero-top">
            <p className="iy-kicker">Website · Web Application · Social Media · Videography</p>
            <img className="iy-hero-logo" src="/portfolio/iyn/brand/logo-white.png" alt="İYN Education &amp; Consultancy" />
          </div>
          <h1 className="iy-h1">THEY TEACH ONE<br />STUDENT AT A TIME.<br /><em>we built the machine<br />that reaches the rest.</em></h1>
          <p className="iy-deck"><b>IYN</b> prepares İzmir students for AP, IB, SAT and the British admissions exams — the kind of work that lives or dies on trust, and travels almost entirely by word of mouth. We gave that reputation somewhere to live: a bilingual site, a student portal that makes progress visible, a launch film, and an Instagram system that has been arguing IYN&rsquo;s case three times a week for two years.</p>
          <ul className="iy-built">
            {BUILT.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–144) here.
           Drop the '*{}' + 'body{margin:0}' reset. Keep the .iy-page var block. */
      `}</style>
    </div>
  );
}

function FontLink() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Poppins:wght@300;400;500;600&display=swap"
      />
    </>
  );
}
```

Note: `useState` is imported for Tasks 5–6; if lint flags it as unused at this
stage, leave it — Task 5 consumes it.

- [ ] **Step 2: Port the prototype CSS** (lines 10–144) into the `styled-jsx global` block per the rules above.

- [ ] **Step 3: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; the file's expected `no-page-custom-font` + `no-img-element` warnings; no new errors; build succeeds.

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/IYNPage.tsx
git commit -m "feat(portfolio): IYN shell — gradient rail, hero, loading transition

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Sections 01 (Portal film) and 02 (live site embed)

**Files:**
- Modify: `src/components/portfolio/featured/IYNPage.tsx`

**Interfaces:**
- Consumes: `useState` (Task 4).
- Produces: `SHOTS`, `SITE_EMBED`, `SITE_ROOT` consts; `siteTab` state; `applySiteGuards`.

- [ ] **Step 1: Add the site consts + guard function** at module scope (after `BUILT`):

```tsx
/* Section 02 embeds a static snapshot of the client's own marketing site
   (public/portfolio/iyn/site), so the real pages run and scroll. It is
   same-origin, which is what lets applySiteGuards() neutralise navigation
   and form submission inside the frame. */
const SITE_EMBED = "/portfolio/iyn/site";
const SITE_ROOT = "https://www.iyn.com.tr";

const SHOTS = [
  { label: "Home",         path: "/en",              src: `${SITE_EMBED}/en/index.html`,              note: "“The formula for success is made for you.” Proof band, eleven exam programmes, the five-step method, and the portal shown working — one scroll." },
  { label: "Exams",        path: "/en/exams",        src: `${SITE_EMBED}/en/exams/index.html`,        note: "A-Level, AP, IB, SAT, IELTS, TMUA, ESAT, MAT, STEP, TARA, Italy — each exam its own entry point rather than one generic enquiry form." },
  { label: "Courses",      path: "/en/courses",      src: `${SITE_EMBED}/en/courses/index.html`,      note: "The deepest page on the site. Programme structure written so a parent can compare without a phone call." },
  { label: "Study Abroad", path: "/en/study-abroad", src: `${SITE_EMBED}/en/study-abroad/index.html`, note: "The consultancy line, kept distinct from exam prep — different buyer, different decision, different page." },
  { label: "Services",     path: "/en/services",     src: `${SITE_EMBED}/en/services/index.html`,     note: "The short page. What IYN does, in the order a first-time visitor needs it." },
] as const;

/**
 * The embedded site is a real, running copy — so it would happily navigate or
 * submit. This is a portfolio exhibit, not the client's live funnel, so we
 * neutralise anything that leaves the page or sends data, while leaving the
 * interactions that demonstrate the build (scrolling, menus) untouched.
 * Runs on every iframe load because each tab switch remounts the frame.
 */
function applySiteGuards(e: React.SyntheticEvent<HTMLIFrameElement>) {
  const doc = e.currentTarget.contentDocument;
  if (!doc) return; // cross-origin or not ready

  doc.addEventListener(
    "click",
    (ev) => {
      const el = ev.target as HTMLElement | null;
      if (el?.closest("a[href], button[type='submit'], [role='link']")) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    true
  );
  doc.addEventListener("submit", (ev) => ev.preventDefault(), true);
  for (const a of Array.from(doc.querySelectorAll("a[href]"))) {
    a.removeAttribute("target");
    a.setAttribute("aria-disabled", "true");
  }
}
```

- [ ] **Step 2: Add `siteTab` state** inside the component (after `frame`):

```tsx
  const [siteTab, setSiteTab] = useState(0);
  const shot = SHOTS[siteTab];
```

- [ ] **Step 3: Add sections 01 and 02** after the hero `</section>`:

```tsx
      <section className="iy-portal">
        <h2 className="iy-sec"><span className="iy-sec-no">01</span><span className="iy-sec-name">The Portal</span><i></i><span className="iy-sec-meta">WEB APPLICATION</span></h2>
        <div className="iy-portal-grid">
          <div className="iy-portal-copy">
            <p className="iy-lead">Exam prep runs on a feeling — <em>am I actually getting better?</em> The portal answers it with data.</p>
            <p>Mock exams, a 70,000-question bank, section-level breakdowns and a progress curve that updates after every session. Weak topics surface on their own. Parents get the same view the student does, which removes the most tiring conversation in the business.</p>
            <p>We built it, then made the film that introduced it, then announced it through the feed we had spent two years building. Same brand voice at every step — the site, the product and the post do not sound like three different companies.</p>
          </div>
          <figure className="iy-video">
            <video className="iy-video-el" controls preload="none" poster="/portfolio/iyn/video/portal-tour-poster.jpg">
              <source src="/portfolio/iyn/video/portal-tour.mp4" type="video/mp4" />
            </video>
            <figcaption><b>Portal launch film</b> — 1:15. &ldquo;Başarının formülü sana özel.&rdquo;</figcaption>
          </figure>
        </div>
      </section>

      <section className="iy-site-sec">
        <h2 className="iy-sec"><span className="iy-sec-no">02</span><span className="iy-sec-name">The Site</span><i></i><span className="iy-sec-meta">LIVE · BILINGUAL</span></h2>
        <figure className="iy-site">
          <div className="iy-bar">
            <span className="iy-dots"><i></i><i></i><i></i></span>
            <span className="iy-url">www.iyn.com.tr{shot.path}</span>
            <span className="iy-live">● LIVE</span>
          </div>
          <nav className="iy-tabs">
            {SHOTS.map((s, i) => (
              <button type="button" key={s.path} className={i === siteTab ? "on" : ""} onClick={() => setSiteTab(i)}>{s.label}</button>
            ))}
          </nav>
          <div className="iy-window" key={siteTab}>
            <iframe
              className="iy-window-frame"
              src={shot.src}
              title={`${shot.label} page of iyn.com.tr — live embed`}
              onLoad={applySiteGuards}
              loading="lazy"
            />
            <span className="iy-hint">live page · scroll inside</span>
          </div>
          <div className="iy-foot">
            <div className="iy-nav">
              <button type="button" onClick={() => setSiteTab((i) => (i - 1 + SHOTS.length) % SHOTS.length)} aria-label="Previous page">‹</button>
              <span>{String(siteTab + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setSiteTab((i) => (i + 1) % SHOTS.length)} aria-label="Next page">›</button>
            </div>
            <a className="iy-visit" href={SITE_ROOT + shot.path} target="_blank" rel="noopener noreferrer">Visit this page <span>↗</span></a>
          </div>
          <figcaption>{shot.note}</figcaption>
        </figure>
      </section>
```
`key={siteTab}` remounts the frame on tab change, which resets its scroll (replacing the prototype's `swin.scrollTop=0`).

- [ ] **Step 4: Replace the window CSS** so the iframe fills the frame. In the ported block, change `.iy-window` and replace `.iy-window-img`:

```css
.iy-window{position:relative;height:620px;overflow:hidden;border:1px solid var(--rule);background:#fff}
.iy-window-frame{width:100%;height:100%;border:0;display:block;background:#fff}
.iy-hint{position:absolute;bottom:12px;right:12px;z-index:2;background:rgba(3,73,170,.82);color:#fff;font-family:"Oswald",sans-serif;font-size:10px;font-weight:300;letter-spacing:.14em;text-transform:uppercase;padding:5px 9px;pointer-events:none}
```
(Delete the old `.iy-window-img` rule and the old `.iy-hint` sticky/float rule.)

- [ ] **Step 5: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 6: Commit**

```bash
git add src/components/portfolio/featured/IYNPage.tsx
git commit -m "feat(portfolio): IYN portal film + live site embed

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: Sections 03 (Feed + lightbox) and 04 (Reel), plus sign-off

**Files:**
- Modify: `src/components/portfolio/featured/IYNPage.tsx`

**Interfaces:**
- Consumes: `siteTab` pattern (Task 5).
- Produces: `PILLARS`, `REG` consts; `lightbox` state + handlers; the styled `.iy-modal` markup and CSS.

- [ ] **Step 1: Extend the React import** to `import { useCallback, useEffect, useState } from "react";` and add the consts after `SHOTS`:

```tsx
const PILLARS = [
  { no: "01", title: "Stratejik Bilgilendirme", body: "AP, IB and SAT explained as strategy — timelines, scoring, what actually moves an application." },
  { no: "02", title: "Ayın En Garip Bölümü",    body: "One obscure degree a month. The pillar that earns the saves and the shares." },
  { no: "03", title: "Başarı Hikayeleri",       body: "Real student journeys, published with the family's consent on the client's own channels." },
  { no: "04", title: "Akıllı Çalışma",          body: "Study method — Feynman, memory palace, Pareto. Useful before anyone has bought anything." },
] as const;

const REG = [
  { id: "R.01", name: "The Hook",                 job: "Stops the scroll and starts an argument",                  src: "/portfolio/iyn/posts/01-hook-pahali-okul.jpg",           alt: "IYN post — ochre diagonal band, “Pahalı okul = iyi okul mu?” with a hand-drawn arrow",        look: "Ochre diagonal band · cream condensed caps · hand-drawn arrow · peeling paper corner", cap: "“Pahalı okul = iyi okul mu?” — a question the audience cannot scroll past without answering." },
  { id: "R.02", name: "The Invitation",           job: "Turns a scroll into a conversation",                        src: "/portfolio/iyn/posts/02-davet-siradaki-adim.jpg",        alt: "IYN post — an illustrated night scene, hands over a map with a lit route and a compass",      look: "Illustrated night scene · ember spotlight on a mapped route · Oswald caps, white",     cap: "“Sıradaki adımını birlikte planlayalım.” The soft close — a route already drawn, someone across the table to walk it with." },
  { id: "R.03", name: "The Strange Major",        job: "The monthly deep-dive on a career nobody has heard of",     src: "/portfolio/iyn/posts/03-garip-bolum-turfgrass.jpg",      alt: "IYN post — Turfgrass Science, an illustrated figure examining stadium turf",                  look: "Illustrated editorial poster · deep blue and ember · split text-image field",          cap: "Turfgrass Science — a real degree, taught to graduate level at one American university." },
  { id: "R.04", name: "The Strange Major, again", job: "Proof the illustration system holds across subjects",        src: "/portfolio/iyn/posts/04-garip-bolum-bioinformatik.jpg",  alt: "IYN post — Bioinformatik, a figure standing in a lit threshold amid data panels",             look: "Same palette, same figure-in-a-threshold composition",                                  cap: "Bioinformatics — “the field nobody knows about that everybody will need.” Opening slide of a six-part carousel." },
  { id: "R.05", name: "The Calendar",             job: "Utility content — deadlines, camps, application windows",   src: "/portfolio/iyn/posts/05-kritik-tarihler.jpg",            alt: "IYN post — “Kritik Tarihler!” with dated deadlines beside a library photograph",              look: "White field · ochre display · diagonal photographic cut",                              cap: "Dated, specific, saveable. The post a parent screenshots." },
  { id: "R.06", name: "The Product Launch",       job: "Announcing the portal to the feed that was built to receive it", src: "/portfolio/iyn/posts/06-portal-lansman.jpg",        alt: "IYN post — “İYN Eğitim Portalı ile tanışın” with laptop, tablet and phone mockups",           look: "Electric blue · device mockups · the softest voice in the set",                        cap: "“İYN Eğitim Portalı ile tanışın.” Two years of feed-building paid off in one announcement." },
] as const;
```

- [ ] **Step 2: Add lightbox state + handlers + keyboard effect** inside the component (after `shot`):

```tsx
  const [lightbox, setLightbox] = useState<number | null>(null);
  const openLightbox = useCallback((i: number) => setLightbox(i), []);
  const closeLightbox = useCallback(() => setLightbox(null), []);
  const stepLightbox = useCallback(
    (delta: number) => setLightbox((i) => (i === null ? i : (i + delta + REG.length) % REG.length)),
    []
  );

  useEffect(() => {
    if (lightbox === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") stepLightbox(-1);
      else if (e.key === "ArrowRight") stepLightbox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeLightbox, stepLightbox]);
```

- [ ] **Step 3: Add sections 03, 04 and the sign-off** after the site `</section>`:

```tsx
      <section className="iy-feed">
        <h2 className="iy-sec light"><span className="iy-sec-no">03</span><span className="iy-sec-name">The Feed</span><i></i><span className="iy-sec-meta">4 PILLARS · 6 REGISTERS</span></h2>
        <div className="iy-pillars">
          {PILLARS.map((p) => (
            <article key={p.no}><span>{p.no}</span><h3>{p.title}</h3><p>{p.body}</p></article>
          ))}
        </div>
        <p className="iy-feed-note">Four subjects, but not one look. A provocation and a deadline reminder should not arrive wearing the same clothes — so the system flexes by content type and stays recognisable by palette, type and logo placement. Click any frame.</p>
        <div className="iy-sheet">
          {REG.map((r, i) => (
            <button className="iy-cell" key={r.id} onClick={() => openLightbox(i)}>
              <span className="iy-cell-id">{r.id}</span>
              <img className="iy-cell-img" src={r.src} alt={r.alt} />
              <span className="iy-cell-name">{r.name}</span>
              <span className="iy-cell-job">{r.job}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="iy-reel-sec">
        <h2 className="iy-sec"><span className="iy-sec-no">04</span><span className="iy-sec-name">The Reel</span><i></i><span className="iy-sec-meta">VIDEOGRAPHY</span></h2>
        <div className="iy-reel-grid">
          <figure className="iy-reel">
            <video className="iy-reel-el" controls preload="none" poster="/portfolio/iyn/video/imperial-reel-poster.jpg">
              <source src="/portfolio/iyn/video/imperial-reel.mp4" type="video/mp4" />
            </video>
          </figure>
          <div className="iy-reel-copy">
            <p className="iy-lead">Imperial College — 0:26, vertical, sound-off legible.</p>
            <p>Britain&rsquo;s hardest STEM admissions route, cut down to the length of a scroll. Every claim on screen is one an admissions officer would recognise, which is the only way this audience keeps watching.</p>
            <p className="iy-reel-meta">1080 × 1934 · 60 fps source · captioned throughout</p>
          </div>
        </div>
      </section>

      <footer className="iy-signoff">
        <div className="iy-sign-grid">
          <div><p className="iy-sign-label">Client</p><p className="iy-sign-name">IYN Education</p></div>
          <div><p className="iy-sign-label">Where</p><p className="iy-sign-name">İzmir, Türkiye</p></div>
          <div><p className="iy-sign-label">By</p><p className="iy-sign-name accent">FrameFlow</p></div>
        </div>
        <Link className="iy-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>
```

- [ ] **Step 4: Add the styled lightbox modal** inside `.iy-page`, just before `<FontLink />`:

```tsx
      {lightbox !== null && (
        <div
          className="iy-modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${REG[lightbox].name} — frame ${lightbox + 1} of ${REG.length}`}
          onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        >
          <button className="iy-modal-nav prev" onClick={() => stepLightbox(-1)} aria-label="Previous">←</button>

          <div className="iy-modal-stage">
            <div className="iy-modal-bar top">
              <span className="iy-modal-counter">★ Frame <b>{String(lightbox + 1).padStart(2, "0")}</b> / {String(REG.length).padStart(2, "0")}</span>
              <span className="iy-modal-brand">IYN · REEL {frame}</span>
              <button className="iy-modal-close" onClick={closeLightbox} aria-label="Close">×</button>
            </div>
            <div className="iy-modal-image-wrap">
              <img src={REG[lightbox].src} alt={REG[lightbox].alt} />
            </div>
            <div className="iy-modal-bar bot">
              <span className="iy-modal-slate">{REG[lightbox].name} — {REG[lightbox].look}</span>
            </div>
          </div>

          <button className="iy-modal-nav next" onClick={() => stepLightbox(1)} aria-label="Next">→</button>
          <p className="iy-modal-cap">{REG[lightbox].cap}</p>
        </div>
      )}
```

- [ ] **Step 5: Replace the ported `.iy-modal*` CSS** with the styled-stage version in IYN's tokens. Remove the old `.iy-modal-inner`, `.iy-modal-img`, `.iy-modal-look`, `.iy-modal-x` rules and add:

```css
.iy-modal{position:fixed;inset:0;z-index:90;display:none;align-items:center;justify-content:center;padding:32px;background:rgba(4,40,100,.95);animation:iy-fade .22s ease-out}
.iy-modal.open{display:flex}
@keyframes iy-fade{from{opacity:0}to{opacity:1}}
.iy-modal-stage{position:relative;width:min(760px,92vw);max-height:86vh;background:var(--paper);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.45);animation:iy-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
@keyframes iy-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
.iy-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:13px 16px;font-family:"Oswald",sans-serif;font-size:11px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:var(--mute)}
.iy-modal-bar.top{border-bottom:2px solid var(--amber);justify-content:space-between}
.iy-modal-bar.bot{border-top:1px solid var(--rule);justify-content:center;text-transform:none;letter-spacing:.04em;color:var(--ink)}
.iy-modal-counter b{color:var(--amber);font-weight:700}
.iy-modal-brand{letter-spacing:.2em;color:var(--blue-a)}
.iy-modal-close{width:30px;height:30px;background:var(--blue-a);color:#fff;border:0;cursor:pointer;font-family:"Oswald",sans-serif;font-size:16px;font-weight:500;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:background .16s}
.iy-modal-close:hover{background:var(--amber)}
.iy-modal-image-wrap{flex:1 1 auto;min-height:0;background:var(--light);overflow:hidden;display:flex;align-items:center;justify-content:center}
.iy-modal-image-wrap img{max-width:100%;max-height:100%;width:auto;height:auto;object-fit:contain;display:block}
.iy-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:54px;height:54px;background:var(--paper);color:var(--blue-a);border:2px solid var(--blue-a);cursor:pointer;font-family:"Oswald",sans-serif;font-size:20px;font-weight:500;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
.iy-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--amber);color:#fff;border-color:var(--amber)}
.iy-modal-nav.prev{left:32px}.iy-modal-nav.next{right:32px}
```

- [ ] **Step 6: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```
Expected: all clean; no new lint errors.

- [ ] **Step 7: Re-read the lightbox handlers** once: confirm `stepLightbox` wraps `(i + delta + 6) % 6`, the effect removes its listener and restores `body.overflow`, and backdrop-click uses `e.target === e.currentTarget`.

- [ ] **Step 8: Commit**

```bash
git add src/components/portfolio/featured/IYNPage.tsx
git commit -m "feat(portfolio): IYN feed, reel and sign-off with styled lightbox

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Reduced-motion, responsive, final verification

**Files:**
- Modify: `src/components/portfolio/featured/IYNPage.tsx`

- [ ] **Step 1: Grep the file for real `animation:` / `transition:` / `:hover{transform:…}` declarations** so the overrides target selectors that exist. Expect: `.iy-modal`/`.iy-modal-stage` (`iy-fade`/`iy-pop`), `.iy-cell-img` transition + `.iy-cell:hover .iy-cell-img` transform, `.iy-modal-close`/`.iy-modal-nav`, `.iy-tabs button`, `.iy-nav button`, `.iy-visit`. Only disable what exists.

- [ ] **Step 2: Add the reduced-motion block** at the end of `styled-jsx global` (adjust to what Step 1 found):

```css
@media (prefers-reduced-motion: reduce){
  .iy-modal,.iy-modal-stage{animation:none}
  .iy-cell-img,.iy-modal-close,.iy-modal-nav,.iy-tabs button,.iy-nav button,.iy-visit{transition:none}
  .iy-cell:hover .iy-cell-img{transform:none}
  .iy-modal-nav:hover{transform:translateY(-50%)}
}
```

- [ ] **Step 3: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```
Expected: clean; no new errors.

- [ ] **Step 4: Interaction + responsive check** — `npm run dev` (background, pick a free port), load `/portfolio/iyn` and confirm:
  - Loading transition plays, then the gradient hero with the white logo.
  - Both videos play from their posters (portal film landscape, Imperial reel vertical).
  - Clicking a post opens the styled lightbox; ← / → wrap across all 6; Esc closes.
  - The site tabs switch across all five pages; the embed scrolls; **link clicks and form submits inside the frame do nothing**; "Visit this page" points at the real URL.
  - Resize to ~950px and ~540px: portal/reel grids stack, pillars → 2-up then 1-up, sheet → 2-up then 1-up, window height drops to 420px.
  - Enable OS "Reduce motion" and reload: lightbox fade/pop off, hover transforms off.
  Stop the dev server afterwards.

- [ ] **Step 5: Full production build**

```bash
npm run build
```
Expected: succeeds; `/portfolio/iyn` among the generated static routes.

- [ ] **Step 6: Final visual pass** — headless Chrome screenshot of the full page, and dump the `/portfolio` index DOM to confirm the IYN row reads `016 · IYN · Now showing · WEBSITE DESIGN · APP · SOCIAL MEDIA`. Confirm no console errors.

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/IYNPage.tsx
git commit -m "feat(portfolio): IYN reduced-motion guard, responsive polish

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Integration (component, featured.ts, clients.ts promote + service reorder, frame 016) → Task 3 ✓
- LoadingTransition + gradient rail + hero (logo, headline, deck, 6-item built list) → Task 4 ✓
- 01 The Portal — real 1:15 film, no mocked dashboards → Task 5 ✓
- 02 The Site — snapshot built from client source, same-origin embed, guards → Tasks 2, 5 ✓
- 03 The Feed — 4 pillars + 6 posts + styled lightbox with look/caption → Task 6 ✓
- 04 The Reel — real 0:26 vertical film + meta line → Task 6 ✓
- Sign-off → Task 6 ✓
- Media pipeline (6 posts, 2 films, 2 posters, white logo) → Task 1 ✓
- Client repo never modified → Task 2 Step 1 (throwaway copy) ✓
- Reduced-motion + responsive → Task 7 ✓
- Success criteria (route, index row, videos, lightbox, embed guards, build clean) → Tasks 3, 6, 7 ✓

**Placeholder scan:** No "TBD"/"handle edge cases". Task 2's Step 4 fix-forward loop and Step 6 asset-root discovery are adaptive by design with explicit, bounded instructions; Task 7 Step 1 is a grep-first instruction. All code steps carry real code.

**Type consistency:** `BUILT`/`SHOTS`/`PILLARS`/`REG` shapes match their consumers; `siteTab`/`shot`/`lightbox` and `openLightbox`/`closeLightbox`/`stepLightbox` are consistent across Tasks 4–6; `applySiteGuards` matches its `onLoad` usage; `getFrameNumber` → `frame` ("016") used in rail, lightbox brand, and LoadingTransition. Snapshot paths produced in Task 2 (`site/en/**/index.html`) match `SHOTS[].src` in Task 5.
