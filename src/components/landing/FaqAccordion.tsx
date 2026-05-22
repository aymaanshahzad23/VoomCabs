"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "When is VOOM launching?",
    a: "We are launching in phases across major Indian cities. Waitlist users will get first access by city rollout.",
  },
  {
    q: "Which apps will VOOM compare?",
    a: "VOOM is built for real-time comparisons across Ola, Uber, Rapido, and other major providers.",
  },
  {
    q: "Do I need to pay to join the waitlist?",
    a: "No. Joining the waitlist is completely free.",
  },
  {
    q: "Will VOOM store my contact details securely?",
    a: "Yes. Your details are only used for launch updates, rollout notices, and early access communication.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-8 border-t border-[#222222]">
      {FAQS.map((item, index) => {
        const isOpen = open === index;
        return (
          <article key={item.q} className="border-b border-[#222222]">
            <button
              type="button"
              className="flex w-full items-center justify-between py-5 text-left"
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span className="text-sm text-[#F0EDE8]">{item.q}</span>
              <span className="text-lg text-[#F5A623]">{isOpen ? "-" : "+"}</span>
            </button>
            <div className="faq-content" style={{ maxHeight: isOpen ? 140 : 0 }}>
              <p className="pb-5 text-xs leading-6 text-[#7A7A7A]">{item.a}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
