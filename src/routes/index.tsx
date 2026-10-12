import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/New/Meditation at Tropical Sunset.png";
import logo from "@/assets/logo.png";
import founder from "@/assets/founder.png";
import about from "@/assets/about.png";
import therapy from "@/assets/meditation_slide.png";
import retreat from "@/assets/varkala_sunset_sea.jpg";
import classes from "@/assets/classes.jpg";
import training100h from "@/assets/training_100h.png";
import training200hStd from "@/assets/training_200h_std.png";
import training200hLux from "@/assets/training_200h_lux.png";
import training300h from "@/assets/training_300h.png";
import gImg1 from "@/assets/g-img1.jpg";
import gImg2 from "@/assets/g-img2.jpeg";
import gImg3 from "@/assets/g-img3.jpeg";
import gImg4 from "@/assets/g-img4.jpeg";
import avatarLea from "@/assets/New/file_00000000532882118f2edf384a4cc863 (1).png";
import avatarPatrick from "@/assets/New/file_00000000e5448211bcd6ac613aec8e4f.png";
import avatarSarah from "@/assets/New/file_00000000cbc48208b85635741587e067 (1).png";
import avatarMichael from "@/assets/New/file_00000000d85882119458c3c9987ceaec (1).png";
import gImg5 from "@/assets/g-img5.jpeg";
import gImg6 from "@/assets/g-img6.jpeg";
import gImg7 from "@/assets/g-img7.jpeg";
import gImg8 from "@/assets/g-img8.jpeg";
import gImg9 from "@/assets/g-img9.jpeg";
import gImg10 from "@/assets/g-img10.jpeg";
import gImg11 from "@/assets/g-img11.jpeg";

import varkalaBeach from "@/assets/about_hero_veranda.jpg";
import varkalaBeachCardImg from "@/assets/varkala_beach.png";
import templeImg from "@/assets/temple_1.png";
import sivagiriMuttImg from "@/assets/sivagiri_mutt.jpg";
import anjengoFortImg from "@/assets/anjengo_fort.jpg";
import yogaLifestyle from "@/assets/yoga_lifestyle.png";
import retreatBanner from "@/assets/retreat_banner.png";
import healingAtmosphere from "@/assets/healing_atmosphere.png";
import testimonialBg from "@/assets/testimonial_bg.png";
import healingSessionsSlide from "@/assets/healing_sessions_slide.png";
import yogaClassesSlide from "@/assets/yoga_classes_slide.png";
import wellnessRetreatsSlide from "@/assets/wellness_retreats_slide.png";
import meditationSlide from "@/assets/meditation_slide.png";
import sereneEnvironmentSlide from "@/assets/serene_environment_slide.png";

import instaNew1 from "@/assets/New/file_00000000e2f48208b353a09b8451f839.png";
import instaNew2 from "@/assets/New/file_0000000027c0820b9a5711022d613771.png";
import instaNew3 from "@/assets/New/IMG_20250516_171414.jpg.jpeg";
import instaNew5 from "@/assets/New/IMG_20250517_083145.jpg.jpeg";
import instaNew7 from "@/assets/New/IMG_20250520_092421.jpg.jpeg";
import instaNew8 from "@/assets/New/IMG_20250520_083632.jpg.jpeg";

import lordShivaImg from "@/assets/New/file_00000000c5288211bdea0b8f67d20cd7.png";
import sagePatanjaliImg from "@/assets/New/file_00000000f42c8211906c077874ac5b69.png";

import thaiMassageImg from "@/assets/New folder/Thai yoga massage courses.png";
import ayurvedicMassageImg from "@/assets/New folder/Ayurvedic massage courses.png";
import thaiCourseImg from "@/assets/New folder/Thai yoga massage courses.png";
import ayurvedicCourseImg from "@/assets/New folder/Ayurvedic massage courses.png";
import yogaWellnessRetreatImg from "@/assets/Yoga wellness retreat.png";

import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flower2,
  Sparkles,
  Heart,
  Leaf,
  Sun,
  Wind,
  Hand,
  Mountain,
  GraduationCap,
  Globe,
  Star,
  Quote,
  ArrowRight,
  Play,
  Calendar,
  Users,
  User,
  Compass,
  Navigation,
  Bike,
  Car,
  Footprints,
  Clock,
  ArrowUpRight,
  ExternalLink,
  X,
  Info,
  CheckCircle2,
  Palmtree,
  Stethoscope,
} from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat } from "./about";
import { getApiUrl, resolveImageUrl } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Dr. Vikram Yoga & Wellness Centre — Heal • Harmonize • Transform" },
      {
        name: "description",
        content:
          "Holistic healing, yoga therapy, wellness retreats, and certification courses with Dr. S. Vikram Pandy. A premium sanctuary for transformation.",
      },
      { property: "og:title", content: "Dr. Vikram Yoga & Wellness Centre" },
      {
        property: "og:description",
        content:
          "Heal • Harmonize • Transform — Holistic healing, therapeutic wellness, and transformative retreat experiences.",
      },
      { property: "og:image", content: hero },
    ],
  }),
});

function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <ImageShowcase />
      <Welcome />
      <OriginsOfYoga />
      <WhyUs />
      <LedByDoctor />
      <DiscoverServices />
      {/* <Benefits /> */}
      <SocialFeed />
      <VisitLocalAreas />
      <Testimonials />
      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}

/* Navbar is now the shared component from ./about */

/* ---------------- Image Showcase Slideshow ---------------- */
function ImageShowcase() {
  const slides = [
    { img: healingSessionsSlide, label: "Healing Sessions", sub: "Holistic Wellness" },
    { img: yogaClassesSlide, label: "Yoga Classes", sub: "Mind & Body" },
    { img: gImg7, label: "Therapeutic Bodywork", sub: "Restore & Recover" },
    { img: wellnessRetreatsSlide, label: "Wellness Retreats", sub: "Transform Deeply" },
    { img: sereneEnvironmentSlide, label: "Serene Environment", sub: "Healing Sanctuary" },
    { img: meditationSlide, label: "Pranayama & Meditation", sub: "Inner Stillness" },
    { img: retreat, label: "Nature Retreats", sub: "Peace & Renewal" },
    { img: therapy, label: "Wellness Therapies", sub: "Therapeutic Touch" },
  ];

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  const SLIDE_DURATION = 5000;
  const TRANSITION_MS = 1000;

  useEffect(() => {
    setProgress(0);
    const TICK = 50;
    let elapsed = 0;
    const progressTimer = setInterval(() => {
      elapsed += TICK;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    }, TICK);
    const slideTimer = setTimeout(() => {
      setPrev(current);
      setAnimating(true);
      setCurrent((c) => (c + 1) % slides.length);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, TRANSITION_MS);
    }, SLIDE_DURATION);
    return () => {
      clearInterval(progressTimer);
      clearTimeout(slideTimer);
    };
  }, [current, slides.length]);

  const goTo = (idx: number) => {
    if (idx === current || animating) return;
    setPrev(current);
    setAnimating(true);
    setCurrent(idx);
    setProgress(0);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, TRANSITION_MS);
  };

  const goPrev = () => goTo((current - 1 + slides.length) % slides.length);
  const goNext = () => goTo((current + 1) % slides.length);

  return (
    <section className="relative w-full h-[48vh] sm:h-[58vh] md:h-[66vh] max-h-[600px] overflow-hidden bg-emerald-deep">
      {/* Stacked slides with crossfade */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0"
          style={{
            opacity: idx === current ? 1 : idx === prev ? 0 : 0,
            zIndex: idx === current ? 2 : idx === prev ? 1 : 0,
            transition: `opacity ${TRANSITION_MS}ms cubic-bezier(0.4,0,0.2,1)`,
          }}
        >
          <img
            src={slide.img}
            alt={slide.label}
            className="w-full h-full object-cover object-center"
            style={{
              transform: idx === current ? "scale(1.06)" : "scale(1)",
              transition: idx === current
                ? `transform ${SLIDE_DURATION + TRANSITION_MS}ms ease-out`
                : "none",
              transformOrigin: "center center",
            }}
            loading={idx === 0 ? "eager" : "lazy"}
          />
          {/* Refined overlay — lighter so images are clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-emerald-deep/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/30 via-transparent to-transparent" />
        </div>
      ))}

      {/* Gold progress bar */}
      <div className="absolute top-0 left-0 right-0 z-20 h-[3px] bg-white/10">
        <div
          className="h-full bg-gold"
          style={{ width: `${progress}%`, transition: "width 50ms linear" }}
        />
      </div>

      {/* Caption */}
      <div className="absolute bottom-10 sm:bottom-12 md:bottom-14 left-4 sm:left-6 md:left-12 right-4 md:right-auto z-20 max-w-xl">
        <div className="flex items-center gap-2.5 mb-1.5 sm:mb-2">
          <div className="h-px w-6 sm:w-10 bg-gold" />
          <span className="text-gold font-serif-display text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] sm:tracking-[0.4em] uppercase">
            {slides[current].sub}
          </span>
        </div>
        <h2
          key={current}
          className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-cream drop-shadow-2xl leading-tight animate-fade-up"
        >
          {slides[current].label}
        </h2>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-gold/30 border border-white/20 hover:border-gold/60 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-cream" />
      </button>
      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-black/30 hover:bg-gold/30 border border-white/20 hover:border-gold/60 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-cream" />
      </button>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`rounded-full transition-all duration-500 ${idx === current
              ? "w-8 h-1.5 bg-gold shadow-[0_0_8px_rgba(212,175,55,0.7)]"
              : "w-1.5 h-1.5 bg-cream/35 hover:bg-cream/70"
              }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-8 z-20 font-serif-display text-[0.65rem] tracking-widest text-cream/70">
        <span className="text-gold font-semibold">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1 text-cream/40">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

/* ---------------- Golden Lotus Emblem ---------------- */
function GoldenLotusEmblem({ className = "w-10 h-7" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 68"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Central petal */}
      <path
        d="M50 2 C44 20 40 40 50 56 C60 40 56 20 50 2 Z"
        className="text-[#c89945]"
      />
      {/* Inner left petal */}
      <path
        d="M47 14 C32 26 26 43 45 54 C34 44 38 28 47 14 Z"
        className="text-[#d8a84e]"
      />
      {/* Inner right petal */}
      <path
        d="M53 14 C68 26 74 43 55 54 C66 44 62 28 53 14 Z"
        className="text-[#d8a84e]"
      />
      {/* Outer left petal */}
      <path
        d="M38 28 C18 38 12 52 38 58 C22 52 24 39 38 28 Z"
        className="text-[#b98737]"
      />
      {/* Outer right petal */}
      <path
        d="M62 28 C82 38 88 52 62 58 C78 52 76 39 62 28 Z"
        className="text-[#b98737]"
      />
      {/* Base curve */}
      <path
        d="M36 60 C44 64 56 64 64 60 C58 63 42 63 36 60 Z"
        className="text-[#b98737]"
      />
    </svg>
  );
}

/* ---------------- Meditating Silhouette Icon for Join Our Classes ---------------- */
function MeditatingSilhouetteIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Head */}
      <circle cx="12" cy="4" r="2" />
      {/* Torso & arms resting on crossed knees in Padmasana */}
      <path d="M12 7c-1.5 0-2.8.8-3.4 2.1l-2.1 4.2c-.2.4 0 .9.4 1.1.4.2.9 0 1.1-.4l1.6-3.2v3.7l-3 1.5c-.4.2-.6.7-.4 1.1.2.4.7.6 1.1.4l2.5-1.2c.6-.3 1.3-.5 2.2-.5s1.6.2 2.2.5l2.5 1.2c.4.2.9 0 1.1-.4.2-.4 0-.9-.4-1.1l-3-1.5V10.8l1.6 3.2c.2.4.7.6 1.1.4.4-.2.6-.7.4-1.1l-2.1-4.2C14.8 7.8 13.5 7 12 7z" />
    </svg>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen min-h-[100dvh] w-full flex items-center justify-center pt-24 sm:pt-28 lg:pt-20 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#eef3f0]"
    >
      {/* Background image — panoramic coastal yoga vista matching reference image */}
      <img
        src={hero}
        alt="Dr. Vikram Yoga &amp; Wellness Centre overlooking the ocean"
        className="absolute inset-0 w-full h-full object-cover object-[18%_center] sm:object-[22%_center] lg:object-[26%_center] 2xl:object-center select-none pointer-events-none"
        width={1920}
        height={1080}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Column Spacer: preserves unobstructed view of meditating figure on rocks on desktop */}
          <div className="hidden lg:block lg:col-span-5 pointer-events-none" />

          {/* Right Column: Hero Content Cluster precisely replicating reference design */}
          <div className="lg:col-span-7 flex flex-col items-center text-center animate-fade-up">
            {/* Logo just above the headline in the hero section */}
            <div className="mb-2 sm:mb-3 flex justify-center">
              <img
                src={logo}
                alt="Dr. Vikram Yoga & Wellness Centre"
                className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.2)] hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Headline 1: Dr. Vikram */}
            <h1
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5.25rem] font-bold text-[#083d25] tracking-tight leading-[1.05]"
              style={{
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.7), 0 0 16px rgba(255, 255, 255, 0.5)",
              }}
            >
              Dr. Vikram
            </h1>

            {/* Headline 2: Yoga & Wellness Centre */}
            <p
              className="font-display italic text-2xl sm:text-3xl md:text-4xl lg:text-[2.85rem] xl:text-[3.5rem] font-extrabold tracking-normal mt-0.5 sm:mt-1 text-[#ba8336]"
              style={{
                fontWeight: 800,
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.7)",
              }}
            >
              Yoga &amp; Wellness Centre
            </p>

            {/* Tagline */}
            <p
              className="font-display text-xs sm:text-sm md:text-base lg:text-[1.05rem] xl:text-[1.15rem] font-bold text-[#083d25] tracking-normal sm:tracking-wide mt-2 sm:mt-2.5 px-2 max-w-3xl xl:max-w-4xl leading-relaxed whitespace-normal sm:whitespace-nowrap"
              style={{
                fontWeight: 700,
                textShadow: "0 1px 2px rgba(255, 255, 255, 0.7)",
              }}
            >
              Holistic Healing &bull; Therapeutic Wellness &bull; Transformative Retreat Experiences
            </p>

            {/* Divider: HEAL • HARMONIZE • TRANSFORM */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 w-full max-w-md sm:max-w-lg lg:max-w-xl mx-auto my-3 sm:my-3.5 px-2">
              <span className="h-[2px] flex-1 min-w-[20px] bg-gradient-to-r from-transparent via-[#ba8336] to-[#ba8336]" />
              <span
                className="font-display text-[0.7rem] sm:text-[0.78rem] md:text-[0.88rem] tracking-[0.22em] uppercase text-[#083d25] font-extrabold text-center shrink-0 whitespace-nowrap"
                style={{ fontWeight: 800 }}
              >
                HEAL <span className="text-[#ba8336] mx-1 sm:mx-1.5 font-black">&bull;</span> HARMONIZE <span className="text-[#ba8336] mx-1 sm:mx-1.5 font-black">&bull;</span> TRANSFORM
              </span>
              <span className="h-[2px] flex-1 min-w-[20px] bg-gradient-to-l from-transparent via-[#ba8336] to-[#ba8336]" />
            </div>

            {/* 4 Action Pill Buttons in 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 w-full max-w-md sm:max-w-xl lg:max-w-2xl mx-auto mt-1 sm:mt-1.5">
              {/* Button 1: JOIN OUR CLASSES (Dark Green) */}
              <Link
                to="/yoga"
                className="group flex items-center justify-between h-[48px] sm:h-[52px] lg:h-[54px] px-3 sm:px-3.5 rounded-full bg-[#063b21] hover:bg-[#042816] text-white shadow-[0_4px_14px_rgba(6,59,33,0.35)] hover:shadow-[0_6px_20px_rgba(6,59,33,0.45)] transition-all duration-300 hover:scale-[1.02] border border-[#0d4f2e]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#0b3821] border border-[#deb05e] flex items-center justify-center text-[#deb05e] shrink-0 shadow-inner">
                    <MeditatingSilhouetteIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </span>
                  <span className="font-sans font-bold text-[0.72rem] sm:text-[0.78rem] lg:text-[0.82rem] tracking-wider uppercase text-white whitespace-nowrap">
                    JOIN OUR CLASSES
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#deb05e] shrink-0 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Button 2: EXPLORE RETREATS (Warm Gold) */}
              <Link
                to="/retreats"
                className="group flex items-center justify-between h-[48px] sm:h-[52px] lg:h-[54px] px-3 sm:px-3.5 rounded-full bg-[#deb05e] hover:bg-[#d4a34b] text-[#063b21] shadow-[0_4px_14px_rgba(222,176,94,0.35)] hover:shadow-[0_6px_20px_rgba(222,176,94,0.45)] transition-all duration-300 hover:scale-[1.02] border border-[#ecd299]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#cf9f47]/60 border border-[#ba8336] flex items-center justify-center text-[#063b21] shrink-0 shadow-inner">
                    <Palmtree className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2.2} />
                  </span>
                  <span className="font-sans font-bold text-[0.72rem] sm:text-[0.78rem] lg:text-[0.82rem] tracking-wider uppercase text-[#063b21] whitespace-nowrap">
                    EXPLORE RETREATS
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#063b21] shrink-0 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Button 3: Book a Wellness Consultation (Ivory/White) */}
              <Link
                to="/wellness-therapy"
                className="group flex items-center justify-between h-[48px] sm:h-[52px] lg:h-[54px] px-3 sm:px-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#063b21] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] border border-[#d0dbd4]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f0fdec] border border-[#d0dbd4] flex items-center justify-center text-[#063b21] shrink-0">
                    <Stethoscope className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2.2} />
                  </span>
                  <span className="font-sans font-semibold text-[0.72rem] sm:text-[0.78rem] lg:text-[0.82rem] text-[#063b21] whitespace-nowrap">
                    Book a Wellness Consultation
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#063b21] shrink-0 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Button 4: Enroll In Certificate Courses (Ivory/White) */}
              <Link
                to="/certificate-courses"
                className="group flex items-center justify-between h-[48px] sm:h-[52px] lg:h-[54px] px-3 sm:px-3.5 rounded-full bg-white hover:bg-neutral-50 text-[#063b21] shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_18px_rgba(0,0,0,0.12)] transition-all duration-300 hover:scale-[1.02] border border-[#d0dbd4]"
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f1fdf1] border border-[#d0dbd4] flex items-center justify-center text-[#063b21] shrink-0">
                    <GraduationCap className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2.2} />
                  </span>
                  <span className="font-sans font-semibold text-[0.72rem] sm:text-[0.78rem] lg:text-[0.82rem] text-[#063b21] whitespace-nowrap">
                    Enroll In Certificate Courses
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#063b21] shrink-0 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Welcome ---------------- */
function Welcome() {
  return (
    <section className="relative py-10 sm:py-14 bg-cream overflow-hidden">
      {/* Decorative background ambient glows */}
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-gold/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-emerald/10 blur-[100px] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-12 gap-12 xl:gap-16 items-center">

          {/* ── Left Column: Text Content (Prominent, Bold & Clear) ── */}
          <div className="lg:col-span-7 space-y-6">

            {/* Top Pill / Badge */}
            <div>
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-deep/5 border border-gold/40 shadow-sm mb-4">
                <Flower2 className="w-4 h-4 text-gold shrink-0" />
                <span className="font-serif-display text-xs sm:text-sm tracking-[0.35em] text-emerald-deep font-extrabold uppercase">
                  Welcome to Sanctuary
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] text-emerald-deep font-bold leading-[1.15] tracking-tight text-balance">
                A holistic{" "}
                <span className="text-gold-gradient not-italic font-extrabold">healing sanctuary</span>.
              </h2>
              <div className="gold-divider mt-5 mb-0 max-w-[5rem]" />
            </div>

            {/* Body Content — High Contrast, Bold & Visually Clear */}
            <div className="space-y-4">
              <p className="text-black font-bold text-lg sm:text-xl leading-relaxed">
                Welcome to <strong className="font-extrabold text-black">Dr. Vikram Yoga &amp; Wellness Centre</strong> — a premier holistic healing sanctuary where ancient yogic wisdom harmoniously meets modern therapeutic wellness practices.
              </p>

              <p className="text-gray-900 font-semibold text-base sm:text-[1.05rem] leading-relaxed">
                Located in the serene coastal cliffs of <strong className="font-bold text-black">Varkala, Trivandrum, Kerala, India</strong>, our centre offers an authentic, peaceful sanctuary dedicated to natural healing, mindful living, and complete bodily rejuvenation.
              </p>

              {/* Philosophy / Motto Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-emerald-deep via-[#0e271b] to-emerald-deep text-cream shadow-luxury border border-gold/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
                <p className="font-display italic text-base sm:text-lg font-semibold text-cream leading-relaxed">
                  &ldquo;Our programs are thoughtfully designed for authentic yoga experiences, therapeutic healing, mindful relaxation, and natural wellness in a peaceful coastal atmosphere.&rdquo;
                </p>
                <div className="mt-3 flex items-center gap-2 flex-wrap sm:flex-nowrap">
                  <span className="h-[2px] w-6 sm:w-8 bg-gold shrink-0" />
                  <span className="text-[0.72rem] sm:text-xs font-serif-display font-bold uppercase tracking-[0.18em] sm:tracking-[0.25em] text-gold">
                    HEAL <span className="text-cream/80 mx-1">•</span> HARMONIZE <span className="text-cream/80 mx-1">•</span> TRANSFORM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right Column: Balanced Luxury Image Composition ── */}
          <div className="lg:col-span-5 relative">
            {/* Ambient gold glow behind collage */}
            <div className="absolute inset-0 bg-gold/10 blur-[80px] rounded-full pointer-events-none" />

            {/* Floating Top Badge */}
            <div className="absolute -top-4 right-4 glass-dark rounded-full px-5 py-2 shadow-luxury border border-gold/40 text-cream backdrop-blur-md z-20 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="font-serif-display text-xs font-bold tracking-widest text-gold uppercase">Varkala · Kerala</span>
            </div>

            {/* 2-column image collage with matching balanced heights */}
            <div className="relative grid grid-cols-2 gap-3.5">

              {/* Tall left image */}
              <div className="relative rounded-3xl overflow-hidden shadow-luxury border-2 border-gold/20 group h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px]">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/50 via-transparent to-transparent z-10" />
                <img
                  src={varkalaBeach}
                  alt="Varkala Cliff Beach — serene healing location"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  loading="lazy"
                />
              </div>

              {/* Right column — two stacked cards */}
              <div className="flex flex-col gap-3.5 h-[380px] sm:h-[460px] md:h-[520px] lg:h-[560px]">
                <div className="relative rounded-3xl overflow-hidden shadow-luxury border-2 border-gold/20 group flex-1">
                  <img
                    src={therapy}
                    alt="Therapeutic wellness session"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 to-transparent" />
                </div>
                <div className="relative rounded-3xl overflow-hidden shadow-luxury border-2 border-gold/20 group flex-1">
                  <img
                    src={retreat}
                    alt="Wellness retreat in nature"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 to-transparent" />
                </div>
              </div>
            </div>

            {/* Floating Bottom Badge */}
            <div className="absolute -bottom-5 left-2 right-2 sm:left-6 sm:right-auto glass-dark rounded-2xl p-3.5 sm:px-6 sm:py-4 shadow-2xl border-2 border-gold/40 text-cream backdrop-blur-md z-20 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gold-gradient flex items-center justify-center text-emerald-deep font-bold shadow-gold shrink-0">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-emerald-deep text-emerald-deep" />
                </div>
                <div>
                  <div className="font-display text-base sm:text-xl font-bold text-gold-gradient leading-tight">Authentic Experience</div>
                  <div className="text-[0.58rem] sm:text-[0.68rem] tracking-[0.2em] sm:tracking-[0.25em] uppercase font-bold text-cream/90 mt-0.5">
                    Holistic Healing Sanctuary
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ---------------- Discover Our Services ---------------- */
function DiscoverServices() {
  const services = [
    {
      name: "Yoga",
      img: yogaClassesSlide,
      description:
        "Classical yoga practice — therapeutic asana, pranayama, and meditation guided by expert instructors in a serene coastal setting.",
      link: "/yoga" as const,
      linkLabel: "Explore Yoga",
      icon: Flower2,
    },
    {
      name: "Wellness Therapy",
      img: meditationSlide,
      description:
        "Holistic wellness therapies including naturopathy, clinical acupuncture, and restorative bodywork — personalised to restore vitality and harmony.",
      link: "/wellness-therapy" as const,
      linkLabel: "Explore Therapy",
      icon: Heart,
    },
    {
      name: "Yoga & Wellness Retreats",
      img: yogaWellnessRetreatImg,
      description:
        "Transformative retreat programmes in the cliff-side serenity of Varkala, blending healing yoga, therapeutic sessions, and nourishing meals.",
      link: "/retreats" as const,
      linkLabel: "Explore Retreats",
      icon: Mountain,
    },
    {
      name: "Massage Certificate Courses",
      img: thaiCourseImg,
      description:
        "Internationally recognised certification in Thai Yoga Massage, Ayurvedic Massage, and more — taught by experienced practitioners.",
      link: "/certificate-courses" as const,
      linkLabel: "Explore Courses",
      icon: GraduationCap,
    },
  ];

  return (
    <section className="relative pt-2 pb-10 sm:pb-14 bg-cream overflow-hidden">
      {/* Subtle ambient glows */}
      <div className="absolute top-0 left-0 w-[36rem] h-[36rem] bg-emerald/5 blur-[100px] rounded-full -translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-gold/6 blur-[90px] rounded-full translate-y-1/3 translate-x-1/4 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* ── Single outer rectangular container ── */}
        <div className="rounded-3xl border-2 border-gold/25 bg-white shadow-[0_16px_50px_rgba(8,18,13,0.08)] overflow-hidden">

          {/* ── Header bar inside the container ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-5 sm:px-8 py-5 sm:py-6 border-b border-gold/15 bg-gradient-to-r from-emerald-deep/[0.03] to-transparent">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-deep/5 border border-gold/30 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                <span className="font-serif-display text-[0.68rem] tracking-[0.25em] text-emerald-deep font-bold uppercase">
                  Featured Offerings
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-emerald-deep leading-tight">
                Discover Our{" "}
                <span className="text-gold-gradient">Services</span>
              </h2>
              <p className="mt-1 text-sm text-gray-600 font-medium">
                Holistic healing experiences tailored for your wellbeing.
              </p>
            </div>

            {/* Clickable Action Button → /services */}
            <Link
              to="/services"
              className="inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gold-gradient text-emerald-deep font-bold text-xs sm:text-sm tracking-[0.12em] uppercase shadow-gold hover:scale-105 transition-all duration-300 shrink-0"
            >
              Discover Our Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* ── 2 × 2 Cards Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gold/10">
            {services.map((svc) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={svc.name}
                  to={svc.link}
                  className="group flex flex-col sm:flex-row bg-white hover:bg-emerald-deep/[0.025] transition-colors duration-300 p-5 sm:p-6 gap-4 sm:gap-5 items-start"
                >
                  {/* Thumbnail */}
                  <div className="relative w-full sm:w-32 h-44 sm:h-32 rounded-2xl overflow-hidden shrink-0 border border-gold/20 shadow-md">
                    <img
                      src={svc.img}
                      alt={svc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/50 to-transparent" />
                    {/* Icon badge */}
                    <div className="absolute bottom-2 left-2 w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold border border-white/40">
                      <Icon className="w-3.5 h-3.5 text-emerald-deep" />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="flex flex-col flex-1 min-w-0 w-full">
                    <h3 className="font-display text-base sm:text-[1.05rem] font-bold text-emerald-deep mb-1.5 leading-snug group-hover:text-gold transition-colors duration-300">
                      {svc.name}
                    </h3>
                    <p className="text-gray-600 text-[0.8rem] leading-relaxed line-clamp-3 mb-3">
                      {svc.description}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[0.72rem] font-bold uppercase tracking-wider text-gold group-hover:gap-2.5 transition-all duration-300 mt-auto">
                      {svc.linkLabel}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */
function About() {
  const stats = [
    { n: "15+", l: "Years of Practice" },
    { n: "10K+", l: "Lives Transformed" },
    { n: "40+", l: "Retreats Hosted" },
    { n: "25+", l: "Countries Reached" },
  ];
  return (
    <section id="about" className="relative py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="absolute -inset-6 bg-gold-gradient opacity-20 blur-3xl rounded-full" />
          <img
            src={about}
            alt="Serene yoga studio"
            className="relative rounded-3xl shadow-luxury w-full h-[560px] object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-4 right-4 md:-bottom-8 md:-right-4 lg:-right-12 glass-dark rounded-2xl px-8 py-6 shadow-luxury text-cream">
            <div className="font-display text-4xl text-gold-gradient">15+</div>
            <div className="text-xs tracking-[0.25em] uppercase text-cream/70 mt-1">
              Years of Healing
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Flower2 className="w-4 h-4 text-gold" />
            <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">
              ABOUT THE CENTRE
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] text-emerald-deep leading-[1.15] tracking-tight text-balance">
            A sanctuary for{" "}
            <em className="font-display italic font-normal text-gold-gradient pr-1">
              authentic healing
            </em>{" "}
            and conscious transformation.
          </h2>
          <div className="gold-divider my-8" />
          <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
            Dr. Vikram Yoga & Wellness Centre is a holistic sanctuary devoted to the ancient
            sciences of Yoga, Naturopathy, and Ayurveda. We weave together time-honored Eastern
            wisdom with refined contemporary care to nurture the body, calm the mind, and awaken the
            spirit.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-[0.95rem]">
            From therapeutic yoga and pranayama to bespoke wellness retreats, every experience is
            curated for those seeking lasting balance, vitality, and inner clarity.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.l} className="text-center sm:text-left">
                <div className="font-display text-3xl text-emerald">{s.n}</div>
                <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mt-1">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Founder ---------------- */
function Founder() {
  return (
    <section className="relative py-28 bg-emerald-gradient text-cream overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-lotus/10 blur-3xl rounded-full translate-y-1/3 -translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-5 gap-14 items-center">
        <div className="lg:col-span-2 relative h-full flex flex-col justify-center">
          <div className="relative rounded-3xl overflow-hidden shadow-luxury max-w-md mx-auto aspect-[3/4] lg:h-[80vh]">
            <img
              src={founder}
              alt="Dr. S. Vikram Pandy"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-display text-3xl md:text-4xl drop-shadow-md">
                Dr. S. Vikram Pandy
              </div>
              <div className="text-[0.8rem] md:text-[0.85rem] tracking-[0.2em] font-medium uppercase text-gold mt-2 drop-shadow-md">
                Founder &middot; Yoga Therapist
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-5">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">
              MEET THE FOUNDER
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
            A lifelong devotion to{" "}
            <em className="text-gold-gradient not-italic">holistic healing</em>.
          </h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-cream/80 leading-relaxed">
            Dr. S. Vikram Pandy is a celebrated yoga therapist, naturopath, and wellness mentor
            whose practice spans more than a decade of dedicated study across India and beyond. His
            approach blends classical yogic disciplines — asana, pranayama, and meditation — with
            naturopathic protocols and therapeutic bodywork.
          </p>
          <p className="mt-4 text-cream/80 leading-relaxed">
            Under his guidance, the centre has become a trusted destination for seekers,
            professionals, and wellness enthusiasts seeking authentic healing, refined experience,
            and measurable transformation.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {["Yoga Therapy", "Naturopathy", "Pranayama", "Meditation", "Retreat Curation"].map(
              (t) => (
                <span
                  key={t}
                  className="px-4 py-2 rounded-full glass text-xs tracking-[0.15em] uppercase text-cream/90"
                >
                  {t}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- The Origins of Yoga ---------------- */
function OriginsOfYoga() {
  const eightLimbs = [
    "Yama",
    "Niyama",
    "Asana",
    "Pranayama",
    "Pratyahara",
    "Dharana",
    "Dhyana",
    "Samadhi",
  ];

  return (
    <section className="relative py-10 sm:py-16 bg-[#fbf2e9] text-[#072c1c] overflow-hidden">
      {/* Background ambient warm glows */}
      <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-[#f5d9be]/40 blur-[110px] rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-[#edd0b5]/50 blur-[100px] rounded-full pointer-events-none translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-2.5">
            <Flower2 className="w-4 h-4 text-[#a06d1c] shrink-0" />
            <span className="font-serif-display text-xs md:text-sm tracking-[0.4em] text-[#a06d1c] font-bold uppercase">
              THE ORIGINS OF YOGA
            </span>
            <Flower2 className="w-4 h-4 text-[#a06d1c] shrink-0" />
          </div>
          <h2 className="font-display text-2xl md:text-4xl text-[#072c1c] font-bold leading-tight text-balance">
            Lord Shiva &bull; Sage Patanjali
            <span className="inline md:hidden"> &bull;</span>{" "}
            <br className="hidden md:block" />
            <em className="text-[#a06d1c] not-italic">The Timeless Wisdom of Yoga</em>
          </h2>
          <div className="h-0.5 w-16 mx-auto mt-4 bg-gradient-to-r from-transparent via-[#a06d1c]/60 to-transparent" />
        </div>

        {/* Content Cards Layout: 2 side-by-side balanced cards (Left: Image, Right: Content) */}
        <div className="grid lg:grid-cols-2 gap-6 xl:gap-8 items-stretch">
          {/* ── Card 1: Lord Shiva ── */}
          <div className="rounded-3xl p-5 md:p-6 bg-[#082618] border-2 border-[#0e442b] shadow-[0_14px_40px_rgba(8,38,24,0.18)] flex flex-col justify-between relative group hover:shadow-[0_18px_48px_rgba(8,38,24,0.26)] transition-all duration-300">
            <div className="grid sm:grid-cols-12 gap-5 items-center h-full">
              {/* Left: Lord Shiva Image */}
              <div className="sm:col-span-5 relative rounded-2xl overflow-hidden shadow-md border-2 border-[#134d31]/60 aspect-[4/5] sm:h-full max-h-[290px]">
                <img
                  src={lordShivaImg}
                  alt="Lord Shiva — Adiyogi, the First Yogi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051c11]/85 via-transparent to-transparent z-10" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <span className="px-2.5 py-1 rounded-full bg-[#051a10]/95 text-[0.62rem] tracking-[0.2em] uppercase text-[#e9be65] border border-[#e9be65]/40 font-bold backdrop-blur-md block text-center shadow-sm">
                    Adiyogi &middot; First Yogi
                  </span>
                </div>
              </div>

              {/* Right: Lord Shiva Content */}
              <div className="sm:col-span-7 space-y-3.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#e9be65] shrink-0" />
                  <h3 className="font-display text-base md:text-lg text-cream font-bold leading-snug">
                    Lord Shiva — <em className="text-[#e9be65] not-italic font-bold">Adiyogi, the First Yogi</em>
                  </h3>
                </div>

                <p className="text-[#f2ebe2] text-xs md:text-[0.84rem] font-semibold leading-relaxed">
                  In the yogic tradition, Lord Shiva is revered as{" "}
                  <strong className="text-[#e9be65] font-bold">Adiyogi — the First Yogi</strong>,
                  representing the origin of yogic knowledge and inner transformation. Ancient
                  traditions describe Adiyogi as the source of profound teachings on the body,
                  breath, consciousness, meditation, and spiritual awakening.
                </p>

                {/* Highlighted Key Insight Box */}
                <div className="p-3.5 rounded-2xl bg-[#faeee2] border border-[#d4af37]/40 shadow-sm text-[#072c1c] text-[0.8rem] md:text-[0.83rem] font-semibold italic leading-relaxed">
                  Yoga is therefore understood not merely as physical exercise, but as a journey
                  toward{" "}
                  <strong className="text-[#9e6b15] not-italic font-bold">
                    self-awareness, inner balance, harmony, and union
                  </strong>
                  .
                </div>
              </div>
            </div>
          </div>

          {/* ── Card 2: Sage Patanjali ── */}
          <div className="rounded-3xl p-5 md:p-6 bg-[#082618] border-2 border-[#0e442b] shadow-[0_14px_40px_rgba(8,38,24,0.18)] flex flex-col justify-between relative group hover:shadow-[0_18px_48px_rgba(8,38,24,0.26)] transition-all duration-300">
            <div className="grid sm:grid-cols-12 gap-5 items-center h-full">
              {/* Left: Sage Patanjali Image */}
              <div className="sm:col-span-5 relative rounded-2xl overflow-hidden shadow-md border-2 border-[#134d31]/60 aspect-[4/5] sm:h-full max-h-[290px]">
                <img
                  src={sagePatanjaliImg}
                  alt="Sage Patanjali — The Father of Classical Yoga"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#051c11]/85 via-transparent to-transparent z-10" />
                <div className="absolute bottom-3 left-3 right-3 z-20">
                  <span className="px-2.5 py-1 rounded-full bg-[#051a10]/95 text-[0.62rem] tracking-[0.2em] uppercase text-[#e9be65] border border-[#e9be65]/40 font-bold backdrop-blur-md block text-center shadow-sm">
                    Maharishi Patanjali
                  </span>
                </div>
              </div>

              {/* Right: Sage Patanjali Content */}
              <div className="sm:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#e9be65] shrink-0" />
                  <h3 className="font-display text-base md:text-lg text-cream font-bold leading-snug">
                    Sage Patanjali — <em className="text-[#e9be65] not-italic font-bold">Father of Classical Yoga</em>
                  </h3>
                </div>

                <p className="text-[#f2ebe2] text-xs md:text-[0.83rem] font-semibold leading-relaxed">
                  Sage Patanjali is widely regarded as the{" "}
                  <strong className="text-[#e9be65] font-bold">Father of Classical Yoga</strong> for
                  systematically presenting the philosophical foundations and practices of yoga
                  through the <em className="italic font-serif text-cream font-bold">Yoga Sutras of Patanjali</em>.
                  The Yoga Sutras provide a structured path for understanding the nature of the mind
                  and cultivating inner discipline, awareness, and liberation.
                </p>

                {/* Eight Limbs Highlighted Card */}
                <div className="p-3.5 rounded-2xl bg-[#faeee2] border border-[#d4af37]/40 shadow-sm space-y-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#9e6b15] text-xs font-bold">☯</span>
                    <h4 className="font-display text-[0.74rem] text-[#072c1c] font-bold uppercase tracking-wider">
                      Patanjali’s Eight Limbs of Yoga (Ashtanga Yoga) include:
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {eightLimbs.map((limb) => (
                      <span
                        key={limb}
                        className="px-2.5 py-0.5 rounded-full bg-[#fceddc] border border-[#0b3823]/30 text-[0.63rem] font-serif-display tracking-wider text-[#072c1c] font-bold uppercase hover:bg-[#ebd0b6] hover:border-[#9e6b15] transition-colors"
                      >
                        {limb}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[#f2ebe2]/90 text-[0.76rem] md:text-[0.79rem] font-semibold leading-relaxed">
                  These principles continue to provide a timeless foundation for authentic yoga
                  practice and mindful living.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Us ---------------- */
function WhyUs() {
  const items = [
    {
      icon: Heart,
      t: "Holistic Approach",
      d: "Integrating yoga, naturopathy, wellness therapies, and rehabilitation support.",
    },
    {
      icon: Leaf,
      t: "Personalized Programs",
      d: "Personalized wellness programs tailored to individual needs and goals.",
    },
    {
      icon: GraduationCap,
      t: "Master Guidance",
      d: "Internationally recognized yoga teacher and therapeutic wellness consultant.",
    },
    {
      icon: Sparkles,
      t: "Authentic & Modern",
      d: "Authentic yoga practices combined with modern therapeutic wellness methods.",
    },
    {
      icon: Globe,
      t: "Peaceful Environment",
      d: "Peaceful healing environment in Varkala, Kerala, India.",
    },
    {
      icon: Hand,
      t: "Integrative Support",
      d: "Integrative wellness support for mobility, relaxation, posture correction, and recovery.",
    },
    {
      icon: Sun,
      t: "Mind-Body Balance",
      d: "Yoga, meditation, pranayama, and mindful movement for complete balance.",
    },
    {
      icon: Wind,
      t: "Natural Wellness",
      d: "Therapeutic bodywork and natural wellness approaches for long-term well-being.",
    },
    {
      icon: Mountain,
      t: "Transformative Retreats",
      d: "Transformative wellness retreats designed for healing, relaxation, and self-discovery.",
    },
    {
      icon: Heart,
      t: "Professional Care",
      d: "Professional, compassionate, and wellness-focused guidance.",
    },
  ];
  return (
    <section className="relative py-10 sm:py-14 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">
              WHY CHOOSE US
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">
              A Personalized Approach to{" "}
              <em className="text-black not-italic">Holistic Healing & Wellness</em>
            </h2>
            <div className="gold-divider mt-5 mx-auto" />
          </div>
          <div className="mt-5 space-y-3 text-muted-foreground leading-relaxed text-[0.98rem] text-center md:text-justify">
            <p>
              At Dr. Vikram Yoga & Wellness Centre, we believe wellness is not a one-size-fits-all
              journey. Every individual is unique, and our approach is designed to provide
              personalized guidance, therapeutic support, and holistic healing experiences that
              nurture the body, mind, emotions, and overall lifestyle.
            </p>
            <p>
              By integrating traditional yogic wisdom with modern therapeutic wellness practices, we
              create a balanced and compassionate healing environment focused on long-term
              well-being, mindful living, and natural transformation.
            </p>
          </div>
        </div>
        <div className="mt-8 sm:mt-10 grid md:grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-10 max-w-5xl mx-auto">
          {items.map(({ icon: Icon, t, d }, idx) => (
            <div key={t} className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-1">
                <Icon className="w-5 h-5 text-gold" />
              </div>
              <div>
                <h3 className="font-display text-2xl text-emerald-deep">{t}</h3>
                <p className="mt-2 text-base text-muted-foreground leading-relaxed">{d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Led by Dr. Vikram Pandya ---------------- */
function LedByDoctor() {
  return (
    <section className="py-4 sm:py-6 bg-cream relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <Link
          to="/about"
          className="block p-5 sm:p-6 rounded-3xl bg-white border-2 border-gold/40 shadow-[0_12px_35px_rgba(8,18,13,0.08)] hover:shadow-luxury hover:border-gold hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
        >
          {/* Subtle gold luxury background gradient wash on hover */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gold/10 rounded-full blur-2xl pointer-events-none group-hover:bg-gold/15 transition-colors" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
            {/* Dr. Vikram's Portrait Photo — Centered Face & Shoulder Framing */}
            <div className="relative shrink-0 self-center sm:self-auto">
              <div className="w-24 h-28 sm:w-28 sm:h-32 rounded-2xl overflow-hidden border-2 border-gold/60 shadow-md ring-4 ring-gold/15 group-hover:ring-gold/30 transition-all bg-emerald-deep/5">
                <img
                  src={founder}
                  alt="Dr. S. Vikram Pandy — Founder & Director"
                  className="w-full h-full object-cover object-[50%_24%] group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              {/* Verified / Crest mini badge */}
              <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold border-2 border-white">
                <Sparkles className="w-3.5 h-3.5 text-emerald-deep" />
              </div>
            </div>

            {/* Content for Dr. Vikram */}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <h4 className="font-display text-xl sm:text-2xl font-bold text-gold group-hover:text-gold transition-colors">
                  Dr. S. Vikram Pandy
                </h4>
                {/* Integrated "About Dr. Vikram" link replacing the standalone arrow */}
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-deep/5 group-hover:bg-gold-gradient text-emerald-deep group-hover:text-emerald-deep border border-emerald-deep/15 group-hover:border-gold/40 text-xs font-serif-display font-bold tracking-wider uppercase transition-all duration-300 shadow-sm shrink-0">
                  About Dr. Vikram
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>

              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 font-serif flex flex-wrap items-center gap-2">
                <span className="text-[#9a7024]">Founder &amp; Director</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-[#9a7024]">Lead Trainer</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" />
                <span className="text-[#112e22] font-extrabold tracking-wide">BNYS., M.D.(ACU)., E-RYT.</span>
              </p>

              <p className="text-sm sm:text-[0.95rem] font-semibold leading-relaxed text-emerald-deep mb-3">
                Internationally recognized Naturopathy &amp; Yoga Physician integrating authentic yoga therapy, clinical acupuncture, restorative pranayama, and holistic wellness protocols.
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {["Yoga Therapy", "Naturopathy", "Acupuncture", "Holistic Wellness"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-emerald-deep/5 border border-emerald-deep/15 text-emerald-deep font-bold text-[0.72rem] tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

/* ---------------- Additional Offerings ---------------- */
function AdditionalOfferings() {
  return (
    <section className="pb-10 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#f7f5ed] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-[#ede8dd]">

          {/* Decorative Leaves */}
          <div className="absolute -left-8 -bottom-4 w-32 h-32 opacity-10 pointer-events-none text-emerald-deep transform -rotate-12">
            <Leaf className="w-full h-full" strokeWidth={1} />
          </div>
          <div className="absolute -right-8 -bottom-4 w-32 h-32 opacity-10 pointer-events-none text-emerald-deep transform rotate-12 scale-x-[-1]">
            <Leaf className="w-full h-full" strokeWidth={1} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            {/* Left Card: Short Workshops */}
            <div className="flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-emerald-deep flex items-center justify-center shrink-0 bg-white shadow-sm">
                  <Users className="w-6 h-6 md:w-8 md:h-8 text-emerald-deep" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <p className="text-emerald-deep font-serif text-sm mb-1 leading-tight">In addition to our certification courses,</p>
                  <h3 className="font-display text-3xl md:text-4xl text-emerald-deep font-bold leading-tight">Short Workshops</h3>
                  <p className="text-emerald-deep font-serif text-sm mt-1.5 leading-tight">are also available on booking.</p>
                </div>
              </div>
              <p className="text-stone-600 text-[0.95rem] leading-relaxed mb-8 mt-2 max-w-sm lg:ml-20">
                These focused workshops are designed to give you practical knowledge and hands-on experience in specific topics related to yoga, wellness and holistic therapies.
              </p>
              <div className="mt-auto lg:ml-20">
                <Link to="/certificate-courses" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-emerald-deep text-emerald-deep font-semibold text-sm tracking-wide hover:bg-emerald-deep hover:text-cream transition-colors">
                  View Workshop Topics <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Divider for desktop */}
            <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-[#ede8dd] -translate-x-1/2" />
            <div className="lg:hidden w-full h-px bg-[#ede8dd] my-2" />

            {/* Right Card: Massage Courses */}
            <div className="flex flex-col lg:pl-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-emerald-deep flex items-center justify-center shrink-0 bg-white shadow-sm">
                  <Calendar className="w-6 h-6 md:w-8 md:h-8 text-emerald-deep" strokeWidth={1.5} />
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-[1.45rem] md:text-3xl leading-[1.2] text-emerald-deep font-bold mb-2">
                    One-to-One &amp; Group Sessions<br className="hidden md:block" /> for Massage Courses
                  </h3>
                </div>
              </div>
              <p className="text-stone-600 text-[0.95rem] leading-relaxed mb-8 mt-2 max-w-[400px] lg:ml-20">
                We offer personalized one-to-one sessions as well as group sessions for all massage therapy courses, available on booking with flexible schedules to suit your needs.
              </p>
              <div className="mt-auto lg:ml-20">
                <Link to="/services" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-emerald-deep text-emerald-deep font-semibold text-sm tracking-wide hover:bg-emerald-deep hover:text-cream transition-colors">
                  Book Your Session <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Feature Row */}
        <div className="mt-8 bg-[#f7f5ed] rounded-2xl py-6 px-4 md:px-10 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-[#ede8dd]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-0">

            <Link to="/apply" className="flex items-center gap-3 md:gap-4 flex-1 justify-center w-full md:w-auto text-left md:text-center group hover:scale-105 transition-all cursor-pointer">
              <Flower2 className="w-7 h-7 text-emerald-deep shrink-0 group-hover:rotate-12 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-[0.95rem] leading-tight group-hover:text-gold transition-colors">Flexible<br className="hidden md:block" /> Scheduling</span>
            </Link>

            <div className="hidden md:block w-px h-10 bg-[#ede8dd] mx-2 lg:mx-4" />
            <div className="md:hidden w-full h-px bg-[#ede8dd]" />

            <Link to="/services" className="flex items-center gap-3 md:gap-4 flex-1 justify-center w-full md:w-auto text-left md:text-center group hover:scale-105 transition-all cursor-pointer">
              <User className="w-7 h-7 text-emerald-deep shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-[0.95rem] leading-tight group-hover:text-gold transition-colors">One-to-One<br className="hidden md:block" /> Guidance</span>
            </Link>

            <div className="hidden md:block w-px h-10 bg-[#ede8dd] mx-2 lg:mx-4" />
            <div className="md:hidden w-full h-px bg-[#ede8dd]" />

            <Link to="/yoga" className="flex items-center gap-3 md:gap-4 flex-1 justify-center w-full md:w-auto text-left md:text-center group hover:scale-105 transition-all cursor-pointer">
              <Users className="w-7 h-7 text-emerald-deep shrink-0 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-[0.95rem] leading-tight group-hover:text-gold transition-colors">Group Sessions<br className="hidden md:block" /> Available</span>
            </Link>

            <div className="hidden md:block w-px h-10 bg-[#ede8dd] mx-2 lg:mx-4" />
            <div className="md:hidden w-full h-px bg-[#ede8dd]" />

            <Link to="/certificate-courses" className="flex items-center gap-3 md:gap-4 flex-1 justify-center w-full md:w-auto text-left md:text-center group hover:scale-105 transition-all cursor-pointer">
              <Calendar className="w-7 h-7 text-emerald-deep shrink-0 group-hover:-translate-y-0.5 transition-transform duration-300" strokeWidth={1.5} />
              <span className="font-serif font-semibold text-emerald-deep text-[0.95rem] leading-tight group-hover:text-gold transition-colors">Short Workshops<br className="hidden md:block" /> on Booking</span>
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Classes ---------------- */
function Classes() {
  const list = [
    {
      t: "Hatha Yoga",
      d: "A traditional and foundational style focused on classical postures, breath awareness, flexibility, and strength.",
      time: "08:00 AM - 09:30 AM • 04:30 PM - 06:00 PM",
      img: gImg2,
    },
    {
      t: "Hatha Flow",
      d: "Traditional postures with smooth and mindful transitions between movements.",
      time: "10:00 AM - 11:00 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: gImg3,
    },
    {
      t: "Vinyasa Flow",
      d: "A dynamic and energizing style that synchronizes movement with breath.",
      time: "10:00 AM - 11:00 AM • 04:30 PM - 05:30 PM (On Booking)",
      img: gImg4,
    },
    {
      t: "Yin Yoga",
      d: "Slow and meditative style focused on deep stretching, relaxation, and inner stillness.",
      time: "04:30 PM - 05:30 PM (On Booking)",
      img: gImg5,
    },
    {
      t: "Pranayama & Meditation",
      d: "Guided breathing and meditation practices designed to calm the nervous system.",
      time: "06:30 AM - 07:30 AM (On Booking) • Beach Sessions Available",
      img: gImg10,
    },
    {
      t: "Therapeutic Sessions",
      d: "Personalized sessions tailored to posture correction, mobility, and stress management.",
      time: "Available on Prior Appointment",
      img: gImg7,
    },
  ];
  return (
    <section
      id="classes"
      className="relative min-h-screen flex items-center py-28 bg-emerald-gradient text-cream overflow-hidden"
    >
      <img
        src={yogaLifestyle}
        alt="Yoga lifestyle classes background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/60 to-emerald-deep/90" />
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">
            YOGA CLASSES
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">
            Practices for every <em className="text-gold-gradient not-italic">body &amp; breath</em>
            .
          </h2>
          <div className="gold-divider mt-8 mx-auto" />
          <p className="mt-6 text-cream/70 leading-relaxed text-sm">
            From dynamic Vinyasa to deeply restorative therapy sessions, our classes meet you
            exactly where you are. Each session honours alignment, breath, and intention — guiding
            you toward sustainable wellbeing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c, i) => (
            <div
              key={c.t}
              className="group glass rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={c.img}
                  alt={c.t}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-emerald-deep/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl text-cream">{c.t}</h3>
                  <p className="mt-3 text-sm text-cream/70 leading-relaxed">{c.d}</p>
                </div>
                <div className="mt-6 pt-5 border-t border-cream/10 flex flex-col gap-3">
                  <span className="text-[0.8rem] sm:text-sm tracking-[0.12em] text-cream font-bold uppercase">
                    {c.time}
                  </span>
                  <a
                    href={`/apply?category=Yoga-Classes&course=${encodeURIComponent(c.t)}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-[1.01] shadow-soft"
                  >
                    <span>Book Now</span>
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

/* ---------------- Therapies ---------------- */
function Therapies() {
  const items = [
    {
      icon: Hand,
      t: "Thai Yoga Massage",
      d: "Assisted stretching and rhythmic compressions for flexibility and energy flow.",
    },
    {
      icon: Wind,
      t: "Shiatsu Therapy",
      d: "Traditional Japanese pressure-point therapy along the body’s energy pathways.",
    },
    {
      icon: Mountain,
      t: "Deep Tissue Therapy",
      d: "Focused treatment to release chronic muscular tension and fascial restrictions.",
    },
    {
      icon: Leaf,
      t: "Ayurvedic Wellness Massage",
      d: "Traditional therapy utilizing herbal oils to support circulation and rejuvenation.",
    },
    {
      icon: Flower2,
      t: "Swedish Massage",
      d: "Gentle and relaxing full-body massage with smooth flowing strokes.",
    },
    {
      icon: Sun,
      t: "Reflexology Therapy",
      d: "Pressure-point therapy on hands and feet to harmonize body systems.",
    },
  ];
  return (
    <section id="therapies" className="min-h-screen flex items-center py-16 md:py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-end mb-10 lg:mb-14">
          <div className="lg:col-span-2">
            <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">
              MASSAGE & WELLNESS THERAPIES
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance leading-tight">
              Therapeutic touch,{" "}
              <em className="text-gold-gradient not-italic">refined into ritual</em>.
            </h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Each treatment is delivered by certified therapists in serene private rooms, combining
            classical techniques with our signature standard of care.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 shadow-soft hover:shadow-luxury transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors" />
              <Icon className="w-9 h-9 text-emerald relative" strokeWidth={1.4} />
              <h3 className="mt-6 font-display text-2xl text-emerald-deep">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              <a
                href={`/apply?category=Wellness-Therapies&course=${encodeURIComponent(t)}`}
                className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-emerald hover:text-gold transition-colors"
              >
                Book Session <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-16 relative rounded-3xl overflow-hidden h-72">
          <img
            src={healingAtmosphere}
            alt="Therapy ritual"
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/90 via-emerald-deep/50 to-transparent" />
          <div className="relative h-full flex items-center px-10 lg:px-16 text-cream max-w-2xl">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">
                Crafted treatments for body & soul.
              </h3>
              <a
                href="/apply?category=Wellness-Therapies"
                className="mt-6 inline-flex px-6 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold"
              >
                Book a Therapy
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Retreats ---------------- */
function Retreats() {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <section
      id="retreats"
      className="relative min-h-screen flex items-center py-32 text-cream overflow-hidden"
    >
      <img
        src={retreatBanner}
        alt="Wellness retreat"
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep via-emerald-deep/80 to-emerald-deep/30" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">
            WELLNESS RETREATS
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-balance leading-[1.05]">
            Step away. <em className="text-gold-gradient not-italic">Come home</em> to yourself.
          </h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-cream/80 leading-relaxed max-w-lg">
            Immersive 3, 7, and 14-day retreats in nature — combining daily yoga, naturopathy,
            ayurvedic cuisine, and silent practice. Designed for deep reset and lasting
            transformation.
          </p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-6 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold hover:text-white transition-colors group"
          >
            {showDetails ? "Hide Details" : "To know more about Retreats"}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ${showDetails ? "max-h-[500px] opacity-100 mt-8" : "max-h-0 opacity-0"}`}
          >
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { t: "7 & 14 Days", d: "Holistic Wellness" },
                { t: "Meditation", d: "Soulful Retreat" },
                { t: "Couples", d: "Shared Retreat" },
              ].map((r) => (
                <div key={r.t} className="glass rounded-2xl p-6 text-center">
                  <div className="font-display text-2xl text-gold">{r.t}</div>
                  <div className="text-[0.65rem] tracking-[0.3em] uppercase text-cream/70 mt-1">
                    {r.d}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/apply?category=Retreat-Programs"
            className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold transform hover:scale-105 transition-all"
          >
            Reserve Your Retreat <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Courses ---------------- */
function Courses() {
  const [showDetails, setShowDetails] = useState(false);
  const items = [
    {
      t: "100 Hour Yoga Teacher Training In Kerala",
      prices: ["Shared Room: € 699", "Private Room: € 1099"],
      days: "15 Days",
      level: "Beginner Level",
      roomTypes: "2 Shared, Private Room",
      img: training100h,
    },
    {
      t: "200 Hour Yoga Teacher Training In Kerala",
      prices: ["Shared Room: € 849", "Private Room: € 1099"],
      days: "21 Days",
      level: "Beginner Level",
      roomTypes: "2 Shared, Private Room",
      img: training200hStd,
    },
    {
      t: "200 Hour Yoga Teacher Training In Kerala",
      prices: ["Luxury Private Room: € 1500"],
      days: "21 Days",
      level: "Beginner Level",
      roomTypes: "2 Shared, Private Room",
      img: training200hLux,
    },
    {
      t: "300 Hour Yoga Teacher Training In Kerala",
      prices: ["Shared Room: € 1049", "Private Room: € 1399"],
      days: "28 Days",
      level: "Advance Level",
      roomTypes: "2 Shared, Private Room",
      img: training300h,
    },
  ];

  return (
    <section id="courses" className="min-h-screen flex items-center py-20 bg-[#FDF5EC]">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div className="text-center mb-10">
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">
            CERTIFICATION COURSES
          </span>
          <h2 className="mt-4 font-display text-4xl text-emerald-deep">Become a guide.</h2>
          <div className="gold-divider mt-4 mx-auto" />
        </div>

        <div className="mb-10 text-sm md:text-base text-gray-800 leading-relaxed text-center max-w-2xl mx-auto">
          <p>
            Currently at Dr. Vikram Yoga & Wellness Centre we offer 100 hour, 200 hour, and 300 hour
            Yoga Teacher Training programs as a curriculum for our students.
          </p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 flex items-center justify-center gap-2 mx-auto text-xs font-semibold tracking-[0.2em] uppercase text-emerald hover:text-gold transition-colors"
          >
            {showDetails ? "Hide Additional Info" : "Additional Details of Courses"}
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-700 ${showDetails ? "max-h-[2500px] opacity-100" : "max-h-0 opacity-0 invisible"}`}
        >
          <div className="space-y-6 flex flex-col md:w-11/12 mx-auto">
            {items.map((c, i) => (
              <div
                key={i}
                className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group"
              >
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[1.35rem] font-bold text-gray-800 mb-4">{c.t}</h3>
                    <hr className="border-gray-200 mb-6" />
                    <div className="flex flex-wrap gap-2 mb-6">
                      {c.prices.map((p, idx) => (
                        <span
                          key={idx}
                          className="bg-[#596057] text-white text-[0.6rem] md:text-xs font-medium px-3 md:px-4 py-2 shrink-0 rounded-md"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1.5 text-sm text-gray-800">
                      <p>
                        <strong>Days:</strong> {c.days}
                      </p>
                      <p>
                        <strong>Level:</strong> {c.level}
                      </p>
                      <p>
                        <strong>Room Types:</strong> {c.roomTypes}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <a
                      href="/apply"
                      className="block w-full text-center bg-[#E57624] hover:bg-[#D56B1E] text-white py-3 rounded-md text-sm font-semibold transition-colors"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
                <div className="md:w-72 lg:w-[22rem] h-64 md:h-auto relative shrink-0">
                  <img
                    src={c.img}
                    alt={c.t}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="/apply?category=Certification-Courses"
            className="px-7 py-3 bg-[#596057] text-white text-sm font-semibold hover:bg-opacity-90 transition-colors"
          >
            Register Course With Us
          </a>
          <a
            href="/apply?category=Certification-Courses"
            className="px-7 py-3 bg-[#E57624] text-white text-sm font-semibold hover:bg-opacity-90 transition-colors"
          >
            Have A Query For Us?
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits (Commented Out) ----------------
function Benefits() {
  const categories = [
    {
      title: "Physical Wellness",
      items: [
        "Improved flexibility & mobility",
        "Better posture & body alignment",
        "Enhanced strength, balance & coordination",
        "Muscular relaxation & recovery support",
        "Increased body awareness",
        "Improved circulation & movement efficiency",
        "Relaxation and physical rejuvenation",
        "Natural support for overall well-being & vitality",
      ],
    },
    {
      title: "Mental Wellness",
      items: [
        "Reduced stress & mental fatigue",
        "Improved concentration & focus",
        "Mental calmness & emotional clarity",
        "Better sleep quality & relaxation",
        "Improved mindfulness & self-awareness",
        "Enhanced emotional balance",
        "Relaxation of the nervous system",
        "Greater inner peace & mental well-being",
      ],
    },
    {
      title: "Emotional & Spiritual Well-Being",
      items: [
        "Emotional balance & relaxation",
        "Increased self-awareness & mindfulness",
        "Deeper mind-body connection",
        "Inner harmony & confidence",
        "Supportive healing environment",
        "Greater sense of calmness & clarity",
        "Enhanced connection with holistic living practices",
        "Space for personal growth & inner transformation",
      ],
    },
  ];
  return (
    <section className="py-28 bg-emerald-deep text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.12),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">
            BENEFITS OF WELLNESS PROGRAMS
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">
            The quiet power of{" "}
            <em className="text-gold-gradient not-italic">consistent practice</em>.
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div
              key={cat.title}
              className="glass rounded-3xl p-8 shadow-soft border border-cream/10"
            >
              <h3 className="font-display text-2xl text-cream mb-6">{cat.title}</h3>
              <ul className="space-y-4">
                {cat.items.map((b) => (
                  <li key={b} className="flex items-start gap-4">
                    <span className="text-[0.9rem] shrink-0 leading-none text-gold">☯</span>
                    <span className="text-cream/90 text-sm leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
----------------------------------------------------------- */

/* ---------------- Online Sessions ---------------- */
function OnlineSessions() {
  return (
    <section id="online" className="py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative rounded-[2rem] overflow-hidden bg-emerald-gradient text-cream p-10 md:p-16 shadow-luxury">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold/15 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-lotus/10 blur-3xl rounded-full translate-y-1/3" />
          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">
                ONLINE YOGA CLASSES
              </span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">
                Practice anywhere,{" "}
                <em className="text-gold-gradient not-italic">guided personally</em>.
              </h2>
              <p className="mt-6 text-cream/80 leading-relaxed">
                Live and on-demand sessions delivered globally — from foundational classes to
                advanced therapeutic practice, all from the comfort of your home.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/apply?category=Yoga-Classes"
                  className="px-7 py-3.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold"
                >
                  Join Live Class
                </a>
                <a
                  href="/apply?category=Yoga-Classes"
                  className="px-7 py-3.5 rounded-full glass text-cream text-xs font-semibold tracking-[0.2em] uppercase"
                >
                  Watch Library
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl glass flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold animate-glow">
                  <Play className="w-7 h-7 text-emerald-deep ml-1" fill="currentColor" />
                </button>
              </div>
              <div className="mt-4 text-center text-[0.7rem] tracking-[0.3em] uppercase text-cream/60">
                Watch the experience
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Visit Local Areas Section ---------------- */
interface LocalArea {
  id: string;
  name: string;
  category: "beaches" | "heritage" | "nature";
  categoryLabel: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  direction: string;
  arrowVector: string;
  bearing: string;
  distance: string;
  travelTimes: {
    walk: string;
    bike: string;
    car: string;
  };
  highlights: string[];
  bestTime: string;
  mapsUrl: string;
}

function VisitLocalAreas() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<LocalArea | null>(null);

  const localAreas: LocalArea[] = [
    {
      id: "varkala-beach",
      name: "Varkala Beach (Papanasam Beach)",
      category: "beaches",
      categoryLabel: "Beach & Cliff",
      image: varkalaBeachCardImg,
      shortDesc: "Famous for dramatic red laterite cliffs bordering the Arabian Sea and natural mineral springs believed to wash away sins.",
      fullDesc: "Varkala Beach (also known as Papanasam Beach) is world-famous for its striking red cliffs dropping into golden sands. The mineral-rich water streams flowing from the cliffs are believed to possess natural curative and therapeutic properties, making it an ideal post-yoga retreat spot.",
      direction: "South-West",
      arrowVector: "↙",
      bearing: "Cliff Walk Route (South-West)",
      distance: "450 m",
      travelTimes: {
        walk: "5 - 6 mins",
        bike: "2 mins",
        car: "3 mins",
      },
      highlights: ["Sunset cliff panoramas", "Natural mineral spring dip", "Cliffside artisan markets & organic cafes"],
      bestTime: "Early Morning (Sunrise) & Golden Hour Sunset",
      mapsUrl: "https://www.google.com/maps/dir/Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141/Varkala+Beach,+Kerala",
    },
    {
      id: "janardhana-temple",
      name: "Janardhana Swamy Temple",
      category: "heritage",
      categoryLabel: "Sacred Heritage",
      image: templeImg,
      shortDesc: "A 2,000-year-old historic Vishnu temple nestled amongst coconut palm groves, often called the Varanasi of the South.",
      fullDesc: "Steeped in ancient spiritual energy, the Janardhana Swamy Temple stands atop a small hill overlooking the sea. It features classical Kerala architectural craftsmanship, ancient banyan tree shrines, and a tranquil spiritual atmosphere for quiet reflection.",
      direction: "South-East",
      arrowVector: "↘",
      bearing: "Temple Road Route (South-East)",
      distance: "2.3 km",
      travelTimes: {
        walk: "25 mins",
        bike: "6 mins",
        car: "8 mins",
      },
      highlights: ["2,000-year spiritual heritage", "Traditional Kerala temple art", "Ancient sacred banyan tree shrine"],
      bestTime: "6:00 AM - 11:00 AM & 5:00 PM - 8:00 PM",
      mapsUrl: "https://www.google.com/maps/dir/Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141/Janardhana+Swamy+Temple,+Varkala,+Kerala",
    },
    {
      id: "odayam-beach",
      name: "Odayam Beach & Black Sand Shore",
      category: "beaches",
      categoryLabel: "Peaceful Coast",
      image: retreat,
      shortDesc: "A quiet, pristine stretch of coast north of Varkala Cliff with subtle black sand patches, ideal for meditation and peaceful sea walks.",
      fullDesc: "Located just north of the main cliff, Odayam Beach offers a calm sanctuary where you can hear the rhythmic ocean waves without crowds. It is perfect for morning pranayama, seaside meditation, and tranquil sunset walks.",
      direction: "North-West",
      arrowVector: "↗",
      bearing: "Odayam Coastal Route (North-West)",
      distance: "1.4 km",
      travelTimes: {
        walk: "16 mins",
        bike: "4 mins",
        car: "5 mins",
      },
      highlights: ["Untouched calm coastline", "Natural black sand patches", "Ideal for morning yoga & meditation"],
      bestTime: "Sunrise & Peaceful Morning Hours",
      mapsUrl: "https://www.google.com/maps/dir/Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141/Odayam+Beach,+Varkala,+Kerala",
    },
    {
      id: "kappil-backwaters",
      name: "Kappil Beach & Backwaters",
      category: "nature",
      categoryLabel: "Scenic Backwaters",
      image: varkalaBeach,
      shortDesc: "A breathtaking coastal estuary where serene backwaters merge into the roaring Arabian Sea along a scenic coastal road.",
      fullDesc: "Kappil is one of Kerala's most picturesque coastal spots where the tranquil Edava-Nadayara backwater lagoon directly meets the Arabian Sea. Enjoy paddle boating, serene backwater kayaking, or a coastal ride along coconut groves.",
      direction: "North",
      arrowVector: "⬆️",
      bearing: "Edava-Kappil Road (North)",
      distance: "7.2 km",
      travelTimes: {
        walk: "1 hr 25 mins",
        bike: "14 mins",
        car: "16 mins",
      },
      highlights: ["Lagoon & sea convergence", "Backwater boating & kayaking", "Scenic coastal palm drive"],
      bestTime: "Late Afternoon & Sunset",
      mapsUrl: "https://www.google.com/maps/dir/Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141/Kappil+Beach+and+Backwaters,+Kerala",
    },
    {
      id: "sivagiri-mutt",
      name: "Sivagiri Mutt & Ashram",
      category: "heritage",
      categoryLabel: "Spiritual Ashram",
      image: sivagiriMuttImg,
      shortDesc: "The revered ashram and samadhi of social reformer Sree Narayana Guru, embodying harmony, enlightenment, and universal peace.",
      fullDesc: "Spread across 93 acres of tranquil hilltop greens, Sivagiri Mutt is a holy shrine and pilgrimage center dedicated to Sree Narayana Guru. The serene atmosphere is deeply inspiring for spiritual reflection, mindfulness, and quiet contemplation.",
      direction: "East",
      arrowVector: "➡️",
      bearing: "Station Road Route (East)",
      distance: "4.1 km",
      travelTimes: {
        walk: "48 mins",
        bike: "10 mins",
        car: "12 mins",
      },
      highlights: ["Sree Narayana Guru Samadhi shrine", "Lush 93-acre ashram grounds", "Spiritual wisdom & meditation halls"],
      bestTime: "Morning & Afternoon (8:00 AM - 6:00 PM)",
      mapsUrl: "https://www.google.com/maps/dir/Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141/Sivagiri+Mutt,+Varkala,+Kerala",
    },
    {
      id: "anjengo-fort",
      name: "Anjengo Fort & Historic Lighthouse",
      category: "nature",
      categoryLabel: "Historic Fort",
      image: anjengoFortImg,
      shortDesc: "A 17th-century coastal fortress with a tall historic lighthouse offering panoramic ocean views and rich heritage stories.",
      fullDesc: "Built by the English East India Company in 1695, Anjengo Fort (Anchuthengu) sits between lush coconut groves and the sea. Climb the 130-foot lighthouse for spectacular panoramic vistas of the southern Kerala shoreline.",
      direction: "South",
      arrowVector: "⬇️",
      bearing: "Coastal Highway (South)",
      distance: "11.5 km",
      travelTimes: {
        walk: "2 hrs 15 mins",
        bike: "22 mins",
        car: "25 mins",
      },
      highlights: ["1695 East India Company stone fort", "130-ft historic lighthouse climb", "360-degree ocean & backwater panorama"],
      bestTime: "3:00 PM - 5:30 PM (Lighthouse open hours)",
      mapsUrl: "https://www.google.com/maps/dir/Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141/Anjengo+Fort,+Anchuthengu,+Kerala",
    },
  ];

  const filteredAreas =
    activeTab === "all"
      ? localAreas
      : localAreas.filter((item) => item.category === activeTab);

  return (
    <section className="py-10 sm:py-14 bg-gradient-to-b from-cream via-cream/80 to-cream relative overflow-hidden">
      {/* Decorative subtle background accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-emerald/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/20 mb-4 shadow-xs">
            <Compass className="w-4 h-4 text-emerald animate-spin-slow" />
            <span className="font-serif-display text-xs font-bold tracking-[0.2em] text-emerald uppercase">
              Varkala Local Guide
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-deep mb-4 leading-tight">
            Visit Local Areas
          </h2>

          <p className="text-emerald-deep/75 text-base sm:text-lg font-sans leading-relaxed">
            Explore breathtaking beaches, sacred ancient temples, and tranquil backwaters located just minutes around{" "}
            <strong className="font-semibold text-emerald">Dr. Vikram Yoga & Wellness Centre</strong>.
          </p>

          {/* Route Origin Callout Banner */}
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/90 border border-gold/30 shadow-md backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center justify-center shrink-0 shadow-xs">
                <MapPin className="w-5 h-5 text-emerald" />
              </div>
              <div>
                <span className="text-[0.7rem] font-bold tracking-widest text-gold uppercase block">
                  Route Origin & Centre Location
                </span>
                <h4 className="font-semibold text-emerald-deep text-sm sm:text-base">
                  Dr. Vikram Yoga & Wellness Centre
                </h4>
                <p className="text-xs text-emerald-deep/60">
                  N Cliff Rd, Varkala, Kerala 695141 — Distances based on actual map navigation
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald bg-emerald/5 px-3 py-1.5 rounded-lg border border-emerald/15 shrink-0">
              <Navigation className="w-3.5 h-3.5" />
              <span>Real Road Routes</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: "all", label: "All Attractions" },
            { id: "beaches", label: "Beaches & Coast" },
            { id: "heritage", label: "Heritage & Temples" },
            { id: "nature", label: "Nature & Backwaters" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${activeTab === tab.id
                  ? "bg-emerald text-cream shadow-md scale-105"
                  : "bg-white/80 text-emerald-deep/70 hover:bg-emerald/10 hover:text-emerald border border-emerald/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAreas.map((area) => (
            <div
              key={area.id}
              className="group bg-white rounded-3xl overflow-hidden border border-emerald/10 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-emerald-deep/10">
                <img
                  src={area.image}
                  alt={area.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-emerald-deep/20 to-transparent opacity-80" />

                {/* Top Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[0.7rem] font-bold uppercase tracking-wider bg-white/95 text-emerald-deep shadow-md backdrop-blur-xs">
                    {area.categoryLabel}
                  </span>
                </div>

                {/* Direction & Bearing Chip */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[0.75rem] font-bold bg-emerald-deep/90 text-gold border border-gold/40 shadow-lg backdrop-blur-xs">
                    <span className="text-base leading-none">{area.arrowVector}</span>
                    <span>{area.distance}</span>
                    <span className="text-[0.65rem] opacity-80 font-normal">({area.direction})</span>
                  </div>
                </div>

                {/* Image Overlay Title */}
                <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
                  <h3 className="font-serif text-xl font-bold leading-snug drop-shadow-md">
                    {area.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-5 bg-gradient-to-b from-white to-cream/30">
                {/* 2-line Short Description */}
                <p className="text-emerald-deep/80 text-sm leading-relaxed line-clamp-2 font-sans min-h-[2.5rem]">
                  {area.shortDesc}
                </p>

                {/* Visual Directional Connection Element */}
                <div className="py-2.5 px-3.5 rounded-xl bg-emerald/5 border border-emerald/15 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald font-semibold truncate">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-gold" />
                    <span className="truncate">Dr. Vikram Yoga Centre</span>
                  </div>

                  {/* Animated Arrow Connector */}
                  <div className="flex items-center gap-1 shrink-0 text-gold px-2">
                    <span className="w-6 h-[1.5px] bg-gold/50 relative flex items-center justify-center">
                      <span className="absolute w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
                    </span>
                    <span className="text-sm font-bold">{area.arrowVector}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-emerald-deep font-semibold truncate">
                    <span className="truncate">{area.name.split(" ")[0]}</span>
                    <span className="text-[0.7rem] px-1.5 py-0.5 rounded bg-gold/20 text-emerald font-bold">
                      {area.distance}
                    </span>
                  </div>
                </div>

                {/* Exact Distance & Travel Time Options */}
                <div className="space-y-2 pt-1">
                  <div className="text-[0.7rem] font-bold tracking-widest text-emerald/60 uppercase flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-gold" />
                    <span>Map Travel Routes</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    {/* Walking */}
                    <div className="p-2.5 rounded-xl bg-white border border-emerald/10 flex flex-col items-center justify-center text-center shadow-2xs hover:border-gold/50 transition-colors">
                      <div className="text-lg mb-0.5">🚶</div>
                      <span className="text-[0.65rem] font-bold text-emerald/70 uppercase tracking-tight">
                        Walking
                      </span>
                      <span className="text-xs font-bold text-emerald-deep mt-0.5">
                        {area.travelTimes.walk}
                      </span>
                    </div>

                    {/* Two-Wheeler */}
                    <div className="p-2.5 rounded-xl bg-white border border-emerald/10 flex flex-col items-center justify-center text-center shadow-2xs hover:border-gold/50 transition-colors">
                      <div className="text-lg mb-0.5">🏍️</div>
                      <span className="text-[0.65rem] font-bold text-emerald/70 uppercase tracking-tight">
                        2-Wheeler
                      </span>
                      <span className="text-xs font-bold text-emerald-deep mt-0.5">
                        {area.travelTimes.bike}
                      </span>
                    </div>

                    {/* Car */}
                    <div className="p-2.5 rounded-xl bg-white border border-emerald/10 flex flex-col items-center justify-center text-center shadow-2xs hover:border-gold/50 transition-colors">
                      <div className="text-lg mb-0.5">🚗</div>
                      <span className="text-[0.65rem] font-bold text-emerald/70 uppercase tracking-tight">
                        Car Drive
                      </span>
                      <span className="text-xs font-bold text-emerald-deep mt-0.5">
                        {area.travelTimes.car}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedArea(area)}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald/10 hover:bg-emerald text-emerald hover:text-cream text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 border border-emerald/20"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Quick Details</span>
                  </button>

                  <a
                    href={area.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-emerald text-cream hover:bg-emerald-deep text-xs font-bold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                  >
                    <Navigation className="w-3.5 h-3.5 text-gold" />
                    <span>Get Route ↗</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Attraction Details Modal */}
      {selectedArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-deep/75 backdrop-blur-md animate-fade-in">
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-gold/30 relative flex flex-col max-h-[90vh] animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] overflow-hidden bg-emerald-deep">
              <img
                src={selectedArea.image}
                alt={selectedArea.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-emerald-deep/40 to-transparent" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedArea(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-emerald-deep/80 text-cream hover:bg-gold hover:text-emerald-deep flex items-center justify-center transition-colors z-20 shadow-lg border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Title Banner */}
              <div className="absolute bottom-4 left-6 right-6 z-10 text-white">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/90 text-emerald-deep text-[0.7rem] font-bold uppercase tracking-wider mb-2">
                  <span>{selectedArea.arrowVector} {selectedArea.distance}</span>
                  <span>•</span>
                  <span>{selectedArea.categoryLabel}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                  {selectedArea.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Full Description */}
              <div>
                <h4 className="text-xs font-bold tracking-widest text-gold uppercase mb-2">
                  About This Attraction
                </h4>
                <p className="text-emerald-deep/85 text-sm sm:text-base leading-relaxed">
                  {selectedArea.fullDesc}
                </p>
              </div>

              {/* Highlights */}
              <div>
                <h4 className="text-xs font-bold tracking-widest text-gold uppercase mb-3">
                  Attraction Highlights
                </h4>
                <div className="space-y-2">
                  {selectedArea.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-emerald-deep">
                      <CheckCircle2 className="w-4 h-4 text-emerald shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Time & Route Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-cream border border-emerald/10">
                <div>
                  <span className="text-[0.7rem] font-bold tracking-wider text-emerald/70 uppercase block mb-1">
                    Best Time to Visit
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-deep">
                    {selectedArea.bestTime}
                  </p>
                </div>
                <div>
                  <span className="text-[0.7rem] font-bold tracking-wider text-emerald/70 uppercase block mb-1">
                    Direction & Bearing
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-emerald-deep">
                    {selectedArea.bearing}
                  </p>
                </div>
              </div>

              {/* Map Travel Speed Grid */}
              <div>
                <h4 className="text-xs font-bold tracking-widest text-gold uppercase mb-3">
                  Travel Time from Centre ({selectedArea.distance})
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-emerald/5 border border-emerald/15 text-center">
                    <div className="text-xl mb-1">🚶</div>
                    <div className="text-[0.7rem] text-emerald/70 font-semibold uppercase">Walking</div>
                    <div className="text-sm font-bold text-emerald-deep">{selectedArea.travelTimes.walk}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald/5 border border-emerald/15 text-center">
                    <div className="text-xl mb-1">🏍️</div>
                    <div className="text-[0.7rem] text-emerald/70 font-semibold uppercase">Two-Wheeler</div>
                    <div className="text-sm font-bold text-emerald-deep">{selectedArea.travelTimes.bike}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald/5 border border-emerald/15 text-center">
                    <div className="text-xl mb-1">🚗</div>
                    <div className="text-[0.7rem] text-emerald/70 font-semibold uppercase">Car Drive</div>
                    <div className="text-sm font-bold text-emerald-deep">{selectedArea.travelTimes.car}</div>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-emerald/10">
                <button
                  onClick={() => setSelectedArea(null)}
                  className="px-5 py-2.5 rounded-xl border border-emerald/20 text-emerald-deep hover:bg-emerald/5 text-xs font-bold transition-colors"
                >
                  Close
                </button>
                <a
                  href={selectedArea.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-xl bg-emerald text-cream hover:bg-emerald-deep text-xs font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-gold" />
                  <span>Open Route in Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(getApiUrl("testimonials.php"));
        if (response.ok) {
          const res = await response.json();
          // Map seed image path to local import asset variables
          const mapped = res.map((t: any) => {
            let img = t.image;
            if (t.image?.includes("avatar_lea") || t.image?.includes("532882118f2edf384a4cc863")) {
              img = avatarLea;
            } else if (t.image?.includes("avatar_patrick") || t.image?.includes("e5448211bcd6ac613aec8e4f")) {
              img = avatarPatrick;
            } else if (t.image?.includes("avatar_sarah") || t.image?.includes("cbc48208b85635741587e067")) {
              img = avatarSarah;
            } else if (t.image?.includes("avatar_michael") || t.image?.includes("d85882119458c3c9987ceaec")) {
              img = avatarMichael;
            }
            return { ...t, img };
          });
          setList(mapped);
        }
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const defaultTestimonials = [
    {
      id: "test-1",
      name: "Lea Kolbe",
      rating: 5,
      role: "Yoga Student",
      message:
        "Magical place and amazing teacher! I'm staying with Dr. Vikram several days now enjoying morning meditations, yoga, treatments and even started to learn shiatsu. He is a very good teacher with many skills and a lot of experience. I highly recommend his school for Yoga. Go there, meet him and improve your mind and body. And when you get the chance stay there for lunch - even the cook is amazing.",
      img: avatarLea,
    },
    {
      id: "test-2",
      name: "Patrick Woods",
      rating: 5,
      role: "Therapist Client",
      message:
        "The wellness center is the place to find peace of mind and relax for the soul. The classes with the ocean sound are fantastic. Dr. Vikram is a great professional. I had a great experience. Highly recommended!",
      img: avatarPatrick,
    },
    {
      id: "test-3",
      name: "Sarah Jenkins",
      rating: 5,
      role: "Yoga Practitioner",
      message:
        "An incredibly peaceful and healing experience. The yoga sessions helped me feel physically stronger and mentally calmer. The therapeutic practices provided deep healing and relaxation.",
      img: avatarSarah,
    },
    {
      id: "test-4",
      name: "Michael Chen",
      rating: 5,
      role: "Retreat Guest",
      message:
        "The retreat environment was beautiful, relaxing, and deeply transformative. Professional guidance, therapeutic wellness practices, and a very supportive atmosphere for growth.",
      img: avatarMichael,
    },
  ];

  const displayList = list.length > 0 ? list : defaultTestimonials;

  const getMaxIndex = () => {
    if (displayList.length === 0) return 0;
    return typeof window !== "undefined" && window.innerWidth >= 768 ? displayList.length - 2 : displayList.length - 1;
  };

  const handlePrev = () => setActiveIndex((p) => (p <= 0 ? getMaxIndex() : p - 1));
  const handleNext = () => setActiveIndex((p) => (p >= getMaxIndex() ? 0 : p + 1));

  useEffect(() => {
    if (displayList.length === 0) return;
    const t = setInterval(() => {
      setActiveIndex((p) => (p >= getMaxIndex() ? 0 : p + 1));
    }, 6000);
    return () => clearInterval(t);
  }, [displayList.length]);

  if (loading && list.length === 0) {
    return (
      <section className="relative py-16 md:py-24 bg-cream flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-deep"></div>
      </section>
    );
  }

  if (displayList.length === 0) return null;

  return (
    <section
      id="testimonials"
      className="relative flex flex-col justify-center py-10 sm:py-14 overflow-hidden bg-cream"
    >
      <img
        src={testimonialBg}
        alt="Serene Background"
        className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply"
        loading="lazy"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-6 px-2">
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">
            TESTIMONIALS
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-emerald-deep leading-tight text-balance">
            Words from our <em className="text-gold-gradient not-italic">community</em>
          </h2>
          <div className="gold-divider mt-4 mx-auto" />
        </div>

        {/* Slider with side arrows */}
        <div className="relative">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-emerald/20 shadow-soft flex items-center justify-center text-emerald-deep hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="overflow-hidden testimonials-slider pb-4 w-full">
            <style>{`
              .testimonials-slider { --t-width: 100%; }
              @media (min-width: 768px) { .testimonials-slider { --t-width: 50%; } }
            `}</style>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(calc(-${activeIndex} * var(--t-width)))` }}
            >
              {displayList.map((t, idx) => (
                <div key={idx} className="w-full md:w-1/2 flex-shrink-0 px-4 md:px-6 py-2">
                  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft hover:shadow-luxury transition-shadow duration-500 h-full flex flex-col items-center text-center relative border border-gold/10">
                    <div className="absolute top-6 text-gold/10">
                      <Quote size={60} strokeWidth={0.5} className="mx-auto" />
                    </div>
                    {t.img ? (
                      <img
                        src={resolveImageUrl(t.img)}
                        alt={t.name}
                        className="w-16 h-16 rounded-full object-cover mt-2 mb-3 shadow-sm border-2 border-cream relative z-10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23f1f5f9'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%2394a3b8' font-size='24' font-family='sans-serif'%3EY%3C/text%3E%3C/svg%3E";
                        }}
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-[#0c1c14] text-gold font-bold flex items-center justify-center text-xl mt-2 mb-3 shadow-sm border-2 border-cream relative z-10">
                        {t.name.substring(0, 1).toUpperCase()}
                      </div>
                    )}
                    <h3 className="text-lg font-display text-emerald-deep mb-1 relative z-10 font-semibold">
                      {t.name}
                    </h3>
                    {t.role && (
                      <span className="text-[0.65rem] tracking-[0.2em] uppercase text-gold/80 mb-2 relative z-10 block font-medium">
                        {t.role}
                      </span>
                    )}
                    <div className="flex gap-1 mb-4 relative z-10">
                      {[...Array(t.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-serif-display italic flex-grow relative z-10">
                      "{t.message}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-emerald/20 shadow-soft flex items-center justify-center text-emerald-deep hover:bg-gold hover:text-white hover:border-gold transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {displayList.map((_, idx) => {
            const isDesktop = typeof window !== "undefined" && window.innerWidth >= 768;
            if (isDesktop && idx > displayList.length - 2) return null;
            return (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${idx === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-emerald/30 hover:bg-emerald/50"}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQ() {
  const items = [
    {
      q: "Do I need prior yoga experience?",
      a: "Not at all. Our classes are crafted for every level — from absolute beginners to seasoned practitioners. Each session is adapted to meet you where you are.",
    },
    {
      q: "What is included in a wellness retreat?",
      a: "Daily yoga and meditation, naturopathic consultations, ayurvedic cuisine, therapeutic treatments, and serene accommodation in nature.",
    },
    {
      q: "Are online sessions interactive?",
      a: "Yes — live classes include real-time guidance, alignment cues, and Q&A. On-demand sessions are available in our member library.",
    },
    {
      q: "How do I begin a wellness consultation?",
      a: "Reach out via the contact form or WhatsApp. We'll arrange a discovery call to understand your goals and recommend the right path.",
    },
    {
      q: "Are certification courses internationally recognized?",
      a: "Yes. Our teacher training and therapy programs are aligned with global yoga alliance standards.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="min-h-screen flex items-center py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">
            FREQUENTLY ASKED
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">
            Questions, <em className="text-gold-gradient not-italic">answered</em>.
          </h2>
        </div>
        <div className="space-y-4">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div
                key={it.q}
                className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-display text-lg md:text-xl text-emerald-deep">{it.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">
                      {it.a}
                    </p>
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

/* ---------------- Gallery ---------------- */
function Gallery() {
  const imgs = [gImg1, gImg2, gImg3, gImg4, gImg5, gImg6];
  return (
    <section className="py-28 bg-emerald-deep text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">
            GALLERY
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">
            Moments from the <em className="text-gold-gradient not-italic">sanctuary</em>.
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imgs.map((src, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group ${i === 0 || i === 4 ? "h-[20rem] md:row-span-2 md:h-[34rem]" : "h-64"}`}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Social Feed ---------------- */
function SocialFeed() {
  const [images, setImages] = useState<any[]>([]);

  useEffect(() => {
    fetch(getApiUrl("social-images.php"))
      .then((res) => res.json())
      .then((res) => {
        setImages(res || []);
      })
      .catch((err) => {
        console.error("Error loading social images:", err);
      });
  }, []);

  const displayImages =
    images.length > 0
      ? images
      : [
        { image: instaNew1, social_media_url: "#" },
        { image: instaNew2, social_media_url: "#" },
        { image: instaNew3, social_media_url: "#" },
        { image: about, social_media_url: "#" },
        { image: instaNew5, social_media_url: "#" },
        { image: founder, social_media_url: "#" },
        { image: instaNew7, social_media_url: "#" },
        { image: instaNew8, social_media_url: "#" },
      ];

  return (
    <section className="py-8 sm:py-12 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">
              @DRVIKRAM.WELLNESS
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance leading-tight">
              Follow the <em className="text-gold-gradient not-italic">journey</em> on Instagram.
            </h2>
          </div>
          <a
            href="https://www.instagram.com/dr.vikram_yoga_wellness?stkn=MTQ0YnhucG94cXJ1Nw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald hover:text-gold transition-colors text-xs tracking-[0.2em] uppercase"
          >
            <Instagram className="w-4 h-4" /> View Feed
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {displayImages.map((item, i) => (
            <a
              key={item.id || i}
              href={item.social_media_url || "https://www.instagram.com/dr.vikram_yoga_wellness?stkn=MTQ0YnhucG94cXJ1Nw=="}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-xl group block"
            >
              <img
                src={resolveImageUrl(item.image)}
                alt={`Instagram ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' fill='%23f1f5f9'%3E%3Crect width='400' height='400'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%2394a3b8' font-size='14' font-family='sans-serif'%3EImage not found%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute inset-0 bg-emerald-deep/0 group-hover:bg-emerald-deep/60 transition-colors flex items-center justify-center">
                <Instagram className="w-6 h-6 text-cream opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact (homepage quick-contact) ---------------- */
function ContactSection() {
  return (
    <section id="contact" className="py-28 bg-emerald-gradient text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
        <div>
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">
            CONTACT
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">
            Begin your <em className="text-gold-gradient not-italic">transformation</em>.
          </h2>
          <p className="mt-6 text-cream/80 leading-relaxed max-w-md">
            Reach out for class enrollment, retreat reservations, or a personal wellness
            consultation. We respond within 24 hours.
          </p>
          <div className="mt-10 space-y-5">
            {[
              { i: Phone, l: "+91 8778639989" },
              { i: Mail, l: "drvikramyogawellness@gmail.com" },
              {
                i: MapPin,
                l: "Dr. Vikram Yoga & Wellness Centre, N Cliff Rd, Varkala, Kerala 695141",
                href: "https://maps.google.com/?q=Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141",
              },
            ].map(({ i: Icon, l, href }) => (
              <div key={l} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full glass flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/90 hover:text-gold transition-colors"
                  >
                    {l}
                  </a>
                ) : (
                  <span className="text-cream/90">{l}</span>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex gap-3">
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
                className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors"
              >
                <Icon className="w-4 h-4 text-gold" />
              </a>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="glass rounded-3xl p-8 md:p-10 space-y-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" type="text" />
            <Field label="Email Address" type="email" />
          </div>
          <Field label="Phone" type="tel" />
          <div>
            <label className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70">
              Interest
            </label>
            <select className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-gold focus:outline-none">
              {[
                "Yoga Classes",
                "Wellness Therapy",
                "Retreat",
                "Certification Course",
                "Online Sessions",
                "Consultation",
              ].map((o) => (
                <option key={o} className="bg-emerald-deep">
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70">
              Message
            </label>
            <textarea
              rows={4}
              className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-gold focus:outline-none resize-none"
            />
          </div>
          <button className="w-full px-7 py-4 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.25em] uppercase shadow-gold hover:scale-[1.02] transition-transform">
            Send Enquiry
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({ label, type }: { label: string; type: string }) {
  return (
    <div>
      <label className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70">{label}</label>
      <input
        type={type}
        className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
      />
    </div>
  );
}

/* Footer and WhatsAppFloat are now the shared components from ./about */
