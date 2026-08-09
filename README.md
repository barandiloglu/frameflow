<div align="center">

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="public/logo_white.png">
  <img src="public/logo_black.png" alt="FrameFlow" width="200">
</picture>

### Your Sincere Growth Partner

The website for FrameFlow — a Toronto creative agency doing brand identity,<br>
web design, social media and digital marketing for small and mid-sized businesses.

<br>

![Next.js](https://img.shields.io/badge/Next.js-16.2-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-19.2-087EA4?style=flat-square&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-FF2D55?style=flat-square&logo=framer&logoColor=white)
![Deployed on Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat-square&logo=vercel&logoColor=white)

</div>

---

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in the values, see below
npm run dev
```

Open **http://localhost:3000**.

> [!NOTE]
> Use `localhost`, not `127.0.0.1` — the theme script and a few client components key off the origin.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint over the whole tree |
| `node scripts/build-gallery-derivatives.mjs` | Rebuild the gallery's WebP derivatives — **not** part of `next build` |

## Environment

Only the contact form needs configuration. Everything else runs without secrets.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | [Resend](https://resend.com) key used to deliver contact-form messages |
| `CONTACT_FROM` | Envelope sender, e.g. `FrameFlow Contact <contact@frameflow.ca>` — must sit on a domain verified in Resend |
| `CONTACT_TO` | Comma-separated inboxes the form lands in |

`.env*` is gitignored (`.env.example` is the one tracked exception), so these must also be set in the Vercel dashboard for deployed builds. If any is missing the route answers `503` and logs which one.

## Routes

**Public**

| Route | |
| --- | --- |
| `/` | Landing page |
| `/services` | Service scenes, plus The Cutting Room |
| `/about` | Studio |
| `/portfolio` | Client index |
| `/portfolio/[slug]` | Case study — 16 clients have a bespoke page under `components/portfolio/featured` |
| `/gallery` | 76-photo shuffle drawn from the case-study originals |
| `/contact` | Fill-in-the-blanks sentence form, wired to Resend |

**Client portal** — `/login`, `/dashboard`, `/dashboard/approvals`, `/dashboard/calendar`

**Admin** — `/admin` and its analytics, clients, media, posts, projects, settings and team sections

> [!IMPORTANT]
> The portal and admin routes are **front-end only** — no auth, no persistence, no backend behind them yet. That is why the navbar's Client Login is rendered as a disabled control marked *in production* rather than a working link.

## API

| Endpoint | Method | Notes |
| --- | --- | --- |
| `/api/contact` | `POST` | Sends the contact form through Resend. Validates and length-caps input, escapes HTML, strips CRLF from header-bound fields, drops honeypot submissions behind a `200`, and throttles per IP (process-local, so it resets on redeploy). |

## Project layout

```
src/
├── app/
│   ├── api/contact/       Resend mail handler
│   ├── admin/             Admin portal (UI only)
│   ├── dashboard/         Client portal (UI only)
│   ├── portfolio/         Index + [slug] case studies
│   ├── globals.css        Design tokens, theme definitions
│   └── layout.tsx         Fonts, theme bootstrap, global chrome
├── components/
│   ├── portfolio/
│   │   ├── featured/      One bespoke page per flagship client
│   │   └── scenes/        Reusable case-study scene blocks
│   ├── services/          CuttingRoom, SceneList
│   ├── Navbar · Footer · Reveal · ThemeProvider · ThemeToggle
│   └── GrainOverlay · ScrollProgress · ScrollToTop
└── data/                  clients.ts · gallery.ts · serviceFolders.ts

public/
├── gallery/               Generated WebP derivatives (thumb 400w · full 1600w)
└── portfolio/             Per-client originals — ~208 MB, left untouched
```

## Design system

**Theme** — dark by default, with a light mode. The choice is persisted to `localStorage` under `ff-theme` and applied by an inline script in `<head>`, so there is no flash of the wrong theme on first paint. Components read semantic tokens (`--surface`, `--on-surface`, `--border-subtle`) rather than raw colors, so both themes come from one set of rules.

**Palette**

| Token | | Hex |
| --- | --- | --- |
| Graphite | ![](https://img.shields.io/badge/-353230?style=flat-square) | `#353230` |
| Ivory | ![](https://img.shields.io/badge/-ffffeb?style=flat-square) | `#ffffeb` |
| Amber | ![](https://img.shields.io/badge/-d38f2c?style=flat-square) | `#d38f2c` |
| Ember | ![](https://img.shields.io/badge/-d45938?style=flat-square) | `#d45938` |

Amber only clears 2.68:1 on ivory, so light theme substitutes a burnt `#a06210` for text while keeping `--color-amber` for fills and rules.

**Type** — Fraunces for editorial display, Plus Jakarta Sans for headings, Inter for body, DM Sans as the warm UI face, JetBrains Mono for labels and metadata. All loaded through `next/font/google`.

## Gallery pipeline

The case-study originals are large and stay where they are. `scripts/build-gallery-derivatives.mjs` reads `src/data/gallery.ts` and regenerates two sizes into `public/gallery`:

- **thumb** — 400w WebP q72, the shuffle pool. Every one is preloaded behind the reveal overlay, so the whole set has to stay near 1 MB.
- **full** — 1600w WebP q80, fetched only when a photo is opened.

Upscaling is disabled, since a number of originals are under 900px wide and enlarging them only inflates the file. Run it manually after changing the gallery data.

## Deployment

Deployed on Vercel from `main`. Set the three contact-form variables in the project's environment settings — env changes only reach **new** deployments, so add them before you push.

## Conventions

Read [`AGENTS.md`](AGENTS.md) before contributing. The short version: this repo tracks a Next.js version whose APIs and conventions have moved on from what most references describe, so check the bundled docs in `node_modules/next/dist/docs/` rather than working from memory.

<div align="center">
<br>
<sub><b>FrameFlow</b> · 99 Yorkville Ave, Unit 200, Toronto · <a href="mailto:hello@frameflow.ca">hello@frameflow.ca</a></sub>
</div>
