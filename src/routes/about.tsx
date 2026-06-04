import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import aboutHero from "@/assets/about.png";
import about from "@/assets/about 1.jpg";
import therapy from "@/assets/therapy.jpg";
import founder from "@/assets/leader.jpeg";
import {
  Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Youtube,
  MessageCircle, Flower2, Sparkles, Heart, Leaf, ChevronDown,
  GraduationCap, Globe, Mountain, ArrowRight, Activity, Sun, Hand, CalendarDays
} from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Learn about Dr. Vikram Yoga & Wellness Centre, our founder Dr. S. Vikram Pandy, and our holistic healing mission." },
    ],
  }),
});

function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero
        title="About the Centre"
        subtitle="Holistic Healing • Therapeutic Wellness • Transformative Retreat Experiences"
        bg={aboutHero}
        align="right"
      />
      <AboutSection />
      <PhilosophySection />
      <FounderSection />
      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}

/* ── Shared Navbar ── */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 30);
      if (currentY < 80) {
        // Always show near top
        setHidden(false);
      } else if (currentY > lastY + 8) {
        // Scrolling down — hide navbar
        setHidden(true);
        setOpen(false);
      } else if (currentY < lastY - 8) {
        // Scrolling up — show navbar
        setHidden(false);
      }
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    {
      to: "/services", label: "Services", sub: [
        { to: "/yoga", label: "Yoga" },
        { to: "/wellness-therapy", label: "Wellness Therapy" },
        { to: "/retreats", label: "Retreats" },
        { to: "/certificate-courses", label: "Massage Certificate Courses" }
      ]
    },
    { to: "/gallery", label: "Gallery" },
    { to: "/faq", label: "FAQ" },
    { to: "/apply", label: "Apply" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* ── Floating reveal button (shown when navbar is hidden) ── */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[60] transition-all duration-500 ${hidden ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"}`}
      >
        <button
          onClick={() => setHidden(false)}
          aria-label="Show navigation menu"
          className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-emerald-deep/90 backdrop-blur-xl border border-gold/30 shadow-[0_8px_32px_rgba(8,18,13,0.5),0_0_0_1px_rgba(212,175,55,0.1)] hover:border-gold/60 hover:shadow-[0_8px_32px_rgba(8,18,13,0.6),0_0_20px_rgba(212,175,55,0.15)] transition-all duration-300"
        >
          <ChevronDown className="w-4 h-4 text-gold group-hover:scale-110 transition-transform" />
          <span className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/80 font-medium group-hover:text-gold transition-colors">Menu</span>
        </button>
      </div>

      {/* ── Main Navbar ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-emerald-deep/95 backdrop-blur-2xl shadow-soft py-3 border-b border-cream/10" : "bg-emerald-deep/80 backdrop-blur-md py-5"} ${hidden ? "-translate-y-full" : "translate-y-0"}`}
      >
        <div className="max-w-[90rem] mx-auto px-8 lg:px-12 flex items-center justify-between">
          {/* Left: Logo + Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="Dr Vikram Logo" className="h-14 md:h-16 w-auto drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]" />
            <div className="leading-tight hidden sm:block">
              <div className="font-serif-display text-[0.65rem] md:text-[0.7rem] text-gold tracking-[0.25em]">DR. VIKRAM</div>
              <div className="text-[0.55rem] md:text-[0.6rem] text-cream/70 tracking-[0.2em] mt-0.5">YOGA & WELLNESS</div>
            </div>
          </Link>

          {/* Center: Navigation Links (desktop) */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {links.map((l) => (
              <div key={l.to} className="relative group py-2">
                <Link
                  to={l.to}
                  className="flex items-center gap-1 text-[0.75rem] xl:text-[0.8rem] tracking-[0.2em] uppercase text-cream/80 hover:text-gold transition-colors"
                  activeProps={{ className: "text-gold border-b border-gold/60 pb-0.5" }}
                  activeOptions={{ exact: l.to === "/" }}
                >
                  {l.label}
                  {l.sub && <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-300" />}
                </Link>
                {l.sub && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <div className="bg-emerald-deep shadow-luxury rounded-2xl p-5 border border-cream/10 flex flex-col gap-4 text-center">
                      {l.sub.map((s) => (
                        <Link
                          key={s.label}
                          to={s.to}
                          className="text-[0.65rem] tracking-[0.15em] uppercase text-cream/70 hover:text-gold transition-colors block"
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

          {/* Right: Book Now + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-full border-2 border-gold text-gold text-xs font-semibold tracking-widest uppercase hover:bg-gold hover:text-emerald-deep transition-all duration-300 hover:scale-105"
            >
              Book Now <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <button onClick={() => setOpen(!open)} className="lg:hidden text-cream p-2">
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden bg-emerald-deep border border-gold/20 shadow-luxury mt-3 mx-6 rounded-2xl p-6 animate-fade-up">
            <div className="flex flex-col gap-4">
              {links.map((l) => (
                <div key={l.to} className="flex flex-col">
                  {l.sub ? (
                    <div className="flex items-center justify-between py-1">
                      <Link
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className={`text-sm tracking-[0.18em] uppercase flex-1 ${mobileSubMenu === l.label ? "text-gold" : "text-cream/90"}`}
                        activeProps={{ className: "text-gold" }}
                      >
                        {l.label}
                      </Link>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setMobileSubMenu(mobileSubMenu === l.label ? null : l.label);
                        }}
                        className="p-2 -mr-2"
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform ${mobileSubMenu === l.label ? "rotate-180 text-gold" : "text-cream/50"}`} />
                      </button>
                    </div>
                  ) : (
                    <Link
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="text-cream/90 text-sm tracking-[0.18em] uppercase py-1"
                      activeProps={{ className: "text-gold text-sm tracking-[0.18em] uppercase py-1" }}
                      activeOptions={{ exact: l.to === "/" }}
                    >
                      {l.label}
                    </Link>
                  )}
                  {l.sub && mobileSubMenu === l.label && (
                    <div className="flex flex-col gap-4 mt-3 mb-2 pl-4 border-l-2 border-gold/20 ml-1.5 animate-fade-up">
                      {l.sub.map((s) => (
                        <Link
                          key={s.label}
                          to={s.to}
                          onClick={() => { setOpen(false); setMobileSubMenu(null); }}
                          className="text-[0.65rem] tracking-[0.15em] uppercase text-cream/60 hover:text-gold transition-colors"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link to="/contact" className="mt-4 text-center px-5 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-widest uppercase">Book Now</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

/* ── Page Hero ── */
export function PageHero({ title, subtitle, bg, align = "left" }: { title: string; subtitle: string; bg: string; align?: "left" | "center" | "right" }) {
  const isRight = align === "right";
  const isCenter = align === "center";

  return (
    <section className={`relative h-[70vh] min-h-[560px] flex text-cream overflow-hidden ${isCenter ? 'items-center justify-center text-center' : isRight ? 'items-start justify-end text-right' : 'items-start justify-start text-left'}`}>
      <img src={bg} alt={title} className="absolute inset-0 w-full h-full object-cover brightness-105 saturate-110 object-[25%] md:object-center" />
      {/* Gradient overlay */}
      <div className={`absolute inset-0 ${isCenter
        ? 'bg-emerald-deep/40'
        : isRight
          ? 'bg-gradient-to-b from-emerald-deep/75 via-emerald-deep/40 to-emerald-deep/20 md:bg-gradient-to-l md:from-emerald-deep/80 md:via-emerald-deep/40 md:to-transparent'
          : 'bg-gradient-to-b from-emerald-deep/75 via-emerald-deep/40 to-emerald-deep/20 md:bg-gradient-to-r md:from-emerald-deep/70 md:via-emerald-deep/40 md:to-transparent'
        }`} />

      <div className={`relative z-10 max-w-7xl mx-auto px-6 w-full pt-20 md:pt-20 lg:pt-40 pb-20 md:pb-20 flex flex-col ${isRight ? 'items-end' : isCenter ? 'items-center' : 'items-start'}`}>
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          {isRight || isCenter ? null : <span className="h-px w-8 md:w-12 bg-gold/60" />}
          <span className="font-serif-display text-[0.55rem] md:text-[0.75rem] tracking-[0.3em] md:tracking-[0.4em] text-gold uppercase drop-shadow-sm">Dr. Vikram Yoga &amp; Wellness</span>
          {isRight || isCenter ? <span className="h-px w-8 md:w-12 bg-gold/60" /> : null}
        </div>
        <h1 className="font-display text-4xl md:text-7xl lg:text-[5.5rem] font-medium text-balance leading-[1.1] drop-shadow-2xl">{title}</h1>
        <p className={`mt-2 md:mt-13 text-cream max-w-lg xl:max-w-2xl text-base md:text-2xl font-light italic tracking-wide drop-shadow-lg opacity-95 ${isRight ? 'text-right' : isCenter ? 'text-center' : 'text-left'}`}>{subtitle}</p>
      </div>
    </section>
  );
}

/* ── About Section ── */
function AboutSection() {
  const specializations = [
    "Yoga therapy",
    "Meditation",
    "Pranayama",
    "Naturopathy",
    "Acupuncture-based wellness",
    "Therapeutic bodywork",
    "Rehabilitation support",
    "Energy balancing therapies",
    "Holistic lifestyle guidance",
  ];
  return (
    <section className="relative py-12 lg:py-16 bg-cream overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3 opacity-60 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-emerald-deep/5 blur-3xl rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-[90rem] mx-auto px-6 lg:px-12 w-full grid lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
        <div className="relative lg:col-span-5 order-2 lg:order-1">
          <div className="absolute -inset-5 bg-gold-gradient opacity-20 blur-3xl rounded-[3rem]" />
          <div className="relative w-full aspect-square md:aspect-[4/5] max-w-lg mx-auto lg:ml-0">
            {/* Image 1 (Back Left) */}
            <div className="absolute top-0 left-0 w-[75%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-luxury animate-fade-up group z-10" style={{ animationDelay: '150ms' }}>
              <img src={about} alt="Serene yoga studio" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
            
            {/* Image 2 (Front Right) */}
            <div className="absolute bottom-0 right-0 w-[65%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-luxury animate-fade-up group z-20 border-4 border-cream" style={{ animationDelay: '450ms' }}>
              <img src={therapy} alt="Therapeutic wellness" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="flex items-center gap-4 mb-4 text-emerald-deep/90">
            <span className="w-10 h-px bg-gold-gradient" />
            <span className="font-serif-display text-[0.65rem] tracking-[0.4em] uppercase text-emerald-deep">OUR STORY</span>
            <span className="w-10 h-px bg-gold-gradient" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] xl:text-5xl text-emerald-deep leading-[1.05] text-balance mb-4">
            A sanctuary for <br className="hidden md:block" />
            <em className="text-gold-gradient not-italic font-medium">authentic healing</em>
            <br className="hidden lg:block" /> and conscious transformation.
          </h2>

          <div className="w-16 h-[2px] bg-gold-gradient mb-5 opacity-70" />

          <div className="space-y-3 lg:space-y-4 text-emerald-deep leading-relaxed text-sm lg:text-[0.95rem]">
            <p className="text-emerald-deep font-semibold text-base leading-snug">
              Welcome to Dr. Vikram Yoga & Wellness Centre, a holistic healing sanctuary where traditional yogic wisdom meets modern therapeutic wellness practices.
            </p>
            <p>
              Located in the serene coastal surroundings of Varkala, Trivandrum, Kerala, India, our centre offers a peaceful environment dedicated to natural healing, mindful living, and complete well-being.
            </p>
            <p>
              Led by Dr. S. Vikram Pandy, a naturopathy & yoga physician, internationally recognized yoga teacher, and therapeutic wellness consultant, our centre integrates yoga therapy, meditation, pranayama, naturopathy, acupuncture based wellness practices, rehabilitation support therapies, therapeutic bodywork, and holistic lifestyle guidance to create personalized healing experiences for every individual.
            </p>
            <p>
              Whether you seek physical healing, emotional balance, stress relief, improved mobility, mental clarity, spiritual growth, or transformative wellness retreats, we guide you on a journey toward inner harmony, vitality, and long-term holistic wellness.
            </p>
            <p className="mt-6 text-emerald-deep font-medium italic text-sm text-center lg:text-left border-l-[3px] border-gold/40 pl-4 py-0.5">
              "We believe true wellness is achieved when physical health, mental clarity, emotional well-being, and mindful awareness are brought into balance."
            </p>
          </div>

          <div className="mt-8 p-5 lg:p-6 bg-white/50 backdrop-blur-xl rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-emerald-deep/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 blur-3xl rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-gold/20" />
            <div className="relative z-10">
              <h3 className="font-serif-display text-[0.65rem] tracking-[0.3em] uppercase text-emerald-deep mb-4 flex items-center gap-3 font-bold">
                <Flower2 className="w-4 h-4 text-gold saturate-150" />
                Our Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-3 gap-x-4">
                {specializations.map((s) => (
                  <div key={s} className="flex items-center gap-2.5 group/item">
                    <span className="text-[0.95rem] shrink-0 leading-none text-gold saturate-150 group-hover/item:text-gold transition-colors mt-px">☯</span>
                    <span className="text-[0.9rem] font-medium text-emerald-deep group-hover/item:text-emerald-deep transition-colors leading-[1.2]">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Philosophy Section ── */
function PhilosophySection() {
  const focuses = [
    "Yoga",
    "Mindful movement",
    "Therapeutic wellness practices",
    "Natural healing methods",
    "Conscious living",
  ];
  return (
    <section className="py-28 bg-emerald-deep text-cream">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">OUR PHILOSOPHY</span>
          <h2 className="mt-4 font-display text-4xl leading-tight">
            The Meaning of <em className="text-gold-gradient not-italic">Holistic Wellness</em>
          </h2>
          <div className="gold-divider my-8" />
          <p className="text-cream/80 leading-relaxed text-[1.05rem] font-light mb-6">
            At Dr. Vikram Yoga & Wellness Centre, wellness is more than physical fitness — it is the balance of body, mind, emotions, energy, and lifestyle. Our approach focuses on creating harmony through yoga, mindful movement, therapeutic wellness practices, natural healing methods, and conscious living.
          </p>
        </div>
        <div className="glass p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent)]" />
          <div className="relative">
            <h3 className="font-display text-2xl text-cream mb-6">A Path Toward Complete Well-being</h3>
            <p className="text-cream/80 text-[0.95rem] leading-relaxed mb-6 font-light">
              We believe yoga is not only a physical practice, but a path toward:
            </p>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              {["Self-awareness", "Inner balance", "Mental clarity", "Emotional stability", "Complete well-being"].map((b) => (
                <div key={b} className="flex items-center gap-3">
                  <span className="text-[0.95rem] shrink-0 leading-none text-gold saturate-150 mt-px">☯</span>
                  <span className="text-[0.95rem] font-light text-cream/90">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Founder Section ── */
function FounderSection() {
  return (
    <section className="relative py-14 lg:py-24 bg-emerald-gradient text-cream overflow-hidden min-h-[calc(100vh-5rem)]">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-lotus/10 blur-3xl rounded-full translate-y-1/3 -translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6 w-full pt-4 lg:pt-0">
        
        {/* Floated Image Container */}
        <div className="lg:float-left relative mb-10 lg:mb-6 lg:mr-12 mx-auto lg:mx-0 w-[280px] sm:w-[320px] lg:w-[420px] xl:w-[480px]">
          <div className="relative rounded-2xl overflow-hidden shadow-luxury">
            <img src={founder} alt="Dr. S. Vikram Pandy" className="w-full h-[380px] sm:h-[440px] lg:h-[560px] xl:h-[620px] object-cover object-top" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/10 to-transparent lg:block hidden" />
            <div className="absolute bottom-4 left-4 right-4 hidden lg:block">
              <div className="font-display text-xl md:text-2xl drop-shadow-md">Dr. S. Vikram Pandy</div>
              <div className="text-[0.65rem] tracking-[0.15em] font-medium uppercase text-gold mt-1 drop-shadow-md">BNYS., M.D.(ACU)., E-RYT., CDNT., CDCT., CIASTM.</div>
            </div>
          </div>
          {/* Mobile Text (Below Image) */}
          <div className="mt-8 text-center lg:hidden">
            <div className="font-display text-[1.4rem] drop-shadow-md text-cream">Dr. S. Vikram Pandy</div>
            <div className="text-[0.6rem] tracking-[0.12em] font-medium uppercase text-gold mt-1.5 leading-relaxed">BNYS., M.D.(ACU)., E-RYT., CDNT., CDCT., CIASTM.</div>
          </div>
        </div>

        {/* Content Block */}
        <div>
          <div className="flex items-center gap-3 mb-3 justify-center lg:justify-start">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-serif-display text-[0.65rem] tracking-[0.4em] text-gold">FOUNDER</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight text-balance mb-4 text-center lg:text-left">
            A lifelong devotion to <em className="text-gold-gradient not-italic">holistic healing</em>.
          </h2>
          <div className="w-16 h-px bg-gold/50 mb-6 mx-auto lg:mx-0" />
          <div className="space-y-4 text-cream/90 leading-relaxed font-light text-[0.95rem] text-center lg:text-justify lg:text-left">
            <p>
              Dr. S. Vikram Pandy is a <strong className="text-white font-medium font-sans">holistic wellness practitioner</strong>, <strong className="text-white font-medium font-sans">naturopathy & yoga physician</strong>, <strong className="text-white font-medium font-sans">internationally recognized yoga teacher</strong>, and <strong className="text-white font-medium font-sans">therapeutic wellness consultant</strong> with expertise in naturopathy, yogic science, acupuncture, rehabilitation support therapies, and integrative healing practices. With a multidisciplinary approach to wellness, he combines traditional healing wisdom with modern therapeutic techniques to support physical well-being, relaxation, mobility, posture correction, pain management, emotional balance, mental clarity, and overall mind-body harmony.
            </p>
            <p>
              He completed his <strong className="text-gold font-medium font-sans">Bachelor of Naturopathy and Yogic Sciences (BNYS)</strong> from Sivaraj Naturopathy and Yoga Medical College, Salem, under The Tamil Nadu Dr. M.G.R. Medical University, Chennai, Tamil Nadu. He also holds a <strong className="text-gold font-medium font-sans">Master Diploma in Acupuncture (M.D.(ACU))</strong> from Acupressure Acupuncture & Alternative Medicine Institute (ACS), Rajasthan, India.
            </p>
            <p>
              Dr. Vikram Pandy is an <strong className="text-gold font-medium font-sans">Experienced Registered Yoga Teacher (E-RYT)</strong> recognized by Yoga Alliance, USA and internationally accredited in yoga education, therapeutic yoga instruction, pranayama, meditation, and holistic wellness practices.
            </p>
            <p>
              His additional internationally affiliated certifications include <strong className="text-gold font-medium font-sans">Certified Dry Needling Therapist (CDNT)</strong>, <strong className="text-gold font-medium font-sans">Certified Diversified Cupping Therapist (CDCT)</strong>, and <strong className="text-gold font-medium font-sans">Certified Instrument-Assisted Soft Tissue Mobilization Therapist (CIASTM)</strong>, with professional clinical and rehabilitation training completed through Keyphysio Academy, Coimbatore, Tamil Nadu, India.
            </p>
            <p>
              He is also professionally trained in <strong className="text-white font-medium font-sans">DORN THERAPY</strong> (German Spine Care Technique), <strong className="text-white font-medium font-sans">SU JOK THERAPY</strong>, and <strong className="text-white font-medium font-sans">SEED THERAPY</strong> through advanced workshops and holistic therapeutic training programs conducted by Galaxy Health Education, Coimbatore, Tamil Nadu, India.
            </p>
            <p>
              With years of practical teaching and wellness experience, Dr. Vikram integrates yoga therapy, therapeutic bodywork, rehabilitation techniques, mindful movement, breathwork, meditation, acupuncture-based wellness practices, and holistic lifestyle guidance to create a healing environment that supports physical recovery, inner balance, emotional well-being, and spiritual awareness. Through Dr. Vikram Yoga & Wellness Centre, his mission is to guide individuals toward healthier living and long-term wellness through natural, integrative, and mindful healing approaches.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}


/* ── Footer ── */
export function Footer() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us" },
    { to: "/services", label: "Yoga Classes" },
    { to: "/services", label: "Wellness Retreats" },
    { to: "/services", label: "Therapies" },
    { to: "/services", label: "Massage Certificate Courses" },
    { to: "/services", label: "Online Classes" },
    { to: "/contact", label: "Contact Us" },
  ];
  return (
    <footer className="bg-emerald-deep text-cream pt-20 pb-10 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <img src={logo} alt="Dr Vikram" className="h-16" />
          <p className="mt-6 text-sm text-cream/70 leading-relaxed">
            Dr. Vikram Yoga & Wellness Centre is dedicated to holistic healing through yoga, meditation, wellness therapies, retreats, and transformative education.
          </p>
          <p className="mt-6 text-sm text-cream/70 leading-relaxed italic">
            “The journey of healing begins within. Let us guide you toward a healthier, happier, more peaceful, and harmonious life through the power of yoga, mindful living, and holistic wellness.”
          </p>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">Quick Links</h4>
          <ul className="mt-6 space-y-3 text-sm text-cream/70">
            {links.map((l, i) => <li key={i}><Link to={l.to} className="hover:text-gold transition-colors">{l.label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">Contact Information</h4>
          <ul className="mt-6 space-y-4 text-sm text-cream/70">
            <li className="flex gap-3"><Phone className="w-4 h-4 text-gold shrink-0" /> +91 8778639989</li>
            <li className="flex gap-3"><Mail className="w-4 h-4 text-gold shrink-0" /> drvikramyogawellness@gmail.com</li>
            <li className="flex gap-3"><MapPin className="w-4 h-4 text-gold shrink-0" /> Dr. Vikram Yoga &amp; Wellness Centre<br />Varkala, Tamil Nadu, India.</li>
          </ul>
        </div>
        <div>
          <h4 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase">Stay Connected</h4>
          <form className="mt-5 flex">
            <input type="email" placeholder="Your email" className="flex-1 bg-transparent border border-cream/20 rounded-l-full px-5 py-3 text-sm placeholder:text-cream/40 focus:border-gold focus:outline-none" />
            <button className="px-5 rounded-r-full bg-gold-gradient text-emerald-deep"><ArrowRight className="w-4 h-4" /></button>
          </form>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors">
                <Icon className="w-4 h-4 text-gold" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-16">
        <div className="gold-divider" />
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/50 tracking-[0.15em] uppercase">
          <span>© {new Date().getFullYear()} Dr. Vikram Yoga & Wellness Centre</span>
          <span>HEAL • HARMONIZE • TRANSFORM</span>
        </div>
      </div>
    </footer>
  );
}

/* ── WhatsApp Float ── */
export function WhatsAppFloat() {
  return (
    <a href="https://wa.me/918778639989" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gold-gradient flex items-center justify-center shadow-gold animate-glow hover:scale-110 transition-transform" aria-label="WhatsApp">
      <MessageCircle className="w-6 h-6 text-emerald-deep" />
    </a>
  );
}

/* ── Book Now Float ── */
export function BookNowFloat() {
  return (
    <a
      href="/contact"
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 group"
      aria-label="Book Now"
    >
      {/* Icon circle */}
      <div className="w-14 h-14 rounded-full bg-emerald-deep flex items-center justify-center shadow-[0_4px_20px_rgba(8,18,13,0.5)] animate-glow hover:scale-110 transition-transform group-hover:bg-gold">
        <CalendarDays className="w-6 h-6 text-gold group-hover:text-emerald-deep transition-colors" />
      </div>
      {/* Label tooltip on hover */}
      <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-1 group-hover:translate-x-0 bg-emerald-deep text-cream text-[0.65rem] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full shadow-soft whitespace-nowrap">
        Book Now
      </span>
    </a>
  );
}
