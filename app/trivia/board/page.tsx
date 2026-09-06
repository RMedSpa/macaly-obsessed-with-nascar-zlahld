import type { Metadata } from "next";
import TriviaBoard from "@/components/trivia-board";
import { JsonLd, triviaBoardJsonLd } from "@/components/json-ld";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/trivia/board");

export default function TriviaBoardPage() {
  return (
    <>
      <JsonLd data={triviaBoardJsonLd()} />
      <TriviaBoard />
    </>
  );
}
