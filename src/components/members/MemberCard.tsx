"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, ExternalLink, User } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Member, MemberRole } from "@/types";

const roleVariant: Record<MemberRole, "accent" | "info" | "success" | "warning" | "neutral"> = {
  "Principal Investigator":       "accent",
  "Co-Investigator":              "info",
  "PhD Student":                  "success",
  "Masters Student":              "warning",
  "Research Assistant":           "neutral",
  "Undergraduate Research Trainee": "neutral",
};

interface MemberCardProps {
  member: Member;
  featured?: boolean;
}

export default function MemberCard({ member, featured = false }: MemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={`bg-white border border-slate-200 hover:border-[#0284C7] shadow-sm hover:shadow-md rounded-xl p-6 transition-all group ${
        featured ? "md:col-span-2 lg:col-span-3" : ""
      }`}
    >
      <div className={`flex ${featured ? "flex-col sm:flex-row" : "flex-col"} gap-5`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${featured ? "sm:w-28 sm:h-28" : "w-16 h-16"} relative`}>
          {member.photo_url ? (
            <Image
              src={member.photo_url}
              alt={member.name}
              width={featured ? 112 : 64}
              height={featured ? 112 : 64}
              className="rounded-full object-cover w-full h-full ring-2 ring-slate-200 group-hover:ring-[#0284C7] transition-all"
            />
          ) : (
            <div className={`${featured ? "w-28 h-28" : "w-16 h-16"} rounded-full bg-slate-100 flex items-center justify-center ring-2 ring-slate-200 group-hover:ring-[#0284C7] transition-all`}>
              <User className={`${featured ? "w-12 h-12" : "w-7 h-7"} text-[#0284C7]`} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5 mb-1">
            <h3 className={`text-[#0F172A] font-extrabold ${featured ? "text-xl" : "text-base"}`}>
              {member.name}
            </h3>
            <Badge variant={roleVariant[member.role]}>{member.role}</Badge>
          </div>

          {member.designation && (
            <p className="text-slate-700 text-sm font-semibold">{member.designation}</p>
          )}
          {member.department && (
            <p className="text-slate-500 text-xs mt-0.5">{member.department}</p>
          )}
            

          {member.research_interest && (
            
            <p className={`mt-3 text-slate-600 text-xs leading-relaxed ${featured ? "" : "line-clamp-2"}`}>Research Interest: </p>
            <p>
              {member.research_interest}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-4">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                <span>{member.email}</span>
              </a>
            )}
            {member.scholar_link && (
              <a
                href={member.scholar_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
              >
                <ExternalLink className="w-3 h-3 text-[#0284C7]" /> Google Scholar
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
