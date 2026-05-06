# Portfolio: Real Clients on the Reel — Design Spec

**Date:** 2026-05-05
**Status:** Approved (sections 1–4) — pending user review of written spec
**Owner:** Baran Diloglu
**Implements:** Replace the fictional 14-project portfolio data with the real 19-client roster, keep the Reel editorial chrome, ship a placeholder per-client subpage that doubles as the future shared template.

---

## 1. Goals & non-goals

### Goals
- List all 19 real clients on `/portfolio` with truthful name + service-tag data.
- Preserve the Reel film-studio editorial chrome (per the locked redesign direction).
- Make every client row clickable to a real page at `/portfolio/[slug]`, not a 404.
- Build the per-client page as a shared template from day one — designed so it gets richer automatically as real case-study copy is written, with no schema or layout change.
- Ship honest data: no invented years, locations, runtimes, or synopses.

### Non-goals (V1)
- Writing real case-study copy for any client.
- Building a "Now Showing" featured section.
- Building "Selected Scenes" alternating editorial blocks.
- Per-client photography (placeholders only — `gallery_placeholders` rule still applies).
- Filter/search UI on the index.

---

## 2. Data model

### New file: `src/data/clients.ts`

Single source of truth for the portfolio. Used by the index page today, the per-client page from day one, and any future surfaces (homepage strip, Open Graph cards, sitemap).

```ts
export type Service =
  | "Ad Management"
  | "App"
  | "Branding"
  | "Design"
  | "Logo"
  | "Photography"
  | "SEO"
  | "Social Media"
  | "Videography"
  | "Web Application"
  | "Website Design";

export type Client = {
  slug: string;          // url-safe, hand-curated, stable
  name: string;          // display name
  services: Service[];   // service tags. ORDER MATTERS — first tag is the
                         // primary service, used as the FilmStill badge on
                         // the subpage and as the OG description lead.

  // Optional spotlight fields. All real or absent — never invented.
  // Their presence promotes the client into richer rendering automatically.
  year?: string;
  location?: string;
  runtime?: string;
  scene?: string;        // e.g. "INT. KITCHEN — DAY" — cinema slate flavor
  synopsis?: string;
  featured?: boolean;    // shows "Now Showing" badge on Index, eligible for Hero
  scene_order?: number;  // sort key for future Selected Scenes section
};

export const clients: Client[] = [ /* 19 entries, alphabetical */ ];

export const getClient = (slug: string): Client | undefined =>
  clients.find(c => c.slug === slug);

export const getAdjacentClients = (slug: string): { prev: Client; next: Client } => {
  const i = clients.findIndex(c => c.slug === slug);
  // Wraps around — reel is a loop, not a paginated list.
  return {
    prev: i > 0 ? clients[i - 1] : clients[clients.length - 1],
    next: i < clients.length - 1 ? clients[i + 1] : clients[0],
  };
};
```

### Why this shape
- Drops `director` (always FrameFlow on FrameFlow's own site — dead column).
- Drops `id` and `num` from the data — synthesized at render time so re-ordering the array doesn't break stable references.
- Every "rich" field is optional. The page renders what's present and hides what isn't, so:
  - Day one, every client renders the same minimal placeholder.
  - As you write real `synopsis` for one client, *that* client's subpage instantly becomes richer — no template change.
  - Setting `featured: true` graduates a client into the Hero/Now Showing slot when that section is re-introduced.
- Slugs are hand-curated in the data file (not auto-derived from names) so edge cases like apostrophes and acronyms have explicit, stable URLs that survive renames.

### The 19 clients

Order is **alphabetical** in the array. `services` are normalized to the `Service` union above.

| # | Slug | Name | Services |
|---|---|---|---|
| 1 | `acorn-accounting` | Acorn Accounting | Web Application |
| 2 | `adrians-wasaga-beach` | Adrian's Wasaga Beach | Social Media |
| 3 | `asd-laminate` | ASD Laminate | Ad Management, Social Media |
| 4 | `aydin-cpa` | AYDIN CPA | Photography, Website Design |
| 5 | `big-bears-baked-potato` | Big Bears Baked Potato | Branding, Design, Logo, Photography, Social Media, Videography, Website Design |
| 6 | `canapy-furniture` | Canapy Furniture | Ad Management, Photography, Social Media, Videography |
| 7 | `connectr` | ConnecTR | Photography, Videography |
| 8 | `ctbdh` | CTBDH | Logo, Videography |
| 9 | `destan-turkish-cuisine` | Destan Turkish Cuisine | Photography, Social Media, Videography |
| 10 | `edupathways` | EduPathways | Branding, Photography, SEO, Social Media, Videography, Website Design |
| 11 | `esma-fine-foods` | Esma Fine Foods | Photography, Social Media, Videography |
| 12 | `fidan-construction` | Fidan Construction | Ad Management, SEO, Website Design |
| 13 | `goldenhorn-construction` | Goldenhorn Construction | Logo, Photography, Website Design |
| 14 | `harbourloom` | Harbourloom | Logo, Photography, Social Media, Videography |
| 15 | `hopeway-immigration` | Hopeway Immigration | Social Media, Website Design |
| 16 | `iyn` | IYN | App, Social Media, Website Design |
| 17 | `mavi-travel` | Mavi Travel | Social Media |
| 18 | `minauto` | MinAuto | Logo, Social Media |
| 19 | `northern-pathways-immigration` | Northern Pathways Immigration Consulting | App, Social Media, Videography |

### Service-count totals (auto-derived for the Archive Manifest)

Verified by hand-counting the 19-client table above.

| Service | Count |
|---|---|
| Social Media | 13 |
| Photography | 9 |
| Videography | 9 |
| Website Design | 7 |
| Logo | 5 |
| Ad Management | 3 |
| Branding | 2 |
| App | 2 |
| SEO | 2 |
| Design | 1 |
| Web Application | 1 |

Total: 54 service-tag instances across 19 clients · 11 distinct services in use.

The Archive Manifest renders the **top 6** by count. If a tie pushes a tag in or out, alphabetical order breaks the tie (so `Photography` before `Videography` at 9-each, `App` before `Branding` if either is in contention at 2-each, etc.). Counts are computed at render time from the `clients` array — they update for free as the roster grows.

---

## 3. Page layout: `/portfolio`

### Sections, top to bottom

| # | Section | V1 status | Source data |
|---|---|---|---|
| 1 | Hero | Keep, retune | `clients.length`, fixed `Years = 05`, distinct service count |
| 2 | Marquee | Keep, real names | `clients.map(c => c.name)`, tripled |
| 3 | Now Showing (featured) | **Cut** | — |
| 4 | The Index | Keep, redesigned | All 19 |
| 5 | Selected Scenes | **Cut** | — |
| 6 | Archive Manifest | Keep, auto-derived | Top 6 services by count |
| 7 | CTA (booking strip) | Keep as-is | — |

Net: page goes from 7 sections to 5. ~30% shorter, all real data.

### Hero changes
- "FF_ARCHIVE / 11 TITLES CATALOGUED / VOL I — IV" strip → `FF_ARCHIVE / 19 CLIENTS CATALOGUED / VOL 2026`.
- Three-stat block at the bottom: **Clients · Years · Services** = `19 · 05 · 11`. The `Services` stat is the count of distinct services represented across the roster (the union of all `services` arrays). Currently 11 because every defined `Service` is used by at least one client; if the roster ever drops the only client of a service, this number decreases automatically.
- `Cities` stat dropped (no per-client city data).
- Hero copy unchanged ("The archive, scene by scene.").

### Marquee
- Replace the 10 fictional titles with all 19 real client names (alphabetical, same as array).
- Still tripled for the looping ticker.
- Star separator and editorial italic styling unchanged.

### The Index — row redesign

**Current desktop columns:** `80px | 3fr | 1.4fr | 1.1fr | 80px` = Frame · Title · Genre · Year/Run · Act.

**New desktop columns:** `80px | 3fr | 1.5fr | 80px` = Frame · Client · Services · Act.

**Per-row content:**

| Column | Content | Notes |
|---|---|---|
| Frame (80px) | `001`–`019`, padded | Auto from array index. Amber mono. |
| Client (3fr) | Giant italic editorial name | Subtitle line removed (no scene/client to show). Row gets visually shorter than the original. |
| Services (1.5fr) | All service tags joined by ` · `, uppercase mono | Wraps freely to 2–3 lines for clients with many services (Big Bears, EduPathways). Wrapping is the rhythm — bigger relationships look bigger. No truncation, no "+N more". |
| Act (80px) | Right-arrow glyph | Whole row is `<Link href={"/portfolio/" + slug}>`. Hover: amber color, arrow nudges right. |

**Column header strip:** `Frame · Client · Services · Act`.

**Mobile (`<md`):**
- Stacks. Client name at top (italic editorial). Services wrap on a second line (mono, `text-on-alt-60`). Right arrow drops on mobile (matches existing pattern).

**Hover state:** unchanged — `hover:bg-on-alt-05`, name turns amber, arrow nudges right.

**Featured badge:** the inline `Now showing` chip currently on row 1 is removed in V1. It returns automatically when any client has `featured: true`.

### Archive Manifest
- Six tiles, each `[Service Name] [count]`, computed from the `clients` array.
- Top 6 services by count, given the current roster: `Social Media · 13`, `Photography · 09`, `Videography · 09`, `Website Design · 07`, `Logo · 05`, `Ad Management · 03`.
- Counts always padded to two digits to match the editorial type rhythm.

### CTA
No change.

---

## 4. Subpage: `/portfolio/[slug]`

### File: `src/app/portfolio/[slug]/page.tsx`

A single component, `<ClientPage client={client} />`, that renders whatever real data exists. **This is the future shared template** — designed in from day one. As real fields land per client (`synopsis`, `year`, etc.), the same component progressively renders richer sections without schema or layout work.

### Layout (top → bottom)

1. **Navbar** — site nav.
2. **NOW SHOWING strip** — same backdrop-blur strip as the portfolio Hero. Reads `FF_ARCHIVE · /clients/{slug} · STATUS · IN POST` (or `STATUS · ON SCREEN` once `synopsis` exists).
3. **Breadcrumb** — `Home / Portfolio / {Client Name}`, mono amber.
4. **Hero block** — Frame number (`FF#012 · Reel '26`), giant italic editorial name, service tags rendered as small mono pills.
5. **Decorative FilmStill** — reuses the existing `<FilmStill>` component (large variant). Scene slate reads `INT. STUDIO — IN POST` for stub clients, or `client.scene` once provided. Giant ghost numeral matches the frame number.
6. **Body — progressive enrichment:**
   - **If `client.synopsis` is absent** → render the "Currently in post" panel:
     > This case is still in post — stills, scenes, and the full cut are coming soon. Want a private screening? Get in touch.
     With two CTAs: `[Get in touch →]` (primary, links to `/contact`) and `[/ back to the archive]` (secondary, links to `/portfolio`).
   - **If `client.synopsis` is present** → render the meta slate in the same styling as the current Now Showing section, plus the synopsis paragraph above it. The `Client` row is dropped (the whole page is about this client — their name is already the H1, repeating it in the slate is redundant). Slate rows, in order:
     - `Directed by` — always "FrameFlow"
     - `Genre` — `services` joined by ` · `
     - `Year` — `client.year`
     - `Location` — `client.location`
     - `Runtime` — `client.runtime`

     **Each row is conditional on its own field**: missing fields hide their row instead of showing "—" or "TBD". So a client with synopsis + year but no location renders 4 rows, not 5 with a blank.
7. **Archive nav strip** — `← Prev: {previous client name}` ··· `Next: {next client name} →`. Wraps around (last → first, first → last). Mono uppercase, amber accent on the directional words.
8. **CTA strip** — reuse the booking strip from `/portfolio` verbatim.
9. **Footer**.

### Routing & SEO

- Dynamic route under `/portfolio/[slug]`.
- `generateStaticParams()` returns all 19 slugs at build time → fully static-rendered.
- `generateMetadata()` derives:
  - `<title>` = `{name} — FrameFlow` (e.g. `Acorn Accounting — FrameFlow`)
  - `<meta name="description">` = `{name} · {services joined}` (e.g. `Acorn Accounting · Web Application`)
  - OG title/description/url derived the same way.
- Unknown slug → `notFound()` (Next.js renders the project's `not-found.tsx` if present, default 404 otherwise).

**Important Next.js note:** AGENTS.md says this Next.js version has breaking changes from training data. Before writing the route during implementation, read `node_modules/next/dist/docs/` for the current dynamic-route + `generateStaticParams` + `generateMetadata` guides and follow whatever they say, even if it contradicts memory. Heed any deprecation notices.

---

## 5. Files affected

| Path | Action |
|---|---|
| `src/data/clients.ts` | **New** — type + array + lookup helpers |
| `src/app/portfolio/page.tsx` | **Rewrite** — drops fictional data, uses `clients` array, applies redesigned Index row, swaps Hero stats, derives Manifest counts, cuts Now Showing + Selected Scenes |
| `src/app/portfolio/[slug]/page.tsx` | **New** — `<ClientPage>` shared template with progressive enrichment |
| `src/app/portfolio/[slug]/not-found.tsx` | **New (optional)** — branded 404 for bad slugs; if skipped, Next.js falls back to its default |
| `src/components/portfolio/FilmStill.tsx` | **New (extraction)** — `<FilmStill>` is needed by both `/portfolio` and `/portfolio/[slug]`, so it moves out of the portfolio page into a shared component. Takes `{ client: Client; frameNumber: string; size?: "default" \| "large" }`. Internally maps: `num` ← `frameNumber`; `title` ← `client.name`; `scene` ← `client.scene ?? "INT. STUDIO — IN POST"`; `location` ← `client.location ?? ""` (renders empty span if absent); `year` ← `client.year ?? ""` (same); `genreShort` ← `client.services[0]` uppercased. |

`<IndexRow>` stays inline in `src/app/portfolio/page.tsx` since it's portfolio-page-specific. `<SelectedScene>` is **deleted** in V1 (dead code — the section is cut). Git history retains it; it can be reintroduced when the Selected Scenes section returns.

---

## 6. Acceptance criteria

- [ ] `/portfolio` shows all 19 real clients in alphabetical order.
- [ ] Each client row's services match the table in §2.
- [ ] Each client row links to `/portfolio/{slug}` and that page returns 200, not 404.
- [ ] All 19 subpages are statically pre-rendered at build (`generateStaticParams`).
- [ ] Hero stats read `19 · 05 · 11` for Clients · Years · Services.
- [ ] Archive Manifest tiles are computed from the `clients` array, not hard-coded.
- [ ] Marquee cycles through all 19 real client names, tripled.
- [ ] Now Showing and Selected Scenes sections are removed from the page.
- [ ] No invented year, location, runtime, scene, or synopsis appears anywhere on the page or any subpage.
- [ ] Bad slug (e.g. `/portfolio/not-a-client`) renders a 404, not a blank `<ClientPage>`.
- [ ] `next build` succeeds with no type errors.
- [ ] Each subpage's `<title>` and OG metadata reflect the real client.

---

## 7. Open questions

None as of 2026-05-05. All structural decisions made through brainstorming dialogue:

- **Approach:** Keep the chrome with optional fields (Approach D), populate progressively.
- **Spotlight sections:** Cut for V1 (Approach A) — re-enabled per-client when `featured` / `scene_order` is set.
- **Archive Manifest:** Auto-derived counts from real services (top 6).
- **Subpage policy:** Stub renders today, becomes the shared template (Approach C).
- **Index row:** Drop subtitle category tag; let services wrap freely instead of truncating.
- **Prev/Next nav:** Wraps around.
- **`Web Application` service tag:** Added (Acorn-only) — distinct from `Website Design` because Acorn is a functional product, not a marketing site.
