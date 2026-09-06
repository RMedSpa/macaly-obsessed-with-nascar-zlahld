# Obsessed with NASCAR

NASCAR + IndyCar news hub with live headlines, a weekly **Cup Race Debrief**, **Cup Chase desk** (top 16 / cut line), standings, TV guide, schedules, Driver Hub, a **NASCAR for Beginners** guide, **iRacing Tips**, and a **Pit Strategy Calculator**.

## Stack

- Next.js + TypeScript + Tailwind CSS + Convex
- Google News RSS via `lib/news.ts` (revalidate every 5 minutes)
- **Auto Cup debrief desk** — Convex cron every 6h pulls NASCAR live feed, builds debrief + pit chart, optional AI polish, publishes for homepage

## Main pages

- `/` — ticker, hero, **live NHMS desk** (when the Dollar Tree 301 is green), **Cup race debrief**, beginners CTA, iRacing CTA, TV guide, standings, **Chase CTA**, schedule, series news, videos, social
- `/chase` — Cup Chase desk (2026): top 16 by points only, cut-line bubble, ~55-pt win boost, 10-race cumulative Chase
- `/2027-schedule` — Confirmed 2027 Cup / O’Reilly / Truck dates (rolling NASCAR release; not a finished 36-race grid)
- `/beginners` — beginner basics, Cup team/driver breakdown, track guide
- `/iracing` — iRacing tips + Cup setup starters by track (ovals, traffic, restarts, strategy, ladder)
- `/drivers` — Driver Hub (search drivers, news + social) plus **Top 10 Cup Driver** cards
- `/drivers/[slug]` — biographies for the official 2026 Cup top 10 after Loudon, plus Bubba Wallace (P14, Loudon runner-up)
- `/drivers/kyle-larson` — Kyle Larson biography (childhood, family, career, dirt-track résumé) + live Loudon card while the Dollar Tree 301 is green
- `/pit-strategy` — Pit Strategy Calculator (per-track presets; seeds from the live Dollar Tree 301 window when Loudon is green — laps remaining, leader, pit log — otherwise the full 301-lap NHMS preset)
- `/tracks` — Chase 2026 track desk (10 venues, SVG layouts, last 10 Cup winners)
- `/tracks/[slug]` — per-track booth page (Darlington through Homestead)
- `/track-types` — educational guide to short tracks, flat miles, intermediates, superspeedways, road courses

## SEO

- Canonical + Open Graph + Twitter cards via `lib/seo.ts` + `app/metadata.json`
- `app/sitemap.ts` → `/sitemap.xml`
- `app/robots.ts` → `/robots.txt`
- `public/llms.txt` → `/llms.txt`
- JSON-LD (WebSite/Organization, beginner FAQ WebPage, Driver Hub CollectionPage)
- Shared social image: `public/og.jpg` (1200×630)
- Favicon: `app/favicon.ico` + `public/favicon.ico`
- Published URL base: `https://nascarobsessed.macaly.app` (`lib/site.ts`)

## Performance notes

- Below-the-fold Social feed is dynamic-imported
- YouTube embed + X/Twitter widgets load only near viewport
- News ticker is a pure CSS server component (no hydration)

## Key files

- `lib/cup-race-debrief.ts` — static fallback Cup race debrief (used if Convex has no doc)
- `components/cup-race-debrief.tsx` — homepage race debrief UI (`/#last-race`); prefers Convex live doc
- `lib/cup-chase.ts` — Cup points feed → 2026 points-only top 16 / cut-line / scenarios
- `components/cup-chase-board.tsx` — `/chase` Chase desk UI
- `components/cup-chase-cta.tsx` — homepage teaser to `/chase`
- `convex/schema.ts` + `convex/raceUpdates.ts` — debrief tables + queries/mutations
- `convex/raceUpdateActions.ts` — live-feed fetch, pit/strategy math, LLM polish, publish
- `convex/crons.ts` — 6-hour autopilot (`internal.raceUpdateActions.checkAndRefresh`)
- `convex/seedDebrief.ts` — Richmond Cook Out 400 seed payload
- `lib/beginners-data.ts` — beginners basics, Cup teams, tracks
- `components/beginners-guide.tsx` — full beginners page UI
- `components/beginners-cta.tsx` — homepage teaser to `/beginners`
- `lib/iracing-tips.ts` — iRacing tip library, ladder, quick wins, Cup setup starters by track
- `components/iracing-tips-guide.tsx` — full iRacing tips page UI + Cup setup garage
- `components/iracing-cta.tsx` — homepage teaser to `/iracing`
- `lib/nhms-live.ts` — Dollar Tree 301 live snapshot + race-window helper + featured-driver pit log + Berry Loudon stop chart (`BERRY_LOUDON`)
- `components/nhms-live-desk.tsx` — homepage live race desk (`/#live-race`)
- `components/larson-live-tracker.tsx` — Kyle Larson live position + pit-stop card
- `lib/kyle-larson.ts` — Kyle Larson biography data
- `components/kyle-larson-page.tsx` — `/drivers/kyle-larson` biography UI
- `lib/cup-top10-drivers.ts` — 2026 Cup top-10 bios, cards, and SEO
- `components/cup-driver-profile.tsx` — shared `/drivers/[slug]` biography UI
- `components/top10-cup-drivers.tsx` — Driver Hub Top 10 Cup Driver grid
- `lib/schedule.ts` — next-race countdown helper
- `lib/schedule-2027.ts` — confirmed 2027 Cup / O’Reilly / Truck dates + TV windows
- `components/schedule-2027-desk.tsx` — `/2027-schedule` rolling calendar desk
- `components/schedule-2027-cta.tsx` — homepage teaser to `/2027-schedule`
- `lib/pit-strategy.ts` — per-track presets (pace/deg/pit loss/distance/fuel) + stint/fuel math
- `components/pit-strategy-calculator.tsx` — strategy desk UI + chart
- `components/berry-vs-optimal.tsx` — Berry's actual Loudon stops vs calculator Optimal Stint
- `lib/tracks.ts` — Chase 2026 track desks (specs, history, verified Cup winners)
- `components/tracks-index.tsx` + `components/track-desk.tsx` + `components/track-infographic.tsx` — `/tracks` UI
- `components/tracks-cta.tsx` — homepage teaser to `/tracks`
- `lib/track-types.ts` — track category copy + examples
- `components/track-types-guide.tsx` — Track Types educational page
- `lib/seo.ts` / `lib/site.ts` — metadata helpers + site constants
- `components/*` — site sections (header, hero, standings, etc.)

## Design

- Light classic racing UI with dark sticky header
- Dark broadcast-style race debrief panel on homepage
- CSS variables: NASCAR red, blue, series colors, strategy cyan/yellow
- Fonts: Archivo Black (headings) + Oswald (UI/body)
