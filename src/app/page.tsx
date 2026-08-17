import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/home/HeroSection";
import ResearchHighlights from "@/components/home/ResearchHighlights";
import StatsCounter from "@/components/home/StatsCounter";
import LatestNews from "@/components/home/LatestNews";
import type { ResearchArea, NewsFeed } from "@/types";

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { data: areas },
    { count: pubCount },
    { count: projectCount },
    { count: memberCount },
    { data: news },
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

  return (
    <>
      <HeroSection />
      <StatsCounter
        publications={pubCount ?? 0}
        projects={projectCount ?? 0}
        members={memberCount ?? 0}
      />
      <ResearchHighlights areas={(areas as ResearchArea[]) ?? []} />
      <LatestNews items={(news as NewsFeed[]) ?? []} />
    </>
  );
}
