import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import retreatBanner from "@/assets/retreat_banner.png";
import varkalaBeach from "@/assets/varkala_beach.png";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.png";
import therapy from "@/assets/therapy.jpg";
import temple1 from "@/assets/temple_1.png";
import temple2 from "@/assets/temple_2.png";
import wellnessRetreatImg from "@/assets/Yoga wellness retreat.png";
import detoxRetreatImg from "@/assets/Yoga Detox & Rejuvenation Retreat.png";
import meditationRetreatImg from "@/assets/Yoga meditation retreat.png";
import coupleRetreatImg from "@/assets/Couple Wellness retreat.png";
import { ArrowRight, Flower2 } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";

export const Route = createFileRoute("/retreats")({
  component: RetreatsPage,
  head: () => ({
    meta: [
      { title: "Wellness Retreats — Dr. Vikram Yoga & Wellness Centre" },
    ],
  }),
});

function RetreatsPage() {
  return (
    <main className="overflow-x-hidden">
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
      overview: "A complete wellness immersion designed to restore balance, vitality, relaxation, and inner harmony through yoga, therapeutic wellness sessions, holistic healing practices, and mindful living.",
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
        "Comfortable Accommodation"
      ],
      highlights: [
        "Shiatsu Therapy", "Reflexology", "Thai Yoga Therapy", "Deep Tissue Therapy", "Traditional Ayurvedic Wellness Practices", "Mindful Living Education", "Personalized Wellness Programs"
      ],
      idealFor: "Relaxation, rejuvenation, lifestyle balance, recovery, and overall well-being."
    },
    {
      title: "YOGA & MEDITATION RETREAT",
      shortDesc: "Traditional Practice",
      img: meditationRetreatImg,
      overview: "A transformative retreat focused on traditional yoga, breathwork, meditation, mindfulness, and self-awareness.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation"
      ],
      highlights: [
        "Guided Meditation Practices", "Breath Awareness Training", "Chanting & Mindfulness Sessions", "Yoga Adjustment Sessions", "Psychic Physiology of Yoga", "Silent Reflection Practices"
      ],
      idealFor: "Mental clarity, emotional balance, mindfulness, and spiritual growth."
    },
    {
      title: "COUPLE WELLNESS RETREAT",
      shortDesc: "Shared Healing",
      img: coupleRetreatImg,
      overview: "A rejuvenating retreat designed for couples seeking connection, relaxation, healing, and mindful living together.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Wellness Massage Sessions",
        "Couple Massage Learning Sessions",
        "Healthy Kerala Cuisine",
        "Private Accommodation"
      ],
      highlights: [
        "Couple Yoga Practices", "Partner Breathing Exercises", "Relaxation & Mindfulness Activities", "Wellness Therapy Experiences", "Shared Healing Journey"
      ],
      idealFor: "Couples seeking relaxation, emotional connection, wellness, and quality time together."
    },
    {
      title: "YOGA DETOX & REJUVENATION RETREAT",
      shortDesc: "Lifestyle Renewal",
      img: detoxRetreatImg,
      overview: "A holistic cleansing and lifestyle renewal retreat designed to support detoxification, digestive wellness, energy renewal, and mindful living.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Pulse Diagnosis Assessment",
        "Iris Diagnosis Assessment",
        "Healthy Detox Meals & Kerala Cuisine",
        "Comfortable Accommodation"
      ],
      highlights: [
        "Jala Neti (Yogic Nasal Cleansing)", "Kapalabhati (Yogic Cranial Cleansing Practice)", "Vamana Dhauti (Yogic Stomach Cleansing Practice)", "Yogic Detox Techniques", "Ayurveda-Inspired Lifestyle Guidance", "Digestive Wellness Education"
      ],
      idealFor: "Detoxification, energy renewal, digestive support, and healthy lifestyle transformation."
    },
    {
      title: "ENERGY BALANCING RETREAT",
      shortDesc: "Energetic Harmony",
      img: varkalaBeach,
      overview: "A restorative retreat designed to harmonize physical energy, emotional well-being, and mental calmness through holistic healing practices.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation"
      ],
      highlights: [
        "Shiatsu Therapy", "Reflexology", "Reiki Wellness Sessions", "Thai Yoga Therapy", "Acupuncture-Based Wellness Support", "Beach Pranayama & Meditation Sessions", "Energy Awareness Practices"
      ],
      idealFor: "Stress relief, emotional balance, relaxation, and energetic harmony."
    },
    {
      title: "ANTI-AGING & HEALTHY LONGEVITY RETREAT",
      shortDesc: "Graceful Aging",
      img: retreatBanner,
      overview: "A holistic wellness retreat focused on vitality, healthy aging, mobility, stress reduction, and overall well-being.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Pulse Diagnosis Assessment",
        "Iris Diagnosis Assessment",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation"
      ],
      highlights: [
        "Yoga for Healthy Aging", "Breathwork for Vitality", "Wellness Therapies for Circulation & Recovery", "Natural Rejuvenation Practices", "Lifestyle & Longevity Guidance", "Stress Management Techniques", "Healthy Aging Education"
      ],
      idealFor: "Vitality, graceful aging, mobility, relaxation, and long-term wellness."
    },
    {
      title: "PAIN MANAGEMENT & THERAPEUTIC WELLNESS RETREAT",
      shortDesc: "Therapeutic Support",
      img: therapy,
      overview: "A therapeutic wellness retreat designed to support mobility, posture, muscular recovery, and overall physical well-being.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Personalized Therapeutic Guidance",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation"
      ],
      highlights: [
        "Therapeutic Yoga Practices", "Mobility & Stretching Sessions", "Postural Awareness Training", "Deep Tissue Therapy", "Shiatsu Therapy", "Reflexology", "Relaxation & Recovery Techniques"
      ],
      idealFor: "Mobility support, muscular relaxation, posture improvement, and recovery."
    },
    {
      title: "STRESS & INSOMNIA MANAGEMENT RETREAT",
      shortDesc: "Calm & Balance",
      img: about,
      overview: "A calming retreat designed to relax the nervous system, improve sleep quality, reduce stress, and restore emotional balance.",
      included: [
        "Sunrise Yoga Session (Morning Practice – 90 Minutes)",
        "Sunset Yoga Session (Evening Practice – 90 Minutes)",
        "Daily Pranayama & Meditation Session (60 Minutes)",
        "Daily Wellness Therapy Session (60 Minutes)",
        "Doctor Consultation & Wellness Assessment",
        "Healthy Kerala Cuisine",
        "Comfortable Accommodation"
      ],
      highlights: [
        "Guided Meditation Practices", "Sleep Wellness Education", "Nervous System Relaxation Techniques", "Breathwork & Mindfulness Sessions", "Emotional Wellness Practices", "Relaxation Yoga", "Stress Management Guidance"
      ],
      idealFor: "Stress reduction, better sleep, emotional well-being, and mental clarity."
    }
  ];

  return (
    <section className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-deep/5 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div className="lg:max-w-xl">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">WELLNESS RETREATS & TRANSFORMATIONAL PROGRAMS</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep leading-tight">Holistic Healing • Mindful Living • <em className="text-gold-gradient not-italic">Inner Transformation</em>.</h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-muted-foreground leading-relaxed">
            At Dr. VIKRAM YOGA & WELLNESS CENTRE, our wellness retreats are thoughtfully designed to support physical well-being, emotional balance, mental clarity, relaxation, and personal transformation. Set in the serene coastal environment of Varkala, Kerala, our retreat experiences combine authentic yoga practices, therapeutic wellness approaches, holistic healing methods, and mindful lifestyle guidance.
            <br /><br />
            Each retreat includes personalized support and a balanced daily schedule designed to nurture the body, calm the mind, and promote complete well-being.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {retreatsList.map((r) => {
              const isOpen = openRetreat === r.title;
              return (
                <div
                  key={r.title}
                  onClick={() => setOpenRetreat(isOpen ? null : r.title)}
                  className="bg-[#6f7062] hover:bg-[#606155] transition-colors rounded-2xl cursor-pointer shadow-soft overflow-hidden text-cream"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-48 h-32 md:h-auto relative overflow-hidden shrink-0">
                      <img src={r.img} alt={r.title} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="p-5 sm:p-6 text-left flex-1 flex flex-col justify-center">
                      <div className="font-display text-xl sm:text-2xl leading-tight">{r.title}</div>
                      <div className="text-[0.65rem] tracking-[0.3em] uppercase text-gold mt-1.5">{r.shortDesc}</div>
                    </div>
                  </div>
                  <div className={`grid transition-all duration-500 bg-[#53544a] ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <div className="p-6 text-cream/90 text-sm leading-relaxed space-y-6 text-left">
                        <div>
                          <strong className="text-gold tracking-wide uppercase text-xs mb-1 block">Overview</strong>
                          <p>{r.overview}</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                          <div>
                            <strong className="text-gold tracking-wide uppercase text-xs mb-2 block">What's Included</strong>
                            <ul className="space-y-1.5">
                              {r.included.map((item, i) => (
                                <li key={i} className="flex gap-2 text-xs items-start">
                                  <span className="text-gold mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <strong className="text-gold tracking-wide uppercase text-xs mb-2 block">Retreat Highlights</strong>
                            <ul className="space-y-1.5">
                              {r.highlights.map((item, i) => (
                                <li key={i} className="flex gap-2 text-xs items-start">
                                  <span className="text-gold mt-0.5">•</span> {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div>
                          <strong className="text-gold tracking-wide uppercase text-xs mb-1 block">Ideal For</strong>
                          <p>{r.idealFor}</p>
                        </div>

                        <div className="pt-2 text-center">
                          <a href={`/apply?course=${encodeURIComponent(r.title)}`} className="inline-block px-6 py-2 rounded-full bg-gold-gradient text-emerald-deep font-semibold tracking-wider text-xs hover:opacity-90 transition-opacity">Apply Now</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxury lg:sticky lg:top-32 hidden lg:block">
          <img src={wellnessRetreatImg} alt="Retreat Details" className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
}

function Excursions() {
  return (
    <section className="py-20 bg-[#FDF5EC] text-gray-800">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-[#E57624] italic font-semibold text-sm mb-2 block">Dr. Vikram Yoga & Wellness Centre - Excursion</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Temple Visit & Local Excursion</h2>
          <div className="flex justify-center items-center">
            <span className="w-16 h-px bg-gray-400"></span>
            <span className="px-3"><Flower2 className="w-4 h-4 text-gray-500" /></span>
            <span className="w-16 h-px bg-gray-400"></span>
          </div>
        </div>

        <p className="mb-8 text-sm md:text-base leading-relaxed text-center">
          At <strong>Dr. Vikram Yoga & Wellness Centre</strong>, we believe that the journey of self-discovery through yoga is enhanced by connecting with the rich cultural and spiritual heritage of the region. Our <strong>Temple Visit & Local Excursion</strong> program offers students a unique opportunity to explore the beautiful temples and local attractions in and around Varkala, Kerala.
        </p>

        {/* Temple Visits */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-2">Temple Visits</h3>
          <hr className="border-gray-300 mb-6" />
          <p className="mb-6 text-sm leading-relaxed">
            Experience the spirituality and serenity of Kerala by visiting some of its most revered temples. Each temple visit provides insight into the region's rich history and the significance of these sacred spaces. You'll have the chance to:
          </p>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span><strong>Explore Ancient Temples:</strong> Visit traditional temples, such as Janardhana Swami Temple, an ancient shrine dedicated to Lord Vishnu, and witness the rituals and practices that have been followed for centuries.</span>
            </li>
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span><strong>Participate in Rituals:</strong> Engage in local customs and rituals, providing a deeper understanding of the spiritual practices that accompany yoga.</span>
            </li>
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span><strong>Meditation and Reflection:</strong> Take part in guided meditation sessions at the temples, allowing you to connect with the spiritual energy of these sacred spaces.</span>
            </li>
          </ul>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <img src={meditationRetreatImg} alt="Beach Yoga" className="w-full h-32 md:h-64 object-cover rounded-xl" />
            <img src={detoxRetreatImg} alt="Cultural Hug" className="w-full h-32 md:h-64 object-cover rounded-xl" />
            <img src={coupleRetreatImg} alt="Nature Walk" className="w-full h-32 md:h-64 object-cover rounded-xl" />
          </div>
        </div>

        {/* Local Excursions */}
        <div>
          <h3 className="text-xl font-bold mb-2">Local Excursions</h3>
          <hr className="border-gray-300 mb-6" />
          <p className="mb-6 text-sm leading-relaxed">
            Our local excursions are designed to help you experience the beauty and vibrancy of Varkala and its surroundings. Some highlights include:
          </p>
          <ul className="space-y-4 mb-8 text-sm">
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span><strong>Beach Retreats:</strong> Spend a day at Varkala's stunning beaches, where you can relax, meditate, or practice yoga by the sea. The soothing sound of the waves enhances your connection with nature.</span>
            </li>
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span><strong>Cultural Experiences:</strong> Visit local markets, artisan shops, and craft workshops to learn about Kerala's rich traditions and craftsmanship. Engage with the local community and gain a deeper appreciation for their way of life.</span>
            </li>
            <li className="flex gap-3">
              <Flower2 className="w-5 h-5 shrink-0 text-[#E57624] mt-0.5" />
              <span><strong>Nature Walks:</strong> Discover the breathtaking landscapes of Varkala with guided nature walks. Immerse yourself in the natural beauty of the region while enjoying the tranquility that surrounds you.</span>
            </li>
          </ul>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            <img src={meditationRetreatImg} alt="Beach Yoga" className="w-full h-32 md:h-64 object-cover rounded-xl" />
            <img src={detoxRetreatImg} alt="Cultural Hug" className="w-full h-32 md:h-64 object-cover rounded-xl" />
            <img src={coupleRetreatImg} alt="Nature Walk" className="w-full h-32 md:h-64 object-cover rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
