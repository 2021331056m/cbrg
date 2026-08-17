import Link from "next/link";
import { ExternalLink, Download, FileText } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Publication } from "@/types";

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication: pub }: PublicationCardProps) {
  return (
    <div className="bg-white border border-slate-200 hover:border-[#0284C7] rounded-xl p-5 shadow-xs hover:shadow-md transition-all group">
      <div className="flex items-start gap-3.5">
        <div className="mt-0.5 w-9 h-9 rounded-lg bg-[#0284C7]/10 flex-shrink-0 flex items-center justify-center">
          <FileText className="w-4.5 h-4.5 text-[#0284C7]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[#0F172A] text-base font-bold leading-snug mb-1.5 group-hover:text-[#0284C7] transition-colors">
            {pub.title}
          </h3>

          {pub.authors && pub.authors.length > 0 && (
            <p className="text-slate-600 text-xs mb-2.5 truncate font-medium">
              {pub.authors.join(", ")}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {pub.journal_name && (
              <span className="text-slate-700 text-xs font-semibold">{pub.journal_name}</span>
            )}
            {pub.impact_factor && (
              <Badge variant="info">IF: {pub.impact_factor}</Badge>
            )}
            {pub.year && (
              <Badge variant="neutral">{pub.year}</Badge>
            )}
            {pub.research_areas && (
              <Link
                href={`/research/${pub.research_areas.slug}`}
                className="text-xs font-semibold text-[#0284C7] hover:underline"
              >
                {pub.research_areas.title}
              </Link>
            )}
          </div>

          <div className="mt-3.5 flex items-center gap-4 border-t border-slate-100 pt-3">
            {pub.doi_link && (
              <a
                href={pub.doi_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#0284C7]" /> DOI Link
              </a>
            )}
            {pub.pdf_url && (
              <a
                href={pub.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0284C7] transition-colors"
              >
                <Download className="w-3.5 h-3.5 text-[#0284C7]" /> Download PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
