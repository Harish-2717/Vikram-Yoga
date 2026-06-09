import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat } from "./about";
import { ArrowLeft, Upload, Building2, Smartphone, ShieldCheck, Heart, CheckCircle2, Copy, Home, RefreshCw } from "lucide-react";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
  head: () => ({
    meta: [
      { title: "Apply — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Apply for our yoga teacher training and wellness courses." },
    ],
  }),
});

const serviceMap: Record<string, string[]> = {
  "Yoga Classes": [
    "Beginner Yoga",
    "Advanced Yoga",
    "Prenatal Yoga",
    "Therapeutic Yoga",
    "Hatha Yoga",
    "Hatha Flow",
    "Vinyasa Flow",
    "Yin Yoga",
    "Pranayama & Meditation",
    "Therapeutic Sessions",
    "Therapeutic Stretching",
    "Personalized Wellness Guidance"
  ],
  "Wellness Therapies": [
    "Ayurvedic Therapy",
    "Naturopathy Therapy",
    "Stress Management Therapy",
    "Thai Yoga Massage",
    "Shiatsu Therapy",
    "Deep Tissue Therapy",
    "Ayurvedic Wellness Massage",
    "Traditional Ayurvedic Massage",
    "Swedish Massage",
    "Reflexology Therapy",
    "Reflexology",
    "Acupuncture-Based Support",
    "Acupuncture (TCM-Based Wellness Support)",
    "Cupping Therapy",
    "IASTM",
    "Dorn Therapy",
    "Dorn Therapy (Spine Care Therapy)",
    "Consultation"
  ],
  "Retreat Programs": [
    "Wellness Retreat",
    "Detox Retreat",
    "Meditation Retreat",
    "7 DAYS & 14 DAYS HOLISTIC WELLNESS RETREAT",
    "YOGA & MEDITATION RETREAT",
    "COUPLE WELLNESS RETREAT",
    "YOGA DETOX & REJUVENATION RETREAT",
    "ENERGY BALANCING RETREAT",
    "ANTI-AGING & HEALTHY LONGEVITY RETREAT",
    "PAIN MANAGEMENT & THERAPEUTIC WELLNESS RETREAT",
    "STRESS & INSOMNIA MANAGEMENT RETREAT"
  ],
  "Certification Courses": [
    "Yoga Teacher Training",
    "Wellness Coach Certification",
    "Therapy Certification Programs",
    "Shiatsu Therapy Certification",
    "Thai Yoga Massage Certification",
    "Reflexology Therapy Certification",
    "Reflexology Certification",
    "Ayurvedic Wellness Massage Certification",
    "Traditional Ayurvedic Massage Certification",
    "Swedish Massage Certification",
    "Deep Tissue Therapy Certification",
    "Dorn Therapy Certification",
    "Dorn Therapy (Spine Care) Certification",
    "100 Hour Yoga Teacher Training In Kerala",
    "200 Hour Yoga Teacher Training In Kerala",
    "300 Hour Yoga Teacher Training In Kerala"
  ],
};

function getMappedCategoryAndCourse(catParam?: string | null, courseParam?: string | null) {
  const normalize = (str?: string | null) => {
    if (!str) return "";
    return str.replace(/-/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  };

  const normCat = normalize(catParam);
  const normCourse = normalize(courseParam);

  let category = "Yoga Classes";

  // 1. Determine Category
  const categoriesList = Object.keys(serviceMap);
  const matchedCat = categoriesList.find((c) => normalize(c) === normCat);
  if (matchedCat) {
    category = matchedCat;
  } else {
    // Fallback heuristics for category based on category or course parameters
    if (
      normCat.includes("cert") ||
      normCat.includes("teacher") ||
      normCat.includes("training") ||
      normCat.includes("coach") ||
      normCourse.includes("cert") ||
      normCourse.includes("coach") ||
      normCourse.includes("teacher") ||
      normCourse.includes("training")
    ) {
      category = "Certification Courses";
    } else if (
      normCat.includes("retreat") ||
      normCourse.includes("retreat")
    ) {
      category = "Retreat Programs";
    } else if (
      normCat.includes("therap") ||
      normCat.includes("massage") ||
      normCourse.includes("therap") ||
      normCourse.includes("massage") ||
      normCourse.includes("shiatsu") ||
      normCourse.includes("acupunct") ||
      normCourse.includes("cupping") ||
      normCourse.includes("iastm") ||
      normCourse.includes("dorn") ||
      normCourse.includes("naturopath")
    ) {
      category = "Wellness Therapies";
    } else if (
      normCat.includes("yoga") ||
      normCat.includes("class") ||
      normCat.includes("session")
    ) {
      category = "Yoga Classes";
    }
  }

  // 2. Determine Course based on category
  const coursesList = serviceMap[category] || [];
  
  // Try to find an exact match in the selected category
  const matchedCourse = coursesList.find((c) => normalize(c) === normCourse);
  if (matchedCourse) {
    return { category, course: matchedCourse };
  }

  // If no exact match, try to find a partial match
  const partialMatchedCourse = coursesList.find((c) => normalize(c).includes(normCourse) || normCourse.includes(normalize(c)));
  if (partialMatchedCourse) {
    return { category, course: partialMatchedCourse };
  }

  // Fallback defaults if nothing matches
  let course = coursesList[0] || "";
  if (category === "Yoga Classes") {
    course = "Beginner Yoga";
  } else if (category === "Wellness Therapies") {
    course = "Ayurvedic Therapy";
  } else if (category === "Retreat Programs") {
    course = "Wellness Retreat";
  } else if (category === "Certification Courses") {
    course = "Yoga Teacher Training";
  }

  return { category, course };
}

function ApplyPage() {
  const [step, setStep] = useState(1);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [submittedAppId, setSubmittedAppId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    course: "Yoga Classes",
    minorOption: "Beginner Yoga",
    dateOfCourse: "",
    email: "",
    dob: "",
    gender: "",
    accommodation: "",
    address: "",
    practisedYoga: "",
    howLong: "",
    whyTeacherTraining: "",
    meaningOfYoga: "",
    injuries: "",
    additionalInfo: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catParam = params.get("category");
      const courseParam = params.get("course");
      
      const { category, course } = getMappedCategoryAndCourse(catParam, courseParam);
      
      setFormData(prev => ({
        ...prev,
        course: category,
        minorOption: course
      }));
    }
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name === "course") {
      setFormData({
        ...formData,
        course: value,
        minorOption: serviceMap[value]?.[0] || "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNext = (e: any) => {
    e.preventDefault();
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      course: "Yoga Classes",
      minorOption: "Beginner Yoga",
      dateOfCourse: "",
      email: "",
      dob: "",
      gender: "",
      accommodation: "",
      address: "",
      practisedYoga: "",
      howLong: "",
      whyTeacherTraining: "",
      meaningOfYoga: "",
      injuries: "",
      additionalInfo: "",
    });
    setProofFile(null);
    setSubmittedAppId("");
    setStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!proofFile) {
      toast.error("Please upload your payment proof.");
      return;
    }

    setIsSubmitting(true);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      submitData.append(key, val);
    });
    submitData.append("proof", proofFile);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: submitData,
      });
      const res = await response.json();
      if (res.success) {
        toast.success("Application and payment proof submitted successfully!");
        setSubmittedAppId(res.applicationId);
        setStep(3);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
    <main className="overflow-x-hidden bg-[#fafafa] min-h-screen">
      <Navbar />

      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
        {step === 1 ? (
          <>
            <h1 className="text-3xl text-center text-[#55b9b7] font-serif mb-10 tracking-wide">
              Apply
            </h1>

            <form
              onSubmit={handleNext}
              className="bg-white px-6 sm:px-10 py-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full text-slate-700"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Service Category :
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full bg-white appearance-none text-slate-700"
                  >
                    <option value="Yoga Classes">Yoga Classes</option>
                    <option value="Wellness Therapies">Wellness Therapies</option>
                    <option value="Retreat Programs">Retreat Programs</option>
                    <option value="Certification Courses">Certification Courses</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Course / Program :
                  </label>
                  <select
                    name="minorOption"
                    value={formData.minorOption}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full bg-white appearance-none text-slate-700"
                  >
                    {serviceMap[formData.course]?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Date of Course :
                  </label>
                  <input
                    type="date"
                    name="dateOfCourse"
                    value={formData.dateOfCourse}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full bg-white text-slate-700"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full text-slate-700"
                    required
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Date of Birth :
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full bg-white text-slate-700"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide mb-1">
                    Gender :
                  </label>
                  <div className="flex gap-6 items-center h-[46px]">
                    <label className="flex items-center gap-2 text-[0.9rem] text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                        checked={formData.gender === "Male"}
                        className="w-3.5 h-3.5 accent-[#3b82f6]"
                      />{" "}
                      Male
                    </label>
                    <label className="flex items-center gap-2 text-[0.9rem] text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                        checked={formData.gender === "Female"}
                        className="w-3.5 h-3.5 accent-[#3b82f6]"
                      />{" "}
                      Female
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide mb-1">
                    Accomodation :
                  </label>
                  <div className="flex gap-6 items-center h-[46px]">
                    <label className="flex items-center gap-2 text-[0.9rem] text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="accommodation"
                        value="Shared Room"
                        onChange={handleChange}
                        checked={formData.accommodation === "Shared Room"}
                        className="w-3.5 h-3.5 accent-[#3b82f6]"
                      />{" "}
                      Shared Room
                    </label>
                    <label className="flex items-center gap-2 text-[0.9rem] text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="accommodation"
                        value="Individual Room"
                        onChange={handleChange}
                        checked={formData.accommodation === "Individual Room"}
                        className="w-3.5 h-3.5 accent-[#3b82f6]"
                      />{" "}
                      Individual Room
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide mb-1">
                    Have you practised yoga before?
                  </label>
                  <div className="flex gap-6 items-center h-[46px]">
                    <label className="flex items-center gap-2 text-[0.9rem] text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="practisedYoga"
                        value="Yes"
                        onChange={handleChange}
                        checked={formData.practisedYoga === "Yes"}
                        className="w-3.5 h-3.5 accent-[#55b9b7]"
                      />{" "}
                      Yes
                    </label>
                    <label className="flex items-center gap-2 text-[0.9rem] text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="practisedYoga"
                        value="No"
                        onChange={handleChange}
                        checked={formData.practisedYoga === "No"}
                        className="w-3.5 h-3.5 accent-[#55b9b7]"
                      />{" "}
                      No
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Address :
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={6}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full resize-none text-slate-700"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    How long you have been practising Yoga? and which style of yoga you have been
                    practising?
                  </label>
                  <textarea
                    name="howLong"
                    value={formData.howLong}
                    onChange={handleChange}
                    rows={6}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full resize-none text-slate-700"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Why do you want to do teacher training?
                  </label>
                  <textarea
                    name="whyTeacherTraining"
                    value={formData.whyTeacherTraining}
                    onChange={handleChange}
                    rows={6}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full resize-none text-slate-700"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    What does yoga mean to you?
                  </label>
                  <textarea
                    name="meaningOfYoga"
                    value={formData.meaningOfYoga}
                    onChange={handleChange}
                    rows={6}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full resize-none text-slate-700"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Do you have any injuries or medical conditions?
                  </label>
                  <textarea
                    name="injuries"
                    value={formData.injuries}
                    onChange={handleChange}
                    rows={6}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full resize-none text-slate-700"
                  ></textarea>
                </div>

                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                    Any additional Information you want to know about?
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    rows={6}
                    className="border border-gray-200 rounded-[0.5rem] p-3 outline-none focus:border-gray-300 text-[0.9rem] w-full resize-none text-slate-700"
                  ></textarea>
                </div>

                <div className="pt-2 md:col-span-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#55b9b7] text-white text-[0.9rem] font-medium border border-[#55b9b7] rounded-[0.5rem] shadow-sm hover:bg-[#49a09e] transition-colors inline-flex items-center gap-2"
                  >
                    Next: Payment Details <ArrowLeft className="w-4 h-4 rotate-180" />
                  </button>
                </div>
              </div>
            </form>
          </>
        ) : step === 2 ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-3xl mx-auto space-y-8">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-slate-500 hover:text-[#55b9b7] transition-colors text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Application
            </button>

            <div className="text-center">
              <h1 className="text-3xl text-emerald-deep font-serif mb-3 tracking-wide">
                Payment Methods
              </h1>
              <p className="text-slate-500 text-[0.95rem]">
                Pay easily and securely with Wise (formerly TransferWise) or UPI.
                <br />
                Please complete your payment and upload the proof below to finalize your
                application.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Bank Details Card */}
              <div className="bg-white p-7 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-green-900/10 relative overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#55b9b7]"></div>

                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#55b9b7]/10 flex items-center justify-center text-[#55b9b7]">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-emerald-deep font-semibold tracking-wide">
                    1. Bank Details
                  </h3>
                </div>

                <div className="space-y-4 text-[0.875rem]">
                  <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                    <span className="text-slate-500">Account Holder:</span>
                    <span className="font-medium text-slate-800 text-right">S. Vikrampandy</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                    <span className="text-slate-500">Bank Name:</span>
                    <span className="font-medium text-slate-800 text-right">Indian Bank</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                    <span className="text-slate-500">Branch:</span>
                    <span className="font-medium text-slate-800 text-right">Nimmiyampattu</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                    <span className="text-slate-500">Account Number:</span>
                    <span className="font-medium text-slate-800 text-right">6462666324</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                    <span className="text-slate-500">IFSC Code:</span>
                    <span className="font-medium text-slate-800 text-right">IDIB000N142</span>
                  </div>
                </div>

                <div className="mt-8 p-3.5 bg-green-50 rounded-lg flex items-center justify-center gap-3 border border-green-100">
                  <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="text-xs text-green-800 font-medium">
                    Secure. Fast. Trusted. <br /> Your payment is safe with Wise.
                  </span>
                </div>
              </div>

              {/* UPI Card */}
              <div className="bg-white p-7 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-green-900/10 relative overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#55b9b7]"></div>

                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#55b9b7]/10 flex items-center justify-center text-[#55b9b7]">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-xl text-emerald-deep font-semibold tracking-wide">
                    2. UPI ID
                  </h3>
                </div>

                <div className="flex flex-col items-center justify-center py-4 text-center">
                  <span className="text-slate-500 mb-3 text-sm">Transfer easily using UPI</span>
                  <div className="font-medium text-[0.95rem] text-emerald-950 tracking-wider bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 w-full mb-8 shadow-inner select-all">
                    vikrampandy1998@okaxis
                  </div>

                  <div className="w-full space-y-4 text-left px-2">
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Instant & Easy
                      Transfers
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Secure & Reliable
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div> Accepted in India
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="bg-white px-8 py-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 text-center"
            >
              <h3 className="font-serif text-xl text-emerald-deep mb-2">Upload Payment Proof</h3>
              <p className="text-slate-500 text-sm mb-6">
                Attach a PDF or screenshot of your successful transaction.
              </p>

              <div className="max-w-md mx-auto">
                <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-[#55b9b7]/30 rounded-xl cursor-pointer bg-[#55b9b7]/5 hover:bg-[#55b9b7]/10 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4 text-center">
                    <Upload className="w-8 h-8 text-[#55b9b7] mb-4" />
                    <p className="mb-2 text-[0.9rem] text-slate-600">
                      <span className="font-semibold text-[#55b9b7]">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-[0.75rem] text-slate-500 uppercase tracking-wide">
                      SVG, PNG, JPG or PDF (Max. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,.pdf"
                    onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                    required
                  />
                </label>

                {proofFile && (
                  <div className="mt-4 p-3.5 bg-emerald-50 text-emerald-800 text-[0.85rem] rounded-lg flex items-center justify-between border border-emerald-100 shadow-sm transition-all">
                    <span className="truncate pr-4 font-medium">{proofFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setProofFile(null)}
                      className="text-emerald-700 hover:text-emerald-900 font-semibold uppercase tracking-wider text-[0.7rem] bg-emerald-200/50 px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-emerald-deep text-white text-[0.95rem] font-medium rounded-lg shadow-md hover:bg-[#0c2a21] transition-all focus:ring-4 focus:ring-green-900/20 w-full sm:w-auto inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}{" "}
                  <Heart className="w-4 h-4" />
                </button>
                <p className="text-xs text-slate-400 mt-4 tracking-wide font-medium">
                  Thank you for supporting your health & wellness journey. ♥
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-green-900/10 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl text-emerald-deep font-serif tracking-wide font-semibold">
                Application Received!
              </h1>
              <p className="text-slate-500 text-[0.95rem] max-w-md mx-auto">
                Thank you for applying to Dr. Vikram Yoga & Wellness Centre. We have received your program application and payment proof.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto">
              <h4 className="font-semibold text-emerald-deep text-sm uppercase tracking-wider border-b border-slate-200 pb-2">
                Submission Summary
              </h4>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-400 font-medium">Application ID:</span>
                  <div className="flex items-center gap-1.5 font-mono text-emerald-950 font-bold bg-slate-200/50 px-2 py-0.5 rounded text-xs">
                    <span>{submittedAppId}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(submittedAppId);
                        toast.success("Application ID copied!");
                      }}
                      className="text-slate-400 hover:text-emerald-deep transition-colors"
                      title="Copy ID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Applicant Name:</span>
                  <span className="text-slate-800 font-semibold">{formData.name}</span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-400 font-medium flex-shrink-0">Service Category:</span>
                  <span className="text-slate-800 font-semibold text-right">{formData.course}</span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-400 font-medium flex-shrink-0">Course / Program:</span>
                  <span className="text-slate-800 font-semibold text-right">{formData.minorOption}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Start Date:</span>
                  <span className="text-slate-800 font-semibold">{formData.dateOfCourse}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-800 leading-relaxed max-w-md mx-auto font-medium text-center">
              Our administrative team will review and verify your payment proof shortly. Once verified, a default confirmation email will be sent to <strong>{formData.email}</strong>.
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/"
                className="px-6 py-3 bg-emerald-deep text-white text-[0.9rem] font-medium rounded-xl shadow-md hover:bg-[#0c2a21] transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Home className="w-4 h-4" /> Go to Homepage
              </a>
              <button
                onClick={handleReset}
                className="px-6 py-3 border border-slate-200 text-slate-600 bg-white hover:bg-slate-50 text-[0.9rem] font-medium rounded-xl shadow-sm transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <RefreshCw className="w-4 h-4" /> Apply for Another Program
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}
