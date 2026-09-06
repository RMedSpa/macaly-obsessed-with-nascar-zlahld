# Fully Automatic Weekly Race Updates

## Overview
After every Cup weekend, the site will **refresh itself** — no chat message required. A background job will pull the latest race results, write a full Race Recap (winner hero, pit strategy, stages, top 10, incidents, takeaways, next race), and show it on the homepage. The hand-written Richmond debrief stays as a safe fallback until the first auto-run succeeds.

## What you’ll get
1. **Database + autopilot** — Convex store for the latest Cup race recap and a run log.
2. **Nightly check (America/New_York)** — Looks for a newer finished Cup race than what’s already published.
3. **Source pull** — Public race pages + Cup news headlines (no paid NASCAR API key).
4. **AI debrief writer** — Turns those sources into the same structured recap format you already have (including winner pit strategy when sources support it).
5. **Live homepage** — Race Recap reads the live version first, then falls back to the current static Richmond file if the job hasn’t run or fails.
6. **Honest data labels** — Official pit Loops times are often not free; when missing, the recap marks pit numbers as **editorial / unavailable** instead of inventing bogus precision.
7. **Manual “update now”** — Secure one-click/trigger path so you can force a refresh the morning after a race without waiting for the next cron.

## How the autopilot decides what to do
- Each run asks: “Is there a finished Cup race newer than the one on the site?”
- **Yes** → build debrief → save → homepage updates.
- **No / rain delay / sources empty** → log “skipped” and try again next night.
- **Same race already published** → do nothing (no duplicate rewrites every night).

## What updates automatically
| Piece | Automatic? | Notes |
| --- | --- | --- |
| Cup Race Recap (`/#last-race`) | Yes | Winner, stages, top 10, stats, incidents, takeaways, next race, winner pit strategy when sources allow |
| “Last updated” stamp on recap | Yes | So you can see the autopilot worked |
| Cup / O'Reilly / Trucks standings tables | **Phase 2 (later)** | Harder clean sources; keep current static tables for now |
| Season schedule list | Soft only | Next-race line inside the debrief updates; full static schedule file still needs a human tweak when dates shift |
| iRacing tips | No | Editorial content; not race-result data |

## Honesty rules (built in)
- Prefer **box score facts** for winner, margin, stages, cautions, finish order.
- **Never fake** official Loops pit times — label editorial or omit stop durations when unknown.
- Career/season win counts only when a trusted source states them; otherwise leave conservative.
- Every saved recap stores **source URLs + generation time** in the run log so we can audit bad weeks.

## What we will not do (no-gos)
- Not scrape login walls, paywalled stats dumps, or anything that needs a NASCAR fan-account password.
- Not invent precise pit-stop hundredths when sources don’t list them.
- Not auto-edit iRacing tips, beginner guides, or design/copy unrelated to race results.
- Not remove the static Richmond fallback until autopilot has proven it can publish a good recap.
- Not auto-touch multi-series standings in v1 (that’s a follow-up if you want it).
- Not add a public unsecured “anyone can force refresh” button — trigger stays secret/internal.

## Technical Details
- Provision Convex (`setup-convex-db`), wrap layout with existing `ConvexClientProvider`.
- Schema: `cupRaceDebriefs` (full structured doc + `dateIso`, `raceName`, `generatedAt`, `sources`, `provenance`), `raceUpdateRuns` (status, messages, timestamps).
- Node/default Convex **action** fetches public HTML/RSS; uses `callMacalyJson` → Macaly LLM (`DOCS`/`FAST`) with a strict JSON schema matching `CupRaceDebrief`.
- `convex/crons.ts`: daily evening ET job → internal action `raceUpdates.checkAndRefresh`.
- Internal mutation writes only if `dateIso`/`raceName` is newer than current latest.
- Public query `getLatestCupDebrief` for the UI; optional SSR/client load pattern with static `LATEST_CUP_RACE` fallback (`db-client-loading-pattern` / light client shell).
- Secured HTTP or internal mutation path for manual force run (secret via env; never committed).
- Deploy with `deploy-convex-app` after schema/functions land.
- Seed DB with current Richmond debrief so the site never starts empty after switching to live data.

## Rollout steps
1. Provision database + provider wiring.
2. Add schema, validators, seed of current debrief.
3. Build fetch + LLM structure pipeline + save logic.
4. Wire daily cron + manual force path.
5. Point homepage Race Recap at live data with static fallback + “updated” stamp.
6. Deploy Convex, trigger one manual run to verify end-to-end, keep logs.

## Todos
- [ ] Provision Convex and wire `ConvexClientProvider` in the root layout
- [ ] Create debrief + run-log schema and seed Richmond as the starting live record
- [ ] Build race-result fetcher + AI debrief generator action
- [ ] Add daily cron and secure manual “update now” trigger
- [ ] Connect homepage Race Recap to live data with static fallback
- [ ] Deploy, force one test run, confirm recap/stamp/logs look right
