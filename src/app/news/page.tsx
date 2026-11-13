import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Badge from "@/components/ui/Badge";
import { ExternalLink } from "lucide-react";
import type { NewsFeed, NewsSource } from "@/types";
import { formatDate, truncate, withBasePath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
  description: "",
};

export const revalidate = 3600;

const sourceVariant: Record<NewsSource, "accent" | "info" | "success"> = {
  "Internal":      "accent",
  "PubMed":        "info",
  "Nature Cancer": "success",
};

type NewsListItem = NewsFeed & {
  image_url?: string | null;
  created_at?: string;
};

const featuredNews: NewsListItem[] = [
  {
    id: "featured-news-1",
    title: "শাবিপ্রবিতে বিএমবি বিভাগের ‘হিট’ উপ-প্রকল্পের ইনসেপশন কর্মশালা অনুষ্ঠিত",
    content:
     "",
    source: "Internal",
    url: "https://amarsylhetnews.com/2026/06/25/%E0%A6%B6%E0%A6%BE%E0%A6%AC%E0%A6%BF%E0%A6%AA%E0%A7%8D%E0%A6%B0%E0%A6%AC%E0%A6%BF%E0%A6%A4%E0%A7%87-%E0%A6%AC%E0%A6%BF%E0%A6%8F%E0%A6%AE%E0%A6%AC%E0%A6%BF-%E0%A6%AC%E0%A6%BF%E0%A6%AD%E0%A6%BE%E0%A6%97/",
    published_at: "2026-06-25T00:00:00.000Z",
    created_at: "2026-06-25T00:00:00.000Z",
    image_url: "/images/news1.JPG",
  },
  {
    id: "featured-news-2",
    title: "Recruitment Circular for Project-based Positions (HEAT Sub-Project PIN:13409)",
    content:
      "",
    source: "Internal",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7498808881868038144/",
    published_at: "2026-06-30T00:00:00.000Z",
    created_at: "2026-06-30T00:00:00.000Z",
    image_url: "/images/news2.png",
  },
];

export default async function NewsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("news_feeds")
    .select("*")
    .order("published_at", { ascending: false })
    .limit(50);

  const items: NewsListItem[] = [...featuredNews, ...((data as NewsFeed[]) ?? []).map((item) => ({
    ...item,
    image_url: null,
  }))].sort(
    (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime(),
  ).slice(0, 50);

  return (
    <>
      <PageHero
        tag="News"
        title="Latest News"
        subtitle=""
      />
      <section className="snap-section max-w-4xl mx-auto px-4 py-16">
        {items.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">No news feed available yet.</div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <a
                key={item.id}
                href={item.url ?? undefined}
                target={item.url?.startsWith("http") ? "_blank" : undefined}
                rel={item.url?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block overflow-hidden bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl shadow-xs hover:shadow-md transition-all group"
              >
                  <div className="w-full overflow-hidden bg-slate-100">
                    <img
                      src={withBasePath(item.image_url || "https://placehold.co/800x400?text=No+Image")}
                      alt={item.title}
                      className="w-full h-56 sm:h-64 object-cover object-center"
                    />
                  </div>
                

                <div className="p-5">
                  <div className="flex items-center justify-between mb-3 gap-3">
                    <Badge variant={sourceVariant[item.source]}>{item.source}</Badge>
                    <span className="text-xs text-slate-500 font-medium">{formatDate(item.published_at)}</span>
                  </div>

                  <h3 className="text-[#0F172A] text-base sm:text-lg font-bold leading-snug mb-2 group-hover:text-[#0284C7] transition-colors">
                    {item.title}
                  </h3>

                  {item.content && (
                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {truncate(item.content, 200)}
                    </p>
                  )}

                  {item.url && (
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#0284C7] hover:underline">
                      Read full article <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
