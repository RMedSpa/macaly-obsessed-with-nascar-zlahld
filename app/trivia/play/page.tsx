import type { Metadata } from "next";
import { Suspense } from "react";
import TriviaPlay from "@/components/trivia-play";
import { JsonLd, triviaPlayJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/trivia/play");

export default function TriviaPlayPage() {
  return (
    <>
      <JsonLd data={triviaPlayJsonLd()} />
    <Suspense
      fallback={
        <div className="min-h-screen bg-strategy-panel text-white font-oswald p-10" data-testid="trivia-play" data-state="loading">
          <h1 className="font-archivo uppercase text-4xl leading-none mb-4">Trivia Night Daily 5</h1>
          Rolling the next green…
        </div>
      }
    >
      <TriviaPlay />
    </Suspense>
    </>
  );
}
