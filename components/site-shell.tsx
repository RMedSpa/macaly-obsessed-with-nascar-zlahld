import NewsTicker from "@/components/news-ticker";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

/** Shared chrome — ticker, top menu, and footer on every page. */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NewsTicker />
      <SiteHeader />
      <div className="flex-1 w-full">{children}</div>
      <SiteFooter />
    </div>
  );
}
