import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Leaf,
  GraduationCap,
  MapPin,
  BedDouble,
} from "lucide-react";

import { Navbar, Footer, WhatsAppFloat } from "./about";
import { getApiUrl, resolveImageUrl } from "@/lib/utils";

// ── Hero & Banner Assets ──────────────────────────────────────────────────────
import galleryHeroImg from "@/assets/beach_sunset_varkala.jpg";
import varkalaSunsetSea from "@/assets/varkala_sunset_sea.jpg";
import dewyLeaf from "@/assets/cta_dewy_leaf.jpg";

// ── Category 1: Our Centre ────────────────────────────────────────────────────
import centre1 from "@/assets/New/file_00000000e2f48208b353a09b8451f839.png";
import centre2 from "@/assets/New/file_00000000e22081fa8bafa1253752641e.png";
import centre3 from "@/assets/New/file_000000007e508211bf31b2012c7739be.png";
import centre4 from "@/assets/New/file_0000000027c0820b9a5711022d613771.png";
import centre5 from "@/assets/New/file_00000000dfcc82119d61541189667cd6.png";
import centre6 from "@/assets/New/file_000000001188820791659018f9dd9303.png";

// ── Category 2: Yoga & Wellness ───────────────────────────────────────────────
import yoga1 from "@/assets/New/IMG_20250516_171414.jpg.jpeg";
import yoga2 from "@/assets/New/IMG_20250516_171813.jpg.jpeg";
import yoga3 from "@/assets/New/IMG_20250516_171957.jpg.jpeg";
import yoga4 from "@/assets/New/IMG_20250517_083145.jpg.jpeg";
import yoga5 from "@/assets/New/IMG_20250517_084451.jpg.jpeg";
import yoga6 from "@/assets/New/IMG_20250520_082653.jpg.jpeg";
import yoga7 from "@/assets/New/IMG_20250520_083011.jpg.jpeg";
import yoga8 from "@/assets/New/IMG_20250520_083632.jpg.jpeg";
import yoga9 from "@/assets/New/IMG_20250520_092421.jpg.jpeg";
import yoga10 from "@/assets/New/IMG_20250520_124838.jpg.jpeg";
import yoga11 from "@/assets/New/IMG_20250520_130020.jpg.jpeg";

// ── Category 3: Wellness & Therapies ──────────────────────────────────────────
import therapy1 from "@/assets/images/Traditional Ayurvedic Massage.jpeg";
import therapy2 from "@/assets/images/acupuncture.jpeg";
import therapy3 from "@/assets/images/ayurvedic.jpg";
import therapy4 from "@/assets/images/cupping.jpg";
import therapy5 from "@/assets/images/deep-tissue.jpeg";
import therapy6 from "@/assets/images/dorn-therapy.jpg";
import therapy7 from "@/assets/images/shiatsu.jpeg";
import therapy8 from "@/assets/images/reflexology.jpg";
import therapy9 from "@/assets/images/swedish-massage.jpeg";
import therapy10 from "@/assets/images/thai-massage.jpeg";
import therapy11 from "@/assets/images/extra-gallery-1.jpeg";
import therapy12 from "@/assets/images/extra-gallery-2.jpeg";
import therapy13 from "@/assets/images/extra-gallery-3.jpeg";
import therapy14 from "@/assets/images/extra-gallery-5.jpeg";
import therapy15 from "@/assets/images/extra-gallery-6.jpeg";

// ── Category 4: Accommodation ────────────────────────────────────────────────
import acRoom1 from "@/assets/retreat.jpg";
import acRoom2 from "@/assets/about_hero_veranda.jpg";

// Deluxe Non-AC Room (24 authentic photos from Assets -> New)
// @ts-ignore
import nonAc1 from "@/assets/New/unnamed (1).webp";
// @ts-ignore
import nonAc5 from "@/assets/New/unnamed (5).webp";
// @ts-ignore
import nonAc6 from "@/assets/New/unnamed (6).webp";
// @ts-ignore
import nonAc7 from "@/assets/New/unnamed (7).webp";
// @ts-ignore
import nonAc8 from "@/assets/New/unnamed (8).webp";
// @ts-ignore
import nonAc9 from "@/assets/New/unnamed (9).webp";
// @ts-ignore
import nonAc10 from "@/assets/New/unnamed (10).webp";
// @ts-ignore
import nonAc11 from "@/assets/New/unnamed (11).webp";
// @ts-ignore
import nonAc12 from "@/assets/New/unnamed (12).webp";
// @ts-ignore
import nonAc13 from "@/assets/New/unnamed (13).webp";
// @ts-ignore
import nonAc14 from "@/assets/New/unnamed (14).webp";
// @ts-ignore
import nonAc15 from "@/assets/New/unnamed (15).webp";
// @ts-ignore
import nonAc17 from "@/assets/New/unnamed (17).webp";
// @ts-ignore
import nonAc18 from "@/assets/New/unnamed (18).webp";
// @ts-ignore
import nonAc20 from "@/assets/New/unnamed (20).webp";
// @ts-ignore
import nonAc21 from "@/assets/New/unnamed (21).webp";
// @ts-ignore
import nonAc22 from "@/assets/New/unnamed (22).webp";
// @ts-ignore
import nonAc23 from "@/assets/New/unnamed (23).webp";
// @ts-ignore
import nonAc24 from "@/assets/New/unnamed (24).webp";
// @ts-ignore
import nonAc25 from "@/assets/New/unnamed (25).webp";
// @ts-ignore
import nonAc26 from "@/assets/New/unnamed (26).webp";
// @ts-ignore
import nonAc28 from "@/assets/New/unnamed (28).webp";
// @ts-ignore
import nonAc29 from "@/assets/New/unnamed (29).webp";
// @ts-ignore
import nonAcMain from "@/assets/New/unnamed.webp";

// ── Category 5: Certifications & Training ─────────────────────────────────────
import cert1 from "@/assets/training_100h.png";
import cert2 from "@/assets/training_200h_std.png";
import cert3 from "@/assets/training_200h_lux.png";
import cert4 from "@/assets/training_300h.png";
import cert5 from "@/assets/dr_chandra_kumar.jpg";
import cert6 from "@/assets/classes.jpg";
import cert7 from "@/assets/leader.jpeg";
import cert8 from "@/assets/founder.png";

// ── Category 6: Local Experiences & Excursions ────────────────────────────────
import local1 from "@/assets/varkala_beach.png";
import local2 from "@/assets/temple_1.png";
import local3 from "@/assets/temple_2.png";
import local4 from "@/assets/retreat.jpg";
import local5 from "@/assets/retreat_banner.png";
import local6 from "@/assets/hero.jpg";
import local7 from "@/assets/about.png";
import local8 from "@/assets/healing_atmosphere.png";
import local9 from "@/assets/classes.jpg";
import local10 from "@/assets/cta_dewy_leaf.jpg";

// ── Types ─────────────────────────────────────────────────────────────────────

export type GalleryPhoto = {
  image: string;
  name?: string;
  id?: string;
  category?: string;
  created_at?: string;
};

type LightboxState = {
  images: GalleryPhoto[];
  currentIndex: number;
  title: string;
} | null;

// ── Custom Yoga Icon (Padmasana / Meditation) ─────────────────────────────────

function YogaIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="4.5" r="2.2" />
      <path d="M12 9v5.5" />
      <path d="M7.5 12l4.5-2.5 4.5 2.5" />
      <path d="M4 19.5c1.5-2.5 4-4 8-4s6.5 1.5 8 4" />
      <path d="M5.5 16.5L3 19.5" />
      <path d="M18.5 16.5L21 19.5" />
    </svg>
  );
}

// ── Route ─────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Moments of healing, learning and transformation at Dr. Vikram Yoga & Wellness Centre in Varkala.",
      },
    ],
  }),
});

// ── Page Component ────────────────────────────────────────────────────────────

function GalleryPage() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [dynamicImages, setDynamicImages] = useState<GalleryPhoto[]>([]);

  useEffect(() => {
    let isMounted = true;
    const fetchImages = async () => {
      try {
        const endpoints = [
          getApiUrl("gallery-images.php"),
          "/api/gallery-images.php",
          "/Vikram%20Yoga/emerald-serenity-hub/api/gallery-images.php",
        ];

        for (const ep of endpoints) {
          try {
            const response = await fetch(ep);
            const contentType = response.headers.get("content-type") || "";
            if (response.ok && contentType.includes("application/json")) {
              const res = await response.json();
              if (Array.isArray(res) && isMounted) {
                setDynamicImages(res);
                return;
              }
            }
          } catch {}
        }
      } catch (err) {
        console.error("Failed to load dynamic gallery images", err);
      }
    };
    fetchImages();
    return () => {
      isMounted = false;
    };
  }, []);

  const openLightbox = useCallback(
    (images: (GalleryPhoto | string)[], currentIndex: number, title: string) => {
      const normalized: GalleryPhoto[] = images.map((img) =>
        typeof img === "string" ? { image: img, name: "" } : img
      );
      setLightbox({ images: normalized, currentIndex, title });
      document.body.style.overflow = "hidden";
    },
    []
  );

  const closeLightbox = useCallback(() => {
    setLightbox(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setLightbox((prev) =>
      prev
        ? { ...prev, currentIndex: (prev.currentIndex + 1) % prev.images.length }
        : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setLightbox((prev) =>
      prev
        ? {
            ...prev,
            currentIndex:
              (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
          }
        : null
    );
  }, []);

  const navigateTo = useCallback((index: number) => {
    setLightbox((prev) => (prev ? { ...prev, currentIndex: index } : null));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!lightbox) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, closeLightbox, goNext, goPrev]);

  return (
    <main className="overflow-x-hidden bg-[#f6f5f0] text-stone-900 font-sans">
      <Navbar />

      {/* Hero Banner matching the template */}
      <GalleryHero />

      {/* 6 Category Cards Grid */}
      <GallerySection openLightbox={openLightbox} dynamicImages={dynamicImages} />

      {/* Bottom Banner matching the template */}
      <GalleryJourneyBanner />

      <Footer />
      <WhatsAppFloat />

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          currentIndex={lightbox.currentIndex}
          title={lightbox.title}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
          onNavigate={navigateTo}
        />
      )}
    </main>
  );
}

// ── 1. Hero Banner ────────────────────────────────────────────────────────────

function GalleryHero() {
  return (
    <section className="relative w-full overflow-hidden border-b border-stone-200/60">
      {/* Background Image: Scenic Varkala sea / veranda sunset */}
      <img
        src={galleryHeroImg}
        alt="Gallery Hero"
        className="absolute inset-0 w-full h-full object-cover brightness-105 saturate-110 object-center md:object-right"
      />

      {/* Dark emerald gradient overlay matching Our Services */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-emerald-deep/75 via-emerald-deep/40 to-emerald-deep/20 md:bg-gradient-to-r md:from-emerald-deep/70 md:via-emerald-deep/40 md:to-transparent"
      />

      {/* Decorative Palm Frond branch on top-left */}
      <div className="absolute -top-6 -left-6 w-36 h-36 md:w-56 md:h-56 pointer-events-none opacity-10 text-white">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-current">
          <path d="M10 10 C 60 40, 110 90, 160 170" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <path d="M40 30 C 5 50, 0 80, 2 110" stroke="currentColor" strokeWidth="2" />
          <path d="M60 45 C 25 70, 20 105, 25 140" stroke="currentColor" strokeWidth="2" />
          <path d="M85 65 C 55 95, 50 130, 60 165" stroke="currentColor" strokeWidth="2" />
          <path d="M110 90 C 85 125, 85 160, 100 185" stroke="currentColor" strokeWidth="2" />
          <path d="M50 35 C 75 25, 110 30, 140 45" stroke="currentColor" strokeWidth="2" />
          <path d="M75 55 C 105 45, 140 55, 170 75" stroke="currentColor" strokeWidth="2" />
          <path d="M105 80 C 135 75, 170 90, 195 120" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-16 md:pb-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 z-10">
        {/* Left text block */}
        <div className="max-w-xl">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-[3.25rem] text-cream tracking-tight leading-none uppercase drop-shadow-sm">
            OUR GALLERY
          </h1>
          <p className="mt-2.5 font-serif text-lg sm:text-2xl text-cream/95 font-medium leading-snug drop-shadow-sm">
            Moments of Healing, Learning and<br className="hidden sm:inline" /> Transformation
          </p>
          <p className="mt-3 text-cream/80 text-sm sm:text-base leading-relaxed max-w-lg font-medium drop-shadow-sm">
            A glimpse into our centre, our practices, our people and the beautiful surroundings of Varkala.
          </p>
          <p className="mt-5 font-serif text-sm sm:text-base tracking-[0.28em] font-bold text-gold uppercase drop-shadow-sm">
            HEAL &nbsp;•&nbsp; HARMONIZE &nbsp;•&nbsp; TRANSFORM
          </p>
        </div>

        {/* Right handwriting script quote */}
        <div className="md:text-right select-none md:pr-4 lg:pr-10 flex flex-col items-start md:items-end justify-center">
          <p className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-white leading-[1.12] -rotate-3 font-bold" style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.7), 0 0 12px rgba(0,0,0,0.4)' }}>
            Good People<br />
            Good Energy<br />
            Brighter Tomorrows
          </p>
        </div>
      </div>
    </section>
  );
}

// ── 2. Gallery Section (6 Cards in 2 Columns) ─────────────────────────────────

function GallerySection({
  openLightbox,
  dynamicImages,
}: {
  openLightbox: (images: (GalleryPhoto | string)[], idx: number, title: string) => void;
  dynamicImages: GalleryPhoto[];
}) {
  const getCatImages = (cat: string): GalleryPhoto[] => {
    return dynamicImages.filter(
      (img) => img.category && img.category.trim().toLowerCase() === cat.trim().toLowerCase()
    );
  };

  const centreImages = getCatImages("Our Centre");
  const yogaImages = getCatImages("Yoga & Wellness");
  const therapyImages = getCatImages("Wellness & Therapies");
  const nonAcImages = getCatImages("Deluxe Non-AC Room");
  const acImages = getCatImages("Deluxe AC Room");
  const certImages = getCatImages("Certifications & Training");
  const localImages = getCatImages("Local Experiences & Excursions");

  return (
    <section className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* 1 — OUR CENTRE */}
        <CentreCard openLightbox={openLightbox} dynamicImages={centreImages} />

        {/* 2 — YOGA & WELLNESS */}
        <YogaCard openLightbox={openLightbox} dynamicImages={yogaImages} />

        {/* 3 — WELLNESS & THERAPIES */}
        <TherapiesCard openLightbox={openLightbox} dynamicImages={therapyImages} />

        {/* 4 — OUR ACCOMMODATION */}
        <AccommodationCard
          openLightbox={openLightbox}
          dynamicNonAcImages={nonAcImages}
          dynamicAcImages={acImages}
        />

        {/* 5 — CERTIFICATIONS & TRAINING */}
        <CertificationsCard openLightbox={openLightbox} dynamicImages={certImages} />

        {/* 6 — LOCAL EXPERIENCES & EXCURSIONS */}
        <LocalExcursionsCard openLightbox={openLightbox} dynamicImages={localImages} />
      </div>
    </section>
  );
}

// ── Card 1: Our Centre ────────────────────────────────────────────────────────

function CentreCard({
  openLightbox,
  dynamicImages,
}: {
  openLightbox: (images: (GalleryPhoto | string)[], idx: number, title: string) => void;
  dynamicImages: GalleryPhoto[];
}) {
  const staticImages: GalleryPhoto[] = [
    { image: centre1, name: "Sunset Roof Practice" },
    { image: centre2, name: "Beach Handstand Pose" },
    { image: centre3, name: "Sea View Balance" },
    { image: centre4, name: "Veranda Practice Space" },
    { image: centre5, name: "Holistic Wellness Sanctuary" },
    { image: centre6, name: "Centre View" },
  ];
  const images: GalleryPhoto[] = [...dynamicImages, ...staticImages];
  const title = "Our Centre";
  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#143d2c] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#143d2c] tracking-wider uppercase">
                OUR CENTRE
              </h2>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                Explore our peaceful wellness space.
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-serif italic text-xs leading-tight text-[#8c5a2c]">
              A home for<br />healing and growth
            </p>
          </div>
        </div>

        {/* Main Featured Photo */}
        <div
          onClick={() => openLightbox(images, 0, title)}
          className="aspect-[16/9] w-full rounded-xl overflow-hidden cursor-pointer group relative bg-stone-100"
        >
          <img
            src={resolveImageUrl(mainImage.image)}
            alt={mainImage.name || "Dr. Vikram Yoga & Wellness Centre"}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
          {mainImage.name && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 pt-7 text-white pointer-events-none">
              <p className="font-serif text-xs sm:text-sm font-medium tracking-wide drop-shadow-sm truncate">
                {mainImage.name}
              </p>
            </div>
          )}
        </div>

        {/* 4 Thumbnails */}
        <div className="grid grid-cols-4 gap-2 mt-2.5">
          {thumbnails.map((thumb, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(images, idx + 1, title)}
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-stone-100 relative"
              title={thumb.name}
            >
              <img
                src={resolveImageUrl(thumb.image)}
                alt={thumb.name || `Our Centre thumbnail ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {thumb.name && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 py-1 text-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-[0.55rem] text-white font-medium truncate drop-shadow-xs">
                    {thumb.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => openLightbox(images, 0, title)}
          className="px-8 py-2 rounded-full bg-[#143d2c] hover:bg-[#1c523b] text-white font-serif text-[0.68rem] tracking-[0.18em] font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW ALL PHOTOS &nbsp;→
        </button>
      </div>
    </article>
  );
}

// ── Card 2: Yoga & Wellness ───────────────────────────────────────────────────

function YogaCard({
  openLightbox,
  dynamicImages,
}: {
  openLightbox: (images: (GalleryPhoto | string)[], idx: number, title: string) => void;
  dynamicImages: GalleryPhoto[];
}) {
  const staticImages: GalleryPhoto[] = [
    { image: yoga1, name: "Group Asana Session" },
    { image: yoga2, name: "Breath & Movement Practice" },
    { image: yoga3, name: "Aligning the Posture" },
    { image: yoga4, name: "Morning Vinyasa Flow" },
    { image: yoga5, name: "Pranayama & Focus" },
    { image: yoga6, name: "Strength & Flexibility" },
    { image: yoga7, name: "Guided Practice" },
    { image: yoga8, name: "Deep Stretch Session" },
    { image: yoga9, name: "Mindful Alignment" },
    { image: yoga10, name: "Intensive Practice" },
    { image: yoga11, name: "Savasana & Relaxation" },
  ];
  const images: GalleryPhoto[] = [...dynamicImages, ...staticImages];
  const title = "Yoga & Wellness";
  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#143d2c] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
              <YogaIcon className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#143d2c] tracking-wider uppercase">
                YOGA & WELLNESS
              </h2>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                Moments of movement, mindfulness and well-being.
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-serif italic text-xs leading-tight text-[#8c5a2c]">
              Breathe<br />Move<br />Be Present
            </p>
          </div>
        </div>

        {/* Main Featured Photo */}
        <div
          onClick={() => openLightbox(images, 0, title)}
          className="aspect-[16/9] w-full rounded-xl overflow-hidden cursor-pointer group relative bg-stone-100"
        >
          <img
            src={resolveImageUrl(mainImage.image)}
            alt={mainImage.name || "Yoga and meditation overlooking sea at sunset"}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
          {mainImage.name && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 pt-7 text-white pointer-events-none">
              <p className="font-serif text-xs sm:text-sm font-medium tracking-wide drop-shadow-sm truncate">
                {mainImage.name}
              </p>
            </div>
          )}
        </div>

        {/* 4 Thumbnails */}
        <div className="grid grid-cols-4 gap-2 mt-2.5">
          {thumbnails.map((thumb, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(images, idx + 1, title)}
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-stone-100 relative"
              title={thumb.name}
            >
              <img
                src={resolveImageUrl(thumb.image)}
                alt={thumb.name || `Yoga session thumbnail ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {thumb.name && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 py-1 text-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-[0.55rem] text-white font-medium truncate drop-shadow-xs">
                    {thumb.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => openLightbox(images, 0, title)}
          className="px-8 py-2 rounded-full bg-[#143d2c] hover:bg-[#1c523b] text-white font-serif text-[0.68rem] tracking-[0.18em] font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW ALL PHOTOS &nbsp;→
        </button>
      </div>
    </article>
  );
}

// ── Card 3: Wellness & Therapies ──────────────────────────────────────────────

function TherapiesCard({
  openLightbox,
  dynamicImages,
}: {
  openLightbox: (images: (GalleryPhoto | string)[], idx: number, title: string) => void;
  dynamicImages: GalleryPhoto[];
}) {
  const staticImages: GalleryPhoto[] = [
    { image: therapy1, name: "Traditional Ayurvedic Massage" },
    { image: therapy11, name: "Ayurvedic Treatment" },
    { image: therapy2, name: "Acupuncture Therapy" },
    { image: therapy8, name: "Reflexology Session" },
    { image: therapy4, name: "Cupping Therapy" },
    { image: therapy3, name: "Ayurvedic Care" },
    { image: therapy5, name: "Deep Tissue Massage" },
    { image: therapy6, name: "Dorn Therapy" },
    { image: therapy7, name: "Shiatsu Massage" },
    { image: therapy9, name: "Swedish Massage" },
    { image: therapy10, name: "Thai Massage" },
    { image: therapy12, name: "Natural Herbal Oils" },
    { image: therapy13, name: "Holistic Rest" },
    { image: therapy14, name: "Therapeutic Healing" },
    { image: therapy15, name: "Body Balance" },
  ];
  const images: GalleryPhoto[] = [...dynamicImages, ...staticImages];
  const title = "Wellness & Therapies";
  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#143d2c] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
              <Leaf className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#143d2c] tracking-wider uppercase">
                WELLNESS & THERAPIES
              </h2>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                Holistic therapies supporting relaxation, balance and well-being.
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-serif italic text-xs leading-tight text-[#8c5a2c]">
              Natural Therapies<br />Real Healing
            </p>
          </div>
        </div>

        {/* Main Featured Photo */}
        <div
          onClick={() => openLightbox(images, 0, title)}
          className="aspect-[16/9] w-full rounded-xl overflow-hidden cursor-pointer group relative bg-stone-100"
        >
          <img
            src={resolveImageUrl(mainImage.image)}
            alt={mainImage.name || "Traditional Ayurvedic massage therapy session"}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
          {mainImage.name && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 pt-7 text-white pointer-events-none">
              <p className="font-serif text-xs sm:text-sm font-medium tracking-wide drop-shadow-sm truncate">
                {mainImage.name}
              </p>
            </div>
          )}
        </div>

        {/* 4 Thumbnails */}
        <div className="grid grid-cols-4 gap-2 mt-2.5">
          {thumbnails.map((thumb, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(images, idx + 1, title)}
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-stone-100 relative"
              title={thumb.name}
            >
              <img
                src={resolveImageUrl(thumb.image)}
                alt={thumb.name || `Therapy thumbnail ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {thumb.name && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 py-1 text-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-[0.55rem] text-white font-medium truncate drop-shadow-xs">
                    {thumb.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => openLightbox(images, 0, title)}
          className="px-8 py-2 rounded-full bg-[#143d2c] hover:bg-[#1c523b] text-white font-serif text-[0.68rem] tracking-[0.18em] font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW ALL PHOTOS &nbsp;→
        </button>
      </div>
    </article>
  );
}

// ── Card 4: Our Accommodation ─────────────────────────────────────────────────

function AccommodationCard({
  openLightbox,
  dynamicNonAcImages,
  dynamicAcImages,
}: {
  openLightbox: (images: (GalleryPhoto | string)[], idx: number, title: string) => void;
  dynamicNonAcImages: GalleryPhoto[];
  dynamicAcImages: GalleryPhoto[];
}) {
  const [activeTab, setActiveTab] = useState<"ac" | "non-ac">("ac");

  // All 16 unique Deluxe Non-AC Room images — dynamic images prepended
  const staticNonAcImages: GalleryPhoto[] = [
    { image: nonAc24, name: "Deluxe Non-AC Master View" },
    { image: nonAcMain, name: "Bed & Wardrobe" },
    { image: nonAc1, name: "Seating Area" },
    { image: nonAc7, name: "Veranda Walk" },
    { image: nonAc10, name: "Room Corner" },
    { image: nonAc28, name: "Washbasin & Mirror" },
    { image: nonAc20, name: "Window Light" },
    { image: nonAc5, name: "Bedroom Angle" },
    { image: nonAc6, name: "Spacious Layout" },
    { image: nonAc8, name: "Wooden Accents" },
    { image: nonAc9, name: "Tranquil Interior" },
    { image: nonAc11, name: "Peaceful Sleep" },
    { image: nonAc17, name: "Garden Facing" },
    { image: nonAc18, name: "Breeze Veranda" },
    { image: nonAc22, name: "Natural Wood" },
    { image: nonAc29, name: "Bathroom Interior" },
  ];
  const deluxeNonAcImages: GalleryPhoto[] = [...dynamicNonAcImages, ...staticNonAcImages];

  // All 8 authentic Deluxe AC Room images — dynamic images prepended
  const staticAcImages: GalleryPhoto[] = [
    { image: nonAc12, name: "Deluxe AC Master Bedroom" },
    { image: nonAc13, name: "Room Ambiance" },
    { image: nonAc14, name: "Ensuite Bathroom" },
    { image: nonAc15, name: "Cooling & Comfort" },
    { image: nonAc21, name: "Courtyard View" },
    { image: nonAc23, name: "Relaxation Space" },
    { image: nonAc25, name: "Modern Amenities" },
    { image: nonAc26, name: "Clean Living" },
  ];
  const acRoomImages: GalleryPhoto[] = [...dynamicAcImages, ...staticAcImages];

  const allAccommodationImages: GalleryPhoto[] = [
    ...acRoomImages,
    ...deluxeNonAcImages,
  ];

  // 4 highlighted thumbnails for Non-AC room
  const nonAcThumbnails = [
    { src: resolveImageUrl(deluxeNonAcImages[1]?.image || nonAcMain), label: deluxeNonAcImages[1]?.name || "Bed & Wardrobe" },
    { src: resolveImageUrl(deluxeNonAcImages[2]?.image || nonAc1), label: deluxeNonAcImages[2]?.name || "Seating Area" },
    { src: resolveImageUrl(deluxeNonAcImages[3]?.image || nonAc7), label: deluxeNonAcImages[3]?.name || "Veranda Walk" },
    { src: resolveImageUrl(deluxeNonAcImages[4]?.image || nonAc28), label: deluxeNonAcImages[4]?.name || "Washbasin & Mirror" },
  ];

  const acThumbnails = [
    { src: resolveImageUrl(acRoomImages[0]?.image || nonAc12), label: acRoomImages[0]?.name || "Bedroom" },
    { src: resolveImageUrl(acRoomImages[1]?.image || nonAc13), label: acRoomImages[1]?.name || "Room Ambiance" },
    { src: resolveImageUrl(acRoomImages[2]?.image || nonAc14), label: acRoomImages[2]?.name || "Ensuite Bathroom" },
    { src: resolveImageUrl(acRoomImages[3]?.image || nonAc21), label: acRoomImages[3]?.name || "Courtyard View" },
  ];

  const activeThumbnails = activeTab === "ac" ? acThumbnails : nonAcThumbnails;
  const activePhotos = activeTab === "ac" ? acRoomImages : deluxeNonAcImages;
  const activeTitle =
    activeTab === "ac"
      ? "Accommodation — Deluxe AC Room"
      : "Accommodation — Deluxe Non-AC Room";

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#143d2c] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
              <BedDouble className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#143d2c] tracking-wider uppercase">
                OUR ACCOMMODATION
              </h2>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                Comfortable stays for rest, relaxation and rejuvenation.
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-serif italic text-xs leading-tight text-[#8c5a2c]">
              Simple Stays<br />Deeper Rest
            </p>
          </div>
        </div>

        {/* Room Tab Switcher */}
        <div className="flex items-center gap-2 mb-3 bg-stone-100/90 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("ac")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-serif font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "ac"
                ? "bg-[#143d2c] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
           Deluxe AC Room
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("non-ac")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-serif font-semibold tracking-wide transition-all cursor-pointer ${
              activeTab === "non-ac"
                ? "bg-[#143d2c] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            Deluxe Non-AC Room
          </button>
        </div>

        {/* Two Featured Rooms Side-by-Side: AC on Left, Non-AC on Right (matching tabs directly above) */}
        <div className="grid grid-cols-2 gap-3">
          {/* Deluxe AC Room (Left, directly below Deluxe AC tab) */}
          <div
            onClick={() => {
              setActiveTab("ac");
              openLightbox(acRoomImages, 0, "Accommodation — Deluxe AC Room");
            }}
            className={`cursor-pointer rounded-xl p-1 transition-all ${
              activeTab === "ac" ? "ring-2 ring-[#143d2c]/70 bg-emerald-50/40" : ""
            }`}
          >
            <div className="aspect-[16/11] w-full rounded-lg overflow-hidden group relative bg-stone-100">
              <img
                src={resolveImageUrl(acRoomImages[0]?.image || nonAc12)}
                alt="Deluxe AC Room"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between mt-1.5 px-1">
              <p className="font-serif text-xs text-stone-900 font-bold">
                Deluxe AC Room
              </p>
              <span className="text-[0.65rem] text-[#143d2c] font-medium hover:underline">
                View →
              </span>
            </div>
          </div>

          {/* Deluxe Non-AC Room (Right, directly below Deluxe Non-AC tab) */}
          <div
            onClick={() => {
              setActiveTab("non-ac");
              openLightbox(deluxeNonAcImages, 0, "Accommodation — Deluxe Non-AC Room");
            }}
            className={`cursor-pointer rounded-xl p-1 transition-all ${
              activeTab === "non-ac" ? "ring-2 ring-[#143d2c]/70 bg-emerald-50/40" : ""
            }`}
          >
            <div className="aspect-[16/11] w-full rounded-lg overflow-hidden group relative bg-stone-100">
              <img
                src={resolveImageUrl(deluxeNonAcImages[0]?.image || nonAc24)}
                alt="Deluxe Non-AC Room"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="flex items-center justify-between mt-1.5 px-1">
              <p className="font-serif text-xs text-stone-900 font-bold">
                Deluxe Non-AC Room
              </p>
              <span className="text-[0.65rem] text-[#143d2c] font-medium hover:underline">
                View →
              </span>
            </div>
          </div>
        </div>

        {/* Accommodation Thumbnails Preview */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {activeThumbnails.map((thumb, idx) => (
            <div
              key={idx}
              onClick={() =>
                openLightbox(activePhotos, idx + 1, activeTitle)
              }
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-stone-100 relative"
            >
              <img
                src={thumb.src}
                alt={thumb.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Centered Action Button */}
      <div className="flex flex-col items-center gap-1.5 mt-5">
        <button
          onClick={() => openLightbox(activePhotos, 0, activeTitle)}
          className="px-8 py-2 rounded-full bg-[#143d2c] hover:bg-[#1c523b] text-white font-serif text-[0.68rem] tracking-[0.18em] font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          {activeTab === "ac"
            ? "VIEW DELUXE AC →"
            : "VIEW DELUXE NON-AC →"}
        </button>
        <button
          type="button"
          onClick={() =>
            openLightbox(allAccommodationImages, 0, "Our Accommodation")
          }
          className="text-[0.65rem] text-stone-500 hover:text-stone-800 font-serif tracking-wider underline cursor-pointer"
        >
          View all accommodation photos
        </button>
      </div>
    </article>
  );
}

// ── Card 5: Certifications & Training ─────────────────────────────────────────

function CertificationsCard({
  openLightbox,
  dynamicImages = [],
}: {
  openLightbox: (images: (GalleryPhoto | string)[], idx: number, title: string) => void;
  dynamicImages?: GalleryPhoto[];
}) {
  const staticImages: GalleryPhoto[] = [
    { image: cert1, name: "100h Teacher Training Ceremony" },
    { image: cert3, name: "200h Luxury Training" },
    { image: cert4, name: "300h Advanced Training" },
    { image: cert5, name: "Dr. Chandra Kumar & Teachers" },
    { image: cert6, name: "Classroom Practice Session" },
    { image: cert2, name: "200h Standard Training" },
    { image: cert7, name: "Yoga Master Guidance" },
    { image: cert8, name: "Founder Guidance & Wisdom" },
  ];
  const images: GalleryPhoto[] = [...dynamicImages, ...staticImages];
  const title = "Certifications & Training";
  const mainImage = images[0];
  const thumbnails = images.slice(1, 5);

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#143d2c] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#143d2c] tracking-wider uppercase">
                CERTIFICATIONS & TRAINING
              </h2>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                Celebrating learning, achievement and professional growth.
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-serif italic text-xs leading-tight text-[#8c5a2c]">
              Knowledge Today<br />A Healthier Tomorrow
            </p>
          </div>
        </div>

        {/* Main Featured Photo */}
        <div
          onClick={() => openLightbox(images, 0, title)}
          className="aspect-[16/9] w-full rounded-xl overflow-hidden cursor-pointer group relative bg-stone-100"
        >
          <img
            src={resolveImageUrl(mainImage.image)}
            alt={mainImage.name || "Yoga teachers certification and graduation ceremony"}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
          {mainImage.name && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 pt-7 text-white pointer-events-none">
              <p className="font-serif text-xs sm:text-sm font-medium tracking-wide drop-shadow-sm truncate">
                {mainImage.name}
              </p>
            </div>
          )}
        </div>

        {/* 4 Thumbnails */}
        <div className="grid grid-cols-4 gap-2 mt-2.5">
          {thumbnails.map((thumb, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(images, idx + 1, title)}
              className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-stone-100 relative"
              title={thumb.name}
            >
              <img
                src={resolveImageUrl(thumb.image)}
                alt={thumb.name || `Training certification photo ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              {thumb.name && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-1.5 py-1 text-center pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                  <p className="text-[0.55rem] text-white font-medium truncate drop-shadow-xs">
                    {thumb.name}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => openLightbox(images, 0, title)}
          className="px-8 py-2 rounded-full bg-[#143d2c] hover:bg-[#1c523b] text-white font-serif text-[0.68rem] tracking-[0.18em] font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW ALL PHOTOS &nbsp;→
        </button>
      </div>
    </article>
  );
}

// ── Card 6: Local Experiences & Excursions ────────────────────────────────────

function LocalExcursionsCard({
  openLightbox,
  dynamicImages = [],
}: {
  openLightbox: (images: (GalleryPhoto | string)[], idx: number, title: string) => void;
  dynamicImages?: GalleryPhoto[];
}) {
  const staticExcursions: GalleryPhoto[] = [
    { name: "Varkala Beach", image: local1 },
    { name: "Varkala Cliff", image: varkalaSunsetSea },
    { name: "Janardanaswamy Temple", image: local2 },
    { name: "Kappil Beach", image: local5 },
    { name: "Kappil Lake", image: local6 },
    { name: "Local Life & Culture", image: local7 },
    { name: "Varkala Coastline", image: local3 },
    { name: "Healing Atmosphere", image: local8 },
    { name: "Sunset Practice", image: local9 },
    { name: "Tropical Nature", image: local10 },
  ];

  const allImages: GalleryPhoto[] = [...dynamicImages, ...staticExcursions];
  const title = "Local Experiences & Excursions";
  const mainImage = allImages[0];
  const thumbnails = allImages.slice(0, 6);

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-5 sm:p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#143d2c] flex items-center justify-center text-white flex-shrink-0 shadow-xs">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-sm sm:text-base text-[#143d2c] tracking-wider uppercase">
                LOCAL EXPERIENCES & EXCURSIONS
              </h2>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug">
                Discover the natural beauty, culture and experiences surrounding Varkala.
              </p>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-serif italic text-xs leading-tight text-[#8c5a2c]">
              Explore<br />Experience<br />Feel Alive
            </p>
          </div>
        </div>

        {/* Main Featured Photo */}
        <div
          onClick={() => openLightbox(allImages, 0, title)}
          className="aspect-[16/9] w-full rounded-xl overflow-hidden cursor-pointer group relative bg-stone-100"
        >
          <img
            src={resolveImageUrl(mainImage.image)}
            alt={mainImage.name || "Panoramic Varkala cliff and beach at golden sunset"}
            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
            loading="lazy"
          />
          {mainImage.name && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-3 pt-7 text-white pointer-events-none">
              <p className="font-serif text-xs sm:text-sm font-medium tracking-wide drop-shadow-sm truncate">
                {mainImage.name}
              </p>
            </div>
          )}
        </div>

        {/* 6 Labeled Thumbnails Row */}
        <div className="grid grid-cols-6 gap-1.5 sm:gap-2 mt-2.5">
          {thumbnails.map((item, idx) => (
            <div
              key={idx}
              onClick={() => openLightbox(allImages, idx, title)}
              className="cursor-pointer group flex flex-col items-center"
            >
              <div className="aspect-[4/3] w-full rounded-md sm:rounded-lg overflow-hidden bg-stone-100">
                <img
                  src={resolveImageUrl(item.image)}
                  alt={item.name || `Local excursion ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="text-[0.52rem] sm:text-[0.58rem] text-stone-600 font-medium text-center leading-tight mt-1 truncate w-full">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-5">
        <button
          onClick={() => openLightbox(allImages, 0, title)}
          className="px-8 py-2 rounded-full bg-[#143d2c] hover:bg-[#1c523b] text-white font-serif text-[0.68rem] tracking-[0.18em] font-semibold flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          VIEW ALL PHOTOS &nbsp;→
        </button>
      </div>
    </article>
  );
}

// ── 3. Bottom Journey Banner ──────────────────────────────────────────────────

function GalleryJourneyBanner() {
  return (
    <section className="relative w-full bg-[#0a2318] text-white overflow-hidden py-16 sm:py-20 px-6 sm:px-12">
      {/* Background Dewy Leaf on the left */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 md:w-2/5 bg-no-repeat bg-cover bg-left pointer-events-none opacity-40 md:opacity-60 mix-blend-screen"
        style={{
          backgroundImage: `url(${dewyLeaf})`,
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Center Text */}
        <div className="text-center md:text-left flex-1 md:pl-16 lg:pl-28">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-[2.6rem] text-cream font-normal tracking-wide">
            Your Journey in Pictures
          </h2>
          <p className="mt-3 font-serif text-xs sm:text-sm text-[#cbd8d0] tracking-[0.22em] uppercase font-light">
            People &nbsp;•&nbsp; Practices &nbsp;•&nbsp; Places &nbsp;•&nbsp; Possibilities
          </p>
        </div>

        {/* Right handwriting quote */}
        <div className="text-right select-none md:pr-4 flex-shrink-0">
          <p className="font-handwriting text-3xl sm:text-4xl text-[#dfcaa9] leading-[1.08] -rotate-6 font-medium drop-shadow-sm">
            Collect<br />
            Moments<br />
            Not Things
          </p>
          {/* Subtle decorative underline stroke */}
          <div className="w-24 h-1 ml-auto mt-2 border-b-2 border-[#dfcaa9]/40 -rotate-3" />
        </div>
      </div>
    </section>
  );
}

// ── 4. Interactive Lightbox ───────────────────────────────────────────────────

function Lightbox({
  images,
  currentIndex,
  title,
  onClose,
  onNext,
  onPrev,
  onNavigate,
}: {
  images: (GalleryPhoto | string)[];
  currentIndex: number;
  title: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onNavigate: (index: number) => void;
}) {
  const currentItem = images[currentIndex];
  const currentSrc = resolveImageUrl(
    typeof currentItem === "string" ? currentItem : currentItem.image
  );
  const currentName =
    typeof currentItem === "string" ? "" : currentItem.name || "";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col animate-fade-in"
      style={{ background: "rgba(10, 20, 16, 0.98)" }}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photo gallery`}
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 border-b border-white/10">
        <div>
          <p className="font-serif text-xs tracking-[0.25em] text-[#dfcaa9] uppercase font-semibold flex items-center gap-2">
            <span>{title}</span>
            {currentName && (
              <>
                <span className="text-white/30">•</span>
                <span className="text-white/90 normal-case tracking-normal font-sans font-medium text-xs truncate max-w-[200px] sm:max-w-md">
                  {currentName}
                </span>
              </>
            )}
          </p>
        </div>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Main Display Image ── */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-4 md:px-20 py-3 min-h-0 overflow-hidden">
        {/* Prev Arrow */}
        <button
          onClick={onPrev}
          aria-label="Previous photo"
          className="absolute left-3 md:left-6 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 bg-white/10 hover:bg-white/20 border border-white/15 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative max-w-full max-h-full flex flex-col items-center justify-center">
          <img
            key={currentIndex}
            src={currentSrc}
            alt={currentName || `${title} — photo ${currentIndex + 1} of ${images.length}`}
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-fade-up"
            style={{ maxHeight: "calc(100vh - 220px)" }}
          />
          {currentName && (
            <div className="mt-2 text-center bg-black/50 backdrop-blur-xs px-4 py-1 rounded-full border border-white/10">
              <p className="text-white/95 text-xs sm:text-sm font-serif tracking-wide">
                {currentName}
              </p>
            </div>
          )}
        </div>

        {/* Next Arrow */}
        <button
          onClick={onNext}
          aria-label="Next photo"
          className="absolute right-3 md:right-6 z-10 w-12 h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95 bg-white/10 hover:bg-white/20 border border-white/15 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* ── Thumbnails Strip ── */}
      {images.length > 1 && (
        <div
          className="flex-shrink-0 flex gap-2 items-center justify-start sm:justify-center overflow-x-auto px-5 py-3 border-t border-white/10"
          style={{ scrollbarWidth: "none" }}
        >
          {images.map((item, i) => {
            const itemSrc = resolveImageUrl(
              typeof item === "string" ? item : item.image
            );
            const itemName = typeof item === "string" ? "" : item.name || "";
            return (
              <button
                key={i}
                onClick={() => onNavigate(i)}
                aria-label={`View photo ${i + 1}`}
                title={itemName}
                className={`w-14 h-10 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  i === currentIndex
                    ? "border-[#dfcaa9] opacity-100 scale-105 shadow-md"
                    : "border-transparent opacity-40 hover:opacity-75"
                }`}
              >
                <img
                  src={itemSrc}
                  alt={itemName}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
