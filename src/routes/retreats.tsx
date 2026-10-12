import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import retreatBanner from "@/assets/retreat_banner.png";
import varkalaBeach from "@/assets/varkala_beach.png";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.png";
import therapy from "@/assets/therapy.jpg";
import temple1 from "@/assets/temple_1.png";
import temple2 from "@/assets/temple_2.png";
import sivagiriMuttImg from "@/assets/sivagiri_mutt.jpg";
import anjengoFortImg from "@/assets/anjengo_fort.jpg";
import kappilBackwatersImg from "@/assets/about_hero_veranda.jpg";
import wellnessRetreatImg from "@/assets/Yoga wellness retreat.png";
import detoxRetreatImg from "@/assets/Yoga Detox & Rejuvenation Retreat.png";
import meditationRetreatImg from "@/assets/Yoga meditation retreat.png";
import coupleRetreatImg from "@/assets/Couple Wellness retreat.png";
import stressInsomniaRetreatImg from "@/assets/stress_insomnia_retreat.jpg";
import painManagementRetreatImg from "@/assets/pain_management_retreat.jpg";
import { ArrowRight, Flower2, ChevronDown, MapPin } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat, PageHero } from "./about";

export const Route = createFileRoute("/retreats")({
  component: RetreatsPage,
  head: () => ({
    meta: [{ title: "Wellness Retreats — Dr. Vikram Yoga & Wellness Centre" }],
  }),
});

function RetreatsPage() {
  return (
    <main className="overflow-x-hidden bg-[#faeee2]">
      <Navbar />
      <PageHero
        title="Wellness Retreats"
        subtitle="Step away. Come home to yourself."
        bg={retreatBanner}
      />
      <RetreatsSection />
      <Excursions />
      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}

function RetreatsSection() {
  const [openRetreat, setOpenRetreat] = useState<string | null>(null);

  const retreatsList = [
    {
      title: "7 DAYS & 14 DAYS HOLISTIC WELLNESS RETREAT",
      shortDesc: "Holistic Wellness",
      img: wellnessRetreatImg,
      overview:
        "A complete wellness immersion designed to restore balance, vitality, relaxation, and inner harmony through yoga, therapeutic wellness sessions, holistic healing practices, and mindful living.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Pulse Diagnosis Assessment",
        "Iris Diagnosis Assessment",
        "Personalized Wellness Guidance",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation",
      ],
      highlights: [
        "Shiatsu Therapy",
        "Reflexology",
        "Thai Yoga Therapy",
        "Deep Tissue Therapy",
        "Traditional Ayurvedic Wellness Practices",
        "Mindful Living Education",
        "Personalized Wellness Programs",
      ],
      idealFor: "Relaxation, rejuvenation, lifestyle balance, recovery, and overall well-being.",
    },
    {
      title: "YOGA & MEDITATION RETREAT",
      shortDesc: "Traditional Practice",
      img: meditationRetreatImg,
      overview:
        "A transformative retreat focused on traditional yoga, breathwork, meditation, mindfulness, self-awareness, and inner well-being.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation",
      ],
      highlights: [
        "Guided Meditation Practices",
        "Breath Awareness Training",
        "Chanting & Mindfulness Sessions",
        "Yoga Philosophy & Traditional Wisdom Sessions",
        "Chakra & Energy Awareness Sessions",
        "Interactive Yoga Learning & Discussion Sessions",
        "Yoga Alignment & Adjustment Guidance",
        "Relaxation Practices",
      ],
      idealFor:
        "Mental clarity, emotional balance, mindfulness, self-awareness, relaxation, and spiritual growth",
    },
    {
      title: "COUPLE WELLNESS RETREAT",
      shortDesc: "Shared Healing",
      img: coupleRetreatImg,
      overview:
        "A rejuvenating retreat designed for couples seeking connection, relaxation, healing, and mindful living together.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Wellness Massage Sessions",
        "Couple Massage Learning Sessions",
        "Healthy Kerala Cuisine",
        "Private Accommodation",
      ],
      highlights: [
        "Couple Yoga Practices",
        "Partner Breathing Exercises",
        "Relaxation & Mindfulness Activities",
        "Wellness Therapy Experiences",
        "Shared Healing Journey",
      ],
      idealFor:
        "Couples seeking relaxation, emotional connection, wellness, and quality time together.",
    },
    {
      title: "YOGA DETOX & REJUVENATION RETREAT",
      shortDesc: "Lifestyle Renewal",
      img: detoxRetreatImg,
      overview:
        "A holistic wellness retreat designed to support natural cleansing practices, rejuvenation, relaxation, energy renewal, digestive wellness, and mindful living.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation",
      ],
      highlights: [
        "Jala Neti (Yogic Nasal Cleansing)",
        "Kapalabhati (Yogic Cleansing Breathing Practice)",
        "Vamana Dhauti (Yogic Stomach Cleansing Practice)",
        "Shiatsu Therapy",
        "Reflexology",
        "Fasting Awareness & Guided Learning Sessions",
        "Aarogya Raksha Panchatantras – Five Principles for Healthy Living Learning Session",
        "Ayurveda-Inspired Lifestyle Guidance",
      ],
      idealFor:
        "Individuals seeking rejuvenation, relaxation, energy renewal, mindful lifestyle practices, digestive wellness support, and a refreshing holistic wellness experience.",
    },
    {
      title: "ENERGY BALANCING RETREAT",
      shortDesc: "Energetic Harmony",
      img: varkalaBeach,
      overview:
        "A restorative retreat designed to harmonize physical energy, emotional well-being, and mental calmness through holistic healing practices.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation",
      ],
      highlights: [
        "Shiatsu Therapy",
        "Reflexology",
        "Reiki Wellness Sessions",
        "Thai Yoga Therapy",
        "Acupuncture-Based Wellness Support",
        "Beach Pranayama & Meditation Sessions",
        "Energy Awareness Practices",
      ],
      idealFor: "Stress relief, emotional balance, relaxation, and energetic harmony.",
    },
    {
      title: "ANTI-AGING & HEALTHY LONGEVITY RETREAT",
      shortDesc: "Graceful Aging",
      img: retreatBanner,
      overview:
        "A holistic wellness retreat focused on vitality, healthy aging, mobility, stress reduction, and overall well-being.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Pulse Diagnosis Assessment",
        "Iris Diagnosis Assessment",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation",
      ],
      highlights: [
        "Yoga for Healthy Aging",
        "Breathwork for Vitality",
        "Wellness Therapies for Relaxation & Recovery",
        "Natural Rejuvenation Practices",
        "Stress Management & Relaxation Techniques",
        "Healthy Aging Awareness Sessions",
        "Shiatsu Therapy",
        "Reflexology",
        "Dorn Therapy (Spine Care Therapy)",
      ],
      idealFor:
        "Vitality, graceful aging, improved mobility, relaxation, stress reduction, and long-term wellness.",
    },
    {
      title: "PAIN MANAGEMENT & THERAPEUTIC WELLNESS RETREAT",
      shortDesc: "Therapeutic Support",
      img: painManagementRetreatImg,
      overview:
        "A therapeutic wellness retreat designed to support mobility, posture, muscular recovery, and overall physical well-being.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Personalized Therapeutic Guidance",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation",
      ],
      highlights: [
        "Therapeutic Yoga Practices",
        "Mobility & Stretching Sessions",
        "Postural Awareness Training",
        "Deep Tissue Therapy",
        "Shiatsu Therapy",
        "Reflexology",
        "Cupping Therapy",
        "Acupuncture-Based Wellness Support",
        "Dorn Therapy (Spine Care Therapy)",
        "Relaxation & Recovery Techniques",
      ],
      idealFor: "Mobility support, muscular relaxation, posture awareness, relaxation, and overall physical well-being.",
    },
    {
      title: "STRESS & INSOMNIA MANAGEMENT RETREAT",
      shortDesc: "Calm & Balance",
      img: stressInsomniaRetreatImg,
      overview:
        "A calming retreat designed to relax the nervous system, improve sleep quality, reduce stress, and restore emotional balance.",
      included: [
        "Gentle Morning Yoga & Mobility Practice (90 Minutes)",
        "Evening Relaxation Yoga & Deep Rest Practice (90 Minutes)",
        "Calming Pranayama & Guided Meditation (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Personalized Doctor Consultation & Wellness Assessment",
        "Sleep & Lifestyle Wellness Guidance",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation",
      ],
      highlights: [
        "Guided Meditation Practices",
        "Relaxation Yoga",
        "Shiatsu Therapy",
        "Pranayama & Calming Breathwork",
        "Reflexology",
        "Nervous System Relaxation Techniques",
        "Acupuncture-Based Wellness Support",
        "Sleep Wellness Education",
        "Guided Deep Relaxation",
        "Mindfulness Practices",
        "Emotional Wellness Practices",
        "Stress Management Guidance",
      ],
      idealFor:
        "Stress reduction, better sleep, emotional well-being, relaxation, and mental clarity.",
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#faeee2] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-deep/5 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── TOP SECTION: Left Intro Content + Right Main Image ── */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch mb-12 lg:mb-16">
          {/* Left Side Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <span className="font-serif-display text-[0.68rem] md:text-[0.72rem] tracking-[0.3em] text-[#1c382b] uppercase font-semibold">
              WELLNESS RETREATS &amp; TRANSFORMATIONAL PROGRAMS
            </span>

            <h2 className="mt-3.5 font-display text-3xl sm:text-4xl lg:text-[2.65rem] text-emerald-deep leading-[1.18] font-bold">
              Holistic Healing &bull; Mindful Living &bull;{" "}
              <span className="text-[#c59a3f] italic font-normal">Inner Transformation</span>.
            </h2>

            <div className="gold-divider my-6 max-w-xs" />

            <p className="text-[#3c5245] text-sm sm:text-base leading-relaxed">
              At Dr. VIKRAM YOGA &amp; WELLNESS CENTRE, our wellness retreats are thoughtfully designed to
              support physical well-being, emotional balance, mental clarity, relaxation, and personal
              transformation. Set in the serene coastal environment of Varkala, Kerala, our retreat
              experiences combine authentic yoga practices, therapeutic wellness approaches, holistic
              healing methods, and mindful lifestyle guidance.
            </p>

            <p className="mt-4 text-[#3c5245] text-sm sm:text-base leading-relaxed">
              Each retreat includes personalized support and a balanced daily schedule designed to
              nurture the body, calm the mind, and promote complete well-being.
            </p>
          </div>

          {/* Right Side Main Image - Stretches and aligns vertically with the left content */}
          <div className="lg:col-span-5 relative flex min-h-[360px] sm:min-h-[420px] lg:min-h-0">
            <div className="w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-luxury border border-gold/20">
              <img
                src={wellnessRetreatImg}
                alt="Your Gateway to Holistic Wellness"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* ── RETREAT CARDS: Two-Column Alternating Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6 items-start">
          {retreatsList.map((r) => {
            const isOpen = openRetreat === r.title;
            // Derive a stable anchor id from the title
            const anchorId = r.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "");
            return (
              <div
                id={anchorId}
                key={r.title}
                className="bg-emerald-deep hover:bg-[#0c2a21] transition-colors rounded-2xl cursor-pointer shadow-soft hover:shadow-luxury overflow-hidden text-cream border border-gold/20"
              >
                {/* Card Header Row: Thumbnail on left, Title + Subtitle on right */}
                <div
                  onClick={() => setOpenRetreat(isOpen ? null : r.title)}
                  className="flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 select-none"
                >
                  {/* Thumbnail Image */}
                  <div className="w-28 sm:w-36 md:w-36 lg:w-44 h-20 sm:h-24 rounded-xl overflow-hidden shrink-0 relative">
                    <img
                      src={r.img}
                      alt={r.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Title and Category */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h3 className="font-display text-xs sm:text-sm lg:text-[0.92rem] font-extrabold leading-snug text-white tracking-wide uppercase line-clamp-2">
                      {r.title}
                    </h3>
                    <div className="text-[0.58rem] sm:text-[0.64rem] tracking-[0.22em] uppercase text-gold font-semibold mt-1">
                      {r.shortDesc}
                    </div>
                  </div>

                  {/* Expand Chevron Icon */}
                  <div className="shrink-0 pr-2 text-gold/80">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-gold" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Expandable Accordion Body */}
                <div
                  className={`grid transition-all duration-400 bg-[#0c2a21] ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="p-5 sm:p-6 text-cream/90 text-sm leading-relaxed space-y-5 text-left border-t border-cream/10">
                      <div>
                        <strong className="text-gold tracking-widest uppercase text-xs mb-1.5 block font-bold">
                          Overview
                        </strong>
                        <p className="text-xs sm:text-sm text-cream/90 font-medium leading-relaxed">{r.overview}</p>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5 pt-1">
                        <div>
                          <strong className="text-gold tracking-widest uppercase text-xs mb-2 block font-bold">
                            What's Included
                          </strong>
                          <ul className="space-y-1.5">
                            {r.included.map((item, idx) => (
                              <li key={idx} className="flex gap-2 text-xs text-cream/90 font-medium items-start">
                                <span className="text-gold shrink-0">•</span> <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-gold tracking-widest uppercase text-xs mb-2 block font-bold">
                            Retreat Highlights
                          </strong>
                          <ul className="space-y-1.5">
                            {r.highlights.map((item, idx) => (
                              <li key={idx} className="flex gap-2 text-xs text-cream/90 font-medium items-start">
                                <span className="text-gold shrink-0">•</span> <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div>
                        <strong className="text-gold tracking-widest uppercase text-xs mb-1.5 block font-bold">
                          Ideal For
                        </strong>
                        <p className="text-xs sm:text-sm text-cream/90 font-medium leading-relaxed">{r.idealFor}</p>
                      </div>

                      <div className="pt-2 flex justify-end">
                        <a
                          href={`/retreat-apply?course=${encodeURIComponent(r.title)}`}
                          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-gradient text-emerald-deep font-semibold tracking-wider text-xs uppercase shadow-md hover:scale-105 transition-transform"
                        >
                          Apply Now <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
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

function Excursions() {
  return (
    <section className="py-20 bg-[#faeee2] text-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[#E57624] italic font-semibold text-sm mb-2 block">
            Dr. Vikram Yoga & Wellness Centre - Excursion
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Temple Visit & Local Excursion</h2>
          <div className="flex justify-center items-center">
            <span className="w-16 h-px bg-gray-400"></span>
            <span className="px-3">
              <Flower2 className="w-4 h-4 text-gray-500" />
            </span>
            <span className="w-16 h-px bg-gray-400"></span>
          </div>
        </div>

        <p className="mb-8 text-sm md:text-base leading-relaxed text-center">
          At <strong>Dr. Vikram Yoga & Wellness Centre</strong>, we believe that the journey of
          self-discovery through yoga is enhanced by connecting with the rich cultural and spiritual
          heritage of the region. Our <strong>Temple Visit & Local Excursion</strong> program offers
          students a unique opportunity to explore the beautiful temples and local attractions in
          and around Varkala, Kerala.
        </p>

        {/* Temple Visits */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-2">Temple Visits</h3>
          <hr className="border-gray-300 mb-6" />
          <p className="mb-6 text-sm leading-relaxed">
            Experience the spirituality and serenity of Kerala by visiting some of its most revered
            temples. Each temple visit provides insight into the region's rich history and the
            significance of these sacred spaces. You'll have the chance to:
          </p>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span>
                <strong>Explore Ancient Temples:</strong> Visit traditional temples, such as
                Janardhana Swami Temple, an ancient shrine dedicated to Lord Vishnu, and witness the
                rituals and practices that have been followed for centuries.
              </span>
            </li>
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span>
                <strong>Participate in Rituals:</strong> Engage in local customs and rituals,
                providing a deeper understanding of the spiritual practices that accompany yoga.
              </span>
            </li>
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span>
                <strong>Meditation and Reflection:</strong> Take part in guided meditation sessions
                at the temples, allowing you to connect with the spiritual energy of these sacred
                spaces.
              </span>
            </li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <div className="relative overflow-hidden rounded-xl h-48 sm:h-40 md:h-64 bg-gray-200 group">
              <img
                src={temple1}
                alt="Janardhana Swamy Temple"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 md:p-3 pt-6 flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#E57624] shrink-0" />
                <span className="text-[0.7rem] md:text-xs font-semibold drop-shadow truncate">
                  Janardhana Swamy Temple, Varkala
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl h-48 sm:h-40 md:h-64 bg-gray-200 group">
              <img
                src={temple2}
                alt="Sacred Temple Rituals & Pooja"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            <div className="relative overflow-hidden rounded-xl h-48 sm:h-40 md:h-64 bg-gray-200 group">
              <img
                src={sivagiriMuttImg}
                alt="Sivagiri Mutt & Ashram"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 md:p-3 pt-6 flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#E57624] shrink-0" />
                <span className="text-[0.7rem] md:text-xs font-semibold drop-shadow truncate">
                  Sivagiri Mutt &amp; Ashram, Varkala
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Local Excursions */}
        <div>
          <h3 className="text-xl font-bold mb-2">Local Excursions</h3>
          <hr className="border-gray-300 mb-6" />
          <p className="mb-6 text-sm leading-relaxed">
            Our local excursions are designed to help you experience the beauty and vibrancy of
            Varkala and its surroundings. Some highlights include:
          </p>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span>
                <strong>Beach Retreats:</strong> Spend a day at Varkala's stunning beaches, where
                you can relax, meditate, or practice yoga by the sea. The soothing sound of the
                waves enhances your connection with nature.
              </span>
            </li>
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span>
                <strong>Cultural Experiences:</strong> Visit local markets, artisan shops, and craft
                workshops to learn about Kerala's rich traditions and craftsmanship. Engage with the
                local community and gain a deeper appreciation for their way of life.
              </span>
            </li>
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span>
                <strong>Nature Walks:</strong> Discover the breathtaking landscapes of Varkala with
                guided nature walks. Immerse yourself in the natural beauty of the region while
                enjoying the tranquility that surrounds you.
              </span>
            </li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
            <div className="relative overflow-hidden rounded-xl h-48 sm:h-40 md:h-64 bg-gray-200 group">
              <img
                src={varkalaBeach}
                alt="Varkala Beach (Papanasam Beach)"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 md:p-3 pt-6 flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#E57624] shrink-0" />
                <span className="text-[0.7rem] md:text-xs font-semibold drop-shadow truncate">
                  Varkala Beach (Papanasam Beach)
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl h-48 sm:h-40 md:h-64 bg-gray-200 group">
              <img
                src={anjengoFortImg}
                alt="Anjengo Fort & Historic Lighthouse"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 md:p-3 pt-6 flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#E57624] shrink-0" />
                <span className="text-[0.7rem] md:text-xs font-semibold drop-shadow truncate">
                  Anjengo Fort &amp; Lighthouse
                </span>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl h-48 sm:h-40 md:h-64 bg-gray-200 group">
              <img
                src={kappilBackwatersImg}
                alt="Kappil Beach & Backwaters"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2 md:p-3 pt-6 flex items-center gap-1.5 text-white">
                <MapPin className="w-3.5 h-3.5 text-[#E57624] shrink-0" />
                <span className="text-[0.7rem] md:text-xs font-semibold drop-shadow truncate">
                  Kappil Beach &amp; Backwaters
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
