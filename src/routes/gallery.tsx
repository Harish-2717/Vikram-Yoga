import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Leaf,
  GraduationCap,
  MapPin,
  BedDouble,
  Images as ImagesIcon,
  Sparkles,
  Loader2,
  Grid,
  Layers,
  ArrowLeft,
  Maximize2,
  Camera,
} from "lucide-react";

import { Navbar, Footer, WhatsAppFloat, BookNowFloat } from "./about";
import { getApiUrl, resolveImageUrl, bustCache } from "@/lib/utils";

// ── Background Assets ─────────────────────────────────────────────────────────
import galleryHeroImg from "@/assets/beach_sunset_varkala.jpg";
import dewyLeaf from "@/assets/cta_dewy_leaf.jpg";

// ── Types ─────────────────────────────────────────────────────────────────────

export type GalleryPhoto = {
  id: string;
  name?: string;
  image: string;
  category: string;
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

// ── Preset Metadata for Categories ────────────────────────────────────────────

interface CategoryMeta {
  subtitle: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORY_META_PRESETS: Record<string, CategoryMeta> = {
  "Our Centre": {
    subtitle: "Explore our peaceful wellness space and ocean-view practice areas.",
    tagline: "A home for\nhealing & growth",
    icon: Home,
  },
  "Yoga & Wellness": {
    subtitle: "Moments of movement, mindful alignment, and conscious breathwork.",
    tagline: "Breathe\nMove\nBe Present",
    icon: YogaIcon,
  },
  "Wellness & Therapies": {
    subtitle: "Authentic Ayurvedic treatments, Shiatsu, Thai Yoga, and bodywork.",
    tagline: "Natural Therapies\nReal Healing",
    icon: Leaf,
  },
  "Our Accommodation": {
    subtitle: "Comfortable air-conditioned and non-AC rooms for deep restful stays.",
    tagline: "Simple Stays\nDeeper Rest",
    icon: BedDouble,
  },
  "Deluxe Non-AC Room": {
    subtitle: "Naturally ventilated spaces with tranquil garden and veranda views.",
    tagline: "Simple Stays\nDeeper Rest",
    icon: BedDouble,
  },
  "Deluxe AC Room": {
    subtitle: "Climate-controlled comfort with private ensuite amenities.",
    tagline: "Cool Comfort\nSerene Living",
    icon: BedDouble,
  },
  "Certifications & Training": {
    subtitle: "Celebrating hands-on learning, student certifications, and growth.",
    tagline: "Knowledge Today\nA Healthier Tomorrow",
    icon: GraduationCap,
  },
  "Local Experiences & Excursions": {
    subtitle: "Varkala beach walks, cliff sunsets, ancient temples, and backwaters.",
    tagline: "Explore\nExperience\nFeel Alive",
    icon: MapPin,
  },
};

const PREFERRED_CATEGORY_ORDER = [
  "Our Centre",
  "Yoga & Wellness",
  "Wellness & Therapies",
  "Our Accommodation",
  "Certifications & Training",
  "Local Experiences & Excursions",
];

function getCategoryMeta(catName: string): CategoryMeta {
  if (CATEGORY_META_PRESETS[catName]) {
    return CATEGORY_META_PRESETS[catName];
  }
  return {
    subtitle: `Explore authentic moments and spaces from ${catName}.`,
    tagline: "Moments of\nTransformation",
    icon: Sparkles,
  };
}

// ── Curated Authentic Fallback Dataset ────────────────────────────────────────
// Guarantees immediate zero-delay display and prevents empty states or broken icons.

const FALLBACK_GALLERY_PHOTOS: GalleryPhoto[] = [
  // Our Centre
  { id: "fb-1", category: "Our Centre", name: "Sunset Roof Practice", image: "/gallery/centre-sunset-roof.png" },
  { id: "fb-2", category: "Our Centre", name: "Beach Handstand Pose", image: "/gallery/centre-beach-handstand.png" },
  { id: "fb-3", category: "Our Centre", name: "Sea View Balance", image: "/gallery/centre-sea-view-balance.png" },
  { id: "fb-4", category: "Our Centre", name: "Veranda Practice Space", image: "/gallery/centre-veranda-space.png" },
  { id: "fb-5", category: "Our Centre", name: "Holistic Wellness Sanctuary", image: "/gallery/centre-holistic-sanctuary.png" },
  { id: "fb-6", category: "Our Centre", name: "Centre View", image: "/gallery/centre-view.png" },

  // Yoga & Wellness
  { id: "fb-7", category: "Yoga & Wellness", name: "Group Asana Session", image: "/gallery/yoga-group-asana.jpeg" },
  { id: "fb-8", category: "Yoga & Wellness", name: "Breath & Movement Practice", image: "/gallery/yoga-breath-movement.jpeg" },
  { id: "fb-9", category: "Yoga & Wellness", name: "Aligning the Posture", image: "/gallery/yoga-posture-alignment.jpeg" },
  { id: "fb-10", category: "Yoga & Wellness", name: "Morning Vinyasa Flow", image: "/gallery/yoga-vinyasa-flow.jpeg" },
  { id: "fb-11", category: "Yoga & Wellness", name: "Pranayama & Focus", image: "/gallery/yoga-pranayama-focus.jpeg" },
  { id: "fb-12", category: "Yoga & Wellness", name: "Strength & Flexibility", image: "/gallery/yoga-strength-flexibility.jpeg" },
  { id: "fb-13", category: "Yoga & Wellness", name: "Guided Practice", image: "/gallery/yoga-guided-practice.jpeg" },
  { id: "fb-14", category: "Yoga & Wellness", name: "Deep Stretch Session", image: "/gallery/yoga-deep-stretch.jpeg" },
  { id: "fb-15", category: "Yoga & Wellness", name: "Mindful Alignment", image: "/gallery/yoga-mindful-alignment.jpeg" },
  { id: "fb-16", category: "Yoga & Wellness", name: "Intensive Practice", image: "/gallery/yoga-intensive-practice.jpeg" },
  { id: "fb-17", category: "Yoga & Wellness", name: "Savasana & Relaxation", image: "/gallery/yoga-savasana-relaxation.jpeg" },

  // Wellness & Therapies
  { id: "fb-18", category: "Wellness & Therapies", name: "Traditional Ayurvedic Massage", image: "/gallery/therapy-ayurvedic-massage.png" },
  { id: "fb-19", category: "Wellness & Therapies", name: "Ayurvedic Treatment", image: "/gallery/therapy-ayurvedic-treatment.jpeg" },
  { id: "fb-20", category: "Wellness & Therapies", name: "Acupuncture Therapy", image: "/gallery/therapy-acupuncture.jpeg" },
  { id: "fb-21", category: "Wellness & Therapies", name: "Reflexology Session", image: "/gallery/therapy-reflexology.png" },
  { id: "fb-22", category: "Wellness & Therapies", name: "Cupping Therapy", image: "/gallery/therapy-cupping.jpg" },
  { id: "fb-23", category: "Wellness & Therapies", name: "Deep Tissue Massage", image: "/gallery/therapy-deep-tissue.png" },
  { id: "fb-24", category: "Wellness & Therapies", name: "Dorn Therapy", image: "/gallery/therapy-dorn.jpg" },
  { id: "fb-25", category: "Wellness & Therapies", name: "Shiatsu Massage", image: "/gallery/therapy-shiatsu.jpeg" },
  { id: "fb-26", category: "Wellness & Therapies", name: "Swedish Massage", image: "/gallery/therapy-swedish.jpeg" },
  { id: "fb-27", category: "Wellness & Therapies", name: "Thai Yoga Massage", image: "/gallery/therapy-thai-massage.png" },
  { id: "fb-28", category: "Wellness & Therapies", name: "Natural Herbal Oils", image: "/gallery/therapy-herbal-oils.jpeg" },
  { id: "fb-29", category: "Wellness & Therapies", name: "Holistic Rest", image: "/gallery/therapy-holistic-rest.jpeg" },

  // Deluxe AC Room
  { id: "fb-30", category: "Deluxe AC Room", name: "Deluxe AC Master Bedroom", image: "/gallery/room-ac-master.webp" },
  { id: "fb-31", category: "Deluxe AC Room", name: "Room Ambiance", image: "/gallery/room-ac-ambiance.webp" },
  { id: "fb-32", category: "Deluxe AC Room", name: "Ensuite Bathroom", image: "/gallery/room-ac-bathroom.webp" },
  { id: "fb-33", category: "Deluxe AC Room", name: "Cooling & Comfort", image: "/gallery/room-ac-cooling.webp" },
  { id: "fb-34", category: "Deluxe AC Room", name: "Courtyard View", image: "/gallery/room-ac-courtyard.webp" },
  { id: "fb-35", category: "Deluxe AC Room", name: "Relaxation Space", image: "/gallery/room-ac-relaxation.webp" },
  { id: "fb-36", category: "Deluxe AC Room", name: "Modern Amenities", image: "/gallery/room-ac-modern-amenities.webp" },
  { id: "fb-37", category: "Deluxe AC Room", name: "Clean Living", image: "/gallery/room-ac-clean-living.webp" },

  // Deluxe Non-AC Room
  { id: "fb-38", category: "Deluxe Non-AC Room", name: "Deluxe Non-AC Master View", image: "/gallery/room-non-ac-master.webp" },
  { id: "fb-39", category: "Deluxe Non-AC Room", name: "Bed & Wardrobe", image: "/gallery/room-non-ac-bed-wardrobe.webp" },
  { id: "fb-40", category: "Deluxe Non-AC Room", name: "Seating Area", image: "/gallery/room-non-ac-seating.webp" },
  { id: "fb-41", category: "Deluxe Non-AC Room", name: "Veranda Walk", image: "/gallery/room-non-ac-veranda.webp" },
  { id: "fb-42", category: "Deluxe Non-AC Room", name: "Garden Outlook", image: "/gallery/room-non-ac-garden.webp" },
  { id: "fb-43", category: "Deluxe Non-AC Room", name: "Ensuite Restroom", image: "/gallery/room-non-ac-restroom.webp" },
  { id: "fb-44", category: "Deluxe Non-AC Room", name: "Tranquil Air", image: "/gallery/room-non-ac-air.webp" },
  { id: "fb-45", category: "Deluxe Non-AC Room", name: "Bathroom Interior", image: "/gallery/room-non-ac-bathroom.webp" },

  // Certifications & Training
  { id: "fb-46", category: "Certifications & Training", name: "100h Teacher Training Ceremony", image: "/gallery/cert-100h-ceremony.png" },
  { id: "fb-47", category: "Certifications & Training", name: "200h Luxury Training", image: "/gallery/cert-200h-lux.png" },
  { id: "fb-48", category: "Certifications & Training", name: "300h Advanced Training", image: "/gallery/cert-300h-advanced.png" },
  { id: "fb-49", category: "Certifications & Training", name: "Dr. Chandra Kumar & Teachers", image: "/gallery/cert-dr-chandra-kumar.jpg" },
  { id: "fb-50", category: "Certifications & Training", name: "Classroom Practice Session", image: "/gallery/cert-classroom-practice.jpg" },
  { id: "fb-51", category: "Certifications & Training", name: "200h Standard Training", image: "/gallery/cert-200h-std.png" },
  { id: "fb-52", category: "Certifications & Training", name: "Yoga Master Guidance", image: "/gallery/cert-master-guidance.jpeg" },
  { id: "fb-53", category: "Certifications & Training", name: "Founder Guidance & Wisdom", image: "/gallery/cert-founder-guidance.png" },

  // Local Experiences & Excursions
  { id: "fb-54", category: "Local Experiences & Excursions", name: "Varkala Beach", image: "/gallery/excursion-varkala-beach.png" },
  { id: "fb-55", category: "Local Experiences & Excursions", name: "Varkala Cliff", image: "/gallery/excursion-varkala-cliff.jpg" },
  { id: "fb-56", category: "Local Experiences & Excursions", name: "Janardanaswamy Temple", image: "/gallery/excursion-janardana-temple.png" },
  { id: "fb-57", category: "Local Experiences & Excursions", name: "Kappil Beach", image: "/gallery/excursion-kappil-beach.png" },
  { id: "fb-58", category: "Local Experiences & Excursions", name: "Kappil Lake", image: "/gallery/excursion-kappil-lake.jpg" },
  { id: "fb-59", category: "Local Experiences & Excursions", name: "Local Life & Culture", image: "/gallery/excursion-local-life.png" },
  { id: "fb-60", category: "Local Experiences & Excursions", name: "Varkala Coastline", image: "/gallery/excursion-coastline.png" },
  { id: "fb-61", category: "Local Experiences & Excursions", name: "Healing Atmosphere", image: "/gallery/excursion-healing-atmosphere.png" },
  { id: "fb-62", category: "Local Experiences & Excursions", name: "Tropical Nature", image: "/gallery/excursion-tropical-nature.jpg" },
];

// ── Smart Image Component with Fallback & Shimmer ─────────────────────────────

function ImageWithFallback({
  src,
  alt,
  className = "",
  containerClassName = "",
  objectFit = "cover",
}: {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  objectFit?: "cover" | "contain";
}) {
  const [loaded, setLoaded] = useState(false);
  const [errorStage, setErrorStage] = useState<number>(0);

  const resolvedUrl = useMemo(() => {
    const initial = resolveImageUrl(src);
    if (errorStage === 0) return initial;
    if (errorStage === 1) {
      // Try root-relative gallery path
      const filename = initial.split("/").pop() || "";
      return `/gallery/${filename}`;
    }
    if (errorStage === 2) {
      // Try public prefix
      const filename = initial.split("/").pop() || "";
      return `/public/gallery/${filename}`;
    }
    return "";
  }, [src, errorStage]);

  return (
    <div className={`relative overflow-hidden w-full h-full bg-stone-200/70 ${containerClassName}`}>
      {/* Shimmer skeleton until image loads */}
      {!loaded && errorStage < 3 && (
        <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 animate-pulse pointer-events-none" />
      )}

      {errorStage < 3 ? (
        <img
          src={resolvedUrl}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setErrorStage((prev) => prev + 1)}
          className={`w-full h-full transition-opacity duration-500 ${
            objectFit === "contain" ? "object-contain" : "object-cover object-center"
          } ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
        />
      ) : (
        // Polished elegant placeholder when image cannot be resolved
        <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-stone-100 text-stone-400">
          <Camera className="w-6 h-6 mb-1 opacity-60 text-[#143d2c]" />
          <span className="text-[0.68rem] font-serif text-stone-600 line-clamp-1">{alt}</span>
        </div>
      )}
    </div>
  );
}

// ── Route Definition ──────────────────────────────────────────────────────────

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Explore dynamic moments of healing, learning and transformation at Dr. Vikram Yoga & Wellness Centre in Varkala.",
      },
    ],
  }),
});

// ── Main Gallery Page Component ───────────────────────────────────────────────

function GalleryPage() {
  const [lightbox, setLightbox] = useState<LightboxState>(null);
  const [dynamicImages, setDynamicImages] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("ALL");
  const [viewMode, setViewMode] = useState<"showcase" | "grid">("showcase");

  const fetchImages = useCallback(async () => {
    try {
      const endpoints = [
        getApiUrl("gallery-images.php"),
        "/api/gallery-images.php",
        "/Vikram%20Yoga/emerald-serenity-hub/api/gallery-images.php",
      ];

      for (const ep of endpoints) {
        try {
          const response = await fetch(bustCache(ep));
          const contentType = response.headers.get("content-type") || "";
          if (response.ok && contentType.includes("application/json")) {
            const res = await response.json();
            if (Array.isArray(res) && res.length > 0) {
              setDynamicImages(res);
              return;
            }
          }
        } catch {
          // Try next fallback endpoint
        }
      }
      // If network response was empty or failed, use authentic curated dataset
      setDynamicImages(FALLBACK_GALLERY_PHOTOS);
    } catch (err) {
      console.error("Failed to load dynamic gallery images", err);
      setDynamicImages(FALLBACK_GALLERY_PHOTOS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Combined photo collection (ensuring non-empty)
  const displayPhotos = useMemo(() => {
    return dynamicImages.length > 0 ? dynamicImages : FALLBACK_GALLERY_PHOTOS;
  }, [dynamicImages]);

  // Extract all distinct categories
  const allCategories = useMemo(() => {
    const map = new Map<string, string>();
    displayPhotos.forEach((img) => {
      const cat = (img.category || "General").trim();
      const lower = cat.toLowerCase();
      if (!map.has(lower)) {
        map.set(lower, cat);
      }
    });

    const list = Array.from(map.values());

    list.sort((a, b) => {
      const idxA = PREFERRED_CATEGORY_ORDER.findIndex(
        (o) => o.toLowerCase() === a.toLowerCase()
      );
      const idxB = PREFERRED_CATEGORY_ORDER.findIndex(
        (o) => o.toLowerCase() === b.toLowerCase()
      );
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return list;
  }, [displayPhotos]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    displayPhotos.forEach((img) => {
      const cat = (img.category || "General").trim();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [displayPhotos]);

  // Lightbox handlers
  const openLightbox = useCallback(
    (images: GalleryPhoto[], currentIndex: number, title: string) => {
      if (!images || images.length === 0) return;
      setLightbox({ images, currentIndex, title });
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

  // Handle category selection
  const handleSelectCategory = (cat: string) => {
    setSelectedCategoryFilter(cat);
  };

  return (
    <main className="overflow-x-hidden bg-[#f6f5f0] text-stone-900 font-sans min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <GalleryHero />

      {/* Filter and View Controls Bar */}
      <section className="sticky top-0 z-20 bg-[#f6f5f0]/95 backdrop-blur-md border-b border-stone-200/70 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Category Filter Pills (Smooth scrollable on mobile) */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-none scroll-smooth">
              <button
                type="button"
                onClick={() => handleSelectCategory("ALL")}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategoryFilter === "ALL"
                    ? "bg-[#143d2c] text-white shadow-xs scale-102"
                    : "bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
                }`}
              >
                <span>All Categories</span>
              </button>

              {allCategories.map((cat) => {
                const isSelected = selectedCategoryFilter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#143d2c] text-white shadow-xs scale-102"
                        : "bg-white text-stone-700 hover:bg-stone-100 hover:text-stone-900 border border-stone-200"
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>

            {/* View Mode Toggle: Showcase vs Full Grid (Shown in ALL categories) */}
            {selectedCategoryFilter === "ALL" && (
              <div className="flex items-center justify-end gap-1 shrink-0 pt-1 md:pt-0 border-t md:border-t-0 border-stone-200/50">
                <span className="text-[0.68rem] uppercase font-serif text-stone-500 tracking-wider mr-1 hidden sm:inline">
                  View:
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode("showcase")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === "showcase"
                      ? "bg-[#143d2c] text-white shadow-2xs"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                  title="Category Showcase View"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Showcase</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#143d2c] text-white shadow-2xs"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                  title="Full Photo Grid View"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>All Photos</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Dynamic Gallery Content */}
      {loading ? (
        <section className="py-24 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-[#143d2c] animate-spin" />
          <p className="text-sm font-serif text-stone-600">Loading authentic moments...</p>
        </section>
      ) : selectedCategoryFilter !== "ALL" ? (
        // When a single category is filtered, show ALL photos of that category in a responsive grid
        <CategoryFullGridView
          category={selectedCategoryFilter}
          photos={displayPhotos.filter(
            (p) =>
              (p.category || "").trim().toLowerCase() ===
              selectedCategoryFilter.trim().toLowerCase()
          )}
          openLightbox={openLightbox}
          onResetFilter={() => setSelectedCategoryFilter("ALL")}
        />
      ) : viewMode === "grid" ? (
        // Full Photo Grid view for ALL photos
        <AllPhotosGridView
          photos={displayPhotos}
          openLightbox={openLightbox}
        />
      ) : (
        // Curated Category Showcase View
        <DynamicGallerySection
          openLightbox={openLightbox}
          dynamicImages={displayPhotos}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {/* Bottom Journey Banner */}
      <GalleryJourneyBanner />

      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />

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
    <section className="relative w-full overflow-hidden border-b border-stone-200/60 bg-[#0a2318]">
      <img
        src={galleryHeroImg}
        alt="Varkala Sunset Sanctuary"
        className="absolute inset-0 w-full h-full object-cover brightness-105 saturate-110 object-center md:object-right"
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2318]/80 via-[#0a2318]/50 to-[#0a2318]/25 md:bg-gradient-to-r md:from-[#0a2318]/80 md:via-[#0a2318]/45 md:to-transparent" />

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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6 z-10">
        <div className="max-w-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs text-[#dfcaa9] text-[0.65rem] sm:text-xs tracking-[0.25em] uppercase font-semibold border border-white/15 mb-3">
            Visual Sanctuary
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-[3rem] text-[#fbfbfa] tracking-tight leading-tight uppercase drop-shadow-sm">
            OUR GALLERY
          </h1>
          <p className="mt-2 font-serif text-base sm:text-xl text-[#fbfbfa]/95 font-medium leading-snug drop-shadow-sm">
            Moments of Healing, Learning and Transformation
          </p>
          <p className="mt-2.5 text-[#fbfbfa]/80 text-xs sm:text-sm leading-relaxed max-w-lg font-medium drop-shadow-sm">
            A glimpse into our sanctuary, yoga classes, authentic therapies, accommodation and the stunning coastline of Varkala.
          </p>
          <p
            className="mt-4 font-serif text-xs sm:text-sm tracking-[0.28em] uppercase"
            style={{
              color: "#D4AF37",
              fontWeight: 800,
              filter: "brightness(1.15) contrast(1.1)",
              textShadow: "0 0 12px rgba(212, 175, 55, 0.4), 0 2px 6px rgba(0, 0, 0, 0.75)",
            }}
          >
            HEAL &nbsp;•&nbsp; HARMONIZE &nbsp;•&nbsp; TRANSFORM
          </p>
        </div>

        <div className="md:text-right select-none flex flex-col items-start md:items-end justify-center">
          <p
            className="font-handwriting text-2xl sm:text-3xl md:text-4xl text-white leading-[1.12] -rotate-2 font-bold"
            style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.7), 0 0 12px rgba(0,0,0,0.4)" }}
          >
            Good People<br />
            Good Energy<br />
            Brighter Tomorrows
          </p>
        </div>
      </div>
    </section>
  );
}

// ── 2. Showcase Section (Grouped by Category) ──────────────────────────────────

function DynamicGallerySection({
  openLightbox,
  dynamicImages,
  onSelectCategory,
}: {
  openLightbox: (images: GalleryPhoto[], idx: number, title: string) => void;
  dynamicImages: GalleryPhoto[];
  onSelectCategory: (cat: string) => void;
}) {
  const getCatImages = useCallback(
    (cat: string): GalleryPhoto[] => {
      return dynamicImages.filter(
        (img) => (img.category || "").trim().toLowerCase() === cat.trim().toLowerCase()
      );
    },
    [dynamicImages]
  );

  const nonAcImages = getCatImages("Deluxe Non-AC Room");
  const acImages = getCatImages("Deluxe AC Room");
  const hasAccommodation = nonAcImages.length > 0 || acImages.length > 0;

  const distinctCategories = useMemo(() => {
    const set = new Set<string>();
    dynamicImages.forEach((img) => {
      const c = (img.category || "General").trim();
      set.add(c);
    });

    const categories: string[] = [];
    const lowerSet = new Set(Array.from(set).map((c) => c.toLowerCase()));

    if (lowerSet.has("our centre")) categories.push("Our Centre");
    if (lowerSet.has("yoga & wellness")) categories.push("Yoga & Wellness");
    if (lowerSet.has("wellness & therapies")) categories.push("Wellness & Therapies");
    if (hasAccommodation) categories.push("Our Accommodation");
    if (lowerSet.has("certifications & training")) categories.push("Certifications & Training");
    if (lowerSet.has("local experiences & excursions")) categories.push("Local Experiences & Excursions");

    set.forEach((cat) => {
      const lower = cat.toLowerCase();
      if (
        lower !== "our centre" &&
        lower !== "yoga & wellness" &&
        lower !== "wellness & therapies" &&
        lower !== "deluxe ac room" &&
        lower !== "deluxe non-ac room" &&
        lower !== "our accommodation" &&
        lower !== "certifications & training" &&
        lower !== "local experiences & excursions"
      ) {
        categories.push(cat);
      }
    });

    return categories;
  }, [dynamicImages, hasAccommodation]);

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {distinctCategories.map((catName) => {
          if (catName === "Our Accommodation") {
            return (
              <DynamicAccommodationCard
                key="Our Accommodation"
                openLightbox={openLightbox}
                dynamicAcImages={acImages}
                dynamicNonAcImages={nonAcImages}
                onSelectCategory={onSelectCategory}
              />
            );
          }

          const catPhotos = getCatImages(catName);
          if (catPhotos.length === 0) return null;

          return (
            <DynamicStandardCategoryCard
              key={catName}
              category={catName}
              photos={catPhotos}
              openLightbox={openLightbox}
              onSelectCategory={onSelectCategory}
            />
          );
        })}
      </div>
    </section>
  );
}

// ── 3. Standard Category Card (Showcase) ──────────────────────────────────────

function DynamicStandardCategoryCard({
  category,
  photos,
  openLightbox,
  onSelectCategory,
}: {
  category: string;
  photos: GalleryPhoto[];
  openLightbox: (images: GalleryPhoto[], idx: number, title: string) => void;
  onSelectCategory: (cat: string) => void;
}) {
  const meta = getCategoryMeta(category);
  const IconComponent = meta.icon;
  const mainImage = photos[0];
  const isExcursions = category.toLowerCase().includes("excursions");

  // On mobile show up to 3 thumbnails, on tablet/desktop up to 4 or 5
  const maxThumbnails = isExcursions ? 5 : 4;
  const thumbnails = photos.slice(1, maxThumbnails + 1);
  const remainingCount = Math.max(0, photos.length - (maxThumbnails + 1));

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-4 sm:p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div>
        {/* Card Header (Responsive, no text collision on mobile) */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-4">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#143d2c] flex items-center justify-center text-white flex-shrink-0 shadow-xs mt-0.5">
              <IconComponent className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif font-bold text-sm sm:text-base text-[#143d2c] tracking-wider uppercase truncate">
                  {category}
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug line-clamp-2">
                {meta.subtitle}
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right flex-shrink-0 pl-10 sm:pl-0">
            <p className="font-serif italic text-xs leading-tight text-[#8c5a2c] whitespace-pre-line hidden sm:block">
              {meta.tagline}
            </p>
          </div>
        </div>

        {/* Main Featured Photo (16:10 aspect, responsive on all devices) */}
        {mainImage && (
          <div
            onClick={() => openLightbox(photos, 0, category)}
            className="aspect-[16/10] sm:aspect-[16/9] w-full rounded-xl overflow-hidden cursor-pointer group relative bg-stone-100 shadow-2xs"
          >
            <ImageWithFallback
              src={mainImage.image}
              alt={mainImage.name || category}
              className="group-hover:scale-[1.03] transition-transform duration-500"
            />
            {/* Overlay Caption Chip */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 pt-6 flex items-end justify-between gap-2 pointer-events-none">
              <p className="font-serif text-xs sm:text-sm font-medium tracking-wide text-white drop-shadow-sm truncate">
                {mainImage.name || category}
              </p>
              <span className="shrink-0 text-[0.65rem] text-[#dfcaa9] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full border border-white/10 flex items-center gap-1">
                <Maximize2 className="w-2.5 h-2.5" />
                <span>Enlarge</span>
              </span>
            </div>
          </div>
        )}

        {/* Responsive Thumbnails Row */}
        {thumbnails.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-2.5 mt-2.5">
            {thumbnails.map((thumb, idx) => {
              const isLastTile = idx === thumbnails.length - 1 && remainingCount > 0;
              return (
                <div
                  key={thumb.id || idx}
                  onClick={() => openLightbox(photos, idx + 1, category)}
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-stone-100 relative shadow-2xs"
                  title={thumb.name}
                >
                  <ImageWithFallback
                    src={thumb.image}
                    alt={thumb.name || `${category} thumbnail ${idx + 1}`}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* "View More Images" overlay on the last thumbnail */}
                  {isLastTile ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(category);
                      }}
                      className="absolute inset-0 bg-[#0a2318]/85 backdrop-blur-2xs flex flex-col items-center justify-center text-white text-center p-1 hover:bg-[#0a2318]/95 transition-colors"
                    >
                      <span className="font-semibold text-xs sm:text-sm font-serif leading-tight">View More</span>
                      <span className="text-[0.6rem] text-emerald-200">Images</span>
                    </div>
                  ) : (
                    // Subtle title badge on hover
                    thumb.name && (
                      <div className="absolute inset-x-0 bottom-0 bg-black/70 p-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-center">
                        <p className="text-[0.55rem] text-white truncate">{thumb.name}</p>
                      </div>
                    )
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Button Row */}
      <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-stone-100 flex-wrap">
        <button
          type="button"
          onClick={() => onSelectCategory(category)}
          className="text-xs font-serif font-semibold text-[#143d2c] hover:underline cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span>View Grid</span>
        </button>

        <button
          type="button"
          onClick={() => openLightbox(photos, 0, category)}
          className="px-4 sm:px-6 py-2 rounded-full bg-[#143d2c] hover:bg-[#1c523b] text-white font-serif text-[0.62rem] sm:text-[0.68rem] tracking-[0.14em] sm:tracking-[0.16em] font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap ml-auto"
        >
          <span>VIEW ALL PHOTOS</span>
          <span>→</span>
        </button>
      </div>
    </article>
  );
}

// ── 4. Accommodation Card (Showcase) ──────────────────────────────────────────

function DynamicAccommodationCard({
  openLightbox,
  dynamicAcImages,
  dynamicNonAcImages,
  onSelectCategory,
}: {
  openLightbox: (images: GalleryPhoto[], idx: number, title: string) => void;
  dynamicAcImages: GalleryPhoto[];
  dynamicNonAcImages: GalleryPhoto[];
  onSelectCategory: (cat: string) => void;
}) {
  const [activeTab, setActiveTab] = useState<"ac" | "non-ac">(
    dynamicAcImages.length > 0 ? "ac" : "non-ac"
  );

  const allAccommodationImages = useMemo(
    () => [...dynamicAcImages, ...dynamicNonAcImages],
    [dynamicAcImages, dynamicNonAcImages]
  );

  const activePhotos = activeTab === "ac" ? dynamicAcImages : dynamicNonAcImages;
  const activeTitle =
    activeTab === "ac"
      ? "Accommodation — Deluxe AC Room"
      : "Accommodation — Deluxe Non-AC Room";

  const acFeatured = dynamicAcImages[0];
  const nonAcFeatured = dynamicNonAcImages[0];

  const activeThumbnails = activePhotos.slice(1, 5);
  const remainingCount = Math.max(0, activePhotos.length - 5);

  return (
    <article className="bg-white rounded-2xl border border-stone-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.03)] p-4 sm:p-6 flex flex-col justify-between hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
      <div>
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-3 mb-4">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#143d2c] flex items-center justify-center text-white flex-shrink-0 shadow-xs mt-0.5">
              <BedDouble className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif font-bold text-sm sm:text-base text-[#143d2c] tracking-wider uppercase">
                  OUR ACCOMMODATION
                </h2>
              </div>
              <p className="text-xs text-stone-500 mt-0.5 leading-snug line-clamp-2">
                Comfortable stays for rest, relaxation, and rejuvenation.
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right flex-shrink-0 pl-10 sm:pl-0">
            <p className="font-serif italic text-xs leading-tight text-[#8c5a2c] hidden sm:block">
              Simple Stays<br />Deeper Rest
            </p>
          </div>
        </div>

        {/* Room Tab Switcher */}
        <div className="flex items-center gap-2 mb-3 bg-stone-100/90 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("ac")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-serif font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "ac"
                ? "bg-[#143d2c] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span>Deluxe AC Room</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("non-ac")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-serif font-semibold tracking-wide transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "non-ac"
                ? "bg-[#143d2c] text-white shadow-xs"
                : "text-stone-600 hover:text-stone-900"
            }`}
          >
            <span>Deluxe Non-AC Room</span>
          </button>
        </div>

        {/* Room Previews: Responsive 1 col on mobile, 2 col on tablet/desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Deluxe AC Room */}
          {acFeatured && (
            <div
              onClick={() => {
                setActiveTab("ac");
                openLightbox(dynamicAcImages, 0, "Accommodation — Deluxe AC Room");
              }}
              className={`cursor-pointer rounded-xl p-1.5 transition-all ${
                activeTab === "ac"
                  ? "ring-2 ring-[#143d2c]/80 bg-emerald-50/60 shadow-xs"
                  : "hover:bg-stone-50 border border-stone-200/60"
              }`}
            >
              <div className="aspect-[16/11] w-full rounded-lg overflow-hidden group relative bg-stone-100">
                <ImageWithFallback
                  src={acFeatured.image}
                  alt={acFeatured.name || "Deluxe AC Room"}
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between mt-1.5 px-1">
                <p className="font-serif text-xs text-stone-900 font-bold truncate">
                  {acFeatured.name || "Deluxe AC Room"}
                </p>
                <span className="text-[0.65rem] text-[#143d2c] font-semibold hover:underline shrink-0 ml-1">
                  View →
                </span>
              </div>
            </div>
          )}

          {/* Deluxe Non-AC Room */}
          {nonAcFeatured && (
            <div
              onClick={() => {
                setActiveTab("non-ac");
                openLightbox(dynamicNonAcImages, 0, "Accommodation — Deluxe Non-AC Room");
              }}
              className={`cursor-pointer rounded-xl p-1.5 transition-all ${
                activeTab === "non-ac"
                  ? "ring-2 ring-[#143d2c]/80 bg-emerald-50/60 shadow-xs"
                  : "hover:bg-stone-50 border border-stone-200/60"
              }`}
            >
              <div className="aspect-[16/11] w-full rounded-lg overflow-hidden group relative bg-stone-100">
                <ImageWithFallback
                  src={nonAcFeatured.image}
                  alt={nonAcFeatured.name || "Deluxe Non-AC Room"}
                  className="group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between mt-1.5 px-1">
                <p className="font-serif text-xs text-stone-900 font-bold truncate">
                  {nonAcFeatured.name || "Deluxe Non-AC Room"}
                </p>
                <span className="text-[0.65rem] text-[#143d2c] font-semibold hover:underline shrink-0 ml-1">
                  View →
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Accommodation Thumbnails Preview */}
        {activeThumbnails.length > 0 && (
          <div className="grid grid-cols-4 gap-2 mt-3">
            {activeThumbnails.map((thumb, idx) => {
              const isLastTile = idx === activeThumbnails.length - 1 && remainingCount > 0;
              return (
                <div
                  key={thumb.id || idx}
                  onClick={() => openLightbox(activePhotos, idx + 1, activeTitle)}
                  className="aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group bg-stone-100 relative shadow-2xs"
                  title={thumb.name}
                >
                  <ImageWithFallback
                    src={thumb.image}
                    alt={thumb.name || `${activeTitle} photo ${idx + 1}`}
                    className="group-hover:scale-105 transition-transform duration-500"
                  />
                  {isLastTile && (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(
                          activeTab === "ac" ? "Deluxe AC Room" : "Deluxe Non-AC Room"
                        );
                      }}
                      className="absolute inset-0 bg-[#0a2318]/85 backdrop-blur-2xs flex flex-col items-center justify-center text-white text-center p-1 hover:bg-[#0a2318]/95 transition-colors"
                    >
                      <span className="font-semibold text-xs font-serif leading-tight">View More</span>
                      <span className="text-[0.55rem] text-emerald-200">Images</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2 pt-4 mt-4 border-t border-stone-100 flex-wrap">
        <button
          type="button"
          onClick={() =>
            onSelectCategory(activeTab === "ac" ? "Deluxe AC Room" : "Deluxe Non-AC Room")
          }
          className="text-xs font-serif font-semibold text-[#143d2c] hover:underline cursor-pointer flex items-center gap-1 shrink-0"
        >
          <span>View Grid</span>
        </button>

        <button
          type="button"
          onClick={() => openLightbox(activePhotos, 0, activeTitle)}
          className="px-4 sm:px-6 py-2 rounded-full bg-[#143d2c] hover:bg-[#1c523b] text-white font-serif text-[0.62rem] sm:text-[0.68rem] tracking-[0.14em] sm:tracking-[0.16em] font-semibold flex items-center gap-1.5 transition-all shadow-xs active:scale-95 cursor-pointer whitespace-nowrap ml-auto"
        >
          <span>{activeTab === "ac" ? "VIEW DELUXE AC →" : "VIEW DELUXE NON-AC →"}</span>
        </button>
      </div>
    </article>
  );
}

// ── 5. Category Full Grid View (When a Category is Selected) ──────────────────

function CategoryFullGridView({
  category,
  photos,
  openLightbox,
  onResetFilter,
}: {
  category: string;
  photos: GalleryPhoto[];
  openLightbox: (images: GalleryPhoto[], idx: number, title: string) => void;
  onResetFilter: () => void;
}) {
  const meta = getCategoryMeta(category);
  const IconComponent = meta.icon;

  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Category Info Header with Back Button */}
      <div className="bg-white rounded-2xl border border-stone-200/80 p-5 sm:p-7 mb-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#143d2c] flex items-center justify-center text-white shrink-0 shadow-xs">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-[#143d2c] uppercase tracking-wide">
                  {category}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 mt-1 max-w-2xl leading-relaxed">
                {meta.subtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onResetFilter}
              className="px-4 py-2 rounded-xl text-xs font-serif font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Categories</span>
            </button>
            <button
              type="button"
              onClick={() => openLightbox(photos, 0, category)}
              className="px-4 py-2 rounded-xl text-xs font-serif font-semibold text-white bg-[#143d2c] hover:bg-[#1c523b] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Slideshow</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid of ALL Photos in this Category (Responsive: 2 cols on mobile, 3 tablet, 4 desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {photos.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => openLightbox(photos, index, category)}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-stone-100 shadow-2xs hover:shadow-md transition-all duration-300"
          >
            <ImageWithFallback
              src={item.image}
              alt={item.name || `${category} photo ${index + 1}`}
              className="group-hover:scale-105 transition-transform duration-500"
            />

            {/* Hover / Touch Caption Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-white text-xs sm:text-sm font-serif font-medium drop-shadow-sm truncate">
                {item.name || `${category} moment`}
              </p>
              <span className="text-[0.62rem] text-[#dfcaa9] mt-0.5 flex items-center gap-1">
                <Maximize2 className="w-2.5 h-2.5" />
                <span>Click to view</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 6. All Photos Grid View (Continuous Grid for All Images) ──────────────────

function AllPhotosGridView({
  photos,
  openLightbox,
}: {
  photos: GalleryPhoto[];
  openLightbox: (images: GalleryPhoto[], idx: number, title: string) => void;
}) {
  return (
    <section className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="font-serif font-bold text-lg sm:text-xl text-[#143d2c]">
            All Sanctuary Moments
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">
            Arranged neatly across all practices, therapies, accommodation and excursions
          </p>
        </div>
        <button
          type="button"
          onClick={() => openLightbox(photos, 0, "All Sanctuary Moments")}
          className="px-4 py-2 rounded-xl text-xs font-serif font-semibold text-white bg-[#143d2c] hover:bg-[#1c523b] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span>Start Slideshow</span>
        </button>
      </div>

      {/* Fully Responsive Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
        {photos.map((item, index) => (
          <div
            key={item.id || index}
            onClick={() => openLightbox(photos, index, item.category || "Sanctuary Moments")}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-stone-100 shadow-2xs hover:shadow-md transition-all duration-300"
          >
            <ImageWithFallback
              src={item.image}
              alt={item.name || `Gallery photo ${index + 1}`}
              className="group-hover:scale-105 transition-transform duration-500"
            />

            {/* Category tag chip */}
            <div className="absolute top-2 left-2 pointer-events-none">
              <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[0.6rem] font-serif tracking-wide border border-white/10">
                {item.category}
              </span>
            </div>

            {/* Hover Caption */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
              <p className="text-white text-xs sm:text-sm font-serif font-medium drop-shadow-sm truncate">
                {item.name || item.category}
              </p>
              <span className="text-[0.62rem] text-[#dfcaa9] mt-0.5 flex items-center gap-1">
                <Maximize2 className="w-2.5 h-2.5" />
                <span>Click to enlarge</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 7. Bottom Journey Banner ──────────────────────────────────────────────────

function GalleryJourneyBanner() {
  return (
    <section className="relative w-full bg-[#0a2318] text-white overflow-hidden py-14 sm:py-20 px-4 sm:px-8">
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

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="text-center md:text-left flex-1 md:pl-12 lg:pl-20">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[2.6rem] text-[#fbfbfa] font-normal tracking-wide">
            Your Journey in Pictures
          </h2>
          <p className="mt-2.5 font-serif text-xs sm:text-sm text-[#cbd8d0] tracking-[0.22em] uppercase font-light">
            People &nbsp;•&nbsp; Practices &nbsp;•&nbsp; Places &nbsp;•&nbsp; Possibilities
          </p>
        </div>

        <div className="text-center md:text-right select-none shrink-0">
          <p className="font-handwriting text-2xl sm:text-4xl text-[#dfcaa9] leading-[1.08] -rotate-4 font-medium drop-shadow-sm">
            Collect<br />
            Moments<br />
            Not Things
          </p>
          <div className="w-20 sm:w-24 h-1 mx-auto md:ml-auto mt-2 border-b-2 border-[#dfcaa9]/40 -rotate-3" />
        </div>
      </div>
    </section>
  );
}

// ── 8. Interactive Lightbox (Mobile & Desktop Perfected) ───────────────────────

function Lightbox({
  images,
  currentIndex,
  title,
  onClose,
  onNext,
  onPrev,
  onNavigate,
}: {
  images: GalleryPhoto[];
  currentIndex: number;
  title: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onNavigate: (index: number) => void;
}) {
  const currentItem = images[currentIndex];
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll the active thumbnail into view
  useEffect(() => {
    if (thumbnailsRef.current) {
      const activeBtn = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [currentIndex]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current !== null && touchEndXRef.current !== null) {
      const distance = touchStartXRef.current - touchEndXRef.current;
      const isSwipe = Math.abs(distance) > 50;
      if (isSwipe) {
        if (distance > 0) {
          // Swiped left → Next photo
          onNext();
        } else {
          // Swiped right → Prev photo
          onPrev();
        }
      }
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  if (!currentItem) return null;

  const currentSrc = currentItem.image;
  const currentName = currentItem.name || "";

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#07130e]/98 backdrop-blur-md animate-fade-in select-none"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} photo gallery`}
    >
      {/* ── Top Bar ── */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shrink-0 border-b border-white/10 bg-black/30">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
          <p className="font-serif text-xs tracking-[0.2em] text-[#dfcaa9] uppercase font-semibold shrink-0">
            {title}
          </p>
          <span className="text-white/30 hidden sm:inline">•</span>
          <span className="text-white/90 text-xs sm:text-sm font-sans font-medium truncate hidden sm:inline">
            {currentName}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/80 text-[0.65rem] shrink-0 font-sans">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/15 transition-all cursor-pointer shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Main Display Image (With Touch Swipe Support) ── */}
      <div
        className="flex-1 flex flex-col items-center justify-center relative px-3 sm:px-16 py-2 min-h-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Button (Cleanly positioned on desktop & mobile) */}
        {images.length > 1 && (
          <button
            onClick={onPrev}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 bg-black/40 sm:bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Center Image Container — Preserves Original Proportions 100% */}
        <div className="relative max-w-full max-h-full flex flex-col items-center justify-center p-1 sm:p-2">
          <img
            key={currentIndex}
            src={resolveImageUrl(currentSrc)}
            alt={currentName || `${title} — photo ${currentIndex + 1} of ${images.length}`}
            className="max-w-full max-h-[68vh] sm:max-h-[76vh] object-contain rounded-lg sm:rounded-xl shadow-2xl transition-all duration-300"
          />

          {currentName && (
            <div className="mt-2 text-center bg-black/60 backdrop-blur-xs px-3 sm:px-4 py-1 rounded-full border border-white/10 max-w-[90%]">
              <p className="text-white/95 text-xs sm:text-sm font-serif tracking-wide truncate">
                {currentName}
              </p>
            </div>
          )}
        </div>

        {/* Next Button */}
        {images.length > 1 && (
          <button
            onClick={onNext}
            aria-label="Next photo"
            className="absolute right-2 sm:right-4 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white transition-all hover:scale-105 active:scale-95 bg-black/40 sm:bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-xs cursor-pointer"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}
      </div>

      {/* ── Thumbnails Strip (Auto-scrolls to active photo) ── */}
      {images.length > 1 && (
        <div
          ref={thumbnailsRef}
          className="shrink-0 flex gap-2 items-center justify-start sm:justify-center overflow-x-auto px-4 py-2.5 sm:py-3 border-t border-white/10 bg-black/30 scrollbar-none"
        >
          {images.map((item, i) => {
            const itemSrc = resolveImageUrl(item.image);
            const itemName = item.name || "";
            const isActive = i === currentIndex;
            return (
              <button
                key={item.id || i}
                onClick={() => onNavigate(i)}
                aria-label={`View photo ${i + 1}`}
                title={itemName}
                className={`w-12 h-9 sm:w-14 sm:h-10 shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-[#dfcaa9] opacity-100 scale-105 shadow-md ring-2 ring-[#dfcaa9]/50"
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
