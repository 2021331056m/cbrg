"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import PublicationCard from "./PublicationCard";
import type { Publication, ResearchArea } from "@/types";

interface PublicationListProps {
  publications: Publication[];
  researchAreas: ResearchArea[];
}

export default function PublicationList({ publications, researchAreas }: PublicationListProps) {
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [topicFilter, setTopicFilter] = useState("");

  const years = useMemo(() => {
    const unique = [...new Set(publications.map((p) => p.year).filter(Boolean))] as number[];
    return unique.sort((a, b) => b - a);
  }, [publications]);

  const filtered = useMemo(() => {
    return publications.filter((pub) => {
      if (search) {
        const q = search.toLowerCase();
        const inTitle = pub.title.toLowerCase().includes(q);
        const inAuthors = pub.authors?.some((a) => a.toLowerCase().includes(q)) ?? false;
        const inJournal = pub.journal_name?.toLowerCase().includes(q) ?? false;
        if (!inTitle && !inAuthors && !inJournal) return false;
      }
      if (yearFilter && String(pub.year) !== yearFilter) return false;
      if (topicFilter && pub.topic_category !== topicFilter) return false;
      return true;
    });
  }, [publications, search, yearFilter, topicFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, author, journal…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all shadow-xs"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg pl-10 pr-8 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all appearance-none cursor-pointer shadow-xs"
          >
            <option value="">All Years</option>
            {years.map((y) => (
              <option key={y} value={String(y)}>{y}</option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-700 font-medium focus:outline-none focus:border-[#0284C7] focus:ring-1 focus:ring-[#0284C7] transition-all appearance-none cursor-pointer shadow-xs"
          >
            <option value="">All Topics</option>
            {researchAreas.map((area) => (
              <option key={area.id} value={area.id}>{area.title}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500 font-medium mb-5">
        Showing {filtered.length} of {publications.length} publications
      </p>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-slate-500 font-medium">No publications match your search criteria.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      )}
    </div>
  );
}
