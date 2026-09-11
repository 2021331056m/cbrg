import { createClient } from "@/lib/supabase/server";
import HeroSection from "@/components/home/HeroSection";
import StatsCounter from "@/components/home/StatsCounter";
import LatestNews from "@/components/home/LatestNews";
import type { NewsFeed } from "@/types";

export const revalidate = 3600;

export default async function HomePage() {
  const supabase = await createClient();

  const [
    { count: pubCount },
    { count: projectCount },
    { count: memberCount },
    { data: news },
  ] = await Promise.all([
    supabase.from("publications").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("status", "Ongoing"),
    supabase
      .from("members")
      .select("*", { count: "exact", head: true })
      .eq("is_alumni", false),
    supabase
      .from("news_feeds")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(6),
  ]);

  return (
    <>
      <HeroSection />
      <StatsCounter
        publications={pubCount ?? 0}
        projects={projectCount ?? 0}
        members={memberCount ?? 0}
      />
      <LatestNews items={(news as NewsFeed[]) ?? []} />
      <div className="max-w-6xl mx-auto px-4 py-16">
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

        </div>
      </div>

    </>
  );
}
