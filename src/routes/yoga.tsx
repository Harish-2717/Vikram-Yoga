import { createFileRoute } from "@tanstack/react-router";
import classes from "@/assets/classes.jpg";
import hero from "@/assets/hero.jpg";
import retreat from "@/assets/retreat.jpg";
import therapy from "@/assets/therapy.jpg";
import about from "@/assets/about.png";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";

export const Route = createFileRoute("/yoga")({
  component: YogaPage,
  head: () => ({
    meta: [
      { title: "Yoga Classes — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Explore our comprehensive yoga classes." },
    ],
  }),
});

function YogaPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Yoga Classes"
        subtitle="Practices for every body & breath."
        bg={classes}
      />
      <ClassesSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function ClassesSection() {
  const list = [
    { t: "Hatha Yoga", d: "A traditional and foundational style focused on classical postures, breath awareness, flexibility, and strength.", time: "Mon, Wed, Fri • 6:00 AM", img: classes },
    { t: "Hatha Flow", d: "Traditional postures with smooth and mindful transitions between movements.", time: "Tue, Thu • 7:30 AM", img: retreat },
    { t: "Vinyasa Flow", d: "A dynamic and energizing style that synchronizes movement with breath.", time: "Mon, Wed, Fri • 6:00 PM", img: therapy },
    { t: "Yin Yoga", d: "Slow and meditative style focused on deep stretching, relaxation, and inner stillness.", time: "Weekends • 8:00 AM", img: about },
    { t: "Pranayama & Meditation", d: "Guided breathing and meditation practices designed to calm the nervous system.", time: "Daily • 5:30 AM", img: hero },
    { t: "Therapeutic Sessions", d: "Personalized sessions tailored to posture correction, mobility, and stress management.", time: "By Appointment", img: classes },
  ];
  return (
    <section className="relative py-28 bg-emerald-gradient text-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">YOGA CLASSES</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">Practices for every <em className="text-gold-gradient not-italic">body &amp; breath</em>.</h2>
          <div className="gold-divider mt-8 mx-auto" />
          <p className="mt-6 text-cream/70 leading-relaxed text-sm">
            From dynamic Vinyasa to deeply restorative therapy sessions, our classes meet you exactly where you are. Each session honours alignment, breath, and intention — guiding you toward sustainable wellbeing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c, i) => (
            <div key={c.t} className="group glass rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <img src={c.img} alt={c.t} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-emerald-deep/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 glass-dark rounded-full px-3 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-gold">0{i + 1}</div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl text-cream">{c.t}</h3>
                <p className="mt-3 text-sm text-cream/70 leading-relaxed flex-1">{c.d}</p>
                <div className="mt-6 pt-5 border-t border-cream/10 flex items-center justify-between text-[0.65rem] tracking-[0.1em] text-gold/90 uppercase">
                  <span className="font-semibold">{c.time}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:-translate-x-1 duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
