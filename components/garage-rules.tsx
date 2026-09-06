import GarageShell from "@/components/garage-shell";

const BLOCKS = [
  {
    title: "The ghost car",
    body: "You do not drive. Everybody rolls off midpack at P20. Track position only moves when you call a pit or burn fuel wrong.",
  },
  {
    title: "Green running",
    body: "Each leader lap adds the field-average lap time to your elapsed clock and burns one fuel lap. Tank starts at the admin max stint (68 at Darlington).",
  },
  {
    title: "When you can call",
    body: "Buttons light only under caution, when the leader lap is a multiple of 40, or when you have five fuel laps or less.",
  },
  {
    title: "Pit time",
    body: "Green: 25s down pit road plus stall (4 tires 22s, 2 tires 15s, fuel only 8s). Caution: pit road is free; you lose spots instead.",
  },
  {
    title: "Caution bunch",
    body: "Yellow packs the field by elapsed time. Stay out: +4 spots (not past P1). 4 tires −8. 2 tires −5. Fuel only −3. Service refills the tank. Stay out does not.",
  },
  {
    title: "Checkered",
    body: "Rank among Love Garage cars freezes. 1st 40, 2nd 39, down to 1. Out of fuel is DNF, last, no bonus. No stage points. The real Cup top 10 is pasted by the owner after the race.",
  },
];

export default function GarageRules() {
  return (
    <GarageShell title="How scoring works" kicker="Love Garage">
      <div data-testid="garage-rules" data-state="ready" className="grid gap-3 sm:grid-cols-2">
        {BLOCKS.map((block) => (
          <article key={block.title} className="rounded-lg border border-white/10 bg-black/30 p-4">
            <h2 className="font-archivo uppercase text-white text-lg">{block.title}</h2>
            <p className="font-oswald text-sm text-white/70 mt-2 leading-relaxed">{block.body}</p>
          </article>
        ))}
      </div>
    </GarageShell>
  );
}
