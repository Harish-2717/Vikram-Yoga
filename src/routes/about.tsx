import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import aboutHero from "@/assets/about.png";
import about from "@/assets/about 1.jpg";
import founder from "@/assets/leader.jpeg";
import {
  Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Youtube,
  MessageCircle, Flower2, Sparkles, Heart, Leaf, ChevronDown,
  GraduationCap, Globe, Mountain, ArrowRight, Activity, Sun, Hand
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
        subtitle="A sanctuary where ancient wisdom meets refined contemporary care."
        bg={aboutHero}
      />
      <AboutSection />
      <PhilosophySection />
      <FounderSection />
      <WhyUsSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

/* ── Shared Navbar ── */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
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
        { to: "/certificate-courses", label: "Certificate Courses" }
      ]
    },
    { to: "/gallery", label: "Gallery" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-emerald-deep/30 backdrop-blur-2xl shadow-soft py-6 border-b border-cream/10" : "py-8"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Dr Vikram Logo" className="h-16 md:h-20 w-auto drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]" />
          <div className="leading-tight">
            <div className="font-serif-display text-[0.65rem] sm:text-[0.7rem] text-gold tracking-[0.25em]">DR. VIKRAM</div>
            <div className="text-[0.55rem] sm:text-[0.65rem] text-cream/70 tracking-[0.2em]">YOGA & WELLNESS</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <div key={l.to} className="relative group py-4">
              <Link
                to={l.to}
                className="text-[0.78rem] tracking-[0.18em] uppercase text-cream/80 hover:text-gold transition-colors"
                activeProps={{ className: "text-[0.78rem] tracking-[0.18em] uppercase text-gold border-b border-gold/60 pb-0.5" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
              {l.sub && (
                <div className="absolute top-full left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="bg-emerald-deep shadow-luxury rounded-2xl p-5 border border-cream/10 flex flex-col gap-4">
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
        <Link
          to="/contact"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-widest uppercase shadow-gold hover:scale-105 transition-transform"
        >
          Book Now <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <button onClick={() => setOpen(!open)} className="lg:hidden text-cream p-2">
          {open ? <X /> : <Menu />}
        </button>
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
  );
}

/* ── Page Hero ── */
export function PageHero({ title, subtitle, bg }: { title: string; subtitle: string; bg: string }) {
  return (
    <section className="relative h-[70vh] min-h-[500px] flex items-end justify-start text-cream overflow-hidden">
      <img src={bg} alt={title} className="absolute inset-0 w-full h-full object-cover brightness-105 saturate-110 object-[25%] md:object-center" />
      {/* Increased overlay for mobile readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/40 to-emerald-deep/20 md:bg-gradient-to-r md:from-emerald-deep/70 md:via-emerald-deep/40 md:to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-14 md:pb-24">
        <div className="flex items-center gap-3 mb-4 md:mb-6">
          <span className="h-px w-8 md:w-12 bg-gold/60" />
          <span className="font-serif-display text-[0.55rem] md:text-[0.75rem] tracking-[0.3em] md:tracking-[0.4em] text-gold uppercase drop-shadow-sm">Dr. Vikram Yoga & Wellness</span>
        </div>
        <h1 className="font-display text-4xl md:text-7xl lg:text-[5.5rem] font-medium text-balance leading-[1.1] drop-shadow-2xl">{title}</h1>
        <p className="mt-4 md:mt-8 text-cream max-w-2xl text-base md:text-2xl font-light italic tracking-wide drop-shadow-lg opacity-95">{subtitle}</p>
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
        <div className="relative lg:col-span-5 order-2 lg:order-1 animate-fade-up">
          <div className="absolute -inset-5 bg-gold-gradient opacity-20 blur-3xl rounded-[3rem]" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-luxury border border-gold/15 group">
            <img src={about} alt="Serene yoga studio" className="w-full h-[400px] sm:h-[450px] lg:h-[480px] xl:h-[520px] object-cover transition-transform duration-[1.5s] group-hover:scale-105" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
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

          <div className="space-y-3 lg:space-y-4 text-muted-foreground leading-relaxed text-sm lg:text-[0.95rem] font-light">
            <p className="text-emerald-deep/90 font-medium">
              At Dr. Vikram Yoga & Wellness Centre, we are dedicated to promoting holistic health through the integration of traditional yogic wisdom, natural healing methods, and modern therapeutic wellness practices.
            </p>
            <p>
              Founded with the vision of creating a peaceful and transformative healing space, our centre supports individuals in restoring balance, improving overall well-being, and experiencing harmony in body, mind, and spirit. Located in the serene coastal surroundings of Varkala, Trivandrum, Kerala, India, our centre offers a rejuvenating environment for individuals seeking healing, relaxation, self-discovery, mindful living, and transformative wellness experiences.
            </p>
            <p>
              Led by Dr. S. Vikram Pandy, our centre provides a professional, compassionate, and personalized approach to holistic healing and wellness education.
            </p>
          </div>

          <div className="mt-8 p-5 lg:p-6 bg-white/50 backdrop-blur-xl rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 blur-3xl rounded-full transition-transform duration-700 group-hover:scale-150 group-hover:bg-gold/20" />
            <div className="relative z-10">
              <h3 className="font-serif-display text-[0.65rem] tracking-[0.3em] uppercase text-emerald-deep mb-4 flex items-center gap-3">
                <Flower2 className="w-4 h-4 text-gold" />
                Our Expertise
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-2.5 gap-x-4">
                {specializations.map((s) => (
                  <div key={s} className="flex items-center gap-2 group/item">
                    <span className="text-[0.9rem] shrink-0 leading-none text-gold/70 group-hover/item:text-gold transition-colors font-light mt-px">ॐ</span>
                    <span className="text-[0.8rem] text-muted-foreground group-hover/item:text-emerald-deep transition-colors leading-[1.2]">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-emerald-deep/80 font-medium italic text-sm text-center lg:text-left border-l-[3px] border-gold/40 pl-4 py-0.5">
            "We believe true wellness is achieved when physical health, mental clarity, emotional well-being, and mindful awareness are brought into balance."
          </p>
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
          <p className="text-cream/80 leading-relaxed text-lg font-light mb-6">
            At Dr. Vikram Yoga & Wellness Centre, wellness is more than physical fitness — it is the balance of body, mind, emotions, energy, and lifestyle.
          </p>
          <div className="space-y-4">
            <h3 className="font-serif-display text-xs tracking-[0.2em] uppercase text-gold">Our approach focuses on creating harmony through:</h3>
            <ul className="space-y-2">
              {focuses.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="text-[0.9rem] shrink-0 leading-none text-gold">ॐ</span>
                  <span className="text-cream/80 text-sm tracking-wide">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="glass p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1),transparent)]" />
          <div className="relative">
            <h3 className="font-display text-2xl text-cream mb-6">A Path Toward Complete Well-being</h3>
            <p className="text-cream/70 text-sm leading-relaxed mb-6">
              We believe yoga is not only a physical practice, but also a path toward:
            </p>
            <div className="grid grid-cols-2 gap-4">
              {["Self-awareness", "Inner balance", "Mental clarity", "Emotional stability", "Complete well-being"].map((b, i) => (
                <div key={b} className="flex items-center gap-3">
                  <span className="font-serif-display text-gold/60 text-[0.65rem]">0{i + 1}</span>
                  <span className="text-sm font-medium text-cream">{b}</span>
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
  const education = [
    "BNYS (Bachelor of Naturopathy and Yogic Sciences)",
    "M.D.(ACU) (Master Diploma in Acupuncture)",
  ];
  const certifications = [
    "E-RYT (Experienced Registered Yoga Teacher)",
    "CDNT (Certified Dry Needling Therapist)",
    "CDCT (Certified Diversified Cupping Therapist)",
    "CIASTM (Certified Instrument-Assisted Soft Tissue Mobilization Therapist)",
  ];
  const additional = ["Dorn Therapy", "Su Jok Therapy", "Seed Therapy"];

  return (
    <section className="relative py-14 lg:py-16 bg-emerald-gradient text-cream overflow-hidden min-h-[calc(100vh-5rem)] flex items-center">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-lotus/10 blur-3xl rounded-full translate-y-1/3 -translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
        {/* Image column */}
        <div className="lg:col-span-2 relative">
          <div className="relative rounded-2xl overflow-hidden shadow-luxury max-w-[280px] sm:max-w-[320px] lg:max-w-full mx-auto">
            <img src={founder} alt="Dr. S. Vikram Pandy" className="w-full h-[280px] sm:h-[340px] lg:h-[420px] xl:h-[460px] object-cover object-top" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/90 via-emerald-deep/10 to-transparent lg:block hidden" />
            <div className="absolute bottom-4 left-4 right-4 hidden lg:block">
              <div className="font-display text-xl md:text-2xl drop-shadow-md">Dr. S. Vikram Pandy</div>
              <div className="text-[0.65rem] tracking-[0.15em] font-medium uppercase text-gold mt-1 drop-shadow-md">BNYS., M.D.(ACU)., E-RYT., CDNT., CDCT., CIASTM.</div>
            </div>
          </div>
          {/* Mobile Text (Below Image) */}
          <div className="mt-6 text-center lg:hidden">
            <div className="font-display text-2xl drop-shadow-md text-cream">Dr. S. Vikram Pandy</div>
            <div className="text-[0.65rem] tracking-[0.12em] font-medium uppercase text-gold mt-2 leading-relaxed">BNYS., M.D.(ACU)., E-RYT., CDNT., CDCT., CIASTM.</div>
          </div>
        </div>

        {/* Content column */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-4 h-4 text-gold" />
            <span className="font-serif-display text-[0.65rem] tracking-[0.4em] text-gold">FOUNDER</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl leading-tight text-balance mb-4">
            A lifelong devotion to <em className="text-gold-gradient not-italic">holistic healing</em>.
          </h2>
          <div className="w-16 h-px bg-gold/50 mb-5" />
          <div className="space-y-3 text-cream/90 leading-relaxed font-light text-sm">
            <p>
              Dr. S. Vikram Pandy is a holistic wellness practitioner, naturopathy & yoga physician, internationally recognized yoga teacher, and therapeutic wellness consultant.
            </p>
            <p>
              He combines traditional healing wisdom with modern therapeutic techniques to support physical well-being, relaxation, mobility, posture correction, pain management, emotional balance, mental clarity, and mind-body harmony.
            </p>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-5">
            <div>
              <h3 className="font-serif-display text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-3">Educational Background</h3>
              <ul className="space-y-2">
                {education.map(e => (
                  <li key={e} className="flex items-start gap-2 text-xs text-cream/70">
                    <span className="text-[0.8rem] shrink-0 leading-none text-gold mt-0.5">ॐ</span> {e}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif-display text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-3">International Certifications</h3>
              <ul className="space-y-2">
                {certifications.map(c => (
                  <li key={c} className="flex items-start gap-2 text-xs text-cream/70">
                    <span className="text-[0.8rem] shrink-0 leading-none text-gold mt-0.5">ॐ</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-5">
            <h3 className="font-serif-display text-[0.6rem] tracking-[0.2em] uppercase text-gold mb-3">Additional Training</h3>
            <div className="flex flex-wrap gap-2">
              {additional.map(a => <span key={a} className="glass px-3 py-1 rounded-md text-xs text-cream/80">{a}</span>)}
            </div>
          </div>

          <p className="mt-5 text-cream/80 leading-relaxed font-light text-sm italic border-l-2 border-gold/40 pl-4">
            His mission is to guide individuals toward healthier living and long-term wellness through natural and mindful healing approaches.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Why Us Section ── */
function WhyUsSection() {
  const items = [
    { icon: Heart, t: "Holistic Wellness", d: "A comprehensive holistic wellness approach." },
    { icon: Leaf, t: "Personalized Programs", d: "Personalized wellness programs tailored for you." },
    { icon: GraduationCap, t: "Recognized Teacher", d: "Internationally recognized yoga teacher guidance." },
    { icon: Sparkles, t: "Tradition & Modern", d: "Traditional + modern therapeutic integration." },
    { icon: Globe, t: "Peaceful Environment", d: "A serene, peaceful healing environment." },
    { icon: Activity, t: "Mobility Support", d: "Dedicated mobility and rehabilitation support." },
    { icon: Sun, t: "Mindful Movement", d: "Yoga and mindful movement practices." },
    { icon: Hand, t: "Therapeutic Bodywork", d: "Professional therapeutic bodywork sessions." },
    { icon: Mountain, t: "Transformative Retreats", d: "Transformative holistic wellness retreats." },
    { icon: Heart, t: "Compassionate Care", d: "Professional compassionate guidance." },
  ];
  return (
    <section className="py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-serif-display text-[0.9rem] tracking-[0.5em] text-emerald">WHY CHOOSE US</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-emerald-deep text-balance">
            A Personalized Approach to <em className="text-gold-gradient not-italic">Holistic Healing & Wellness</em>
          </h2>
          <div className="gold-divider mt-8 max-w-sm mx-auto" />
          <p className="mt-6 text-muted-foreground leading-relaxed text-[0.95rem]">
            Every individual is unique, and our approach is designed to provide personalized guidance, therapeutic support, and holistic healing experiences.
          </p>
        </div>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {items.map(({ icon: Icon, t, d }) => (
            <div key={t} className="group relative bg-card rounded-2xl p-4 lg:p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 border border-border">
              {/* Mobile: icon + title on same row. Desktop: stacked */}
              <div className="flex items-center gap-3 lg:flex-col lg:items-start lg:gap-0">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gold-gradient flex items-center justify-center shadow-gold shrink-0 lg:mb-5">
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-deep" />
                </div>
                <h3 className="font-display text-base lg:text-xl text-emerald-deep">{t}</h3>
              </div>
              <p className="text-[0.78rem] text-muted-foreground leading-relaxed mt-2 lg:mt-0">{d}</p>
            </div>
          ))}
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
    { to: "/services", label: "Certificate Courses" },
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
            <li className="flex gap-3"><Mail className="w-4 h-4 text-gold shrink-0" /> drvikrampandy@gmail.com</li>
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
          <span>Heal • Balance • Transform</span>
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
