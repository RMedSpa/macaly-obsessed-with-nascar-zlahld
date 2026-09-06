export type CallChoice = "stay" | "four" | "two" | "fuel";
export type FlagStatus = "upcoming" | "green" | "caution" | "red" | "checkered";
export type EntryStatus = "running" | "dnf";

export type ScoringCar = {
  id: string;
  elapsedSeconds: number;
  fuelLaps: number;
  status: EntryStatus;
  dnfReason?: string;
};

export const GREEN_PIT_ROAD = 25;
export const STALL_SECONDS = { four: 22, two: 15, fuel: 8 } as const;
export const CAUTION_SHIFT = { stay: -4, four: 8, two: 5, fuel: 3 } as const;
export const FIELD_SIZE = 40;
export const STARTING_PLACE = 20;

export function isGhostId(id: string) {
  return id.startsWith("g:");
}

export function persistGhosts(cars: ScoringCar[]): { key: string; elapsedSeconds: number }[] {
  return cars
    .filter((car) => isGhostId(car.id))
    .map((car) => ({ key: car.id.slice(2), elapsedSeconds: car.elapsedSeconds }));
}

export function defaultGhosts(): ScoringCar[] {
  const ahead = STARTING_PLACE - 1;
  const behind = FIELD_SIZE - STARTING_PLACE;
  const ghosts: ScoringCar[] = [];
  for (let i = 0; i < ahead; i += 1) {
    ghosts.push({
      id: `g:a${String(i).padStart(2, "0")}`,
      elapsedSeconds: 0,
      fuelLaps: 9999,
      status: "running",
    });
  }
  for (let i = 0; i < behind; i += 1) {
    ghosts.push({
      id: `g:z${String(i).padStart(2, "0")}`,
      elapsedSeconds: 0.01 * (i + 1),
      fuelLaps: 9999,
      status: "running",
    });
  }
  return ghosts;
}

export function withGhosts(
  members: ScoringCar[],
  ghosts?: { key: string; elapsedSeconds: number }[] | null,
): ScoringCar[] {
  const ghostCars =
    ghosts && ghosts.length > 0
      ? ghosts.map((ghost) => ({
          id: `g:${ghost.key}`,
          elapsedSeconds: ghost.elapsedSeconds,
          fuelLaps: 9999,
          status: "running" as const,
        }))
      : defaultGhosts();
  return [...members, ...ghostCars];
}

export function memberCars(cars: ScoringCar[]): ScoringCar[] {
  return cars.filter((car) => !isGhostId(car.id));
}

export function pointsForPlace(place: number): number {
  return Math.max(1, 41 - place);
}

export function rankCars(cars: ScoringCar[]): ScoringCar[] {
  const running = cars
    .filter((car) => car.status === "running")
    .slice()
    .sort((a, b) => a.elapsedSeconds - b.elapsedSeconds || a.id.localeCompare(b.id));
  const dnf = cars
    .filter((car) => car.status !== "running")
    .slice()
    .sort((a, b) => a.elapsedSeconds - b.elapsedSeconds || a.id.localeCompare(b.id));
  return [...running, ...dnf];
}

export function positionOf(cars: ScoringCar[], id: string): number {
  return rankCars(cars).findIndex((car) => car.id === id) + 1;
}

export function packOnCaution(cars: ScoringCar[]): ScoringCar[] {
  return rankCars(cars).map((car, index) =>
    car.status === "running" ? { ...car, elapsedSeconds: index + 1 } : car,
  );
}

export function tickGreenLap(cars: ScoringCar[], avgLap: number): ScoringCar[] {
  return cars.map((car) => {
    if (car.status !== "running") return car;
    if (isGhostId(car.id)) {
      return { ...car, elapsedSeconds: car.elapsedSeconds + avgLap };
    }
    const fuelLaps = car.fuelLaps - 1;
    if (fuelLaps <= 0) {
      return {
        ...car,
        fuelLaps: 0,
        status: "dnf" as const,
        dnfReason: "out_of_fuel",
      };
    }
    return {
      ...car,
      fuelLaps,
      elapsedSeconds: car.elapsedSeconds + avgLap,
    };
  });
}

function stallTime(choice: CallChoice): number {
  if (choice === "four") return STALL_SECONDS.four;
  if (choice === "two") return STALL_SECONDS.two;
  if (choice === "fuel") return STALL_SECONDS.fuel;
  return 0;
}

function insertAtRank(running: ScoringCar[], car: ScoringCar, rank: number): ScoringCar[] {
  const without = running.filter((row) => row.id !== car.id);
  const index = Math.max(0, Math.min(without.length, rank - 1));
  without.splice(index, 0, car);
  return without;
}

export function applyCall(
  cars: ScoringCar[],
  carId: string,
  choice: CallChoice,
  flag: FlagStatus,
  maxStintLaps: number,
): ScoringCar[] {
  const current = cars.find((car) => car.id === carId);
  if (!current || current.status !== "running") return cars;

  if (flag === "caution") {
    const running = rankCars(cars).filter((car) => car.status === "running");
    const from = running.findIndex((car) => car.id === carId) + 1;
    const shift = CAUTION_SHIFT[choice];
    const target = Math.max(1, Math.min(running.length, from + shift));
    const moved = insertAtRank(running, current, target).map((car, index) => ({
      ...car,
      elapsedSeconds: index + 1,
      fuelLaps: car.id === carId && choice !== "stay" ? maxStintLaps : car.fuelLaps,
    }));
    const dnf = cars.filter((car) => car.status !== "running");
    return [...moved, ...dnf];
  }

  const elapsed =
    choice === "stay"
      ? current.elapsedSeconds
      : current.elapsedSeconds + GREEN_PIT_ROAD + stallTime(choice);
  const fuelLaps = choice === "stay" ? current.fuelLaps : maxStintLaps;
  return cars.map((car) =>
    car.id === carId ? { ...car, elapsedSeconds: elapsed, fuelLaps } : car,
  );
}

export function canMakeCall(args: {
  raceStatus: FlagStatus;
  leaderLap: number;
  fuelLaps: number;
  entryStatus: EntryStatus;
}): boolean {
  if (args.entryStatus !== "running") return false;
  if (args.raceStatus === "caution") return true;
  if (args.raceStatus !== "green") return false;
  if (args.fuelLaps <= 5) return true;
  return args.leaderLap > 0 && args.leaderLap % 40 === 0;
}

export function awardPoints(cars: ScoringCar[]): { id: string; place: number; points: number }[] {
  return rankCars(memberCars(cars)).map((car, index) => ({
    id: car.id,
    place: index + 1,
    points: pointsForPlace(index + 1),
  }));
}
