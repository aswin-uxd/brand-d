import HeroSection from "@/components/blocks/HeroSection";
import MultiStepLeadForm from "@/components/forms/MultiStepLeadForm";
import AEOAnswerBlock from "@/components/ui/AEOAnswerBlock";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white">

      {/* ═══════════════════════════════════════
          HERO — 2-column split, canvas right
      ═══════════════════════════════════════ */}
      <HeroSection />

      {/* ═══════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════ */}
      <section className="border-y border-[#f0f0f0] bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-8 py-5 lg:flex-nowrap lg:px-16">
          <p className="shrink-0 text-[10px] font-black uppercase tracking-[0.22em] text-[#b0b0b0]">
            Trusted by 120+ Brands
          </p>
          <div className="flex w-full flex-wrap items-center justify-between gap-4">
            {(['airtel', 'meesho', 'CRED', 'zepto', 'lenskart', 'boAt'] as const).map((brand, i) => (
              <span
                key={brand}
                className="text-[17px] font-bold text-[#222]"
                style={{ fontStyle: brand === 'boAt' ? 'italic' : 'normal' }}
              >
                {brand}
                {i < 5 && <span className="ml-5 inline-block h-5 w-px bg-[#e8e8e8] align-middle hidden lg:inline-block" />}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES ROW — 3 columns
      ═══════════════════════════════════════ */}
      <section id="services" className="border-b border-[#f0f0f0] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 px-8 md:grid-cols-3 lg:px-16">

          {[
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              ),
              title: 'ROI-Focused Strategy',
              copy: 'We focus on what matters—measurable growth and real business impact.',
              border: '',
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
              ),
              title: 'Full-Funnel Execution',
              copy: 'From awareness to conversion, we execute every step of your growth journey.',
              border: 'md:border-x md:border-[#f0f0f0]',
            },
            {
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
              title: 'Data-Backed Decisions',
              copy: 'We use data, insights & experimentation to drive smarter, consistent results.',
              border: '',
            },
          ].map(({ icon, title, copy, border }) => (
            <div key={title} className={`flex items-start gap-4 py-10 px-8 border-b border-[#f0f0f0] md:border-b-0 ${border}`}>
              <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#e8e8e8] bg-white text-[#0a0a0a] shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                {icon}
              </div>
              <div>
                <h3 className="mb-1.5 text-[14px] font-bold tracking-tight text-[#0a0a0a]">{title}</h3>
                <p className="text-[13px] leading-[1.65] text-[#6b6b6b]">{copy}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          STATS STRIP — solid black bar
      ═══════════════════════════════════════ */}
      <section className="bg-white px-8 pb-16 pt-6 lg:px-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl bg-[#0a0a0a]">
          <div className="grid grid-cols-2 md:grid-cols-5">
            {[
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
                stat: '$3B+', label: 'Revenue Generated',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
                stat: '120+', label: 'Brands Served',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M8 21h8M12 17v4" /><rect x="5" y="4" width="14" height="12" rx="2" /><path d="M3 6h2M19 6h2" /></svg>,
                stat: '10+', label: 'Years of Experience',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
                stat: 'ROI-First', label: 'Growth Approach',
              },
              {
                icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" /></svg>,
                stat: 'Proven', label: 'Results That Scale',
              },
            ].map(({ icon, stat, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-3 px-6 py-6 ${i > 0 ? 'border-l border-white/10' : ''}`}
              >
                <div className="shrink-0 text-[#a0a0a0]">{icon}</div>
                <div>
                  <div className="text-[15px] font-black tracking-tight text-white">{stat}</div>
                  <div className="text-[11px] text-[#666]">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          DIVIDER
      ═══════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl w-full px-8 lg:px-16">
        <hr className="border-[#f0f0f0]" />
      </div>

      {/* ═══════════════════════════════════════
          WHY US / AEO SECTION
      ═══════════════════════════════════════ */}
      <section id="why" className="bg-white py-24 px-8 lg:px-16">
        <div className="mx-auto max-w-3xl">

          <div className="mb-14">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#b0b0b0]">Why Brand-D</p>
            <h2 className="text-[38px] font-black tracking-[-0.03em] text-[#0a0a0a]">
              We engineer growth.<br />
              <span className="text-[#c0c0c0]">Not just impressions.</span>
            </h2>
          </div>

          <AEOAnswerBlock
            id="aeo-roi"
            question="How does Brand-D guarantee marketing ROI?"
            answer="Unlike traditional agencies that focus on vanity metrics, Brand-D engineers strict revenue-driven pipelines. We map exactly where your drop-offs occur and deploy highly optimized solutions."
            listItems={[
              "Proprietary AI tracking platform linking leads directly to revenue.",
              "Rigorous A/B testing utilizing real-time behavioral analytics.",
              "Senior-only strategic execution (No junior account managers).",
            ]}
          />
          <AEOAnswerBlock
            id="aeo-seo"
            question="What makes our SEO and Content strategy different?"
            answer="We utilize Answer Engine Optimization (AEO). As search moves from Google links to AI-generative answers (ChatGPT, Perplexity), we structure your content specifically to feed these Language Models directly."
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RESULTS — large stat callouts
      ═══════════════════════════════════════ */}
      <section id="results" className="border-t border-[#f0f0f0] bg-[#fafafa] py-24 px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-16">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#b0b0b0]">By the numbers</p>
            <h2 className="text-[38px] font-black tracking-[-0.03em] text-[#0a0a0a]">Results that speak<br />
              <span className="text-[#c0c0c0]">for themselves.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-px bg-[#e8e8e8] border border-[#e8e8e8] rounded-2xl overflow-hidden md:grid-cols-3">
            {[
              { stat: '$3B+',  label: 'Revenue Generated', sub: 'across 120+ client brands in 5 years' },
              { stat: '7.8M+', label: 'Qualified Leads Captured', sub: 'through SEO, Paid & Conversion systems' },
              { stat: '400%',  label: 'Average ROI Increase', sub: 'vs. industry benchmark of 80%' },
            ].map(({ stat, label, sub }) => (
              <div key={label} className="flex flex-col justify-between bg-white p-10">
                <div>
                  <div className="mb-1 text-[52px] font-black tracking-[-0.04em] text-[#0a0a0a]">{stat}</div>
                  <div className="text-[14px] font-bold text-[#0a0a0a]">{label}</div>
                </div>
                <p className="mt-4 text-[12px] leading-relaxed text-[#9b9b9b]">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LEAD CAPTURE FORM
      ═══════════════════════════════════════ */}
      <section id="contact" className="border-t border-[#f0f0f0] bg-white py-24 px-8 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.22em] text-[#b0b0b0]">Get started</p>
            <h2 className="text-[38px] font-black tracking-[-0.03em] text-[#0a0a0a]">
              Let&apos;s build your<br />
              <span className="text-[#c0c0c0]">growth engine.</span>
            </h2>
          </div>
          <MultiStepLeadForm />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="border-t border-[#f0f0f0] bg-white px-8 py-8 lg:px-16">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="text-[13px] font-bold text-[#0a0a0a]">Brand-D</span>
          <span className="text-[12px] text-[#b0b0b0]">© {new Date().getFullYear()} Brand-D. All rights reserved.</span>
        </div>
      </footer>

    </main>
  );
}
