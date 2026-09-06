import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

/**
 * Nightly Cup debrief autopilot.
 * Runs every 6 hours so post-race evenings are caught without waiting a full day,
 * and skips harmlessly when the live feed is practice/qualifying/in-progress
 * or when the published race already matches race_id.
 */
const crons = cronJobs();

crons.interval(
  "cup race debrief check",
  { hours: 6 },
  internal.raceUpdateActions.checkAndRefresh,
  { forced: false },
);

export default crons;
