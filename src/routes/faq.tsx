import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import about from "@/assets/about.png";
import {
  ChevronDown,
  Search,
  HelpCircle,
  Flower2,
  Heart,
  Mountain,
  Award,
  Globe,
  X,
  Sparkles,
} from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat, PageHero } from "./about";

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Find answers about our yoga classes, wellness retreats, therapeutic massage courses, and online training.",
      },
    ],
  }),
});

interface FAQItem {
  category: string;
  q: string;
  a: string;
}

function FAQPage() {
  return (
    <main className="overflow-x-hidden bg-cream min-h-screen">
      <Navbar />
      <PageHero
        title="Frequently Asked Questions"
        subtitle="Finding clarity on your path to holistic wellness and transformation."
        bg={about}
      />
      <FAQSection />
      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}

function FAQSection() {
  const [activeTab, setActiveTab] = useState<string>("general");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openIdx, setOpenIdx] = useState<number | null>(0); // Default open first question

  const categories = [
    { id: "general", label: "General", icon: HelpCircle },
    { id: "yoga", label: "Yoga Classes", icon: Flower2 },
    { id: "therapies", label: "Wellness Therapies", icon: Heart },
    { id: "retreats", label: "Retreats", icon: Mountain },
    { id: "courses", label: "Certifications", icon: Award },
    { id: "online", label: "Online Classes", icon: Globe },
  ];

  const faqData: FAQItem[] = [
    // General Information
    {
      category: "general",
      q: "Where is Dr. Vikram Yoga & Wellness Centre located?",
      a: "Our centre is located in the peaceful coastal destination of Varkala, Trivandrum, Kerala, India, offering a serene environment for yoga, wellness therapies, retreats, and professional training programs.",
    },
    {
      category: "general",
      q: "How can I book a session or retreat?",
      a: "Bookings can be made through our website, WhatsApp, email, or by contacting our team directly.",
    },
    {
      category: "general",
      q: "Do you accept international guests?",
      a: "Yes. We welcome guests, students, and wellness seekers from around the world.",
    },
    {
      category: "general",
      q: "Is accommodation available?",
      a: "Accommodation options are available for retreat participants and selected training programs.",
    },
    {
      category: "general",
      q: "Is airport transfer available?",
      a: "Airport and local transportation assistance can be arranged upon request.",
    },
    // Yoga Classes
    {
      category: "yoga",
      q: "Are your yoga classes suitable for beginners?",
      a: "Yes. Our yoga sessions are suitable for beginners as well as experienced practitioners.",
    },
    {
      category: "yoga",
      q: "Which styles of yoga do you offer?",
      a: "We offer Hatha Yoga, Hatha Flow, Vinyasa Flow, Yin Yoga, Pranayama, Meditation, and personalized yoga sessions.",
    },
    {
      category: "yoga",
      q: "Do I need to be flexible to join yoga classes?",
      a: "No. Flexibility develops gradually through regular practice.",
    },
    {
      category: "yoga",
      q: "Are private yoga sessions available?",
      a: "Yes. One-to-one yoga sessions can be arranged based on individual goals and requirements.",
    },
    {
      category: "yoga",
      q: "Do you offer beach yoga sessions?",
      a: "Yes. Private beach yoga, pranayama, and meditation sessions are available on prior booking.",
    },
    // Wellness Therapies
    {
      category: "therapies",
      q: "Are wellness therapies performed by therapists or doctors?",
      a: "All consultations, assessments, and wellness therapies are personally provided by the doctor following an individual wellness evaluation.",
    },
    {
      category: "therapies",
      q: "How do I know which therapy is suitable for me?",
      a: "A consultation is conducted before treatment to determine the most appropriate wellness approach for your needs.",
    },
    {
      category: "therapies",
      q: "Do I need a prior appointment?",
      a: "Yes. Advance booking is recommended for all wellness therapies.",
    },
    {
      category: "therapies",
      q: "What wellness therapies do you offer?",
      a: "We offer Shiatsu Therapy, Thai Yoga Massage, Deep Tissue Therapy, Reflexology, Traditional Ayurvedic Massage, Swedish Massage, Acupuncture-Based Wellness Support, Cupping Therapy, IASTM, and Dorn Therapy.",
    },
    // Wellness Retreats
    {
      category: "retreats",
      q: "What is included in the retreat programs?",
      a: "Retreat programs generally include yoga sessions, pranayama and meditation, wellness therapies, consultations, healthy Kerala cuisine, accommodation, and personalized wellness guidance.",
    },
    {
      category: "retreats",
      q: "Are retreats suitable for beginners?",
      a: "Yes. Retreat programs are designed for all experience levels.",
    },
    {
      category: "retreats",
      q: "Can retreat programs be customized?",
      a: "Yes. Personalized retreat experiences can be created based on individual wellness goals.",
    },
    {
      category: "retreats",
      q: "What should I bring for a retreat?",
      a: "Comfortable clothing, personal essentials, and an open mind for learning and transformation.",
    },
    // Certification Courses
    {
      category: "courses",
      q: "Do I need previous experience to join a certification course?",
      a: "No. Most certification programs are beginner-friendly and suitable for wellness practitioners as well.",
    },
    {
      category: "courses",
      q: "Are one-to-one training programs available?",
      a: "Yes. Personalized one-to-one training and small group training options are available.",
    },
    {
      category: "courses",
      q: "Will I receive a certificate after completion?",
      a: "Yes. Participants receive a course completion certificate upon successful completion of training requirements.",
    },
    {
      category: "courses",
      q: "Are short-term workshops available?",
      a: "Yes. Selected therapies are available as short-term workshops and intensive practical training programs.",
    },
    // Online Classes
    {
      category: "online",
      q: "Can I join classes from outside India?",
      a: "Yes. Online yoga and wellness sessions are available worldwide.",
    },
    {
      category: "online",
      q: "What do I need to attend online sessions?",
      a: "A stable internet connection, comfortable practice space, and a yoga mat are recommended.",
    },
    {
      category: "online",
      q: "Are online sessions live or recorded?",
      a: "Most sessions are conducted live for better interaction and personalized guidance.",
    },
    {
      category: "online",
      q: "How do I book online classes?",
      a: "Online sessions are available on booking and subject to seasonal scheduling.",
    },
  ];

  // Filter items based on active tab and search query
  const filteredItems = useMemo(() => {
    if (searchQuery.trim()) {
      return faqData.filter(
        (item) =>
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    return faqData.filter((item) => item.category === activeTab);
  }, [activeTab, searchQuery]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setSearchQuery(""); // Clear search when switching tabs
    setOpenIdx(0); // Open first accordion by default in the new tab
  };

  const getCategoryLabel = (catId: string) => {
    return categories.find((c) => c.id === catId)?.label || catId;
  };

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-12 space-y-4">
        <span className="font-serif-display text-xs tracking-[0.4em] text-emerald uppercase">
          Knowledge Base
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-emerald-deep">
          Questions, <em className="text-gold-gradient not-italic font-medium">answered</em>.
        </h2>
        <div className="w-16 h-px bg-gold-gradient mx-auto" />
      </div>

      {/* Search Bar */}
      <div className="relative mb-12 max-w-2xl mx-auto group">
        <div className="absolute inset-0 bg-gold-gradient opacity-10 blur-xl rounded-full transition-opacity group-hover:opacity-15 pointer-events-none" />
        <div className="relative flex items-center bg-white rounded-2xl border border-gold/15 shadow-soft group-focus-within:border-gold group-focus-within:ring-1 group-focus-within:ring-gold/30 transition-all duration-300">
          <Search className="w-5 h-5 text-gold shrink-0 ml-5" />
          <input
            type="text"
            placeholder="Search questions (e.g. beginners, accommodation)..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setOpenIdx(null); // Reset open accordion during search
            }}
            className="w-full bg-transparent px-4 py-4.5 text-sm md:text-base text-emerald-deep placeholder-emerald-deep/45 outline-none font-sans"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setOpenIdx(0);
              }}
              className="p-2 mr-3 text-emerald-deep/50 hover:text-emerald-deep transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Tabs (Hidden when search query is typed) */}
      {!searchQuery && (
        <div className="flex flex-wrap justify-center gap-3 mb-12 border-b border-gold/10 pb-6">
          {categories.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all duration-300 ${
                  isActive
                    ? "bg-emerald-deep text-white border-gold/30 shadow-soft"
                    : "bg-white/60 text-emerald-deep/80 border-gold/10 hover:bg-gold/10 hover:text-emerald-deep"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-gold animate-pulse" : "text-gold/75"}`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Search Result Feedback */}
      {searchQuery && (
        <div className="mb-6 flex items-center justify-between text-xs tracking-wider uppercase text-emerald-deep/60">
          <span>Found {filteredItems.length} matching questions</span>
          <button
            onClick={() => {
              setSearchQuery("");
              setOpenIdx(0);
            }}
            className="text-gold hover:underline flex items-center gap-1"
          >
            Clear Search <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* FAQ Accordion List */}
      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border border-gold/10 transition-all duration-300 ${
                  isOpen ? "shadow-luxury border-gold/25" : "shadow-soft hover:shadow-luxury/10"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-5 p-6 text-left"
                >
                  <div className="space-y-1.5">
                    {searchQuery && (
                      <span className="inline-block bg-gold/10 text-emerald-deep border border-gold/20 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded">
                        {getCategoryLabel(item.category)}
                      </span>
                    )}
                    <h3 className="font-display text-base md:text-lg text-emerald-deep font-medium leading-snug">
                      {item.q}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gold shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-emerald-deep/80 text-xs md:text-sm leading-relaxed font-light border-t border-cream/50 pt-4">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gold/10 p-8 space-y-4">
            <HelpCircle className="w-12 h-12 text-gold mx-auto" />
            <h3 className="font-display text-xl text-emerald-deep">No results found</h3>
            <p className="text-sm text-emerald-deep/70 max-w-sm mx-auto">
              We couldn't find any questions matching your query. Please check your spelling or
              contact our consultants.
            </p>
            <div className="pt-2">
              <a
                href="/contact?interest=FAQ Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-wider uppercase shadow-soft"
              >
                <span>Ask A Question</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Consult Banner */}
      <div className="mt-16 bg-gradient-to-br from-emerald-deep to-emerald rounded-3xl border border-gold/25 p-8 text-cream flex flex-col md:flex-row items-center justify-between gap-6 shadow-luxury relative overflow-hidden group">
        <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08),transparent)] pointer-events-none" />
        <div className="space-y-2 relative z-10 text-center md:text-left">
          <h3 className="font-display text-2xl text-white font-medium flex items-center justify-center md:justify-start gap-2">
            <Sparkles className="w-5 h-5 text-gold saturate-150" />
            Still Have Questions?
          </h3>
          <p className="text-cream/80 text-xs md:text-sm font-light max-w-lg leading-relaxed">
            Our wellness consultants are here to help you choose the right retreat, therapy, or
            certification course tailored for your goals.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 relative z-10 shrink-0 w-full md:w-auto">
          <a
            href="/contact?interest=Wellness Inquiry"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-wider uppercase shadow-gold hover:scale-[1.03] transition-all"
          >
            Contact Center
          </a>
          <a
            href="https://wa.me/918778639989"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-full glass text-white text-xs font-semibold tracking-wider uppercase border border-gold/30 hover:bg-white/5 transition-all"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
