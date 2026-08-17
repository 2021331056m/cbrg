import Link from "next/link";
import { ExternalLink, Download, FileText } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Publication } from "@/types";

interface PublicationCardProps {
  publication: Publication;
}

export default function PublicationCard({ publication: pub }: PublicationCardProps) {
  return (
    <div className="bg-[#0A1628] border border-white/5 hover:border-[#00D4FF]/15 rounded-xl p-5 transition-all group">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 w-8 h-8 rounded-lg bg-[#0D4F6B]/30 flex-shrink-0 flex items-center justify-center">
          <FileText className="w-4 h-4 text-[#00D4FF]" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-semibold leading-snug mb-2 group-hover:text-[#00D4FF] transition-colors">
            {pub.title}
          </h3>

          {pub.authors && pub.authors.length > 0 && (
            <p className="text-gray-500 text-xs mb-2 truncate">
              {pub.authors.join(", ")}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2">
            {pub.journal_name && (
              <span className="text-gray-400 text-xs">{pub.journal_name}</span>
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
                className="text-xs text-[#00D4FF]/70 hover:text-[#00D4FF] transition-colors"
              >
                {pub.research_areas.title}
              </Link>
            )}
          </div>

          <div className="mt-3 flex items-center gap-3">
            {pub.doi_link && (
              <a
                href={pub.doi_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#00D4FF] transition-colors"
              >
                <ExternalLink className="w-3 h-3" /> DOI
              </a>
            )}
            {pub.pdf_url && (
              <a
                href={pub.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-[#00D4FF] transition-colors"
              >
                <Download className="w-3 h-3" /> PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
