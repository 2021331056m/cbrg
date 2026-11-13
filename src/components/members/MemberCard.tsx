"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, X } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Member, MemberRole } from "@/types";
import { withBasePath } from "@/lib/utils";

const roleVariant: Record<MemberRole, "accent" | "info" | "success" | "warning" | "neutral"> = {
  "Principal Investigator":       "accent",
  "Co-Investigator":              "info",
  "PhD Student":                  "success",
  "Masters Student":              "warning",
  "Research Assistant":           "neutral",
  "Undergraduate Research Trainee": "neutral",
  "MS Researcher":"warning",
};

interface MemberCardProps {
  member: Member;
  featured?: boolean;
}

export default function MemberCard({ member, featured = false }: MemberCardProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleOpen = () => {
    if (member.profile_link) {
      window.open(member.profile_link, "_blank", "noopener,noreferrer");
    } else {
      setOpen(true);
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => e.key === "Enter" && handleOpen()}
        className={`h-full cursor-pointer bg-white border border-slate-200 hover:border-[#0284C7] shadow-sm hover:shadow-md rounded-xl p-6 transition-all group ${
          featured ? "md:col-span-2 lg:col-span-3" : ""
        }`}
      >
        <div className={`flex ${featured ? "flex-col sm:flex-row" : "flex-col"} gap-5`}>
          {/* Avatar */}
          <div className={`flex-shrink-0 ${featured ? "sm:w-28 sm:h-28" : "w-16 h-16"} relative`}>
            {member.photo_url ? (
              <Image
                src={withBasePath(member.photo_url)}
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

            {member.undergraduate_research && (
              <>
                <p className="mt-3 text-slate-600 text-xs leading-relaxed">
                  Undergraduate Research Project:
                </p>
                <p className="text-slate-700 text-xs font-semibold line-clamp-3">
                  {member.undergraduate_research}
                </p>
              </>
            )}

            {member.research_interest && (
              <>
                {member.role !== "Principal Investigator" && (
                  <p className="mt-3 text-slate-600 text-xs leading-relaxed">
                    Research Interest:
                  </p>
                )}
                <p className="text-slate-700 text-xs font-semibold line-clamp-3">
                  {member.research_interest}
                </p>
              </>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-4">
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#0284C7]" />
                  <span>{member.email}</span>
                </a>
              )}
              {member.linkedin_link && (
                <a
                  href={member.linkedin_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
                >
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-[#0284C7]" fill="currentColor" aria-hidden="true">
                    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45z" />
                  </svg>
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
                className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 10 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 10 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-8"
                >
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close"
                    className="absolute top-4 right-4 p-1.5 rounded-full text-slate-500 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-wrap items-center gap-3 pr-8">
                    <h3 className="text-xl font-extrabold text-[#0F172A]">{member.name}</h3>
                    <Badge variant={roleVariant[member.role]}>{member.role}</Badge>
                  </div>

                  {member.designation && (
                    <p className="mt-3 text-slate-700 text-sm font-semibold">{member.designation}</p>
                  )}
                  {member.department && (
                    <p className="text-slate-500 text-sm">{member.department}</p>
                  )}

                  {member.undergraduate_research && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Undergraduate Research Project
                      </p>
                      <p className="mt-1 text-slate-800 text-sm font-semibold">
                        {member.undergraduate_research}
                      </p>
                    </div>
                  )}

                  {member.research_interest && (
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Research Interest
                      </p>
                      <p className="mt-1 text-slate-800 text-sm font-semibold">
                        {member.research_interest}
                      </p>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}