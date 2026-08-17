import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import Badge from "@/components/ui/Badge";
import { User, Briefcase } from "lucide-react";
import type { AlumniMember } from "@/types";

export const metadata: Metadata = {
  title: "Alumni",
  description: "Former members of the Cancer Biology Research Group and their current positions.",
};

export const revalidate = 3600;

export default async function AlumniPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("members")
    .select("*, alumni_details(*)")
    .eq("is_alumni", true)
    .order("sort_order");

  const alumni = (data as AlumniMember[]) ?? [];

  return (
    <>
      <PageHero
        tag="Alumni"
        title="Our Alumni"
        subtitle="Former members who have gone on to make an impact in academia, industry, and healthcare."
      />
      <section className="snap-section max-w-7xl mx-auto px-4 py-16">
        {alumni.length === 0 ? (
          <div className="text-center py-20 text-slate-500 font-medium">No alumni records yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {alumni.map((member) => (
              <div
                key={member.id}
                className="bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl p-5 shadow-xs hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#0284C7]/10 flex-shrink-0 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#0284C7]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#0F172A] font-extrabold text-sm">{member.name}</h3>
                    {member.alumni_details?.previous_role && (
                      <p className="text-slate-500 text-xs font-medium mt-0.5">
                        Previously: {member.alumni_details.previous_role}
                      </p>
                    )}
                    {member.alumni_details?.current_status && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                        <Briefcase className="w-3.5 h-3.5 text-[#0284C7]" />
                        {member.alumni_details.current_status}
                      </div>
                    )}
                    <div className="mt-2.5">
                      <Badge variant="neutral">{member.role}</Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
