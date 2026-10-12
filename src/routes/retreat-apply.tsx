import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat } from "./about";
import {
  CheckCircle2,
  ChevronRight,
  Calendar,
  User,
  Heart,
  Star,
  MapPin,
  Leaf,
  Shield,
} from "lucide-react";

export const Route = createFileRoute("/retreat-apply")({
  component: RetreatApplyPage,
  head: () => ({
    meta: [
      { title: "Retreat Application — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Apply for a Yoga & Wellness Retreat at Dr. Vikram Yoga & Wellness Centre, Varkala. Fill in your details for a holistic healing experience.",
      },
    ],
  }),
});

interface RetreatProgram {
  id: string;
  name: string;
  description?: string;
  duration?: string;
}

type FormErrors = Record<string, string>;

const REFERRAL_OPTIONS = [
  "Google",
  "Website",
  "Instagram",
  "Facebook",
  "Friend / Referral",
  "Poster / Flyer",
  "Previous Student / Client",
  "Other",
];

const DIETARY_OPTIONS = [
  { value: "No", label: "No dietary requirements" },
  { value: "Vegetarian", label: "Vegetarian" },
  { value: "Vegan", label: "Vegan" },
  { value: "Food Allergy / Intolerance", label: "Food Allergy / Intolerance" },
  { value: "Other", label: "Other" },
];

function SectionHeader({
  number,
  title,
  icon: Icon,
}: {
  number: string;
  title: string;
  icon: React.ComponentType<any>;
}) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-[#083d25]/10">
      <span className="w-9 h-9 rounded-full bg-[#083d25] text-white flex items-center justify-center text-sm font-bold shrink-0">
        {number}
      </span>
      <div className="flex items-center gap-2">
        <Icon className="w-4.5 h-4.5 text-[#083d25]" />
        <h2 className="font-display font-bold text-[#083d25] text-lg tracking-wide uppercase">
          {title}
        </h2>
      </div>
    </div>
  );
}

function FieldLabel({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="block text-sm font-semibold text-[#2d4a3a] mb-1.5">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500 font-medium">{message}</p>;
}

const inputClass =
  "w-full border border-[#c8d9cc] rounded-xl px-4 py-3 text-sm text-[#1a3025] bg-white focus:outline-none focus:ring-2 focus:ring-[#083d25]/30 focus:border-[#083d25] transition-all placeholder:text-[#a0b8a8]";
const textareaClass =
  "w-full border border-[#c8d9cc] rounded-xl px-4 py-3 text-sm text-[#1a3025] bg-white focus:outline-none focus:ring-2 focus:ring-[#083d25]/30 focus:border-[#083d25] transition-all placeholder:text-[#a0b8a8] resize-none";
const radioClass = "w-4 h-4 accent-[#083d25] cursor-pointer";
const checkboxClass = "w-4 h-4 accent-[#083d25] cursor-pointer rounded";

function RetreatApplyPage() {
  const [programs, setPrograms] = useState<RetreatProgram[]>([]);
  const [programsLoading, setProgramsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submittedId, setSubmittedId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState({
    // Program
    program_id: "",
    program_name: "",
    // Section 1: Personal
    first_name: "",
    surname: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    // Section 2: Accommodation
    requires_accommodation: "" as "" | "yes" | "no",
    accommodation_preference: "",
    checkin_date: "",
    checkout_date: "",
    num_nights: "",
    // Section 3: Yoga Experience
    practised_yoga_before: "" as "" | "yes" | "no",
    yoga_duration: "",
    yoga_styles: "",
    // Section 4: Health
    has_health_conditions: "" as "" | "yes" | "no",
    health_details: "",
    dietary_requirements: "No",
    dietary_other: "",
    dietary_details: "",
    // Section 5: Expectations
    expectations: "",
    special_requests: "",
    // Section 6: Referral
    referral_source: "",
    referral_other: "",
    // Section 7: Declaration
    declaration_agreed: false,
  });

  // Fetch programs on mount & auto-migrate tables
  useEffect(() => {
    const init = async () => {
      try {
        // Auto-create tables if not exist
        await fetch(getApiUrl("retreat-migrate.php"), { method: "POST" });
        // Fetch programs
        const res = await fetch(getApiUrl("retreat-programs.php"));
        if (res.ok) {
          const data = await res.json();
          setPrograms(data || []);
          if (data?.length > 0) {
            let matchedProg = data[0];
            if (typeof window !== "undefined") {
              const urlParams = new URLSearchParams(window.location.search);
              const requested = urlParams.get("course") || urlParams.get("program");
              if (requested) {
                const found = data.find(
                  (p: RetreatProgram) =>
                    p.id.toLowerCase() === requested.toLowerCase() ||
                    p.name.toLowerCase().includes(requested.toLowerCase())
                );
                if (found) matchedProg = found;
              }
            }
            setForm((prev) => ({
              ...prev,
              program_id: matchedProg.id,
              program_name: matchedProg.name,
            }));
          }
        }
      } catch {
        toast.error("Failed to load retreat programs.");
      } finally {
        setProgramsLoading(false);
      }
    };
    init();
  }, []);

  // Auto-calculate nights
  useEffect(() => {
    if (form.checkin_date && form.checkout_date) {
      const cin = new Date(form.checkin_date);
      const cout = new Date(form.checkout_date);
      const diff = Math.round((cout.getTime() - cin.getTime()) / (1000 * 60 * 60 * 24));
      if (diff > 0) {
        setForm((prev) => ({ ...prev, num_nights: String(diff) }));
      } else {
        setForm((prev) => ({ ...prev, num_nights: "" }));
      }
    }
  }, [form.checkin_date, form.checkout_date]);

  const set = useCallback((field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (prev[field]) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return prev;
    });
  }, []);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.program_name) newErrors.program_name = "Please select a retreat program.";
    if (!form.first_name.trim()) newErrors.first_name = "First name is required.";
    if (!form.surname.trim()) newErrors.surname = "Surname is required.";
    if (!form.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) newErrors.phone = "Phone / WhatsApp number is required.";
    if (!form.age.trim()) newErrors.age = "Age is required.";
    else if (isNaN(Number(form.age)) || Number(form.age) < 16 || Number(form.age) > 100)
      newErrors.age = "Please enter a valid age (16–100).";
    if (!form.gender) newErrors.gender = "Please select your gender.";
    if (!form.requires_accommodation) newErrors.requires_accommodation = "Please indicate your accommodation requirement.";
    if (form.requires_accommodation === "yes") {
      if (!form.accommodation_preference) newErrors.accommodation_preference = "Please select accommodation preference.";
      if (!form.checkin_date) newErrors.checkin_date = "Please select a check-in date.";
      if (!form.checkout_date) newErrors.checkout_date = "Please select a check-out date.";
      if (form.checkin_date && form.checkout_date && form.checkout_date <= form.checkin_date) {
        newErrors.checkout_date = "Check-out date must be after check-in date.";
      }
    }
    if (!form.practised_yoga_before) newErrors.practised_yoga_before = "Please indicate if you have practised yoga.";
    if (!form.has_health_conditions) newErrors.has_health_conditions = "Please answer this question.";
    if (!form.declaration_agreed) newErrors.declaration_agreed = "You must agree to the declaration before submitting.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please correct the errors below before submitting.");
      // Scroll to first error
      setTimeout(() => {
        const el = document.querySelector("[data-error]");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        declaration_agreed: form.declaration_agreed ? "1" : "0",
      };

      const res = await fetch(getApiUrl("retreat-apply.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSubmittedId(data.applicationId || "");
        setShowSuccess(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        toast.error(data.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <main className="overflow-x-hidden bg-[#f5f9f6] min-h-screen">
        <Navbar />
        <div className="pt-28 pb-20 px-4 flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-10 text-center animate-fade-up">
            <div className="w-20 h-20 rounded-full bg-[#e6f4ec] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-11 h-11 text-[#083d25]" />
            </div>
            <h1 className="font-display font-bold text-2xl text-[#083d25] mb-2">
              Application Submitted!
            </h1>
            {submittedId && (
              <p className="text-xs text-[#ba8336] font-semibold tracking-widest uppercase mb-3">
                Application ID: {submittedId}
              </p>
            )}
            <p className="text-[#4a6355] text-sm leading-relaxed mb-2">
              Thank you for applying to{" "}
              <strong className="text-[#083d25]">Dr. Vikram Yoga & Wellness Centre</strong>.
            </p>
            <p className="text-[#7a9a88] text-sm leading-relaxed mb-8">
              Our team will review your application and contact you via{" "}
              <strong>WhatsApp, phone or email</strong> to confirm availability, retreat details,
              accommodation and payment information.
            </p>
            <a
              href="/"
              className="inline-block w-full py-3.5 bg-[#083d25] hover:bg-[#062e1c] text-white font-bold text-sm rounded-xl transition-colors shadow-md"
            >
              Return to Homepage
            </a>
          </div>
        </div>
        <Footer />
        <WhatsAppFloat />
        <BookNowFloat />
      </main>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <main className="overflow-x-hidden bg-[#f5f9f6] min-h-screen">
      <Navbar />

      {/* Hero Banner */}
      <div className="pt-20 bg-gradient-to-br from-[#083d25] via-[#0d4f2e] to-[#062218] py-14 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="inline-block text-[#deb05e] text-[0.7rem] tracking-[0.3em] uppercase font-bold mb-3">
            Yoga & Wellness Retreat
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3 leading-tight">
            Retreat Application Form
          </h1>
          <p className="text-white/60 text-sm leading-relaxed max-w-lg mx-auto">
            Complete the form below to apply for your transformative retreat experience at Dr. Vikram
            Yoga & Wellness Centre, Varkala.
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-white/50 text-xs">
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#deb05e]" /> Secure & Confidential
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 text-[#deb05e]" /> Expert Guidance
            </span>
            <span className="flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5 text-[#deb05e]" /> Holistic Healing
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <form onSubmit={handleSubmit} noValidate>

          {/* PROGRAM SELECTION */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dce8df] p-6 sm:p-8 mb-6">
            <div className="mb-5">
              <span className="inline-block text-[0.65rem] text-[#ba8336] font-bold tracking-[0.25em] uppercase mb-1">
                Program Selection
              </span>
              <h2 className="font-display font-bold text-[#083d25] text-xl">
                Choose Your Retreat
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Service Category</FieldLabel>
                <div className={`${inputClass} bg-[#f7fbf8] text-[#4a6355] cursor-default`}>
                  Yoga & Wellness Retreat
                </div>
              </div>
              <div>
                <FieldLabel required>Course / Program</FieldLabel>
                {programsLoading ? (
                  <div className={`${inputClass} text-[#a0b8a8]`}>Loading programs…</div>
                ) : (
                  <select
                    className={inputClass}
                    value={form.program_id}
                    onChange={(e) => {
                      const prog = programs.find((p) => p.id === e.target.value);
                      set("program_id", e.target.value);
                      set("program_name", prog?.name || "");
                    }}
                    required
                  >
                    <option value="">— Select Retreat Program —</option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                        {p.duration ? ` (${p.duration})` : ""}
                      </option>
                    ))}
                  </select>
                )}
                {errors.program_name && (
                  <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.program_name}</p>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 1: PERSONAL INFORMATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dce8df] p-6 sm:p-8 mb-6">
            <SectionHeader number="1" title="Personal Information" icon={User} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
              <div>
                <FieldLabel required>First Name</FieldLabel>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Enter your first name"
                  value={form.first_name}
                  onChange={(e) => set("first_name", e.target.value)}
                />
                {errors.first_name && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.first_name}</p>}
              </div>
              <div>
                <FieldLabel required>Surname</FieldLabel>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Enter your surname"
                  value={form.surname}
                  onChange={(e) => set("surname", e.target.value)}
                />
                {errors.surname && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.surname}</p>}
              </div>
              <div>
                <FieldLabel required>Email Address</FieldLabel>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
                {errors.email && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
              </div>
              <div>
                <FieldLabel required>Phone / WhatsApp Number</FieldLabel>
                <input
                  type="tel"
                  className={inputClass}
                  placeholder="Enter your phone / WhatsApp number"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                />
                {errors.phone && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.phone}</p>}
              </div>
              <div>
                <FieldLabel required>Age</FieldLabel>
                <input
                  type="number"
                  min="16"
                  max="100"
                  className={inputClass}
                  placeholder="Enter your age"
                  value={form.age}
                  onChange={(e) => set("age", e.target.value)}
                />
                {errors.age && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.age}</p>}
              </div>
              <div>
                <FieldLabel required>Gender</FieldLabel>
                <div className="flex flex-wrap gap-4 mt-2">
                  {["Male", "Female", "Other / Prefer not to say"].map((opt) => (
                    <label key={opt} className="flex items-center gap-2 text-sm text-[#2d4a3a] cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={opt}
                        className={radioClass}
                        checked={form.gender === opt}
                        onChange={() => set("gender", opt)}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
                {errors.gender && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.gender}</p>}
              </div>
            </div>
          </div>

          {/* SECTION 2: ACCOMMODATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dce8df] p-6 sm:p-8 mb-6">
            <SectionHeader number="2" title="Accommodation" icon={MapPin} />

            <div className="mb-4">
              <FieldLabel required>Do you require accommodation?</FieldLabel>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-sm text-[#2d4a3a] cursor-pointer">
                  <input type="radio" name="requires_accommodation" value="yes" className={radioClass} checked={form.requires_accommodation === "yes"} onChange={() => set("requires_accommodation", "yes")} />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-[#2d4a3a] cursor-pointer">
                  <input type="radio" name="requires_accommodation" value="no" className={radioClass} checked={form.requires_accommodation === "no"} onChange={() => set("requires_accommodation", "no")} />
                  No
                </label>
              </div>
              {errors.requires_accommodation && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.requires_accommodation}</p>}
            </div>

            {/* Conditional accommodation fields */}
            {form.requires_accommodation === "yes" && (
              <div className="border border-[#dce8df] rounded-xl p-4 sm:p-5 bg-[#f7fbf8] space-y-4">
                <div>
                  <FieldLabel required>Accommodation Preference</FieldLabel>
                  <div className="flex gap-6 mt-2">
                    {["AC Room", "Non-AC Room"].map((opt) => (
                      <label key={opt} className="flex items-center gap-2 text-sm text-[#2d4a3a] cursor-pointer">
                        <input type="radio" name="accommodation_preference" value={opt} className={radioClass} checked={form.accommodation_preference === opt} onChange={() => set("accommodation_preference", opt)} />
                        {opt}
                      </label>
                    ))}
                  </div>
                  {errors.accommodation_preference && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.accommodation_preference}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <FieldLabel required>Preferred Check-in Date</FieldLabel>
                    <input
                      type="date"
                      min={today}
                      className={inputClass}
                      value={form.checkin_date}
                      onChange={(e) => set("checkin_date", e.target.value)}
                    />
                    {errors.checkin_date && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.checkin_date}</p>}
                  </div>
                  <div>
                    <FieldLabel required>Preferred Check-out Date</FieldLabel>
                    <input
                      type="date"
                      min={form.checkin_date || today}
                      className={inputClass}
                      value={form.checkout_date}
                      onChange={(e) => set("checkout_date", e.target.value)}
                    />
                    {errors.checkout_date && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.checkout_date}</p>}
                  </div>
                  <div>
                    <FieldLabel>Number of Nights</FieldLabel>
                    <input
                      type="number"
                      className={`${inputClass} bg-[#eef5f0] text-[#4a6355]`}
                      value={form.num_nights}
                      readOnly
                      placeholder="Auto-calculated"
                    />
                  </div>
                </div>

                <p className="text-[0.72rem] text-[#7a9a88] leading-relaxed italic">
                  Accommodation is subject to availability. Accommodation charges may vary depending on
                  the selected retreat and duration of stay.
                </p>
              </div>
            )}
          </div>

          {/* SECTION 3: YOGA EXPERIENCE */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dce8df] p-6 sm:p-8 mb-6">
            <SectionHeader number="3" title="Yoga & Wellness Experience" icon={Leaf} />

            <div className="mb-4">
              <FieldLabel required>Have you practised Yoga before?</FieldLabel>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-sm text-[#2d4a3a] cursor-pointer">
                  <input type="radio" name="practised_yoga_before" value="yes" className={radioClass} checked={form.practised_yoga_before === "yes"} onChange={() => set("practised_yoga_before", "yes")} />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-[#2d4a3a] cursor-pointer">
                  <input type="radio" name="practised_yoga_before" value="no" className={radioClass} checked={form.practised_yoga_before === "no"} onChange={() => set("practised_yoga_before", "no")} />
                  No
                </label>
              </div>
              {errors.practised_yoga_before && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.practised_yoga_before}</p>}
            </div>

            {form.practised_yoga_before === "yes" && (
              <div className="space-y-4">
                <div>
                  <FieldLabel>If yes, how long have you been practising Yoga?</FieldLabel>
                  <textarea
                    className={textareaClass}
                    rows={2}
                    placeholder="e.g. 2 years, 6 months..."
                    value={form.yoga_duration}
                    onChange={(e) => set("yoga_duration", e.target.value)}
                  />
                </div>
                <div>
                  <FieldLabel>Which style of Yoga or wellness practices have you practised?</FieldLabel>
                  <textarea
                    className={textareaClass}
                    rows={3}
                    placeholder="e.g. Hatha Yoga, Vinyasa, Meditation, Pranayama..."
                    value={form.yoga_styles}
                    onChange={(e) => set("yoga_styles", e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECTION 4: HEALTH INFORMATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dce8df] p-6 sm:p-8 mb-6">
            <SectionHeader number="4" title="Health Information" icon={Heart} />

            <div className="mb-5">
              <FieldLabel required>
                Do you have any current health conditions, injuries, physical limitations or allergies
                that we should be aware of?
              </FieldLabel>
              <div className="flex gap-6 mt-2">
                <label className="flex items-center gap-2 text-sm text-[#2d4a3a] cursor-pointer">
                  <input type="radio" name="has_health_conditions" value="yes" className={radioClass} checked={form.has_health_conditions === "yes"} onChange={() => set("has_health_conditions", "yes")} />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-[#2d4a3a] cursor-pointer">
                  <input type="radio" name="has_health_conditions" value="no" className={radioClass} checked={form.has_health_conditions === "no"} onChange={() => set("has_health_conditions", "no")} />
                  No
                </label>
              </div>
              {errors.has_health_conditions && <p data-error className="mt-1 text-xs text-red-500 font-medium">{errors.has_health_conditions}</p>}
              {form.has_health_conditions === "yes" && (
                <div className="mt-3">
                  <FieldLabel>If yes, please provide details:</FieldLabel>
                  <textarea
                    className={textareaClass}
                    rows={3}
                    placeholder="Please describe your health conditions, injuries or allergies..."
                    value={form.health_details}
                    onChange={(e) => set("health_details", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="mb-4">
              <FieldLabel>Do you have any dietary requirements or food allergies?</FieldLabel>
              <div className="flex flex-col gap-2.5 mt-2">
                {DIETARY_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2.5 text-sm text-[#2d4a3a] cursor-pointer">
                    <input
                      type="radio"
                      name="dietary_requirements"
                      value={opt.value}
                      className={radioClass}
                      checked={form.dietary_requirements === opt.value}
                      onChange={() => set("dietary_requirements", opt.value)}
                    />
                    {opt.label}
                    {opt.value === "Other" && form.dietary_requirements === "Other" && (
                      <input
                        type="text"
                        className="ml-2 border border-[#c8d9cc] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#083d25]/30 w-48"
                        placeholder="Please specify..."
                        value={form.dietary_other}
                        onChange={(e) => set("dietary_other", e.target.value)}
                      />
                    )}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <FieldLabel>Please provide details if applicable:</FieldLabel>
              <textarea
                className={textareaClass}
                rows={2}
                placeholder="Any specific dietary details or restrictions..."
                value={form.dietary_details}
                onChange={(e) => set("dietary_details", e.target.value)}
              />
            </div>
          </div>

          {/* SECTION 5: EXPECTATIONS */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dce8df] p-6 sm:p-8 mb-6">
            <SectionHeader number="5" title="Your Expectations" icon={Star} />

            <div className="mb-4">
              <FieldLabel>What would you like to experience or achieve during this retreat?</FieldLabel>
              <textarea
                className={textareaClass}
                rows={4}
                placeholder="Share your goals, intentions, and what you hope to achieve..."
                value={form.expectations}
                onChange={(e) => set("expectations", e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Is there anything specific you would like us to know or arrange for your stay?</FieldLabel>
              <textarea
                className={textareaClass}
                rows={3}
                placeholder="Special arrangements, questions, or anything else you'd like to share..."
                value={form.special_requests}
                onChange={(e) => set("special_requests", e.target.value)}
              />
            </div>
          </div>

          {/* SECTION 6: HOW DID YOU HEAR ABOUT US */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dce8df] p-6 sm:p-8 mb-6">
            <SectionHeader number="6" title="How Did You Hear About Us?" icon={Calendar} />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {REFERRAL_OPTIONS.map((opt) => (
                <label key={opt} className="flex items-center gap-2.5 text-sm text-[#2d4a3a] cursor-pointer">
                  <input
                    type="radio"
                    name="referral_source"
                    value={opt}
                    className={radioClass}
                    checked={form.referral_source === opt}
                    onChange={() => set("referral_source", opt)}
                  />
                  {opt}
                  {opt === "Other" && form.referral_source === "Other" && (
                    <input
                      type="text"
                      className="ml-1 border border-[#c8d9cc] rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#083d25]/30 w-36"
                      placeholder="Please specify..."
                      value={form.referral_other}
                      onChange={(e) => set("referral_other", e.target.value)}
                    />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* SECTION 7: DECLARATION */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#dce8df] p-6 sm:p-8 mb-6">
            <SectionHeader number="7" title="Declaration" icon={Shield} />

            <div className="bg-[#f7fbf8] rounded-xl p-5 border border-[#c8d9cc] mb-5 space-y-3">
              <p className="text-sm text-[#2d4a3a] leading-relaxed">
                I confirm that the information provided in this application is true and complete to the
                best of my knowledge.
              </p>
              <p className="text-sm text-[#2d4a3a] leading-relaxed">
                I understand that yoga, wellness activities, therapies and retreat practices may involve
                physical activity. I agree to inform the Centre and instructors about any relevant health
                conditions, injuries, physical limitations, allergies or other circumstances that may
                affect my participation.
              </p>
              <p className="text-sm text-[#2d4a3a] leading-relaxed">
                I agree to follow the instructions and safety guidelines provided by the Centre and its
                instructors during the retreat.
              </p>
            </div>

            <label className={`flex items-start gap-3 cursor-pointer ${errors.declaration_agreed ? "ring-1 ring-red-400 rounded-lg p-2" : ""}`}>
              <input
                type="checkbox"
                className={`${checkboxClass} mt-0.5 shrink-0`}
                checked={form.declaration_agreed}
                onChange={(e) => set("declaration_agreed", e.target.checked)}
              />
              <span className="text-sm text-[#2d4a3a] font-semibold leading-relaxed">
                I have read and agree to the above declaration.
              </span>
            </label>
            {errors.declaration_agreed && (
              <p data-error className="mt-2 text-xs text-red-500 font-medium">{errors.declaration_agreed}</p>
            )}
          </div>

          {/* SUBMIT */}
          <div className="bg-gradient-to-r from-[#083d25] to-[#0d5535] rounded-2xl p-6 sm:p-8 text-center">
            <h3 className="font-display font-bold text-white text-xl mb-2">
              Submit Retreat Application
            </h3>
            <p className="text-white/60 text-sm mb-6 leading-relaxed">
              Our team will review your application and contact you via WhatsApp, phone or email to
              confirm availability, retreat details, accommodation and payment information.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2.5 px-10 py-4 bg-[#deb05e] hover:bg-[#cc9d4e] text-[#083d25] font-extrabold text-sm rounded-xl shadow-[0_6px_20px_rgba(222,176,94,0.35)] hover:shadow-[0_8px_24px_rgba(222,176,94,0.45)] transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-[#083d25]/40 border-t-[#083d25] rounded-full animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  SUBMIT RETREAT APPLICATION
                  <ChevronRight className="w-4.5 h-4.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}
