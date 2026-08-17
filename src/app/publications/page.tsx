import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import PublicationList from "@/components/publications/PublicationList";
import type { Publication, ResearchArea } from "@/types";

export const metadata: Metadata = {
  title: "Publications",
  description: "Browse our peer-reviewed publications in cancer biology, molecular oncology, and related fields.",
};

export const revalidate = 3600;

export default async function PublicationsPage() {
  const supabase = await createClient();
  const [{ data: publications }, { data: areas }] = await Promise.all([
    supabase
      .from("publications")
      .select("*, research_areas(title, slug)")
      .order("year", { ascending: false }),
    supabase.from("research_areas").select("id, title").order("sort_order"),
  ]);

  return (
    <>
      <PageHero
        tag="Publications"
        title="Scientific Publications"
        subtitle="Peer-reviewed research output from our group. Filter by year, topic, or search by author."
      />
      <section className="snap-section max-w-5xl mx-auto px-4 pb-20">
        <PublicationList
          publications={(publications as Publication[]) ?? []}
          researchAreas={(areas as ResearchArea[]) ?? []}
        />
      </section>
    </>
  );
}
