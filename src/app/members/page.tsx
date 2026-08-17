import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import MemberCard from "@/components/members/MemberCard";
import type { Member, MemberRole } from "@/types";
import { MEMBER_ROLES } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Members",
  description: "Meet the Cancer Biology Research Group team — PIs, researchers, PhD and Masters students.",
};

export const revalidate = 3600;

export default async function MembersPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("members")
    .select("*")
    .eq("is_alumni", false)
    .order("sort_order");

  const members = (data as Member[]) ?? [];

  const grouped = MEMBER_ROLES.reduce<Record<MemberRole, Member[]>>(
    (acc, role) => {
      acc[role] = members.filter((m) => m.role === role);
      return acc;
    },
    {} as Record<MemberRole, Member[]>
  );

  return (
    <>
      <PageHero
        tag="Team"
        title="Our Members"
        subtitle="The dedicated scientists and students driving cancer research forward."
      />
      <div className="max-w-7xl mx-auto px-4 pb-20 space-y-16">
        {MEMBER_ROLES.map((role) => {
          const group = grouped[role];
          if (!group || group.length === 0) return null;
          return (
            <section key={role}>
              <SectionHeading title={role} tag={`${group.length} member${group.length > 1 ? "s" : ""}`} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {group.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    featured={role === "Principal Investigator"}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
