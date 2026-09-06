export const TRIVIA_DISCLAIMER =
  "Fan quiz on nascarlove.org. Not affiliated with NASCAR, its teams, or its drivers.";

export default function TriviaDisclaimer() {
  return (
    <p className="font-oswald text-[11px] uppercase tracking-wider text-white/45">{TRIVIA_DISCLAIMER}</p>
  );
}
