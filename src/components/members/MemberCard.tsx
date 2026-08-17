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
      className={`bg-[#0A1628] border border-white/5 hover:border-[#00D4FF]/20 rounded-xl p-6 transition-all group ${
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
              className="rounded-full object-cover w-full h-full ring-2 ring-[#0D4F6B]/40 group-hover:ring-[#00D4FF]/30 transition-all"
            />
          ) : (
            <div className={`${featured ? "w-28 h-28" : "w-16 h-16"} rounded-full bg-[#0D4F6B]/30 flex items-center justify-center ring-2 ring-[#0D4F6B]/20 group-hover:ring-[#00D4FF]/20 transition-all`}>
              <User className={`${featured ? "w-12 h-12" : "w-7 h-7"} text-[#0D4F6B]`} />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-start gap-2 mb-1">
            <h3 className={`text-white font-bold ${featured ? "text-xl" : "text-base"}`}>
              {member.name}
            </h3>
            <Badge variant={roleVariant[member.role]}>{member.role}</Badge>
          </div>

          {member.designation && (
            <p className="text-gray-400 text-sm">{member.designation}</p>
          )}
          {member.department && (
            <p className="text-gray-600 text-xs mt-0.5">{member.department}</p>
          )}

          {member.research_interest && (
            <p className={`mt-3 text-gray-500 text-sm leading-relaxed ${featured ? "" : "line-clamp-2"}`}>
              {member.research_interest}
            </p>
          )}

          <div className="mt-4 flex items-center gap-4">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#00D4FF] transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{member.email}</span>
              </a>
            )}
            {member.scholar_link && (
              <a
                href={member.scholar_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#00D4FF] transition-colors"
              >
                <ExternalLink className="w-3 h-3" /> Google Scholar
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
