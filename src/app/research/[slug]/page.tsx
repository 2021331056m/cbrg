import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Badge from "@/components/ui/Badge";
import SectionHeading from "@/components/ui/SectionHeading";
import type { ResearchArea, EquipmentMethod, Publication } from "@/types";

interface PageParams {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("research_areas")
    .select("title, description")
    .eq("slug", slug)
    .single();
  if (!data) return { title: "Research" };
  return { title: data.title, description: data.description ?? undefined };
}

export default async function ResearchDetailPage({ params }: PageParams) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: area } = await supabase
    .from("research_areas")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!area) notFound();

  const [{ data: equipment }, { data: publications }] = await Promise.all([
    supabase.from("equipment_methods").select("*").eq("research_area_id", area.id),
    supabase
      .from("publications")
      .select("id, title, journal_name, impact_factor, year, doi_link, authors")
      .eq("topic_category", area.id)
      .order("year", { ascending: false })
      .limit(10),
  ]);

  const methods = (equipment as EquipmentMethod[] ?? []).filter((e) => e.type === "Method");
  const equipmentList = (equipment as EquipmentMethod[] ?? []).filter((e) => e.type === "Equipment");

  return (
    <>
      <PageHero tag="Research" title={(area as ResearchArea).title} subtitle={(area as ResearchArea).description ?? ""} />

      <div className="max-w-5xl mx-auto px-4 pb-20 space-y-16">
        {/* Methods */}
        {methods.length > 0 && (
          <div>
            <SectionHeading tag="Methodology" title="Research Methods" />
            <div className="flex flex-wrap gap-2">
              {methods.map((m) => (
                <Badge key={m.id} variant="accent">{m.name}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Equipment */}
        {equipmentList.length > 0 && (
          <div>
            <SectionHeading tag="Infrastructure" title="Equipment Used" />
            <div className="flex flex-wrap gap-2">
              {equipmentList.map((e) => (
                <Badge key={e.id} variant="neutral">{e.name}</Badge>
              ))}
            </div>
          </div>
        )}

        {/* Publications */}
        {(publications as Publication[] ?? []).length > 0 && (
          <div>
            <SectionHeading tag="Output" title="Related Publications" />
            <div className="space-y-4">
              {(publications as Publication[]).map((pub) => (
                <div
                  key={pub.id}
                  className="bg-[#0A1628] border border-white/5 rounded-xl p-5"
                >
                  <p className="text-white font-medium text-sm mb-2 leading-snug">{pub.title}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    {pub.journal_name && <span className="text-gray-400">{pub.journal_name}</span>}
                    {pub.impact_factor && (
                      <Badge variant="info">IF: {pub.impact_factor}</Badge>
                    )}
                    {pub.year && <span>{pub.year}</span>}
                    {pub.doi_link && (
                      <a
                        href={pub.doi_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00D4FF] hover:underline"
                      >
                        DOI
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
