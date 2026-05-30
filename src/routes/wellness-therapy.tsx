import { createFileRoute } from "@tanstack/react-router";
import therapy from "@/assets/therapy.jpg";
import { Hand, Wind, Mountain, Leaf, Sun, Flower2, ArrowRight } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";

export const Route = createFileRoute("/wellness-therapy")({
  component: WellnessTherapyPage,
  head: () => ({
    meta: [
      { title: "Wellness Therapy — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Experience healing therapies including Thai Yoga Massage, Shiatsu, Ayurveda, and more." },
    ],
  }),
});

function WellnessTherapyPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Wellness Therapy"
        subtitle="Therapeutic touch, refined into authentic healing rituals for body and soul."
        bg={therapy}
      />
      <TherapiesGrid />
      <TherapyCTA />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function TherapiesGrid() {
  const items = [
    { icon: Hand, t: "Thai Yoga Massage", d: "Assisted stretching and rhythmic compressions for flexibility and energy flow." },
    { icon: Wind, t: "Shiatsu Therapy", d: "Traditional Japanese pressure-point therapy along the body’s energy pathways." },
    { icon: Mountain, t: "Deep Tissue Therapy", d: "Focused treatment to release chronic muscular tension and fascial restrictions." },
    { icon: Leaf, t: "Ayurvedic Wellness Massage", d: "Traditional therapy utilizing herbal oils to support circulation and rejuvenation." },
    { icon: Flower2, t: "Swedish Massage", d: "Gentle and relaxing full-body massage with smooth flowing strokes." },
    { icon: Sun, t: "Reflexology Therapy", d: "Pressure-point therapy on hands and feet to harmonize body systems." },
    { icon: Wind, t: "Acupuncture-Based Wellness Support", d: "Traditional Chinese Medicine (TCM)-based therapy focused on stimulating specific acupuncture points to support natural energy flow, relaxation, emotional balance, and overall holistic well-being." },
    { icon: Flower2, t: "Cupping Therapy", d: "Traditional suction cups applied to release muscular tightness and promote recovery." },
    { icon: Hand, t: "IASTM", d: "Specialized instruments to treat fascia and optimize movement." },
    { icon: Mountain, t: "Dorn Therapy", d: "Gentle spinal care technique focused on posture awareness and alignment." },
  ];

  return (
    <section className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-deep/5 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">THERAPEUTIC TREATMENTS</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep leading-tight">
            Comprehensive <em className="text-gold-gradient not-italic">Healing Modalities</em>
          </h2>
          <div className="gold-divider mt-8 max-w-xs mx-auto" />
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Each treatment is delivered by certified therapists in serene private rooms, combining classical techniques with our signature standard of care for optimal recovery.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 shadow-soft hover:shadow-luxury transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors" />
              <Icon className="w-10 h-10 text-emerald relative" strokeWidth={1.2} />
              <h3 className="mt-6 font-display text-2xl text-emerald-deep">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              <a href="/contact" className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-emerald hover:text-gold transition-colors">
                Book Session <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TherapyCTA() {
  return (
    <section className="py-20 bg-emerald-gradient text-cream">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">CONSULTATION</span>
        <h2 className="mt-4 font-display text-3xl md:text-5xl leading-tight text-balance">
          Not sure which therapy is right for you?
        </h2>
        <p className="mt-6 text-cream/70 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
          We offer personalized wellness guidance. Contact us to discuss your goals, health conditions, or any discomfort you're experiencing, and we will tailor a treatment plan specifically for you.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href="/contact" className="px-8 py-4 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold hover:scale-105 transition-transform">
            Book a Consultation
          </a>
          <a href="https://wa.me/918778639989" target="_blank" rel="noreferrer" className="px-8 py-4 rounded-full glass border border-gold/30 text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors">
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
