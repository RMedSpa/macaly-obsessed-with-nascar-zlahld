import type { Metadata } from "next";
import TriviaRules from "@/components/trivia-rules";
import { JsonLd, triviaRulesJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/trivia/rules");

export default function TriviaRulesPage() {
  return (
    <>
      <JsonLd data={triviaRulesJsonLd()} />
      <TriviaRules />
    </>
  );
}
