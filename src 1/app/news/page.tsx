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
      <section className="max-w-4xl mx-auto px-4 py-16">
        {items.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">No news feed available yet.</div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl p-5 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={sourceVariant[item.source]}>{item.source}</Badge>
                  <span className="text-xs text-slate-500 font-medium">{formatDate(item.published_at)}</span>
                </div>
                <h3 className="text-[#0F172A] text-base font-bold leading-snug mb-1.5 group-hover:text-[#0284C7] transition-colors">
                  {item.title}
                </h3>
                {item.content && (
                  <p className="text-slate-600 text-xs leading-relaxed font-normal">
                    {truncate(item.content, 200)}
                  </p>
                )}
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:underline"
                  >
                    Read full article <ExternalLink className="w-3.5 h-3.5" />
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
