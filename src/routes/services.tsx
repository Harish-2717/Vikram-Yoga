import { createFileRoute } from "@tanstack/react-router";
import gImg1 from "@/assets/g-img1.jpg";
import gImg2 from "@/assets/g-img2.jpeg";
import gImg3 from "@/assets/g-img3.jpeg";
import gImg4 from "@/assets/g-img4.jpeg";
import gImg5 from "@/assets/g-img5.jpeg";
import gImg9 from "@/assets/g-img9.jpeg";
import gImg10 from "@/assets/g-img10.jpeg";
import gImg7 from "@/assets/g-img7.jpeg";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";

// Therapy Real Images
import thaiMassage from "@/assets/images/thai-massage.png";
import shiatsu from "@/assets/images/shiatsu.png";
import deepTissue from "@/assets/images/deep-tissue.jpg";
import ayurvedic from "@/assets/images/ayurvedic.jpg";
import swedish from "@/assets/images/swedish-massage.jpg";
import reflexology from "@/assets/images/reflexology.jpg";
import acupuncture from "@/assets/images/acupuncture.jpg";
import cupping from "@/assets/images/cupping.jpg";
import iastm from "@/assets/images/iastm.jpg";
import dornTherapy from "@/assets/images/dorn-therapy.jpg";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Explore our comprehensive yoga classes, wellness therapies, retreats, and certification courses at Dr. Vikram Yoga & Wellness Centre." },
    ],
  }),
});

function ServicesPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Our Services"
        subtitle="Holistic offerings crafted to heal, harmonize, and transform every dimension of your being."
        bg={gImg1}
      />
      <ClassesSection />
      <TherapiesSection />
      <RetreatsSection />
      <CoursesSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

/* ── Classes ── */
function ClassesSection() {
  const list = [
    { t: "Hatha Yoga", d: "A traditional and foundational style focused on classical postures, breath awareness, flexibility, and strength.", time: "Mon, Wed, Fri • 6:00 AM", img: gImg2 },
    { t: "Hatha Flow", d: "Traditional postures with smooth and mindful transitions between movements.", time: "Tue, Thu • 7:30 AM", img: gImg3 },
    { t: "Vinyasa Flow", d: "A dynamic and energizing style that synchronizes movement with breath.", time: "Mon, Wed, Fri • 6:00 PM", img: gImg4 },
    { t: "Yin Yoga", d: "Slow and meditative style focused on deep stretching, relaxation, and inner stillness.", time: "Weekends • 8:00 AM", img: gImg5 },
    { t: "Pranayama & Meditation", d: "Guided breathing and meditation practices designed to calm the nervous system.", time: "Daily • 5:30 AM", img: gImg10 },
    { t: "Therapeutic Sessions", d: "Personalized sessions tailored to posture correction, mobility, and stress management.", time: "By Appointment", img: gImg7 },
  ];
  return (
    <section id="yoga" className="relative py-28 bg-emerald-gradient text-cream overflow-hidden">
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

/* ── Therapies ── */
function TherapiesSection() {
  const items = [
    { t: "Thai Yoga Massage", d: "Assisted stretching and rhythmic compressions for flexibility and energy flow.", img: thaiMassage },
    { t: "Shiatsu Therapy", d: "Traditional Japanese pressure-point therapy along the body's energy pathways.", img: shiatsu },
    { t: "Deep Tissue Therapy", d: "Focused treatment to release chronic muscular tension and fascial restrictions.", img: deepTissue },
    { t: "Ayurvedic Wellness Massage", d: "Traditional therapy utilizing herbal oils to support circulation and rejuvenation.", img: ayurvedic },
    { t: "Swedish Massage", d: "Gentle and relaxing full-body massage with smooth flowing strokes.", img: swedish },
    { t: "Reflexology Therapy", d: "Pressure-point therapy on hands and feet to harmonize body systems.", img: reflexology },
    { t: "Acupuncture-Based Support", d: "Stimulating specific body points for natural energy flow and emotional balance.", img: acupuncture },
    { t: "Cupping Therapy", d: "Traditional suction cups applied to release muscular tightness and promote recovery.", img: cupping },
    { t: "IASTM", d: "Specialized instruments to treat fascia and optimize movement.", img: iastm },
    { t: "Dorn Therapy", d: "Gentle spinal care technique focused on posture awareness and alignment.", img: dornTherapy },
  ];
  return (
    <section className="relative py-28 bg-emerald-gradient text-cream overflow-hidden">
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">MASSAGE &amp; WELLNESS THERAPIES</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">Therapeutic touch, <em className="text-gold-gradient not-italic">refined into ritual</em>.</h2>
          <div className="gold-divider mt-8 mx-auto" />
          <p className="mt-6 text-cream/70 leading-relaxed text-sm">
            Each treatment is delivered by certified therapists in serene private rooms, combining classical techniques with our signature standard of care.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((c, i) => (
            <div key={c.t} className="group glass rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <img src={c.img} alt={c.t} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-emerald-deep/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 glass-dark rounded-full px-3 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-gold">{String(i + 1).padStart(2, "0")}</div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl text-cream">{c.t}</h3>
                <p className="mt-3 text-sm text-cream/70 leading-relaxed flex-1">{c.d}</p>
                <div className="mt-6 pt-5 border-t border-cream/10 flex items-center justify-between">
                  <a href={`/contact?interest=Wellness Therapy&specific=${encodeURIComponent(c.t)}`} className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/90 hover:text-gold transition-colors font-semibold">
                    Book Session
                  </a>
                  <ArrowRight className="w-4 h-4 text-gold/60 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:-translate-x-1 duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Retreats ── */
function RetreatsSection() {
  return (
    <section id="retreats" className="relative py-20 text-cream overflow-hidden">
      <img src={gImg9} alt="Wellness retreat" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/90 via-emerald-deep/70 to-emerald-deep/40" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div>
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">WELLNESS RETREATS</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-[1.1]">Step away. <em className="text-gold-gradient not-italic">Come home</em> to yourself.</h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-cream/80 leading-relaxed max-w-2xl text-base md:text-lg">
            Immersive 3, 7, and 14-day retreats in nature — combining daily yoga, naturopathy, ayurvedic cuisine, and silent practice. Designed for deep reset and lasting transformation.
          </p>

          {/* 6 boxes in one row on large screens */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { t: "7 & 14 Days", d: "Holistic Wellness" },
              { t: "Meditation", d: "Soulful Retreat" },
              { t: "Couples", d: "Shared Retreat" },
              { t: "Detox", d: "Renewal Retreat" },
              { t: "Energy", d: "Balancing Retreat" },
              { t: "Pain Relief", d: "Therapeutic" }
            ].map((r) => (
              <div key={r.t} className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-gold/20 transition-colors">
                <div className="font-display text-xl text-gold">{r.t}</div>
                <div className="text-[0.6rem] tracking-[0.2em] uppercase text-cream/60 mt-2">{r.d}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-8 glass rounded-3xl border border-white/5 max-w-4xl">
            <h3 className="font-display text-2xl text-gold mb-4">Additional Details</h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              Our retreats are holistic journeys designed to disconnect you from the digital world and reconnect you with your true self. Each stay includes organic vegetarian meals, personalized wellness consultations, and multiple daily yoga/meditation sessions led by Dr. Vikram and his expert team.
            </p>
          </div>

          <a href="/contact?interest=Retreat" className="mt-12 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold hover:scale-105 transition-transform">Reserve Your Retreat <ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </section>
  );
}

/* ── Courses ── */
function CoursesSection() {
  const items = [
    { t: "Shiatsu Therapy Certification", d: "Japanese bodywork training focused on energy balancing techniques and meridian pathways.", h: "21 Hours • 7–10 Days", details: "Includes meridian mapping, tsubo point therapy, and traditional kata techniques." },
    { t: "Thai Yoga Massage Certification", d: "Integrative bodywork combining assisted stretching and acupressure techniques.", h: "21 Hours • 7–10 Days", details: "Comprehensive training in sen line theory and personalized stretching sequence for clients." },
    { t: "Reflexology Therapy Certification", d: "Holistic reflex-point therapy training for feet and hands.", h: "12 Hours • 7 Days", details: "Learn precise mapping of internal organs and systems to foot reflex zones." },
    { t: "Ayurvedic Wellness Massage Certification", d: "Traditional training inspired by Ayurvedic principles using therapeutic oils.", h: "21 Hours • 10 Days", details: "Covers Dosha-specific oil selection and traditional Abhyanga strokes." },
    { t: "Swedish Massage Certification", d: "Foundational therapeutic massage program focused on relaxation and circulation.", h: "21 Hours • 10 Days", details: "Master the 5 classic strokes: Effleurage, Petrissage, Friction, Tapotement, and Vibration." },
    { t: "Deep Tissue Therapy Certification", d: "Professional soft tissue training focused on deep muscular release and fascia manipulation.", h: "21 Hours • 10 Days", details: "Advanced techniques for chronic pain management and structural alignment." },
    { t: "Dorn Therapy Certification", d: "Gentle therapeutic wellness training focused on posture awareness and spinal balancing.", h: "12 Hours • 7 Days", details: "Techniques for mobilization of joints and correction of leg length discrepancies." },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">CERTIFICATION COURSES</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance leading-tight">Become a guide. <em className="text-gold-gradient not-italic">Carry the wisdom forward</em>.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {items.map((c, i) => (
            <div key={c.t} className="group relative rounded-3xl overflow-hidden bg-emerald-gradient text-cream p-8 shadow-soft hover:shadow-luxury transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-gold/15 rounded-full blur-3xl group-hover:bg-gold/25 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-serif-display text-xs tracking-[0.3em] text-gold">0{i + 1}</span>
                  <span className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/60">{c.h}</span>
                </div>
                <h3 className="mt-8 font-display text-2xl md:text-3xl">{c.t}</h3>
                <p className="mt-4 text-sm text-cream/75 leading-relaxed">{c.d}</p>
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="text-[0.6rem] tracking-[0.2em] uppercase text-gold/80 mb-2 font-semibold">Additional details</div>
                  <p className="text-[0.8rem] text-cream/60 leading-relaxed italic">{c.details}</p>
                </div>
                <a href={`/contact?interest=Certification Course&specific=${encodeURIComponent(c.t)}`} className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold hover:gap-3 transition-all">Enroll Now <ArrowRight className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
