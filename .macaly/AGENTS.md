# Project: Obsessed with NASCAR

## Project Context
- NASCAR + IndyCar news aggregator site covering 5 series
- Live headlines from Google News RSS (no API key needed, revalidates every 5 min)
- Classic NASCAR **light** theme in `app/globals.css`: white page bg (`--background` 0 0% 100%), near-black foreground. Do not use `text-white` on page backgrounds — only on dark `bg-strategy-panel` / red chips. Body/headings use `text-foreground`.
- Fonts: Archivo Black (--font-archivo, display/headings) + Oswald (--font-oswald, labels/nav/body)
- Legacy font aliases: font-bebas = Archivo Black, font-barlow = Oswald (kept for backward compat)
- Series color coding: Cup=Red, O'Reilly Auto Parts (internal key `xfinity`)=Blue, Trucks=Orange, ARCA=Green, IndyCar=Navy Blue
- 2026 rebrand: former Xfinity Series is now the NASCAR O'Reilly Auto Parts Series — user-facing labels say O'Reilly; keep code keys/CSS tokens as `xfinity` / `series-xfinity` for stability

## Design System
- DARK theme (near-black background, light text on dark surfaces, CSS variables at :root)
- NASCAR Red: `hsl(var(--nascar-red))` = #e10600
- NASCAR Blue: `hsl(var(--nascar-blue))` = #1f5cff (replaced gold)
- Gradient: red → white → blue (patriotic)
- Use `text-nascar-red`, `text-nascar-blue`, `bg-series-cup`, `bg-series-xfinity`, etc.
- Typography: `font-archivo` (Archivo Black) for big headings, `font-oswald` for everything else
- Red-to-gold gradient text: class `gradient-accent`
- Card hover lift: class `card-lift`
- Pulsing red dot: class `pulse-dot`
- Speed-line diagonal texture: class `speed-lines-bg`
- Scrolling ticker: class `ticker-scroll`

## Static data refresh (must do after every race weekend)
- **Cup race debrief** lives in `lib/cup-race-debrief.ts` (`LATEST_CUP_RACE`) — winner, **winnerPitStrategy** (stop chart + keys to win under hero), stages, top 10, pit scoreboard, incidents, takeaways; shown via `components/cup-race-debrief.tsx` at `/#last-race`
- Standings live in `components/cup-standings.tsx` (Cup + O'Reilly + Trucks arrays) — not auto-fetched
- **Love Garage** at `/garage` — member crew-chief game (ghost cars, pit calls). Convex tables `garageCars`, `garageRaces`, `garageEntries`, `garageCalls`. No live NASCAR scrape. Current upcoming race is Cook Out Southern 500 at Darlington (Sun Sep 6, 2026, 5 p.m. ET / 3 p.m. MDT, 367 laps). Admin: `rmedspa@icloud.com` at `/garage/admin`. Disclaimer required on footer and garage pages.
- **Trivia Night** at `/trivia` — Daily 5 quiz plus Chase-week packs. Nav label Trivia. Convex tables `triviaQuestions`, `triviaPacks`, `triviaAttempts`. Seed only the 12 verified starter questions; do not invent extra facts. Daily 5 posts 6 a.m. Mountain. Admin: `rmedspa@icloud.com` at `/trivia/admin`. Disclaimer: “Fan quiz on nascarlove.org. Not affiliated with NASCAR, its teams, or its drivers.” No official logos or “official NASCAR trivia.”
- **Cup Chase desk** at `/chase` via `lib/cup-chase.ts` (2026 points-only top 16; field frozen after Daytona; live points feed with Daytona-reset fallback) + `components/cup-chase-board.tsx`; homepage CTA `components/cup-chase-cta.tsx`
- Schedule / next race: `lib/schedule.ts` + `components/race-schedule.tsx` + `components/tv-guide.tsx` + `components/news-ticker.tsx`
- **2027 schedule desk** at `/2027-schedule` via `lib/schedule-2027.ts` + `components/schedule-2027-desk.tsx`; homepage CTA `components/schedule-2027-cta.tsx`. Rolling NASCAR release — confirmed dates only, do not invent unannounced Cup venues. Last refresh Aug 25 2026.
- **Darlington weekend desk** at `/#darlington-weekend` via `lib/darlington-weekend.ts` + `components/darlington-weekend-desk.tsx` — Sat Sept 5 2026: lightning canceled Cup qualifying; Southern 500 starting field set by metric (Reddick pole, Suárez P2, Preece P3). O'Reilly Fleetio 200 qualifying complete: Carson Kvapil #1 pole 30.424 / 161.636 mph. Header Live jumps here. TV guide is this Darlington weekend (MDT). Southern 500 Sun Sept 6, 5 p.m. ET USA.
- **Daytona 400 desk** at `/#daytona-400` via `lib/daytona-400.ts` + `components/daytona-400-desk.tsx` — recap of Coke Zero Sugar 400, Sat Aug 29 2026. Preece OT win, Chase locked, SVG missed. Homepage currently leads with Darlington instead of this desk.
- **Live NHMS desk** at `/#live-race` via `lib/nhms-live.ts` + `components/nhms-live-desk.tsx` — shown while Dollar Tree 301 window is green (hero countdown swaps to live CTA). Includes `featuredDriver` (Kyle Larson P4 / pit log) rendered by `components/larson-live-tracker.tsx` above the Berry leader board and on `/pit-strategy`. Berry's Loudon stop chart (`BERRY_LOUDON`) is compared vs Optimal Stint on `/pit-strategy`.
- **Kyle Larson bio** at `/drivers/kyle-larson` via `lib/kyle-larson.ts` + `components/kyle-larson-page.tsx` — childhood, family, hometown, Cup career, dirt résumé. Nav label: Larson.
- **Top 10 Cup driver bios** at `/drivers/[slug]` via `lib/cup-top10-drivers.ts` + `components/cup-driver-profile.tsx`. Grid shows official P1–P10 after Loudon (Larson stays on his dedicated page). Extra bios (Wallace, 14th) stay live even when they drop out of the top 10.
- **NASCAR Legends** on `/drivers#nascar-legends` via `lib/nascar-legends.ts` + `components/nascar-legends.tsx`. Full bios at `/drivers/dale-earnhardt` and `/drivers/kyle-busch` (`components/legend-driver-profile.tsx`). Kyle Busch died May 21, 2026; RCR retired No. 8 for Brexton. Do not list him as an active 2026 Cup driver.
- Homepage meta: `app/metadata.json` (keep titles 30–60 chars, descriptions 50–160 chars)
- Canonical site URL: `https://www.nascarlove.org` in `lib/site.ts` (sitemap, JSON-LD, robots host, metadataBase). Do not canonicalize to the macaly.app alias.
- Last standings refresh: post-Daytona Aug 29 2026 (Cup Chase reset: Hamlin 2100, Blaney 2075, Reddick 2065; Preece 16th seed 2000 after first career win; SVG first out 17th / 605 / 2 wins). Trucks: Riggs 2065 playoff reset + Team EJP 175 win; O'Reilly still post-Iowa: Allgaier 1048)
- Last race debrief: Coke Zero Sugar 400 Daytona — Preece #60 first career win in OT, 0.024s over Suárez; 166 laps / 415 miles; Chase field frozen. Pit clocks not posted for this plate race.
- Last IndyCar schedule refresh (Aug 18 2026): next = Freedom 250 Grand Prix, Streets of Washington D.C. (Aug 23); recent winners include O'Ward (Mid-Ohio), Palou (Nashville + Portland), Ericsson (Ontario/Markham)

## Architecture
- `lib/news.ts` — RSS fetching + parsing utility (5 series: cup, xfinity, truck, arca, indycar)
- `lib/schedule.ts` — Shared Cup race schedule data + getNextRace() helper
- `lib/schedule-2027.ts` + `app/2027-schedule/page.tsx` + `components/schedule-2027-desk.tsx` — confirmed 2027 national-series calendar desk
- `lib/cup-race-debrief.ts` — Static fallback Cup debrief (deployed UI uses Convex when available)
- `components/cup-race-debrief.tsx` — Homepage post-race summary (after hero); `useQuery` on `raceUpdates.getLatestCupDebrief`
- `lib/cup-chase.ts` + `app/chase/page.tsx` + `components/cup-chase-board.tsx` — Cup Chase cut-line desk, 2026 points-only format (hourly revalidate on points feed)
- `components/cup-chase-cta.tsx` — Homepage teaser to `/chase`
- `convex/raceUpdateActions.ts` + `crons.ts` — fully automatic weekly Cup debrief (live feed + weekend-feed every 6h; force via `forceRefresh` with SECRET_KEY). Weekend feed fills official stage winners, TV, pole speed, margin, cautions/infractions, teams, career-win text.
- `convex/raceUpdates.ts` — publish/seed/log helpers; tables `cupRaceDebriefs`, `raceUpdateRuns`
- `lib/pit-strategy.ts` — Per-track Cup presets (short/flat/intermediate/superspeedway/road) + stint/fuel math for Pit Strategy Calculator (default: New Hampshire / Dollar Tree 301). Values are editorial estimates, not live telemetry.
- `app/pit-strategy/page.tsx` — Pit Strategy Calculator (client UI in `components/pit-strategy-calculator.tsx`); when `getLiveCupRace()` is green, defaults laps remaining to the live Loudon snapshot and shows `components/pit-strategy-live-board.tsx` (leader, pit log, fuel call) plus `components/berry-vs-optimal.tsx` (Berry stints vs Optimal Stint).
- **Tracks desk** at `/tracks` via `lib/tracks.ts` + `components/tracks-index.tsx` / `track-desk.tsx` / `track-infographic.tsx`; homepage CTA `components/tracks-cta.tsx`. v1 = 2026 Chase venues. Winners must be verified; do not invent. Charlotte 2026 Chase race is the oval (Bank of America 400), not the Roval. Disclaimer: “Fan desk on nascarlove.org. Not affiliated with NASCAR, its teams, or its drivers.”
- `lib/tracks.ts` + `app/tracks/page.tsx` + `app/tracks/[slug]/page.tsx` — 2026 Chase track desks (SVG layout, winners, next date)
- `lib/track-types.ts` + `components/track-types-guide.tsx` + `app/track-types/page.tsx` — Track Types educational guide (NHMS under Flat Miles)
- `lib/iracing-tips.ts` + `components/iracing-tips-guide.tsx` + `app/iracing/page.tsx` — iRacing tips guide (NASCAR ovals) + Cup setup starters per track (bias/pressures/bars/tight-loose); includes Magic Mile flat-mile tip; default setup Loudon
- `components/iracing-cta.tsx` — Homepage teaser to `/iracing`
- `app/page.tsx` — Server component, fetches all 5 series, renders ticker + debrief + standings
- `components/news-ticker.tsx` — Client: red scrolling breaking news bar (pinned above header)
- `components/race-countdown.tsx` — Client: live countdown to next Cup race
- `components/cup-standings.tsx` — Top 10 standings with bars, gold leader highlight
- Strategy desk colors: `--strategy-cyan`, `--strategy-yellow`, `--strategy-panel`
- `components/site-header.tsx` — Dark sticky nav with Race Recap + Standings links
- `components/nascar-hero.tsx` — Hero with speed lines + embedded countdown card
- `components/series-news-grid.tsx` — 2×3 grid (5 series cards) with card-lift hover
- `components/race-schedule.tsx` — NASCAR Cup + IndyCar 2026 schedule side by side
- `components/social-feed.tsx` — Twitter/X embeds + 40+ account directory
- `components/driver-hub-cta.tsx` — CTA banner to /drivers
- `components/site-footer.tsx` — Dark footer with 5-series color stripe

## Testing Preferences
User did not specify — default to speed mode (no tests unless asked).
