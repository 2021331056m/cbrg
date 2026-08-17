import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import ResearchAreaCard from "@/components/research/ResearchAreaCard";
import type { ResearchArea } from "@/types";

export const metadata: Metadata = {
  title: "Research",
  description: "Explore our research areas in molecular oncology, cancer genomics, transcriptomics, personalized medicine, biomarker discovery, and bioinformatics.",
};

export const revalidate = 3600;

export default async function ResearchPage() {
  const supabase = await createClient();
  const { data: areas } = await supabase
    .from("research_areas")
    .select("*")
    .order("sort_order");

  return (
    <>
      <PageHero
        tag="Research"
        title="Our Research Areas"
        subtitle="Six interconnected sub-disciplines driving our mission to decode cancer at the molecular level and translate findings into clinical solutions."
      />
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(areas as ResearchArea[] ?? []).map((area) => (
            <ResearchAreaCard key={area.id} area={area} />
          ))}
        </div>
      </section>
    </>
  );
}
