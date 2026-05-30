import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
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

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: "Gallery — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Explore the visual sanctuary of Dr. Vikram Yoga & Wellness Centre." },
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

  const imgs = [
    gImg1, gImg2, gImg3, gImg4, gImg5,
    gImg6, gImg7, gImg8, gImg9, gImg10, gImg11,
    ex1, ex2, ex3, ex4, ex5, ex6, ex7
  ];

  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">GALLERY</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">
            Moments from the <em className="text-gold-gradient not-italic">sanctuary</em>.
          </h2>
          <div className="gold-divider mt-8 max-w-sm mx-auto" />
        </div>

        {/* Uniform Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {imgs.map((src, i) => (
            <div
              key={i}
              onClick={() => setSelectedImg(src)}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl group shadow-soft cursor-pointer"
            >
              <img
                src={src}
                alt={`Sanctuary moment ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-emerald-deep/0 group-hover:bg-emerald-deep/20 transition-colors" />
            </div>
          ))}
        </div>
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
