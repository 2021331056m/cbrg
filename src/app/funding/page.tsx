import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Badge from "@/components/ui/Badge";
import { Building2, Globe, MapPin } from "lucide-react";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "Funding",
  description: "Research funding and grants supporting the Cancer Biology Research Group.",
};

export const revalidate = 3600;

export default async function FundingPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("id, title, funding_source, status, start_year, end_year")
    .not("funding_source", "is", null)
    .order("status");

  const projects = (data as Project[]) ?? [];

  const grouped = projects.reduce<Record<string, Project[]>>((acc, p) => {
    const source = p.funding_source ?? "Other";
    if (!acc[source]) acc[source] = [];
    acc[source].push(p);
    return acc;
  }, {});

  return (
    <>
      <PageHero
        tag="Funding"
        title="Research Funding"
        subtitle="Our research is supported by national and international grants and funding agencies."
      />
      <section className="max-w-5xl mx-auto px-4 pb-20">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-20 text-gray-600">No funding records yet.</div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([source, items]) => (
              <div key={source}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-lg bg-[#0D4F6B]/30 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-[#00D4FF]" />
                  </div>
                  <h2 className="text-white font-semibold text-lg">{source}</h2>
                </div>
                <div className="space-y-3 ml-12">
                  {items.map((p) => (
                    <div key={p.id} className="bg-[#0A1628] border border-white/5 rounded-xl p-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-white text-sm font-medium">{p.title}</p>
                        {p.start_year && (
                          <p className="text-gray-600 text-xs mt-1">
                            {p.start_year}{p.end_year ? ` – ${p.end_year}` : " – Present"}
                          </p>
                        )}
                      </div>
                      <Badge variant={p.status === "Ongoing" ? "success" : "neutral"}>
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
