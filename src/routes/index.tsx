import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import hero from "@/assets/hero.jpg";
import founder from "@/assets/founder.jpg";
import about from "@/assets/about.jpg";
import therapy from "@/assets/therapy.jpg";
import retreat from "@/assets/retreat.jpg";
import classes from "@/assets/classes.jpg";
import {
  Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Youtube,
  MessageCircle, ChevronDown, Flower2, Sparkles, Heart, Leaf,
  Sun, Wind, Hand, Mountain, GraduationCap, Globe, Star, Quote, ArrowRight, Play
} from "lucide-react";

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

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#classes", label: "Classes" },
  { href: "#therapies", label: "Therapies" },
  { href: "#retreats", label: "Retreats" },
  { href: "#courses", label: "Courses" },
  { href: "#online", label: "Online" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

function HomePage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Founder />
      <WhyUs />
      <Classes />
      <Therapies />
      <Retreats />
      <Courses />
      <Benefits />
      <OnlineSessions />
      <Testimonials />
      <FAQ />
      <Gallery />
      <WhatsAppCTA />
      <SocialFeed />
      <Contact />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

/* ---------------- Navbar ---------------- */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "glass-dark py-3" : "py-5"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img src={logo} alt="Dr Vikram Logo" className="h-12 w-auto drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]" />
          <div className="hidden sm:block leading-tight">
            <div className="font-serif-display text-[0.7rem] text-gold tracking-[0.25em]">DR. VIKRAM</div>
            <div className="text-[0.65rem] text-cream/70 tracking-[0.2em]">YOGA & WELLNESS</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.78rem] tracking-[0.18em] uppercase text-cream/80 hover:text-gold transition-colors">{l.label}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-widest uppercase shadow-gold hover:scale-105 transition-transform">
          Book Now <ArrowRight className="w-3.5 h-3.5" />
        </a>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-cream p-2">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden glass-dark mt-3 mx-6 rounded-2xl p-6 animate-fade-up">
          <div className="flex flex-col gap-4">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-cream/90 text-sm tracking-[0.18em] uppercase">{l.label}</a>
            ))}
            <a href="#contact" className="mt-2 text-center px-5 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-widest uppercase">Book Now</a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center text-cream overflow-hidden">
      <img src={hero} alt="Serene meditation in forest" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(8,18,13,0.85)_90%)]" />

      <div className="relative z-10 text-center max-w-5xl px-6 py-32">
        <img src={logo} alt="Dr Vikram crest" className="mx-auto h-28 md:h-36 mb-8 animate-float drop-shadow-[0_8px_30px_rgba(212,175,55,0.45)]" />
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="h-px w-12 bg-gold/60" />
          <span className="font-serif-display text-[0.7rem] tracking-[0.5em] text-gold">EST. WELLNESS SANCTUARY</span>
          <span className="h-px w-12 bg-gold/60" />
        </div>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-balance leading-[1.05]">
          Heal <span className="text-gold-gradient italic">·</span> Harmonize <span className="text-gold-gradient italic">·</span> <span className="text-gold-gradient italic">Transform</span>
        </h1>
        <p className="mt-8 text-base md:text-lg text-cream/80 max-w-2xl mx-auto font-light tracking-wide">
          Holistic Healing &middot; Therapeutic Wellness &middot; Transformative Retreat Experiences guided by Dr. S. Vikram Pandy.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#classes" className="px-7 py-3.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold hover:scale-105 transition-transform">Join Our Classes</a>
          <a href="#contact" className="px-7 py-3.5 rounded-full glass text-cream text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors">Book Consultation</a>
          <a href="#retreats" className="px-7 py-3.5 rounded-full border border-gold/40 text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors">Explore Retreats</a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-cream/60">
        <span className="text-[0.6rem] tracking-[0.4em] uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
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
          <div className="absolute -bottom-8 -right-4 lg:-right-12 glass-dark rounded-2xl px-8 py-6 shadow-luxury text-cream">
            <div className="font-display text-4xl text-gold-gradient">15+</div>
            <div className="text-xs tracking-[0.25em] uppercase text-cream/70 mt-1">Years of Healing</div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Flower2 className="w-4 h-4 text-gold" />
            <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">ABOUT THE CENTRE</span>
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
        <div className="lg:col-span-2 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-luxury max-w-md mx-auto">
            <img src={founder} alt="Dr. S. Vikram Pandy" className="w-full h-[560px] object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="font-display text-2xl">Dr. S. Vikram Pandy</div>
              <div className="text-xs tracking-[0.25em] uppercase text-gold mt-1">Founder &middot; Yoga Therapist</div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-5">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">MEET THE FOUNDER</span>
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
    { icon: Heart, t: "Personalized Healing", d: "Every protocol is tailored to your constitution, lifestyle, and intention." },
    { icon: Leaf, t: "Authentic Traditions", d: "Rooted in classical yogic, ayurvedic, and naturopathic sciences." },
    { icon: Sparkles, t: "Luxury Sanctuary", d: "Serene spaces designed for restoration, elegance, and quiet luxury." },
    { icon: GraduationCap, t: "Master Guidance", d: "Mentored personally by Dr. Vikram and a team of certified therapists." },
    { icon: Globe, t: "Global Community", d: "A growing circle of seekers, professionals, and wellness travellers worldwide." },
    { icon: Mountain, t: "Transformative Retreats", d: "Curated retreats in nature for deep reset and inner awakening." },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">WHY CHOOSE US</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">A practice refined by <em className="text-gold-gradient not-italic">tradition</em>, delivered with care.</h2>
          <div className="gold-divider mt-8" />
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-luxury transition-all duration-500 hover:-translate-y-1 border border-border">
              <div className="w-14 h-14 rounded-2xl bg-gold-gradient flex items-center justify-center shadow-gold mb-6">
                <Icon className="w-6 h-6 text-emerald-deep" />
              </div>
              <h3 className="font-display text-2xl text-emerald-deep">{t}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              <div className="absolute top-6 right-6 text-gold/30 font-serif-display text-xs tracking-widest">0{items.indexOf({icon: Icon, t, d}) + 1}</div>
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
    { t: "Hatha & Vinyasa Yoga", d: "Foundational and flowing practices for strength, flexibility, and presence." },
    { t: "Therapeutic Yoga", d: "Targeted asana sequences to address chronic pain, stress, and recovery." },
    { t: "Pranayama & Meditation", d: "Breath sciences and stillness practices for clarity and nervous system balance." },
    { t: "Private 1-on-1 Sessions", d: "Bespoke sessions crafted around your unique goals and constitution." },
  ];
  return (
    <section id="classes" className="relative py-28 bg-emerald-gradient text-cream overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">YOGA CLASSES</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">Practices for every <em className="text-gold-gradient not-italic">body & breath</em>.</h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-cream/80 leading-relaxed">
            From dynamic Vinyasa to deeply restorative therapy sessions, our classes meet you exactly where you are. Each session honours alignment, breath, and intention — guiding you toward sustainable wellbeing.
          </p>
          <div className="mt-10 space-y-3">
            {list.map((c, i) => (
              <div key={c.t} className="group glass rounded-2xl p-5 flex items-start gap-5 hover:bg-gold/5 transition-all">
                <div className="text-gold font-serif-display text-sm tracking-widest pt-1">0{i+1}</div>
                <div className="flex-1">
                  <h3 className="font-display text-xl text-cream">{c.t}</h3>
                  <p className="text-sm text-cream/70 mt-1">{c.d}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gold opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-8 bg-gold/15 blur-3xl rounded-full" />
          <img src={classes} alt="Yoga class" className="relative rounded-3xl shadow-luxury w-full h-[600px] object-cover" loading="lazy" />
          <div className="absolute top-6 left-6 glass-dark rounded-full px-5 py-2 text-xs tracking-[0.25em] uppercase text-gold">Live Studio</div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Therapies ---------------- */
function Therapies() {
  const items = [
    { icon: Hand, t: "Thai Yoga Massage", d: "Assisted stretching and rhythmic compressions for whole-body release." },
    { icon: Wind, t: "Shiatsu Therapy", d: "Meridian-based pressure work that restores energetic flow." },
    { icon: Mountain, t: "Deep Tissue Therapy", d: "Targeted manipulation to dissolve chronic tension and adhesions." },
    { icon: Leaf, t: "Ayurvedic Wellness", d: "Warm oil rituals balancing dosha and nourishing the nervous system." },
    { icon: Sun, t: "Reflexology", d: "Precise foot and hand work to harmonize organ systems." },
    { icon: Flower2, t: "Cupping Therapy", d: "Traditional decompression to support circulation and detoxification." },
  ];
  return (
    <section id="therapies" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-14 items-end mb-14">
          <div className="lg:col-span-2">
            <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">MASSAGE & WELLNESS THERAPIES</span>
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
              <a href="#contact" className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-emerald hover:text-gold transition-colors">
                Book Session <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
        <div className="mt-16 relative rounded-3xl overflow-hidden h-72">
          <img src={therapy} alt="Therapy ritual" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep/90 via-emerald-deep/50 to-transparent" />
          <div className="relative h-full flex items-center px-10 lg:px-16 text-cream max-w-2xl">
            <div>
              <h3 className="font-display text-3xl md:text-4xl">Crafted treatments for body & soul.</h3>
              <a href="#contact" className="mt-6 inline-flex px-6 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold">Book a Therapy</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Retreats ---------------- */
function Retreats() {
  return (
    <section id="retreats" className="relative py-32 text-cream overflow-hidden">
      <img src={retreat} alt="Wellness retreat" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-deep via-emerald-deep/80 to-emerald-deep/30" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">
        <div>
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">WELLNESS RETREATS</span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-balance leading-[1.05]">Step away. <em className="text-gold-gradient not-italic">Come home</em> to yourself.</h2>
          <div className="gold-divider my-8 max-w-xs" />
          <p className="text-cream/80 leading-relaxed max-w-lg">
            Immersive 3, 7, and 14-day retreats in nature — combining daily yoga, naturopathy, ayurvedic cuisine, and silent practice. Designed for deep reset and lasting transformation.
          </p>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { t: "Reset", d: "3 Day" },
              { t: "Restore", d: "7 Day" },
              { t: "Awaken", d: "14 Day" },
            ].map((r) => (
              <div key={r.t} className="glass rounded-2xl p-6 text-center">
                <div className="font-display text-2xl text-gold">{r.t}</div>
                <div className="text-[0.65rem] tracking-[0.3em] uppercase text-cream/70 mt-1">{r.d}</div>
              </div>
            ))}
          </div>
          <a href="#contact" className="mt-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold">Reserve Your Retreat <ArrowRight className="w-3.5 h-3.5" /></a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Courses ---------------- */
function Courses() {
  const items = [
    { t: "200hr Yoga Teacher Training", d: "Foundational certification for aspiring teachers and dedicated practitioners.", h: "12 Weeks" },
    { t: "Advanced Yoga Therapy", d: "Therapeutic application of yoga for clinical and wellness settings.", h: "24 Weeks" },
    { t: "Naturopathy & Lifestyle", d: "Integrative diploma covering nutrition, hydrotherapy, and lifestyle medicine.", h: "16 Weeks" },
  ];
  return (
    <section id="courses" className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">CERTIFICATION COURSES</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance leading-tight">Become a guide. <em className="text-gold-gradient not-italic">Carry the wisdom forward</em>.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {items.map((c, i) => (
            <div key={c.t} className="group relative rounded-3xl overflow-hidden bg-emerald-gradient text-cream p-8 shadow-soft hover:shadow-luxury transition-all duration-500 hover:-translate-y-1">
              <div className="absolute -top-20 -right-20 w-56 h-56 bg-gold/15 rounded-full blur-3xl group-hover:bg-gold/25 transition-colors" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="font-serif-display text-xs tracking-[0.3em] text-gold">0{i+1}</span>
                  <span className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/60">{c.h}</span>
                </div>
                <h3 className="mt-8 font-display text-3xl">{c.t}</h3>
                <p className="mt-4 text-sm text-cream/75 leading-relaxed">{c.d}</p>
                <a href="#contact" className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gold hover:gap-3 transition-all">Enroll Now <ArrowRight className="w-3.5 h-3.5" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Benefits ---------------- */
function Benefits() {
  const items = [
    "Restores physical vitality and flexibility",
    "Calms the nervous system and relieves stress",
    "Balances hormones and digestive health",
    "Sharpens focus and emotional clarity",
    "Improves sleep and energy cycles",
    "Cultivates lasting inner peace",
  ];
  return (
    <section className="py-28 bg-emerald-deep text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(212,175,55,0.12),transparent_50%)]" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
        <div>
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">BENEFITS</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">The quiet power of <em className="text-gold-gradient not-italic">consistent practice</em>.</h2>
          <p className="mt-6 text-cream/75 leading-relaxed max-w-md">
            Each program is designed to deliver measurable change — physical, mental, and energetic — supporting a life lived with grace and intention.
          </p>
        </div>
        <ul className="space-y-4">
          {items.map((b, i) => (
            <li key={b} className="flex items-start gap-5 glass rounded-2xl p-5">
              <span className="font-serif-display text-gold text-sm tracking-widest mt-1">0{i+1}</span>
              <span className="text-cream/90 text-[0.95rem] leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
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
              <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">ONLINE YOGA CLASSES</span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">Practice anywhere, <em className="text-gold-gradient not-italic">guided personally</em>.</h2>
              <p className="mt-6 text-cream/80 leading-relaxed">
                Live and on-demand sessions delivered globally — from foundational classes to advanced therapeutic practice, all from the comfort of your home.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#contact" className="px-7 py-3.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold">Join Live Class</a>
                <a href="#contact" className="px-7 py-3.5 rounded-full glass text-cream text-xs font-semibold tracking-[0.2em] uppercase">Watch Library</a>
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
    { n: "Priya Sharma", r: "Wellness Practitioner", q: "A profound experience — Dr. Vikram's guidance reshaped my understanding of yoga as therapy. The retreats are pure transformation." },
    { n: "James Whitmore", r: "Entrepreneur, UK", q: "After years of chronic stress, the 7-day retreat gave me my nervous system back. Elegant, authentic, and deeply healing." },
    { n: "Anika Verma", r: "Yoga Teacher", q: "The teacher training was world-class. Every module felt curated with care — the kind of depth you rarely find elsewhere." },
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % list.length), 6000);
    return () => clearInterval(t);
  }, [list.length]);
  return (
    <section id="testimonials" className="py-28 bg-emerald-deep text-cream relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,175,55,0.10),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">TESTIMONIALS</span>
        <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">Stories of <em className="text-gold-gradient not-italic">transformation</em>.</h2>
        <div className="gold-divider mt-8" />
        <div className="mt-14 relative min-h-[260px]">
          {list.map((t, idx) => (
            <div key={t.n} className={`absolute inset-0 transition-all duration-700 ${idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}>
              <Quote className="w-10 h-10 text-gold/60 mx-auto mb-6" />
              <p className="font-display text-2xl md:text-3xl text-cream/95 italic leading-relaxed text-balance">"{t.q}"</p>
              <div className="mt-8 flex items-center justify-center gap-1">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="w-3.5 h-3.5 text-gold" fill="currentColor" />)}
              </div>
              <div className="mt-4 font-serif-display text-sm tracking-[0.3em] text-gold">{t.n.toUpperCase()}</div>
              <div className="text-xs text-cream/60 tracking-[0.2em] uppercase mt-1">{t.r}</div>
            </div>
          ))}
        </div>
        <div className="mt-10 flex items-center justify-center gap-3">
          {list.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-gold" : "w-2 bg-cream/30"}`} />
          ))}
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
    <section className="py-28 bg-cream">
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
  const imgs = [classes, therapy, about, retreat, hero, founder];
  return (
    <section className="py-28 bg-emerald-deep text-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">GALLERY</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance">Moments from the <em className="text-gold-gradient not-italic">sanctuary</em>.</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {imgs.map((src, i) => (
            <div key={i} className={`relative overflow-hidden rounded-2xl group ${i === 0 || i === 4 ? "md:row-span-2 md:h-[34rem]" : "h-64"}`}>
              <img src={src} alt={`Gallery ${i+1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- WhatsApp CTA ---------------- */
function WhatsAppCTA() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-5xl mx-auto px-6">
        <div className="relative rounded-[2rem] bg-gold-gradient p-1 shadow-gold">
          <div className="rounded-[1.85rem] bg-emerald-gradient text-cream p-10 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15),transparent_60%)]" />
            <div className="relative">
              <MessageCircle className="w-12 h-12 text-gold mx-auto" strokeWidth={1.4} />
              <h2 className="mt-6 font-display text-4xl md:text-5xl text-balance">Begin your journey on <em className="text-gold-gradient not-italic">WhatsApp</em>.</h2>
              <p className="mt-4 text-cream/80 max-w-xl mx-auto">Chat directly with our team for class enrollment, retreat bookings, or a personal wellness consultation.</p>
              <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-cream text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-luxury hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" /> Chat With Us
              </a>
            </div>
          </div>
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
              <img src={src} alt={`Instagram ${i+1}`} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
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

/* ---------------- Contact ---------------- */
function Contact() {
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
              { i: Phone, l: "+91 12345 67890" },
              { i: Mail, l: "hello@drvikramwellness.com" },
              { i: MapPin, l: "Wellness Sanctuary, Bengaluru, India" },
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

/* ---------------- Footer ---------------- */
function Footer() {
  return (
    <footer className="bg-emerald-deep text-cream pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <img src={logo} alt="Dr Vikram" className="h-16" />
          <p className="mt-6 text-sm text-cream/70 leading-relaxed">
            A premium sanctuary for holistic healing, therapeutic yoga, and transformative wellness experiences.
          </p>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">Explore</h4>
          <ul className="mt-6 space-y-3 text-sm text-cream/70">
            {navLinks.slice(0, 5).map((l) => <li key={l.href}><a href={l.href} className="hover:text-gold transition-colors">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">Practice</h4>
          <ul className="mt-6 space-y-3 text-sm text-cream/70">
            {["Yoga Therapy", "Meditation", "Pranayama", "Naturopathy", "Online Sessions"].map((l) => <li key={l}><a href="#" className="hover:text-gold transition-colors">{l}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">Stay Connected</h4>
          <p className="mt-6 text-sm text-cream/70">Receive seasonal practices, retreat dates, and wellness rituals.</p>
          <form className="mt-5 flex">
            <input type="email" placeholder="Your email" className="flex-1 bg-transparent border border-cream/20 rounded-l-full px-5 py-3 text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none" />
            <button className="px-5 rounded-r-full bg-gold-gradient text-emerald-deep">
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="gold-divider" />
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/50 tracking-[0.15em] uppercase">
          <span>© {new Date().getFullYear()} Dr. Vikram Yoga & Wellness Centre</span>
          <span>Heal &middot; Harmonize &middot; Transform</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- WhatsApp Float ---------------- */
function WhatsAppFloat() {
  return (
    <a href="https://wa.me/911234567890" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold animate-glow hover:scale-110 transition-transform" aria-label="WhatsApp">
      <MessageCircle className="w-6 h-6 text-emerald-deep" />
    </a>
  );
}
