import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  ArrowRight,
  Clock,
  Globe,
} from "lucide-react";
import { Navbar, Footer, WhatsAppFloat, PageHero } from "./about";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Get in touch with Dr. Vikram Yoga & Wellness Centre for class enrollment, retreat bookings, or a personal wellness consultation.",
      },
    ],
  }),
});

function ContactPage() {
  return (
    <main className="overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Get in Touch"
        subtitle="Begin your transformation — we respond to every enquiry within 24 hours."
        bg={hero}
      />
      <ContactSection />
      <MapSection />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}

function ContactSection() {
  const [interest, setInterest] = useState("Consultation");
  const [specificInterest, setSpecificInterest] = useState("");

  const subOptions: Record<string, string[]> = {
    "Wellness Therapy": [
      "Select Therapy...",
      "Thai Yoga Massage",
      "Shiatsu Therapy",
      "Deep Tissue Therapy",
      "Ayurvedic Wellness Massage",
      "Swedish Massage",
      "Reflexology Therapy",
      "Acupuncture-Based Wellness Support",
      "Cupping Therapy",
      "IASTM",
      "Dorn Therapy",
    ],
    "Certification Course": [
      "Select Course...",
      "100 Hour Yoga Teacher Training",
      "200 Hour Yoga Teacher Training",
      "300 Hour Yoga Teacher Training",
    ],
    "Yoga Classes": [
      "Select Class...",
      "Hatha Yoga",
      "Hatha Flow",
      "Vinyasa Flow",
      "Yin Yoga",
      "Pranayama & Meditation",
      "Therapeutic Sessions",
    ],
    Retreat: [
      "Select Retreat...",
      "7 Days Holistic Wellness",
      "14 Days Holistic Wellness",
      "Meditation Retreat",
      "Couples Retreat",
    ],
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const intent = params.get("interest");
    const specific = params.get("specific");

    if (intent) {
      const validOptions = [
        "Yoga Classes",
        "Wellness Therapy",
        "Retreat",
        "Certification Course",
        "Online Sessions",
        "Consultation",
      ];
      if (validOptions.includes(intent)) {
        setInterest(intent);
      }
    }

    if (specific) {
      setSpecificInterest(specific);
    }
  }, []);

  // Update specific interest if parent category changes to avoid stale selections
  const handleInterestChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterest(e.target.value);
    setSpecificInterest("");
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      interest: interest,
      specificInterest: specificInterest,
      message: formData.get("message") as string,
    };

    try {
      const response = await fetch(getApiUrl("contact.php"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.success) {
        toast.success("Enquiry sent successfully! We will get back to you within 24 hours.");
        form.reset();
        setSpecificInterest("");
      } else {
        toast.error(res.error || "Failed to submit enquiry. Please try again.");
      }
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      toast.error("An error occurred: " + (err?.message || String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-28 bg-emerald-gradient text-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-gold/10 blur-3xl rounded-full -translate-y-1/3 translate-x-1/3" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-14">
        {/* Left: Info */}
        <div>
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-gold">
            REACH US
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-balance leading-tight">
            Begin your <em className="text-gold-gradient not-italic">transformation</em>.
          </h2>
          <p className="mt-6 text-cream/80 leading-relaxed max-w-md">
            Reach out for class enrollment, retreat reservations, or a personal wellness
            consultation. Our team is here to guide you to the right path.
          </p>

          {/* Contact Details */}
          <div className="mt-10 space-y-5">
            {[
              { Icon: Phone, label: "Phone", value: "+91 8778639989", href: "tel:+918778639989" },
              {
                Icon: Mail,
                label: "Email",
                value: "drvikramyogawellness@gmail.com",
                href: "mailto:drvikramyogawellness@gmail.com",
              },
              {
                Icon: MapPin,
                label: "Address",
                value: "Dr. Vikram Yoga & Wellness Centre, N Cliff Rd, Varkala, Kerala 695141",
                href: "https://maps.google.com/?q=Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141",
              },
              {
                Icon: Clock,
                label: "Hours",
                value: "Mon–Sat: 6am – 8pm  |  Sun: 6am – 8pm",
                href: null,
              },
              {
                Icon: Globe,
                label: "Website",
                value: "www.drvikramyogawellness.com",
                href: "https://www.drvikramyogawellness.com/",
              },
            ].map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full glass flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/50 mb-1">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="text-cream/90 hover:text-gold transition-colors"
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {value}
                    </a>
                  ) : (
                    <span className="text-cream/90">{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social */}
          <div className="mt-10">
            <div className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/50 mb-4">
              Follow Us
            </div>
            <p className="text-sm text-cream/80 mb-4 leading-relaxed">
              Follow us on Instagram for wellness tips, yoga inspiration, healing practices, retreat
              updates, and educational wellness content.
            </p>
            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "https://www.instagram.com/dr.vikram_yoga_wellness?stkn=MTQ0YnhucG94cXJ1Nw==", label: "Instagram" },
                { Icon: Facebook, href: "#", label: "Facebook" },
                { Icon: Youtube, href: "#", label: "YouTube" },
                { Icon: MessageCircle, href: "https://wa.me/918778639989", label: "WhatsApp" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-gold/20 transition-colors"
                >
                  <Icon className="w-4 h-4 text-gold" />
                </a>
              ))}
            </div>
          </div>

          {/* WhatsApp CTA */}
          <div className="mt-10">
            <p className="text-sm text-cream/80 mb-4 leading-relaxed">
              Connect with us directly on WhatsApp for class bookings, retreat inquiries, and
              wellness consultations.
            </p>
            <a
              href="https://wa.me/918778639989"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full glass border border-gold/30 text-gold text-xs font-semibold tracking-[0.2em] uppercase hover:bg-gold/10 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Right: Form */}
        <form
          id="contact-form"
          onSubmit={handleSubmit}
          className="glass rounded-3xl p-8 md:p-10 space-y-5"
        >
          <h3 className="font-display text-2xl text-cream mb-2">Send an Enquiry</h3>
          <div className="gold-divider mb-6" />
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" type="text" id="contact-name" name="name" required />
            <Field label="Email Address" type="email" id="contact-email" name="email" required />
          </div>
          <Field label="Phone Number" type="tel" id="contact-phone" name="phone" required />
          <div>
            <label
              htmlFor="contact-interest"
              className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70"
            >
              Interest
            </label>
            <select
              id="contact-interest"
              name="interest"
              value={interest}
              onChange={handleInterestChange}
              className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-gold focus:outline-none"
            >
              {[
                "Yoga Classes",
                "Wellness Therapy",
                "Retreat",
                "Certification Course",
                "Online Sessions",
                "Consultation",
              ].map((o) => (
                <option key={o} value={o} className="bg-emerald-deep">
                  {o}
                </option>
              ))}
            </select>
          </div>

          {subOptions[interest] && (
            <div className="animate-fade-up">
              <label
                htmlFor="contact-specific"
                className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70"
              >
                Specific{" "}
                {interest
                  .replace("Classes", "Class")
                  .replace("Sessions", "Session")
                  .replace("Course", "Course")}
              </label>
              <select
                id="contact-specific"
                name="specificInterest"
                value={specificInterest}
                onChange={(e) => setSpecificInterest(e.target.value)}
                className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream focus:border-gold focus:outline-none"
              >
                {subOptions[interest].map((o) => (
                  <option
                    key={o}
                    value={o === subOptions[interest][0] ? "" : o}
                    className="bg-emerald-deep"
                  >
                    {o}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label
              htmlFor="contact-message"
              className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70"
            >
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none resize-none"
              placeholder="Tell us about your wellness goals..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-7 py-4 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.25em] uppercase shadow-gold hover:scale-[1.02] transition-transform flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Sending..." : "Send Enquiry"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <section id="map" className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="font-serif-display text-[0.7rem] tracking-[0.4em] text-emerald">
            FIND US
          </span>
          <h2 className="mt-4 font-display text-4xl text-emerald-deep">
            Our <em className="text-gold-gradient not-italic">Sanctuary</em>
          </h2>
        </div>
        {/* Map placeholder with styled embed */}
        <a 
          href="https://maps.google.com/?q=Dr.+Vikram+Yoga+%26+Wellness+Centre,+N+Cliff+Rd,+Varkala,+Kerala+695141"
          target="_blank"
          rel="noreferrer"
          className="block relative rounded-3xl overflow-hidden shadow-luxury h-96 bg-emerald-deep/10 border border-border group"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-emerald-deep group-hover:bg-emerald-deep/5 transition-colors duration-300">
            <MapPin className="w-12 h-12 text-gold group-hover:scale-110 transition-transform duration-300" strokeWidth={1.2} />
            <p className="font-display text-2xl text-emerald-deep text-center px-4">
              Dr. Vikram Yoga & Wellness Centre
              <br />
              N Cliff Rd, Varkala, Kerala 695141
            </p>
            <div className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-gradient text-emerald-deep text-xs font-semibold tracking-[0.2em] uppercase shadow-gold group-hover:scale-105 transition-transform">
              Open in Google Maps <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

function Field({
  label,
  type,
  id,
  name,
  required,
}: {
  label: string;
  type: string;
  id: string;
  name?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[0.7rem] tracking-[0.25em] uppercase text-cream/70">
        {label}
      </label>
      <input
        id={id}
        name={name || id}
        type={type}
        required={required}
        className="mt-2 w-full bg-transparent border-b border-cream/30 py-3 text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none"
      />
    </div>
  );
}
