"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, ExternalLink } from "lucide-react";
import { SITE_NAME, PRIMARY_NAV, SECONDARY_NAV } from "@/lib/constants";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const developerCredit = (
    <div className="mt-5 pt-4 border-t border-slate-700 text-center text-[11px] text-slate-300">
      Developed by <span className="font-medium text-slate-100">Maliha Nusrat</span>, <span className="font-medium text-slate-100">Mahmud Hasan Sifat</span>, <span className="font-medium text-slate-100">Najiha Yousuf and Mahabuba Sayra Silvia</span>
    </div>
  );

 
    

 if (pathname !== "/") {
    return (
      <footer className="bg-[#001835] text-slate-400 py-6 border-t border-slate-800 mt-auto text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {year} {SITE_NAME}. All rights reserved.</p>
          <p>Dept. of Biochemistry &amp; Molecular Biology, SUST, Bangladesh</p>
        </div>
        {developerCredit}
      </footer>
    );
  }
    

  return (
    <footer className="snap-section text-slate-200 border-t border-slate-800 mt-auto">
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

         
          <div className="h-full bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-extrabold text-[#002147] mb-4">
              About Us
            </h2>

            <p className="text-slate-600 text-sm leading-7">
              The Cancer Biology Research Group (CBRG) works to translate new
              discoveries in cancer biology into clinical practice. A central
              focus of our research is exploring the molecular mechanisms of
              cancer and translating genomic insights into better strategies
              for detection, prognosis, and treatment. Over time, we've also
              grown increasingly interested in theranostics, and what this
              approach could offer across diseases beyond oncology.
            </p>

            <p className="mt-4 text-slate-600 text-sm leading-7">
              We try to stay grounded in what truly matters for patients,
              working carefully and drawing on collaborators across different
              fields. Training the next generation of researchers is part of
              this work too. Our collective efforts are directed towards
              patient care that is more precise and better suited to the
              individual.
            </p>
          </div>

          
          <div className="h-full bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-extrabold text-[#002147] mb-4">
              Our Mission
            </h2>

            <p className="text-slate-600 text-sm leading-7">
              Our mission is to develop novel approaches to detect and treat
              cancer through rigorous molecular research, with a focus on
              translating promising discoveries from bench to bedside. We are
              committed to advancing theranostics as a bridge between
              diagnosis and therapy, while exploring its potential beyond
              oncology to improve precision medicine more broadly.
            </p>

            <p className="mt-4 text-slate-600 text-sm leading-7">
              Through careful, collaborative research and dedicated
              mentorship, we aim to build a strong pipeline of ideas and
              researchers that can contribute to meaningful discoveries in
              non-communicable disease research. Ultimately, our objective is
              to move beyond understanding disease at the molecular level and
              towards approaches that can make a real difference in patient
              care.
            </p>
          </div>

      
          <div className="h-full bg-white border border-slate-200 rounded-xl p-7 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-extrabold text-[#002147] mb-4">
              Our Vision
            </h2>

            <p className="text-slate-600 text-sm leading-7">
              To become a world-class research group from Bangladesh,
              recognized for rigorous, innovative, and clinically meaningful
              research in cancer biology, biomarkers, genomics, and
              theranostics.
            </p>

            <p className="mt-4 text-slate-600 text-sm leading-7">
              We envision a future where molecular and genomic knowledge can be
              translated into earlier detection, more accurate prognosis, more
              precise treatment, and truly individualized care. Through
              ambitious research, global collaboration, and continuous
              development of young scientists, we aim to contribute discoveries
              that extend beyond our laboratory and make a meaningful
              difference in healthcare.
            </p>
          </div>

        
      

          <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>© {year} {SITE_NAME}. All rights reserved.</p>
            <p>Dept. of Biochemistry &amp; Molecular Biology, SUST, Bangladesh</p>
          </div>
        {developerCredit}
      </div>
       
    </footer>
  );
}
