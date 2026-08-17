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
      <PageHero tag="Research Area" title={(area as ResearchArea).title} subtitle={(area as ResearchArea).description ?? ""} />

      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {/* Methods */}
        {methods.length > 0 && (
          <section className="snap-section">
            <SectionHeading tag="Methodology" title="Research Methods" />
            <div className="flex flex-wrap gap-2.5">
              {methods.map((m) => (
                <Badge key={m.id} variant="accent">{m.name}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* Equipment */}
        {equipmentList.length > 0 && (
          <section className="snap-section">
            <SectionHeading tag="Infrastructure" title="Equipment Used" />
            <div className="flex flex-wrap gap-2.5">
              {equipmentList.map((e) => (
                <Badge key={e.id} variant="neutral">{e.name}</Badge>
              ))}
            </div>
          </section>
        )}

        {/* Publications */}
        {(publications as Publication[] ?? []).length > 0 && (
          <section className="snap-section">
            <SectionHeading tag="Output" title="Related Publications" />
            <div className="space-y-4">
              {(publications as Publication[]).map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-[#0284C7] transition-all"
                >
                  <p className="text-[#0F172A] font-extrabold text-sm mb-2 leading-snug">{pub.title}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                    {pub.journal_name && <span className="text-slate-700 font-semibold">{pub.journal_name}</span>}
                    {pub.impact_factor && (
                      <Badge variant="info">IF: {pub.impact_factor}</Badge>
                    )}
                    {pub.year && <span>{pub.year}</span>}
                    {pub.doi_link && (
                      <a
                        href={pub.doi_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0284C7] font-semibold hover:underline"
                      >
                        DOI
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
