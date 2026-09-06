import TriviaDisclaimer from "@/components/trivia-disclaimer";

export default function TriviaRules() {
  return (
    <div className="relative min-h-screen bg-strategy-panel text-white" data-testid="trivia-rules" data-state="ready">
      <div className="pointer-events-none absolute inset-0 speed-lines-bg opacity-25" />
      <div className="relative mx-auto max-w-3xl px-4 py-10 sm:py-14 space-y-8">
        <p className="font-oswald text-xs uppercase tracking-[0.25em] text-strategy-cyan">Trivia Night</p>
        <h1 className="font-archivo uppercase text-4xl sm:text-6xl leading-none">How scoring works</h1>

        <dl className="space-y-6 font-oswald text-lg text-white/80">
          <div>
            <dt className="text-strategy-yellow uppercase tracking-widest text-sm">Daily 5</dt>
            <dd>10 points per correct. +2 if you answer in under 8 seconds. 0 for wrong or timeout. Max 60 on a perfect fast day. One attempt per Mountain-time day (clock flips at 6 a.m. MT).</dd>
          </div>
          <div>
            <dt className="text-strategy-yellow uppercase tracking-widest text-sm">Chase pack</dt>
            <dd>15 per correct. No timer bonus. 10 questions. One pack per Chase weekend (Sat–Sun).</dd>
          </div>
          <div>
            <dt className="text-strategy-yellow uppercase tracking-widest text-sm">Practice</dt>
            <dd>Scrambled older questions. No points. Does not hit the board.</dd>
          </div>
          <div>
            <dt className="text-strategy-yellow uppercase tracking-widest text-sm">Board</dt>
            <dd>Season rank by points. Ties broken by fewer seconds used. Guests can play Daily 5 once; they stay off the board until they log in.</dd>
          </div>
        </dl>
        <TriviaDisclaimer />
      </div>
    </div>
  );
}
