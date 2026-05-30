import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";
import classes from "@/assets/classes.jpg";
import training100h from "@/assets/training_100h.png";
import training200hStd from "@/assets/training_200h_std.png";
import training200hLux from "@/assets/training_200h_lux.png";
import training300h from "@/assets/training_300h.png";

export const Route = createFileRoute("/certificate-courses")({
  component: CoursesPage,
  head: () => ({
    meta: [
      { title: "Certificate Courses — Dr. Vikram Yoga & Wellness Centre" },
    ],
  }),
});

function CoursesPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Certificate Courses"
        subtitle="Become a guide. Carry the wisdom forward."
        bg={classes}
      />
      <CoursesSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function CoursesSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleOpen = (i: number) => {
    setOpenIdx(openIdx === i ? null : i);
  };

  const items = [
    {
      t: "Holistic Wellness & Therapeutic Retreat Experience in Kerala",
      prices: ["Shared Room: € 699", "Private Room: € 1099"],
      days: "15 Days",
      level: "Beginner Level",
      roomTypes: "2 Shared, Private Room",
      img: training100h
    },
    {
      t: "Holistic Wellness & Therapeutic Retreat Experience in Kerala",
      prices: ["Shared Room: € 849", "Private Room: € 1099"],
      days: "21 Days",
      level: "Beginner Level",
      roomTypes: "2 Shared, Private Room",
      img: training200hStd
    },
    {
      t: "Holistic Wellness & Therapeutic Retreat Experience in Kerala",
      prices: ["Luxury Private Room: € 1500"],
      days: "21 Days",
      level: "Beginner Level",
      roomTypes: "2 Shared, Private Room",
      img: training200hLux
    },
    {
      t: "Holistic Wellness & Therapeutic Retreat Experience in Kerala",
      prices: ["Shared Room: € 1049", "Private Room: € 1399"],
      days: "28 Days",
      level: "Advance Level",
      roomTypes: "2 Shared, Private Room",
      img: training300h
    },
  ];

  return (
    <section className="py-20 bg-[#FDF5EC]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-10 text-sm md:text-base text-gray-800 leading-relaxed space-y-4">
          <p>
            Currently at Dr. Vikram Yoga & Wellness Centre we offer 100 hour, 200 hour, and 300 hour Yoga Teacher Training programs as a curriculum for our students. Our lessons are aimed at presenting multiple styles of yoga including Hatha, Ashtanga, Yin, and Restorative Yoga. This diverse training makes you versatile with your understanding of yoga to enable you to effectively train and confidently.
          </p>
        </div>
        <div className="space-y-6 flex flex-col md:w-11/12 mx-auto">
          {items.map((c, i) => (
            <div key={i} className="flex flex-col-reverse md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group">
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                <div>
                  <h3 className="text-[1.35rem] font-bold text-gray-800">{c.t}</h3>
                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${openIdx === i ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    <hr className="border-gray-200 mb-6" />
                    <div className="flex flex-wrap gap-2 mb-6">
                      {c.prices.map((p, idx) => (
                        <span key={idx} className="bg-[#596057] text-white text-xs font-medium px-4 py-2 shrink-0 rounded-md">
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1.5 text-sm text-gray-800 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <p><strong>Days:</strong> {c.days}</p>
                      <p><strong>Level:</strong> {c.level}</p>
                      <p><strong>Room Types:</strong> {c.roomTypes}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-2">
                  <button
                    onClick={() => toggleOpen(i)}
                    className="flex items-center justify-center gap-2 w-full text-center bg-[#E57624] hover:bg-[#D56B1E] text-white py-3 rounded-md text-sm font-semibold transition-colors outline-none"
                  >
                    {openIdx === i ? "Hide Course Details" : "Read Course Details"}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${openIdx === i ? "rotate-180" : ""}`} />
                  </button>

                  {openIdx === i && (
                    <a href="/contact" className="mt-3 flex items-center justify-center w-full text-center border-2 border-[#E57624] text-[#E57624] hover:bg-[#E57624] hover:text-white py-2.5 rounded-md text-sm font-semibold transition-colors">
                      Book This Course
                    </a>
                  )}
                </div>
              </div>
              <div className="md:w-72 lg:w-[22rem] h-64 md:h-auto relative shrink-0">
                <img src={c.img} alt={c.t} className="absolute inset-0 w-full h-full object-cover object-[center_80%] group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[0.65rem] font-bold tracking-[0.15em] uppercase text-[#E57624] shadow-md border border-[#E57624]/20">
                  Therapy Course
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="/contact" className="px-7 py-3 bg-[#596057] text-white text-sm font-semibold hover:bg-opacity-90 transition-colors">
            Register Course With Us
          </a>
          <a href="/contact" className="px-7 py-3 bg-[#E57624] text-white text-sm font-semibold hover:bg-opacity-90 transition-colors">
            Have A Query For Us?
          </a>
        </div>
      </div>
    </section>
  );
}
