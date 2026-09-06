import type { Metadata } from "next";
import TriviaLanding from "@/components/trivia-landing";
import { JsonLd, triviaJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/trivia");

export default function TriviaPage() {
  return (
    <>
      <JsonLd data={triviaJsonLd()} />
      <TriviaLanding />
    </>
  );
}
