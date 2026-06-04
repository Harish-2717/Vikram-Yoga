import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import hero from "@/assets/hero.jpg";
import founder from "@/assets/founder.jpg";
import about from "@/assets/about.png";
import therapy from "@/assets/therapy.jpg";
import retreat from "@/assets/retreat.jpg";
import classes from "@/assets/classes.jpg";
import training100h from "@/assets/training_100h.png";
import training200hStd from "@/assets/training_200h_std.png";
import training200hLux from "@/assets/training_200h_lux.png";
import training300h from "@/assets/training_300h.png";
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

import varkalaBeach from "@/assets/varkala_beach.png";
import yogaLifestyle from "@/assets/yoga_lifestyle.png";
import retreatBanner from "@/assets/retreat_banner.png";
import healingAtmosphere from "@/assets/healing_atmosphere.png";
import testimonialBg from "@/assets/testimonial_bg.png";

import {
  Phone, Mail, MapPin, Instagram, Facebook, Youtube,
  MessageCircle, ChevronDown, ChevronLeft, ChevronRight, Flower2, Sparkles, Heart, Leaf,
  Sun, Wind, Hand, Mountain, GraduationCap, Globe, Star, Quote, ArrowRight, Play
} from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat } from "./about";

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      { title: "Dr. Vikram Yoga & Wellness Centre — Heal • Harmonize • Transform" },
      { name: "description", content: "Holistic healing, yoga therapy, wellness retreats, and certification courses with Dr. S. Vikram Pandy. A premium sanctuary for transformation." },
      { property: "og:title", content: "Dr. Vikram Yoga & Wellness Centre" },
      { property: "og:description", content: "Heal • Harmonize • Transform — Holistic healing, therapeutic wellness, and transformative retreat experiences." },
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
      <WhyUs />
      <Benefits />
      <SocialFeed />
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
    { img: gImg1, label: "Healing Sessions", sub: "Holistic Wellness" },
    { img: gImg3, label: "Yoga Classes", sub: "Mind & Body" },
    { img: gImg7, label: "Therapeutic Bodywork", sub: "Restore & Recover" },
    { img: gImg9, label: "Wellness Retreats", sub: "Transform Deeply" },
    { img: about, label: "Serene Environment", sub: "Healing Sanctuary" },
    { img: gImg10, label: "Pranayama & Meditation", sub: "Inner Stillness" },
    { img: retreat, label: "Nature Retreats", sub: "Peace & Renewal" },
    { img: therapy, label: "Wellness Therapies", sub: "Therapeutic Touch" },
  ];

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setAnimating(true);
      setCurrent((c) => (c + 1) % slides.length);
      setTimeout(() => {
        setPrev(null);
        setAnimating(false);
      }, 1200);
    }, 4000);
    return () => clearInterval(interval);
  }, [current, slides.length]);

  const goTo = (idx: number) => {
    if (idx === current || animating) return;
    setPrev(current);
    setAnimating(true);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 1200);
  };

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-emerald-deep">
      {/* Stacked slides with crossfade */}
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: idx === current ? 1 : (idx === prev ? 0 : 0), zIndex: idx === current ? 2 : (idx === prev ? 1 : 0) }}
        >
          <img
            src={slide.img}
            alt={slide.label}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/80 via-emerald-deep/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/40 to-transparent" />
        </div>
      ))}

      {/* Caption */}
      <div className="absolute bottom-16 md:bottom-20 left-8 md:left-16 z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="h-px w-8 bg-gold/70" />
          <span className="text-gold font-serif-display text-[0.65rem] tracking-[0.35em] uppercase">
            {slides[current].sub}
          </span>
        </div>
        <h2
          key={current}
          className="font-display text-3xl md:text-5xl text-cream drop-shadow-xl leading-tight animate-fade-up"
        >
          {slides[current].label}
        </h2>
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`rounded-full transition-all duration-500 ${idx === current
                ? "w-7 h-1.5 bg-gold"
                : "w-1.5 h-1.5 bg-cream/40 hover:bg-cream/70"
              }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-6 right-8 z-10 font-serif-display text-[0.65rem] tracking-widest text-cream/60">
        <span className="text-gold">{String(current + 1).padStart(2, '0')}</span>
        <span className="mx-1">/</span>
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  const words = ["Transform", "Restore", "Awaken", "Flourish"];
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-cream overflow-hidden">
      <img src={hero} alt="Serene meditation in forest" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(8,18,13,0.95)_100%)]" />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 text-center max-w-7xl px-6 pb-12 md:pb-16 pt-24 md:pt-32 lg:pt-36 w-full">
        <div className="mb-4 md:mb-6 flex justify-center">
          <img
            src={logo}
            alt="Dr Vikram crest"
            className="h-32 md:h-48 lg:h-56 w-auto animate-float drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]"
          />
        </div>

        <h1 className="font-display text-4xl md:text-6xl lg:text-[5.5rem] font-bold text-balance leading-[1.1] drop-shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
          Dr. Vikram <br className="hidden md:block" />
          <span className="text-gold-gradient font-medium italic md:text-[4.5rem]">Yoga &amp; Wellness Centre</span>
        </h1>

        <p className="mt-4 md:mt-6 text-sm md:text-lg lg:text-xl text-cream max-w-5xl mx-auto font-light tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
          Holistic Healing • Therapeutic Wellness • Transformative Retreat Experiences
        </p>

        <div className="mt-4 md:mt-6 flex items-center justify-center gap-3 md:gap-5 px-4 font-serif-display text-[0.6rem] md:text-[0.75rem] tracking-[0.35em] md:tracking-[0.45em] text-gold uppercase text-center opacity-90 drop-shadow-md">
          <span className="hidden md:block h-px w-16 bg-gold/60" />
          Heal <span className="text-[1rem] shrink-0 leading-none text-gold mt-0.5">•</span> Harmonize <span className="text-[1rem] shrink-0 leading-none text-gold mt-0.5">•</span>{" "}
          <span className="inline-block transition-opacity duration-500 ease-in-out opacity-100">
            Transform
          </span>
          <span className="hidden md:block h-px w-16 bg-gold/60" />
        </div>

        <div className="mt-8 md:mt-10 mb-16 md:mb-8 flex flex-col items-center justify-center gap-3 md:gap-4 w-full">
          {/* Row 1 */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full">
            <Link to="/yoga" className="px-6 md:px-8 py-3 md:py-4 rounded-full bg-gold-gradient text-emerald-deep text-sm md:text-base font-semibold tracking-wider shadow-gold hover:scale-105 transition-transform">Join Our Classes</Link>
            <Link to="/retreats" className="px-6 md:px-8 py-3 md:py-4 rounded-full border border-gold/40 text-gold text-sm md:text-base font-semibold tracking-wider hover:bg-gold/15 hover:text-white transition-colors">Explore Retreats</Link>
          </div>
          {/* Row 2 */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full">
            <Link to="/wellness-therapy" className="px-6 md:px-8 py-3 md:py-4 rounded-full glass text-white text-sm md:text-base font-semibold tracking-wider hover:bg-gold/20 transition-colors">Book a Wellness Consultation</Link>
            <Link to="/certificate-courses" className="px-6 md:px-8 py-3 md:py-4 rounded-full glass text-white text-sm md:text-base font-semibold tracking-wider hover:bg-gold/20 transition-colors">Enroll in Certificate Courses</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/60">
        <span className="text-[0.6rem] tracking-[0.4em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </div>
    </section>
  );
}

/* ---------------- Welcome ---------------- */
function Welcome() {
  return (
    <section className="relative py-16 lg:py-20 bg-cream overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-emerald/5 blur-3xl rounded-full translate-y-1/3 -translate-x-1/4" />

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left Column: Text Content */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Flower2 className="w-4 h-4 text-gold" />
                <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">WELCOME</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.2rem] text-emerald-deep leading-tight text-balance">
                A holistic <em className="text-gold-gradient not-italic">healing sanctuary</em>.
              </h2>
              <div className="gold-divider my-5 max-w-[4rem]" />
            </div>

            <div className="text-muted-foreground text-[0.9rem] leading-relaxed space-y-3">
              <p className="text-emerald-deep font-medium text-base leading-snug">
                Welcome to Dr. Vikram Yoga & Wellness Centre, a holistic healing sanctuary where traditional yogic wisdom meets modern therapeutic wellness practices.
              </p>
              <p>
                Located in the serene coastal surroundings of Varkala, Trivandrum, Kerala, India, our centre offers a peaceful environment dedicated to natural healing, mindful living, and complete well-being.
              </p>

              {/* Highlight Box — clickable, opens About page */}
              <a href="/about" className="block p-4 rounded-2xl bg-emerald-deep/5 border border-emerald-deep/10 shadow-soft hover:shadow-md hover:bg-emerald-deep/10 hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center shadow-[0_4px_15px_rgba(212,175,55,0.3)] group-hover:shadow-[0_4px_20px_rgba(212,175,55,0.5)] transition-shadow shrink-0 mt-0.5">
                    <Sparkles className="w-4 h-4 text-emerald-deep" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h4 className="font-display text-xl font-bold text-emerald-deep group-hover:text-gold transition-colors capitalize">Led by Dr. S. Vikram Pandy</h4>
                      <ArrowRight className="w-5 h-5 text-emerald-deep/80 group-hover:text-gold transition-all shrink-0 font-bold" />
                    </div>
                    <p className="text-sm leading-relaxed text-emerald-deep font-medium group-hover:text-emerald-deep/90 transition-colors capitalize">
                      A naturopathy & yoga physician, internationally recognized yoga teacher, and therapeutic wellness consultant, integrating yoga therapy, meditation, pranayama, naturopathy, acupuncture-based wellness practices, rehabilitation support therapies, therapeutic bodywork, and holistic lifestyle guidance.
                    </p>
                  </div>
                </div>
              </a>

              <p>
                Whether you seek physical healing, emotional balance, stress relief, improved mobility, mental clarity, spiritual growth, or transformative wellness retreats, we guide you on a journey toward inner harmony, vitality, and long-term holistic wellness.
              </p>

              <p className="border-l-2 border-gold/40 pl-4 italic text-emerald-deep/80 text-sm">
                Our wellness programs and retreats are thoughtfully designed for individuals seeking authentic yoga experiences, therapeutic healing, mindful relaxation, and natural wellness practices in a peaceful and rejuvenating atmosphere.
              </p>
            </div>

            {/* CTA action */}
            <div className="pt-1">
              <a href="/services" className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-emerald hover:text-gold transition-colors group">
                Discover Our Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right Column: Imagery Collage */}
          <div className="relative lg:pl-10 mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gold/10 blur-[100px] rounded-full" />

            <div className="relative grid grid-cols-2 gap-3 items-center">
              {/* First Image - Tall */}
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-luxury animate-fade-up">
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/50 to-transparent z-10" />
                <img src={varkalaBeach} alt="Varkala Cliff Beach" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" loading="lazy" />
              </div>

              {/* Second Column - Two Stacked Images */}
              <div className="space-y-3 pt-12">
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-luxury animate-fade-up" style={{ animationDelay: '150ms' }}>
                  <img src={therapy} alt="Therapeutic wellness" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" loading="lazy" />
                </div>
                <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-luxury animate-fade-up" style={{ animationDelay: '300ms' }}>
                  <img src={retreat} alt="Natural healing" className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-1000" loading="lazy" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 lg:-left-6 right-6 lg:right-auto glass-dark rounded-2xl p-4 shadow-luxury border border-cream/10 z-20 animate-float hidden md:block">
              <div className="font-display text-2xl text-gold-gradient mb-0.5">Authentic</div>
              <div className="text-[0.6rem] tracking-[0.3em] uppercase text-cream/70">Healing Experience</div>
            </div>

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
          <img src={about} alt="Serene yoga studio" className="relative rounded-3xl shadow-luxury w-full h-[560px] object-cover" loading="lazy" />
          <div className="absolute bottom-4 right-4 md:-bottom-8 md:-right-4 lg:-right-12 glass-dark rounded-2xl px-8 py-6 shadow-luxury text-cream">
            <div className="font-display text-4xl text-gold-gradient">15+</div>
            <div className="text-xs tracking-[0.25em] uppercase text-cream/70 mt-1">Years of Healing</div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Flower2 className="w-4 h-4 text-gold" />
            <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">ABOUT THE CENTRE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-emerald-deep leading-tight text-balance">
            A sanctuary for <em className="text-gold-gradient not-italic">authentic healing</em> and conscious transformation.
          </h2>
          <div className="gold-divider my-8" />
          <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
            Dr. Vikram Yoga & Wellness Centre is a holistic sanctuary devoted to the ancient sciences of Yoga, Naturopathy, and Ayurveda. We weave together time-honored Eastern wisdom with refined contemporary care to nurture the body, calm the mind, and awaken the spirit.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed text-[0.95rem]">
            From therapeutic yoga and pranayama to bespoke wellness retreats, every experience is curated for those seeking lasting balance, vitality, and inner clarity.
          </p>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
              <div key={s.l} className="text-center sm:text-left">
                <div className="font-display text-3xl text-emerald">{s.n}</div>
                <div className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground mt-1">{s.l}</div>
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
            <img src={founder} alt="Dr. S. Vikram Pandy" className="w-full h-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-display text-3xl md:text-4xl drop-shadow-md">Dr. S. Vikram Pandy</div>
              <div className="text-[0.8rem] md:text-[0.85rem] tracking-[0.2em] font-medium uppercase text-gold mt-2 drop-shadow-md">Founder &middot; Yoga Therapist</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-5">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">MEET THE FOUNDER</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-balance">
            A lifelong devotion to <em className="text-gold-gradient not-italic">holistic healing</em>.
          </h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-cream/80 leading-relaxed">
            Dr. S. Vikram Pandy is a celebrated yoga therapist, naturopath, and wellness mentor whose practice spans more than a decade of dedicated study across India and beyond. His approach blends classical yogic disciplines — asana, pranayama, and meditation — with naturopathic protocols and therapeutic bodywork.
          </p>
          <p className="mt-4 text-cream/80 leading-relaxed">
            Under his guidance, the centre has become a trusted destination for seekers, professionals, and wellness enthusiasts seeking authentic healing, refined experience, and measurable transformation.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {["Yoga Therapy", "Naturopathy", "Pranayama", "Meditation", "Retreat Curation"].map((t) => (
              <span key={t} className="px-4 py-2 rounded-full glass text-xs tracking-[0.15em] uppercase text-cream/90">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Why Us ---------------- */
function WhyUs() {
  const items = [
    { icon: Heart, t: "Holistic Approach", d: "Integrating yoga, naturopathy, wellness therapies, and rehabilitation support." },
    { icon: Leaf, t: "Personalized Programs", d: "Personalized wellness programs tailored to individual needs and goals." },
    { icon: GraduationCap, t: "Master Guidance", d: "Internationally recognized yoga teacher and therapeutic wellness consultant." },
    { icon: Sparkles, t: "Authentic & Modern", d: "Authentic yoga practices combined with modern therapeutic wellness methods." },
    { icon: Globe, t: "Peaceful Environment", d: "Peaceful healing environment in Varkala, Kerala, India." },
    { icon: Hand, t: "Integrative Support", d: "Integrative wellness support for mobility, relaxation, posture correction, and recovery." },
    { icon: Sun, t: "Mind-Body Balance", d: "Yoga, meditation, pranayama, and mindful movement for complete balance." },
    { icon: Wind, t: "Natural Wellness", d: "Therapeutic bodywork and natural wellness approaches for long-term well-being." },
    { icon: Mountain, t: "Transformative Retreats", d: "Transformative wellness retreats designed for healing, relaxation, and self-discovery." },
    { icon: Heart, t: "Professional Care", d: "Professional, compassionate, and wellness-focused guidance." },
  ];
  return (
    <section className="min-h-screen flex items-center py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">WHY CHOOSE US</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">A Personalized Approach to <em className="text-black not-italic">Holistic Healing & Wellness</em></h2>
            <div className="gold-divider mt-8 mx-auto" />
          </div>
          <div className="mt-8 space-y-4 text-muted-foreground leading-relaxed text-[1rem] text-center md:text-justify">
            <p>
              At Dr. Vikram Yoga & Wellness Centre, we believe wellness is not a one-size-fits-all journey. Every individual is unique, and our approach is designed to provide personalized guidance, therapeutic support, and holistic healing experiences that nurture the body, mind, emotions, and overall lifestyle.
            </p>
            <p>
              By integrating traditional yogic wisdom with modern therapeutic wellness practices, we create a balanced and compassionate healing environment focused on long-term well-being, mindful living, and natural transformation.
            </p>
          </div>
        </div>
        <div className="mt-16 grid md:grid-cols-2 gap-y-10 gap-x-12 max-w-5xl mx-auto">
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

/* ---------------- Classes ---------------- */
function Classes() {
  const list = [
    { t: "Hatha Yoga", d: "A traditional and foundational style focused on classical postures, breath awareness, flexibility, and strength.", time: "Mon, Wed, Fri • 6:00 AM", img: gImg2 },
    { t: "Hatha Flow", d: "Traditional postures with smooth and mindful transitions between movements.", time: "Tue, Thu • 7:30 AM", img: gImg3 },
    { t: "Vinyasa Flow", d: "A dynamic and energizing style that synchronizes movement with breath.", time: "Mon, Wed, Fri • 6:00 PM", img: gImg4 },
    { t: "Yin Yoga", d: "Slow and meditative style focused on deep stretching, relaxation, and inner stillness.", time: "Weekends • 8:00 AM", img: gImg5 },
    { t: "Pranayama & Meditation", d: "Guided breathing and meditation practices designed to calm the nervous system.", time: "Daily • 5:30 AM", img: gImg10 },
    { t: "Therapeutic Sessions", d: "Personalized sessions tailored to posture correction, mobility, and stress management.", time: "By Appointment", img: gImg7 },
  ];
  return (
    <section id="classes" className="relative min-h-screen flex items-center py-28 bg-emerald-gradient text-cream overflow-hidden">
      <img src={yogaLifestyle} alt="Yoga lifestyle classes background" className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/60 to-emerald-deep/90" />
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">YOGA CLASSES</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">Practices for every <em className="text-gold-gradient not-italic">body &amp; breath</em>.</h2>
          <div className="gold-divider mt-8 mx-auto" />
          <p className="mt-6 text-cream/70 leading-relaxed text-sm">
            From dynamic Vinyasa to deeply restorative therapy sessions, our classes meet you exactly where you are. Each session honours alignment, breath, and intention — guiding you toward sustainable wellbeing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((c, i) => (
            <div key={c.t} className="group glass rounded-2xl overflow-hidden hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 flex flex-col">
              <div className="relative aspect-square overflow-hidden">
                <img src={c.img} alt={c.t} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-emerald-deep/20 group-hover:bg-transparent transition-colors duration-500" />
                <div className="absolute top-4 left-4 glass-dark rounded-full px-3 py-1.5 text-[0.65rem] tracking-[0.2em] uppercase text-gold">0{i + 1}</div>
              </div>
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <h3 className="font-display text-2xl text-cream">{c.t}</h3>
                <p className="mt-3 text-sm text-cream/70 leading-relaxed flex-1">{c.d}</p>
                <div className="mt-6 pt-5 border-t border-cream/10 flex items-center justify-between text-[0.65rem] tracking-[0.1em] text-gold/90 uppercase">
                  <span className="font-semibold">{c.time}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:-translate-x-1 duration-300" />
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
    { icon: Hand, t: "Thai Yoga Massage", d: "Assisted stretching and rhythmic compressions for flexibility and energy flow." },
    { icon: Wind, t: "Shiatsu Therapy", d: "Traditional Japanese pressure-point therapy along the body’s energy pathways." },
    { icon: Mountain, t: "Deep Tissue Therapy", d: "Focused treatment to release chronic muscular tension and fascial restrictions." },
    { icon: Leaf, t: "Ayurvedic Wellness Massage", d: "Traditional therapy utilizing herbal oils to support circulation and rejuvenation." },
    { icon: Flower2, t: "Swedish Massage", d: "Gentle and relaxing full-body massage with smooth flowing strokes." },
    { icon: Sun, t: "Reflexology Therapy", d: "Pressure-point therapy on hands and feet to harmonize body systems." },
  ];
  return (
    <section id="therapies" className="min-h-screen flex items-center py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-14 items-end mb-14">
          <div className="lg:col-span-2">
            <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">MASSAGE & WELLNESS THERAPIES</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance leading-tight">Therapeutic touch, <em className="text-gold-gradient not-italic">refined into ritual</em>.</h2>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Each treatment is delivered by certified therapists in serene private rooms, combining classical techniques with our signature standard of care.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group relative overflow-hidden rounded-2xl bg-card border border-border p-8 shadow-soft hover:shadow-luxury transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-gold/10 rounded-full blur-2xl group-hover:bg-gold/20 transition-colors" />
              <Icon className="w-9 h-9 text-emerald relative" strokeWidth={1.4} />
              <h3 className="mt-6 font-display text-2xl text-emerald-deep">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              <a href="/contact?interest=Wellness Therapy" className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-emerald hover:text-gold transition-colors">
                Book Session <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-16 relative rounded-3xl overflow-hidden h-72">
          <img src={healingAtmosphere} alt="Therapy ritual" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/90 via-emerald-deep/50 to-transparent" />
          <div className="relative h-full flex items-center px-10 lg:px-16 text-cream max-w-2xl">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">Crafted treatments for body & soul.</h3>
              <a href="/contact?interest=Wellness Therapy" className="mt-6 inline-flex px-6 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold">Book a Therapy</a>
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
    <section id="retreats" className="relative min-h-screen flex items-center py-32 text-cream overflow-hidden">
      <img src={retreatBanner} alt="Wellness retreat" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep via-emerald-deep/80 to-emerald-deep/30" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">WELLNESS RETREATS</span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-balance leading-[1.05]">Step away. <em className="text-gold-gradient not-italic">Come home</em> to yourself.</h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-cream/80 leading-relaxed max-w-lg">
            Immersive 3, 7, and 14-day retreats in nature — combining daily yoga, naturopathy, ayurvedic cuisine, and silent practice. Designed for deep reset and lasting transformation.
          </p>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-6 flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold hover:text-white transition-colors group"
          >
            {showDetails ? "Hide Details" : "To know more about Retreats"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${showDetails ? "rotate-180" : ""}`} />
          </button>

          <div className={`overflow-hidden transition-all duration-500 ${showDetails ? "max-h-[500px] opacity-100 mt-8" : "max-h-0 opacity-0"}`}>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { t: "7 & 14 Days", d: "Holistic Wellness" },
                { t: "Meditation", d: "Soulful Retreat" },
                { t: "Couples", d: "Shared Retreat" },
              ].map((r) => (
                <div key={r.t} className="glass rounded-2xl p-6 text-center">
                  <div className="font-display text-2xl text-gold">{r.t}</div>
                  <div className="text-[0.65rem] tracking-[0.3em] uppercase text-cream/70 mt-1">{r.d}</div>
                </div>
              ))}
            </div>
          </div>

          <a href="/contact?interest=Retreat" className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold transform hover:scale-105 transition-all">Reserve Your Retreat <ArrowRight className="w-3.5 h-3.5" /></a>
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
      img: training100h
    },
    {
      t: "200 Hour Yoga Teacher Training In Kerala",
      prices: ["Shared Room: € 849", "Private Room: € 1099"],
      days: "21 Days",
      level: "Beginner Level",
      roomTypes: "2 Shared, Private Room",
      img: training200hStd
    },
    {
      t: "200 Hour Yoga Teacher Training In Kerala",
      prices: ["Luxury Private Room: € 1500"],
      days: "21 Days",
      level: "Beginner Level",
      roomTypes: "2 Shared, Private Room",
      img: training200hLux
    },
    {
      t: "300 Hour Yoga Teacher Training In Kerala",
      prices: ["Shared Room: € 1049", "Private Room: € 1399"],
      days: "28 Days",
      level: "Advance Level",
      roomTypes: "2 Shared, Private Room",
      img: training300h
    },
  ];

  return (
    <section id="courses" className="min-h-screen flex items-center py-20 bg-[#FDF5EC]">
      <div className="max-w-4xl mx-auto px-6 w-full">
        <div className="text-center mb-10">
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">CERTIFICATION COURSES</span>
          <h2 className="mt-4 font-display text-4xl text-emerald-deep">Become a guide.</h2>
          <div className="gold-divider mt-4 mx-auto" />
        </div>

        <div className="mb-10 text-sm md:text-base text-gray-800 leading-relaxed text-center max-w-2xl mx-auto">
          <p>
            Currently at Dr. Vikram Yoga & Wellness Centre we offer 100 hour, 200 hour, and 300 hour Yoga Teacher Training programs as a curriculum for our students.
          </p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="mt-4 flex items-center justify-center gap-2 mx-auto text-xs font-semibold tracking-[0.2em] uppercase text-emerald hover:text-gold transition-colors"
          >
            {showDetails ? "Hide Additional Info" : "Additional Details of Courses"}
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className={`overflow-hidden transition-all duration-700 ${showDetails ? "max-h-[2500px] opacity-100" : "max-h-0 opacity-0 invisible"}`}>
          <div className="space-y-6 flex flex-col md:w-11/12 mx-auto">
            {items.map((c, i) => (
              <div key={i} className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm relative group">
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[1.35rem] font-bold text-gray-800 mb-4">{c.t}</h3>
                    <hr className="border-gray-200 mb-6" />
                    <div className="flex flex-wrap gap-2 mb-6">
                      {c.prices.map((p, idx) => (
                        <span key={idx} className="bg-[#596057] text-white text-[0.6rem] md:text-xs font-medium px-3 md:px-4 py-2 shrink-0 rounded-md">
                          {p}
                        </span>
                      ))}
                    </div>
                    <div className="space-y-1.5 text-sm text-gray-800">
                      <p><strong>Days:</strong> {c.days}</p>
                      <p><strong>Level:</strong> {c.level}</p>
                      <p><strong>Room Types:</strong> {c.roomTypes}</p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <a href="/contact?interest=Certification Course" className="block w-full text-center bg-[#E57624] hover:bg-[#D56B1E] text-white py-3 rounded-md text-sm font-semibold transition-colors">
                      Book Now
                    </a>
                  </div>
                </div>
                <div className="md:w-72 lg:w-[22rem] h-64 md:h-auto relative shrink-0">
                  <img src={c.img} alt={c.t} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a href="/contact?interest=Certification Course" className="px-7 py-3 bg-[#596057] text-white text-sm font-semibold hover:bg-opacity-90 transition-colors">
            Register Course With Us
          </a>
          <a href="/contact?interest=Certification Course" className="px-7 py-3 bg-[#E57624] text-white text-sm font-semibold hover:bg-opacity-90 transition-colors">
            Have A Query For Us?
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits ---------------- */
function Benefits() {
  const categories = [
    {
      title: "Physical Wellness",
      items: ["Improved flexibility & mobility", "Better posture & body alignment", "Enhanced strength, balance & coordination", "Muscular relaxation & recovery support", "Increased body awareness", "Improved circulation & movement efficiency", "Relaxation and physical rejuvenation", "Natural support for overall well-being & vitality"],
    },
    {
      title: "Mental Wellness",
      items: ["Reduced stress & mental fatigue", "Improved concentration & focus", "Mental calmness & emotional clarity", "Better sleep quality & relaxation", "Improved mindfulness & self-awareness", "Enhanced emotional balance", "Relaxation of the nervous system", "Greater inner peace & mental well-being"],
    },
    {
      title: "Emotional & Spiritual Well-Being",
      items: ["Emotional balance & relaxation", "Increased self-awareness & mindfulness", "Deeper mind-body connection", "Inner harmony & confidence", "Supportive healing environment", "Greater sense of calmness & clarity", "Enhanced connection with holistic living practices", "Space for personal growth & inner transformation"],
    },
  ];
  return (
    <section className="py-28 bg-emerald-deep text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.12),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">BENEFITS OF WELLNESS PROGRAMS</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">The quiet power of <em className="text-gold-gradient not-italic">consistent practice</em>.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <div key={cat.title} className="glass rounded-3xl p-8 shadow-soft border border-cream/10">
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
              <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-gold">ONLINE YOGA CLASSES</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">Practice anywhere, <em className="text-gold-gradient not-italic">guided personally</em>.</h2>
              <p className="mt-6 text-cream/80 leading-relaxed">
                Live and on-demand sessions delivered globally — from foundational classes to advanced therapeutic practice, all from the comfort of your home.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="/contact?interest=Online Sessions" className="px-7 py-3.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold">Join Live Class</a>
                <a href="/contact?interest=Online Sessions" className="px-7 py-3.5 rounded-full glass text-cream text-xs font-semibold tracking-[0.2em] uppercase">Watch Library</a>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-2xl glass flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold animate-glow">
                  <Play className="w-7 h-7 text-emerald-deep ml-1" fill="currentColor" />
                </button>
              </div>
              <div className="mt-4 text-center text-[0.7rem] tracking-[0.3em] uppercase text-cream/60">Watch the experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */
function Testimonials() {
  const list = [
    {
      n: "Lea Kolbe",
      img: gImg1,
      q: "Magical place and amazing teacher! I'm staying with Dr. Vikram several days now enjoying morning meditations, yoga, treatments and even started to learn shiatsu. He is a very good teacher with many skills and a lot of experience. I highly recommend his school for Yoga. Go there, meet him and improve your mind and body. And when you get the chance stay there for lunch - even the cook is amazing."
    },
    {
      n: "Patrick Woods",
      img: gImg2,
      q: "The wellness center is the place to find peace of mind and relax for the soul. The classes with the ocean sound are fantastic. Dr. Vikram is a great professional. I had a great experience. Highly recommended!"
    },
    {
      n: "Sarah Jenkins",
      img: gImg3,
      q: "An incredibly peaceful and healing experience. The yoga sessions helped me feel physically stronger and mentally calmer. The therapeutic practices provided deep healing and relaxation."
    },
    {
      n: "Michael Chen",
      img: gImg4,
      q: "The retreat environment was beautiful, relaxing, and deeply transformative. Professional guidance, therapeutic wellness practices, and a very supportive atmosphere for growth."
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const getMaxIndex = () => (typeof window !== 'undefined' && window.innerWidth >= 768 ? list.length - 2 : list.length - 1);

  const handlePrev = () => setActiveIndex((p) => (p <= 0 ? getMaxIndex() : p - 1));
  const handleNext = () => setActiveIndex((p) => (p >= getMaxIndex() ? 0 : p + 1));

  useEffect(() => {
    const t = setInterval(() => {
      setActiveIndex((p) => (p >= getMaxIndex() ? 0 : p + 1));
    }, 6000);
    return () => clearInterval(t);
  }, [list.length]);

  return (
    <section id="testimonials" className="relative flex flex-col justify-center py-16 md:py-24 overflow-hidden bg-cream">
      <img src={testimonialBg} alt="Serene Background" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-multiply" loading="lazy" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="text-center mb-8 px-2">
          <span className="font-serif-display text-sm md:text-base tracking-[0.4em] text-emerald">TESTIMONIALS</span>
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
              {list.map((t, idx) => (
                <div key={idx} className="w-full md:w-1/2 flex-shrink-0 px-4 md:px-6 py-2">
                  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-soft hover:shadow-luxury transition-shadow duration-500 h-full flex flex-col items-center text-center relative border border-gold/10">
                    <div className="absolute top-6 text-gold/10">
                      <Quote size={60} strokeWidth={0.5} className="mx-auto" />
                    </div>
                    <img
                      src={t.img}
                      alt={t.n}
                      className="w-16 h-16 rounded-full object-cover mt-2 mb-3 shadow-sm border-2 border-cream relative z-10"
                    />
                    <h3 className="text-lg font-display text-emerald-deep mb-1 relative z-10">{t.n}</h3>
                    <div className="flex gap-1 mb-4 relative z-10">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed font-serif-display italic flex-grow relative z-10">
                      "{t.q}"
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
          {list.map((_, idx) => {
            const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768;
            if (isDesktop && idx > list.length - 2) return null;
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
    { q: "Do I need prior yoga experience?", a: "Not at all. Our classes are crafted for every level — from absolute beginners to seasoned practitioners. Each session is adapted to meet you where you are." },
    { q: "What is included in a wellness retreat?", a: "Daily yoga and meditation, naturopathic consultations, ayurvedic cuisine, therapeutic treatments, and serene accommodation in nature." },
    { q: "Are online sessions interactive?", a: "Yes — live classes include real-time guidance, alignment cues, and Q&A. On-demand sessions are available in our member library." },
    { q: "How do I begin a wellness consultation?", a: "Reach out via the contact form or WhatsApp. We'll arrange a discovery call to understand your goals and recommend the right path." },
    { q: "Are certification courses internationally recognized?", a: "Yes. Our teacher training and therapy programs are aligned with global yoga alliance standards." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="min-h-screen flex items-center py-28 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">FREQUENTLY ASKED</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">Questions, <em className="text-gold-gradient not-italic">answered</em>.</h2>
        </div>
        <div className="space-y-4">
          {items.map((it, idx) => {
            const isOpen = open === idx;
            return (
              <div key={it.q} className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
                <button onClick={() => setOpen(isOpen ? null : idx)} className="w-full flex items-center justify-between gap-4 p-6 text-left">
                  <span className="font-display text-lg md:text-xl text-emerald-deep">{it.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gold transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground text-sm leading-relaxed">{it.a}</p>
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
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">GALLERY</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">Moments from the <em className="text-gold-gradient not-italic">sanctuary</em>.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imgs.map((src, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl group ${i === 0 || i === 4 ? "h-[20rem] md:row-span-2 md:h-[34rem]" : "h-64"}`}>
              <img src={src} alt={`Gallery ${i + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
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
  const feed = [classes, therapy, retreat, about, hero, founder, classes, therapy];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">@DRVIKRAM.WELLNESS</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance leading-tight">Follow the <em className="text-gold-gradient not-italic">journey</em> on Instagram.</h2>
          </div>
          <a href="#" className="inline-flex items-center gap-2 text-emerald hover:text-gold transition-colors text-xs tracking-[0.2em] uppercase">
            <Instagram className="w-4 h-4" /> View Feed
          </a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {feed.map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl group">
              <img src={src} alt={`Instagram ${i + 1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-emerald-deep/0 group-hover:bg-emerald-deep/60 transition-colors flex items-center justify-center">
                <Instagram className="w-6 h-6 text-cream opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
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
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">CONTACT</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">Begin your <em className="text-gold-gradient not-italic">transformation</em>.</h2>
          <p className="mt-6 text-cream/80 leading-relaxed max-w-md">
            Reach out for class enrollment, retreat reservations, or a personal wellness consultation. We respond within 24 hours.
          </p>
          <div className="mt-10 space-y-5">
            {[
              { i: Phone, l: "+91 8778639989" },
              { i: Mail, l: "drvikramyogawellness@gmail.com" },
              { i: MapPin, l: "Dr. Vikram Yoga & Wellness Centre Varkala, Tamil Nadu, India." },
            ].map(({ i: Icon, l }) => (
              <div key={l} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full glass flex items-center justify-center">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <span className="text-cream/90">{l}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex gap-3">
            {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors">
                <Icon className="w-4 h-4 text-gold" />
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()} className="glass rounded-3xl p-8 md:p-10 space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" type="text" />
            <Field label="Email Address" type="email" />
          </div>
          <Field label="Phone" type="tel" />
          <div>
            <label className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70">Interest</label>
            <select className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-gold focus:outline-none">
              {["Yoga Classes", "Wellness Therapy", "Retreat", "Certification Course", "Online Sessions", "Consultation"].map((o) => (
                <option key={o} className="bg-emerald-deep">{o}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70">Message</label>
            <textarea rows={4} className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-gold focus:outline-none resize-none" />
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
      <input type={type} className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none" />
    </div>
  );
}

/* Footer and WhatsAppFloat are now the shared components from ./about */
