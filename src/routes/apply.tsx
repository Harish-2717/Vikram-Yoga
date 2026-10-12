import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat } from "./about";
import {
  CheckCircle,
  Calendar,
  Sparkles,
  Info,
  CheckCircle2,
  FileCheck,
  Building2,
  HeartPulse,
  Compass,
  MessageCircle,
  Heart,
  User,
  ShieldCheck,
  ChevronDown
} from "lucide-react";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
  head: () => ({
    meta: [
      { title: "Apply — Dr. Vikram Yoga & Wellness Centre" },
      {
        name: "description",
        content:
          "Apply for our transformative Yoga & Wellness Retreats and Massage Certification Courses in Varkala, Kerala.",
      },
    ],
  }),
});

const serviceMap: Record<string, string[]> = {
  "Yoga & Wellness Retreat": [
    "7 DAYS & 14 DAYS HOLISTIC WELLNESS RETREAT",
    "YOGA & MEDITATION RETREAT",
    "COUPLE WELLNESS RETREAT",
    "YOGA DETOX & REJUVENATION RETREAT",
    "ENERGY BALANCING RETREAT",
    "ANTI-AGING & HEALTHY LONGEVITY RETREAT",
    "PAIN MANAGEMENT & THERAPEUTIC WELLNESS RETREAT",
    "STRESS & INSOMNIA MANAGEMENT RETREAT",
  ],
  "Certification Courses": [
    "Shiatsu Massage Certification",
    "Thai Yoga Massage Certification",
    "Reflexology Therapy Certification",
    "Ayurvedic Massage Certification",
    "Swedish Massage Certification",
    "Deep Tissue Massage Certification",
    "Dorn Therapy Certification (Spain Care Therapy)",
  ],
};

function getMappedCategoryAndCourse(catParam?: string | null, courseParam?: string | null) {
  const normalize = (str?: string | null) => {
    if (!str) return "";
    return str.replace(/-/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  };

  const normCat = normalize(catParam);
  const normCourse = normalize(courseParam);

  let category = "Yoga & Wellness Retreat";

  if (
    normCat.includes("cert") ||
    normCat.includes("training") ||
    normCat.includes("massage") ||
    normCat.includes("course") ||
    normCourse.includes("cert") ||
    normCourse.includes("massage")
  ) {
    category = "Certification Courses";
  } else {
    category = "Yoga & Wellness Retreat";
  }

  const coursesList = serviceMap[category] || [];
  const matchedCourse = coursesList.find((c) => normalize(c) === normCourse);
  if (matchedCourse) {
    return { category, course: matchedCourse };
  }

  const partialMatch = coursesList.find(
    (c) => normalize(c).includes(normCourse) || (normCourse && normCourse.includes(normalize(c)))
  );
  if (partialMatch) {
    return { category, course: partialMatch };
  }

  return { category, course: coursesList[0] || "" };
}

function ApplyPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);
  const [lockedCourse, setLockedCourse] = useState<string | null>(null);

  // Form State matching requested structure
  const [serviceCategory, setServiceCategory] = useState<string>("Yoga & Wellness Retreat");
  const [courseProgram, setCourseProgram] = useState<string>("");

  // 1. Personal Information
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  // 2. Accommodation
  const [requireAccommodation, setRequireAccommodation] = useState(""); // "Yes" | "No"
  const [accommodationPreference, setAccommodationPreference] = useState(""); // "AC Room" | "Non-AC Room"
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [numberOfNights, setNumberOfNights] = useState("");

  // 3. Yoga & Wellness Experience
  const [practisedYoga, setPractisedYoga] = useState(""); // "Yes" | "No"
  const [howLongPracticing, setHowLongPracticing] = useState("");
  const [yogaStyle, setYogaStyle] = useState("");

  // 4. Health Information
  const [healthConditions, setHealthConditions] = useState(""); // "Yes" | "No"
  const [healthDetails, setHealthDetails] = useState("");
  const [dietaryRequirement, setDietaryRequirement] = useState("");
  const [dietaryOther, setDietaryOther] = useState("");
  const [dietaryDetails, setDietaryDetails] = useState("");

  // 5. Your Expectations
  const [expectations, setExpectations] = useState("");
  const [specialArrangements, setSpecialArrangements] = useState("");

  // 6. How did you hear about us?
  const [hearAboutUs, setHearAboutUs] = useState("");
  const [hearAboutUsOther, setHearAboutUsOther] = useState("");

  // 7. Declaration
  const [declarationAgreed, setDeclarationAgreed] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize with URL params if provided
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      const courseParam = params.get("course");

      if (catParam || courseParam) {
        const { category, course } = getMappedCategoryAndCourse(catParam, courseParam);
        setServiceCategory(category);
        setCourseProgram(course);

        if (catParam) {
          setLockedCategory(category);
        }
        if (courseParam) {
          setLockedCourse(course);
        }
      } else {
        // Default to first retreat program
        setServiceCategory("Yoga & Wellness Retreat");
        setCourseProgram(serviceMap["Yoga & Wellness Retreat"][0]);
      }
    }
  }, []);

  // When category changes, reset course/program to first of list if not set
  const handleCategoryChange = (newCat: string) => {
    setServiceCategory(newCat);
    const available = serviceMap[newCat] || [];
    setCourseProgram(available[0] || "");
  };

  // Auto calculate nights when both check-in and check-out are chosen
  const handleDateChange = (inDate: string, outDate: string) => {
    if (inDate && outDate) {
      const d1 = new Date(inDate);
      const d2 = new Date(outDate);
      const diffMs = d2.getTime() - d1.getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setNumberOfNights(String(diffDays));
        return;
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!courseProgram) {
      toast.error("Please select a Course / Program from the dropdown.");
      return;
    }

    if (!gender) {
      toast.error("Please select your Gender.");
      return;
    }

    if (!requireAccommodation) {
      toast.error("Please indicate whether you require accommodation.");
      return;
    }

    if (requireAccommodation === "Yes") {
      if (!accommodationPreference) {
        toast.error("Please select an Accommodation Preference (AC Room or Non-AC Room).");
        return;
      }
      if (!checkInDate) {
        toast.error("Please choose a Preferred Check-in Date.");
        return;
      }
      if (!checkOutDate) {
        toast.error("Please choose a Preferred Check-out Date.");
        return;
      }
    }

    if (!declarationAgreed) {
      toast.error("Please read and agree to the Declaration before submitting.");
      return;
    }

    setIsSubmitting(true);

    const submitData = new FormData();
    const fullName = `${firstName.trim()} ${surname.trim()}`;
    submitData.append("name", fullName);
    submitData.append("firstName", firstName.trim());
    submitData.append("surname", surname.trim());
    submitData.append("course", serviceCategory);
    submitData.append("minorOption", courseProgram);
    submitData.append("serviceCategory", serviceCategory);
    submitData.append("courseProgram", courseProgram);
    submitData.append("dateOfCourse", checkInDate || new Date().toISOString().split("T")[0]);
    submitData.append("email", email.trim());
    submitData.append("phone", phone.trim());
    submitData.append("age", age.trim());
    submitData.append("dob", age.trim());
    submitData.append("gender", gender);

    submitData.append("requireAccommodation", requireAccommodation);
    submitData.append("accommodation", requireAccommodation === "Yes" ? accommodationPreference : "No");
    submitData.append("accommodationPreference", accommodationPreference);
    submitData.append("checkInDate", checkInDate);
    submitData.append("checkOutDate", checkOutDate);
    submitData.append("numberOfNights", numberOfNights);

    submitData.append("practisedYoga", practisedYoga);
    submitData.append("howLongPracticing", howLongPracticing);
    submitData.append("howLong", howLongPracticing);
    submitData.append("yogaStyle", yogaStyle);
    submitData.append("meaningOfYoga", yogaStyle);

    submitData.append("healthConditions", healthConditions);
    submitData.append("healthDetails", healthDetails);
    submitData.append("injuries", healthConditions === "Yes" ? healthDetails : "None");
    submitData.append("dietaryRequirement", dietaryRequirement);
    submitData.append("dietaryOther", dietaryOther);
    submitData.append("dietaryDetails", dietaryDetails);

    submitData.append("expectations", expectations);
    submitData.append("whyTeacherTraining", expectations);
    submitData.append("specialArrangements", specialArrangements);

    submitData.append("hearAboutUs", hearAboutUs);
    submitData.append("hearAboutUsOther", hearAboutUsOther);
    submitData.append("declarationAgreed", declarationAgreed ? "Yes" : "No");

    try {
      const response = await fetch(getApiUrl("apply.php"), {
        method: "POST",
        body: submitData,
      });
      const res = await response.json();
      if (res.success) {
        setShowSuccess(true);
        // Reset fields
        setFirstName("");
        setSurname("");
        setEmail("");
        setPhone("");
        setAge("");
        setGender("");
        setRequireAccommodation("");
        setAccommodationPreference("");
        setCheckInDate("");
        setCheckOutDate("");
        setNumberOfNights("");
        setPractisedYoga("");
        setHowLongPracticing("");
        setYogaStyle("");
        setHealthConditions("");
        setHealthDetails("");
        setDietaryRequirement("");
        setDietaryOther("");
        setDietaryDetails("");
        setExpectations("");
        setSpecialArrangements("");
        setHearAboutUs("");
        setHearAboutUsOther("");
        setDeclarationAgreed(false);
      } else {
        toast.error(res.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      console.error("Apply submission error:", err);
      toast.error("An error occurred during submission: " + (err?.message || String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="overflow-x-hidden bg-[#fbfbfa] min-h-screen text-[#143d2c]">
      <Navbar />

      <div className="pt-28 sm:pt-32 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#063b21]/10 text-[#063b21] text-xs font-semibold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ba8336]" /> Dr. Vikram Yoga &amp; Wellness Centre
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#063b21] font-bold tracking-tight mb-3">
            Retreat Application Form
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Begin your transformative journey of healing, harmony, and renewal. Please complete the details below to secure your retreat experience.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_4px_30px_rgba(0,0,0,0.04)] border border-stone-200/80 p-5 sm:p-8 md:p-12 space-y-10 sm:space-y-12"
        >
          {/* ============================================================ */}
          {/* PROGRAM SELECTION */}
          {/* ============================================================ */}
          <section className="space-y-4">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#063b21] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#063b21] text-white flex items-center justify-center text-xs font-bold">
                  ★
                </span>
                PROGRAM SELECTION
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl border border-stone-200 bg-[#f9faf8]">
              {/* Header row (Desktop table view) */}
              <div className="hidden sm:grid sm:grid-cols-2 bg-[#063b21]/5 border-b border-stone-200 text-xs font-bold uppercase tracking-wider text-[#063b21] py-3 px-5">
                <div>Service Category</div>
                <div>Course / Program</div>
              </div>

              {/* Input row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 sm:p-5">
                {/* Service Category */}
                <div className="space-y-1.5">
                  <label className="block sm:hidden text-xs font-bold uppercase tracking-wider text-slate-500">
                    Service Category
                  </label>
                  {lockedCategory ? (
                    <div className="h-[46px] flex items-center px-3.5 rounded-lg border border-stone-200 bg-white font-medium text-sm text-[#063b21]">
                      {lockedCategory}
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        value={serviceCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="w-full h-[46px] px-3.5 pr-10 rounded-lg border border-stone-200 bg-white text-sm text-[#063b21] font-medium outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all appearance-none cursor-pointer"
                      >
                        <option value="Yoga & Wellness Retreat">Yoga &amp; Wellness Retreat</option>
                        <option value="Certification Courses">Certification Courses</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  )}
                </div>

                {/* Course / Program */}
                <div className="space-y-1.5">
                  <label className="block sm:hidden text-xs font-bold uppercase tracking-wider text-slate-500">
                    Course / Program
                  </label>
                  {lockedCourse ? (
                    <div className="h-[46px] flex items-center px-3.5 rounded-lg border border-stone-200 bg-white font-medium text-sm text-[#063b21]">
                      {lockedCourse}
                    </div>
                  ) : (
                    <div className="relative">
                      <select
                        value={courseProgram}
                        onChange={(e) => setCourseProgram(e.target.value)}
                        required
                        className="w-full h-[46px] px-3.5 pr-10 rounded-lg border border-stone-200 bg-white text-sm text-[#063b21] font-medium outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all appearance-none cursor-pointer"
                      >
                        <option value="">
                          {serviceCategory === "Yoga & Wellness Retreat"
                            ? "[ Select Retreat Program ]"
                            : "[ Select Course Program ]"}
                        </option>
                        {serviceMap[serviceCategory]?.map((prog) => (
                          <option key={prog} value={prog}>
                            {prog}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 1. PERSONAL INFORMATION */}
          {/* ============================================================ */}
          <section className="space-y-5">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#063b21] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#063b21] text-white flex items-center justify-center text-xs font-bold">
                  1
                </span>
                PERSONAL INFORMATION
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
              {/* First Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Surname */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Surname <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Phone / WhatsApp Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Phone / WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter your phone / WhatsApp number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Age */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min="16"
                  max="120"
                  required
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {[
                    { label: "Male", value: "Male" },
                    { label: "Female", value: "Female" },
                    { label: "Other / Prefer not to say", value: "Other / Prefer not to say" },
                  ].map((item) => (
                    <label
                      key={item.value}
                      className="inline-flex items-center gap-2 cursor-pointer text-sm text-slate-700 select-none hover:text-[#063b21]"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={item.value}
                        checked={gender === item.value}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-4 h-4 accent-[#063b21] cursor-pointer"
                      />
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* 2. ACCOMMODATION */}
          {/* ============================================================ */}
          <section className="space-y-5">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#063b21] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#063b21] text-white flex items-center justify-center text-xs font-bold">
                  2
                </span>
                ACCOMMODATION
              </h2>
            </div>

            {/* Do you require accommodation? */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                Do you require accommodation? <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-6 pt-1">
                {["Yes", "No"].map((option) => (
                  <label
                    key={option}
                    className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none hover:text-[#063b21]"
                  >
                    <input
                      type="radio"
                      name="requireAccommodation"
                      value={option}
                      checked={requireAccommodation === option}
                      onChange={(e) => {
                        setRequireAccommodation(e.target.value);
                        if (e.target.value === "No") {
                          setAccommodationPreference("");
                          setCheckInDate("");
                          setCheckOutDate("");
                          setNumberOfNights("");
                        }
                      }}
                      className="w-4 h-4 accent-[#063b21] cursor-pointer"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Conditional fields if Yes */}
            {requireAccommodation === "Yes" && (
              <div className="p-5 sm:p-6 rounded-xl border border-stone-200 bg-[#f9faf8] space-y-5 animate-fade-up">
                {/* Accommodation Preference */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Accommodation Preference <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-6 pt-1">
                    {["AC Room", "Non-AC Room"].map((pref) => (
                      <label
                        key={pref}
                        className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none hover:text-[#063b21]"
                      >
                        <input
                          type="radio"
                          name="accommodationPreference"
                          value={pref}
                          checked={accommodationPreference === pref}
                          onChange={(e) => setAccommodationPreference(e.target.value)}
                          className="w-4 h-4 accent-[#063b21] cursor-pointer"
                        />
                        <span>{pref}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Preferred Check-in Date */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Preferred Check-in Date: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required={requireAccommodation === "Yes"}
                      value={checkInDate}
                      onChange={(e) => {
                        setCheckInDate(e.target.value);
                        handleDateChange(e.target.value, checkOutDate);
                      }}
                      className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all"
                    />
                  </div>

                  {/* Preferred Check-out Date */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Preferred Check-out Date: <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required={requireAccommodation === "Yes"}
                      value={checkOutDate}
                      onChange={(e) => {
                        setCheckOutDate(e.target.value);
                        handleDateChange(checkInDate, e.target.value);
                      }}
                      className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all"
                    />
                  </div>

                  {/* Number of Nights */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Number of Nights:
                    </label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Enter number"
                      value={numberOfNights}
                      onChange={(e) => setNumberOfNights(e.target.value)}
                      className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all"
                    />
                  </div>
                </div>

                <p className="text-xs text-stone-500 italic leading-relaxed pt-1">
                  Accommodation is subject to availability. Accommodation charges may vary depending on the selected retreat and duration of stay.
                </p>
              </div>
            )}
          </section>

          {/* ============================================================ */}
          {/* 3. YOGA & WELLNESS EXPERIENCE */}
          {/* ============================================================ */}
          <section className="space-y-5">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#063b21] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#063b21] text-white flex items-center justify-center text-xs font-bold">
                  3
                </span>
                YOGA &amp; WELLNESS EXPERIENCE
              </h2>
            </div>

            {/* Have you practised Yoga before? */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800">
                Have you practised Yoga before?
              </label>
              <div className="flex items-center gap-6 pt-1">
                {["Yes", "No"].map((option) => (
                  <label
                    key={option}
                    className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none hover:text-[#063b21]"
                  >
                    <input
                      type="radio"
                      name="practisedYoga"
                      value={option}
                      checked={practisedYoga === option}
                      onChange={(e) => setPractisedYoga(e.target.value)}
                      className="w-4 h-4 accent-[#063b21] cursor-pointer"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* If yes, how long have you been practising Yoga? */}
            <div className="space-y-1.5">
              <label className="block text-sm text-slate-700 font-medium">
                If yes, how long have you been practising Yoga?
              </label>
              <input
                type="text"
                placeholder="Enter your answer"
                value={howLongPracticing}
                onChange={(e) => setHowLongPracticing(e.target.value)}
                className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
              />
            </div>

            {/* Which style of Yoga or wellness practices have you practised? */}
            <div className="space-y-1.5">
              <label className="block text-sm text-slate-700 font-medium">
                Which style of Yoga or wellness practices have you practised?
              </label>
              <input
                type="text"
                placeholder="Enter your answer"
                value={yogaStyle}
                onChange={(e) => setYogaStyle(e.target.value)}
                className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* 4. HEALTH INFORMATION */}
          {/* ============================================================ */}
          <section className="space-y-5">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#063b21] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#063b21] text-white flex items-center justify-center text-xs font-bold">
                  4
                </span>
                HEALTH INFORMATION
              </h2>
            </div>

            {/* Current health conditions */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-800 leading-snug">
                Do you have any current health conditions, injuries, physical limitations or allergies that we should be aware of?
              </label>
              <div className="flex items-center gap-6 pt-1">
                {["Yes", "No"].map((option) => (
                  <label
                    key={option}
                    className="inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-slate-700 select-none hover:text-[#063b21]"
                  >
                    <input
                      type="radio"
                      name="healthConditions"
                      value={option}
                      checked={healthConditions === option}
                      onChange={(e) => setHealthConditions(e.target.value)}
                      className="w-4 h-4 accent-[#063b21] cursor-pointer"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* If yes, please provide details */}
            {healthConditions === "Yes" && (
              <div className="space-y-1.5 animate-fade-up">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  If yes, please provide details:
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter your answer"
                  value={healthDetails}
                  onChange={(e) => setHealthDetails(e.target.value)}
                  className="w-full p-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all resize-y placeholder:text-stone-400"
                />
              </div>
            )}

            {/* Dietary requirements */}
            <div className="space-y-3 pt-2">
              <label className="block text-sm font-semibold text-slate-800">
                Do you have any dietary requirements or food allergies?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: "No", value: "No" },
                  { label: "Vegetarian", value: "Vegetarian" },
                  { label: "Vegan", value: "Vegan" },
                  { label: "Food Allergy / Intolerance", value: "Food Allergy / Intolerance" },
                  { label: "Other", value: "Other" },
                ].map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                      dietaryRequirement === item.value
                        ? "border-[#063b21] bg-[#063b21]/5 text-[#063b21] font-semibold"
                        : "border-stone-200 bg-white text-slate-700 hover:border-stone-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="dietaryRequirement"
                      value={item.value}
                      checked={dietaryRequirement === item.value}
                      onChange={(e) => setDietaryRequirement(e.target.value)}
                      className="w-4 h-4 accent-[#063b21] cursor-pointer"
                    />
                    <span className="text-sm">{item.label}</span>
                  </label>
                ))}
              </div>

              {dietaryRequirement === "Other" && (
                <div className="pt-2 animate-fade-up">
                  <input
                    type="text"
                    placeholder="Specify other dietary requirement..."
                    value={dietaryOther}
                    onChange={(e) => setDietaryOther(e.target.value)}
                    className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
                  />
                </div>
              )}
            </div>

            {/* Details if applicable */}
            <div className="space-y-1.5">
              <label className="block text-sm text-slate-700 font-medium">
                Please provide details if applicable:
              </label>
              <textarea
                rows={3}
                placeholder="Enter your answer"
                value={dietaryDetails}
                onChange={(e) => setDietaryDetails(e.target.value)}
                className="w-full p-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all resize-y placeholder:text-stone-400"
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* 5. YOUR EXPECTATIONS */}
          {/* ============================================================ */}
          <section className="space-y-5">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#063b21] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#063b21] text-white flex items-center justify-center text-xs font-bold">
                  5
                </span>
                YOUR EXPECTATIONS
              </h2>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                What would you like to experience or achieve during this retreat?
              </label>
              <textarea
                rows={4}
                placeholder="Enter your answer"
                value={expectations}
                onChange={(e) => setExpectations(e.target.value)}
                className="w-full p-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all resize-y placeholder:text-stone-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-slate-800">
                Is there anything specific you would like us to know or arrange for your stay?
              </label>
              <textarea
                rows={4}
                placeholder="Enter your answer"
                value={specialArrangements}
                onChange={(e) => setSpecialArrangements(e.target.value)}
                className="w-full p-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all resize-y placeholder:text-stone-400"
              />
            </div>
          </section>

          {/* ============================================================ */}
          {/* 6. HOW DID YOU HEAR ABOUT US? */}
          {/* ============================================================ */}
          <section className="space-y-5">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#063b21] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#063b21] text-white flex items-center justify-center text-xs font-bold">
                  6
                </span>
                HOW DID YOU HEAR ABOUT US?
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                "Google",
                "Website",
                "Instagram",
                "Facebook",
                "Friend / Referral",
                "Poster / Flyer",
                "Previous Student / Client",
                "Other",
              ].map((src) => (
                <label
                  key={src}
                  className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                    hearAboutUs === src
                      ? "border-[#063b21] bg-[#063b21]/5 text-[#063b21] font-semibold"
                      : "border-stone-200 bg-white text-slate-700 hover:border-stone-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="hearAboutUs"
                    value={src}
                    checked={hearAboutUs === src}
                    onChange={(e) => setHearAboutUs(e.target.value)}
                    className="w-4 h-4 accent-[#063b21] cursor-pointer"
                  />
                  <span className="text-sm">{src}</span>
                </label>
              ))}
            </div>

            {hearAboutUs === "Other" && (
              <div className="pt-2 animate-fade-up">
                <input
                  type="text"
                  placeholder="Please specify how you heard about us..."
                  value={hearAboutUsOther}
                  onChange={(e) => setHearAboutUsOther(e.target.value)}
                  className="w-full h-[46px] px-3.5 rounded-lg border border-stone-200 bg-white text-sm text-slate-800 outline-none focus:border-[#063b21] focus:ring-1 focus:ring-[#063b21] transition-all placeholder:text-stone-400"
                />
              </div>
            )}
          </section>

          {/* ============================================================ */}
          {/* 7. DECLARATION */}
          {/* ============================================================ */}
          <section className="space-y-5">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#063b21] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-full bg-[#063b21] text-white flex items-center justify-center text-xs font-bold">
                  7
                </span>
                DECLARATION
              </h2>
            </div>

            <div className="rounded-xl border border-stone-200 bg-[#f9faf8] p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <p>
                I confirm that the information provided in this application is true and complete to the best of my knowledge.
              </p>
              <p>
                I understand that yoga, wellness activities, therapies and retreat practices may involve physical activity. I agree to inform the Centre and instructors about any relevant health conditions, injuries, physical limitations, allergies or other circumstances that may affect my participation.
              </p>
              <p>
                I agree to follow the instructions and safety guidelines provided by the Centre and its instructors during the retreat.
              </p>

              <div className="pt-3 border-t border-stone-200/80">
                <label className="flex items-start sm:items-center gap-3 cursor-pointer select-none group">
                  <input
                    type="checkbox"
                    required
                    checked={declarationAgreed}
                    onChange={(e) => setDeclarationAgreed(e.target.checked)}
                    className="w-5 h-5 mt-0.5 sm:mt-0 rounded accent-[#063b21] cursor-pointer shrink-0"
                  />
                  <span className="font-semibold text-sm text-[#063b21] group-hover:underline">
                    I have read and agree to the above declaration. <span className="text-red-500">*</span>
                  </span>
                </label>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SUBMIT BUTTON & FOOTNOTE */}
          {/* ============================================================ */}
          <div className="pt-4 border-t border-stone-200 space-y-4 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[280px] sm:min-w-[340px] px-8 py-4 bg-[#063b21] hover:bg-[#042816] text-white text-sm sm:text-base font-bold tracking-wider uppercase rounded-full shadow-[0_6px_20px_rgba(6,59,33,0.35)] hover:shadow-[0_8px_25px_rgba(6,59,33,0.45)] hover:scale-[1.01] transition-all duration-300 inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  SUBMIT RETREAT APPLICATION
                  <CheckCircle className="w-5 h-5 text-[#deb05e]" />
                </>
              )}
            </button>

            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Our team will review your application and contact you via WhatsApp, phone or email to confirm availability, retreat details, accommodation and payment information.
            </p>
          </div>
        </form>
      </div>

      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />

      {/* ── Success Modal ───────────────────────────────────────────── */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-8 sm:p-10 flex flex-col items-center text-center animate-fade-up border border-stone-100"
          >
            <div className="w-20 h-20 rounded-full bg-[#063b21]/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-11 h-11 text-[#063b21]" strokeWidth={2} />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl text-[#063b21] font-bold mb-2">
              Application Submitted!
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-2">
              Thank you for applying to{" "}
              <span className="font-semibold text-[#063b21]">Dr. Vikram Yoga &amp; Wellness Centre</span>.
            </p>
            <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 bg-stone-50 p-4 rounded-xl border border-stone-200">
              Our team will review your application and contact you via WhatsApp, phone or email to confirm availability, retreat details, accommodation and payment information.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="px-8 py-3 bg-[#063b21] hover:bg-[#042816] text-white font-bold text-sm tracking-wide rounded-full transition-all shadow-md w-full cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
