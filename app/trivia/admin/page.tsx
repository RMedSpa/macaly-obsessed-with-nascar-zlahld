import type { Metadata } from "next";
import TriviaAdmin from "@/components/trivia-admin";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata("/trivia/admin");

export default function TriviaAdminPage() {
  return <TriviaAdmin />;
}
