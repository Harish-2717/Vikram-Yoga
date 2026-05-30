import { createFileRoute } from "@tanstack/react-router";
import retreat from "@/assets/retreat.jpg";
import gImg1 from "@/assets/g-img1.jpeg";
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
  const imgs = [
    { src: gImg1, span: "h-64 md:col-span-2 md:row-span-2 md:h-[34rem]" },
    { src: gImg2, span: "col-span-1 h-64 md:h-[16.5rem]" },
    { src: gImg3, span: "col-span-1 h-64 md:h-[16.5rem]" },
    { src: gImg4, span: "col-span-1 h-64 md:h-[16.5rem]" },
    { src: gImg5, span: "col-span-1 h-64 md:h-[16.5rem]" },
    { src: gImg6, span: "col-span-1 md:col-span-2 h-64" },
    { src: gImg7, span: "col-span-1 h-64" },
    { src: gImg8, span: "col-span-1 h-64" },
    { src: gImg9, span: "col-span-1 md:col-span-2 h-64" },
    { src: gImg10, span: "col-span-1 h-64" },
    { src: gImg11, span: "col-span-1 h-64" },
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          {imgs.map((img, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl group shadow-soft ${img.span}`}>
              <img
                src={img.src}
                alt={`Sanctuary moment ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-emerald-deep/0 group-hover:bg-emerald-deep/40 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
