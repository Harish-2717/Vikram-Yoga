import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import servicesHeroBg from "@/assets/New/beautiful-paradise-island-with-beach-sea-around-coconut-palm-tree.jpg";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";

// Yoga Class & Asana Images
import virabhadrasanaImg from "@/assets/New/file_0000000011a881fd88d925006e3dce12.png";
import padmasanaImg from "@/assets/New/file_000000007f1881fd807a2592c20cbf2b.png";
import parivrttaImg from "@/assets/New/file_000000000f0c820e8987e7311fec8ec6.png";
import bakasanaImg from "@/assets/New/file_0000000075fc81fda4b00a35862454cb.png";
import balasanaImg from "@/assets/New/file_00000000f3408230af738cdd3e700753.png";
import trikonasanaImg from "@/assets/New/file_00000000b1c081fd85dbad7820beccc7.png";
import vrikshasanaCliffImg from "@/assets/New/file_00000000d71481fdbf33319a411b46ac.png";
import padangusthasanaImg from "@/assets/New/file_00000000d63881fd8b5dc0a477c08673.png";
import baddhaParsvaImg from "@/assets/New/file_00000000813c822f9a13a78afe754c13.png";
import savasanaImg from "@/assets/New/file_000000006c5481fdb7736ef4a9ff18ff.png";
import vrikshasanaShalaImg from "@/assets/New/file_00000000fa00823085a47e4b227e8ee6.png";
import marjaryasanaImg from "@/assets/g-img7.jpeg";

// Therapy Real Images
import shiatsu from "@/assets/images/shiatsu.jpeg";
import thaiMassage from "@/assets/images/thai-massage.jpeg";
import acupunctureReal from "@/assets/New/file_00000000d09c81fd93c457820e551f50.png";
import reflexology from "@/assets/images/reflexology.jpg";
import deepTissue from "@/assets/images/deep-tissue.jpeg";
import ayurvedic from "@/assets/images/Traditional Ayurvedic Massage.jpeg";
import cupping from "@/assets/images/cupping.jpg";
import iastm from "@/assets/images/iastm.jpg";
import dornTherapy from "@/assets/images/dorn-therapy.jpg";

// Retreat Real Images
import wellnessRetreatImg from "@/assets/Yoga wellness retreat.png";
import meditationRetreatImg from "@/assets/Yoga meditation retreat.png";
import coupleRetreatImg from "@/assets/Couple Wellness retreat.png";
import detoxRetreatImg from "@/assets/Yoga Detox & Rejuvenation Retreat.png";
import varkalaBeach from "@/assets/varkala_beach.png";
import retreatBanner from "@/assets/retreat_banner.png";
import painManagementRetreatImg from "@/assets/pain_management_retreat.jpg";
import stressInsomniaRetreatImg from "@/assets/stress_insomnia_retreat.jpg";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Explore our wellness therapies, bodywork modalities, and restorative retreat programs at Dr. Vikram Yoga & Wellness Centre.",
      },
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
        bg={servicesHeroBg}
      />
      <YogaClassesSection />
      <WellnessTherapiesSection />
      <RetreatProgramsSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

/* ── 1. Yoga & Asana Practices ── */
function YogaClassesSection() {
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
    },
    {
      t: "Pranayama & Meditation",
      poseSanskrit: "Padmasana & Dhyana",
      poseEnglish: "Meditative Lotus",
      tag: "Breath & Mindfulness",
      d: "Guided breathing techniques and seated meditation designed to harmonize energy channels and cultivate stillness of mind.",
      time: "06:30 AM - 07:30 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: padmasanaImg,
    },
    {
      t: "Hatha Flow",
      poseSanskrit: "Parivrtta Parsvakonasana",
      poseEnglish: "Revolved Side Angle",
      tag: "Dynamic Flow",
      d: "Traditional postures linked with smooth and mindful transitions between movements, cultivating balance and spinal mobility.",
      time: "10:00 AM - 11:00 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: parivrttaImg,
    },
    {
      t: "Vinyasa Flow",
      poseSanskrit: "Bakasana",
      poseEnglish: "Crow Pose / Arm Balance",
      tag: "Strength & Agility",
      d: "A dynamic and energizing style synchronizing continuous movement with conscious breath, building core stability and mental focus.",
      time: "10:00 AM - 11:00 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: bakasanaImg,
    },
    {
      t: "Yin Yoga",
      poseSanskrit: "Balasana",
      poseEnglish: "Extended Child's Pose",
      tag: "Restorative & Stillness",
      d: "Slow and meditative practice focused on passive long-held postures, releasing deep connective tissue and inviting inner peace.",
      time: "04:30 PM - 05:30 PM (On Booking)",
      img: balasanaImg,
    },
    {
      t: "Therapeutic Yoga Sessions",
      poseSanskrit: "Utthita Trikonasana",
      poseEnglish: "Assisted Posture Alignment",
      tag: "Posture Correction",
      d: "Personalized private sessions tailored to biomechanical alignment, joint mobility, stress relief, and hands-on posture correction.",
      time: "Available on Prior Appointment",
      img: trikonasanaImg,
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
    <section id="yoga-classes" className="relative py-28 bg-emerald-gradient text-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold uppercase font-bold">
            YOGA & ASANA PRACTICES
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight font-bold">
            Practices for every <em className="text-gold-gradient not-italic">body &amp; breath</em>.
          </h2>
          <div className="gold-divider mt-6 mx-auto" />
          <p className="mt-6 text-cream/70 leading-relaxed text-sm md:text-base font-medium">
            From classical foundational Hatha postures to dynamic Vinyasa, deep Yin relaxation, and
            guided therapeutic alignment sessions. Every pose is guided with precision, breath
            awareness, and personal care by Dr. Vikram.
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
          /* 6 Yoga Classes in Balanced 3-Column Grid */
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
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
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

/* ── 2. Massage & Wellness Therapies ── */
function WellnessTherapiesSection() {
  const therapies = [
    {
      t: "Shiatsu Massage Therapy",
      tag: "Japanese Acupressure",
      d: "Traditional Japanese acupressure technique applied along vital meridian pathways to unblock energetic stagnation and restore deep physiological equilibrium.",
      img: shiatsu,
    },
    {
      t: "Thai Yoga Massage Therapy",
      tag: "Assisted Stretching",
      d: "Authentic assisted passive yoga stretching combined with rhythmic deep compressions along vital Sen lines to enhance flexibility, joint mobility, and energy flow.",
      img: thaiMassage,
    },
    {
      t: "Acupuncture Wellness Therapy",
      tag: "TCM Point Therapy",
      d: "Traditional Chinese Medicine (TCM) acupoint stimulation designed to harmonize Qi circulation, balance the central nervous system, and support healing.",
      img: acupunctureReal,
    },
    {
      t: "Reflexology",
      tag: "Reflex Point System",
      d: "Targeted pressure-point therapy applied across precise micro-reflex maps on the feet and hands corresponding directly to bodily organs and glands.",
      img: reflexology,
    },
    {
      t: "Deep Tissue Massage Therapy",
      tag: "Myofascial Release",
      d: "Slow, deliberate strokes and deep finger pressure applied to deeper muscular layers and myofascia to release chronic postural holding patterns.",
      img: deepTissue,
    },
    {
      t: "Ayurvedic Massage Therapy",
      tag: "Dosha & Herbal Oil",
      d: "Classical Abhyanga ritual utilizing warm medicated herbal oils formulated to balance individual Doshas, stimulate lymphatic drainage, and revitalize vitality.",
      img: ayurvedic,
    },
    {
      t: "Cupping Therapy",
      tag: "Circulation & Detox",
      d: "Traditional negative-pressure suction therapy that draws fresh oxygenated blood to stagnant areas, releasing deep myofascial tension and speeding cellular recovery.",
      img: cupping,
    },
    {
      t: "IASTM (Instrument-Assisted Soft Tissue Mobilization)",
      tag: "Soft Tissue Therapy",
      d: "Clinical soft-tissue mobilization using specialized ergonomic contoured instruments to break down scar tissue, alleviate fascial restrictions, and optimize movement.",
      img: iastm,
    },
    {
      t: "Dorn Therapy",
      tag: "Spinal Alignment",
      d: "Non-manipulative, gentle spinal therapy that corrects joint misalignments and leg-length discrepancies through active patient movement and natural bio-alignment.",
      img: dornTherapy,
    },
  ];

  return (
    <section id="wellness-therapies" className="relative py-28 bg-emerald-gradient text-cream overflow-hidden">
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold uppercase font-bold">
            MASSAGE & WELLNESS THERAPIES
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight font-bold">
            Therapeutic touch, <em className="text-gold-gradient not-italic">refined into ritual</em>.
          </h2>
          <div className="gold-divider mt-6 mx-auto" />
          <p className="mt-6 text-cream/70 leading-relaxed text-sm md:text-base font-medium">
            Each treatment is delivered by certified therapists in serene private healing rooms, combining
            authentic classical techniques with personalized holistic care.
          </p>
        </div>

        {/* 9 Therapies in Balanced 3-Column Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {therapies.map((item) => (
            <div
              key={item.t}
              className="group glass rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border border-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40">
                <img
                  src={item.img}
                  alt={item.t}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-black/20" />
                <div className="absolute top-4 right-4 glass-dark rounded-full px-3 py-1 text-[0.65rem] tracking-wider text-cream/90 font-bold border border-white/10">
                  {item.tag}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="flex flex-col flex-1">
                  <h3 className="font-display text-2xl text-cream font-bold leading-snug min-h-[3.5rem] flex items-center">
                    {item.t}
                  </h3>
                  <p className="mt-3 text-sm text-cream/70 leading-relaxed font-medium flex-1">
                    {item.d}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-cream/10">
                  <a
                    href={`/apply?category=Wellness-Therapies&course=${encodeURIComponent(item.t)}`}
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
      </div>
    </section>
  );
}

/* ── 2. Retreat Programs ── */
function RetreatProgramsSection() {
  const retreats = [
    {
      t: "7 Days & 14 Days Holistic Wellness Retreat",
      slug: "7-days-14-days-holistic-wellness-retreat",
      tag: "Holistic Immersion",
      d: "A complete wellness immersion designed to restore balance, vitality, relaxation, and inner harmony through daily yoga, therapeutic bodywork, and mindful living.",
      img: wellnessRetreatImg,
    },
    {
      t: "Yoga & Meditation Retreat",
      slug: "yoga-meditation-retreat",
      tag: "Traditional Practice",
      d: "A transformative retreat focused on classical yoga postures, breathwork, meditation, mindfulness, and spiritual rejuvenation.",
      img: meditationRetreatImg,
    },
    {
      t: "Couple Wellness Retreat",
      slug: "couple-wellness-retreat",
      tag: "Shared Healing",
      d: "A rejuvenating escape for couples to reconnect, heal, and unwind together through partner yoga, therapeutic treatments, and peaceful coastal nature.",
      img: coupleRetreatImg,
    },
    {
      t: "Yoga Detox & Rejuvenation Retreat",
      slug: "yoga-detox-rejuvenation-retreat",
      tag: "Lifestyle Renewal",
      d: "A cleansing retreat combining traditional yogic Shatkriyas, herbal nutrition, therapeutic massages, and stress release to revitalize the body.",
      img: detoxRetreatImg,
    },
    {
      t: "Energy Balancing Retreat",
      slug: "energy-balancing-retreat",
      tag: "Energetic Harmony",
      d: "A restorative retreat dedicated to aligning subtle energy channels, calming the nervous system, and restoring vitality with guided breath and touch therapies.",
      img: varkalaBeach,
    },
    {
      t: "Anti-Aging & Healthy Longevity Retreat",
      slug: "anti-aging-healthy-longevity-retreat",
      tag: "Graceful Vitality",
      d: "A comprehensive longevity program focusing on cellular rejuvenation, joint flexibility, stress reduction, and traditional Ayurvedic vitality therapies.",
      img: retreatBanner,
    },
    {
      t: "Pain Management & Therapeutic Wellness Retreat",
      slug: "pain-management-therapeutic-wellness-retreat",
      tag: "Targeted Relief",
      d: "A specialized therapy retreat targeting chronic pain, postural misalignments, musculoskeletal tension, and spinal health under expert guidance.",
      img: painManagementRetreatImg,
    },
    {
      t: "Stress & Insomnia Management Retreat",
      slug: "stress-insomnia-management-retreat",
      tag: "Calm & Sleep",
      d: "A gentle nervous-system reset program designed to dissolve anxiety, restore healthy sleep patterns, and guide you back to restful tranquility.",
      img: stressInsomniaRetreatImg,
    },
  ];

  return (
    <section id="retreat-programs" className="relative py-28 bg-[#0a1e17] text-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold uppercase font-bold">
            IMMERSIVE HEALING JOURNEYS
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight font-bold">
            Retreat Programs
          </h2>
          <div className="gold-divider mt-6 mx-auto" />
          <p className="mt-6 text-cream/70 leading-relaxed text-sm md:text-base font-medium">
            Step away from daily demands into our serene sanctuary in Varkala. Each program is carefully
            curated with daily yoga, Ayurvedic nutrition, therapeutic treatments, and mindfulness.
          </p>
        </div>

        {/* 8 Retreats in Balanced 4-Column Grid (2 Rows of 4 on Desktop) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {retreats.map((r) => (
            <div
              key={r.t}
              className="group glass rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border border-white/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40">
                <img
                  src={r.img}
                  alt={r.t}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-black/20" />
                <div className="absolute top-3.5 right-3.5 glass-dark rounded-full px-2.5 py-0.5 text-[0.6rem] tracking-wider text-cream/90 font-bold border border-white/10">
                  {r.tag}
                </div>
              </div>

              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div className="flex flex-col flex-1">
                  <h3 className="font-display text-lg md:text-xl text-cream font-bold leading-snug min-h-[3.75rem] flex items-center">
                    {r.t}
                  </h3>
                  <p className="mt-3 text-xs md:text-sm text-cream/70 leading-relaxed font-medium flex-1">
                    {r.d}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-cream/10 flex flex-col gap-2.5">
                  <a
                    href={`/apply?category=Retreat-Programs&course=${encodeURIComponent(r.t)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gold-gradient text-emerald-deep text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] shadow-soft"
                  >
                    <span>Book Retreat</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`/retreats#${r.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 text-[0.65rem] tracking-[0.18em] uppercase text-gold hover:text-cream font-semibold transition-colors pt-1"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
