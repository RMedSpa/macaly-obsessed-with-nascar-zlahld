import { v } from "convex/values";
import { internalAction, action } from "./_generated/server";
import { internal } from "./_generated/api";
import { callMacalyJson } from "./macaly";
import type { SeedDebrief } from "./seedDebrief";
import type { Id } from "./_generated/dataModel";

type StageRow = SeedDebrief["stages"][number];
type IncidentRow = SeedDebrief["incidents"][number];
type WinnerStop = SeedDebrief["winnerPitStrategy"]["stops"][number];
type PitWindow = WinnerStop["window"];

type RefreshResult = {
  ok: boolean;
  status: "success" | "skipped" | "failed";
  message: string;
  raceName?: string;
};

type LatestInternal = {
  _id: Id<"cupRaceDebriefs">;
  raceId?: number;
  raceName: string;
  dateIso: string;
  generatedAt: number;
} | null;

type PublishResult = {
  wrote: boolean;
  reason: string;
  id?: Id<"cupRaceDebriefs">;
};

/** Minimal action ctx surface — avoids circular ActionCtx inference. */
type RunnerCtx = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  runQuery: (ref: any, args: any) => Promise<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  runMutation: (ref: any, args: any) => Promise<any>;
};

/**
 * Autopilot: pulls NASCAR live-feed (post-race flag_state=9), builds a structured
 * debrief, polishes narrative via Macaly LLM, and publishes only when newer.
 */

const LIVE_FEED_URL = "https://cf.nascar.com/live/feeds/live-feed.json";
const NEWS_RSS_URL =
  "https://news.google.com/rss/search?q=NASCAR+Cup+Series+race+results+OR+winner&hl=en-US&gl=US&ceid=US:en";

/** Soft next-race calendar (MDT-facing). Update when the full schedule shifts. */
const UPCOMING_CUP: Array<{
  name: string;
  track: string;
  when: string;
  dateIso: string;
}> = [
  {
    name: "Dollar Tree 301",
    track: "New Hampshire Motor Speedway",
    when: "Sun Aug 23 · 1:00 PM MDT · USA / HBO Max",
    dateIso: "2026-08-23",
  },
  {
    name: "Coke Zero Sugar 400",
    track: "Daytona International Speedway",
    when: "Sat Aug 29 · 5:30 PM MDT · NBC",
    dateIso: "2026-08-29",
  },
];

/** Common Cup car → team lookup (best-effort; LLM may override). */
const TEAM_BY_CAR: Record<string, string> = {
  "1": "Trackhouse Racing",
  "2": "Team Penske",
  "3": "Richard Childress Racing",
  "4": "Front Row Motorsports",
  "5": "Hendrick Motorsports",
  "6": "RFK Racing",
  "7": "Spire Motorsports",
  "8": "Richard Childress Racing",
  "9": "Hendrick Motorsports",
  "10": "RFK Racing",
  "11": "Joe Gibbs Racing",
  "12": "Team Penske",
  "14": "Haas Factory Team",
  "16": "Kaulig Racing",
  "17": "RFK Racing",
  "19": "Joe Gibbs Racing",
  "20": "Joe Gibbs Racing",
  "21": "Wood Brothers Racing",
  "22": "Team Penske",
  "23": "23XI Racing",
  "24": "Hendrick Motorsports",
  "34": "Front Row Motorsports",
  "38": "Front Row Motorsports",
  "41": "Haas Factory Team",
  "42": "Legacy Motor Club",
  "43": "Legacy Motor Club",
  "45": "23XI Racing",
  "47": "HYAK Motorsports",
  "48": "Hendrick Motorsports",
  "54": "Joe Gibbs Racing",
  "60": "RFK Racing",
  "71": "Spire Motorsports",
  "77": "Spire Motorsports",
  "99": "Trackhouse Racing",
};

const MFR: Record<string, string> = {
  Frd: "Ford",
  Ford: "Ford",
  Chv: "Chevrolet",
  Chevy: "Chevrolet",
  Chevrolet: "Chevrolet",
  Tyt: "Toyota",
  Toyota: "Toyota",
};

type LiveVehicle = {
  vehicle_number: string;
  running_position: number;
  starting_position: number;
  delta: number;
  status: number;
  laps_completed: number;
  vehicle_manufacturer?: string;
  manufacturer?: string;
  sponsor_name?: string;
  best_lap_time?: number;
  best_lap_speed?: number;
  average_speed?: number;
  driver?: { full_name?: string; first_name?: string; last_name?: string };
  laps_led?: Array<{ start_lap: number; end_lap: number }> | number;
  pit_stops?: Array<{
    positions_gained_lossed: number;
    pit_in_elapsed_time: number;
    pit_in_lap_count: number;
    pit_in_leader_lap: number;
    pit_out_elapsed_time: number;
    pit_in_rank: number;
    pit_out_rank: number;
  }>;
};

type LiveFeed = {
  race_id: number;
  run_name: string;
  track_name: string;
  track_length: number;
  laps_in_race: number;
  lap_number: number;
  laps_to_go: number;
  flag_state: number;
  series_id: number;
  number_of_caution_laps: number;
  number_of_caution_segments: number;
  number_of_lead_changes: number;
  number_of_leaders: number;
  time_of_day_os?: string;
  stage?: { stage_num?: number; finish_at_lap?: number; laps_in_stage?: number };
  vehicles: LiveVehicle[];
};

type WeekendStageDriver = {
  driver_fullname?: string;
  car_number?: string;
  finishing_position?: number;
  stage_points?: number;
};

type WeekendRace = {
  race_id?: number;
  race_season?: number;
  race_name?: string;
  track_name?: string;
  race_date?: string;
  television_broadcaster?: string;
  margin_of_victory?: string | number;
  average_speed?: number;
  pole_winner_driver_id?: number;
  pole_winner_speed?: number;
  number_of_cautions?: number;
  number_of_caution_laps?: number;
  number_of_lead_changes?: number;
  number_of_leaders?: number;
  stage_1_laps?: number;
  stage_2_laps?: number;
  stage_3_laps?: number;
  race_comments?: string;
  stage_results?: Array<{
    stage_number: number;
    results?: WeekendStageDriver[];
  }>;
  caution_segments?: Array<{
    start_lap?: number;
    end_lap?: number;
    reason?: string;
    comment?: string;
    beneficiary_car_number?: string;
  }>;
  results?: Array<{
    finishing_position?: number;
    starting_position?: number;
    car_number?: string;
    driver_fullname?: string;
    driver_id?: number;
    team_name?: string;
    car_make?: string;
    laps_led?: number;
    finishing_status?: string;
    diff_time?: number | string;
  }>;
  infractions?: Array<{
    car_number?: string;
    driver_name?: string;
    lap?: number;
    description?: string;
    penalty?: string;
  }>;
};

type WeekendFeed = {
  weekend_race?: WeekendRace[];
};

type PitCycle = {
  lap: number;
  durationSec: number;
  posIn: number;
  posOut: number;
  gained: number;
};

function sumLapsLed(raw: LiveVehicle["laps_led"]): number {
  if (raw == null) return 0;
  if (typeof raw === "number") return raw;
  return raw.reduce((acc, s) => {
    const end = s.end_lap ?? s.start_lap;
    return acc + Math.max(0, end - s.start_lap + 1);
  }, 0);
}

function realPitCycles(v: LiveVehicle): PitCycle[] {
  const stops = v.pit_stops ?? [];
  const out: PitCycle[] = [];
  for (const p of stops) {
    const tin = p.pit_in_elapsed_time ?? 0;
    const tout = p.pit_out_elapsed_time ?? 0;
    if (tin <= 0 || tout <= 0) continue;
    const durationSec = Math.round((tout - tin) * 1000) / 1000;
    if (durationSec < 5 || durationSec > 120) continue;
    // Ignore zero-lap placeholders and post-checkered box visits on last lap
    if (p.pit_in_lap_count <= 0) continue;
    out.push({
      lap: p.pit_in_lap_count,
      durationSec,
      posIn: p.pit_in_rank,
      posOut: p.pit_out_rank,
      gained: p.positions_gained_lossed,
    });
  }
  // Drop last-lap celebration/service stop if present (lap == race end)
  return out;
}

function manufacturerLabel(code?: string): string {
  if (!code) return "—";
  return MFR[code] ?? code;
}

function statusLabel(code: number, laps: number, raceLaps: number): string {
  if (code === 1 || laps >= raceLaps) return "Running";
  if (code === 2) return "Accident";
  if (code === 3) return "Engine";
  if (code === 4) return "Garage";
  return "Out";
}

function formatGap(delta: number, pos: number): string {
  if (pos === 1) return "—";
  if (!Number.isFinite(delta)) return "—";
  // Large deltas often mean laps down in some feeds; live feed used seconds for top 10.
  if (delta > 0 && delta < 500) return delta.toFixed(3).replace(/\.?0+$/, "") === delta.toFixed(0)
    ? String(delta)
    : (Math.round(delta * 1000) / 1000).toString();
  return String(delta);
}

function guessDateIso(feed: LiveFeed): string {
  // Prefer race-day evening: if OS timestamp is early morning after a night race, back up 1 day.
  const os = feed.time_of_day_os;
  if (os) {
    const d = new Date(os);
    if (!Number.isNaN(d.getTime())) {
      const hour = d.getHours(); // local env may be UTC in Convex
      // Use calendar date in America/New_York
      const ny = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/New_York",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(d); // YYYY-MM-DD
      // Night races often finish after midnight ET — if hour ET < 6, use previous calendar day.
      const hourEt = Number(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "numeric",
          hour12: false,
        }).format(d),
      );
      if (hourEt < 6) {
        const prev = new Date(d.getTime() - 6 * 3600 * 1000);
        return new Intl.DateTimeFormat("en-CA", {
          timeZone: "America/New_York",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(prev);
      }
      return ny;
      void hour;
    }
  }
  return new Date().toISOString().slice(0, 10);
}

function formatDateLabel(dateIso: string): string {
  const [y, m, d] = dateIso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 18, 0, 0));
  const weekday = new Intl.DateTimeFormat("en-US", {
    weekday: "short",
    timeZone: "UTC",
  }).format(dt);
  const rest = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(dt);
  return `${weekday} · ${rest}`;
}

function pickNextRace(afterIso: string) {
  const next = UPCOMING_CUP.find((r) => r.dateIso > afterIso);
  if (next) return { name: next.name, track: next.track, when: next.when };
  return {
    name: "Next Cup race",
    track: "TBD",
    when: "Check schedule",
  };
}

function stripHtml(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "ObsessedWithNascarBot/1.0 (+https://nascarobsessed.macaly.app)",
      Accept: "application/json, application/rss+xml, text/xml, */*",
    },
  });
  if (!res.ok) throw new Error(`Fetch failed ${res.status} for ${url}`);
  return await res.text();
}

function parseRssHeadlines(xml: string, limit = 12): string[] {
  const items: string[] = [];
  const re = /<item>([\s\S]*?)<\/item>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) && items.length < limit) {
    const block = m[1];
    const title = block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "";
    const clean = stripHtml(title);
    if (clean) items.push(clean);
  }
  return items;
}

function weekendFeedUrl(seriesId: number, raceId: number, season: number): string {
  return `https://cf.nascar.com/cacher/${season}/${seriesId}/${raceId}/weekend-feed.json`;
}

function isoFromRaceDate(raceDate?: string): string | null {
  if (!raceDate) return null;
  // "2026-08-15T19:00:00" → date in America/New_York race night
  const m = raceDate.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : null;
}

function parseCareerWin(comments?: string): number {
  if (!comments) return 0;
  const patterns = [
    /(\d+)(?:st|nd|rd|th)\s+career(?:\s+NASCAR)?(?:\s+Cup(?:\s+Series)?)?\s+(?:win|victory)/i,
    /career(?:\s+NASCAR)?(?:\s+Cup(?:\s+Series)?)?\s+(?:win|victory)[^\d]{0,24}(\d+)/i,
    /(\d+)(?:st|nd|rd|th)\s+Cup(?:\s+Series)?\s+(?:win|victory)/i,
  ];
  for (const re of patterns) {
    const m = comments.match(re);
    if (!m) continue;
    const n = Number(m[1]);
    if (Number.isFinite(n) && n > 0 && n < 300) return n;
  }
  return 0;
}

function guessSeasonYear(feed: LiveFeed, dateIso: string): number {
  const fromDate = Number(dateIso.slice(0, 4));
  if (fromDate >= 2000 && fromDate <= 2100) return fromDate;
  const fromClock = feed.time_of_day_os?.match(/(20\d{2})/)?.[1];
  if (fromClock) return Number(fromClock);
  return new Date().getUTCFullYear();
}

async function fetchWeekendRace(
  feed: LiveFeed,
  dateIsoHint?: string,
): Promise<WeekendRace | null> {
  const raceId = feed.race_id;
  if (!raceId) return null;
  const seriesId = feed.series_id || 1;
  const baseYear = guessSeasonYear(feed, dateIsoHint ?? guessDateIso(feed));
  const years = [baseYear, baseYear - 1, baseYear + 1];
  for (const year of years) {
    const url = weekendFeedUrl(seriesId, raceId, year);
    try {
      const text = await fetchText(url);
      const parsed = JSON.parse(text) as WeekendFeed;
      const weekend = parsed.weekend_race?.[0] ?? null;
      if (weekend) {
        console.log("Weekend feed OK", url, weekend.race_name);
        return weekend;
      }
    } catch (err) {
      console.log("Weekend feed miss", url, String(err));
    }
  }
  return null;
}

function stageRowsFromWeekend(
  weekend: WeekendRace | null | undefined,
  raceWinner: string,
  raceRunnerUp?: string,
): StageRow[] {
  const empty = (n: 1 | 2 | 3, winner = "—", runnerUp?: string, note?: string): StageRow => ({
    stage: n,
    winner,
    ...(runnerUp ? { runnerUp } : {}),
    ...(note ? { note } : {}),
  });

  const byStage = new Map<number, WeekendStageDriver[]>();
  for (const s of weekend?.stage_results ?? []) {
    byStage.set(s.stage_number, s.results ?? []);
  }

  const pick = (n: 1 | 2): StageRow => {
    const rows = [...(byStage.get(n) ?? [])].sort(
      (a, b) => (a.finishing_position ?? 99) - (b.finishing_position ?? 99),
    );
    const w = rows[0]?.driver_fullname?.trim() || "—";
    const r = rows[1]?.driver_fullname?.trim();
    const note =
      w !== "—"
        ? `Stage ${n} points leader · #${rows[0]?.car_number ?? "—"}`
        : "Stage winner unavailable in weekend feed";
    return empty(n, w, r, note);
  };

  return [
    pick(1),
    pick(2),
    empty(3, raceWinner, raceRunnerUp, "Race winner · Stage 3"),
  ];
}

function shortTitle(text: string, max = 48): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean || "Race note";
  const cut = clean.slice(0, max - 1);
  const sp = cut.lastIndexOf(" ");
  return `${(sp > 20 ? cut.slice(0, sp) : cut).trim()}…`;
}

function incidentsFromWeekend(weekend: WeekendRace | null | undefined): IncidentRow[] {
  if (!weekend) return [];
  const out: IncidentRow[] = [];

  for (const inf of weekend.infractions ?? []) {
    const driver = inf.driver_name?.trim() || `Car #${inf.car_number ?? "—"}`;
    const detail =
      [inf.penalty, inf.description].filter(Boolean).join(" — ") || "Infraction";
    const title = shortTitle(inf.penalty || inf.description || "Infraction");
    out.push({
      bin: "penalty",
      ...(inf.lap != null && inf.lap > 0 ? { lap: inf.lap } : {}),
      driver,
      car: String(inf.car_number ?? "—"),
      title,
      detail,
    });
  }

  for (const c of weekend.caution_segments ?? []) {
    const reason = (c.reason || "").toLowerCase();
    const comment = c.comment || "";
    // Stage-break competition cautions aren't "incidents"
    if (reason === "competition" && /stage/i.test(comment)) continue;
    if (!reason && !comment) continue;

    let bin: IncidentRow["bin"] = "wreck";
    if (
      /penalt|speed|commitment|pitting|too many|pass(ing)?/i.test(
        `${reason} ${comment}`,
      )
    ) {
      bin = "penalty";
    } else if (
      /debris|fluid|oil|mechanical|engine|garage/i.test(`${reason} ${comment}`)
    ) {
      bin = "mechanical";
    } else if (/pit/i.test(`${reason} ${comment}`)) {
      bin = "pit";
    }

    const carMatch = comment.match(/No\.\s*(\d+[A-Za-z]?)/i);
    const car = carMatch?.[1] ?? c.beneficiary_car_number ?? "—";
    const start = c.start_lap ?? 0;
    const end = c.end_lap ?? start;
    const detail = [c.reason, comment].filter(Boolean).join(" · ") || "Caution";
    const title = shortTitle(
      c.reason?.trim() ||
        comment ||
        (end > start ? `Caution Laps ${start}–${end}` : `Caution Lap ${start}`),
    );
    out.push({
      bin,
      ...(start > 0 ? { lap: start } : {}),
      driver: car !== "—" ? `Car #${car}` : reason || "Field",
      car: String(car),
      title,
      detail,
    });
  }

  // Drop-to-rear / pre-race penalties often only appear in race_comments
  const comments = weekend.race_comments ?? "";
  if (/dropped to the rear/i.test(comments)) {
    const cars = [...comments.matchAll(/No\.\s*(\d+[A-Za-z]?)\s*\(([^)]+)\)/gi)];
    for (const m of cars) {
      const car = m[1];
      const reason = m[2].trim();
      // Prefer driver name from results when available
      const driverHit = weekend.results?.find(
        (r) => String(r.car_number) === String(car),
      );
      out.push({
        bin: "penalty",
        driver: driverHit?.driver_fullname?.trim() || `Car #${car}`,
        car: String(car),
        title: "Drop to rear · pre-race",
        detail: `Dropped to rear of the field — ${reason}.`,
      });
    }
  }

  // Stable order by lap, cap length
  return out
    .sort((a, b) => (a.lap ?? 0) - (b.lap ?? 0))
    .slice(0, 12);
}

function teamFromWeekend(
  car: string,
  weekend: WeekendRace | null | undefined,
): string | undefined {
  const hit = weekend?.results?.find((r) => String(r.car_number) === String(car));
  return hit?.team_name?.trim() || undefined;
}

function buildSkeleton(feed: LiveFeed, weekend?: WeekendRace | null) {
  const raceLaps = feed.laps_in_race || 0;
  const miles = Math.round(raceLaps * (feed.track_length || 0) * 10) / 10;
  const dateIso = isoFromRaceDate(weekend?.race_date) ?? guessDateIso(feed);
  const vehicles = [...(feed.vehicles || [])].sort(
    (a, b) => a.running_position - b.running_position,
  );
  const winnerV = vehicles[0];
  if (!winnerV) throw new Error("Live feed has no vehicles");

  const winnerName = winnerV.driver?.full_name ?? "Unknown";
  const winnerCar = String(winnerV.vehicle_number);
  const winnerLapsLed = sumLapsLed(winnerV.laps_led);
  const gapToP2 =
    vehicles[1] && typeof vehicles[1].delta === "number"
      ? `${Number(vehicles[1].delta).toFixed(3).replace(/0+$/, "").replace(/\.$/, "")} sec`
      : "—";

  // Most laps led
  let mostDriver = winnerName;
  let mostCount = winnerLapsLed;
  for (const v of vehicles) {
    const led = sumLapsLed(v.laps_led);
    if (led > mostCount) {
      mostCount = led;
      mostDriver = v.driver?.full_name ?? mostDriver;
    }
  }

  // Fastest lap by best_lap_speed
  let fastName = "—";
  let fastTime = "";
  let bestSpeed = 0;
  for (const v of vehicles) {
    const sp = v.best_lap_speed ?? 0;
    if (sp > bestSpeed) {
      bestSpeed = sp;
      fastName = v.driver?.full_name ?? "—";
      fastTime =
        v.best_lap_time != null
          ? `${v.best_lap_time.toFixed(3)} · ${v.driver?.full_name ?? ""}`.trim()
          : v.driver?.full_name ?? "—";
    }
  }

  // Winner avg race speed → stats.avgSpeed
  const avgSpeed =
    winnerV.average_speed != null
      ? `${winnerV.average_speed.toFixed(3)} mph`
      : "—";

  const finishers = vehicles.slice(0, 10).map((v) => {
    const led = sumLapsLed(v.laps_led);
    const car = String(v.vehicle_number);
    return {
      pos: v.running_position,
      car,
      driver: v.driver?.full_name ?? "Unknown",
      team:
        teamFromWeekend(car, weekend) ??
        TEAM_BY_CAR[car] ??
        "—",
      start: v.starting_position ?? 0,
      status: statusLabel(v.status, v.laps_completed ?? 0, raceLaps),
      gap: formatGap(v.delta ?? 0, v.running_position),
      ...(led > 0 ? { lapsLed: led } : {}),
    };
  });

  // Pit scoreboard: pit-road stall (in→out) from live timing — NOT Loops box times.
  // Always keep the race winner on the board even when their average sits outside top 8.
  const allPitRows = vehicles
    .map((v) => {
      const cycles = realPitCycles(v).filter(
        // Drop end-of-race service if lap is race distance
        (c) => c.lap < raceLaps - 1,
      );
      if (cycles.length === 0) return null;
      const avg =
        cycles.reduce((a, c) => a + c.durationSec, 0) / cycles.length;
      const best = Math.min(...cycles.map((c) => c.durationSec));
      return {
        driver: v.driver?.full_name ?? "Unknown",
        car: String(v.vehicle_number),
        avgStop: Math.round(avg * 100) / 100,
        bestStop: Math.round(best * 100) / 100,
        stops: cycles.length,
        isWinner: v.running_position === 1 ? true : undefined,
        note: undefined as string | undefined,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r != null)
    .sort((a, b) => a.avgStop - b.avgStop);

  let pitRows = allPitRows.slice(0, 8);
  if (!pitRows.some((r) => r.isWinner)) {
    const winnerPit = allPitRows.find((r) => r.isWinner);
    if (winnerPit) {
      pitRows = [...pitRows.slice(0, 7), winnerPit].sort(
        (a, b) => a.avgStop - b.avgStop,
      );
    }
  }

  // Winner pit strategy from real cycles
  const wCycles = realPitCycles(winnerV).filter((c) => c.lap < raceLaps - 1);
  const stageBreakLaps = inferStageBreaks(feed, weekend);
  const cautionLaps = new Set<number>();
  const stageCautionLaps = new Set<number>();
  for (const c of weekend?.caution_segments ?? []) {
    const start = c.start_lap ?? 0;
    const end = c.end_lap ?? start;
    const isStageBreak =
      /competition/i.test(c.reason || "") && /stage/i.test(c.comment || "");
    for (let lap = start; lap <= end; lap++) {
      cautionLaps.add(lap);
      if (isStageBreak) stageCautionLaps.add(lap);
    }
    // Also pin stage breaks near start of competition cautions
    if (isStageBreak && start > 0) stageBreakLaps.add(start);
  }
  const wAvg =
    wCycles.length > 0
      ? wCycles.reduce((a, c) => a + c.durationSec, 0) / wCycles.length
      : 0;
  const wBest =
    wCycles.length > 0 ? Math.min(...wCycles.map((c) => c.durationSec)) : 0;

  // Decisive stop: last competitive stop
    
  let decisiveLap: number | null = null;
  if (wCycles.length > 0) {
    decisiveLap = wCycles[wCycles.length - 1].lap;
  }

  const stops = wCycles.map((c) => {
    let window: PitWindow = "green";
    if (
      stageBreakLaps.has(c.lap) ||
      stageBreakLaps.has(c.lap - 1) ||
      stageBreakLaps.has(c.lap + 1) ||
      stageCautionLaps.has(c.lap) ||
      stageCautionLaps.has(c.lap + 1)
    ) {
      window = "stage-break";
    } else if (cautionLaps.has(c.lap) || cautionLaps.has(c.lap + 1)) {
      window = "caution";
    }
    return {
      lap: c.lap,
      window,
      service: "Tires + fuel (live timing)",
      durationSec: Math.round(c.durationSec * 100) / 100,
      posIn: `P${c.posIn}`,
      posOut: `P${c.posOut}`,
      note:
        c.gained > 0
          ? `Gained ${c.gained} spot(s) on pit road (in→out ranks).`
          : c.gained < 0
            ? `Lost ${Math.abs(c.gained)} spot(s) on pit road (in→out ranks).`
            : "Held position through the box.",
      decisive: decisiveLap != null && c.lap === decisiveLap ? true : undefined,
    };
  });

  const distance =
    miles > 0
      ? `${raceLaps} laps · ${miles} miles`
      : `${raceLaps} laps`;

  const nextRace = pickNextRace(dateIso);

  // Pole: weekend pole id → driver, else #1 starter
  let pole = "—";
  let poleTime = "—";
  if (weekend?.pole_winner_driver_id != null) {
    const poleRes = weekend.results?.find(
      (r) => r.driver_id === weekend.pole_winner_driver_id,
    );
    pole = poleRes?.driver_fullname ?? pole;
    if (weekend.pole_winner_speed != null && weekend.pole_winner_speed > 0) {
      poleTime = `${weekend.pole_winner_speed.toFixed(3)} mph`;
    }
  }
  if (pole === "—") {
    const poleCar = [...vehicles].sort(
      (a, b) => (a.starting_position ?? 99) - (b.starting_position ?? 99),
    )[0];
    pole = poleCar?.driver?.full_name ?? "—";
  }

  const marginFromWeekend =
    weekend?.margin_of_victory != null && String(weekend.margin_of_victory).trim()
      ? `${String(weekend.margin_of_victory).replace(/^0+/, "0").replace(/^\./, "0.")} sec`
      : null;
  const effectiveMargin = marginFromWeekend ?? gapToP2;

  const avgSpeedOfficial =
    weekend?.average_speed != null && weekend.average_speed > 0
      ? `${weekend.average_speed.toFixed(3)} mph`
      : avgSpeed;

  const leadChanges =
    weekend?.number_of_lead_changes ?? feed.number_of_lead_changes ?? 0;
  const leaders = weekend?.number_of_leaders ?? feed.number_of_leaders ?? 0;
  const cautions =
    weekend?.number_of_cautions ?? feed.number_of_caution_segments ?? 0;
  const cautionLapsCount =
    weekend?.number_of_caution_laps ?? feed.number_of_caution_laps ?? 0;

  const winnerTeam =
    teamFromWeekend(winnerCar, weekend) ??
    TEAM_BY_CAR[winnerCar] ??
    "—";
  const winnerMfrFromWeekend = weekend?.results?.find(
    (r) => String(r.car_number) === winnerCar,
  )?.car_make;
  const careerWin = parseCareerWin(weekend?.race_comments);
  const stages = stageRowsFromWeekend(
    weekend,
    winnerName,
    vehicles[1]?.driver?.full_name,
  );
  const incidents = incidentsFromWeekend(weekend);
  const tv =
    weekend?.television_broadcaster?.trim() ||
    "—";
  const trackName = weekend?.track_name || feed.track_name || "—";
  const raceName = weekend?.race_name || feed.run_name || "Cup Race";
  const sources = [LIVE_FEED_URL];
  if (weekend?.race_id && weekend?.race_season) {
    sources.push(
      weekendFeedUrl(feed.series_id || 1, weekend.race_id, weekend.race_season),
    );
  }

  return {
    raceId: feed.race_id,
    sources,
    debrief: {
      raceName,
      eventLabel: "NASCAR Cup Series",
      track: trackName,
      dateLabel: formatDateLabel(dateIso),
      dateIso,
      tv,
      distance,
      winner: {
        driver: winnerName,
        car: winnerCar,
        team: winnerTeam,
        manufacturer: manufacturerLabel(
          winnerMfrFromWeekend ??
            winnerV.vehicle_manufacturer ??
            winnerV.manufacturer,
        ),
        start: winnerV.starting_position ?? 0,
        lapsLed: winnerLapsLed,
        margin: effectiveMargin,
        careerWin,
        seasonWin: 0,
        headline: `${winnerName} wins at ${trackName}`,
        blurb: `${winnerName} started ${winnerV.starting_position}, led ${winnerLapsLed} laps, and beat the field by ${effectiveMargin}.`,
      },
      winnerPitStrategy: {
        label: "Live-timing pit road cycles",
        summary: `${winnerName} logged ${wCycles.length} timed pit-road visits. Durations are in-to-out stall times from the NASCAR live feed (not official Loops over-the-wall times).`,
        totalStops: wCycles.length,
        avgStopSec: Math.round(wAvg * 100) / 100,
        bestStopSec: Math.round(wBest * 100) / 100,
        stops,
        keysToWin: [
          "Check final green-flag cycle ranks in the winner pit chart.",
          "Track position carried off the last competitive stop.",
        ],
        note:
          "Stop durations = pit-in elapsed → pit-out elapsed from NASCAR live timing (full stall). Over-the-wall Loops times are not free in this feed.",
      },
      stages,
      stats: {
        leadChanges,
        leaders,
        cautions,
        cautionLaps: cautionLapsCount,
        avgSpeed: avgSpeedOfficial,
        pole,
        poleTime,
        mostLapsLed: mostDriver,
        mostLapsLedCount: mostCount,
        fastestLap: fastTime || fastName,
      },
      finishers,
      pitScoreboard: pitRows,
      pitNote:
        "Pit averages are pit-road stall times (in→out elapsed) from NASCAR live timing — not official NASCAR Loops over-the-wall service times.",
      incidents,
      takeaways: [
        `${winnerName} took the win at ${trackName}.`,
        `Cautions: ${cautions} for ${cautionLapsCount} laps · ${leadChanges} lead changes.`,
        stages[0]?.winner && stages[0].winner !== "—"
          ? `Stage 1: ${stages[0].winner}${stages[1]?.winner && stages[1].winner !== "—" ? ` · Stage 2: ${stages[1].winner}` : ""}.`
          : `${pole} sat on pole.`,
      ],
      nextRace,
    } satisfies SeedDebrief as SeedDebrief,
  };
}

function inferStageBreaks(
  feed: LiveFeed,
  weekend?: WeekendRace | null,
): Set<number> {
  const set = new Set<number>();
  const s1 = weekend?.stage_1_laps;
  const s2 = weekend?.stage_2_laps;
  if (s1 && s1 > 0) set.add(s1);
  if (s1 && s2 && s2 > 0) set.add(s1 + s2);

  const total = feed.laps_in_race || 0;
  // Fallback rough split when weekend laps missing
  if (set.size === 0 && total >= 200) {
    if (feed.stage?.laps_in_stage && feed.stage.finish_at_lap) {
      const stage3 = feed.stage.laps_in_stage;
      const s2break = total - stage3;
      set.add(s2break);
      set.add(Math.round(s2break / 2));
    } else {
      set.add(Math.round(total * 0.25));
      set.add(Math.round(total * 0.5));
    }
  }
  return set;
}

async function polishWithLlm(
  skeleton: ReturnType<typeof buildSkeleton>,
  headlines: string[],
): Promise<{ debrief: SeedDebrief; usedAi: boolean }> {
  const system = `You are the Race Desk editor for Obsessed with NASCAR.
Return ONLY valid JSON (no markdown) matching the provided debrief object shape.
Rules:
- KEEP all numeric finish-order facts, gaps, stats (lead changes, cautions, laps led), pit durations, stage winners already filled, and driver/car numbers from the base object UNLESS a headline clearly corrects a label.
- Prefer polishing narrative: headline, blurb, takeaways (3-5 punchy bullets), winnerPitStrategy.label/summary/keysToWin notes, eventLabel (e.g. "Cup Series Race N of 36" only if known).
- Stage 1/2 winners may already come from NASCAR weekend-feed — do NOT blank them to "—". Only fill missing stages when headlines confirm.
- Incidents may already list official cautions/infractions — you may rephrase titles/details, not delete real cautions. Add clear headline-backed items only.
- You MAY set winner.team if still "—", tv if still "—", winner.careerWin/seasonWin only if confidently known else leave existing numbers.
- Never invent precise Loops over-the-wall pit times. Pit durations in the object are pit-road stall times already.
- incidents.bin must be one of: wreck | penalty | pit | mechanical. Each incident needs title + detail + driver.
- stages array length 3 with stage:1|2|3.
- finishers stay length ≤ 10; do not reorder facts against base.
- nextRace: keep unless obviously wrong.
- Tone: sharp, short-track-desk energy, no emoji.`;

  const user = {
    instruction: "Polish this Cup race debrief JSON for homepage publication.",
    baseDebrief: skeleton.debrief,
    raceId: skeleton.raceId,
    headlines,
  };

  try {
    const result = await callMacalyJson("/api/client-app/llm-usage", {
      preset: "DOCS",
      temperature: 0.2,
      maxTokens: 8000,
      messages: [
        { role: "system", content: system },
        {
          role: "user",
          content:
            "Return the full polished debrief object as JSON only.\n\n" +
            JSON.stringify(user),
        },
      ],
    });

    const text = typeof result.text === "string" ? result.text : "";
    if (!text) {
      console.log("LLM returned empty text", result);
      return { debrief: skeleton.debrief, usedAi: false };
    }

    const parsed = extractJsonObject(text);
    if (!parsed || typeof parsed !== "object") {
      console.log("LLM JSON parse failed, using skeleton");
      return { debrief: skeleton.debrief, usedAi: false };
    }

    // Merge: start from skeleton, overlay safe narrative fields
    const merged = mergeDebrief(skeleton.debrief, parsed as Record<string, unknown>);
    return { debrief: merged, usedAi: true };
  } catch (err) {
    console.log("polishWithLlm failed", err);
    return { debrief: skeleton.debrief, usedAi: false };
  }
}

function extractJsonObject(text: string): unknown {
  let t = text.trim();
  // strip ```json fences
  if (t.startsWith("```")) {
    t = t.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
  }
  try {
    return JSON.parse(t);
  } catch {
    const start = t.indexOf("{");
    const end = t.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(t.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function asString(v: unknown, fallback: string): string {
  return typeof v === "string" && v.trim() ? v : fallback;
}
function asNumber(v: unknown, fallback: number): number {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function isPitWindow(v: unknown): v is PitWindow {
  return v === "green" || v === "caution" || v === "stage-break";
}

function mergeDebrief(
  base: SeedDebrief,
  patch: Record<string, unknown>,
): SeedDebrief {
  const w = (patch.winner ?? {}) as Record<string, unknown>;
  const baseW = base.winner;
  const winner: SeedDebrief["winner"] = {
    ...baseW,
    team: asString(w.team, baseW.team),
    manufacturer: asString(w.manufacturer, baseW.manufacturer),
    headline: asString(w.headline, baseW.headline),
    blurb: asString(w.blurb, baseW.blurb),
    careerWin: asNumber(w.careerWin, baseW.careerWin),
    seasonWin: asNumber(w.seasonWin, baseW.seasonWin),
    driver: baseW.driver,
    car: baseW.car,
    start: baseW.start,
    lapsLed: baseW.lapsLed,
    margin: baseW.margin,
  };

  const wpsPatch = (patch.winnerPitStrategy ?? {}) as Record<string, unknown>;
  const stops: WinnerStop[] = base.winnerPitStrategy.stops.map((s, i) => {
    const list = Array.isArray(wpsPatch.stops) ? wpsPatch.stops : null;
    const ps =
      list && list[i] && typeof list[i] === "object"
        ? (list[i] as Record<string, unknown>)
        : null;
    if (!ps) return s;
    const window: PitWindow = isPitWindow(ps.window) ? ps.window : s.window;
    return {
      lap: s.lap,
      window,
      service: asString(ps.service, s.service),
      durationSec: s.durationSec,
      posIn: s.posIn,
      posOut: s.posOut,
      note: asString(ps.note, s.note),
      decisive: s.decisive,
    };
  });

  const winnerPitStrategy: SeedDebrief["winnerPitStrategy"] = {
    label: asString(wpsPatch.label, base.winnerPitStrategy.label),
    summary: asString(wpsPatch.summary, base.winnerPitStrategy.summary),
    keysToWin: Array.isArray(wpsPatch.keysToWin)
      ? (wpsPatch.keysToWin.filter((x) => typeof x === "string") as string[]).slice(
          0,
          6,
        )
      : base.winnerPitStrategy.keysToWin,
    note: asString(wpsPatch.note, base.winnerPitStrategy.note),
    totalStops: base.winnerPitStrategy.totalStops,
    avgStopSec: base.winnerPitStrategy.avgStopSec,
    bestStopSec: base.winnerPitStrategy.bestStopSec,
    stops,
  };

  let stages: StageRow[] = base.stages;
  if (Array.isArray(patch.stages) && patch.stages.length >= 3) {
    const stageList = patch.stages as unknown[];
    stages = ([1, 2, 3] as const).map((n, idx) => {
      const raw = stageList[idx];
      const p =
        raw && typeof raw === "object"
          ? (raw as Record<string, unknown>)
          : {};
      const b = base.stages[idx] ?? { stage: n, winner: "—" };
      // Never let AI blank a known stage winner
      const patchWinner =
        typeof p.winner === "string" && p.winner.trim() && p.winner !== "—"
          ? p.winner
          : null;
      const winner =
        b.winner && b.winner !== "—"
          ? b.winner
          : (patchWinner ?? b.winner ?? "—");
      const runnerUp =
        b.runnerUp ||
        (typeof p.runnerUp === "string" && p.runnerUp.trim()
          ? p.runnerUp
          : undefined);
      const note =
        typeof p.note === "string" && p.note.trim()
          ? p.note
          : b.note;
      const row: StageRow = {
        stage: n,
        winner,
        ...(runnerUp ? { runnerUp } : {}),
        ...(note ? { note } : {}),
      };
      return row;
    });
  }

  const takeaways = Array.isArray(patch.takeaways)
    ? (patch.takeaways.filter((x) => typeof x === "string") as string[]).slice(0, 6)
    : base.takeaways;

  let incidents: IncidentRow[] = base.incidents;
  if (Array.isArray(patch.incidents)) {
    const cleaned: IncidentRow[] = [];
    for (const raw of patch.incidents) {
      if (!raw || typeof raw !== "object") continue;
      const r = raw as Record<string, unknown>;
      const bin = r.bin;
      if (
        bin !== "wreck" &&
        bin !== "penalty" &&
        bin !== "pit" &&
        bin !== "mechanical"
      ) {
        continue;
      }
      const driver = asString(r.driver, "");
      const title = asString(r.title, "");
      const detail = asString(r.detail, "");
      if (!driver || !title || !detail) continue;
      const item: IncidentRow = {
        bin,
        driver,
        title,
        detail,
        ...(typeof r.lap === "number" ? { lap: r.lap } : {}),
        ...(typeof r.car === "string" ? { car: r.car } : {}),
      };
      cleaned.push(item);
      if (cleaned.length >= 10) break;
    }
    // Prefer AI rewrite when it produced valid rows; otherwise keep base feed list
    if (cleaned.length > 0) incidents = cleaned;
  }

  const nextPatch = (patch.nextRace ?? {}) as Record<string, unknown>;
  const nextRace = {
    name: asString(nextPatch.name, base.nextRace.name),
    track: asString(nextPatch.track, base.nextRace.track),
    when: asString(nextPatch.when, base.nextRace.when),
  };

  // stage-3 must stay race winner if AI blanked it
  if (stages[2] && (!stages[2].winner || stages[2].winner === "—")) {
    stages = [
      stages[0],
      stages[1],
      {
        stage: 3 as const,
        winner: base.winner.driver,
        runnerUp: base.finishers[1]?.driver ?? stages[2].runnerUp,
        note: stages[2].note ?? "Race winner · Stage 3",
      },
    ];
  }

  return {
    ...base,
    eventLabel: asString(patch.eventLabel, base.eventLabel),
    tv: asString(patch.tv, base.tv),
    winner,
    winnerPitStrategy,
    stages,
    stats: base.stats,
    finishers: base.finishers,
    pitScoreboard: base.pitScoreboard.map((row, i) => {
      const arr = patch.pitScoreboard;
      if (!Array.isArray(arr) || !arr[i] || typeof arr[i] !== "object") return row;
      const p = arr[i] as Record<string, unknown>;
      return {
        ...row,
        note: typeof p.note === "string" ? p.note : row.note,
      };
    }),
    pitNote: asString(patch.pitNote, base.pitNote),
    incidents,
    takeaways: takeaways.length ? takeaways : base.takeaways,
    nextRace,
  };
}

async function runRefresh(ctx: RunnerCtx, forced: boolean): Promise<RefreshResult> {
  // Ensure seed exists so homepage never empties
  await ctx.runMutation(internal.raceUpdates.seedIfEmpty, {});

  let feedText: string;
  try {
    feedText = await fetchText(LIVE_FEED_URL);
  } catch (err) {
    const message = `Live feed fetch failed: ${String(err)}`;
    await ctx.runMutation(internal.raceUpdates.logRun, {
      status: "failed",
      message,
      forced,
    });
    return { ok: false, status: "failed", message };
  }

  let feed: LiveFeed;
  try {
    feed = JSON.parse(feedText) as LiveFeed;
  } catch {
    const message = "Live feed JSON parse failed";
    await ctx.runMutation(internal.raceUpdates.logRun, {
      status: "failed",
      message,
      forced,
    });
    return { ok: false, status: "failed", message };
  }

  console.log(
    "Live feed",
    feed.run_name,
    "race_id",
    feed.race_id,
    "flag",
    feed.flag_state,
    "series",
    feed.series_id,
  );

  // series_id 1 = Cup
  if (feed.series_id != null && feed.series_id !== 1) {
    const message = `Feed series_id=${feed.series_id} is not Cup (1) — skip`;
    await ctx.runMutation(internal.raceUpdates.logRun, {
      status: "skipped",
      message,
      forced,
    });
    return { ok: true, status: "skipped", message };
  }

  // flag_state 9 ≈ checkered / finished in NASCAR live feeds
  const finished =
    feed.flag_state === 9 ||
    (feed.laps_to_go === 0 &&
      feed.lap_number >= (feed.laps_in_race || 0) &&
      (feed.laps_in_race || 0) > 0);

  if (!finished) {
    const message = `Race not finished (flag_state=${feed.flag_state}, lap ${feed.lap_number}/${feed.laps_in_race})`;
    await ctx.runMutation(internal.raceUpdates.logRun, {
      status: "skipped",
      message,
      raceName: feed.run_name,
      raceId: feed.race_id,
      forced,
    });
    return { ok: true, status: "skipped", message };
  }

  const latest = (await ctx.runQuery(
    internal.raceUpdates.getLatestInternal,
    {},
  )) as LatestInternal;
  if (
    latest &&
    latest.raceId != null &&
    latest.raceId === feed.race_id &&
    !forced
  ) {
    const message = `Already published race_id=${feed.race_id} (${latest.raceName})`;
    await ctx.runMutation(internal.raceUpdates.logRun, {
      status: "skipped",
      message,
      raceName: feed.run_name,
      raceId: feed.race_id,
      forced,
    });
    return { ok: true, status: "skipped", message };
  }

  // Official stage winners, cautions, TV, pole speed, teams, etc.
  let weekend: WeekendRace | null = null;
  try {
    weekend = await fetchWeekendRace(feed);
  } catch (err) {
    console.log("Weekend feed fetch failed (continuing)", err);
  }

  const skeleton = buildSkeleton(feed, weekend);

  let headlines: string[] = [];
  try {
    const rss = await fetchText(NEWS_RSS_URL);
    headlines = parseRssHeadlines(rss);
  } catch (err) {
    console.log("RSS fetch failed (continuing)", err);
  }

  const polished = await polishWithLlm(skeleton, headlines);
  const debrief = polished.debrief;

  const sources = Array.from(
    new Set([
      ...skeleton.sources,
      ...(headlines.length ? [NEWS_RSS_URL] : []),
    ]),
  );
  const provenance = polished.usedAi
    ? weekend
      ? "live-feed + weekend-feed + AI polish · stall pit times"
      : "live-feed + AI polish · stall pit times"
    : weekend
      ? "live-feed + weekend-feed skeleton · AI polish skipped/failed"
      : "live-feed skeleton · AI polish skipped/failed";

  const published = (await ctx.runMutation(internal.raceUpdates.publishDebrief, {
    raceId: skeleton.raceId,
    raceName: debrief.raceName,
    dateIso: debrief.dateIso,
    track: debrief.track,
    debrief,
    sources,
    provenance,
    forceReplace: forced,
  })) as PublishResult;

  const message = published.wrote
    ? `Published ${debrief.raceName} (${debrief.dateIso}) — ${published.reason}`
    : `No write: ${published.reason}`;

  await ctx.runMutation(internal.raceUpdates.logRun, {
    status: published.wrote ? "success" : "skipped",
    message,
    raceName: debrief.raceName,
    raceId: skeleton.raceId,
    dateIso: debrief.dateIso,
    sources,
    forced,
  });

  return {
    ok: true,
    status: published.wrote ? "success" : "skipped",
    message,
    raceName: debrief.raceName,
  };
}

export const checkAndRefresh = internalAction({
  args: {
    forced: v.optional(v.boolean()),
  },
  returns: v.object({
    ok: v.boolean(),
    status: v.string(),
    message: v.string(),
    raceName: v.optional(v.string()),
  }),
  handler: async (ctx, args): Promise<RefreshResult> => {
    const forced = args.forced === true;
    console.log("checkAndRefresh start", { forced });
    const result: RefreshResult = await runRefresh(ctx, forced);
    console.log("checkAndRefresh done", result);
    return result;
  },
});

/**
 * Public force trigger — requires secret matching Convex SECRET_KEY.
 * Used for manual "update now" after a race weekend.
 */
export const forceRefresh = action({
  args: {
    secret: v.string(),
  },
  returns: v.object({
    ok: v.boolean(),
    status: v.string(),
    message: v.string(),
  }),
  handler: async (ctx, args): Promise<{ ok: boolean; status: string; message: string }> => {
    const expected = process.env.SECRET_KEY;
    if (!expected || args.secret !== expected) {
      console.log("forceRefresh rejected: bad secret");
      return {
        ok: false,
        status: "failed",
        message: "Unauthorized",
      };
    }
    // Call shared runner directly to avoid circular type inference on runAction.
    const result = await runRefresh(ctx, true);
    return {
      ok: result.ok,
      status: result.status,
      message: result.message,
    };
  },
});
