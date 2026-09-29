import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import classes from "@/assets/classes.jpg";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";

// Authentic Yoga Pose Images for Drop-In Classes & Classical Asanas
import virabhadrasanaImg from "@/assets/New/file_0000000011a881fd88d925006e3dce12.png"; // Warrior I (Hatha Yoga)
import padmasanaImg from "@/assets/New/file_000000007f1881fd807a2592c20cbf2b.png"; // Meditative Lotus (Pranayama & Meditation)
import parivrttaImg from "@/assets/New/file_000000000f0c820e8987e7311fec8ec6.png"; // Revolved Side Angle (Hatha Flow)
import bakasanaImg from "@/assets/New/file_0000000075fc81fda4b00a35862454cb.png"; // Crow Pose (Vinyasa Flow)
import balasanaImg from "@/assets/New/file_00000000f3408230af738cdd3e700753.png"; // Child's Pose (Yin Yoga)
import trikonasanaImg from "@/assets/New/file_00000000b1c081fd85dbad7820beccc7.png"; // Assisted Triangle Alignment (Therapeutic Yoga Sessions)
import vrikshasanaCliffImg from "@/assets/New/file_00000000d71481fdbf33319a411b46ac.png";
import padangusthasanaImg from "@/assets/New/file_00000000d63881fd8b5dc0a477c08673.png";
import baddhaParsvaImg from "@/assets/New/file_00000000813c822f9a13a78afe754c13.png";
import savasanaImg from "@/assets/New/file_000000006c5481fdb7736ef4a9ff18ff.png";
import vrikshasanaShalaImg from "@/assets/New/file_00000000fa00823085a47e4b227e8ee6.png";
import marjaryasanaImg from "@/assets/g-img7.jpeg";

export const Route = createFileRoute("/yoga")({
  component: YogaPage,
  head: () => ({
    meta: [
      { title: "Yoga Drop-In Classes — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Explore our authentic yoga drop-in classes and classical asanas." },
    ],
  }),
});

function YogaPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero title="Yoga Classes" subtitle="Practices for every body & breath." bg={classes} />
      <ClassesSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function ClassesSection() {
  const [activeTab, setActiveTab] = useState<"daily" | "showcase">("daily");

  const classList = [
    {
      t: "Hatha Yoga",
      poseSanskrit: "Virabhadrasana I",
      poseEnglish: "Warrior I Pose",
      tag: "Classical Foundation",
      d: "A traditional and foundational style focused on classical postures, breath awareness, flexibility, and strength.",
      time: "08:00 AM - 09:30 AM • 04:30 PM - 06:00 PM",
      img: virabhadrasanaImg,
      imgPosition: "object-center",
    },
    {
      t: "Pranayama & Meditation",
      poseSanskrit: "Padmasana & Dhyana",
      poseEnglish: "Meditative Lotus",
      tag: "Breath & Mindfulness",
      d: "Guided breathing techniques and seated meditation designed to harmonize energy channels and cultivate stillness of mind.",
      time: "06:30 AM - 07:30 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: padmasanaImg,
      imgPosition: "object-center",
    },
    {
      t: "Hatha Flow",
      poseSanskrit: "Parivrtta Parsvakonasana",
      poseEnglish: "Revolved Side Angle",
      tag: "Dynamic Flow",
      d: "Traditional postures linked with smooth and mindful transitions between movements, cultivating balance and spinal mobility.",
      time: "10:00 AM - 11:00 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: parivrttaImg,
      imgPosition: "object-center",
    },
    {
      t: "Vinyasa Flow",
      poseSanskrit: "Bakasana",
      poseEnglish: "Crow Pose / Arm Balance",
      tag: "Strength & Agility",
      d: "A dynamic and energizing style synchronizing continuous movement with conscious breath, building core stability and mental focus.",
      time: "10:00 AM - 11:00 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: bakasanaImg,
      imgPosition: "object-center",
    },
    {
      t: "Yin Yoga",
      poseSanskrit: "Balasana",
      poseEnglish: "Extended Child's Pose",
      tag: "Restorative & Stillness",
      d: "Slow and meditative practice focused on passive long-held postures, releasing deep connective tissue and inviting inner peace.",
      time: "04:30 PM - 05:30 PM (On Booking)",
      img: balasanaImg,
      imgPosition: "object-center",
    },
    {
      t: "Therapeutic Yoga Sessions",
      poseSanskrit: "Utthita Trikonasana",
      poseEnglish: "Assisted Posture Alignment",
      tag: "Posture Correction",
      d: "Personalized private sessions tailored to biomechanical alignment, joint mobility, stress relief, and hands-on posture correction.",
      time: "Available on Prior Appointment",
      img: trikonasanaImg,
      imgPosition: "object-top",
    },
  ];

  const classicalAsanas = [
    {
      sanskrit: "Virabhadrasana I",
      english: "Warrior I Pose",
      tag: "Classical Foundation",
      d: "Strengthens legs and core, opens the chest and lungs, and builds grounded physical and mental resilience.",
      focus: "Standing Strength • Focus • Expansion",
      img: virabhadrasanaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Padmasana & Dhyana",
      english: "Meditative Lotus Pose",
      tag: "Breath & Mindfulness",
      d: "Harmonizes energy pathways, encourages stillness of mind, and establishes a tranquil foundation for pranayama.",
      focus: "Prana Circulation • Spine Alignment • Stillness",
      img: padmasanaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Parivrtta Parsvakonasana",
      english: "Revolved Side Angle",
      tag: "Dynamic Flow",
      d: "A rotational posture that stimulates abdominal organs, improves spinal flexibility, and cultivates balance.",
      focus: "Detoxification • Spinal Mobility • Core",
      img: parivrttaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Bakasana",
      english: "Crow Pose / Arm Balance",
      tag: "Strength & Agility",
      d: "Challenges arm and wrist strength, develops deep abdominal engagement, and sharpens mental poise.",
      focus: "Arm Balance • Core Lift • Coordination",
      img: bakasanaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Balasana",
      english: "Extended Child's Pose",
      tag: "Restorative & Stillness",
      d: "Gently stretches hips, thighs, and ankles while calming the central nervous system and releasing stress.",
      focus: "Surrender • Gentle Stretch • Stress Relief",
      img: balasanaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Utthita Trikonasana",
      english: "Extended Triangle Pose",
      tag: "Posture Correction",
      d: "Elongates the spine, opens the pelvic girdle, and refines anatomical balance under mindful guidance.",
      focus: "Hamstring Mobility • Side Body • Balance",
      img: trikonasanaImg,
      imgPosition: "object-top",
    },
    {
      sanskrit: "Vrikshasana (Coastal)",
      english: "Ocean Tree Balance Pose",
      tag: "Grounding & Focus",
      d: "Cultivates stability and single-pointed concentration overlooking the Arabian Sea, balancing root and crown.",
      focus: "Equilibrium • Ankle Strength • Mental Poise",
      img: vrikshasanaCliffImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Utthita Hasta Padangusthasana",
      english: "Hand-to-Big-Toe Balance",
      tag: "Stability & Balance",
      d: "Enhances hip joint stability, stretches hamstrings, and anchors full neuromuscular focus on the breath.",
      focus: "Leg Extension • Hip Stability • Core Control",
      img: padangusthasanaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Baddha Parsvakonasana",
      english: "Bound Side Angle Stretch",
      tag: "Deep Hip & Chest Opening",
      d: "Deep rotational bind cultivating thoracic expansion, shoulder flexibility, and stamina along the cliffs.",
      focus: "Thoracic Opening • Hip Flexion • Bound Strength",
      img: baddhaParsvaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Savasana",
      english: "Deep Corpse Relaxation",
      tag: "Nervous System Reset",
      d: "Complete conscious physical release allowing the subtle body to integrate energy cultivated during practice.",
      focus: "Conscious Surrender • Parasympathetic Healing",
      img: savasanaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Vrikshasana (Studio Alignment)",
      english: "Tree Pose in Shala",
      tag: "Inner Centering",
      d: "Guided studio alignment emphasizing upright posture, root grounding, and steady mindful diaphragmatic breath.",
      focus: "Structural Alignment • Inner Focus • Grounding",
      img: vrikshasanaShalaImg,
      imgPosition: "object-center",
    },
    {
      sanskrit: "Marjaryasana & Bitilasana",
      english: "Cat-Cow Therapeutic Spinal Wave",
      tag: "Spinal Mobility",
      d: "Synchronized spinal flexion and extension relieving vertebral compression and improving fluid circulation.",
      focus: "Vertebral Decompression • Back Health • Mobility",
      img: marjaryasanaImg,
      imgPosition: "object-center",
    },
  ];

  return (
    <section className="relative py-28 bg-emerald-gradient text-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold uppercase font-bold">
            DAILY SCHEDULE &amp; OFFERINGS
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight font-bold">
            Practices for every <em className="text-gold-gradient not-italic">body &amp; breath</em>.
          </h2>
          <div className="gold-divider mt-6 mx-auto" />
          <p className="mt-6 text-cream/70 leading-relaxed text-sm md:text-base font-medium">
            From dynamic Vinyasa to deeply restorative therapy sessions, our classes meet you
            exactly where you are. Each session honours alignment, breath, and intention — guiding
            you toward sustainable wellbeing.
          </p>

          {/* Toggle pill switcher */}
          <div className="mt-10 inline-flex items-center p-1.5 rounded-full bg-emerald-deep/80 border border-white/20 backdrop-blur-md shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("daily")}
              className={`px-5 sm:px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "daily"
                  ? "bg-gold-gradient text-emerald-deep shadow-md font-bold"
                  : "text-cream/80 hover:text-white font-medium"
              }`}
            >
              DAILY CLASS OFFERINGS
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("showcase")}
              className={`px-5 sm:px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "showcase"
                  ? "bg-gold-gradient text-emerald-deep shadow-md font-bold"
                  : "text-cream/80 hover:text-white font-medium"
              }`}
            >
              CLASSICAL ASANAS SHOWCASE (12 POSES)
            </button>
          </div>
        </div>

        {activeTab === "daily" ? (
          /* 6 Yoga Drop-In Classes Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {classList.map((c) => (
              <div
                key={c.t}
                className="group glass rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border border-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40">
                  <img
                    src={c.img}
                    alt={`${c.t} - ${c.poseSanskrit}`}
                    className={`absolute inset-0 w-full h-full ${c.imgPosition} object-cover group-hover:scale-105 transition-transform duration-700`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-black/20" />
                  <div className="absolute top-4 right-4 glass-dark rounded-full px-3 py-1 text-[0.65rem] tracking-wider text-cream/90 font-bold border border-white/10">
                    {c.tag}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-[0.7rem] font-serif tracking-wider text-gold font-bold drop-shadow">
                      {c.poseSanskrit}
                    </span>
                    <span className="text-[0.65rem] text-cream/80 drop-shadow font-sans font-medium">
                      {c.poseEnglish}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col flex-1">
                    <h3 className="font-display text-2xl text-cream font-bold">{c.t}</h3>
                    <p className="mt-3 text-sm text-cream/70 leading-relaxed font-medium flex-1">{c.d}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-cream/10 flex flex-col gap-3">
                    <span className="text-[0.75rem] sm:text-xs tracking-[0.1em] text-cream/90 font-bold uppercase min-h-[2.5rem] flex items-center">
                      {c.time}
                    </span>
                    <a
                      href={`/apply?category=Yoga-Classes&course=${encodeURIComponent(c.t)}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-emerald-deep text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] shadow-soft"
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* 12 Classical Asanas Showcase Grid */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {classicalAsanas.map((c, i) => (
              <div
                key={c.sanskrit + i}
                className="group glass rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border border-white/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40">
                  <img
                    src={c.img}
                    alt={`${c.sanskrit} - ${c.english}`}
                    className={`absolute inset-0 w-full h-full object-cover ${c.imgPosition || "object-center"} group-hover:scale-105 transition-transform duration-700`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-black/20" />
                  <div className="absolute top-4 right-4 glass-dark rounded-full px-3 py-1 text-[0.65rem] tracking-wider text-cream/90 font-bold border border-white/10">
                    {c.tag}
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-[0.7rem] font-serif tracking-wider text-gold font-bold drop-shadow">
                      {c.sanskrit}
                    </span>
                    <span className="text-[0.65rem] text-cream/80 drop-shadow font-sans font-medium">
                      {c.english}
                    </span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-2xl text-cream font-bold">{c.sanskrit}</h3>
                      <span className="text-[0.65rem] tracking-widest text-gold/80 uppercase font-mono">
                        {String(i + 1).padStart(2, "0")} / 12
                      </span>
                    </div>
                    <span className="text-xs text-cream/60 font-medium italic mt-1">{c.english}</span>
                    <p className="mt-3 text-sm text-cream/70 leading-relaxed font-medium flex-1">{c.d}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-cream/10 flex flex-col gap-3">
                    <span className="text-[0.72rem] tracking-wider text-gold/90 font-medium min-h-[2.5rem] flex items-center">
                      {c.focus}
                    </span>
                    <a
                      href={`/apply?category=Yoga-Classes&course=${encodeURIComponent(c.sanskrit)}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-emerald-deep text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] shadow-soft"
                    >
                      <span>Book Session</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
