import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat } from "./about";
import { CheckCircle } from "lucide-react";

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
    "Hatha Yoga",
    "Pranayama & Meditation",
    "Hatha Flow",
    "Vinyasa Flow",
    "Yin Yoga",
    "Therapeutic Yoga Sessions"
  ],
  "Wellness Therapies": [
    "Shiatsu Therapy",
    "Thai Yoga Massage",
    "Acupuncture-Based Support",
    "Reflexology Therapy",
    "Deep Tissue Therapy",
    "Cupping Therapy",
    "Ayurvedic Wellness Massage",
    "Swedish Massage",
    "IASTM",
    "Dorn Therapy"
  ],
  "Retreat Programs": [
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
    course = "Shiatsu Therapy";
  } else if (category === "Retreat Programs") {
    course = "7 DAYS & 14 DAYS HOLISTIC WELLNESS RETREAT";
  } else if (category === "Certification Courses") {
    course = "Shiatsu Massage Certification";
  }

  return { category, course };
}

function ApplyPage() {
  const [showSuccess, setShowSuccess] = useState(false);
  // lockedCategory: set when user arrives from a service page via URL param
  // null means direct visit — show all options freely
  const [lockedCategory, setLockedCategory] = useState<string | null>(null);
  // lockedCourse: set when a specific course is passed via URL param
  // null means the user can freely pick within the (locked or unlocked) category
  const [lockedCourse, setLockedCourse] = useState<string | null>(null);

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

      // Only pre-select / lock when a category param is actually present
      if (catParam) {
        const { category, course } = getMappedCategoryAndCourse(catParam, courseParam);

        setLockedCategory(category);

        // Lock the specific course only when a course param was explicitly passed
        if (courseParam) {
          setLockedCourse(course);
        }

        setFormData(prev => ({
          ...prev,
          course: category,
          minorOption: course,
        }));
      }
      // No catParam → leave defaults as-is (all options open)
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      submitData.append(key, val);
    });

    try {
      const response = await fetch(getApiUrl("apply.php"), {
        method: "POST",
        body: submitData,
      });
      const res = await response.json();
      if (res.success) {
        setShowSuccess(true);
        // Reset form
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

      <div className="pt-28 sm:pt-32 pb-20 sm:pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl text-center text-[#55b9b7] font-serif mb-8 sm:mb-10 tracking-wide font-semibold">
          Apply
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white px-4 sm:px-8 md:px-10 py-8 md:py-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 sm:gap-y-7">
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
              {lockedCategory ? (
                /* Arrived from a service page — show only the matched category */
                <div className="border border-gray-200 rounded-[0.5rem] p-3 text-[0.9rem] w-full bg-gray-50 text-slate-700 select-none">
                  {lockedCategory}
                  <input type="hidden" name="course" value={lockedCategory} />
                </div>
              ) : (
                /* Direct visit — all categories selectable */
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
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">
                Course / Program :
              </label>
              {lockedCourse ? (
                /* A specific course was passed — show only that course */
                <div className="border border-gray-200 rounded-[0.5rem] p-3 text-[0.9rem] w-full bg-gray-50 text-slate-700 select-none">
                  {lockedCourse}
                  <input type="hidden" name="minorOption" value={lockedCourse} />
                </div>
              ) : (
                /* No specific course locked — allow selection within the (possibly locked) category */
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
              )}
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
              <div className="flex flex-wrap gap-4 sm:gap-6 items-center min-h-[46px]">
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
                Accommodation :
              </label>
              <div className="flex flex-wrap gap-4 sm:gap-6 items-center min-h-[46px]">
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
              <div className="flex flex-wrap gap-4 sm:gap-6 items-center min-h-[46px]">
                <label className="flex items-center gap-2 text-[0.9rem] text-slate-600 cursor-pointer">
                  <input
                    type="radio"
                    name="practisedYoga"
                    value="Yes"
                    onChange={handleChange}
                    checked={formData.practisedYoga === "Yes"}
                    className="w-3.5 h-3.5 accent-[#3b82f6]"
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
                    className="w-3.5 h-3.5 accent-[#3b82f6]"
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
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-[#55b9b7] text-white text-[0.9rem] font-medium border border-[#55b9b7] rounded-[0.5rem] shadow-sm hover:bg-[#49a09e] transition-colors inline-flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"} <CheckCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
      </div>

      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />

      {/* ── Success Modal ───────────────────────────────────────────── */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/40 backdrop-blur-sm">
          <div
            className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 flex flex-col items-center text-center animate-fade-up"
            style={{ animation: "fadeUp 0.35s ease both" }}
          >
            {/* Animated checkmark ring */}
            <div className="w-20 h-20 rounded-full bg-[#e8f8f7] flex items-center justify-center mb-6 shadow-inner">
              <CheckCircle className="w-11 h-11 text-[#55b9b7] stroke-[1.5]" />
            </div>

            <h2 className="font-serif text-2xl text-[#143d2c] font-bold mb-2">
              Application Submitted!
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-1">
              Thank you for applying to{" "}
              <span className="font-semibold text-slate-700">Dr. Vikram Yoga &amp; Wellness Centre</span>.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Our team will review your application and contact you shortly via email or phone to confirm your booking.
            </p>

            <button
              onClick={() => setShowSuccess(false)}
              className="px-10 py-3 bg-[#55b9b7] hover:bg-[#49a09e] text-white font-semibold text-sm rounded-xl transition-colors shadow-md w-full"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
