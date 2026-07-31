# Beril & Sedat Homes Featured Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a bespoke, production-grade featured case-study page for Beril & Sedat Homes at `/portfolio/beril-sedat-homes` — a boutique GTA brokerage that relaunched under the two principals' own names, held in one quiet-luxury register across four channels and two languages.

**Architecture:** One self-contained client component (`BerilSedatHomesPage.tsx`) with scoped `styled-jsx`, its own rail + sign-off (no global Navbar/Footer), reusing `LoadingTransition` and a styled lightbox. Assets: 12 feed stills, 13 transcoded videos with extracted posters, two logo colourways, and a **statically-exported copy of the client's real website** embedded in a same-origin iframe with inert links/forms. Stacked on `feat/aydin-cpa-case-study`.

**Tech Stack:** Next.js 16.2.1 (App Router), React 19.2.4, TypeScript, styled-jsx, ffmpeg (asset prep).

## Global Constraints

- **Read `node_modules/next/dist/docs/` before writing Next-specific code** — this Next.js has breaking changes vs. training data (per AGENTS.md).
- Featured pages are `"use client"`, fully bespoke, **no global `<Navbar>`/`<Footer>`**; this page **does** use `LoadingTransition`.
- **All content real, and no volume claims.** Per the user's decision, the page states **no totals** — not "13 pieces", not "44 across six series". Sections identify themselves by channel and format only ("Instagram · 4:5", "Vertical motion · 9:16"). There is **no `event-post`**; do not invent one. Copy must not imply the page shows everything produced.
- Palette: navy `#1C2841`, catalyst `#232D3F`, limestone `#E1D4C0`, bronze `#997755`, cloud `#F0F0F0`, warm `#E2D2B9`, terracotta `#B4472A`, rule `rgba(28,40,65,.14)`.
- Type: **Cinzel** (400;500;600;700) + **Montserrat** (300;400;500;600) via Google Fonts `<link>` with two `<link rel="preconnect">` (incl. `crossOrigin=""` on gstatic). Both are the client's real faces.
- JSX text must escape apostrophes/quotes (`&rsquo;` `&amp;`) for `react/no-unescaped-entities`. Data in plain JS string literals must NOT be escaped.
- **`prefers-reduced-motion` must disable** the lightbox animation, cell hover transforms and button transitions. Target only selectors that exist. Exactly **one** such block in the file.
- **Lightbox sizing (hard requirement, regression guard):** the modal stage must carry a **definite `height`**, with the image at `width:100%;height:100%;object-fit:contain` and its wrapper at `flex:1 1 auto;min-height:0`. A `max-height`-only stage resolves to `auto`, the image's percentage height is ignored, and the still renders at natural size and is clipped — this shipped on IYN and was user-reported, and was prevented on Esma, MinAuto and Harbour Loom. Feed stills are 4:5 portrait. Applies at **every** breakpoint.
- Frame number derives from `getFrameNumber(client)` (new roster index 19 → `"020"`) — never hardcoded. **The roster edit is APPEND-ONLY**: inserting anywhere else renumbers every later client.
- No unit-test framework; verification per task = `npx tsc --noEmit` + `npm run lint` (no NEW errors vs the known baseline: **6 pre-existing errors** in unrelated files — ThemeProvider/ThemeToggle/MarkScene/admin-analytics — plus `no-page-custom-font` / `no-img-element` warnings every featured page carries) + `npm run build`. Portfolio pages client-render — verify routes via `npm run build`, not curl.
- Shell note: some sandboxed shells reset `PATH`; prefix asset/build commands with
  `export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"`.
- On this machine `mkdir`/`cp`/`rm` under `public/portfolio/...` can fail with "Operation not permitted" (macOS xattrs). Workarounds in order: seed the destination with the `Write` tool then let ffmpeg overwrite; `ffmpeg -i src -c copy dst`; `python3` `os.makedirs`/`shutil.copyfile`. Never `rm` anything under `/Users/barandiloglu/Downloads`.
- Many source filenames contain **spaces, Turkish characters (ı, ş, ğ, ç, ü, ö) and `$`**. Quote every path; never rely on globbing.

---

### Task 1: Feed stills, logos, and video

Place everything under `public/portfolio/beril-sedat-homes/`. No app code.

**The mapping below was verified by a human viewing every file — do not re-derive it.** Sources are in `/Users/barandiloglu/Downloads/BSH/`.

- [ ] **Step 1: Create directories**

```bash
export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes"
mkdir -p "$R"/feed "$R"/reels "$R"/explainers "$R"/brand
```

- [ ] **Step 2: The 12 feed stills.** The carousel's 01/07…07/07 numbering is printed on the artwork and fixes the order.

```bash
S="/Users/barandiloglu/Downloads/BSH"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes"
q(){ ffmpeg -y -loglevel error -i "$1" -q:v 4 "$2"; }
q "$S/WhatsApp Image 2026-07-30 at 21.27.09 (4).jpeg" "$R/feed/carousel-1-hook.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.10.jpeg"     "$R/feed/carousel-2-source.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.10 (1).jpeg" "$R/feed/carousel-3-2022.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.10 (2).jpeg" "$R/feed/carousel-4-2025.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.10 (3).jpeg" "$R/feed/carousel-5-wakeup.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.10 (4).jpeg" "$R/feed/carousel-6-shift.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.10 (5).jpeg" "$R/feed/carousel-7-question.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.09 (2).jpeg" "$R/feed/pinned-buyers.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.09 (3).jpeg" "$R/feed/pinned-sellers.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.09.jpeg"     "$R/feed/just-sold-a.jpg"
q "$S/WhatsApp Image 2026-07-30 at 21.27.09 (1).jpeg" "$R/feed/just-sold-b.jpg"
q "$S/Beril Sedat Topçu.png"                          "$R/feed/seminar.jpg"
```
Note the last source is **named after the principals but is the seminar announcement**, not a logo.

- [ ] **Step 3: The two logo colourways.** The client folder has no logo; the **website repo** ships the official transparent PNG.

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes"
python3 - <<'PY'
from PIL import Image
SRC="/Users/barandiloglu/Downloads/bs-homes-main/public/assets/logo.png"
OUT="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes/brand"
def tight(im):
    p=im.load(); w,h=im.size
    minx,miny,maxx,maxy=w,h,-1,-1
    for y in range(h):
        for x in range(w):
            if p[x,y][3]>25:
                minx=min(minx,x);maxx=max(maxx,x);miny=min(miny,y);maxy=max(maxy,y)
    return im.crop((minx-4,miny-4,maxx+5,maxy+5))
# light ground: the official asset, trimmed
tight(Image.open(SRC).convert("RGBA")).save(f"{OUT}/logo-navy.png")
# dark ground: recolour ONLY the navy wordmark to cloud; gold monogram + rules untouched
im=Image.open(SRC).convert("RGBA"); px=im.load(); w,h=im.size
for y in range(h):
    for x in range(w):
        r,g,b,a=px[x,y]
        if a and r-b < 40 and (r+g+b)/3 < 140:
            px[x,y]=(240,240,240,a)
tight(im).save(f"{OUT}/logo-knockout.png")
print("logos written")
PY
```
This is the brand's **documented** dark-ground treatment — the seminar post shows gold
monogram + white wordmark on navy. Do NOT recolour the gold.

**Prove it** by compositing the knockout over the hero navy and the light logo over cloud:

```bash
ffmpeg -y -loglevel error -f lavfi -i "color=c=0x1c2841:s=760x420" -i "$R/brand/logo-knockout.png" \
  -filter_complex "[1]scale=420:-1[l];[0][l]overlay=(W-w)/2:(H-h)/2" -frames:v 1 /tmp/bsh-k.png
ffmpeg -y -loglevel error -f lavfi -i "color=c=0xf0f0f0:s=760x420" -i "$R/brand/logo-navy.png" \
  -filter_complex "[1]scale=420:-1[l];[0][l]overlay=(W-w)/2:(H-h)/2" -frames:v 1 /tmp/bsh-l.png
```
Read both. Expected: gold monogram + **white** wordmark on navy; gold monogram + **navy**
wordmark on cloud. No white box, no halo, gold unchanged in both.

- [ ] **Step 4: Transcode the 9 reels.** Sources are 1080×1920 and total 1.6 GB — they MUST be downscaled. 540×960 CRF 30 was quality-checked and is sharp.

```bash
S="/Users/barandiloglu/Downloads/BSH"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes"
v(){ ffmpeg -y -loglevel error -i "$1" -vf "scale=540:960" -c:v libx264 -crf 30 -preset medium -c:a aac -b:a 96k -movflags +faststart "$2"; }
v "$S/Crimson Millway.mp4"                    "$R/reels/01-crimson-millway.mp4"
v "$S/19 Schell ENG.mp4"                      "$R/reels/02-19-schell.mp4"
v "$S/Nisan Ayı Güncellemesi.mov"             "$R/reels/03-nisan-guncelleme.mp4"
v "$S/Mart 2026 Piyasa Güncellemesi.mp4"      "$R/reels/04-mart-guncelleme.mp4"
v "$S/HST Kalkıyor mu.mp4"                    "$R/reels/05-hst.mp4"
v "$S/Kanada Merkez Bankası Kararı.mp4"       "$R/reels/06-merkez-bankasi.mp4"
v "$S/POV \$200,000.mp4"                      "$R/reels/07-pov-200k.mp4"
v "$S/Reel 5.mp4"                             "$R/reels/08-offer-counter.mp4"
v "$S/Pool Reel.mp4"                          "$R/reels/09-day-after-closing.mp4"
```
`Pool Reel.mp4` is 1080×2046, not 1080×1920 — `scale=540:960` will distort it. Use
`-vf "scale=540:-2"` for that one file instead and report the resulting dimensions.

**Deliberately NOT shipped** (four TR talking-heads already represented by the set above):
`Bahar Gelişmeleri.mp4`, `Konut Fiyatlamasında AI Kullanımı.mp4`, `Vergi Denetimi Final.mp4`,
`Prime Rate Reel.mp4`. Do not add them.

- [ ] **Step 5: Transcode the 4 explainers**

```bash
S="/Users/barandiloglu/Downloads/BSH"
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes"
v(){ ffmpeg -y -loglevel error -i "$1" -vf "scale=540:960" -c:v libx264 -crf 30 -preset medium -c:a aac -b:a 96k -movflags +faststart "$2"; }
v "$S/VID-20260530-WA0000(1).mp4"                      "$R/explainers/01-programs-missed.mp4"
v "$S/How to make your home worth more in 2026.mp4"    "$R/explainers/02-roi-table.mp4"
v "$S/Reel 10.mov"                                     "$R/explainers/03-expiry-date.mp4"
v "$S/Reel 9.mov"                                      "$R/explainers/04-only-a-realtor.mp4"
```
`WhatsApp Video 2026-07-30 at 21.26.19.mp4` is a byte-different but frame-identical
duplicate of `VID-20260530-WA0000(1).mp4` (hashes match at 5s/20s/40s) — do NOT ship both.

- [ ] **Step 6: Extract a poster for every video**

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes"
for f in "$R"/reels/*.mp4 "$R"/explainers/*.mp4; do
  ffmpeg -y -loglevel error -ss 2 -i "$f" -frames:v 1 -q:v 4 "${f%.mp4}-poster.jpg"
done
ls "$R"/reels "$R"/explainers
```
**Read every poster.** Each must be a clean, representative frame — not black, not a
mid-transition blur, and for the on-camera reels the speaker should be visible. Several of
these pieces open on a title card; if a poster is an unreadable partial wipe, re-extract at
a different `-ss` (try 4 / 6 / 8). Report the timestamps you settled on.

- [ ] **Step 7: Verify**

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes"
echo "feed: $(ls "$R"/feed | wc -l)  (expect 12)"
echo "reels: $(ls "$R"/reels/*.mp4 | wc -l) videos + $(ls "$R"/reels/*-poster.jpg | wc -l) posters  (expect 9 + 9)"
echo "explainers: $(ls "$R"/explainers/*.mp4 | wc -l) + $(ls "$R"/explainers/*-poster.jpg | wc -l)  (expect 4 + 4)"
find "$R"/feed "$R"/brand -type f -size +500k     # images only; expect no output
du -sh "$R"                                        # budget: <= ~60 MB
for f in "$R"/reels/*.mp4 "$R"/explainers/*.mp4; do
  printf "%-42s %s %s\n" "$(basename $f)" "$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=p=0 "$f")" "$(du -h "$f"|cut -f1)"
done
```
If the directory exceeds ~60 MB, re-encode only the pieces longer than 120s at `-crf 32`
and report the new total. Do not drop files to hit the budget.

**Read these and confirm content matches the filename:**
- `feed/carousel-1-hook.jpg` — "The Shocking Truth About Toronto Real Estate Today", marked 01/07
- `feed/carousel-7-question.jpg` — "The question", marked 07/07, signed Beril & Sedat
- `feed/pinned-sellers.jpg` — **warm limestone** ground (not navy)
- `feed/seminar.jpg` — the AI-career seminar announcement
- `explainers/01-programs-missed-poster.jpg` — **warm limestone** ground, FHSA / RRSP HBP / LTT
If any mismatch, STOP and report.

- [ ] **Step 8: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/beril-sedat-homes
git commit -m "feat(portfolio): add Beril & Sedat media (12 feed stills, 13 reels, logos)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: The live site embed

Static-export the client's real website into `public/portfolio/beril-sedat-homes/site/`. **This pipeline was proven end-to-end before the plan was written** — it produced 16 pages (8 EN + 8 TR, 10 MB). Follow it exactly; each removal below fixed a specific, observed build failure.

- [ ] **Step 1: Stage a working copy** (never modify the client repo)

```bash
export PATH="/usr/bin:/bin:/usr/local/bin:/opt/homebrew/bin:$PATH"
W=/Users/barandiloglu/Downloads/bs-homes-main; T=/tmp/bsh-site-build
rm -rf $T; mkdir -p $T
(cd $W && tar --exclude=node_modules --exclude=.next --exclude=.git -cf - .) | (cd $T && tar -xf -)
cp -al /Users/barandiloglu/Desktop/Projects/FrameFlow/node_modules $T/node_modules
```
The repo ships no `node_modules` and there is **no network** — FrameFlow's are hard-linked.
Next 16.2.1 vs the repo's 16.2.6 is a patch difference and builds fine.

- [ ] **Step 2: Satisfy the three missing packages**

```bash
T=/tmp/bsh-site-build
rm -rf "$T/app/[lang]/listings/map" "$T/components/listings/map"   # leaflet + react-leaflet
mkdir -p $T/node_modules/server-only
echo '{"name":"server-only","version":"0.0.1","main":"index.js"}' > $T/node_modules/server-only/package.json
echo 'module.exports = {};' > $T/node_modules/server-only/index.js
```
Only `components/Nav.tsx` references the map, and as a *link href*, not an import — so
removing the components is safe. `server-only` exists purely to throw in client bundles.

- [ ] **Step 3: Remove the export blockers.** Each was an observed failure:

```bash
T=/tmp/bsh-site-build
rm -rf "$T/app/api"                              # route handlers
rm -rf "$T/app/[lang]/listings/[mlsNumber]"      # dynamic route, no generateStaticParams
rm -f  "$T/app/[lang]/opengraph-image.tsx"
rm -f  "$T/app/robots.ts" "$T/app/sitemap.ts"    # "force-static not configured"
rm -f  "$T/app/[lang]/contact/actions.test.ts"
cat > "$T/app/[lang]/contact/actions.ts" <<'EOF'
export type ContactState = { status: "idle" | "success" | "error"; errors?: Record<string, string> };
export async function submitContact(
  _prev: ContactState,
  _formData: FormData,
): Promise<ContactState> {
  return { status: "idle" };
}
EOF
```
The last one matters: **Server Actions are unsupported under `output: "export"`**. The stub
keeps `submitContact`'s signature so `ContactForm.tsx` still compiles. Form submits are
inert in the embed anyway.

- [ ] **Step 4: Export config and build**

```bash
T=/tmp/bsh-site-build
cat > $T/next.config.ts <<'EOF'
import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio/beril-sedat-homes/site",
  images: { unoptimized: true },
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
  turbopack: { root: path.resolve(__dirname) },
};
export default nextConfig;
EOF
cd $T && npx next build 2>&1 | tail -20
find $T/out -name index.html | wc -l    # expect 18 (8 EN + 8 TR + 404 + _not-found)
```
Do **not** add an `eslint` key — Next 16 rejects it as an unrecognised option.

- [ ] **Step 5: Fix the basePath-missing asset URLs — THE BUG THAT SHIPPED ON IYN.** Five references are emitted root-absolute and would 404 inside the embed.

```bash
cat > /tmp/bsh-fixbp.py <<'PY'
import os,sys
root, BP = sys.argv[1], sys.argv[2]
changed=0
for dp,_,fns in os.walk(root):
    for fn in fns:
        if not fn.endswith((".html",".css",".js",".json",".txt")): continue
        p=os.path.join(dp,fn)
        try: s=open(p,encoding="utf-8").read()
        except Exception: continue
        n=s
        for pre in ('"',"(","'","\\\""):
            n=n.replace(f'{pre}/assets/', f'{pre}{BP}/assets/')
        if n!=s: open(p,"w",encoding="utf-8").write(n); changed+=1
print("files rewritten:",changed)
PY
python3 /tmp/bsh-fixbp.py /tmp/bsh-site-build/out /portfolio/beril-sedat-homes/site
find /tmp/bsh-site-build/out \( -name '*.html' -o -name '*.css' \) -exec grep -oh '"/assets/[^"]*' {} \; | sort -u
```
The final command must print **nothing**. On IYN a single missed URL of this kind made the
whole embed fall back to a generic font. Fonts here are relative (`../media/*.woff2`) and
need no fix — verify that stays true.

- [ ] **Step 6: Install into public/ and verify**

```bash
R="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes"
python3 - <<'PY'
import shutil, os
src="/tmp/bsh-site-build/out"
dst="/Users/barandiloglu/Desktop/Projects/FrameFlow/public/portfolio/beril-sedat-homes/site"
if os.path.exists(dst): shutil.rmtree(dst)
shutil.copytree(src,dst)
print("installed")
PY
ls "$R/site"; du -sh "$R/site"
for p in en en/listings en/neighbourhoods en/advice en/about en/contact tr; do
  test -f "$R/site/$p/index.html" && echo "OK   $p" || echo "MISS $p"
done
```
All seven must be OK — they are the seven tabs.

- [ ] **Step 7: Confirm eslint ignores the embed.** `eslint.config.mjs` already has `"public/**"` in `globalIgnores` (added when the Fidan site was embedded). Verify it is still there; if not, add it — the minified chunks otherwise flood lint.

```bash
grep -n "public/\*\*" /Users/barandiloglu/Desktop/Projects/FrameFlow/eslint.config.mjs
```

- [ ] **Step 8: Commit**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
git add public/portfolio/beril-sedat-homes/site eslint.config.mjs
git commit -m "feat(portfolio): embed the Beril & Sedat website as a static export

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: Data promotion, wiring, and component stub

**Files:**
- Modify: `src/data/clients.ts` (**append** a 20th entry)
- Modify: `src/app/portfolio/[slug]/featured.ts`
- Create: `src/components/portfolio/featured/BerilSedatHomesPage.tsx` (stub)

**Interfaces:**
- Produces: `export function BerilSedatHomesPage({ client }: { client: Client })`.

- [ ] **Step 1: Append the roster entry.** This client has **no existing entry** — unlike every prior featured page, you are ADDING one, at the END of the array:

```ts
  {
    slug: "beril-sedat-homes",
    name: "Beril & Sedat Homes",
    services: ["Social Media", "Videography", "Website Design", "Ad Management"],
    year: "2026",
    location: "Toronto, ON",
    runtime: "Ongoing",
    scene: "INT. THE LISTING — GOLDEN HOUR",
    synopsis:
      "A boutique GTA brokerage that retired its group name and relaunched under the two principals' own. Quiet luxury is easy to say and hard to hold, so we held it in four places at once — a navy editorial feed, a reel series with both of them on camera in Turkish and English, a built graphics layer for the parts of a purchase people avoid reading, and a bilingual site with their names on it.",
    featured: true,
  },
```
**APPEND-ONLY.** Frame numbers are positional — inserting anywhere but the end renumbers
every client after it. After editing, verify: the array has **20** entries, `beril-sedat-homes`
is at index **19** (→ frame `"020"`), and at least two other clients' derived frames are
unchanged. All four services already exist in the `Service` union; no type change.

- [ ] **Step 2: Create the stub** at `src/components/portfolio/featured/BerilSedatHomesPage.tsx`:

```tsx
"use client";

import type { Client } from "@/data/clients";

type Props = { client: Client };

export function BerilSedatHomesPage({ client }: Props) {
  return <main style={{ padding: 80 }}>{client.name} — case study (stub)</main>;
}
```

- [ ] **Step 3: Register in `featured.ts`** — import + map entry, matching sibling alignment:

```ts
import { BerilSedatHomesPage } from "@/components/portfolio/featured/BerilSedatHomesPage";
```
```ts
  "beril-sedat-homes":             BerilSedatHomesPage,
```

- [ ] **Step 4: Typecheck, lint, build**

```bash
cd /Users/barandiloglu/Desktop/Projects/FrameFlow
npx tsc --noEmit && npm run lint && npm run build
```
Expected: tsc clean; lint at baseline; build emits `.next/server/app/portfolio/beril-sedat-homes.html`, and the static-path count grows by one.

- [ ] **Step 5: Commit**

```bash
git add src/data/clients.ts src/app/portfolio/[slug]/featured.ts src/components/portfolio/featured/BerilSedatHomesPage.tsx
git commit -m "feat(portfolio): add Beril & Sedat Homes to the roster + wire stub route

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 4: Shell — CSS port, LoadingTransition, rail, hero, two registers

**CSS source of truth:** `/Users/barandiloglu/Downloads/bsh-preview.html` (`<style>`, lines 10–167). Port into `styled-jsx global`. Reproduce the `.bs-*` rules and all three `@media` blocks verbatim. **DROP** the `*{box-sizing:border-box}` and `body{margin:0}` reset. **KEEP** the `.bs-page` CSS-variable block verbatim. Rules whose markup lands in Tasks 5–7 (`.bs-grid*`, `.bs-cell*`, `.bs-site*`, `.bs-lang*`, `.bs-row*`, `.bs-sign*`) must be ported now and NOT deleted as unused. The `.bs-modal*` rules are **replaced** in Task 5; porting them as-is now is fine.

**Files:**
- Modify: `src/components/portfolio/featured/BerilSedatHomesPage.tsx`

**Interfaces:**
- Consumes: `LoadingTransition` — props `{ frameNumber, clientName, scope, location?, year? }`; `getFrameNumber`.
- Produces: the `.bs-page` root and the `REGISTERS` const.

- [ ] **Step 1: Write the shell.** Replace the stub with:

```tsx
"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { getFrameNumber } from "@/data/clients";
import type { Client } from "@/data/clients";
import { LoadingTransition } from "@/components/portfolio/LoadingTransition";

type Props = { client: Client };

const REGISTERS = [
  { key: "navy", chip: "THE DEFAULT", title: "Midnight navy",
    body: "Brand, listings, announcements, market commentary. Bronze rule, Cinzel headline, generous margins. Most of the feed lives here." },
  { key: "warm", chip: "WHEN IT HAS TO BE READ", title: "Warm limestone",
    body: "Numbers, tables, step-by-step. Terracotta on the one figure that matters in each frame. Used in the explainers, and in the feed wherever a post is meant to be read rather than admired." },
] as const;

export function BerilSedatHomesPage({ client }: Props) {
  const frame = getFrameNumber(client); // "020"

  return (
    <div className="bs-page">
      <LoadingTransition
        frameNumber={frame}
        clientName={client.name}
        scope={["Social", "Video", "Web", "Ads"]}
        location="Toronto, ON"
        year={client.year}
      />

      <header className="bs-rail">
        <Link className="bs-back" href="/portfolio">← Portfolio</Link>
        <span className="bs-rail-mid">Beril &amp; Sedat Homes</span>
        <span className="bs-rail-end">Toronto, ON · {frame}</span>
      </header>

      <section className="bs-hero">
        <div className="bs-hero-inner">
          <img className="bs-hero-logo" src="/portfolio/beril-sedat-homes/brand/logo-knockout.png" alt="Beril &amp; Sedat Homes" />
          <p className="bs-eyebrow">Boutique brokerage · GTA · Social · Video · Web · Ads</p>
          <h1 className="bs-h1">They stopped selling<br />under a group name.<br /><em>We built the one<br />with theirs on it.</em></h1>
          <p className="bs-deck">TopcuDalan Homes retired in the first quarter of 2026 and became <b>Beril &amp; Sedat Homes</b> — two people, named, in a market of 69,000 agents. Quiet luxury is easy to say and hard to hold, so we held it everywhere at once: <b>a bilingual site</b>, <b>a navy editorial feed</b>, <b>a reel series with both of them on camera</b>, and the paid support underneath.</p>
          <dl className="bs-facts">
            <div><dt>Register</dt><dd>Quiet luxury — never salesy</dd></div>
            <div><dt>Languages</dt><dd>English &amp; Turkish, in parallel</dd></div>
            <div><dt>Type</dt><dd>Cinzel · Montserrat</dd></div>
          </dl>
        </div>
      </section>

      <section className="bs-registers">
        <h2 className="bs-sec-head"><i></i><span>TWO REGISTERS</span><i></i></h2>
        <p className="bs-lede">The brand runs on midnight navy. The teaching content does not — and that is deliberate. A rate table on a dark ground is a wall of small pale digits in a feed; the same table on warm limestone reads at arm&rsquo;s length. So the identity holds the navy and anything built to be read moves to a warm variant, with the same serif, the same rules and the same signature closing every piece. One brand, two jobs.</p>
        <div className="bs-reg-grid">
          {REGISTERS.map((r) => (
            <article className={`bs-reg bs-reg--${r.key}`} key={r.key}>
              <span className="bs-reg-chip">{r.chip}</span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </article>
          ))}
        </div>
      </section>

      <FontLink />
      <style jsx global>{`
        /* PORT the prototype <style> (lines 10–167) here.
           Drop the '*{}' + 'body{margin:0}' reset. Keep the .bs-page var block. */
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
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap"
      />
    </>
  );
}
```
The registers copy is **corrected** from the prototype: it claimed the split is
feed-navy / explainers-warm, but `pinned-sellers` is a warm **feed** post. The chips and
lede above describe the real rule. Use them verbatim. The rail shows the roster frame,
not the prototype's "FF-005". `useCallback`/`useEffect`/`useState` are imported for Tasks 5–6.

- [ ] **Step 2: Port the prototype CSS** (lines 10–167) per the rules above.

- [ ] **Step 3: Typecheck, lint, build**

```bash
npx tsc --noEmit && npm run lint && npm run build
```

- [ ] **Step 4: Commit**

```bash
git add src/components/portfolio/featured/BerilSedatHomesPage.tsx
git commit -m "feat(portfolio): Beril & Sedat shell — rail, hero, two registers

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: The Reels, The Feed, and the styled lightbox

Adds two grids and the lightbox. **The reels are playable video, not stills** — the grid shows posters and the lightbox plays the actual file.

**Files:**
- Modify: `src/components/portfolio/featured/BerilSedatHomesPage.tsx`

**Interfaces:**
- Consumes: `useState`, `useEffect`, `useCallback`.
- Produces: `REELS` and `FEED` consts, `lightbox` state `{ set: "reels" | "feed" | "explainers"; i: number }`, and the styled `.bs-modal` markup + CSS.

**The lightbox is SET-SCOPED** (like MinAuto's, unlike Esma's flat wrap): ←/→ wrap **within the open set only**, because the feed carousel has a printed 01/07…07/07 order and stepping out of it would break the sequence. Task 6 adds a third set (`explainers`) to the same lightbox, so the state must already be set-aware.

- [ ] **Step 1: Add the consts** at module scope (after `REGISTERS`):

```tsx
const REELS = [
  { id: "R.01", src: "/portfolio/beril-sedat-homes/reels/01-crimson-millway.mp4", cap: "Walkthrough · Bayview & York Mills",
    note: "Beril walking a $1,190,000 listing, price burned in from the first second.",
    alt: "Beril walking up to a Bayview and York Mills house, asking price on screen" },
  { id: "R.02", src: "/portfolio/beril-sedat-homes/reels/02-19-schell.mp4", cap: "Walkthrough · 19 Schell Ave · EN",
    note: "Sedat, in English, on what an $85,000 down payment actually buys.",
    alt: "Sedat outside 19 Schell Avenue with the down payment figure on screen" },
  { id: "R.03", src: "/portfolio/beril-sedat-homes/reels/03-nisan-guncelleme.mp4", cap: "April market update · TR",
    note: "The monthly read. Beril to camera, TRREB numbers, no voiceover hiding who is talking.",
    alt: "Beril to camera presenting the April market update in Turkish" },
  { id: "R.04", src: "/portfolio/beril-sedat-homes/reels/04-mart-guncelleme.mp4", cap: "March market update · TR",
    note: "Same slot, previous month — the series is the point, not any one episode.",
    alt: "Beril to camera presenting the March market update in Turkish" },
  { id: "R.05", src: "/portfolio/beril-sedat-homes/reels/05-hst.mp4", cap: "Policy · is HST going? · TR",
    note: "Sedat on the 13% that lands on new construction, and who actually pays it.",
    alt: "Sedat to camera explaining HST on new-build homes in Turkish" },
  { id: "R.06", src: "/portfolio/beril-sedat-homes/reels/06-merkez-bankasi.mp4", cap: "Bank of Canada decision · TR",
    note: "Filmed the day before the announcement — the reason this series runs on a schedule.",
    alt: "Sedat outdoors discussing the Bank of Canada rate decision in Turkish" },
  { id: "R.07", src: "/portfolio/beril-sedat-homes/reels/07-pov-200k.mp4", cap: "POV · the gifted deposit · EN",
    note: "Ten seconds. The short end of the range, and the one that travels furthest.",
    alt: "Sedat on the phone, caption about a buyer receiving a gifted down payment" },
  { id: "R.08", src: "/portfolio/beril-sedat-homes/reels/08-offer-counter.mp4", cap: "Offer and counter · EN",
    note: "Beril in the car, playing both sides of a negotiation that is $50,000 apart.",
    alt: "Beril in a car acting out an offer and counter-offer exchange" },
  { id: "R.09", src: "/portfolio/beril-sedat-homes/reels/09-day-after-closing.mp4", cap: "The day after closing",
    note: "No pitch, no numbers, no one on camera. The only piece in the series like it.",
    alt: "A pool at a home the day after closing, with an on-screen caption" },
] as const;

const FEED = [
  { id: "F.01", src: "/portfolio/beril-sedat-homes/feed/carousel-1-hook.jpg", cap: "Market carousel · 01 — the hook",
    alt: "Navy carousel opener reading The Shocking Truth About Toronto Real Estate Today" },
  { id: "F.02", src: "/portfolio/beril-sedat-homes/feed/carousel-2-source.jpg", cap: "Market carousel · 02 — the source",
    alt: "Carousel slide crediting Tom Ferry's Toronto event, with a photo of Beril and Sedat" },
  { id: "F.03", src: "/portfolio/beril-sedat-homes/feed/carousel-3-2022.jpg", cap: "Market carousel · 03 — 2022",
    alt: "Hourglass infographic showing how Toronto sales volume split across agents in 2022" },
  { id: "F.04", src: "/portfolio/beril-sedat-homes/feed/carousel-4-2025.jpg", cap: "Market carousel · 04 — 2025",
    alt: "The same hourglass infographic for 2025, with the top ten per cent taking ninety per cent" },
  { id: "F.05", src: "/portfolio/beril-sedat-homes/feed/carousel-5-wakeup.jpg", cap: "Market carousel · 05 — the wake-up call",
    alt: "Bar chart showing ninety per cent of licensed Toronto agents closed four deals or fewer" },
  { id: "F.06", src: "/portfolio/beril-sedat-homes/feed/carousel-6-shift.jpg", cap: "Market carousel · 06 — the shift",
    alt: "TRREB table comparing 2022 and 2025 rental and sale transactions" },
  { id: "F.07", src: "/portfolio/beril-sedat-homes/feed/carousel-7-question.jpg", cap: "Market carousel · 07 — the question",
    alt: "Closing carousel slide asking whether your agent is truly active, signed Beril and Sedat" },
  { id: "F.08", src: "/portfolio/beril-sedat-homes/feed/pinned-buyers.jpg", cap: "Pinned · For Buyers",
    alt: "Navy pinned post reading Finding the right home starts with the right guidance" },
  { id: "F.09", src: "/portfolio/beril-sedat-homes/feed/pinned-sellers.jpg", cap: "Pinned · For Sellers",
    alt: "Warm limestone pinned post reading Every home has a story, we're here to tell it" },
  { id: "F.10", src: "/portfolio/beril-sedat-homes/feed/just-sold-a.jpg", cap: "Just sold · 25 Broadway Ave",
    alt: "Just Sold announcement for 25 Broadway Avenue over a photo of the tower" },
  { id: "F.11", src: "/portfolio/beril-sedat-homes/feed/just-sold-b.jpg", cap: "Just sold · 25 Broadway Ave · detail",
    alt: "Specification card for 25 Broadway Avenue listing two bedrooms and two bathrooms" },
  { id: "F.12", src: "/portfolio/beril-sedat-homes/feed/seminar.jpg", cap: "Seminar · career management in the age of AI",
    alt: "Seminar announcement for a career management talk, co-branded with EduPathways" },
] as const;
```

- [ ] **Step 2: Add lightbox state + handlers + keyboard effect** inside the component (after `frame`). `SETS` is declared as a lookup so Task 6 can extend it with one line:

```tsx
  const [lightbox, setLightbox] = useState<{ set: "reels" | "feed"; i: number } | null>(null);
  const closeBox = useCallback(() => setLightbox(null), []);
  const stepBox = useCallback((delta: number) => {
    setLightbox((o) => {
      if (!o) return o;
      const len = o.set === "reels" ? REELS.length : FEED.length;
      return { set: o.set, i: (o.i + delta + len) % len };
    });
  }, []);

  useEffect(() => {
    if (!lightbox) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBox();
      else if (e.key === "ArrowLeft") stepBox(-1);
      else if (e.key === "ArrowRight") stepBox(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, closeBox, stepBox]);
```

- [ ] **Step 3: Add both sections** after the `.bs-registers` section:

```tsx
      <section className="bs-reels">
        <h2 className="bs-sec-head light"><i></i><span>THE REELS</span><i></i></h2>
        <p className="bs-sub">On camera · 9:16 · walkthroughs, monthly updates, policy explainers</p>
        <p className="bs-lede">The strongest thing this brokerage has is that there are two of them and you can see both. So the reels put them on camera and keep them there — Beril walking a Bayview listing, Sedat on what a rate decision does to a closing. Prices burned in, captions burned in, mostly Turkish, no voiceover hiding who is talking.</p>
        <div className="bs-grid bs-grid--916">
          {REELS.map((r, i) => (
            <button type="button" className="bs-cell bs-cell--onDark" key={r.id} onClick={() => setLightbox({ set: "reels", i })}>
              <span className="bs-play">▶</span>
              <img className="bs-cell-img" src={`${r.src.replace(/\.mp4$/, "")}-poster.jpg`} alt={r.alt} loading="lazy" />
              <span className="bs-cell-cap">{r.cap}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="bs-feed">
        <h2 className="bs-sec-head"><i></i><span>THE FEED</span><i></i></h2>
        <p className="bs-sub bs-sub--dark">Instagram · 4:5</p>
        <div className="bs-grid bs-grid--45">
          {FEED.map((f, i) => (
            <button type="button" className="bs-cell bs-cell--onLight" key={f.id} onClick={() => setLightbox({ set: "feed", i })}>
              <img className="bs-cell-img" src={f.src} alt={f.alt} loading="lazy" />
              <span className="bs-cell-cap">{f.cap}</span>
            </button>
          ))}
        </div>
      </section>
```
Both sub-labels state **format only** — no counts. Do not add "9 shown" or "12 pieces".

- [ ] **Step 4: Add the styled lightbox** inside `.bs-page`, just before `<FontLink />`. It renders a `<video>` for reels and an `<img>` for feed:

```tsx
      {lightbox && (() => {
        const isReel = lightbox.set === "reels";
        const item = isReel ? REELS[lightbox.i] : FEED[lightbox.i];
        const len = isReel ? REELS.length : FEED.length;
        return (
          <div
            className="bs-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${item.id} — ${lightbox.i + 1} of ${len}`}
            onClick={(e) => { if (e.target === e.currentTarget) closeBox(); }}
          >
            <button type="button" className="bs-modal-nav prev" onClick={() => stepBox(-1)} aria-label="Previous">‹</button>
            <div className="bs-modal-stage">
              <div className="bs-modal-bar">
                <span className="bs-modal-id">{item.id}</span>
                <span className="bs-modal-count">{String(lightbox.i + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}</span>
                <button type="button" className="bs-modal-close" onClick={closeBox} aria-label="Close">✕</button>
              </div>
              <div className="bs-modal-shot">
                {isReel ? (
                  <video key={item.src} controls autoPlay playsInline poster={`${item.src.replace(/\.mp4$/, "")}-poster.jpg`}>
                    <source src={item.src} type="video/mp4" />
                  </video>
                ) : (
                  <img src={item.src} alt={item.alt} />
                )}
              </div>
            </div>
            <button type="button" className="bs-modal-nav next" onClick={() => stepBox(1)} aria-label="Next">›</button>
            <p className="bs-modal-cap">{item.cap}</p>
          </div>
        );
      })()}
```
`key={item.src}` on the `<video>` is load-bearing: without it React reuses the element and
stepping between reels keeps playing the previous file.

- [ ] **Step 5: Replace the ported `.bs-modal*` CSS.** Remove `.bs-modal-inner`, `.bs-modal-img`, `.bs-modal-x` and add:

```css
.bs-modal{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;padding:44px;background:rgba(14,22,38,.96);font-family:"Montserrat",system-ui,sans-serif;animation:bs-fade .22s ease-out}
@keyframes bs-fade{from{opacity:0}to{opacity:1}}
.bs-modal-stage{position:relative;width:min(460px,86vw);height:min(82vh,880px);max-height:86vh;background:var(--cloud);display:flex;flex-direction:column;box-shadow:0 30px 90px rgba(0,0,0,.5);animation:bs-pop .28s cubic-bezier(0.34,1.56,0.64,1)}
@keyframes bs-pop{from{transform:scale(.96);opacity:0}to{transform:scale(1);opacity:1}}
.bs-modal-bar{flex:0 0 auto;display:flex;align-items:center;gap:12px;padding:11px 14px;border-bottom:1px solid var(--rule);font-size:9.5px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:#6f6252}
.bs-modal-id{color:var(--bronze)}
.bs-modal-count{margin-left:auto;font-variant-numeric:tabular-nums;color:var(--navy)}
.bs-modal-close{width:26px;height:26px;background:none;border:0;color:var(--navy);cursor:pointer;font-size:14px;line-height:1;padding:0;display:flex;align-items:center;justify-content:center;transition:color .16s}
.bs-modal-close:hover{color:var(--bronze)}
.bs-modal-shot{flex:1 1 auto;min-height:0;background:#0e1626;overflow:hidden;display:flex;align-items:center;justify-content:center}
.bs-modal-shot img,.bs-modal-shot video{width:100%;height:100%;object-fit:contain;display:block}
.bs-modal-nav{position:absolute;top:50%;transform:translateY(-50%);width:54px;height:54px;background:var(--cloud);border:1px solid var(--rule);color:var(--navy);font-size:30px;line-height:1;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:transform .16s,background .16s,color .16s;z-index:2}
.bs-modal-nav:hover{transform:translateY(-50%) scale(1.06);background:var(--bronze);color:var(--cloud);border-color:var(--bronze)}
.bs-modal-nav.prev{left:24px}.bs-modal-nav.next{right:24px}
.bs-modal-cap{position:absolute;left:40px;right:40px;bottom:24px;margin:0;text-align:center;font-size:9.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.62);z-index:1}
```
**The stage's definite `height` is load-bearing** — see Global Constraints.

- [ ] **Step 6: Confirm the old modal rules are gone**

```bash
grep -n "bs-modal-inner\|bs-modal-img\|bs-modal-x" src/components/portfolio/featured/BerilSedatHomesPage.tsx || echo "clean"
grep -c "\.bs-modal{" src/components/portfolio/featured/BerilSedatHomesPage.tsx   # expect 1
```

- [ ] **Step 7: Typecheck, lint, build; then commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/components/portfolio/featured/BerilSedatHomesPage.tsx
git commit -m "feat(portfolio): Beril & Sedat reels, feed, styled lightbox

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: The Explainers and the live site embed

**Files:**
- Modify: `src/components/portfolio/featured/BerilSedatHomesPage.tsx`

**Interfaces:**
- Consumes: the lightbox from Task 5 — **extend its set union to include `"explainers"`**.
- Produces: `EXPLAINERS` and `SHOTS` consts, `siteTab` state, `applySiteGuards`, and the `.bs-site*` markup.

- [ ] **Step 1: Add the consts** after `FEED`:

```tsx
const EXPLAINERS = [
  { id: "X.01", src: "/portfolio/beril-sedat-homes/explainers/01-programs-missed.mp4", cap: "Programs most buyers miss",
    alt: "Warm limestone explainer listing the FHSA, RRSP Home Buyers' Plan and Land Transfer Tax rebate" },
  { id: "X.02", src: "/portfolio/beril-sedat-homes/explainers/02-roi-table.mp4", cap: "What actually adds value · EN",
    alt: "Explainer ranking ten home upgrades by return on investment" },
  { id: "X.03", src: "/portfolio/beril-sedat-homes/explainers/03-expiry-date.mp4", cap: "Your property has an expiry date · EN",
    alt: "Explainer listing the service life of roofs, windows, water heaters and other components" },
  { id: "X.04", src: "/portfolio/beril-sedat-homes/explainers/04-only-a-realtor.mp4", cap: "Only a realtor · EN",
    alt: "Text explainer contrasting a realtor with a doctor, a lawyer and a mechanic" },
] as const;

const SHOTS = [
  { tab: "Home", path: "en", url: "/", note: "Full-bleed property hero, the pair shown at the same size as the house, and the proof band — transactions, ranking, families served — before a single listing." },
  { tab: "Listings", path: "en/listings", url: "/listings", note: "Held deliberately short while the curated roster is assembled — it asks for the brief instead of padding the page with stock inventory." },
  { tab: "Neighbourhoods", path: "en/neighbourhoods", url: "/neighbourhoods", note: "The micro-market pages — Oakville, Humber Bay, North York, the Distillery. This is where a boutique brokerage out-argues a portal." },
  { tab: "Advice", path: "en/advice", url: "/advice", note: "The written counterpart to the explainer reels. Same subjects, longer form, indexable." },
  { tab: "About", path: "en/about", url: "/about", note: "Two people, named, photographed, credentials stated. The whole pitch is that you know who is handling the file." },
  { tab: "Contact", path: "en/contact", url: "/contact", note: "One consultation request, no lead-magnet clutter." },
  { tab: "Türkçe", path: "tr", url: "/tr", note: "The Turkish site — not a translation layer bolted on, a parallel build with its own copy." },
] as const;
```

- [ ] **Step 2: Widen the lightbox set union.** In the `useState` and `stepBox` from Task 5, change the set type to `"reels" | "feed" | "explainers"` and make `len` resolve for all three:

```tsx
  const [lightbox, setLightbox] = useState<{ set: "reels" | "feed" | "explainers"; i: number } | null>(null);
```
```tsx
      const len = o.set === "reels" ? REELS.length : o.set === "explainers" ? EXPLAINERS.length : FEED.length;
```
And in the modal body, resolve `item`/`len`/`isReel` for three sets — explainers are video, like reels:
```tsx
        const isVideo = lightbox.set !== "feed";
        const item = lightbox.set === "reels" ? REELS[lightbox.i] : lightbox.set === "explainers" ? EXPLAINERS[lightbox.i] : FEED[lightbox.i];
        const len = lightbox.set === "reels" ? REELS.length : lightbox.set === "explainers" ? EXPLAINERS.length : FEED.length;
```
Rename the `isReel` reference in the JSX to `isVideo`. Note `EXPLAINERS` items have no
`note` field — only reels do — so the modal must not read `item.note`.

- [ ] **Step 3: Add the explainers section** after `.bs-feed`:

```tsx
      <section className="bs-motion">
        <h2 className="bs-sec-head"><i></i><span>THE EXPLAINERS</span><i></i></h2>
        <p className="bs-sub bs-sub--dark">Vertical motion · 9:16</p>
        <p className="bs-lede">This is the layer that sits under the talking. Each explainer is cut against a built graphics pass — the number lands, the label arrives, the table fills a row at a time — so the voice never has to describe what the screen could just show. Rendered from one template, which means a new episode is a data change rather than a rebuild.</p>
        <div className="bs-grid bs-grid--916">
          {EXPLAINERS.map((x, i) => (
            <button type="button" className="bs-cell bs-cell--onLight" key={x.id} onClick={() => setLightbox({ set: "explainers", i })}>
              <span className="bs-play">▶</span>
              <img className="bs-cell-img" src={`${x.src.replace(/\.mp4$/, "")}-poster.jpg`} alt={x.alt} loading="lazy" />
              <span className="bs-cell-cap">{x.cap}</span>
            </button>
          ))}
        </div>
      </section>
```
No count in the sub-label, and no "six series" claim.

- [ ] **Step 4: Add the site state and guards** inside the component:

```tsx
  const [siteTab, setSiteTab] = useState(0);

  function applySiteGuards(e: React.SyntheticEvent<HTMLIFrameElement>) {
    const doc = e.currentTarget.contentDocument;
    if (!doc) return;
    const block = (ev: Event) => {
      const el = ev.target as HTMLElement | null;
      if (el?.closest("a[href], button, [role='link']")) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    };
    doc.addEventListener("click", block, true);
    doc.addEventListener("auxclick", block, true);
    doc.addEventListener("submit", (ev) => ev.preventDefault(), true);
    for (const a of Array.from(doc.querySelectorAll("a[href]"))) {
      a.removeAttribute("target");
      a.setAttribute("aria-disabled", "true");
    }
  }
```

- [ ] **Step 5: Add the site section** after `.bs-motion`:

```tsx
      <section className="bs-site-sec">
        <h2 className="bs-sec-head"><i></i><span>THE SITE</span><i></i></h2>
        <p className="bs-sub bs-sub--dark">berilsedathomes.ca · live · English and Turkish</p>
        <figure className="bs-site">
          <div className="bs-shot-bar">
            <span className="bs-shot-dots"><i></i><i></i><i></i></span>
            <span className="bs-shot-url">berilsedathomes.ca{SHOTS[siteTab].url}</span>
            <span className="bs-shot-live">● LIVE</span>
          </div>
          <nav className="bs-site-tabs">
            {SHOTS.map((s, i) => (
              <button type="button" key={s.tab} className={i === siteTab ? "on" : ""} onClick={() => setSiteTab(i)} aria-pressed={i === siteTab}>{s.tab}</button>
            ))}
          </nav>
          <div className="bs-site-window">
            <iframe
              key={SHOTS[siteTab].path}
              className="bs-site-frame"
              src={`/portfolio/beril-sedat-homes/site/${SHOTS[siteTab].path}/index.html`}
              title={`${SHOTS[siteTab].tab} page of berilsedathomes.ca`}
              loading="lazy"
              onLoad={applySiteGuards}
            />
          </div>
          <div className="bs-site-foot">
            <div className="bs-site-nav">
              <button type="button" onClick={() => setSiteTab((t) => (t - 1 + SHOTS.length) % SHOTS.length)} aria-label="Previous page">‹</button>
              <span>{String(siteTab + 1).padStart(2, "0")} / {String(SHOTS.length).padStart(2, "0")}</span>
              <button type="button" onClick={() => setSiteTab((t) => (t + 1) % SHOTS.length)} aria-label="Next page">›</button>
            </div>
            <a className="bs-visit" href={`https://www.berilsedathomes.ca${SHOTS[siteTab].url}`} target="_blank" rel="noopener noreferrer">Visit this page <span>↗</span></a>
          </div>
          <figcaption>{SHOTS[siteTab].note}</figcaption>
        </figure>
      </section>
```
The iframe `src` must end in **`/index.html`** — `public/` has no directory-index
resolution, so a bare directory path 404s. `key` forces a remount per tab so `onLoad`
re-runs the guards.

- [ ] **Step 6: Add the iframe CSS.** The ported `.bs-site-img` and `.bs-site-hint` rules are now unused — remove them and add:

```css
.bs-site-frame{width:100%;height:100%;border:0;display:block;background:#fff}
```
`.bs-site-window` already supplies the fixed height and border from the port; change its
`overflow-y:auto` to `overflow:hidden` so the iframe scrolls internally rather than the
wrapper.

- [ ] **Step 7: Typecheck, lint, build; then commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
grep -n "bs-site-img\|bs-site-hint" src/components/portfolio/featured/BerilSedatHomesPage.tsx || echo "clean"
git add src/components/portfolio/featured/BerilSedatHomesPage.tsx
git commit -m "feat(portfolio): Beril & Sedat explainers + live site embed

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: Two languages, Scope, and the sign-off

**Files:**
- Modify: `src/components/portfolio/featured/BerilSedatHomesPage.tsx`

- [ ] **Step 1: Add the `SCOPE` const** after `SHOTS`:

```tsx
const SCOPE = [
  { no: "01", title: "Social Media", meta: "INSTAGRAM · EN + TR",
    body: "A navy editorial feed on a fixed grammar — Cinzel headline, bronze rule, restraint over volume. Carousels for anything that needs a build, singles for news. Bilingual announcements run as one post with two clean language blocks, never sentence-level mixing." },
  { no: "02", title: "Videography", meta: "ON CAMERA + BUILT GRAPHICS · 9:16",
    body: "Two strands. On camera: property walkthroughs with the price burned in, monthly market updates, and policy explainers — mostly Turkish, both principals visible, captions on. Underneath: a built graphics system that animates the parts of a purchase people avoid reading — carrying cost, closing costs, first-time buyer programmes — one number at a time." },
  { no: "03", title: "Website Design", meta: "BERILSEDATHOMES.CA · LIVE · EN + TR",
    body: "A full bilingual site: home, listings, neighbourhoods, advice, about, contact, blog, and a parallel Turkish build. Cinzel and Montserrat throughout, RECO-compliant, with the micro-market pages doing the SEO work a boutique brokerage actually needs." },
  { no: "04", title: "Ad Management", meta: "META · TR + EN · LISTING AND BRAND",
    body: "Paid support behind the listings and the seminar programme, reported on a fixed cadence against the plan rather than on whatever the dashboard highlighted that week." },
] as const;
```
The prototype's meta lines carried counts ("3 POSTS / WEEK", "44 MOTION PIECES"); those are
removed per the no-totals decision. Use the text above verbatim.

- [ ] **Step 2: Add the three sections** after `.bs-site-sec` (and before the lightbox JSX):

```tsx
      <section className="bs-lang">
        <div className="bs-lang-inner">
          <h2 className="bs-lang-head">Two languages, not one translated twice.</h2>
          <div className="bs-lang-grid">
            <div><p className="bs-lang-label">EN</p><p className="bs-lang-quote">&ldquo;Quiet luxury.&rdquo;</p></div>
            <div><p className="bs-lang-label">TR</p><p className="bs-lang-quote">&ldquo;Kişiye özel.&rdquo;</p></div>
          </div>
          <p className="bs-lang-body">Rendered literally, &ldquo;quiet luxury&rdquo; lands in Turkish as something closer to <i>muted expensive</i> — the wrong idea entirely. The Turkish side of this brand is transcreated, not translated: the promise is carried, the phrasing is rebuilt. &ldquo;A timeless home&rdquo; becomes <i>size yakışan bir yuva</i> — a home that suits you. Same brand. Two readers who each think it was written for them.</p>
        </div>
      </section>

      <section className="bs-scope">
        <h2 className="bs-sec-head light"><i></i><span>SCOPE</span><i></i></h2>
        <div>
          {SCOPE.map((s) => (
            <article className="bs-row" key={s.no}>
              <span className="bs-row-no">{s.no}</span>
              <div>
                <h3>{s.title}</h3>
                <p className="bs-row-meta">{s.meta}</p>
                <p className="bs-row-body">{s.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="bs-signoff">
        <div className="bs-sign-mark"><img className="bs-sign-img" src="/portfolio/beril-sedat-homes/brand/logo-navy.png" alt="Beril &amp; Sedat Homes monogram" loading="lazy" /></div>
        <div className="bs-sign-grid">
          <div><p className="bs-sign-label">PREPARED BY</p><p className="bs-sign-name">FrameFlow</p></div>
          <div><p className="bs-sign-label">FRAME</p><p className="bs-sign-name">{frame}</p></div>
          <div><p className="bs-sign-label">STATUS</p><p className="bs-sign-name bronze">ONGOING</p></div>
        </div>
        <Link className="bs-sign-back" href="/portfolio">← Back to portfolio</Link>
      </footer>
```
The sign-off uses the **light** logo (the section is on cloud) and shows the roster frame,
replacing the prototype's "FF-005".

- [ ] **Step 3: Typecheck, lint, build; then commit**

```bash
npx tsc --noEmit && npm run lint && npm run build
git add src/components/portfolio/featured/BerilSedatHomesPage.tsx
git commit -m "feat(portfolio): Beril & Sedat languages, scope, sign-off

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: Reduced-motion, responsive, final verification

**Files:**
- Modify: `src/components/portfolio/featured/BerilSedatHomesPage.tsx`

- [ ] **Step 1: Grep for the real motion declarations**, then write the block to match:

```bash
grep -o "transition:[^;}]*" src/components/portfolio/featured/BerilSedatHomesPage.tsx | sort -u
grep -o "animation:[^;}]*" src/components/portfolio/featured/BerilSedatHomesPage.tsx | sort -u
grep -c "prefers-reduced-motion" src/components/portfolio/featured/BerilSedatHomesPage.tsx   # must end at 1
```

- [ ] **Step 2: Add the reduced-motion block** at the end of the `styled-jsx` block (adjust to the grep):

```css
@media (prefers-reduced-motion: reduce){
  .bs-modal,.bs-modal-stage{animation:none}
  .bs-cell-img,.bs-play,.bs-modal-close,.bs-modal-nav,.bs-site-tabs button,.bs-site-nav button,.bs-visit{transition:none}
  .bs-cell:hover .bs-cell-img{transform:none}
  .bs-modal-nav:hover{transform:translateY(-50%)}
}
```
`.bs-modal-nav`'s `translateY(-50%)` does vertical **centering**, not motion — it MUST be
preserved. `transform:none` there would misalign the buttons.

- [ ] **Step 3: Add a mobile lightbox override** inside the EXISTING `@media(max-width:620px)` block (do not create a new block):

```css
.bs-modal-stage{width:calc(100% - 84px);height:min(72vh,640px)}
.bs-modal-nav{width:34px;height:34px;font-size:22px}
.bs-modal-nav.prev{left:5px}.bs-modal-nav.next{right:5px}
.bs-modal-cap{left:12px;right:12px;bottom:8px}
```
Keep the **definite height** here too — never `max-height` alone.

- [ ] **Step 4: Typecheck + lint**

```bash
npx tsc --noEmit && npm run lint
```

- [ ] **Step 5: Runtime verification.** Start `npm run dev` on a FREE port (check first; do not disturb anything on :3000). **Navigate headless Chrome to `localhost:<port>`, NOT `127.0.0.1:<port>`** — Next 16's `allowedDevOrigins` guard blocks dev resources from `127.0.0.1` and hydration hangs forever with no visible error. If Turbopack refuses a second dev server for this directory, run it from a git worktree with `next dev --webpack` (note Turbopack also rejects symlinked `node_modules` — use `cp -al`). Drive Chrome via CDP from a small `.mjs` script (Node 22 has a global `WebSocket`); adapt `/private/tmp/claude-501/-Users-barandiloglu-Desktop-Projects-FrameFlow/7e23bbf1-d226-407b-987c-54afe7d4f251/scratchpad/verify-iyn.mjs`. Launch Chrome with `--headless=new --remote-debugging-port=<port>`. Allow ~7s after navigation for the loading transition.

  Verify and report with ACTUAL NUMBERS:
  - Renders past the loading transition; hero knockout logo and sign-off logo both load (`naturalWidth > 0`).
  - 2 register cards; 9 reel cells; 12 feed cells; 4 explainer cells; 4 scope rows.
  - Clicking reel cell 1 opens the lightbox at `01 / 09` with a `<video>` present; clicking feed cell 1 opens at `01 / 12` with an `<img>`; clicking explainer cell 1 opens at `01 / 04` with a `<video>`. **←/→ must wrap WITHIN the open set only** — from feed `01/12` stepping back must land on `12/12` and the id must still start with `F.`, never `R.` or `X.`.
  - Stepping between two reels swaps the `<video>` `src` (proves the `key` remount).
  - Escape closes; `document.body.style.overflow` restored to `""`.
  - **CROP GUARD: with a FEED still open, measure the rendered `<img>` height against its container's `clientHeight` and confirm the 4:5 portrait is NOT cropped — at desktop 1440×1000 AND mobile 390×844.** Measure only after the pop-in animation settles (~400ms).
  - **THE SITE EMBED: the iframe is same-origin (`contentDocument` non-null), its `document.title` is non-empty, it contains images with `naturalWidth > 0` (proves the basePath asset fix), and its computed body `font-family` resolves to the real faces rather than a generic fallback.** Then click an internal link inside the frame and confirm `contentDocument.location.href` is UNCHANGED (proves the guards).
  - All seven tabs switch the iframe `src`, and each loads same-origin.
  - Zero console errors.
  Then stop the dev server.

- [ ] **Step 6: Production build + index check**

```bash
npm run build
```
Confirm `/portfolio/beril-sedat-homes` is in the static output and the portfolio index row reads
`020 · Beril & Sedat Homes · Now showing · SOCIAL MEDIA · VIDEOGRAPHY · WEBSITE DESIGN · AD MANAGEMENT`.

- [ ] **Step 7: Commit**

```bash
git add src/components/portfolio/featured/BerilSedatHomesPage.tsx
git commit -m "feat(portfolio): Beril & Sedat reduced-motion guard, responsive polish

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review

**Spec coverage:**
- Media (12 feed stills, 9 reels + 4 explainers transcoded with posters, 2 logo colourways) → Task 1 ✓
- Live site embed with the proven export pipeline + the IYN basePath fix → Task 2 ✓
- **Append-only** roster entry (frame 020), featured.ts, stub → Task 3 ✓
- Shell + hero + two registers with the corrected register framing → Task 4 ✓
- Reels + Feed + set-scoped styled lightbox (video and image) → Task 5 ✓
- Explainers + the embedded site with tabs and inert guards → Task 6 ✓
- Two languages + Scope + sign-off (roster frame, not FF-005) → Task 7 ✓
- Reduced motion + responsive + runtime verification → Task 8 ✓
- No-totals decision enforced in every sub-label and scope meta → Tasks 5, 6, 7 ✓
- Lightbox definite-height regression guard → Global Constraints + Task 5 Step 5, Task 8 Step 3, verified Task 8 Step 5 ✓

**Placeholder scan:** No "TBD" / "handle edge cases". Task 1's poster-retry and size-budget fallback, and Task 8 Step 1's grep, are adaptive by design with explicit accept criteria. All code steps carry real code.

**Type consistency:** `REGISTERS`/`REELS`/`FEED`/`EXPLAINERS`/`SHOTS`/`SCOPE` shapes match their consumers. The lightbox state is declared with a two-member union in Task 5 and **explicitly widened to three in Task 6 Step 2** — flagged because a stale union is a compile error, not a silent bug. `EXPLAINERS` deliberately lacks the `note` field that `REELS` has, and Task 6 notes the modal must not read it. Poster paths are derived from each video `src` by the same `.replace(/\.mp4$/, "")` expression in both the grid and the modal. Every `src` matches a file produced by Task 1 or Task 2. `.bs-site-frame` (Task 6) replaces the removed `.bs-site-img`/`.bs-site-hint`; everything else comes from the Task 4 port.
