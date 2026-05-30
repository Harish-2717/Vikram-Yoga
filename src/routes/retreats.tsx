import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import retreatBanner from "@/assets/retreat_banner.png";
import varkalaBeach from "@/assets/varkala_beach.png";
import hero from "@/assets/hero.jpg";
import about from "@/assets/about.jpg";
import therapy from "@/assets/therapy.jpg";
import temple1 from "@/assets/temple_1.png";
import temple2 from "@/assets/temple_2.png";
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
      t: "7 & 14 Days", 
      d: "Holistic Wellness", 
      details: "Our signature holistic wellness retreat designed to fully reset your system. Includes daily yoga, mindful meditation, personalized Ayurvedic meals, and classical naturopathy treatments." 
    },
    { 
      t: "Meditation", 
      d: "Soulful Retreat", 
      details: "A deeply immersive journey focusing on mindfulness, breathwork (pranayama), and guided meditation to find profound inner peace and mental clarity." 
    },
    { 
      t: "Couples", 
      d: "Shared Retreat", 
      details: "A beautiful opportunity for partners to reconnect, relax, and grow together through synchronized yoga practices, couples massage therapies, and shared wellness goals." 
    },
    { 
      t: "Detox", 
      d: "Renewal Retreat", 
      details: "Cleanse your body and mind with our intensive detox retreat. Features specialized diets, herbal cleansing, lymphatic drainage, and restorative yoga sessions." 
    },
    { 
      t: "Energy", 
      d: "Balancing Retreat", 
      details: "Realign your chakras and boost your life force. This program includes specialized energy balancing therapies like Shiatsu, acupuncture, and dynamic Vinyasa flows." 
    },
    { 
      t: "Pain Relief", 
      d: "Therapeutic", 
      details: "Tailored specifically for individuals managing chronic pain. Utilizes therapeutic bodywork, posture correction, dry needling, and gentle mobility sequences." 
    }
  ];

  return (
    <section className="py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-emerald-deep/5 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">WELLNESS RETREATS</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep leading-tight">Immersive healing for <em className="text-gold-gradient not-italic">body and mind</em>.</h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-muted-foreground leading-relaxed">
            Immersive 3, 7, and 14-day retreats in nature — combining daily yoga, naturopathy, ayurvedic cuisine, and silent practice. Designed for deep reset and lasting transformation.
          </p>
          <div className="mt-10 flex flex-col gap-4">
            {retreatsList.map((r) => {
              const isOpen = openRetreat === r.t;
              return (
                <div 
                  key={r.t} 
                  onClick={() => setOpenRetreat(isOpen ? null : r.t)}
                  className="bg-[#6f7062] hover:bg-[#606155] transition-colors rounded-2xl cursor-pointer shadow-soft overflow-hidden text-cream"
                >
                  <div className="p-6 text-center flex flex-col items-center relative">
                    <div className="font-display text-3xl">{r.t}</div>
                    <div className="text-[0.65rem] tracking-[0.3em] uppercase text-gold mt-1.5">{r.d}</div>
                  </div>
                  <div className={`grid transition-all duration-500 bg-[#606155]/50 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pt-2 text-cream/90 text-sm md:text-base leading-relaxed text-center">
                        {r.details}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <a href="/contact" className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold">Reserve Your Retreat <ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-luxury lg:sticky lg:top-32 hidden lg:block">
           <img src={hero} alt="Retreat Details" className="absolute inset-0 w-full h-full object-cover" />
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
             <img src={temple1} alt="Temple" className="w-full h-32 md:h-64 object-cover rounded-xl" />
             <img src={temple2} alt="Ritual" className="w-full h-32 md:h-64 object-cover rounded-xl" />
             <img src={retreatBanner} alt="Meditation" className="w-full h-32 md:h-64 object-cover rounded-xl" />
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
             <img src={hero} alt="Beach Yoga" className="w-full h-32 md:h-64 object-cover rounded-xl" />
             <img src={about} alt="Cultural Hug" className="w-full h-32 md:h-64 object-cover rounded-xl" />
             <img src={therapy} alt="Nature Walk" className="w-full h-32 md:h-64 object-cover rounded-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
