# CSE Lecturer Notice Board

A single-page web app that aggregates **CSE lecturer openings across 27 private universities in Bangladesh** into one place — with an **autonomous, self-updating job feed** built entirely on free infrastructure (Google Alerts → GitHub Actions → GitHub Pages). No server, no database, no running cost.

**🔗 Live demo:** https://dbp625.github.io/cse-lecturer-board-react/

---

## Why I built it

Private universities in Bangladesh post faculty circulars across ~27 separate career pages, newspapers, and job boards — there is no single feed. This app curates them, tracks deadlines and application status, and layers on a structured exam/viva preparation toolkit. It doubles as a real tool I use for my own job hunt.

## Features

- **27 curated universities** — region/status filters, full-text search, pin favourites, and per-university application-status tracking (persisted in `localStorage`).
- **Live "Latest postings" feed** — auto-refreshed every 6 hours from a Google Alerts RSS feed, with a staleness indicator.
- **Closing-soon rail** — deadlines computed client-side, sorted by urgency.
- **Three study tools** — a reading roadmap (per-subject file map), a topic checklist (★-rated atomic topics, exam questions, textbook references, "must-know" filter), and a 14-day prep plan with a **live eligibility checker** (type your CGPA, see which universities you clear).
- **Salary bands & application-process guide** grounded in real research.
- **Light/dark theme**, fully responsive, keyboard shortcuts (`/` to search).

## Tech stack

| Layer | Choice |
|---|---|
| UI | **React 19** + **React Router** (`HashRouter` for static hosting) |
| Build | **Vite 8** |
| Styling | **Tailwind CSS 4** + **daisyUI 5** (custom `cselight` / `csedark` themes) |
| Data pipeline | **Python** (standard library only) RSS/Atom parser |
| CI/CD | **GitHub Actions** — build & deploy + scheduled data refresh |
| Hosting | **GitHub Pages** |

## Architecture — the self-updating pipeline

```
Google Alerts (RSS)
        │  every 6h (cron)
        ▼
GitHub Actions ── feed_to_json.py ──▶ public/notices.json (committed)
        │  commit triggers ▼
GitHub Actions ── vite build ──▶ deploy to GitHub Pages
        │
        ▼
   React app fetches notices.json → renders the live feed
```

The scheduled workflow parses the feed, filters for genuine lecturer postings (role + job-intent heuristics, drops news noise), and commits `public/notices.json`. That commit triggers the deploy workflow, which rebuilds the site — so the page stays current with zero manual work.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173/cse-lecturer-board-react/
npm run build    # production build → dist/
npm run lint     # oxlint
```

## Project structure

```
src/
  data/          content modules — universities, topics, reading, prep
  components/    Navbar, UniCard, LiveFeed, SearchBar, FilterChips, ThemeToggle …
  pages/         NoticeBoard, PrepRoadmap, ReadingRoadmap, TopicChecklist
  hooks/         useLocalStorage, useScrollProgress
feed_to_json.py             Google Alerts RSS → public/notices.json
.github/workflows/          deploy.yml (build+deploy) · refresh.yml (6h data refresh)
```

## Deployment notes

Deployed to GitHub Pages via Actions (Pages source = **GitHub Actions**). A repository secret **`FEED_URLS`** holds the Google Alerts feed URL(s) the refresh job reads.

---

*Built by [DBP625](https://github.com/DBP625). Curated data is verified periodically; always confirm a deadline on the university's own page before applying.*
