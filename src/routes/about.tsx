import { createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/New/tropical-beach-with-quiet-sea.jpg";
import cliffStory from "@/assets/about 1.jpg";
import drVikramImg from "@/assets/New/GPT Image Sep 22, 2026, 12_07_24 PM.png";
import drSangamithra from "@/assets/New/IMG_20260904_162803.png (1).jpeg";

import varkala1 from "@/assets/varkala_beach.png";
import varkala2 from "@/assets/varkala_sunset_sea.jpg";
import varkala3 from "@/assets/about.png";
import ctaDewyLeaf from "@/assets/cta_dewy_leaf.jpg";
import watercolorLeaf from "@/assets/watercolor_leaf_branch.jpg";
import {
  Menu,
  X,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  MessageCircle,
  CalendarDays,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Where Ancient Wisdom Meets Modern Wellness. Learn about Dr. Vikram Yoga & Wellness Centre in Varkala, Kerala, our founder Dr. S. Vikram Pandy, and our holistic healing approach.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fcfbf7] text-[#1c352d] font-sans antialiased selection:bg-[#1a3d2f] selection:text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <StorySection />
      <PhilosophySection />
      <TeamSection />
      <ExpertiseSection />

      <LocationSection />
      <CtaSection />
      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </div>
  );
}

/* ── Shared PageHero (used across other pages like yoga, retreats, gallery) ── */
export function PageHero({
  title,
  subtitle,
  bg,
  align = "left",
}: {
  title: string;
  subtitle: string;
  bg: string;
  align?: "left" | "center" | "right";
}) {
  const isRight = align === "right";
  const isCenter = align === "center";

  return (
    <section
      className={`relative h-[70vh] min-h-[560px] flex text-cream overflow-hidden ${isCenter ? "items-center justify-center text-center" : isRight ? "items-start justify-end text-right" : "items-start justify-start text-left"}`}
    >
      <img
        src={bg}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover brightness-105 saturate-110 object-[25%] md:object-center"
      />
      <div
        className={`absolute inset-0 ${
          isCenter
            ? "bg-emerald-deep/40"
            : isRight
              ? "bg-gradient-to-b from-emerald-deep/75 via-emerald-deep/40 to-emerald-deep/20 md:bg-gradient-to-l md:from-emerald-deep/80 md:via-emerald-deep/40 md:to-transparent"
              : "bg-gradient-to-b from-emerald-deep/75 via-emerald-deep/40 to-emerald-deep/20 md:bg-gradient-to-r md:from-emerald-deep/70 md:via-emerald-deep/40 md:to-transparent"
        }`}
      />

      <div
        className={`relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 md:pt-20 lg:pt-40 pb-20 md:pb-20 flex flex-col ${isRight ? "items-end" : isCenter ? "items-center" : "items-start"}`}
      >
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          {isRight || isCenter ? null : <span className="h-px w-8 md:w-12 bg-gold/60" />}
          <span className="font-serif-display text-[0.55rem] md:text-[0.75rem] tracking-[0.3em] md:tracking-[0.4em] text-gold uppercase drop-shadow-sm">
            Dr. Vikram Yoga &amp; Wellness &bull; Varkala
          </span>
          {isRight || isCenter ? <span className="h-px w-8 md:w-12 bg-gold/60" /> : null}
        </div>
        <h1 className="font-display text-4xl md:text-7xl lg:text-[5.5rem] font-medium text-balance leading-[1.1] drop-shadow-2xl">
          {title}
        </h1>
        <p
          className={`mt-2 md:mt-13 text-cream max-w-lg xl:max-w-2xl text-base md:text-2xl font-light italic tracking-wide drop-shadow-lg opacity-95 ${isRight ? "text-right" : isCenter ? "text-center" : "text-left"}`}
        >
          {subtitle}
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   1. NAVBAR (Supports both Light Theme for About & Dark Theme for other pages)
   ───────────────────────────────────────────────────────────── */
export function Navbar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setHidden(false);
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 20);
      if (currentY < 80) {
        setHidden(false);
      } else if (currentY > lastY + 8) {
        setHidden(true);
        setOpen(false);
      } else if (currentY < lastY - 8) {
        setHidden(false);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    {
      to: "/services",
      label: "Services",
      sub: [
        { to: "/yoga", label: "Yoga" },
        { to: "/wellness-therapy", label: "Wellness Therapy" },
        { to: "/retreats", label: "Yoga & Wellness Retreats" },
        { to: "/certificate-courses", label: "Massage Certificate Courses" },
      ],
    },
    { to: "/gallery", label: "Gallery" },
    { to: "/faq", label: "FAQ" },
    { to: "/apply", label: "Apply" },
    { to: "/payment", label: "Payment" },
    { to: "/terms-and-conditions", label: "Terms & Conditions" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ── Floating reveal button (shown when navbar is hidden on scroll) ── */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ${
          hidden
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <button
          onClick={() => {
            setHidden(false);
            if (window.innerWidth < 1024) setOpen(true);
          }}
          aria-label="Show navigation menu"
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-deep/95 backdrop-blur-xl border border-gold/40 shadow-[0_8px_32px_rgba(8,18,13,0.6),0_0_20px_rgba(212,175,55,0.2)] hover:border-gold hover:shadow-[0_8px_32px_rgba(8,18,13,0.8),0_0_25px_rgba(212,175,55,0.3)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <ChevronDown className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
          <span className="text-[0.68rem] tracking-[0.25em] uppercase text-cream/90 font-medium group-hover:text-gold transition-colors">
            Menu
          </span>
        </button>
      </div>

      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-emerald-deep/98 backdrop-blur-2xl shadow-soft py-3 border-b border-cream/10" : "bg-emerald-deep backdrop-blur-md py-4"} ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 shrink-0 mr-8 lg:mr-10 xl:mr-14 group">
            <img
              src={logo}
              alt="Dr Vikram Logo"
              className="h-11 md:h-13 xl:h-14 w-auto drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)] transition-transform duration-300 group-hover:scale-105"
            />
            <div className="leading-tight hidden sm:block whitespace-nowrap">
              <div className="font-serif-display text-[0.65rem] md:text-[0.7rem] text-gold tracking-[0.22em] font-medium">
                DR. VIKRAM
              </div>
              <div className="text-[0.55rem] md:text-[0.58rem] text-cream/70 tracking-[0.18em] mt-0.5">
                YOGA &amp; WELLNESS
              </div>
              <div className="text-[0.46rem] md:text-[0.5rem] text-gold/80 tracking-[0.28em] uppercase mt-0.5 font-medium">
                VARKALA
              </div>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center justify-center gap-3 xl:gap-5 2xl:gap-7 flex-1 min-w-0 px-2 lg:px-4">
            {navLinks.map((l) => (
              <div key={l.to} className="relative group py-2">
                <Link
                  to={l.to}
                  className="relative inline-flex items-center gap-1.5 text-[0.68rem] xl:text-[0.74rem] 2xl:text-[0.78rem] font-medium tracking-[0.1em] xl:tracking-[0.14em] uppercase text-cream/85 hover:text-gold transition-colors whitespace-nowrap py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gold after:scale-x-0 group-hover:after:scale-x-100 after:transition-transform after:duration-300"
                  activeProps={{ className: "text-gold after:scale-x-100 font-semibold" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  <span>{l.label}</span>
                  {l.sub && (
                    <ChevronDown className="w-3 h-3 opacity-70 group-hover:rotate-180 transition-transform duration-300 ml-0.5" />
                  )}
                </Link>
                {l.sub && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                    <div className="bg-emerald-deep/95 backdrop-blur-xl shadow-luxury rounded-2xl p-4 border border-gold/20 flex flex-col gap-3 text-center">
                      {l.sub.map((s) => (
                        <Link
                          key={s.label}
                          to={s.to}
                          className="text-[0.65rem] tracking-[0.14em] uppercase text-cream/75 hover:text-gold transition-colors block py-0.5 whitespace-nowrap"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0 ml-8 lg:ml-10 xl:ml-14">
            <Link
              to="/apply"
              className="hidden lg:inline-flex items-center justify-center gap-2 px-5 xl:px-6 py-2.5 rounded-full border-2 border-gold text-gold text-[0.7rem] xl:text-xs font-semibold tracking-widest uppercase hover:bg-gold hover:text-emerald-deep transition-all duration-300 hover:scale-105 whitespace-nowrap shadow-sm"
            >
              Book Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden text-cream p-2 focus:outline-none" aria-label="Toggle menu">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden bg-emerald-deep border border-gold/20 shadow-luxury mt-3 mx-6 rounded-2xl p-6 animate-fade-up">
            <div className="flex items-center gap-3 pb-4 mb-3 border-b border-gold/15">
              <img src={logo} alt="Dr Vikram Logo" className="h-10 w-auto" />
              <div className="leading-tight">
                <div className="font-serif-display text-[0.68rem] text-gold tracking-[0.2em] font-medium">
                  DR. VIKRAM
                </div>
                <div className="text-[0.55rem] text-cream/70 tracking-[0.16em] mt-0.5">
                  YOGA &amp; WELLNESS
                </div>
                <div className="text-[0.46rem] text-gold/80 tracking-[0.26em] uppercase mt-0.5 font-medium">
                  VARKALA
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {navLinks.map((l) => (
                <div key={l.to} className="flex flex-col">
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="text-cream/90 text-sm tracking-[0.18em] uppercase py-1"
                    activeProps={{ className: "text-gold text-sm tracking-[0.18em] uppercase py-1" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                </div>
              ))}
              <Link
                to="/apply"
                className="mt-4 text-center px-5 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-widest uppercase"
              >
                Book Now
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   2. HERO SECTION ("ABOUT US" + Balcony Veranda Background)
   ───────────────────────────────────────────────────────────── */
function HeroSection() {
  const scrollToStory = () => {
    const el = document.getElementById("our-story");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center overflow-hidden">
      {/* Background Image: Tropical beach with quiet sea */}
      <img
        src={heroBg}
        alt="Tropical beach with quiet sea in Varkala — Dr. Vikram Yoga & Wellness Centre"
        className="absolute inset-0 w-full h-full object-cover object-[70%_center] md:object-center brightness-[1.02]"
      />

      {/* Subtle overlay gradient to make text effortlessly readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent md:w-[65%] lg:w-[55%] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 sm:pt-28 lg:pt-32 pb-12 lg:pb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Left Content Card */}
        <div className="max-w-xl bg-white/85 md:bg-white/90 backdrop-blur-md p-6 sm:p-8 lg:p-10 rounded-2xl md:rounded-3xl border border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <span className="inline-block text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#355342] mb-3">
            ABOUT US
          </span>

          <h1 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[#16382b] leading-[1.18] tracking-tight">
            Where Ancient Wisdom Meets Modern Wellness
          </h1>

          <p className="mt-3.5 text-xs sm:text-[0.92rem] text-[#2c4034] font-medium leading-relaxed">
            A holistic approach to healing, learning and conscious living in the heart of Varkala.
          </p>

          <p className="mt-3 text-xs sm:text-[0.84rem] text-[#526a5c] leading-relaxed">
            At Dr. Vikram Yoga &amp; Wellness Centre, we bring together the timeless wisdom of yoga,
            Ayurveda and natural healing with modern therapeutic practices to support your journey
            towards a healthier, happier and more balanced life.
          </p>

          <div className="mt-6">
            <button
              onClick={scrollToStory}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#1a3d2f] hover:bg-[#122e23] text-white text-[0.72rem] tracking-[0.14em] uppercase font-semibold transition-all duration-200 shadow-sm hover:shadow group cursor-pointer"
            >
              <span>OUR STORY</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right floating script typography: "A Healthier You, A Brighter Tomorrow" */}
        <div className="hidden md:flex flex-col items-end text-right pr-6 lg:pr-10">
          <div className="font-script text-4xl lg:text-5xl text-[#2a4537] drop-shadow-md leading-tight select-none">
            A Healthier You
          </div>
          <div className="font-script text-4xl lg:text-5xl text-[#2a4537] drop-shadow-md leading-tight mt-1 select-none">
            A Brighter Tomorrow
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   3. "OUR STORY" SECTION (Sanctuary Photo + Script Overlay + Story Content)
   ───────────────────────────────────────────────────────────── */
function StorySection() {
  return (
    <section id="our-story" className="relative py-14 sm:py-16 lg:py-20 bg-[#fcfbf7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column: Sanctuary Photo with Cursive Overlay */}
          <div className="md:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-[#ebe6dc] aspect-[4/3] max-h-[440px]">
              <img
                src={cliffStory}
                alt="Dr. Vikram Yoga & Wellness Centre Sanctuary"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />
              {/* Script Overlay text at bottom */}
              <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                <p className="font-script text-2xl sm:text-3xl text-white/95 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
                  Rooted in Tradition
                </p>
                <p className="font-script text-2xl sm:text-3xl text-white/95 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] pl-4">
                  Inspired by People
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Story Content + Wellness Pillars */}
          <div className="md:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 md:pr-4 lg:pr-8 xl:pr-12">
            <div>
              <span className="inline-block text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#1a3d2f]">
                OUR STORY
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.25rem] font-semibold text-[#112e22] leading-[1.22] tracking-tight">
              A Sanctuary for Authentic Healing and Conscious Transformation
            </h2>

            <p className="text-xs sm:text-[0.9rem] font-medium text-[#1f382b] leading-relaxed">
              Dr. Vikram Yoga &amp; Wellness Centre was born from a deep passion for holistic health,
              natural healing, and the transformative power of yoga. Our vision is to create a space
              where individuals from all walks of life can reconnect with themselves, heal naturally,
              and embrace a more conscious and meaningful way of living.
            </p>

            <p className="text-xs sm:text-[0.9rem] font-medium text-[#1f382b] leading-relaxed">
              Located in the serene coastal town of Varkala, our centre offers a peaceful environment
              to learn, heal, and grow &mdash; supported by traditional wisdom, modern therapeutic
              approaches, and personalized guidance.
            </p>

            {/* Wellness Pillars & Leaf Accent */}
            <div className="pt-3 sm:pt-4 border-t border-[#ebe6dc] flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                {["PEACE", "HEALING", "BALANCE", "BELONGING"].map((word, i) => (
                  <div key={word} className="flex items-center gap-2 sm:gap-2.5">
                    <span className="px-3.5 py-1.5 rounded-full bg-white border border-[#e1ded5] text-[0.65rem] sm:text-[0.7rem] tracking-[0.2em] font-semibold text-[#1a3d2f] shadow-xs uppercase">
                      {word}
                    </span>
                    {i < 3 && <span className="text-[#96773a]/50 text-xs hidden sm:inline">&bull;</span>}
                  </div>
                ))}
              </div>
              <img
                src={watercolorLeaf}
                alt="Watercolor leaf branch"
                className="w-12 sm:w-14 h-auto object-contain opacity-75 mix-blend-multiply"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   4. "OUR PHILOSOPHY" SECTION (Medallion + Checklist + Plant)
   ───────────────────────────────────────────────────────────── */
function PhilosophySection() {
  const wellbeingItems = [
    "Self-awareness",
    "Mental clarity",
    "Emotional balance",
    "Physical vitality",
    "Spiritual growth",
    "A more fulfilling life",
  ];

  return (
    <section className="relative py-16 lg:py-20 bg-[#f7f5ed] border-y border-[#ede8dd] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: The Meaning of Holistic Wellness */}
          <div className="md:col-span-4 space-y-3">
            <span className="inline-block text-[0.68rem] tracking-[0.24em] uppercase font-bold text-[#1a3d2f]">
              OUR PHILOSOPHY
            </span>

            <h2 className="font-display text-2xl sm:text-3xl text-[#112e22] font-semibold leading-snug">
              The Meaning of Holistic Wellness
            </h2>

            <p className="text-xs sm:text-[0.86rem] font-medium text-[#1f382b] leading-relaxed">
              We believe that true wellness is not simply the absence of illness, but a state of
              complete harmony &mdash; between the body, mind, emotions, breath, energy, and
              lifestyle. Our approach is rooted in authenticity, compassion, and individualized care.
            </p>
          </div>

          {/* Center: "Heal • Harmonize • Transform" Yin-Yang Wellness Seal */}
          <div className="md:col-span-4 flex items-center justify-center py-4">
            <div className="group relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center p-3 bg-white/85 backdrop-blur-sm shadow-[0_8px_30px_rgba(22,56,43,0.08)] border border-[#dce5dd] hover:shadow-luxury hover:border-gold/50 transition-all duration-500 hover:scale-105">
              {/* Concentric subtle decorative rings */}
              <div className="absolute inset-2.5 rounded-full border border-dashed border-[#c5d3c8] group-hover:border-gold/60 transition-colors duration-500 pointer-events-none" />
              <div className="absolute inset-4 rounded-full border border-[#e8efe9] pointer-events-none" />

              {/* Yin-Yang SVG Seal */}
              <svg viewBox="0 0 200 200" className="w-full h-full select-none" aria-label="Heal Harmonize Transform Yin-Yang Wellness Seal">
                <defs>
                  {/* Top curved text path */}
                  <path id="sealTextTop" d="M 22,100 A 78,78 0 1,1 178,100" fill="none" />
                  {/* Bottom curved text path */}
                  <path id="sealTextBottom" d="M 178,100 A 78,78 0 0,1 22,100" fill="none" />

                  {/* Gradient for Yin (Emerald) */}
                  <linearGradient id="yinEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0F5132" />
                    <stop offset="100%" stopColor="#16382b" />
                  </linearGradient>

                  {/* Gradient for Yang (Ivory/Gold) */}
                  <linearGradient id="yangGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#f5efe4" />
                  </linearGradient>
                </defs>

                {/* Circular typography — Top: HEAL • HARMONIZE */}
                <text className="font-serif-display text-[9.5px] font-bold tracking-[0.26em] fill-[#16382b] uppercase" textAnchor="middle">
                  <textPath href="#sealTextTop" startOffset="50%">
                    HEAL • HARMONIZE
                  </textPath>
                </text>

                {/* Circular typography — Bottom: • TRANSFORM • */}
                <text className="font-serif-display text-[9.5px] font-bold tracking-[0.26em] fill-[#9a7024] uppercase" textAnchor="middle">
                  <textPath href="#sealTextBottom" startOffset="50%">
                    • TRANSFORM •
                  </textPath>
                </text>

                {/* Center Yin-Yang Core with smooth interactive hover rotation */}
                <g className="transition-transform duration-1000 ease-out group-hover:rotate-180" style={{ transformOrigin: "100px 100px" }}>
                  {/* Outer luxury gold ring */}
                  <circle cx="100" cy="100" r="41" fill="none" stroke="#d4af37" strokeWidth="2" />

                  {/* Light half (Yang) base */}
                  <circle cx="100" cy="100" r="40" fill="url(#yangGold)" />

                  {/* Dark half (Yin) emerald S-curve */}
                  <path
                    d="M 100,60 A 40,40 0 0,0 100,140 A 20,20 0 0,0 100,100 A 20,20 0 0,1 100,60 Z"
                    fill="url(#yinEmerald)"
                  />

                  {/* Yang eye in Yin field (Top) */}
                  <circle cx="100" cy="80" r="5" fill="url(#yangGold)" stroke="#d4af37" strokeWidth="1" />
                  <circle cx="100" cy="80" r="2" fill="#16382b" />

                  {/* Yin eye in Yang field (Bottom) */}
                  <circle cx="100" cy="120" r="5" fill="url(#yinEmerald)" stroke="#d4af37" strokeWidth="1" />
                  <circle cx="100" cy="120" r="2" fill="#d4af37" />
                </g>
              </svg>
            </div>
          </div>

          {/* Right: "A Path Toward Complete Well-being" + Leaf Illustration */}
          <div className="md:col-span-4 relative">
            <h3 className="font-display text-base sm:text-lg text-[#16382b] font-semibold mb-4">
              A Path Toward Complete Well-being
            </h3>

            <div className="space-y-2.5">
              {wellbeingItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#e1ede3] flex items-center justify-center text-[#1a3d2f] shrink-0 text-xs">
                    &#10003;
                  </span>
                  <span className="text-xs sm:text-[0.88rem] text-[#344d3e] font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtle watercolor leaf branch on right edge */}
            <div className="absolute -right-4 -bottom-6 opacity-30 pointer-events-none hidden lg:block">
              <img
                src={watercolorLeaf}
                alt="Leaf artwork"
                className="w-28 h-auto object-contain mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   5. "MEET OUR WELLNESS TEAM" SECTION (Sequential Cards with Flowing Text)
   ───────────────────────────────────────────────────────────── */
function TeamSection() {
  return (
    <section className="py-16 lg:py-24 bg-[#fcfbf7]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 lg:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="h-px w-8 bg-gold/60" />
            <h2 className="text-[0.8rem] tracking-[0.24em] uppercase font-bold text-[#1a3d2f]">
              MEET OUR WELLNESS TEAM
            </h2>
          </div>
          <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#112e22] font-semibold tracking-tight mt-2">
            Guiding Your Journey to Wholeness
          </p>
        </div>

        <div className="flex flex-col gap-10 lg:gap-12">
          {/* ── Card 1: Dr. S. Vikram Pandy ── */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#ebe6dc] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(22,56,43,0.08)] hover:border-gold/30 transition-all duration-300 flow-root">
            {/* Profile Image — floated on tablet & desktop so text flows beside and then below */}
            <div className="w-full sm:w-64 md:w-72 lg:w-80 aspect-square sm:float-left sm:mr-8 lg:mr-10 mb-6 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden bg-[#eef3ee] border border-[#e1e9e2] shadow-sm relative group-hover:border-gold/40 transition-colors shrink-0">
              <img
                src={drVikramImg}
                alt="Dr. S. Vikram Pandy — Founder & Director"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Header: Name, Designation, Credentials & Expertise Tags */}
            <div className="mb-4">
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2rem] text-[#16382b] font-bold leading-tight group-hover:text-gold transition-colors duration-300">
                Dr. S. Vikram Pandy
              </h3>

              <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-1.5">
                <span className="text-xs sm:text-sm font-bold text-[#546e5f]">
                  Founder &amp; Director
                </span>
                <span className="text-gold/60 text-xs hidden sm:inline">&bull;</span>
                <span className="text-[0.72rem] sm:text-xs tracking-wider uppercase text-[#7d9082] font-bold">
                  BNYS., M.D.(ACU)., E-RYT., CDNT., CDCT., CIASTM.
                </span>
              </div>

              <div className="mt-3.5 pt-3 border-t border-[#f0ede6] flex flex-wrap gap-2">
                {[
                  "Yoga & Naturopathy Physician",
                  "Yoga Teacher",
                  "Wellness Consultant",
                  "Acupuncture & Spine Care",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[#f4f7f4] border border-[#dbe6dc] text-[0.72rem] sm:text-[0.76rem] font-semibold text-[#254133]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Flowing Narrative Content: starts beside the image and wraps beneath it naturally */}
            <div className="space-y-3.5 text-xs sm:text-[0.92rem] font-medium text-[#1f382b] leading-relaxed">
              <p>
                <strong className="font-bold text-[#112e22]">Dr. S. Vikram Pandy</strong> is a{" "}
                <strong className="font-bold text-[#112e22]">holistic wellness practitioner</strong>,{" "}
                <strong className="font-bold text-[#112e22]">naturopathy &amp; yoga physician</strong>,{" "}
                <strong className="font-bold text-[#112e22]">internationally recognized yoga teacher</strong>, and{" "}
                <strong className="font-bold text-[#112e22]">therapeutic wellness consultant</strong> with expertise in naturopathy, yogic science, acupuncture, rehabilitation support therapies, and integrative healing practices. With a multidisciplinary approach to wellness, he combines traditional healing wisdom with modern therapeutic techniques to support physical well-being, relaxation, mobility, posture correction, pain management, emotional balance, mental clarity, and overall mind-body harmony.
              </p>

              <p>
                He completed his{" "}
                <strong className="font-bold text-[#112e22]">
                  Bachelor of Naturopathy and Yogic Sciences (BNYS)
                </strong>{" "}
                from{" "}
                <strong className="font-bold text-[#112e22]">
                  Sivaraj Naturopathy and Yoga Medical College, Salem
                </strong>
                , under{" "}
                <strong className="font-bold text-[#112e22]">
                  The Tamil Nadu Dr. M.G.R. Medical University, Chennai, Tamil Nadu
                </strong>
                . He also holds a{" "}
                <strong className="font-bold text-[#112e22]">
                  Master Diploma in Acupuncture (M.D.(ACU))
                </strong>{" "}
                from{" "}
                <strong className="font-bold text-[#112e22]">
                  Acupressure Acupuncture &amp; Alternative Medicine Institute (ACS), Rajasthan, India
                </strong>
                .
              </p>

              <p>
                Dr. Vikram Pandy is an{" "}
                <strong className="font-bold text-[#112e22]">
                  Experienced Registered Yoga Teacher (E-RYT)
                </strong>{" "}
                recognized by{" "}
                <strong className="font-bold text-[#112e22]">Yoga Alliance, USA</strong> and internationally accredited in yoga education, therapeutic yoga instruction, pranayama, meditation, and holistic wellness practices. His additional internationally affiliated certifications include{" "}
                <strong className="font-bold text-[#112e22]">
                  Certified Dry Needling Therapist (CDNT)
                </strong>
                ,{" "}
                <strong className="font-bold text-[#112e22]">
                  Certified Diversified Cupping Therapist (CDCT)
                </strong>
                , and{" "}
                <strong className="font-bold text-[#112e22]">
                  Certified Instrument-Assisted Soft Tissue Mobilization Therapist (CIASTM)
                </strong>
                , with professional clinical and rehabilitation training completed through{" "}
                <strong className="font-bold text-[#112e22]">
                  Keyphysio Academy, Coimbatore, Tamil Nadu, India
                </strong>
                .
              </p>

              <p>
                He is also professionally trained in{" "}
                <strong className="font-bold text-[#112e22]">
                  DORN THERAPY (German Spine Care Technique)
                </strong>
                ,{" "}
                <strong className="font-bold text-[#112e22]">SU JOK THERAPY</strong>, and{" "}
                <strong className="font-bold text-[#112e22]">SEED THERAPY</strong> through advanced workshops and holistic therapeutic training programs conducted by{" "}
                <strong className="font-bold text-[#112e22]">
                  Galaxy Health Education, Coimbatore, Tamil Nadu, India
                </strong>
                .
              </p>

              <p>
                With years of practical teaching and wellness experience, Dr. Vikram integrates yoga therapy, therapeutic bodywork, rehabilitation techniques, mindful movement, breathwork, meditation, acupuncture-based wellness practices, and holistic lifestyle guidance to create a healing environment that supports physical recovery, inner balance, emotional well-being, and spiritual awareness. Through{" "}
                <strong className="font-bold text-[#112e22]">
                  Dr. Vikram Yoga &amp; Wellness Centre
                </strong>
                , his mission is to guide individuals toward healthier living and long-term wellness through natural, integrative, and mindful healing approaches.
              </p>
            </div>
          </div>

          {/* ── Card 2: Dr. T. Sangamithirai ── */}
          <div className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#ebe6dc] shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(22,56,43,0.08)] hover:border-gold/30 transition-all duration-300 flow-root">
            {/* Profile Image — floated on tablet & desktop so text flows beside and then below */}
            <div className="w-full sm:w-64 md:w-72 lg:w-80 aspect-square sm:float-left sm:mr-8 lg:mr-10 mb-6 sm:mb-4 rounded-xl sm:rounded-2xl overflow-hidden bg-[#eef3ee] border border-[#e1e9e2] shadow-sm relative group-hover:border-gold/40 transition-colors shrink-0">
              <img
                src={drSangamithra}
                alt="Dr. T. Sangamithirai — Ayurveda Consultant"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Header: Name, Designation, Degree & Subtitle */}
            <div className="mb-4">
              <h3 className="font-display text-2xl sm:text-3xl lg:text-[2rem] text-[#16382b] font-bold leading-tight group-hover:text-gold transition-colors duration-300">
                Dr. T. Sangamithirai
              </h3>

              <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-1.5">
                <span className="text-xs sm:text-sm font-bold text-[#546e5f]">
                  Ayurveda Consultant
                </span>
                <span className="text-gold/60 text-xs hidden sm:inline">&bull;</span>
                <span className="text-[0.72rem] sm:text-xs tracking-wider uppercase text-[#7d9082] font-bold">
                  BAMS
                </span>
                <span className="text-gold/60 text-xs hidden sm:inline">&bull;</span>
                <span className="text-xs sm:text-[0.82rem] font-serif-display italic text-[#8c6d2d]">
                  Rooted in Tradition, Dedicated to Healing
                </span>
              </div>

              <div className="mt-3.5 pt-3 border-t border-[#f0ede6] flex flex-wrap gap-2">
                {[
                  "Classical Ayurveda",
                  "Personalized Care",
                  "Holistic Wellness",
                  "Women's Health & Maternal Care",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-[#f4f7f4] border border-[#dbe6dc] text-[0.72rem] sm:text-[0.76rem] font-semibold text-[#254133]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Flowing Narrative Content: starts beside the image and wraps beneath it naturally */}
            <div className="space-y-3.5 text-xs sm:text-[0.92rem] font-medium text-[#1f382b] leading-relaxed">
              <p>
                <strong className="font-bold text-[#112e22]">Dr. T. Sangamithirai</strong> is a dedicated{" "}
                <strong className="font-bold text-[#112e22]">Ayurveda Physician and Wellness Consultant</strong> with a strong foundation in classical Ayurvedic principles. She follows a patient-centered and holistic approach, combining traditional Ayurvedic wisdom with practical, individualized wellness guidance.
              </p>

              <p>
                Her areas of focus include{" "}
                <strong className="font-bold text-[#112e22]">
                  women&apos;s health, skin and hair care, metabolic disorders, musculoskeletal health, preventive care, and overall wellness
                </strong>{" "}
                across different age groups.
              </p>

              <p>
                She completed her{" "}
                <strong className="font-bold text-[#112e22]">
                  Bachelor of Ayurvedic Medicine and Surgery (BAMS)
                </strong>
                , affiliated with{" "}
                <strong className="font-bold text-[#112e22]">
                  The Tamil Nadu Dr. M.G.R. Medical University, Chennai, Tamil Nadu
                </strong>
                .
              </p>

              <p>
                <strong className="font-bold text-[#112e22]">Dr. Sangamithirai</strong> also holds a{" "}
                <strong className="font-bold text-[#112e22]">
                  Workshop Specialist Certificate in Women&apos;s Health, Antenatal and Postnatal Care
                </strong>
                , reflecting her focused training in maternal wellness and reproductive health through Ayurveda.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs sm:text-[0.8rem] font-bold text-[#1a3d2f] tracking-wide">
                <span className="px-3 py-1 rounded-full bg-[#f4f7f4] border border-[#dbe6dc]">Classical Ayurveda</span>
                <span className="text-gold">&bull;</span>
                <span className="px-3 py-1 rounded-full bg-[#f4f7f4] border border-[#dbe6dc]">Personalized Care</span>
                <span className="text-gold">&bull;</span>
                <span className="px-3 py-1 rounded-full bg-[#f4f7f4] border border-[#dbe6dc]">Holistic Wellness</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   6. "OUR AREAS OF EXPERTISE" (6 circular sage badges)
   ───────────────────────────────────────────────────────────── */
function ExpertiseSection() {
  const areas = [
    {
      title: "Therapeutic Yoga",
      icon: (
        // Seated lotus meditation icon
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-9 h-9">
          <circle cx="24" cy="11" r="4.5" />
          <path d="M19 19h10c2.5 0 4 2 4.5 5l1.5 5c.5 1.5-.5 3-2 3s-2.5-1-3-2.5L29 25v7h-10v-7l-1 4.5c-.5 1.5-1.5 2.5-3 2.5s-2.5-1.5-2-3l1.5-5c.5-3 2-5 4.5-5Z" />
          <path d="M12 36c3.5-1 7.5-1.5 12-1.5s8.5.5 12 1.5" />
        </svg>
      ),
    },
    {
      title: "Naturopathy & Natural Healing",
      icon: (
        // Twin herbal leaves
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-9 h-9">
          <path d="M24 37C24 37 25 25 35 17c5-4 7-4 7-4s0 2-4 7c-8 10-14 17-14 17Z" />
          <path d="M24 37C24 37 23 28 15 22c-4-3-6-3-6-3s0 2 3 5c6 8 12 13 12 13Z" />
          <path d="M24 37v4" />
        </svg>
      ),
    },
    {
      title: "Ayurveda Consultation",
      icon: (
        // Ayurveda lotus flower blossom
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-9 h-9">
          <path d="M24 10c-3 6-3 13 0 21 3-8 3-15 0-21Z" />
          <path d="M23 18c-6-1-11 3-10 9 2 4 6 5 10 5" />
          <path d="M25 18c6-1 11 3 10 9-2 4-6 5-10 5" />
          <path d="M18 28c-6 1-8 5-6 8 2 2 7 1 10-1" />
          <path d="M30 28c6 1 8 5 6 8-2 2-7 1-10-1" />
        </svg>
      ),
    },
    {
      title: "Therapeutic Bodywork",
      icon: (
        // Healing hands
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-9 h-9">
          <path d="M15 28l5-9c.8-1.5 2.6-2 4-1.2 1.4.8 1.9 2.6 1.1 4l-3 5.5" />
          <path d="M23 20l2-4c.8-1.5 2.6-2 4-1.2 1.4.8 1.9 2.6 1.1 4l-2.5 5" />
          <path d="M28 22l2-3c.8-1.5 2.6-2 4-1.2 1.4.8 1.9 2.6 1.1 4l-3.5 6.5" />
          <path d="M12 28c0 7 6 12 13 12s12-5 12-12" />
        </svg>
      ),
    },
    {
      title: "Acupuncture & Holistic Therapies",
      icon: (
        // Acupuncture needles and meridian points
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-9 h-9">
          <circle cx="16" cy="14" r="2" fill="currentColor" />
          <line x1="16" y1="16" x2="16" y2="34" />
          <circle cx="24" cy="11" r="2" fill="currentColor" />
          <line x1="24" y1="13" x2="24" y2="37" />
          <circle cx="32" cy="14" r="2" fill="currentColor" />
          <line x1="32" y1="16" x2="32" y2="34" />
        </svg>
      ),
    },
    {
      title: "Lifestyle & Wellness Guidance",
      icon: (
        // Sprout / growth leaf
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-9 h-9">
          <path d="M24 38V22" />
          <path d="M24 22c0-5.5 4-10 10-11 0 6-3.5 10-10 11Z" />
          <path d="M24 26c0-5-3.5-9-9-10 0 5.5 3 9 9 10Z" />
          <path d="M24 30c0-3.5 3-6.5 7-7 0 4-2.5 6.5-7 7Z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 lg:py-22 bg-gradient-to-b from-[#e8f0e9] to-[#f7f5ed] border-y border-[#ede8dd] overflow-hidden shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Badge-style Section Heading ── */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-14">
          {/* Decorative top line */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-10 sm:w-16 bg-[#1a3d2f]/25" />
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-[#96773a]">
              <path d="M12 2l2.09 6.26L21 9.27l-5.18 4.73L17.82 21 12 17.27 6.18 21l1.64-6.73L2 9.27l6.91-1.01L12 2z" fill="currentColor" opacity="0.7"/>
            </svg>
            <span className="h-px w-10 sm:w-16 bg-[#1a3d2f]/25" />
          </div>

          {/* Seal-shaped heading container */}
          <div className="relative inline-flex items-center justify-center">
            {/* Outer decorative ring */}
            <div className="absolute inset-0 -m-4 sm:-m-5 rounded-full border-2 border-dashed border-[#1a3d2f]/15" />
            {/* Inner ring */}
            <div className="relative px-6 sm:px-10 py-3 sm:py-4 rounded-full border-2 border-[#1a3d2f]/30 bg-[#1a3d2f]/[0.04]">
              <h2 className="text-[0.78rem] sm:text-[0.88rem] tracking-[0.28em] uppercase font-extrabold text-[#1a3d2f]">
                Our Areas of Expertise
              </h2>
            </div>
          </div>

          {/* Decorative bottom line */}
          <div className="flex items-center gap-3 mt-5">
            <span className="h-px w-10 sm:w-16 bg-[#1a3d2f]/25" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#96773a]/60" />
            <span className="h-px w-10 sm:w-16 bg-[#1a3d2f]/25" />
          </div>
        </div>

        {/* ── Badge-style Expertise Items ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-start justify-items-center">
          {areas.map((area) => (
            <div key={area.title} className="flex flex-col items-center text-center group">
              {/* Seal / Badge Container */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32">
                {/* Outer gold ring */}
                <div className="absolute inset-0 rounded-full border-2 border-[#c4a36b]/30 group-hover:border-[#c4a36b]/55 transition-colors duration-500" />
                {/* Dashed decorative ring */}
                <div className="absolute inset-1 rounded-full border border-dashed border-[#1a3d2f]/15 group-hover:border-[#1a3d2f]/25 transition-colors duration-500" />
                {/* Inner filled circle */}
                <div className="absolute inset-2.5 rounded-full bg-gradient-to-br from-[#e8f0e9] to-[#d4e2d6] border border-[#c0d4c3] flex items-center justify-center text-[#1a3d2f] shadow-[inset_0_2px_6px_rgba(0,0,0,0.06),_0_2px_8px_rgba(26,61,47,0.08)] group-hover:shadow-[inset_0_2px_6px_rgba(0,0,0,0.04),_0_4px_16px_rgba(26,61,47,0.12)] group-hover:from-[#dceede] group-hover:to-[#c8daca] transition-all duration-500 group-hover:scale-105">
                  {area.icon}
                </div>
                {/* Top notch badge accent */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#96773a]/20 border border-[#96773a]/30 group-hover:bg-[#96773a]/35 transition-colors duration-500" />
              </div>

              {/* Label */}
              <p className="mt-3.5 text-xs sm:text-[0.82rem] font-bold text-[#1a3d2f] leading-snug max-w-[140px] tracking-wide">
                {area.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─────────────────────────────────────────────────────────────
   8. "A PEACEFUL LOCATION IN VARKALA" (Text + 3 Photos Grid)
   ───────────────────────────────────────────────────────────── */
function LocationSection() {
  return (
    <section className="py-16 lg:py-22 bg-[#fcfbf7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Location Description */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="text-[0.8rem] tracking-[0.24em] uppercase font-bold text-[#1a3d2f]">
              A PEACEFUL LOCATION IN VARKALA
            </h2>

            <p className="text-xs sm:text-[0.88rem] text-[#4d6356] leading-relaxed">
              Our centre is located in the beautiful coastal town of Varkala, Trivandrum, Kerala,
              India. Surrounded by natural beauty, stunning cliffs, golden beaches, and a peaceful
              atmosphere, it is an ideal place to relax, heal, and reconnect with yourself.
            </p>

            <div className="flex items-center gap-2 text-xs sm:text-[0.82rem] font-medium text-[#1a3d2f] pt-1">
              <MapPin className="w-4 h-4 text-[#1a3d2f] shrink-0" />
              <span>Varkala, Trivandrum, Kerala, India</span>
            </div>
          </div>

          {/* Right: 3 Scenic Photos Grid with each name directly below */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {/* Image 1: Nature */}
              <div className="flex flex-col items-center">
                <div className="w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-[#e5dfd2]">
                  <img
                    src={varkala1}
                    alt="Varkala beach palms"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="font-script text-lg sm:text-2xl lg:text-[1.7rem] text-[#3d5e4d] text-center mt-2 sm:mt-2.5 leading-snug whitespace-nowrap">
                  Nature
                </p>
              </div>

              {/* Image 2: Tranquility */}
              <div className="flex flex-col items-center">
                <div className="w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-[#e5dfd2]">
                  <img
                    src={varkala2}
                    alt="Varkala sunset over sea"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="font-script text-lg sm:text-2xl lg:text-[1.7rem] text-[#3d5e4d] text-center mt-2 sm:mt-2.5 leading-snug whitespace-nowrap">
                  Tranquility
                </p>
              </div>

              {/* Image 3: Transformation */}
              <div className="flex flex-col items-center">
                <div className="w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-sm border border-[#e5dfd2]">
                  <img
                    src={varkala3}
                    alt="Varkala cliff and waves"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <p className="font-script text-lg sm:text-2xl lg:text-[1.7rem] text-[#3d5e4d] text-center mt-2 sm:mt-2.5 leading-snug whitespace-nowrap">
                  Transformation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   9. "Continue Your Wellness Journey" CTA BANNER
   ───────────────────────────────────────────────────────────── */
function CtaSection() {
  return (
    <section className="relative bg-[#0d261b] text-white py-14 sm:py-18 lg:py-20 overflow-hidden">
      {/* Dewy leaf macro photo on left side, smoothly blended */}
      <div className="absolute inset-y-0 left-0 w-full sm:w-[45%] opacity-40 sm:opacity-55 pointer-events-none">
        <img
          src={ctaDewyLeaf}
          alt="Fresh dewy leaf macro"
          className="w-full h-full object-cover object-left"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0d261b]/80 to-[#0d261b]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Center Content */}
        <div className="flex-1 text-center md:text-left max-w-2xl">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-white font-normal leading-tight">
            Continue Your Wellness Journey
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-white/80 leading-relaxed max-w-xl">
            Discover how yoga, Ayurveda and natural therapies can support a healthier, more balanced
            you.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3.5">
            <Link
              to="/services"
              className="px-6 py-3 rounded-full bg-[#c5a880] hover:bg-[#b59870] text-[#10241a] text-xs font-semibold uppercase tracking-[0.14em] transition-all shadow-sm"
            >
              EXPLORE OUR SERVICES
            </Link>
            <Link
              to="/apply"
              className="px-6 py-3 rounded-full border border-white/50 hover:bg-white/10 text-white text-xs font-semibold uppercase tracking-[0.14em] transition-all"
            >
              BOOK A SESSION
            </Link>
          </div>
        </div>

        {/* Right cursive script accent */}
        <div className="shrink-0 text-center md:text-right">
          <div className="font-script text-3xl sm:text-4xl text-white/90 leading-tight">
            Wellness for a
          </div>
          <div className="font-script text-3xl sm:text-4xl text-white/90 leading-tight">
            Brighter Tomorrow
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   10. FOOTER (Dark Emerald Theme matching reference design)
   ───────────────────────────────────────────────────────────── */
export function Footer() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Yoga Classes" },
    { to: "/services", label: "Wellness Retreats" },
    { to: "/services", label: "Therapies" },
    { to: "/services", label: "Massage Certificate Courses" },
    { to: "/services", label: "Online Classes" },
    { to: "/terms-and-conditions", label: "Terms & Conditions" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <footer className="bg-emerald-deep text-cream pt-20 pb-24 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <img src={logo} alt="Dr Vikram" className="h-16" />
          <p className="mt-6 text-sm text-cream/70 leading-relaxed">
            Dr. Vikram Yoga &amp; Wellness Centre is dedicated to holistic healing through yoga,
            meditation, wellness therapies, retreats, and transformative education.
          </p>
          <p className="mt-6 text-sm text-cream/70 leading-relaxed italic">
            &ldquo;The journey of healing begins within. Let us guide you toward a healthier, happier,
            more peaceful, and harmonious life through the power of yoga, mindful living, and
            holistic wellness.&rdquo;
          </p>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">
            Quick Links
          </h4>
          <ul className="mt-6 space-y-3 text-sm text-cream/70">
            {links.map((l, i) => (
              <li key={i}>
                <Link to={l.to} className="hover:text-gold transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">
            Contact Information
          </h4>
          <ul className="mt-6 space-y-4 text-sm text-cream/70">
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>+91 8778639989</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>drvikramyogawellness@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <span>
                Dr. Vikram Yoga &amp; Wellness Centre<br />
                Varkala, Tamil Nadu, India.
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">
            Stay Connected
          </h4>
          <form className="mt-6 flex">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 bg-transparent border border-cream/20 rounded-l-full px-5 py-3 text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none"
            />
            <button className="px-5 rounded-r-full bg-gold-gradient text-emerald-deep">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Instagram, href: "https://www.instagram.com/dr.vikram_yoga_wellness?stkn=MTQ0YnhucG94cXJ1Nw==" },
              { Icon: Facebook, href: "#" },
              { Icon: Youtube, href: "#" },
              { Icon: MessageCircle, href: "https://wa.me/918778639989" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <Icon className="w-4 h-4 text-gold" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="gold-divider" />
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/50 tracking-[0.15em] uppercase">
          <span>&copy; {new Date().getFullYear()} Dr. Vikram Yoga &amp; Wellness Centre</span>
          <span>HEAL &bull; HARMONIZE &bull; TRANSFORM</span>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   WhatsApp and Booking Float Buttons
   ───────────────────────────────────────────────────────────── */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/918778639989"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25d366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      aria-label="WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}

export function BookNowFloat() {
  return (
    <Link
      to="/apply"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 group"
      aria-label="Book Now"
    >
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1a3d2f] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
        <CalendarDays className="w-5 h-5 text-white" />
      </div>
      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-[#1a3d2f] text-white text-[0.65rem] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full shadow-md whitespace-nowrap">
        Book Session
      </span>
    </Link>
  );
}
