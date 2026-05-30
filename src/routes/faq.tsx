import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import about from "@/assets/about.png"; // Re-using a nice hero image for FAQ
import { ChevronDown } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "FAQ — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Frequently Asked Questions about our classes, therapies, retreats, and certification courses." },
    ],
  }),
});

function FAQPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Finding clarity on your path to holistic wellness and transformation."
        bg={about}
      />
      <FAQSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function FAQSection() {
  const items = [
    { q: "Do beginners join your yoga classes?", a: "Yes. Our sessions are beginner friendly and suitable for all experience levels." },
    { q: "Do you offer personalized sessions?", a: "Yes. We provide personalized yoga and wellness guidance based on individual goals and needs." },
    { q: "Are online classes available internationally?", a: "Yes. Students from different countries can join our online wellness sessions." },
    { q: "Do you conduct retreats?", a: "Yes. We organize yoga and wellness retreats focused on healing, relaxation, mindfulness, and personal transformation." },
    { q: "Do you provide certificate courses?", a: "Yes. We offer wellness and massage certification training programs." },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">KNOWLEDGE BASE</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">Questions, <em className="text-gold-gradient not-italic">answered</em>.</h2>
        </div>
        <div className="space-y-4">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div key={it.q} className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : idx)} className="w-full flex items-center justify-between gap-4 p-6 text-left">
                  <span className="font-display text-lg md:text-xl text-emerald-deep">{it.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">{it.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
