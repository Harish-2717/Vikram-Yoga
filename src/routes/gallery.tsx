import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import retreat from "@/assets/retreat.jpg";
import gImg1 from "@/assets/g-img1.jpg";
import gImg2 from "@/assets/g-img2.jpeg";
import gImg3 from "@/assets/g-img3.jpeg";
import gImg4 from "@/assets/g-img4.jpeg";
import gImg5 from "@/assets/g-img5.jpeg";
import gImg6 from "@/assets/g-img6.jpeg";
import gImg7 from "@/assets/g-img7.jpeg";
import gImg8 from "@/assets/g-img8.jpeg";
import gImg9 from "@/assets/g-img9.jpeg";
import gImg10 from "@/assets/g-img10.jpeg";
import gImg11 from "@/assets/g-img11.jpeg";
import ex1 from "@/assets/images/extra-gallery-1.jpeg";
import ex2 from "@/assets/images/extra-gallery-2.jpeg";
import ex3 from "@/assets/images/extra-gallery-3.jpeg";
import ex4 from "@/assets/images/extra-gallery-4.jpeg";
import ex5 from "@/assets/images/extra-gallery-5.jpeg";
import ex6 from "@/assets/images/extra-gallery-6.jpeg";
import ex7 from "@/assets/images/extra-gallery-7.jpeg";

import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";
import { getApiUrl } from "@/lib/utils";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content: "Explore the visual sanctuary of Dr. Vikram Yoga & Wellness Centre.",
      },
    ],
  }),
});

function GalleryPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Our Sanctuary"
        subtitle="A visual journey through spaces crafted for deep healing, restorative stillness, and conscious awakening."
        bg={galleryHero}
      />
      <GallerySection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

// Just using standard hero for gallery page hero background
const galleryHero = retreat;

function GallerySection() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    fetch(getApiUrl("gallery-images.php"))
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch gallery images");
        return res.json();
      })
      .then((data) => {
        setImages(data || []);
      })
      .catch((err) => {
        console.error("Error fetching gallery images:", err);
        setHasError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const fallbackImgs = [
    { name: "Retreat Sanctuary", image: retreat },
    { name: "Yoga Group Session", image: gImg1 },
    { name: "Sunrise Yoga Practice", image: gImg2 },
    { name: "Meditation on the Deck", image: gImg3 },
    { name: "Pranayama Breathing", image: gImg4 },
    { name: "Sunset Yoga Session", image: gImg5 },
    { name: "Holistic Healing Space", image: gImg6 },
    { name: "Ayurvedic Massage Therapy", image: gImg7 },
    { name: "Shiatsu Treatment", image: gImg8 },
    { name: "Thai Yoga Massage", image: gImg9 },
    { name: "Meditation in Nature", image: gImg10 },
    { name: "Beach Sunset Meditation", image: gImg11 },
    { name: "Varkala Beach Walk", image: ex1 },
    { name: "Local Cultural Excursion", image: ex2 },
    { name: "Ancient Temple Exploration", image: ex3 },
    { name: "Sunset Gathering", image: ex4 },
    { name: "Traditional Ritual Ceremony", image: ex5 },
    { name: "Mindful Nature Trail", image: ex6 },
    { name: "Sanskrit Chanting Session", image: ex7 },
  ];

  const displayImages = hasError ? fallbackImgs : images;

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">
            GALLERY
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">
            Moments from the <em className="text-gold-gradient not-italic">sanctuary</em>.
          </h2>
          <div className="gold-divider mt-8 max-w-sm mx-auto" />
        </div>

        {loading && images.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep"></div>
          </div>
        ) : (
          /* Uniform Grid Layout */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayImages.map((item, i) => (
              <div
                key={item.id || i}
                onClick={() => setSelectedImg(item.image)}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl group shadow-soft cursor-pointer"
              >
                <img
                  src={item.image}
                  alt={item.name || `Sanctuary moment ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                {/* Show the name overlay on hover for better interaction */}
                <div className="absolute inset-0 bg-[#08120d]/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <span className="text-white font-serif-display text-xs tracking-wider translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {item.name || `Moment ${i + 1}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedImg(null)}
        >
          <button
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
            onClick={() => setSelectedImg(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImg}
            alt="Expanded view"
            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
