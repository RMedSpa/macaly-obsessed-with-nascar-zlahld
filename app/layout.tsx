import "./globals.css";
import type { Metadata } from "next";
import { Archivo_Black, Oswald } from "next/font/google";
import { buildPageMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import SiteShell from "@/components/site-shell";

const archivoblack = Archivo_Black({
  weight: "400",
  variable: "--font-archivo",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const oswald = Oswald({
  // Fewer weights = less font JS/CSS work on first load
  weight: ["400", "500", "600"],
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildPageMetadata("/"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${archivoblack.variable} ${oswald.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <ConvexClientProvider>
          <SiteShell>{children}</SiteShell>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
