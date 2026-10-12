import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import servicesHeroBg from "@/assets/New/beautiful-paradise-island-with-beach-sea-around-coconut-palm-tree.jpg";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat, PageHero } from "./about";
import { getApiUrl, resolveImageUrl, bustCache } from "@/lib/utils";


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
import shiatsu from "@/assets/New/Hands-On Yoga Bodywork Workshop.png";
import thaiMassage from "@/assets/New/maxresdefault.jpg.jpeg";
import acupunctureReal from "@/assets/New/Fundo Close  Up Das Mãos Em Um Casaco Branco  Realizando Uma Pequena Acupuntura Extrema Com Agulhas Em Cascata No Estômago Da Mulher Durante A Massagem Terapêutica Papel de Parede Para Download Gratuito - Pngtree.jpeg";
import reflexology from "@/assets/New/6 Mental Health Benefits of Regular Massage Therapy.jpeg";
import deepTissue from "@/assets/New/Deep Tissue Massage_ Benefits and Risks.jpeg";
import ayurvedic from "@/assets/New folder/Ayurvedic massage courses.png";
import cupping from "@/assets/New/cupping-therapy-new.jpeg";
import iastm from "@/assets/New/Can Scraping Therapy Help You Recover From Workouts_ (1).jpeg";
import dornTherapy from "@/assets/New/3 Home Exercises for Spine Health_ Improving Scoliosis in a Month (1).jpeg";
import swedishMassage from "@/assets/New/Swedish Massage Therapist.jpeg";

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

/** Fallback placeholder shown when an image fails to load */
const FALLBACK_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' fill='%23f0fdf4'%3E%3Crect width='800' height='600' rx='12'/%3E%3Ctext x='50%25' y='48%25' text-anchor='middle' dy='.35em' fill='%2316a34a' font-size='18' font-family='sans-serif'%3EService Image%3C/text%3E%3Ctext x='50%25' y='58%25' text-anchor='middle' dy='.35em' fill='%2386efac' font-size='13' font-family='sans-serif'%3E(not yet uploaded)%3C/text%3E%3C/svg%3E";

type ServiceImageMap = Record<string, string>;

/** Fetches all service images from the public API and returns a key→url map */
async function fetchServiceImageMap(): Promise<ServiceImageMap> {
  try {
    const res = await fetch(bustCache(getApiUrl("service-images.php")));
    if (!res.ok) return {};
    const data: Array<{ service_key: string; image: string }> = await res.json();
    const map: ServiceImageMap = {};
    data.forEach((row) => {
      map[row.service_key] = resolveImageUrl(row.image);
    });
    return map;
  } catch {
    return {};
  }
}

function ServicesPage() {
  const [serviceImageMap, setServiceImageMap] = useState<ServiceImageMap>({});

  useEffect(() => {
    fetchServiceImageMap().then(setServiceImageMap);
  }, []);

  const resolveImg = (key: string, staticFallback: string) =>
    serviceImageMap[key] || staticFallback;

  return (
    <main className="overflow-x-hidden bg-[#faeee2]">
      <Navbar />
      <PageHero
        title="Our Services"
        subtitle="Holistic offerings crafted to heal, harmonize, and transform every dimension of your being."
        bg={servicesHeroBg}
      />
      <YogaClassesSection resolveImg={resolveImg} />
      <WellnessTherapiesSection resolveImg={resolveImg} />
      <RetreatProgramsSection resolveImg={resolveImg} />
      <CertificateCoursesSection resolveImg={resolveImg} />
      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}

/* ── 1. Yoga & Asana Practices ── */
function YogaClassesSection({ resolveImg }: { resolveImg: (key: string, fb: string) => string }) {
  const [activeTab, setActiveTab] = useState<"daily" | "showcase">("daily");

  const classList = [
    {
      t: "Hatha Yoga",
      key: "hatha-yoga",
      poseSanskrit: "Virabhadrasana I",
      poseEnglish: "Warrior I Pose",
      tag: "Classical Foundation",
      d: "A traditional and foundational style focused on classical postures, breath awareness, flexibility, and strength.",
      time: "08:00 AM - 09:30 AM • 04:30 PM - 06:00 PM",
      img: resolveImg("hatha-yoga", virabhadrasanaImg),
    },
    {
      t: "Pranayama & Meditation",
      key: "pranayama-meditation",
      poseSanskrit: "Padmasana & Dhyana",
      poseEnglish: "Meditative Lotus",
      tag: "Breath & Mindfulness",
      d: "Guided breathing techniques and seated meditation designed to harmonize energy channels and cultivate stillness of mind.",
      time: "06:30 AM - 07:30 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: resolveImg("pranayama-meditation", padmasanaImg),
    },
    {
      t: "Hatha Flow",
      key: "hatha-flow",
      poseSanskrit: "Parivrtta Parsvakonasana",
      poseEnglish: "Revolved Side Angle",
      tag: "Dynamic Flow",
      d: "Traditional postures linked with smooth and mindful transitions between movements, cultivating balance and spinal mobility.",
      time: "10:00 AM - 11:00 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: resolveImg("hatha-flow", parivrttaImg),
    },
    {
      t: "Vinyasa Flow",
      key: "vinyasa-flow",
      poseSanskrit: "Bakasana",
      poseEnglish: "Crow Pose / Arm Balance",
      tag: "Strength & Agility",
      d: "A dynamic and energizing style synchronizing continuous movement with conscious breath, building core stability and mental focus.",
      time: "10:00 AM - 11:00 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: resolveImg("vinyasa-flow", bakasanaImg),
    },
    {
      t: "Yin Yoga",
      key: "yin-yoga",
      poseSanskrit: "Balasana",
      poseEnglish: "Extended Child's Pose",
      tag: "Restorative & Stillness",
      d: "Slow and meditative practice focused on passive long-held postures, releasing deep connective tissue and inviting inner peace.",
      time: "04:30 PM - 05:30 PM (On Booking)",
      img: resolveImg("yin-yoga", balasanaImg),
    },
    {
      t: "Therapeutic Yoga Sessions",
      key: "therapeutic-yoga",
      poseSanskrit: "Utthita Trikonasana",
      poseEnglish: "Assisted Posture Alignment",
      tag: "Posture Correction",
      d: "Personalized private sessions tailored to biomechanical alignment, joint mobility, stress relief, and hands-on posture correction.",
      time: "Available on Prior Appointment",
      img: resolveImg("therapeutic-yoga", trikonasanaImg),
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
    <section id="yoga-classes" className="relative py-16 sm:py-20 md:py-28 bg-[#faeee2] text-[#112e22] overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 px-2">
          <span className="font-serif-display text-[0.65rem] sm:text-[0.7rem] tracking-[0.3em] sm:tracking-[0.4em] text-[#a06d1c] uppercase font-bold">
            YOGA & ASANA PRACTICES
          </span>
          <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-balance leading-tight font-bold text-emerald-deep">
            Practices for every <em className="text-gold-gradient not-italic">body &amp; breath</em>.
          </h2>
          <div className="gold-divider mt-5 sm:mt-6 mx-auto" />
          <p className="mt-4 sm:mt-6 text-[#243e31] leading-relaxed text-sm md:text-base font-semibold">
            From classical foundational Hatha postures to dynamic Vinyasa, deep Yin relaxation, and
            guided therapeutic alignment sessions. Every pose is guided with precision, breath
            awareness, and personal care by Dr. Vikram.
          </p>

          {/* Toggle pill switcher */}
          <div className="mt-7 sm:mt-10 inline-flex w-full max-w-sm sm:max-w-none sm:w-auto flex-wrap sm:flex-nowrap items-center justify-center p-1.5 rounded-2xl sm:rounded-full bg-emerald-deep border border-[#0e442b] shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("daily")}
              className={`flex-1 sm:flex-none px-4 sm:px-7 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-[0.63rem] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
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
              className={`flex-1 sm:flex-none px-4 sm:px-7 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-[0.63rem] sm:text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "showcase"
                  ? "bg-gold-gradient text-emerald-deep shadow-md font-bold"
                  : "text-cream/80 hover:text-white font-medium"
              }`}
            >
              CLASSICAL ASANAS SHOWCASE
            </button>
          </div>
        </div>

        {activeTab === "daily" ? (
          /* 6 Yoga Classes in Balanced 3-Column Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {classList.map((c) => (
              <div
                key={c.t}
                className="group bg-[#082618] rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border-2 border-[#0e442b] shadow-[0_14px_40px_rgba(8,38,24,0.18)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40">
                  <img
                    src={c.img}
                    alt={c.t}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 via-transparent to-black/10 pointer-events-none" />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col flex-1">
                    <h3 className="font-display text-2xl text-cream font-bold">{c.t}</h3>
                    <p className="mt-3 text-sm text-cream/70 leading-relaxed font-semibold flex-1">{c.d}</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {classicalAsanas.map((c, i) => (
              <div
                key={c.sanskrit + i}
                className="group bg-[#082618] rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border-2 border-[#0e442b] shadow-[0_14px_40px_rgba(8,38,24,0.18)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40">
                  <img
                    src={c.img}
                    alt={`${c.sanskrit} - ${c.english}`}
                    className={`absolute inset-0 w-full h-full object-cover ${c.imgPosition || "object-center"} group-hover:scale-105 transition-transform duration-700`}
                    loading="lazy"
                    onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 via-transparent to-black/10 pointer-events-none" />
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div className="flex flex-col flex-1">
                    <h3 className="font-display text-2xl text-cream font-bold">{c.english}</h3>
                    <p className="mt-3 text-sm text-cream/70 leading-relaxed font-semibold flex-1">{c.d}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-cream/10 flex flex-col gap-3">
                    <span className="text-[0.72rem] tracking-wider text-gold font-bold min-h-[2.5rem] flex items-center">
                      {c.focus}
                    </span>
                    <a
                      href={`/apply?category=Yoga-Classes&course=${encodeURIComponent(c.english)}`}
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
function WellnessTherapiesSection({ resolveImg }: { resolveImg: (key: string, fb: string) => string }) {

  const therapies = [
    {
      t: "Shiatsu Massage Therapy",
      key: "shiatsu-massage",
      tag: "Japanese Acupressure",
      d: "Traditional Japanese acupressure technique applied along vital meridian pathways to unblock energetic stagnation and restore deep physiological equilibrium.",
      img: shiatsu,
    },
    {
      t: "Thai Yoga Massage Therapy",
      key: "thai-yoga-massage",
      tag: "Assisted Stretching",
      d: "Authentic assisted passive yoga stretching combined with rhythmic deep compressions along vital Sen lines to enhance flexibility, joint mobility, and energy flow.",
      img: thaiMassage,
    },
    {
      t: "Acupuncture Wellness Therapy",
      key: "acupuncture",
      tag: "TCM Point Therapy",
      d: "Traditional Chinese Medicine (TCM) acupoint stimulation designed to harmonize Qi circulation, balance the central nervous system, and support healing.",
      img: acupunctureReal,
    },
    {
      t: "Reflexology",
      key: "reflexology",
      tag: "Reflex Point System",
      d: "Targeted pressure-point therapy applied across precise micro-reflex maps on the feet and hands corresponding directly to bodily organs and glands.",
      img: reflexology,
    },
    {
      t: "Deep Tissue Massage Therapy",
      key: "deep-tissue-massage",
      tag: "Myofascial Release",
      d: "Slow, deliberate strokes and deep finger pressure applied to deeper muscular layers and myofascia to release chronic postural holding patterns.",
      img: deepTissue,
    },
    {
      t: "Ayurvedic Massage Therapy",
      key: "ayurvedic-massage",
      tag: "Dosha & Herbal Oil",
      d: "Classical Abhyanga ritual utilizing warm medicated herbal oils formulated to balance individual Doshas, stimulate lymphatic drainage, and revitalize vitality.",
      img: ayurvedic,
    },
    {
      t: "Cupping Therapy",
      key: "cupping-therapy",
      tag: "Circulation & Detox",
      d: "Traditional negative-pressure suction therapy that draws fresh oxygenated blood to stagnant areas, releasing deep myofascial tension and speeding cellular recovery.",
      img: cupping,
    },
    {
      t: "IASTM (Instrument-Assisted Soft Tissue Mobilization)",
      key: "iastm",
      tag: "Soft Tissue Therapy",
      d: "Clinical soft-tissue mobilization using specialized ergonomic contoured instruments to break down scar tissue, alleviate fascial restrictions, and optimize movement.",
      img: iastm,
    },
    {
      t: "Dorn Therapy",
      key: "dorn-therapy",
      tag: "Spinal Alignment",
      d: "Non-manipulative, gentle spinal therapy that corrects joint misalignments and leg-length discrepancies through active patient movement and natural bio-alignment.",
      img: dornTherapy,
    },
  ];

  return (
    <section id="wellness-therapies" className="relative py-16 sm:py-20 md:py-28 bg-[#faeee2] text-[#112e22] overflow-hidden">
      <div className="absolute top-0 left-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/2 -translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 px-2">
          <span className="font-serif-display text-[0.65rem] sm:text-[0.7rem] tracking-[0.3em] sm:tracking-[0.4em] text-[#a06d1c] uppercase font-bold">
            MASSAGE & WELLNESS THERAPIES
          </span>
          <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-balance leading-tight font-bold text-emerald-deep">
            Therapeutic touch, <em className="text-gold-gradient not-italic">refined into ritual</em>.
          </h2>
          <div className="gold-divider mt-5 sm:mt-6 mx-auto" />
          <p className="mt-4 sm:mt-6 text-[#243e31] leading-relaxed text-sm md:text-base font-semibold">
            Each treatment is delivered by certified therapists in serene private healing rooms, combining
            authentic classical techniques with personalized holistic care.
          </p>
        </div>

        {/* 9 Therapies in Balanced 3-Column Grid - with images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {therapies.map((item) => (
            <div
              key={item.t}
              className="group bg-[#082618] rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border-2 border-[#0e442b] shadow-[0_14px_40px_rgba(8,38,24,0.18)]"
            >
              {/* Therapy Image — DB-managed first, static fallback second */}
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40 flex-shrink-0">
                <img
                  src={resolveImg(item.key, item.img)}
                  alt={item.t}
                  className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 via-transparent to-black/10 pointer-events-none" />
                <div className="absolute top-3.5 right-3.5 glass-dark rounded-full px-2.5 py-0.5 text-[0.6rem] tracking-wider text-cream/90 font-bold border border-white/10">
                  {item.tag}
                </div>
              </div>

              {/* Therapy Content */}
              <div className="p-5 sm:p-6 md:p-7 flex-1 flex flex-col justify-between">
                <div className="flex flex-col flex-1">
                  <h3 className="font-display text-lg sm:text-xl md:text-2xl text-cream font-bold leading-snug min-h-[3rem] flex items-center">
                    {item.t}
                  </h3>
                  <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-cream/70 leading-relaxed font-semibold flex-1">
                    {item.d}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-cream/10">
                  <a
                    href={`/apply?category=Wellness-Therapies&course=${encodeURIComponent(item.t)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gold-gradient text-emerald-deep text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] shadow-soft"
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

/* ── 3. Retreat Programs ── */
function RetreatProgramsSection({ resolveImg }: { resolveImg: (key: string, fb: string) => string }) {
  const retreats = [
    {
      t: "7 Days & 14 Days Holistic Wellness Retreat",
      key: "holistic-wellness-retreat",
      tag: "Holistic Immersion",
      d: "A complete wellness immersion designed to restore balance, vitality, relaxation, and inner harmony through daily yoga, therapeutic bodywork, and mindful living.",
      img: resolveImg("holistic-wellness-retreat", wellnessRetreatImg),
    },
    {
      t: "Yoga & Meditation Retreat",
      key: "yoga-meditation-retreat",
      tag: "Traditional Practice",
      d: "A transformative retreat focused on classical yoga postures, breathwork, meditation, mindfulness, and spiritual rejuvenation.",
      img: resolveImg("yoga-meditation-retreat", meditationRetreatImg),
    },
    {
      t: "Couple Wellness Retreat",
      key: "couple-wellness-retreat",
      tag: "Shared Healing",
      d: "A rejuvenating escape for couples to reconnect, heal, and unwind together through partner yoga, therapeutic treatments, and peaceful coastal nature.",
      img: resolveImg("couple-wellness-retreat", coupleRetreatImg),
    },
    {
      t: "Yoga Detox & Rejuvenation Retreat",
      key: "yoga-detox-retreat",
      tag: "Lifestyle Renewal",
      d: "A cleansing retreat combining traditional yogic Shatkriyas, herbal nutrition, therapeutic massages, and stress release to revitalize the body.",
      img: resolveImg("yoga-detox-retreat", detoxRetreatImg),
    },
    {
      t: "Energy Balancing Retreat",
      key: "energy-balancing-retreat",
      tag: "Energetic Harmony",
      d: "A restorative retreat dedicated to aligning subtle energy channels, calming the nervous system, and restoring vitality with guided breath and touch therapies.",
      img: resolveImg("energy-balancing-retreat", varkalaBeach),
    },
    {
      t: "Anti-Aging & Healthy Longevity Retreat",
      key: "anti-aging-longevity-retreat",
      tag: "Graceful Vitality",
      d: "A comprehensive longevity program focusing on cellular rejuvenation, joint flexibility, stress reduction, and traditional Ayurvedic vitality therapies.",
      img: resolveImg("anti-aging-longevity-retreat", retreatBanner),
    },
    {
      t: "Pain Management & Therapeutic Wellness Retreat",
      key: "pain-management-retreat",
      tag: "Targeted Relief",
      d: "A specialized therapy retreat targeting chronic pain, postural misalignments, musculoskeletal tension, and spinal health under expert guidance.",
      img: resolveImg("pain-management-retreat", painManagementRetreatImg),
    },
    {
      t: "Stress & Insomnia Management Retreat",
      key: "stress-insomnia-retreat",
      tag: "Calm & Sleep",
      d: "A gentle nervous-system reset program designed to dissolve anxiety, restore healthy sleep patterns, and guide you back to restful tranquility.",
      img: resolveImg("stress-insomnia-retreat", stressInsomniaRetreatImg),
    },
  ];

  return (
    <section id="retreat-programs" className="relative py-16 sm:py-20 md:py-28 bg-[#faeee2] text-[#112e22] overflow-hidden">
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 px-2">
          <span className="font-serif-display text-[0.65rem] sm:text-[0.7rem] tracking-[0.3em] sm:tracking-[0.4em] text-[#a06d1c] uppercase font-bold">
            IMMERSIVE HEALING JOURNEYS
          </span>
          <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-balance leading-tight font-bold text-emerald-deep">
            Retreat Programs
          </h2>
          <div className="gold-divider mt-5 sm:mt-6 mx-auto" />
          <p className="mt-4 sm:mt-6 text-[#243e31] leading-relaxed text-sm md:text-base font-semibold">
            Step away from daily demands into our serene sanctuary in Varkala. Each program is carefully
            curated with daily yoga, Ayurvedic nutrition, therapeutic treatments, and mindfulness.
          </p>
        </div>

        {/* 8 Retreats in Balanced 4-Column Grid (2 Rows of 4 on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {retreats.map((r) => (
            <div
              key={r.t}
              className="group bg-[#082618] rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border-2 border-[#0e442b] shadow-[0_14px_40px_rgba(8,38,24,0.18)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40">
                <img
                  src={r.img}
                  alt={r.t}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
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
                  <p className="mt-3 text-xs md:text-sm text-cream/70 leading-relaxed font-semibold flex-1">
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
                    href={`/retreats#${r.key}`}
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

/* ── 4. Certificate Courses ── */
function CertificateCoursesSection({ resolveImg }: { resolveImg: (key: string, fb: string) => string }) {
  const courses = [
    {
      t: "Shiatsu Massage Certification",
      key: "cert-shiatsu",
      tag: "Certification",
      duration: "~21 Hours • 7–10 Days",
      d: "Traditional Japanese bodywork training focused on meridian-based therapy, therapeutic pressure application, energy balancing concepts, and mindful healing practices.",
      img: resolveImg("cert-shiatsu", shiatsu),
    },
    {
      t: "Thai Yoga Massage Certification",
      key: "cert-thai-yoga",
      tag: "Certification",
      duration: "~21 Hours • 7–10 Days",
      d: "Integrative therapeutic bodywork combining assisted stretching, passive yoga movements, acupressure techniques, and mindful body mechanics inspired by traditional Thai healing.",
      img: resolveImg("cert-thai-yoga", thaiMassage),
    },
    {
      t: "Reflexology Therapy Certification",
      key: "cert-reflexology",
      tag: "Certification",
      duration: "~12 Hours • 7 Days",
      d: "Holistic reflex-point therapy training focused on therapeutic stimulation of specific points on the feet and hands to support relaxation, circulation, and wellness balance.",
      img: resolveImg("cert-reflexology", reflexology),
    },
    {
      t: "Ayurvedic Massage Certification",
      key: "cert-ayurvedic",
      tag: "Certification",
      duration: "~21 Hours • 10 Days",
      d: "Traditional wellness massage training inspired by Ayurvedic principles using therapeutic oil application methods, rhythmic massage techniques, and holistic relaxation approaches.",
      img: resolveImg("cert-ayurvedic", ayurvedic),
    },
    {
      t: "Swedish Massage Certification",
      key: "cert-swedish",
      tag: "Certification",
      duration: "~21 Hours • 10 Days",
      d: "Foundational therapeutic massage training program focused on relaxation-based bodywork, circulation support, muscular comfort, and professional massage flow techniques.",
      img: resolveImg("cert-swedish", swedishMassage),
    },
    {
      t: "Deep Tissue Massage Certification",
      key: "cert-deep-tissue",
      tag: "Certification",
      duration: "~21 Hours • 10 Days",
      d: "Professional soft tissue training focused on deep muscular release techniques, fascia-focused manipulation methods, mobility support, and therapeutic recovery applications.",
      img: resolveImg("cert-deep-tissue", deepTissue),
    },
    {
      t: "Dorn Therapy Certification",
      key: "cert-dorn",
      tag: "Certification",
      duration: "~12 Hours • 7 Days",
      d: "Gentle therapeutic wellness training inspired by the German Dorn Method, focusing on posture awareness, spinal balancing, joint alignment concepts, and mindful corrective movement.",
      img: resolveImg("cert-dorn", dornTherapy),
    },
  ];

  return (
    <section id="certificate-courses" className="relative py-16 sm:py-20 md:py-28 bg-[#faeee2] text-[#112e22] overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full translate-y-1/2 -translate-x-1/3" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 md:mb-16 px-2">
          <span className="font-serif-display text-[0.65rem] sm:text-[0.7rem] tracking-[0.3em] sm:tracking-[0.4em] text-[#a06d1c] uppercase font-bold">
            PROFESSIONAL WELLNESS TRAINING
          </span>
          <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-5xl text-balance leading-tight font-bold text-emerald-deep">
            Certificate <em className="text-gold-gradient not-italic">Courses</em>
          </h2>
          <div className="gold-divider mt-5 sm:mt-6 mx-auto" />
          <p className="mt-4 sm:mt-6 text-[#243e31] leading-relaxed text-sm md:text-base font-semibold">
            Professional bodywork and holistic wellness certification programs personally guided by Dr. S. Vikram Pandy. Gain hands-on skills, therapeutic knowledge, and an internationally recognised certificate.
          </p>
        </div>

        {/* Courses Grid — 3 columns on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          {courses.map((c) => (
            <div
              key={c.t}
              className="group bg-[#082618] rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col border-2 border-[#0e442b] shadow-[0_14px_40px_rgba(8,38,24,0.18)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/40">
                <img
                  src={c.img}
                  alt={c.t}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-transparent to-black/20" />
                <div className="absolute top-4 right-4 glass-dark rounded-full px-3 py-1 text-[0.65rem] tracking-wider text-cream/90 font-bold border border-white/10">
                  {c.tag}
                </div>
              </div>

              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div className="flex flex-col flex-1">
                  <h3 className="font-display text-2xl text-cream font-bold leading-snug min-h-[3.5rem] flex items-center">
                    {c.t}
                  </h3>
                  <span className="mt-2 text-[0.72rem] tracking-wider text-gold font-bold flex items-center gap-1.5">
                    {c.duration}
                  </span>
                  <p className="mt-3 text-sm text-cream/70 leading-relaxed font-semibold flex-1">{c.d}</p>
                </div>

                <div className="mt-6 pt-5 border-t border-cream/10 flex flex-col gap-3">
                  <a
                    href={`/apply?category=Certification-Courses&course=${encodeURIComponent(c.t)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-emerald-deep text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] shadow-soft"
                  >
                    <span>Book This Course</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/certificate-courses"
                    className="inline-flex items-center justify-center gap-1.5 text-[0.65rem] tracking-[0.18em] uppercase text-gold hover:text-cream font-semibold transition-colors pt-1"
                  >
                    <span>View Full Details</span>
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
