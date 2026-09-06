/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as ResendOTP from "../ResendOTP.js";
import type * as auth from "../auth.js";
import type * as crons from "../crons.js";
import type * as cupDebriefValidators from "../cupDebriefValidators.js";
import type * as garage from "../garage.js";
import type * as garageAuthz from "../garageAuthz.js";
import type * as garageScoring from "../garageScoring.js";
import type * as http from "../http.js";
import type * as macaly from "../macaly.js";
import type * as raceUpdateActions from "../raceUpdateActions.js";
import type * as raceUpdates from "../raceUpdates.js";
import type * as seedDebrief from "../seedDebrief.js";
import type * as trivia from "../trivia.js";
import type * as triviaScoring from "../triviaScoring.js";
import type * as triviaSeed from "../triviaSeed.js";
import type * as triviaTime from "../triviaTime.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  ResendOTP: typeof ResendOTP;
  auth: typeof auth;
  crons: typeof crons;
  cupDebriefValidators: typeof cupDebriefValidators;
  garage: typeof garage;
  garageAuthz: typeof garageAuthz;
  garageScoring: typeof garageScoring;
  http: typeof http;
  macaly: typeof macaly;
  raceUpdateActions: typeof raceUpdateActions;
  raceUpdates: typeof raceUpdates;
  seedDebrief: typeof seedDebrief;
  trivia: typeof trivia;
  triviaScoring: typeof triviaScoring;
  triviaSeed: typeof triviaSeed;
  triviaTime: typeof triviaTime;
  users: typeof users;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
