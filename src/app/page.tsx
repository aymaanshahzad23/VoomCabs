import { FaqAccordion } from "@/components/landing/FaqAccordion";
import { SignalVisualization } from "@/components/landing/SignalVisualization";
import { TerminalWidget } from "@/components/landing/TerminalWidget";
import { VoomLogo } from "@/components/landing/VoomLogo";
import { WaitlistForm } from "@/components/landing/WaitlistForm";

const steps = [
  {
    number: "01",
    title: "Enter Route",
    body: "Add pickup and destination once. No app-hopping.",
  },
  {
    number: "02",
    title: "Compare Fares & ETAs",
    body: "See live provider prices and arrival times in one grid.",
  },
  {
    number: "03",
    title: "Pick Best Ride",
    body: "Choose by savings, ETA confidence, and route signal.",
  },
];

const stackItems = [
  {
    title: "UNIFIED FARE SIGNAL",
    body: "Live weighted fare stream across providers with fast refresh intervals.",
  },
  {
    title: "ETA CONFIDENCE LAYER",
    body: "ETA reliability scoring to avoid misleading short-term spikes.",
  },
  {
    title: "DECISION CLARITY",
    body: "Price and time metrics collapse into one obvious recommendation.",
  },
  {
    title: "LIVE CITY PULSE",
    body: "Signal density shifts with demand pressure and route intensity.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0EDE8]">
      <header className="sticky top-0 z-50 border-b border-[#F5A623] bg-[rgb(10_10_10_/_90%)] backdrop-blur-[12px]">
        <nav className="container-page flex items-center justify-between py-3">
          <VoomLogo compact />
          <a
            href="#waitlist"
            className="rounded-[2px] bg-[#F5A623] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-black transition duration-150 ease-out hover:brightness-110 hover:-translate-y-px"
          >
            Join waitlist
          </a>
        </nav>
      </header>

      <main>
        <section className="container-page pt-12">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div
                className="fade-up inline-flex rounded-full border border-[#F5A623] bg-[rgb(245_166_35_/_12%)] px-3 py-1 text-[11px] tracking-[0.13em] text-[#F5A623]"
                style={{ animationDelay: "0ms" }}
              >
                LAUNCHING IN MAJOR INDIAN CITIES
              </div>
              <h1
                className="headline-display fade-up mt-5 text-[68px] text-[#F0EDE8] sm:text-[96px]"
                style={{ animationDelay: "100ms" }}
              >
                ONE SCREEN. EVERY FARE. INSTANTLY.
              </h1>
              <p
                className="fade-up mt-4 max-w-xl text-[14px] leading-7 text-[#7A7A7A]"
                style={{ animationDelay: "200ms" }}
              >
                VOOM compares live fares and ETAs across Ola, Uber, Rapido - so
                the best ride is always obvious.
              </p>
              <div
                className="fade-up mt-6 space-y-2 text-[13px] text-[#F0EDE8]"
                style={{ animationDelay: "300ms" }}
              >
                <p>
                  <span className="mr-2 text-[#F5A623]">&gt;</span> Live fare and
                  ETA comparison in one frame
                </p>
                <p>
                  <span className="mr-2 text-[#F5A623]">&gt;</span> Confidence-led
                  routing signal before booking
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="relative translate-y-8">
                <TerminalWidget />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 border-y border-[#222222]">
          <div className="overflow-x-auto">
            <div className="container-page grid min-w-[760px] grid-cols-3 divide-x divide-[#222222]">
              <article className="py-5">
                <p className="section-label">live comparison refresh</p>
                <p className="headline-display mt-1 text-6xl text-[#F0EDE8]">&lt; 10s</p>
              </article>
              <article className="py-5 pl-4">
                <p className="section-label">than switching between apps</p>
                <p className="headline-display mt-1 text-6xl text-[#F0EDE8]">3x Faster</p>
              </article>
              <article className="py-5 pl-4">
                <p className="section-label">for early waitlist users</p>
                <p className="headline-display mt-1 text-6xl text-[#F0EDE8]">Priority</p>
              </article>
            </div>
          </div>
        </section>

        <section className="container-page py-32">
          <p className="section-label">HOW IT WORKS</p>
          <h2 className="headline-display mt-4 text-6xl text-[#F0EDE8] sm:text-7xl">
            A CLEANER WAY TO CHOOSE YOUR RIDE
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article key={step.number} className="surface-card relative overflow-hidden p-5">
                <span className="headline-display absolute right-3 top-0 text-7xl text-[#F5A623] opacity-12">
                  {step.number}
                </span>
                <h3 className="headline-display relative z-10 text-4xl text-[#F0EDE8]">
                  {step.title}
                </h3>
                <p className="relative z-10 mt-2 text-xs leading-6 text-[#7A7A7A]">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="container-page py-32">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="section-label">FARE INTELLIGENCE STACK</p>
              <h2 className="headline-display mt-4 text-6xl text-[#F0EDE8] sm:text-7xl">
                A CONTINUOUS DECISION SYSTEM
              </h2>
              <div className="mt-8 border-t border-[#222222]">
                {stackItems.map((item) => (
                  <article key={item.title} className="border-b border-[#222222] py-4">
                    <h3 className="text-[13px] font-semibold text-[#F0EDE8]">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs leading-6 text-[#7A7A7A]">{item.body}</p>
                  </article>
                ))}
              </div>
            </div>
            <SignalVisualization />
          </div>
        </section>

        <section className="container-page py-32">
          <p className="section-label">WHY VOOM</p>
          <h2 className="headline-display mt-4 text-6xl text-[#F0EDE8] sm:text-7xl">
            PRECISION-FIRST, PREMIUM EXPERIENCE
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              {
                title: "REAL-TIME DATA",
                body: "No screenshots or guesswork. Signals update with every refresh cycle.",
                icon: (
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M3 17h4V7H3v10Zm7 0h4V3h-4v14Zm7 0h4v-8h-4v8Z" fill="#F5A623" />
                  </svg>
                ),
              },
              {
                title: "TRANSPARENT COMPARISON",
                body: "Know which provider wins on price and ETA right now.",
                icon: (
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M2 12h20M12 2v20" stroke="#F5A623" strokeWidth="2" />
                  </svg>
                ),
              },
              {
                title: "BUILT FOR SPEED",
                body: "Fewer tabs, faster decisions, cleaner booking execution.",
                icon: (
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path d="M4 12h9M13 7l7 5-7 5" stroke="#F5A623" strokeWidth="2" />
                  </svg>
                ),
              },
            ].map((item) => (
              <article key={item.title} className="surface-card p-5">
                {item.icon}
                <h3 className="headline-display mt-3 text-4xl text-[#F0EDE8]">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-6 text-[#7A7A7A]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="relative border-y border-[#222222] bg-[#111111] py-28">
          <div className="grain-overlay" />
          <div className="container-page relative">
            <h2 className="headline-display text-6xl text-[#F0EDE8] sm:text-7xl">
              BE FIRST IN LINE
            </h2>
            <p className="mt-3 max-w-2xl text-xs leading-7 text-[#7A7A7A]">
              Join before launch to get priority city unlocks and early feature
              access for VOOM&apos;s first signal rollout.
            </p>
            <p className="mt-5 inline-flex border border-[#F5A623] px-3 py-2 text-[11px] text-[#F5A623]">
              REFERRAL TOOLS AND SHAREABLE INVITES COMING NEXT
            </p>
          </div>
        </section>

        <section id="waitlist" className="container-page py-32">
          <p className="section-label">JOIN THE PRIVATE BETA</p>
          <h2 className="headline-display mt-4 text-6xl text-[#F0EDE8] sm:text-7xl">
            WAITLIST ACCESS
          </h2>
          <p className="mt-3 max-w-2xl text-xs leading-7 text-[#7A7A7A]">
            Get city-first access to VOOM&apos;s live fare engine and launch alerts.
          </p>
          <WaitlistForm />
        </section>

        <section className="container-page py-24">
          <p className="section-label">FREQUENTLY ASKED QUESTIONS</p>
          <h2 className="headline-display mt-4 text-6xl text-[#F0EDE8] sm:text-7xl">
            QUESTIONS ANSWERED
          </h2>
          <FaqAccordion />
        </section>
      </main>

      <footer className="border-t border-[#222222] py-8">
        <div className="container-page flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <VoomLogo />
            <p className="mt-2 text-[11px] tracking-[0.15em] text-[#7A7A7A] uppercase">
              Cabs Made Easy
            </p>
          </div>
          <div className="text-[11px] text-[#7A7A7A]">
            <p>Contact: voomcab@gmail.com</p>
            <p>Privacy policy and terms coming soon.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
