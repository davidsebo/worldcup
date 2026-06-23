# World Cup 2026 — Pool Room

A scenario simulator for a World Cup pool where you pick the final 1–4 standings of all
12 groups. Set every remaining group-stage result with the score steppers and watch your
picks score live, with full FIFA tiebreakers applied (points → goal difference → goals
scored → head-to-head).

Scoring: **1st = 3 · 2nd = 2 · 3rd = 1 · 4th = 1** (max 84). Starting data is current
through Matchday 2 (June 22, 2026).

Two presets:

- **Load root-for ceiling** — sets every remaining game to the best realistic outcome
  for the picks (reads 72/84).
- **Reset remaining to 0–0** — clean slate to build your own scenario.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # serve the production build locally
```

## Deploy to Vercel

This is a standard Vite app, so Vercel auto-detects everything — no extra config needed.

**CLI:**

```bash
npm i -g vercel     # if you don't have it
vercel              # first run prompts you to log in / link the project
vercel --prod       # promote to production
```

When the CLI asks about settings, accept the defaults: framework **Vite**, build command
`npm run build`, output directory `dist`.

**Or via the dashboard:** push this folder to a GitHub repo, then on vercel.com choose
**Add New → Project**, import the repo, and deploy. Vercel detects Vite automatically.

## Editing the data

Everything lives in `src/data.js`:

- `GROUPS` — each group's teams, all six matches (played ones carry final scores;
  remaining ones are editable in the UI), and your predicted finish in `picks`.
- `DREAM` — the "root-for ceiling" preset, keyed by `groupId-matchIndex`.

Standings and scoring logic is in `src/standings.js`; all UI is in `src/App.jsx`.
