export const GARAGE_DISCLAIMER =
  "Fan game on nascarlove.org. Not affiliated with NASCAR, its teams, or its drivers.";

export const NEXT_RACE_CHIP = {
  name: "Cook Out Southern 500",
  track: "Darlington Raceway",
  when: "Sun Sep 6, 2026 · 5 p.m. ET / 3 p.m. MDT",
};

export function garageNextChip(race?: { name: string; track: string; dateLabel: string } | null) {
  if (!race || /World Wide Technology|Enjoy Illinois|Gateway/i.test(`${race.name} ${race.track}`)) {
    return NEXT_RACE_CHIP;
  }
  return { name: race.name, track: race.track, when: race.dateLabel };
}

export const GARAGE_STEPS = [
  { n: "01", title: "Build a car", body: "Pick a number, colors, and a name. One car per member." },
  { n: "02", title: "Set a pre-race card", body: "Lock planned stops and a fuel window before green." },
  { n: "03", title: "Call under yellow", body: "Stay out, two, four, or fuel only. By hand. Every time." },
  { n: "04", title: "Stack the board", body: "See your # vs other members and the real Cup top 10." },
];

export const GARAGE_COLORS = [
  { id: "red", label: "Red", swatch: "bg-nascar-red", plate: "bg-nascar-red text-white" },
  { id: "blue", label: "Blue", swatch: "bg-nascar-blue", plate: "bg-nascar-blue text-white" },
  { id: "yellow", label: "Yellow", swatch: "bg-strategy-yellow", plate: "bg-strategy-yellow text-black" },
  { id: "cyan", label: "Cyan", swatch: "bg-strategy-cyan", plate: "bg-strategy-cyan text-black" },
  { id: "white", label: "White", swatch: "bg-white", plate: "bg-white text-black" },
  { id: "black", label: "Black", swatch: "bg-black", plate: "bg-black text-white" },
] as const;

export type GarageColorId = (typeof GARAGE_COLORS)[number]["id"];

export function plateClass(color: string, kind: "primary" | "accent" = "primary") {
  const found = GARAGE_COLORS.find((c) => c.id === color);
  if (kind === "accent") return found?.swatch ?? "bg-strategy-yellow";
  return found?.plate ?? "bg-nascar-red text-white";
}

export function callLabel(choice: string) {
  if (choice === "stay") return "Stay out";
  if (choice === "four") return "4 tires";
  if (choice === "two") return "2 tires";
  if (choice === "fuel") return "Fuel only";
  return choice;
}
