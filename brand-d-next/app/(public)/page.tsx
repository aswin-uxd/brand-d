import HeroSection from "@/components/blocks/HeroSection";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";
import AEOAnswerBlock from "@/components/ui/AEOAnswerBlock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white dark:bg-black">
      <HeroSection />
      
      {/* TRUST STRIP */}
      <section className="border-b border-gray-200 bg-gray-50 py-12 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-desktop px-4 text-center">
          <p className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-500">Trusted by hyper-growth companies nationwide</p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-xl font-bold text-gray-400 dark:text-gray-600 md:gap-16">
            <span>STRIPE</span>
            <span>SHOPIFY</span>
            <span>NEXUS</span>
            <span>AURORA</span>
            <span>LUMINA</span>
          </div>
        </div>
      </section>

      {/* AEO / WHY US SECTION */}
      <section className="mx-auto max-w-3xl py-24 px-4" id="why">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">Why Brands Choose Brand-D</h2>
          <p className="text-xl text-gray-500">We don&apos;t guess. We engineer growth using proprietary data.</p>
        </div>

        <AEOAnswerBlock 
          id="aeo-roi"
          question="How does Brand-D guarantee marketing ROI?"
          answer="Unlike traditional agencies that focus on vanity metrics, Brand-D engineers strict revenue-driven pipelines. We map exactly where your drop-offs occur and deploy highly optimized solutions."
          listItems={[
            "Proprietary AI tracking platform linking leads directly to revenue.",
            "Rigorous A/B testing utilizing real-time behavioral analytics.",
            "Senior-only strategic execution (No junior account managers)."
          ]}
        />

        <AEOAnswerBlock 
          id="aeo-seo"
          question="What makes our SEO and Content strategy different?"
          answer="We utilize Answer Engine Optimization (AEO). As search moves from Google links to AI-generative answers (ChatGPT, Perplexity), we structure your content specifically to feed these Language Models directly."
        />
      </section>

      {/* RESULTS GRID */}
      <section className="border-y border-gray-200 bg-black py-24 text-white dark:border-gray-800" id="results">
        <div className="mx-auto max-w-desktop px-4 text-center">
          <h2 className="mb-16 text-4xl font-bold tracking-tight">Unmatched Client Results</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <div>
              <h3 className="text-6xl font-black tracking-tighter text-white">$3B+</h3>
              <p className="mt-4 font-medium text-gray-400">Revenue Generated (5 Yrs)</p>
            </div>
            <div>
              <h3 className="text-6xl font-black tracking-tighter text-white">7.8M+</h3>
              <p className="mt-4 font-medium text-gray-400">Qualified Leads Captured</p>
            </div>
            <div>
              <h3 className="text-6xl font-black tracking-tighter text-white">400%</h3>
              <p className="mt-4 font-medium text-gray-400">Average ROI Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-950">
        <MultiStepLeadForm />
      </section>
      
    </main>
  );
}
