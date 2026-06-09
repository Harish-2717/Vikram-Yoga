import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Upload,
  Trash2,
  Edit3,
  Plus,
  Images as ImagesIcon,
  Type,
  X,
} from "lucide-react";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryAdminPage,
});

function GalleryAdminPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal States
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editingLoading, setEditingLoading] = useState(false);

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const fetchImages = async () => {
    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/gallery-images", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        // Sort by created_at descending
        const sorted = (res || []).sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setImages(sorted);
      } else {
        toast.error("Failed to load gallery images.");
      }
    } catch (err) {
      toast.error("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);

    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/gallery-images/add", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Gallery image added successfully!");
        setFile(null);
        setName("");
        // Reset file input element
        const input = document.getElementById("file-input") as HTMLInputElement;
        if (input) input.value = "";
        fetchImages();
      } else {
        toast.error(res.error || "Failed to add image.");
      }
    } catch {
      toast.error("An error occurred during upload.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEntry) return;

    setEditingLoading(true);
    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/gallery-images/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: editingEntry.id, name: editName }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Image name updated successfully!");
        setEditingEntry(null);
        fetchImages();
      } else {
        toast.error(res.error || "Failed to update image name.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setEditingLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this gallery image? It will be removed from the gallery page instantly."
      )
    ) {
      return;
    }

    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/gallery-images/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Gallery image deleted successfully!");
        fetchImages();
      } else {
        toast.error(res.error || "Failed to delete image.");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif-display text-3xl text-emerald-deep font-semibold">
              Gallery Images
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage the dynamic gallery sanctuary images and their names.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ADD GALLERY IMAGE FORM */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] lg:col-span-1">
            <h2 className="font-serif-display text-lg text-emerald-deep font-bold mb-5 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald" /> Add Gallery Image
            </h2>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="space-y-2">
                <label className="text-slate-500 font-medium text-xs uppercase tracking-wider block">
                  Image File
                </label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-slate-200 hover:border-emerald/40 rounded-xl cursor-pointer bg-slate-50/50 hover:bg-emerald/5 transition-all text-center px-4">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-7 h-7 text-slate-400 mb-2" />
                      <p className="text-xs text-slate-500 font-semibold">
                        {file ? file.name : "Select JPG, PNG or WEBP"}
                      </p>
                      <p className="text-[0.65rem] text-slate-400 mt-1">Max 5MB</p>
                    </div>
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      required
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-500 font-medium text-xs uppercase tracking-wider block">
                  Image Name / Caption
                </label>
                <div className="relative">
                  <Type className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sunrise Yoga Practice"
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-slate-700 text-xs transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-emerald-deep hover:bg-[#0c2a21] text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Uploading..." : "Publish Image"}
              </button>
            </form>
          </div>

          {/* GALLERY LIST */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center h-48 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep"></div>
              </div>
            ) : images.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] text-center text-slate-400 flex flex-col items-center">
                <ImagesIcon className="w-12 h-12 mb-3 stroke-1" />
                <h3 className="font-serif-display text-lg font-bold text-slate-700">
                  No gallery images found
                </h3>
                <p className="text-xs mt-1">
                  Upload images to display them in the Dynamic Gallery Sanctuary.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col group hover:shadow-soft transition-all duration-300"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <img
                        src={entry.image}
                        alt={entry.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4 border-t border-slate-50 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-700 truncate" title={entry.name}>
                          {entry.name}
                        </h4>
                        <span className="text-[0.55rem] text-slate-300 block mt-1">
                          {new Date(entry.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => {
                            setEditingEntry(entry);
                            setEditName(entry.name);
                          }}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-emerald/30 hover:bg-emerald/5 text-[0.65rem] font-semibold text-slate-500 hover:text-emerald transition-all cursor-pointer"
                          title="Rename Image"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Rename</span>
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50 text-[0.65rem] font-semibold text-slate-500 hover:text-red-600 transition-all cursor-pointer"
                          title="Delete Image"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
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

      {/* RENAME MODAL */}
      {editingEntry && (
        <div className="fixed inset-0 z-50 bg-[#08120d]/60 backdrop-blur-sm flex items-center justify-center px-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-100 max-w-md w-full p-6 shadow-luxury relative">
            <button
              onClick={() => setEditingEntry(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif-display text-lg text-emerald-deep font-bold mb-4">
              Rename Gallery Image
            </h3>
            <div className="mb-4 aspect-video rounded-xl overflow-hidden bg-slate-100 relative">
              <img
                src={editingEntry.image}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <form onSubmit={handleEdit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-slate-400 font-bold">
                  Image Name
                </label>
                <div className="relative">
                  <Type className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Sunrise Yoga Practice"
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-slate-700 text-xs transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={editingLoading}
                className="w-full py-2.5 bg-emerald-deep hover:bg-[#0c2a21] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {editingLoading ? "Saving..." : "Save Image Name"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
