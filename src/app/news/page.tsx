import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Badge from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";
import type { NewsFeed, NewsSource } from "@/types";
import { formatDate, truncate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: "Latest news and research updates from CBRG, PubMed, and Nature Cancer.",
};

export const revalidate = 3600;

const sourceVariant: Record<NewsSource, "accent" | "info" | "success"> = {
  "Internal":      "accent",
  "PubMed":        "info",
  "Nature Cancer": "success",
};

export default async function NewsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news_feeds")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(50);

  const items = (data as NewsFeed[]) ?? [];

  return (
    <>
      <PageHero
        tag="News"
        title="Latest News"
        subtitle="Research announcements, publications, and updates from PubMed and Nature Cancer."
      />
      <section className="max-w-4xl mx-auto px-4 pb-20">
        {items.length === 0 ? (
          <div className="text-center py-20 text-gray-600">No news yet — RSS feeds will populate this soon.</div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-[#0A1628] border border-white/5 rounded-xl p-5 hover:border-[#00D4FF]/15 transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={sourceVariant[item.source]}>{item.source}</Badge>
                  <span className="text-xs text-gray-600">{formatDate(item.published_at)}</span>
                </div>
                <h3 className="text-white text-sm font-semibold leading-snug mb-1 group-hover:text-[#00D4FF] transition-colors">
                  {item.title}
                </h3>
                {item.content && (
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {truncate(item.content, 200)}
                  </p>
                )}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs text-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Read full article <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
