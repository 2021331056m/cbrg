import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import LatestNews from "@/components/home/LatestNews";
import ProjectsPage from "@/app/projects/page";
import PublicationsPage from "@/app/publications/page";
import MembersPage from "@/app/members/page";
import CollaborationsPage from "@/app/collaborations/page";
import AlumniPage from "@/app/alumni/page";
import NewsPage from "@/app/news/page";
import ContactPage from "@/app/contact/page";
import type { NewsFeed } from "@/types";

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { count: pubCount },
    { count: projectCount },
    { count: memberCount },
    { data: news },
  ] = await Promise.all([
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
      <div id="/" data-nav-section>
        <HeroSection />
        <StatsCounter
          publications={pubCount ?? 0}
          projects={projectCount ?? 0}
          members={memberCount ?? 0}
        />
        <LatestNews items={(news as NewsFeed[]) ?? []} />
      </div>
      <div id="projects" data-nav-section><ProjectsPage /></div>
      <div id="publications" data-nav-section><PublicationsPage /></div>
      <div id="members" data-nav-section><MembersPage /></div>
      <div id="collaborations" data-nav-section><CollaborationsPage /></div>
      <div id="alumni" data-nav-section><AlumniPage /></div>
      <div id="news" data-nav-section><NewsPage /></div>
      <div id="contact" data-nav-section><ContactPage /></div>
    </>
  );
}
