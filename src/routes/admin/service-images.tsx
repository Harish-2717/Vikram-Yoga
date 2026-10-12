import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { getApiUrl, resolveImageUrl, bustCache } from "@/lib/utils";
import {
  Upload,
  Trash2,
  Plus,
  Layers,
  X,
  ChevronDown,
  RefreshCw,
  ImageOff,
  CheckCircle2,
  Eye,
  Info,
} from "lucide-react";

// Default bundled image assets for verification preview
// Yoga
import virabhadrasanaImg from "@/assets/New/file_0000000011a881fd88d925006e3dce12.png";
import padmasanaImg from "@/assets/New/file_000000007f1881fd807a2592c20cbf2b.png";
import parivrttaImg from "@/assets/New/file_000000000f0c820e8987e7311fec8ec6.png";
import bakasanaImg from "@/assets/New/file_0000000075fc81fda4b00a35862454cb.png";
import balasanaImg from "@/assets/New/file_00000000f3408230af738cdd3e700753.png";
import trikonasanaImg from "@/assets/New/file_00000000b1c081fd85dbad7820beccc7.png";

// Wellness Therapies
import shiatsu from "@/assets/New/Hands-On Yoga Bodywork Workshop.png";
import thaiMassage from "@/assets/New/maxresdefault.jpg.jpeg";
import acupunctureReal from "@/assets/New/Fundo Close  Up Das Mãos Em Um Casaco Branco  Realizando Uma Pequena Acupuntura Extrema Com Agulhas Em Cascata No Estômago Da Mulher Durante A Massagem Terapêutica Papel de Parede Para Download Gratuito - Pngtree.jpeg";
import reflexology from "@/assets/New/6 Mental Health Benefits of Regular Massage Therapy.jpeg";
import deepTissue from "@/assets/New/Deep Tissue Massage_ Benefits and Risks.jpeg";
import ayurvedic from "@/assets/New folder/Ayurvedic massage courses.png";
import cupping from "@/assets/New/cupping-therapy-new.jpeg";
import iastm from "@/assets/New/Can Scraping Therapy Help You Recover From Workouts_ (1).jpeg";
import dornTherapy from "@/assets/New/3 Home Exercises for Spine Health_ Improving Scoliosis in a Month (1).jpeg";
import swedishMassage from "@/assets/New/Swedish Massage Therapist.jpeg";

// Retreats
import wellnessRetreatImg from "@/assets/Yoga wellness retreat.png";
import meditationRetreatImg from "@/assets/Yoga meditation retreat.png";
import coupleRetreatImg from "@/assets/Couple Wellness retreat.png";
import detoxRetreatImg from "@/assets/Yoga Detox & Rejuvenation Retreat.png";
import varkalaBeach from "@/assets/varkala_beach.png";
import retreatBanner from "@/assets/retreat_banner.png";
import painManagementRetreatImg from "@/assets/pain_management_retreat.jpg";
import stressInsomniaRetreatImg from "@/assets/stress_insomnia_retreat.jpg";

export const Route = createFileRoute("/admin/service-images")({
  component: ServiceImagesAdminPage,
});

// ─── 4 Sections matching Services dropdown in Navbar exactly ───────────────────
export const GROUPS = [
  "YOGA",
  "WELLNESS THERAPY",
  "YOGA & WELLNESS RETREATS",
  "MASSAGE CERTIFICATE COURSES",
] as const;

export type ServiceGroup = (typeof GROUPS)[number];

export interface ServiceDef {
  key: string;
  label: string;
  group: ServiceGroup;
  defaultImg: string;
  tag?: string;
}

// ─── Complete Service Definitions across all 4 Sections ───────────────────────
export const SERVICES: ServiceDef[] = [
  // ── 1. YOGA ──
  {
    key: "hatha-yoga",
    label: "Hatha Yoga",
    group: "YOGA",
    defaultImg: virabhadrasanaImg,
    tag: "Classical Foundation",
  },
  {
    key: "pranayama-meditation",
    label: "Pranayama & Meditation",
    group: "YOGA",
    defaultImg: padmasanaImg,
    tag: "Breath & Mindfulness",
  },
  {
    key: "hatha-flow",
    label: "Hatha Flow",
    group: "YOGA",
    defaultImg: parivrttaImg,
    tag: "Dynamic Flow",
  },
  {
    key: "vinyasa-flow",
    label: "Vinyasa Flow",
    group: "YOGA",
    defaultImg: bakasanaImg,
    tag: "Strength & Agility",
  },
  {
    key: "yin-yoga",
    label: "Yin Yoga",
    group: "YOGA",
    defaultImg: balasanaImg,
    tag: "Restorative & Stillness",
  },
  {
    key: "therapeutic-yoga",
    label: "Therapeutic Yoga Sessions",
    group: "YOGA",
    defaultImg: trikonasanaImg,
    tag: "Assisted Posture Alignment",
  },

  // ── 2. WELLNESS THERAPY ──
  {
    key: "shiatsu-massage",
    label: "Shiatsu Massage Therapy",
    group: "WELLNESS THERAPY",
    defaultImg: shiatsu,
    tag: "Japanese Acupressure",
  },
  {
    key: "thai-yoga-massage",
    label: "Thai Yoga Massage Therapy",
    group: "WELLNESS THERAPY",
    defaultImg: thaiMassage,
    tag: "Assisted Stretching",
  },
  {
    key: "acupuncture",
    label: "Acupuncture Wellness Therapy",
    group: "WELLNESS THERAPY",
    defaultImg: acupunctureReal,
    tag: "TCM Point Therapy",
  },
  {
    key: "reflexology",
    label: "Reflexology",
    group: "WELLNESS THERAPY",
    defaultImg: reflexology,
    tag: "Foot & Hand Zones",
  },
  {
    key: "deep-tissue-massage",
    label: "Deep Tissue Massage Therapy",
    group: "WELLNESS THERAPY",
    defaultImg: deepTissue,
    tag: "Myofascial Release",
  },
  {
    key: "ayurvedic-massage",
    label: "Ayurvedic Massage Therapy",
    group: "WELLNESS THERAPY",
    defaultImg: ayurvedic,
    tag: "Herbal Oil Therapy",
  },
  {
    key: "cupping-therapy",
    label: "Cupping Therapy",
    group: "WELLNESS THERAPY",
    defaultImg: cupping,
    tag: "Decompression & Detox",
  },
  {
    key: "iastm",
    label: "IASTM (Instrument-Assisted Soft Tissue Mobilization)",
    group: "WELLNESS THERAPY",
    defaultImg: iastm,
    tag: "Fascial Scraping",
  },
  {
    key: "dorn-therapy",
    label: "Dorn Therapy",
    group: "WELLNESS THERAPY",
    defaultImg: dornTherapy,
    tag: "Spinal Alignment",
  },

  // ── 3. YOGA & WELLNESS RETREATS ──
  {
    key: "holistic-wellness-retreat",
    label: "7 Days & 14 Days Holistic Wellness Retreat",
    group: "YOGA & WELLNESS RETREATS",
    defaultImg: wellnessRetreatImg,
    tag: "Holistic Immersion",
  },
  {
    key: "yoga-meditation-retreat",
    label: "Yoga & Meditation Retreat",
    group: "YOGA & WELLNESS RETREATS",
    defaultImg: meditationRetreatImg,
    tag: "Traditional Practice",
  },
  {
    key: "couple-wellness-retreat",
    label: "Couple Wellness Retreat",
    group: "YOGA & WELLNESS RETREATS",
    defaultImg: coupleRetreatImg,
    tag: "Shared Healing",
  },
  {
    key: "yoga-detox-retreat",
    label: "Yoga Detox & Rejuvenation Retreat",
    group: "YOGA & WELLNESS RETREATS",
    defaultImg: detoxRetreatImg,
    tag: "Lifestyle Renewal",
  },
  {
    key: "energy-balancing-retreat",
    label: "Energy Balancing Retreat",
    group: "YOGA & WELLNESS RETREATS",
    defaultImg: varkalaBeach,
    tag: "Energetic Harmony",
  },
  {
    key: "anti-aging-longevity-retreat",
    label: "Anti-Aging & Healthy Longevity Retreat",
    group: "YOGA & WELLNESS RETREATS",
    defaultImg: retreatBanner,
    tag: "Graceful Vitality",
  },
  {
    key: "pain-management-retreat",
    label: "Pain Management & Therapeutic Wellness Retreat",
    group: "YOGA & WELLNESS RETREATS",
    defaultImg: painManagementRetreatImg,
    tag: "Targeted Relief",
  },
  {
    key: "stress-insomnia-retreat",
    label: "Stress & Insomnia Management Retreat",
    group: "YOGA & WELLNESS RETREATS",
    defaultImg: stressInsomniaRetreatImg,
    tag: "Calm & Sleep",
  },

  // ── 4. MASSAGE CERTIFICATE COURSES ──
  {
    key: "cert-shiatsu",
    label: "Shiatsu Massage Certification",
    group: "MASSAGE CERTIFICATE COURSES",
    defaultImg: shiatsu,
    tag: "Certification",
  },
  {
    key: "cert-thai-yoga",
    label: "Thai Yoga Massage Certification",
    group: "MASSAGE CERTIFICATE COURSES",
    defaultImg: thaiMassage,
    tag: "Certification",
  },
  {
    key: "cert-reflexology",
    label: "Reflexology Therapy Certification",
    group: "MASSAGE CERTIFICATE COURSES",
    defaultImg: reflexology,
    tag: "Certification",
  },
  {
    key: "cert-ayurvedic",
    label: "Ayurvedic Massage Certification",
    group: "MASSAGE CERTIFICATE COURSES",
    defaultImg: ayurvedic,
    tag: "Certification",
  },
  {
    key: "cert-swedish",
    label: "Swedish Massage Certification",
    group: "MASSAGE CERTIFICATE COURSES",
    defaultImg: swedishMassage,
    tag: "Certification",
  },
  {
    key: "cert-deep-tissue",
    label: "Deep Tissue Massage Certification",
    group: "MASSAGE CERTIFICATE COURSES",
    defaultImg: deepTissue,
    tag: "Certification",
  },
  {
    key: "cert-dorn",
    label: "Dorn Therapy Certification",
    group: "MASSAGE CERTIFICATE COURSES",
    defaultImg: dornTherapy,
    tag: "Certification",
  },
];

interface ServiceImage {
  id: string;
  service_key: string;
  service_label: string;
  image: string;
  alt_text: string;
  sort_order: number;
  created_at?: string;
}

function ServiceImagesAdminPage() {
  const [allImages, setAllImages] = useState<ServiceImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState<ServiceGroup>("YOGA");
  const [selectedServiceKey, setSelectedServiceKey] = useState<string>("hatha-yoga");

  // Upload form
  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Replace modal
  const [replaceTarget, setReplaceTarget] = useState<ServiceImage | null>(null);
  const [replaceFile, setReplaceFile] = useState<File | null>(null);
  const [replacePreview, setReplacePreview] = useState<string | null>(null);
  const [replaceLoading, setReplaceLoading] = useState(false);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const fetchImages = async () => {
    setLoading(true);
    const token = getSessionToken();
    try {
      const res = await fetch(bustCache(getApiUrl("admin/service-images.php")), {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setAllImages(Array.isArray(data) ? data : []);
      } else {
        toast.error("Failed to load service images.");
      }
    } catch {
      toast.error("Failed to load service images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Services in currently active group tab
  const servicesInGroup = SERVICES.filter((s) => s.group === activeGroup);

  // Fallback to first service in group if current key doesn't belong to it
  const selectedService =
    SERVICES.find((s) => s.key === selectedServiceKey) || servicesInGroup[0] || SERVICES[0];

  // Images uploaded for the currently selected service
  const currentImages = allImages.filter((img) => img.service_key === selectedService.key);

  // When file selected for upload, generate preview
  const handleFileChange = (f: File | null) => {
    setFile(f);
    if (f) {
      const url = URL.createObjectURL(f);
      setPreview(url);
    } else {
      setPreview(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("service_key", selectedService.key);
    formData.append("service_label", selectedService.label);
    formData.append("alt_text", altText || selectedService.label);

    const token = getSessionToken();
    try {
      const res = await fetch(getApiUrl("admin/service-images-add.php"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Service image uploaded successfully!");
        // UPSERT-aware optimistic update:
        // If an image for this service_key already exists in state, replace it.
        // Otherwise append. This mirrors what the backend does.
        const newRecord: ServiceImage = {
          id: data.id,
          service_key: data.service_key || selectedService.key,
          service_label: data.service_label || selectedService.label,
          image: data.image,
          alt_text: data.alt_text || altText || selectedService.label,
          sort_order: 0,
          created_at: data.created_at,
        };
        setAllImages((prev) => {
          const without = prev.filter((img) => img.service_key !== selectedService.key);
          return [...without, newRecord];
        });
        setFile(null);
        setPreview(null);
        setAltText("");
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        toast.error(data.error || "Upload failed.");
      }
    } catch {
      toast.error("An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service image? It will revert to the default image on the frontend."))
      return;
    const token = getSessionToken();
    try {
      const res = await fetch(getApiUrl("admin/service-images-delete.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success("Image deleted. Frontend will now use the default system image.");
        // Optimistic state update — immediately remove
        setAllImages((prev) => prev.filter((img) => img.id !== id));
      } else {
        toast.error(data.error || "Delete failed.");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  // Replace = delete old + upload new
  const handleReplace = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replaceTarget || !replaceFile) {
      toast.error("Please select a replacement image.");
      return;
    }
    setReplaceLoading(true);
    const token = getSessionToken();

    try {
      // Step 1: delete old record + file
      const delRes = await fetch(getApiUrl("admin/service-images-delete.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: replaceTarget.id }),
      });
      const delData = await delRes.json();
      if (!delRes.ok || !delData.success) {
        toast.error(delData.error || "Failed to remove old image.");
        setReplaceLoading(false);
        return;
      }

      // Step 2: upload new file
      const formData = new FormData();
      formData.append("image", replaceFile);
      formData.append("service_key", replaceTarget.service_key);
      formData.append("service_label", replaceTarget.service_label);
      formData.append("alt_text", replaceTarget.alt_text || replaceTarget.service_label);
      formData.append("sort_order", String(replaceTarget.sort_order));

      const addRes = await fetch(getApiUrl("admin/service-images-add.php"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const addData = await addRes.json();
      if (addRes.ok && addData.success) {
        toast.success("Image replaced successfully!");
        // Optimistic state update — remove old and add new
        const newRecord: ServiceImage = {
          id: addData.id,
          service_key: addData.service_key || replaceTarget.service_key,
          service_label: addData.service_label || replaceTarget.service_label,
          image: addData.image,
          alt_text: addData.alt_text || replaceTarget.alt_text,
          sort_order: addData.sort_order ?? replaceTarget.sort_order,
          created_at: addData.created_at,
        };
        setAllImages((prev) =>
          prev.filter((img) => img.id !== replaceTarget.id).concat(newRecord)
        );
        setReplaceTarget(null);
        setReplaceFile(null);
        setReplacePreview(null);
        if (replaceInputRef.current) replaceInputRef.current.value = "";
      } else {
        toast.error(addData.error || "Failed to upload replacement image.");
      }
    } catch {
      toast.error("An error occurred during replace.");
    } finally {
      setReplaceLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6 animate-fade-up">
        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="font-serif-display text-2xl sm:text-3xl text-emerald-deep font-semibold">
              Service Images
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage images for all 4 service categories. Verify default images and upload custom photos.
            </p>
          </div>
          <button
            onClick={fetchImages}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-500 hover:border-emerald/40 hover:text-emerald hover:bg-emerald/5 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </button>
        </div>

        {/* ── 4 Group Tabs (matching the Navbar Services dropdown) ── */}
        <div className="flex flex-wrap gap-2.5 p-1.5 bg-slate-100/70 rounded-2xl border border-slate-200/80">
          {GROUPS.map((group) => {
            const countInGroup = allImages.filter((img) =>
              SERVICES.some((s) => s.group === group && s.key === img.service_key)
            ).length;
            const isSelected = activeGroup === group;

            return (
              <button
                key={group}
                onClick={() => {
                  setActiveGroup(group);
                  const first = SERVICES.find((s) => s.group === group);
                  if (first) setSelectedServiceKey(first.key);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  isSelected
                    ? "bg-emerald-deep text-white shadow-md shadow-emerald-deep/20"
                    : "bg-white text-slate-600 hover:text-emerald hover:bg-white/90 border border-slate-200/60"
                }`}
              >
                <span>{group}</span>
                {countInGroup > 0 && (
                  <span
                    className={`text-[0.65rem] px-2 py-0.5 rounded-full font-bold ${
                      isSelected
                        ? "bg-gold text-emerald-deep"
                        : "bg-emerald/10 text-emerald font-semibold"
                    }`}
                  >
                    {countInGroup}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* ── LEFT: Service Selector + Upload Form ── */}
          <div className="space-y-5 lg:col-span-1">
            {/* Service Picker */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-3.5">
                <h2 className="font-serif-display text-sm text-emerald-deep font-bold flex items-center gap-2 uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-emerald" />
                  Select Service
                </h2>
                <span className="text-[0.65rem] text-slate-400 font-semibold">
                  {servicesInGroup.length} services
                </span>
              </div>
              <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1">
                {servicesInGroup.map((s) => {
                  const count = allImages.filter((img) => img.service_key === s.key).length;
                  const isSelected = selectedService.key === s.key;
                  return (
                    <button
                      key={s.key}
                      onClick={() => setSelectedServiceKey(s.key)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                        isSelected
                          ? "bg-emerald-deep text-white font-semibold shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-emerald-deep"
                      }`}
                    >
                      <span className="truncate">{s.label}</span>
                      <span
                        className={`text-[0.6rem] px-2 py-0.5 rounded-full font-bold shrink-0 ${
                          isSelected
                            ? count > 0
                              ? "bg-gold text-emerald-deep"
                              : "bg-white/20 text-white"
                            : count > 0
                            ? "bg-emerald/10 text-emerald font-bold"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {count > 0 ? `${count} custom` : "default"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Upload / Replace Form */}
            <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.02)]">
              <h2 className="font-serif-display text-sm text-emerald-deep font-bold mb-1 flex items-center gap-2 uppercase tracking-wider">
                {currentImages.length > 0 ? (
                  <><RefreshCw className="w-4 h-4 text-emerald" /> Replace Image</>
                ) : (
                  <><Upload className="w-4 h-4 text-emerald" /> Upload Image</>
                )}
              </h2>
              <p className="text-[0.7rem] text-slate-400 mb-1">
                {currentImages.length > 0 ? "Replacing for" : "Uploading for"}:{" "}
                <span className="font-bold text-emerald-deep">{selectedService.label}</span>
              </p>
              {currentImages.length > 0 && (
                <p className="text-[0.65rem] text-amber-600 bg-amber-50 border border-amber-200/60 rounded-lg px-3 py-1.5 mb-3">
                  ⚠️ A custom image already exists. Uploading will permanently replace it.
                </p>
              )}

              <form onSubmit={handleAdd} className="space-y-4">
                {/* File picker drop area */}
                <div>
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Image File (JPG, PNG, WEBP)
                  </label>
                  <label
                    htmlFor="service-img-input"
                    className="border-2 border-dashed border-slate-200 hover:border-emerald/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald/5 transition-all text-center group"
                  >
                    {preview ? (
                      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden mb-2">
                        <img
                          src={preview}
                          alt="Upload preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="py-4">
                        <Upload className="w-8 h-8 text-slate-300 group-hover:text-emerald transition-colors mx-auto mb-2" />
                        <span className="text-xs font-semibold text-slate-600 block">
                          Click to select image
                        </span>
                        <span className="text-[0.65rem] text-slate-400 mt-0.5 block">
                          Max size: 8MB
                        </span>
                      </div>
                    )}
                    <input
                      id="service-img-input"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                  {preview && (
                    <button
                      type="button"
                      onClick={() => handleFileChange(null)}
                      className="text-[0.65rem] text-red-500 hover:underline mt-1.5 flex items-center gap-1"
                    >
                      <X className="w-3 h-3" /> Remove selected image
                    </button>
                  )}
                </div>

                {/* Alt Text / Caption */}
                <div>
                  <label className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                    Alt Text / Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder={selectedService.label}
                    className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-emerald focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading || !file}
                  className="w-full py-3 bg-emerald-deep text-white font-semibold text-xs tracking-wider uppercase rounded-xl hover:bg-emerald transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {uploading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {currentImages.length > 0 ? "Replacing..." : "Uploading..."}
                    </>
                  ) : (
                    <>
                      {currentImages.length > 0 ? <RefreshCw className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      {currentImages.length > 0 ? "Replace Service Image" : "Upload to Service"}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* ── RIGHT: Current Images & Verification View ── */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="font-serif-display text-lg text-emerald-deep font-bold">
                  {selectedService.label}
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {currentImages.length > 0
                    ? `${currentImages.length} custom image${currentImages.length !== 1 ? "s" : ""} uploaded (active on website)`
                    : "Using default system image (no custom upload yet)"}
                </p>
              </div>
              <span className="text-[0.65rem] tracking-wider uppercase text-emerald font-bold bg-emerald/10 px-3.5 py-1 rounded-full">
                {selectedService.group}
              </span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-52 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep" />
              </div>
            ) : currentImages.length === 0 ? (
              /* ── Default System Image Verification Card ── */
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-[0_4px_30px_rgba(0,0,0,0.02)] space-y-5">
                <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/60 text-amber-800 text-xs leading-relaxed">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Currently showing Default System Image</strong> on the live website. You can verify the default image below, or upload a custom photo using the form on the left to replace it.
                  </span>
                </div>

                <div className="max-w-md mx-auto bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={selectedService.defaultImg}
                      alt={selectedService.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-[0.65rem] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/20">
                      <CheckCircle2 className="w-3 h-3 text-gold" />
                      Active System Default
                    </div>
                  </div>
                  <div className="p-4 bg-white flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold text-slate-800">{selectedService.label}</p>
                      <p className="text-[0.65rem] text-slate-400 mt-0.5">
                        Tag: {selectedService.tag || selectedService.group}
                      </p>
                    </div>
                    <label
                      htmlFor="service-img-input"
                      className="px-3 py-1.5 rounded-xl bg-emerald-deep text-white text-[0.65rem] font-semibold hover:bg-emerald transition-colors cursor-pointer shrink-0"
                    >
                      Upload Replacement
                    </label>
                  </div>
                </div>
              </div>
            ) : (
              /* ── Custom Uploaded Images Grid ── */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {currentImages.map((img) => (
                  <div
                    key={img.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] group hover:shadow-md transition-all duration-300 flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={resolveImageUrl(img.image)}
                        alt={img.alt_text || img.service_label}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23f1f5f9'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%2394a3b8' font-size='14' font-family='sans-serif'%3EImage not found%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute top-3 left-3 bg-emerald-deep/90 backdrop-blur-sm text-gold text-[0.65rem] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-gold/30">
                        <CheckCircle2 className="w-3 h-3 text-gold" />
                        Live on Frontend
                      </div>
                    </div>

                    {/* Info + Actions */}
                    <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                      <div>
                        <p className="text-xs font-semibold text-slate-700 leading-snug">
                          {img.alt_text || img.service_label}
                        </p>
                        {img.created_at && (
                          <p className="text-[0.6rem] text-slate-400 mt-1">
                            Uploaded {new Date(img.created_at).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setReplaceTarget(img);
                            setReplaceFile(null);
                            setReplacePreview(null);
                          }}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-emerald/30 hover:bg-emerald/5 text-[0.65rem] font-semibold text-slate-500 hover:text-emerald transition-all"
                        >
                          <RefreshCw className="w-3 h-3" />
                          Replace
                        </button>
                        <button
                          onClick={() => handleDelete(img.id)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:border-red-200 hover:bg-red-50 text-[0.65rem] font-semibold text-slate-500 hover:text-red-600 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Replace Image Modal ── */}
      {replaceTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-slate-100 shadow-2xl animate-fade-up">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-display text-base text-emerald-deep font-bold">
                Replace Service Image
              </h3>
              <button
                onClick={() => {
                  setReplaceTarget(null);
                  setReplaceFile(null);
                  setReplacePreview(null);
                }}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Select a new image to replace the current image for{" "}
              <strong>{replaceTarget.service_label}</strong>. The old image file will be permanently removed.
            </p>

            <form onSubmit={handleReplace} className="space-y-4">
              <div>
                <label
                  htmlFor="replace-img-input"
                  className="border-2 border-dashed border-slate-200 hover:border-emerald/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald/5 transition-all text-center group"
                >
                  {replacePreview ? (
                    <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                      <img
                        src={replacePreview}
                        alt="Replace preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="py-4">
                      <Upload className="w-8 h-8 text-slate-300 group-hover:text-emerald transition-colors mx-auto mb-2" />
                      <span className="text-xs font-semibold text-slate-600 block">
                        Select replacement image
                      </span>
                      <span className="text-[0.65rem] text-slate-400 mt-0.5 block">
                        Max size: 8MB
                      </span>
                    </div>
                  )}
                  <input
                    id="replace-img-input"
                    ref={replaceInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0] || null;
                      setReplaceFile(f);
                      if (f) {
                        setReplacePreview(URL.createObjectURL(f));
                      } else {
                        setReplacePreview(null);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setReplaceTarget(null);
                    setReplaceFile(null);
                    setReplacePreview(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={replaceLoading || !replaceFile}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-deep text-white text-xs font-semibold hover:bg-emerald transition-colors shadow-sm disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
                >
                  {replaceLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Replacing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      Confirm Replace
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
