import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/home/HeroSection";
import ResearchHighlights from "@/components/home/ResearchHighlights";
import StatsCounter from "@/components/home/StatsCounter";
import LatestNews from "@/components/home/LatestNews";
import type { ResearchArea, NewsFeed } from "@/types";

export const revalidate = 3600;

export default async function HomePage() {
  let areas: ResearchArea[] | null = null;
  let pubCount = 0;
  let projectCount = 0;
  let memberCount = 0;
  let news: any[] | null = null;

  try {
    const supabase = await createClient();

    const [
      { data: areasData },
      { count: pubCountRes },
      { count: projectCountRes },
      { count: memberCountRes },
      { data: newsData },
    ] = await Promise.all([
      supabase.from("research_areas").select("*").order("sort_order"),
      supabase.from("publications").select("*", { count: "exact", head: true }),
      supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("status", "Ongoing"),
      supabase
        .from("members")
        .select("*", { count: "exact", head: true })
        .eq("is_alumni", false),
      supabase
        .from("news_feeds")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(6),
    ]);

    areas = (areasData as ResearchArea[]) ?? [];
    pubCount = pubCountRes ?? 0;
    projectCount = projectCountRes ?? 0;
    memberCount = memberCountRes ?? 0;
    news = (newsData as any[]) ?? [];
  } catch (err) {
    // If Supabase isn't configured locally, fall back to safe defaults
    areas = [];
    pubCount = 0;
    projectCount = 0;
    memberCount = 0;
    news = [];
  }

  return (
    <>
      <HeroSection />
      <StatsCounter
        publications={pubCount ?? 0}
        projects={projectCount ?? 0}
        members={memberCount ?? 0}
      />
      <ResearchHighlights areas={areas ?? []} />
      <LatestNews items={news ?? []} />
    </>
  );
}
