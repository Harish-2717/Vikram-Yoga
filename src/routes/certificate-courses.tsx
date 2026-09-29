import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ChevronDown,
  BookOpen,
  Clock,
  Calendar,
  Shield,
  Award,
  Users,
  User,
  Flower2,
  Sparkles,
  CheckCircle2,
  Heart,
  Leaf,
  Globe,
  HelpCircle,
  ArrowRight,
  X,
} from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero, BookNowFloat } from "./about";
import classes from "@/assets/classes.jpg";

export const Route = createFileRoute("/certificate-courses")({
  component: CoursesPage,
  head: () => ({
    meta: [
      { title: "Certification Courses & Professional Wellness Training — Dr. Vikram Yoga" },
      {
        name: "description",
        content:
          "Professional wellness and massage certification training programs guided by Dr. S. Vikram Pandy. Shiatsu, Thai Yoga Massage, Reflexology, Ayurvedic, Swedish, Deep Tissue, and Dorn Therapy.",
      },
    ],
  }),
});

function CoursesPage() {
  return (
    <main className="overflow-x-hidden bg-cream min-h-screen selection:bg-gold/30 selection:text-emerald-deep">
      <Navbar />
      <PageHero
        title="Certification Courses"
        subtitle="Therapeutic Education • Holistic Skills • Mindful Learning"
        bg={classes}
      />

      {/* Introduction */}
      <IntroSection />

      {/* Additional Offerings: Short Workshops & Sessions */}
      <AdditionalOfferings />

      {/* 7 Certification Courses */}
      <CoursesShowcase />

      {/* Unique Highlights */}
      <UniqueFeaturesSection />

      {/* Format & Options */}
      <TrainingFormatSection />

      {/* Inclusions */}
      <InclusionsSection />

      {/* Closing CTA */}
      <ClosingCTASection />

      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}

/* ── Introduction Section ── */
function IntroSection() {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/4 w-[30rem] h-[30rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/2 pointer-events-none" />
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3 text-gold">
            <Sparkles className="w-5 h-5 saturate-150 animate-pulse" />
            <span className="font-serif-display text-xs tracking-[0.3em] uppercase">
              Professional Development
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-emerald-deep leading-tight">
            Elevate Your Path in <br />
            <em className="text-gold-gradient not-italic font-medium">Therapeutic Wellness</em>
          </h2>
          <div className="w-20 h-[2px] bg-gold-gradient" />
          <div className="space-y-4 text-emerald-deep/90 text-sm md:text-base leading-relaxed">
            <p className="font-bold text-lg text-emerald-deep">
              At Dr. VIKRAM YOGA & WELLNESS CENTRE, our professional certification programs are
              designed for individuals seeking practical wellness education, therapeutic bodywork
              training, holistic healing knowledge, and hands-on learning experiences.
            </p>
            <p className="font-semibold">
              Blending traditional healing wisdom with modern therapeutic wellness approaches, our
              courses provide a supportive, experience-based learning environment focused on body
              awareness, therapeutic understanding, mindful practice, and professional skill
              development.
            </p>
          </div>
        </div>
        <div className="lg:col-span-5 bg-white/70 backdrop-blur-xl border border-gold/15 rounded-3xl p-8 shadow-soft relative overflow-hidden group">
          <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.06),transparent)] pointer-events-none" />
          <div className="relative z-10 space-y-6">
            <div className="w-12 h-12 rounded-full bg-emerald-deep/5 flex items-center justify-center">
              <Heart className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-display text-xl text-emerald-deep font-semibold">
              Guided by Dr. S. Vikram Pandy
            </h3>
            <p className="text-xs md:text-sm text-emerald-deep/80 leading-relaxed font-semibold">
              All training programs are personally guided by Dr. S. Vikram Pandy and emphasize
              practical application, therapeutic precision, body mechanics, professional ethics,
              client care, and integrative wellness understanding.
            </p>
            <div className="gold-divider" />
            <div className="flex flex-wrap gap-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-deep/5 text-emerald-deep px-3.5 py-1.5 rounded-full border border-emerald-deep/10">
                Personalized Guidance
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold bg-emerald-deep/5 text-emerald-deep px-3.5 py-1.5 rounded-full border border-emerald-deep/10">
                Hands-on Practice
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Short Workshops & Certification Courses Overview ── */
function AdditionalOfferings() {
  return (
    <section className="py-6 px-6 max-w-6xl mx-auto">
      <div className="bg-[#f7f5ed] rounded-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-[#ede8dd]">
        {/* Decorative Leaves */}
        <div className="absolute -left-6 -bottom-3 w-28 h-28 opacity-10 pointer-events-none text-emerald-deep transform -rotate-12">
          <Leaf className="w-full h-full" strokeWidth={1} />
        </div>
        <div className="absolute -right-6 -bottom-3 w-28 h-28 opacity-10 pointer-events-none text-emerald-deep transform rotate-12 scale-x-[-1]">
          <Leaf className="w-full h-full" strokeWidth={1} />
        </div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 relative z-10 items-stretch">
          {/* Left Card: Short Workshops */}
          <div className="flex flex-col">
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-full border border-emerald-deep flex items-center justify-center shrink-0 bg-white shadow-sm">
                <Users className="w-5 h-5 text-emerald-deep" strokeWidth={1.5} />
              </div>
              <div className="pt-0.5">
                <p className="text-emerald-deep font-serif text-xs mb-0.5 leading-tight">In addition to our certification courses,</p>
                <h3 className="font-display text-2xl md:text-3xl text-emerald-deep font-bold leading-tight">
                  Short Workshops
                </h3>
                <p className="text-emerald-deep font-serif text-xs mt-0.5 leading-tight">are also available on booking.</p>
              </div>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-6 mt-1 max-w-md lg:ml-16">
              These focused workshops are designed to give you practical knowledge and hands-on experience in specific topics related to yoga, wellness and holistic therapies.
            </p>
            <div className="mt-auto lg:ml-16">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-deep text-emerald-deep font-semibold text-xs tracking-wider uppercase hover:bg-emerald-deep hover:text-cream transition-colors shadow-sm"
              >
                View Workshop Topics <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Divider for desktop */}
          <div className="hidden lg:block absolute left-1/2 top-3 bottom-3 w-px bg-[#ede8dd] -translate-x-1/2" />
          <div className="lg:hidden w-full h-px bg-[#ede8dd] my-1" />

          {/* Right Card: One-to-One & Group Training */}
          <div className="flex flex-col lg:pl-6">
            <div className="flex items-start gap-3.5 mb-3">
              <div className="w-12 h-12 rounded-full border border-emerald-deep flex items-center justify-center shrink-0 bg-white shadow-sm">
                <Calendar className="w-5 h-5 text-emerald-deep" strokeWidth={1.5} />
              </div>
              <div className="pt-0.5">
                <h3 className="font-display text-xl md:text-2xl text-emerald-deep font-bold leading-snug">
                  One-to-One &amp; Group Training<br className="hidden sm:block" /> for Certification Courses
                </h3>
              </div>
            </div>
            <p className="text-stone-600 text-sm leading-relaxed mb-6 mt-1 max-w-md lg:ml-16">
              We offer personalized one-to-one mentorship as well as intensive group training sessions for all certification courses, with flexible scheduling tailored to your pace.
            </p>
            <div className="mt-auto lg:ml-16">
              <Link
                to="/apply"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-emerald-deep text-emerald-deep font-semibold text-xs tracking-wider uppercase hover:bg-emerald-deep hover:text-cream transition-colors shadow-sm"
              >
                Apply / Enroll Now <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Feature Row */}
      <div className="mt-5 bg-[#f7f5ed] rounded-2xl py-4 px-4 md:px-8 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-[#ede8dd]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 items-center">
          <Link
            to="/apply"
            className="flex items-center gap-2.5 justify-center text-center group hover:scale-[1.03] transition-all cursor-pointer"
          >
            <Flower2 className="w-5 h-5 text-emerald-deep shrink-0 group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
            <span className="font-serif font-semibold text-emerald-deep text-xs md:text-sm leading-tight group-hover:text-gold transition-colors">
              Flexible Scheduling
            </span>
          </Link>

          <div className="hidden md:flex justify-center border-l border-[#ede8dd]">
            <Link
              to="/services"
              className="flex items-center gap-2.5 justify-center text-center group hover:scale-[1.03] transition-all cursor-pointer pl-4"
            >
              <User className="w-5 h-5 text-emerald-deep shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-xs md:text-sm leading-tight group-hover:text-gold transition-colors">
                One-to-One Mentorship
              </span>
            </Link>
          </div>
          <div className="md:hidden">
            <Link
              to="/services"
              className="flex items-center gap-2.5 justify-center text-center group hover:scale-[1.03] transition-all cursor-pointer"
            >
              <User className="w-5 h-5 text-emerald-deep shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-xs md:text-sm leading-tight group-hover:text-gold transition-colors">
                One-to-One Mentorship
              </span>
            </Link>
          </div>

          <div className="hidden md:flex justify-center border-l border-[#ede8dd]">
            <Link
              to="/apply"
              className="flex items-center gap-2.5 justify-center text-center group hover:scale-[1.03] transition-all cursor-pointer pl-4"
            >
              <Users className="w-5 h-5 text-emerald-deep shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-xs md:text-sm leading-tight group-hover:text-gold transition-colors">
                Group Training Available
              </span>
            </Link>
          </div>
          <div className="md:hidden">
            <Link
              to="/apply"
              className="flex items-center gap-2.5 justify-center text-center group hover:scale-[1.03] transition-all cursor-pointer"
            >
              <Users className="w-5 h-5 text-emerald-deep shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-xs md:text-sm leading-tight group-hover:text-gold transition-colors">
                Group Training Available
              </span>
            </Link>
          </div>

          <div className="hidden md:flex justify-center border-l border-[#ede8dd]">
            <a
              href="#courses"
              className="flex items-center gap-2.5 justify-center text-center group hover:scale-[1.03] transition-all cursor-pointer pl-4"
            >
              <Award className="w-5 h-5 text-emerald-deep shrink-0 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-xs md:text-sm leading-tight group-hover:text-gold transition-colors">
                Short Workshops on Booking
              </span>
            </a>
          </div>
          <div className="md:hidden">
            <a
              href="#courses"
              className="flex items-center gap-2.5 justify-center text-center group hover:scale-[1.03] transition-all cursor-pointer"
            >
              <Award className="w-5 h-5 text-emerald-deep shrink-0 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-xs md:text-sm leading-tight group-hover:text-gold transition-colors">
                Short Workshops on Booking
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Courses Showcase ── */
function CoursesShowcase() {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  useEffect(() => {
    if (selectedCourse) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedCourse]);

  const courses = [
    {
      title: "Shiatsu Massage Certification",
      duration: "Approximately 21 Hours • 7–10 Days",
      subtitle: "Traditional Meridian-Based Bodywork",
      desc: "A traditional Japanese bodywork training program focused on meridian-based therapy, therapeutic pressure application, energy balancing concepts, and mindful healing practices.",
      learn: [
        "Understanding meridian systems and energy flow pathways",
        "Identifying energetic imbalances within the body",
        "Palm, thumb, and finger pressure techniques",
        "Pressure-point stimulation methods",
        "Relaxation-focused therapeutic applications",
        "Therapist posture, body mechanics, and ergonomics",
        "Complete Shiatsu treatment sequencing",
      ],
      svg: (
        <svg
          viewBox="0 0 64 64"
          className="w-12 h-12 text-gold stroke-current fill-none stroke-[1.5]"
          aria-hidden="true"
        >
          <path d="M20 40V28C20 24.68 22.68 22 26 22C29.32 22 32 24.68 32 28V38" />
          <path d="M32 32V18C32 14.68 34.68 12 38 12C41.32 12 44 14.68 44 18V36" />
          <path d="M38 32V20C38 16.68 40.68 14 44 14C47.32 14 50 16.68 50 20V36" />
          <path d="M44 32V24C44 20.68 46.68 18 50 18C53.32 18 56 20.68 56 24V34" />
          <path d="M14 48C12 42 16 34 22 34C24 34 26 36 28 38L32 42V52" />
          <path d="M20 52C20 52 24 54 32 54C42 54 52 48 52 40" />
          <circle cx="22" cy="34" r="4" className="stroke-emerald/80 animate-pulse" />
          <circle cx="22" cy="34" r="1.5" className="fill-gold" />
        </svg>
      ),
    },
    {
      title: "Thai Yoga Massage Certification",
      duration: "Approximately 21 Hours • 7–10 Days",
      subtitle: "Integrative Stretching & Acupressure",
      desc: "An integrative therapeutic bodywork program combining assisted stretching, passive yoga movements, acupressure techniques, and mindful body mechanics inspired by traditional Thai healing practices.",
      learn: [
        "Understanding Sen Lines and energetic pathways",
        "Introduction to Nadis and traditional energy concepts",
        "Therapeutic pressure-point applications",
        "Assisted stretching techniques",
        "Passive yoga-based movement methods",
        "Flexibility and mobility enhancement approaches",
        "Therapist body mechanics and movement flow",
      ],
      svg: (
        <svg
          viewBox="0 0 64 64"
          className="w-12 h-12 text-gold stroke-current fill-none stroke-[1.5]"
          aria-hidden="true"
        >
          <circle cx="32" cy="14" r="4" />
          <path d="M32 18C32 24 38 28 46 30" />
          <path d="M32 18C24 18 18 26 14 34" />
          <path d="M32 28V46" />
          <path d="M32 46L22 54" />
          <path d="M32 46L42 54" />
          <path d="M22 10C26 18 26 36 18 50" strokeDasharray="3 3" className="text-emerald" />
          <path d="M42 10C38 18 38 36 46 50" strokeDasharray="3 3" className="text-emerald" />
        </svg>
      ),
    },
    {
      title: "Reflexology Therapy Certification",
      duration: "Approximately 12 Hours • 7 Days",
      subtitle: "Reflex Zone Point Stimulation",
      desc: "A holistic reflex-point therapy training focused on therapeutic stimulation of specific points on the feet and hands to support relaxation, circulation, and wellness balance.",
      learn: [
        "Reflex zones of the feet and hands",
        "Pressure application techniques",
        "Understanding energy balancing concepts",
        "Relaxation-focused therapeutic methods",
        "Home wellness support applications",
        "Client care and therapeutic communication",
        "Practical reflexology treatment protocols",
      ],
      svg: (
        <svg
          viewBox="0 0 64 64"
          className="w-12 h-12 text-gold stroke-current fill-none stroke-[1.5]"
          aria-hidden="true"
        >
          <path d="M28 10C24 10 20 12 18 16C16 20 18 28 22 36C26 44 26 48 24 52C23 54 24 56 28 56C36 56 42 50 42 38C42 26 38 18 34 14C32 12 30 10 28 10Z" />
          <circle cx="28" cy="6" r="3" className="fill-gold" />
          <circle cx="35" cy="8" r="2.2" className="fill-gold" />
          <circle cx="40" cy="11" r="1.8" className="fill-gold" />
          <circle cx="44" cy="15" r="1.4" className="fill-gold" />
          <circle cx="47" cy="20" r="1" className="fill-gold" />
          <path d="M20 22C26 24 34 22 40 18" className="text-emerald" />
          <path d="M21 32C28 34 36 32 42 28" className="text-emerald" />
          <path d="M24 44C29 46 36 44 42 39" className="text-emerald" strokeDasharray="2 2" />
        </svg>
      ),
    },
    {
      title: "Ayurvedic Massage Certification",
      duration: "Approximately 21 Hours • 10 Days",
      subtitle: "Rhythmic Oil Massage & Doshas",
      desc: "A traditional wellness massage training inspired by Ayurvedic principles using therapeutic oil application methods, rhythmic massage techniques, and holistic relaxation approaches.",
      learn: [
        "Foundations of Ayurvedic wellness principles",
        "Understanding Tridosha concepts (Vata, Pitta & Kapha)",
        "Traditional oil massage techniques",
        "Therapeutic bodywork applications",
        "Relaxation and rejuvenation approaches",
        "Body rhythm and flow techniques",
        "Professional wellness massage procedures",
      ],
      svg: (
        <svg
          viewBox="0 0 64 64"
          className="w-12 h-12 text-gold stroke-current fill-none stroke-[1.5]"
          aria-hidden="true"
        >
          <path d="M16 12H48" />
          <path d="M20 12L24 24H40L44 12" />
          <path d="M24 24C24 32 40 32 40 24" />
          <path d="M32 28V40" className="text-emerald" />
          <circle cx="32" cy="44" r="3" className="fill-gold" />
          <path d="M18 52C22 46 42 46 46 52C42 56 22 56 18 52Z" />
        </svg>
      ),
    },
    {
      title: "Swedish Massage Certification",
      duration: "Approximately 21 Hours • 10 Days",
      subtitle: "Foundational Classical Massage Flow",
      desc: "A foundational therapeutic massage training program focused on relaxation-based bodywork, circulation support, muscular comfort, and professional massage flow techniques.",
      learn: [
        "Classical Swedish massage techniques",
        "Effleurage, Petrissage, Tapotement, Friction & Vibration techniques",
        "Pressure control and body mechanics",
        "Relaxation-focused massage applications",
        "Circulation support methods",
        "Client comfort and professional care",
        "Complete full-body massage sequencing",
      ],
      svg: (
        <svg
          viewBox="0 0 64 64"
          className="w-12 h-12 text-gold stroke-current fill-none stroke-[1.5]"
          aria-hidden="true"
        >
          <path d="M10 20C20 15 28 25 38 20C48 15 54 25 54 25" />
          <path d="M10 32C20 27 28 37 38 32C48 27 54 37 54 37" className="text-emerald" />
          <path d="M10 44C20 39 28 49 38 44C48 39 54 49 54 49" />
          <path d="M28 24C26 22 22 22 20 24L16 28" />
          <path d="M38 36C36 34 32 34 30 36L26 40" />
        </svg>
      ),
    },
    {
      title: "Deep Tissue Massage Certification",
      duration: "Approximately 21 Hours • 10 Days",
      subtitle: "Fascia Release & Trigger Points",
      desc: "A professional soft tissue training program focused on deep muscular release techniques, fascia-focused manipulation methods, mobility support, and therapeutic recovery applications.",
      learn: [
        "Deep muscular manipulation techniques",
        "Fascial release concepts",
        "Therapeutic pressure application methods",
        "Trigger-point awareness",
        "Mobility and recovery support techniques",
        "Soft tissue assessment concepts",
        "Professional therapeutic applications",
      ],
      svg: (
        <svg
          viewBox="0 0 64 64"
          className="w-12 h-12 text-gold stroke-current fill-none stroke-[1.5]"
          aria-hidden="true"
        >
          <path d="M10 16H54" />
          <path d="M10 24H54" />
          <path d="M10 32H54" />
          <path d="M10 40H54" />
          <path d="M10 48H54" />
          <circle cx="32" cy="32" r="8" className="stroke-emerald stroke-2" />
          <circle cx="32" cy="32" r="14" strokeDasharray="3 3" />
          <circle cx="32" cy="32" r="3" className="fill-gold" />
          <path d="M32 14V22" />
          <path d="M32 50V42" />
          <path d="M14 32H22" />
          <path d="M50 32H42" />
        </svg>
      ),
    },
    {
      title: "Dorn Therapy Certification (Spain Care Therapy)",
      duration: "Approximately 12 Hours • 7 Days",
      subtitle: "Gentle Spinal Alignment Method",
      desc: "A gentle therapeutic wellness training inspired by the German Dorn Method, focusing on posture awareness, spinal balancing approaches, joint alignment concepts, and mindful corrective movement techniques.",
      learn: [
        "Spinal awareness and posture assessment",
        "Gentle joint balancing techniques",
        "Corrective movement principles",
        "Alignment and mobility support methods",
        "Natural body balance concepts",
        "Practical therapeutic applications",
        "Postural wellness education",
      ],
      svg: (
        <svg
          viewBox="0 0 64 64"
          className="w-12 h-12 text-gold stroke-current fill-none stroke-[1.5]"
          aria-hidden="true"
        >
          <path d="M32 8V56" strokeDasharray="2 2" className="text-emerald" />
          <rect x="26" y="12" width="12" height="4" rx="1" />
          <rect x="24" y="20" width="16" height="4" rx="1" />
          <rect x="25" y="28" width="14" height="4" rx="1" />
          <rect x="24" y="36" width="16" height="4" rx="1" />
          <rect x="26" y="44" width="12" height="4" rx="1" />
          <circle cx="32" cy="14" r="1.5" className="fill-gold" />
          <circle cx="32" cy="22" r="1.5" className="fill-gold" />
          <circle cx="32" cy="30" r="1.5" className="fill-gold" />
          <circle cx="32" cy="38" r="1.5" className="fill-gold" />
          <circle cx="32" cy="46" r="1.5" className="fill-gold" />
          <path d="M14 26C18 26 20 28 22 30" />
          <path d="M50 26C46 26 44 28 42 30" />
        </svg>
      ),
    },
  ];

  return (
    <section id="courses" className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16 space-y-4">
        <span className="font-serif-display text-xs tracking-[0.3em] uppercase text-gold font-bold">
          PROFESSIONAL WELLNESS TRAINING
        </span>
        <h2 className="font-display text-4xl md:text-5xl text-emerald-deep font-bold">
          Certification Courses
        </h2>
        <div className="gold-divider mt-4 mx-auto" />
        <p className="text-emerald-deep/70 max-w-2xl mx-auto font-medium text-sm md:text-base">
          Explore our professional bodywork and holistic wellness programs. Click on any course to
          view the full syllabus and what you will master.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-[2rem] border border-gold/15 shadow-soft hover:shadow-luxury hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col justify-between h-full ${
              idx === 6 ? "md:col-span-2 lg:col-span-1 lg:col-start-2 max-w-md md:max-w-none lg:max-w-none mx-auto w-full" : ""
            }`}
          >
            <div className="p-8 flex flex-col gap-6 flex-1 justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="p-3 bg-emerald-deep/5 rounded-2xl shrink-0 border border-gold/10">
                    {course.svg}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-emerald-deep text-[10px] uppercase font-bold tracking-wider rounded-full border border-gold/20">
                    <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                    Certification
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif-display text-base tracking-wider text-emerald-deep uppercase font-bold leading-snug min-h-[2.5rem] flex items-center">
                    {course.title}
                  </h3>
                  <p className="text-[10px] tracking-widest text-gold uppercase font-semibold">
                    {course.subtitle}
                  </p>
                </div>

                <p className="text-emerald-deep/80 text-xs md:text-sm leading-relaxed font-semibold line-clamp-3">
                  {course.desc}
                </p>

                <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-deep bg-cream px-4 py-2.5 rounded-xl border border-gold/10 w-full justify-center lg:justify-start">
                  <Calendar className="w-4 h-4 text-gold shrink-0" />
                  <span>Duration: {course.duration}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-8 pb-8 pt-2 bg-gradient-to-t from-cream/20 to-transparent flex flex-col gap-3">
              <button
                onClick={() => setSelectedCourse(course)}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border-2 border-emerald-deep/20 hover:border-gold text-emerald-deep text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-gold/5"
              >
                <span>Read Course Details</span>
                <ChevronDown className="w-4 h-4 text-gold" />
              </button>

              <a
                href={`/apply?category=Certification-Courses&course=${encodeURIComponent(course.title)}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-wider uppercase shadow-soft hover:scale-[1.01] transition-all duration-300"
              >
                <span>Book This Course</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/50 backdrop-blur-sm transition-all duration-300 animate-in fade-in">
          {/* Backdrop click to close */}
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setSelectedCourse(null)}
          />

          {/* Modal Container */}
          <div className="bg-white rounded-[2rem] border border-gold/20 shadow-luxury max-w-4xl w-full max-h-[90vh] flex flex-col relative z-10 overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
            {/* Scrollable Content Area */}
            <div className="overflow-y-auto p-6 md:p-10 flex-1 relative">
              {/* Close Button */}
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-cream/80 hover:bg-gold/20 text-emerald-deep/60 hover:text-emerald-deep transition-all duration-300"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-12 gap-8 items-start mt-6">
                {/* Left Column: Course Info */}
                <div className="md:col-span-5 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-emerald-deep/5 rounded-2xl shrink-0 border border-gold/10">
                      {selectedCourse.svg}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-emerald-deep text-[10px] uppercase font-bold tracking-wider rounded-full border border-gold/20">
                      <Clock className="w-3.5 h-3.5 text-gold shrink-0" />
                      Certification
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-serif-display text-2xl tracking-wider text-emerald-deep uppercase font-bold leading-tight">
                      {selectedCourse.title}
                    </h3>
                    <p className="text-sm tracking-widest text-gold uppercase font-semibold">
                      {selectedCourse.subtitle}
                    </p>
                  </div>

                  <p className="text-emerald-deep/80 text-sm leading-relaxed font-semibold">
                    {selectedCourse.desc}
                  </p>

                  <div className="inline-flex items-center gap-3 text-sm font-semibold text-emerald-deep bg-cream px-5 py-3.5 rounded-xl border border-gold/10 w-full">
                    <Calendar className="w-5 h-5 text-gold shrink-0" />
                    <span>Duration: {selectedCourse.duration}</span>
                  </div>
                </div>

                {/* Right Column: Syllabus */}
                <div className="md:col-span-7 bg-cream/40 rounded-2xl border border-gold/10 p-6 md:p-8 space-y-5">
                  <h4 className="font-display text-xl text-emerald-deep font-semibold flex items-center gap-2.5">
                    <BookOpen className="w-5 h-5 text-gold shrink-0" />
                    What You Will Learn
                  </h4>
                  <div className="gold-divider" />
                  <ul className="space-y-4">
                    {selectedCourse.learn.map((item: string, itemIdx: number) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span className="text-sm text-emerald-deep/95 leading-relaxed font-semibold">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sticky Actions Footer */}
            <div className="bg-cream/30 border-t border-gold/10 px-6 py-5 md:px-10 flex flex-col sm:flex-row gap-3 justify-end shrink-0">
              <button
                onClick={() => setSelectedCourse(null)}
                className="px-6 py-3.5 rounded-xl border border-emerald-deep/20 hover:border-gold text-emerald-deep text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Close Details
              </button>
              <a
                href={`/apply?category=Certification-Courses&course=${encodeURIComponent(selectedCourse.title)}`}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-wider uppercase shadow-soft hover:scale-[1.02] hover:shadow-gold transition-all duration-300"
              >
                <span>Book This Course</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ── What Makes Our Training Unique ── */
function UniqueFeaturesSection() {
  const uniques = [
    {
      title: "Practical Hands-On Learning",
      desc: "Gain massive real-world confidence through continuous supervised practice sessions.",
    },
    {
      title: "Personalized Approach",
      desc: "Learn in very small groups or directly one-to-one with focused, individualized attention.",
    },
    {
      title: "Guided by Dr. Vikram",
      desc: "Receive mentorship directly from Dr. S. Vikram Pandy, a highly experienced naturopathy consultant.",
    },
    {
      title: "Integrative Wellness",
      desc: "Understand therapy from both traditional healing wisdom and modern scientific standpoints.",
    },
    {
      title: "Body Mechanics Focus",
      desc: "Protect your own body; master postural ergonomics, therapist stance, and energy management.",
    },
    {
      title: "Traditional Wisdom",
      desc: "Integrate ancient principles like Meridians, Sen Lines, and Tridosha energy flows.",
    },
    {
      title: "Ethics & Client Care",
      desc: "Develop professional standards, therapeutic communication skills, and clinical client care.",
    },
    {
      title: "Supportive Environment",
      desc: "Thrive in an experience-based learning layout that supports holistic development.",
    },
    {
      title: "International Atmosphere",
      desc: "Share techniques and grow alongside wellness practitioners and students from across the globe.",
    },
  ];

  const icons = [Sparkles, Users, Award, Globe, Leaf, Heart, Shield, BookOpen, Clock];

  return (
    <section className="py-24 bg-emerald-deep text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="font-serif-display text-xs tracking-[0.4em] text-gold uppercase">
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl text-white">
            What Makes Our Training Unique
          </h2>
          <div className="gold-divider max-w-sm mx-auto my-6" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {uniques.map((item, idx) => {
            const IconComponent = icons[idx % icons.length];
            return (
              <div
                key={idx}
                className="glass p-8 rounded-3xl border border-gold/10 hover:border-gold/30 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-gold/10 group-hover:bg-gold-gradient transition-all duration-300">
                  <IconComponent className="w-6 h-6 text-gold group-hover:text-emerald-deep transition-colors" />
                </div>
                <h3 className="font-serif-display text-base tracking-wider text-gold mb-3 uppercase font-bold">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-cream/70 leading-relaxed font-semibold">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── Training Format Section ── */
function TrainingFormatSection() {
  const options = [
    {
      title: "One-to-One Personalized",
      desc: "Individual guidance with highly focused, hands-on learning tailored completely to your pace.",
    },
    {
      title: "Small Group Training",
      desc: "Interactive learning with group demonstrations, pair practice, and supervised teacher review.",
    },
    {
      title: "Intensive Practical Programs",
      desc: "Skill-focused modules with a heavier emphasis on hands-on application, alignment, and routines.",
    },
    {
      title: "Short-Term Workshops",
      desc: "Available for selected therapies, wellness concepts, and minor routines upon prior booking.",
    },
  ];

  const infoBullets = [
    "Group and One-to-One Training Sessions Available",
    "Flexible Learning Formats Based on Individual Learning Goals",
    "Practical Hands-On Training with Professional Guidance",
    "Course Completion Certificate Provided",
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">
              Format
            </span>
            <h2 className="font-display text-4xl text-emerald-deep font-semibold">
              How You Will Learn
            </h2>
            <div className="w-16 h-px bg-gold-gradient" />
            <p className="text-emerald-deep/75 font-semibold text-sm md:text-base leading-relaxed">
              Our training programs are suitable for beginners, wellness practitioners, yoga
              teachers, massage therapists, bodywork professionals, healthcare professionals,
              wellness enthusiasts, and individuals interested in holistic healing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {options.map((opt, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-gold/10 shadow-soft hover:shadow-luxury transition-all duration-300"
              >
                <h3 className="font-serif-display text-[13px] tracking-widest text-emerald-deep uppercase font-bold mb-2.5">
                  {opt.title}
                </h3>
                <p className="text-xs text-emerald-deep/70 leading-relaxed font-semibold">
                  {opt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-emerald-deep to-emerald p-8 rounded-3xl border border-gold/20 shadow-luxury text-cream space-y-6">
          <h3 className="font-display text-2xl text-white font-semibold">Additional Details</h3>
          <div className="gold-divider opacity-40" />
          <ul className="space-y-4">
            {infoBullets.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <span className="text-xs md:text-sm text-cream/90 font-semibold leading-relaxed">
                  {bullet}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ── Certification Includes ── */
function InclusionsSection() {
  const inclusions = [
    "Comprehensive Practical Training",
    "Demonstration & Guided Practice Sessions",
    "Training Notes & Learning Resources",
    "Professional Course Completion Certificate",
    "Individual Feedback & Learning Support",
    "Small Group Learning Environment",
  ];

  return (
    <section className="py-20 bg-cream border-y border-gold/10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl text-emerald-deep font-semibold mb-12">
          What Your Certification Includes
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inclusions.map((inc, idx) => (
            <div
              key={idx}
              className="bg-white px-6 py-5 rounded-2xl border border-gold/10 shadow-soft flex items-center gap-4 hover:border-gold/30 transition-colors"
            >
              <Award className="w-6 h-6 text-gold shrink-0" />
              <span className="text-[13.5px] text-emerald-deep/90 font-medium tracking-wide text-left">
                {inc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Closing CTA Banner ── */
function ClosingCTASection() {
  return (
    <section className="py-28 bg-emerald-gradient text-cream text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-overlay opacity-30 pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10 space-y-8 animate-fade-up">
        <span className="font-serif-display text-sm tracking-[0.5em] text-gold uppercase block">
          Learn • Practice • Transform
        </span>

        <h2 className="font-display text-4xl md:text-6xl text-white leading-tight font-bold">
          Begin Your Professional <br className="hidden md:block" />
          <em className="text-gold-gradient not-italic font-bold">Holistic Journey</em> Today
        </h2>

        <p className="text-cream/80 max-w-2xl mx-auto text-sm md:text-base font-semibold italic leading-relaxed">
          "Develop practical therapeutic skills, deepen your understanding of holistic wellness, and
          gain confidence through immersive hands-on training designed for both personal growth and
          professional development."
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <a
            href="/apply?category=Certification-Courses"
            className="w-full sm:w-auto px-8 py-4 bg-gold-gradient hover:bg-gold text-emerald-deep rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300 hover:scale-105 shadow-gold"
          >
            Register Course With Us
          </a>
          <a
            href="/apply?category=Certification-Courses"
            className="w-full sm:w-auto px-8 py-4 glass text-white hover:bg-white/10 rounded-full text-sm font-semibold tracking-widest uppercase transition-all duration-300"
          >
            Have A Query For Us?
          </a>
        </div>

        <div className="pt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-cream/60 uppercase tracking-widest">
          <span>✓ Suitable for Beginners & Practitioners</span>
          <span>✓ Group & One-to-One Options</span>
          <span>✓ 1–3 Day Workshops Available</span>
        </div>
      </div>
    </section>
  );
}
