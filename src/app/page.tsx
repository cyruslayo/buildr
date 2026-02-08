import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Navbar } from '@/components/navigation/navbar';
import { Footer } from '@/components/navigation/footer';
import { Testimonials } from '@/components/marketing/testimonials';
import { EmailCapture } from '@/components/marketing/email-capture';
import { PRICING_TIERS } from '@/lib/payments/paystack';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-slate-900">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/5 via-transparent to-amber-500/10 pointer-events-none" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 border border-slate-200/70 rounded-full text-xs font-mono uppercase tracking-widest text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  Built for Nigerian real estate trust
                </div>

                <h1 className="mt-6 font-display text-5xl lg:text-6xl tracking-tight">
                  Create premium property landing pages that convert WhatsApp clicks into buyers.
                </h1>

                <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Templates, Naira pricing, trust signals, and fast mobile performance — designed for how property is actually sold in Nigeria.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Link
                    href="/register"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-900 text-[#FDFBF7] font-bold uppercase tracking-widest text-sm hover:bg-emerald-800 transition-all hover:gap-3 shadow-lg shadow-emerald-900/20"
                  >
                    Start Building
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/wizard"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold uppercase tracking-widest text-sm hover:border-emerald-300 hover:text-emerald-800 transition-colors"
                  >
                    Try the Wizard
                    <Zap className="w-4 h-4" />
                  </Link>
                </div>

                <div className="mt-10">
                  <EmailCapture />
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 rounded-2xl blur-lg" />
                  <div className="relative bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
                    <div className="text-xs font-mono uppercase tracking-widest text-slate-500">What you get</div>
                    <ul className="mt-6 space-y-4 text-slate-700">
                      <li className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-emerald-600" />
                        <span>Premium templates tuned for Nigerian buyers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-emerald-600" />
                        <span>WhatsApp-first CTAs and trust signals (RC, verified badge)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-emerald-600" />
                        <span>Fast mobile performance (PWA + offline support)</span>
                      </li>
                    </ul>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                      <div className="rounded-xl border border-slate-200 p-4 bg-[#FDFBF7]">
                        <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">Time to publish</div>
                        <div className="mt-2 font-display text-2xl">Minutes</div>
                      </div>
                      <div className="rounded-xl border border-slate-200 p-4 bg-[#FDFBF7]">
                        <div className="text-xs text-slate-500 font-mono uppercase tracking-widest">Designed for</div>
                        <div className="mt-2 font-display text-2xl">Nigeria</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="templates" className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Templates</div>
              <h2 className="mt-3 font-display text-3xl lg:text-4xl tracking-tight">Choose a look. Build trust fast.</h2>
              <p className="mt-4 text-slate-600 max-w-2xl">
                Start from an art-directed template and publish a page that looks expensive — without paying ₦150k to a developer.
              </p>
            </div>
            <Link
              href="/wizard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-slate-800 transition-colors"
            >
              Browse in Wizard
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Luxury listing</div>
              <div className="mt-3 font-display text-2xl">Ikoyi & Banana Island style</div>
              <p className="mt-3 text-slate-600">High-end layout with premium typography and gallery-first storytelling.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Standard listing</div>
              <div className="mt-3 font-display text-2xl">Lekki family-ready</div>
              <p className="mt-3 text-slate-600">Clean, conversion-first structure for duplex, terrace, and apartments.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Land & estate</div>
              <div className="mt-3 font-display text-2xl">Plots, estates, and off-plan</div>
              <p className="mt-3 text-slate-600">Sell documentation, location, and investment thesis with clarity.</p>
            </div>
          </div>
        </section>

        <Testimonials />

        <section id="pricing" className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-slate-500">Pricing</div>
            <h2 className="mt-3 font-display text-3xl lg:text-4xl tracking-tight">Simple pricing in Naira.</h2>
            <p className="mt-4 text-slate-600">Start small. Upgrade when you’re closing more deals.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(PRICING_TIERS).map(([key, plan]) => (
              <div key={key} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="text-xs font-mono uppercase tracking-widest text-slate-500">{plan.name}</div>
                <div className="mt-4 font-display text-4xl">₦{plan.amountNaira.toLocaleString('en-NG')}</div>
                <div className="mt-1 text-sm text-slate-500">per month</div>
                <ul className="mt-6 space-y-3 text-slate-700">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-2 w-2 h-2 rounded-full bg-emerald-600" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link
                    href="/register"
                    className="inline-flex w-full items-center justify-center gap-2 px-6 py-3 bg-emerald-900 text-[#FDFBF7] text-sm font-bold uppercase tracking-widest hover:bg-emerald-800 transition-colors"
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <div className="rounded-3xl bg-slate-900 text-white overflow-hidden">
            <div className="px-8 py-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7">
                <h2 className="font-display text-3xl lg:text-4xl tracking-tight">Ship a page today. Close faster tomorrow.</h2>
                <p className="mt-4 text-slate-300 leading-relaxed">Buildr gives you the structure, design, and trust signals. You bring the property.</p>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end">
                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-emerald-900 font-bold uppercase tracking-widest text-sm hover:bg-emerald-50 transition-colors"
                >
                  Start Building
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-slate-700 text-white font-bold uppercase tracking-widest text-sm hover:border-slate-500 transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
