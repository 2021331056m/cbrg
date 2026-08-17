import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import { FlaskConical, Building2 } from "lucide-react";
import type { Project } from "@/types";

export const metadata: Metadata = {
  title: "Projects",
  description: "Ongoing and completed research projects at the Cancer Biology Research Group.",
};

export const revalidate = 3600;

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("status")
    .order("created_at", { ascending: false });

  const projects = (data as Project[]) ?? [];
  const ongoing = projects.filter((p) => p.status === "Ongoing");
  const completed = projects.filter((p) => p.status === "Completed");

  return (
    <>
      <PageHero
        tag="Projects"
        title="Research Projects"
        subtitle="Innovative initiatives exploring novel cancer therapies and diagnostic approaches."
      />
      <div className="max-w-5xl mx-auto px-4 py-16 space-y-16">
        {ongoing.length > 0 && (
          <section className="snap-section">
            <SectionHeading tag={`${ongoing.length} active`} title="Ongoing Projects" />
            <div className="space-y-5">
              {ongoing.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
        {completed.length > 0 && (
          <section className="snap-section">
            <SectionHeading tag={`${completed.length} completed`} title="Completed Projects" />
            <div className="space-y-5">
              {completed.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
        {projects.length === 0 && (
          <div className="text-center py-20 text-slate-500 font-medium">No projects recorded yet.</div>
        )}
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl p-6 shadow-xs hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-[#0284C7]/10 flex-shrink-0 flex items-center justify-center mt-0.5">
            <FlaskConical className="w-5 h-5 text-[#0284C7]" />
          </div>
          <h3 className="text-[#0F172A] font-extrabold text-base leading-snug">{project.title}</h3>
        </div>
        <Badge variant={project.status === "Ongoing" ? "success" : "neutral"}>
          {project.status}
        </Badge>
      </div>

      {project.description && (
        <p className="text-slate-600 text-sm leading-relaxed ml-13">{project.description}</p>
      )}

      {(project.funding_source || project.start_year) && (
        <div className="mt-4 ml-13 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 border-t border-slate-100 pt-3">
          {project.funding_source && (
            <span className="flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#0284C7]" />
              {project.funding_source}
            </span>
          )}
          {project.start_year && (
            <span>
              {project.start_year}
              {project.end_year ? ` – ${project.end_year}` : " – Present"}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
