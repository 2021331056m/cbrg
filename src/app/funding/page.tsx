import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Badge from "@/components/ui/Badge";
import { Building2 } from "lucide-react";
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
      <section className="snap-section max-w-5xl mx-auto px-4 py-16">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">No funding records available.</div>
        ) : (
          <div className="space-y-10">
            {Object.entries(grouped).map(([source, items]) => (
              <div key={source}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#0284C7]/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#0284C7]" />
                  </div>
                  <h2 className="text-[#002147] font-extrabold text-xl">{source}</h2>
                </div>
                <div className="space-y-3.5 ml-13">
                  {items.map((p) => (
                    <div key={p.id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between gap-4">
                      <div>
                        <p className="text-[#0F172A] text-sm font-bold">{p.title}</p>
                        {p.start_year && (
                          <p className="text-slate-500 text-xs font-medium mt-1">
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
