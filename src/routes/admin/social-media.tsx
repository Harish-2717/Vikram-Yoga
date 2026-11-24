import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getApiUrl, resolveImageUrl, bustCache } from "@/lib/utils";
import {
  Upload,
  Trash2,
  Edit3,
  ExternalLink,
  Plus,
  Image as ImageIcon,
  Link as LinkIcon,
  X,
  RefreshCw,
} from "lucide-react";

export const Route = createFileRoute("/admin/social-media")({
  component: SocialMediaPage,
});

function SocialMediaPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Edit Modal States
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [editUrl, setEditUrl] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editPreview, setEditPreview] = useState<string | null>(null);
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
      const response = await fetch(bustCache(getApiUrl("admin/social-images.php")), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setImages(res || []);
      } else {
        toast.error("Failed to load images.");
      }
    } catch (err) {
      toast.error("Failed to load images.");
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

    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image file must be under 10 MB.");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("social_media_url", url);

    const token = getSessionToken();
    try {
      const response = await fetch(getApiUrl("admin/social-images-add.php"), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Image added successfully!");
        setFile(null);
        setUrl("");
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

    if (editFile && editFile.size > 10 * 1024 * 1024) {
      toast.error("Replacement image must be under 10 MB.");
      return;
    }

    setEditingLoading(true);
    const token = getSessionToken();
    try {
      // If a new image file is selected, use multipart/form-data
      if (editFile) {
        const formData = new FormData();
        formData.append("id", editingEntry.id);
        formData.append("social_media_url", editUrl);
        formData.append("image", editFile);

        const response = await fetch(getApiUrl("admin/social-images-edit.php"), {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        const res = await response.json();
        if (response.ok && res.success) {
          toast.success("Image replaced and entry updated successfully!");
          setEditingEntry(null);
          setEditFile(null);
          setEditPreview(null);
          fetchImages();
        } else {
          toast.error(res.error || "Failed to update entry.");
        }
      } else {
        // No image change — just update URL
        const response = await fetch(getApiUrl("admin/social-images-edit.php"), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: editingEntry.id, social_media_url: editUrl }),
        });
        const res = await response.json();
        if (response.ok && res.success) {
          toast.success("Link updated successfully!");
          setEditingEntry(null);
          fetchImages();
        } else {
          toast.error(res.error || "Failed to update link.");
        }
      }
    } catch {
      toast.error("An error occurred while saving changes.");
    } finally {
      setEditingLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this image? It will be removed from the homepage instantly.",
      )
    ) {
      return;
    }

    const token = getSessionToken();
    try {
      const response = await fetch(getApiUrl("admin/social-images-delete.php"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Image deleted successfully!");
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
              Social Media Images
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage the Instagram feed showcase displayed on the homepage.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ADD ENTRY FORM */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] lg:col-span-1">
            <h2 className="font-serif-display text-lg text-emerald-deep font-bold mb-5 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald" /> Add Instagram Entry
            </h2>
            <form onSubmit={handleAdd} className="space-y-5">
              <div className="space-y-2">
                <label className="text-slate-500 font-medium text-xs uppercase tracking-wider block">
                  Instagram Image
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
                  Instagram Link (URL)
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://instagram.com/p/..."
                    className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-slate-700 text-xs transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-emerald-deep hover:bg-[#0c2a21] text-white text-xs font-semibold tracking-widest uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? "Uploading..." : "Publish Entry"}
              </button>
            </form>
          </div>

          {/* IMAGES GALLERY */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="flex items-center justify-center h-48 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep"></div>
              </div>
            ) : images.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] text-center text-slate-400 flex flex-col items-center">
                <ImageIcon className="w-12 h-12 mb-3 stroke-1" />
                <h3 className="font-serif-display text-lg font-bold text-slate-700">
                  No images published
                </h3>
                <p className="text-xs mt-1">
                  Upload images to display them in the Instagram feed showcase on the homepage.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {images.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] flex flex-col group hover:shadow-soft transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                      <img
                        src={resolveImageUrl(entry.image)}
                        alt="Gallery Item"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23f1f5f9'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%2394a3b8' font-size='14' font-family='sans-serif'%3EImage not found%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      <div className="absolute inset-0 bg-[#08120d]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                        <a
                          href={entry.social_media_url}
                          target="_blank"
                          rel="noreferrer"
                          className="w-9 h-9 rounded-full bg-white/90 hover:bg-gold text-emerald-deep hover:text-white flex items-center justify-center shadow transition-colors"
                          title="View on Instagram"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => {
                            setEditingEntry(entry);
                            setEditUrl(entry.social_media_url);
                            setEditFile(null);
                            setEditPreview(null);
                          }}
                          className="w-9 h-9 rounded-full bg-white/90 hover:bg-emerald text-emerald-deep hover:text-white flex items-center justify-center shadow transition-colors"
                          title="Edit Entry"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(entry.id)}
                          className="w-9 h-9 rounded-full bg-white/90 hover:bg-red-500 text-emerald-deep hover:text-white flex items-center justify-center shadow transition-colors"
                          title="Delete Entry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-3.5 border-t border-slate-50 flex-1 flex flex-col justify-between">
                      <p
                        className="text-[0.65rem] text-slate-400 font-medium truncate max-w-full"
                        title={entry.social_media_url}
                      >
                        Link:{" "}
                        {entry.social_media_url !== "#"
                          ? entry.social_media_url.replace("https://", "")
                          : "None"}
                      </p>
                      <span className="text-[0.55rem] text-slate-300 block mt-1">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL — supports both URL update and image replacement */}
      {editingEntry && (
        <div className="fixed inset-0 z-50 bg-[#08120d]/60 backdrop-blur-sm flex items-center justify-center px-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-100 max-w-md w-full p-6 shadow-luxury relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setEditingEntry(null);
                setEditFile(null);
                setEditPreview(null);
              }}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif-display text-lg text-emerald-deep font-bold mb-1">
              Edit Instagram Link & Image
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Update the social link URL or choose a new photo to replace the current image.
            </p>

            {/* Image preview */}
            <div className="mb-4 aspect-video rounded-xl overflow-hidden bg-slate-100 relative group border border-slate-200 shadow-inner">
              <img
                src={editPreview || resolveImageUrl(editingEntry.image)}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover transition-all"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' fill='%23f1f5f9'%3E%3Crect width='400' height='300'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%2394a3b8' font-size='14' font-family='sans-serif'%3ENo Preview Available%3C/text%3E%3C/svg%3E";
                }}
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[0.6rem] font-medium px-2.5 py-1 rounded-full shadow">
                {editPreview ? "New Photo Preview" : "Current Photo"}
              </div>
              {editPreview && (
                <div className="absolute top-2 right-2 bg-emerald text-white text-[0.6rem] font-bold px-2.5 py-1 rounded-full shadow animate-pulse">
                  Ready to Replace
                </div>
              )}
            </div>

            <form onSubmit={handleEdit} className="space-y-4">
              {/* Replace Image Upload Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[0.65rem] tracking-[0.2em] uppercase text-slate-500 font-bold block">
                    Replace Photo (Optional)
                  </label>
                  {editFile && (
                    <span className="text-[0.65rem] text-emerald font-semibold">
                      {(editFile.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  )}
                </div>
                <label
                  htmlFor="social-edit-file-input"
                  className={`flex items-center justify-center gap-2.5 w-full py-3 px-4 border-2 border-dashed rounded-xl cursor-pointer transition-all text-center ${
                    editFile
                      ? "border-emerald/40 bg-emerald/5 hover:bg-emerald/10"
                      : "border-slate-200 hover:border-emerald/40 bg-slate-50 hover:bg-emerald/5"
                  }`}
                >
                  <RefreshCw className={`w-4 h-4 shrink-0 ${editFile ? "text-emerald" : "text-slate-400"}`} />
                  <span className="text-xs font-medium text-slate-700 truncate">
                    {editFile ? editFile.name : "Click to select a replacement image (JPG, PNG, WEBP)"}
                  </span>
                  <input
                    id="social-edit-file-input"
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const selected = e.target.files?.[0] || null;
                      if (selected) {
                        if (!selected.type.startsWith("image/")) {
                          toast.error("Please select a valid image file (JPG, PNG, WEBP, GIF).");
                          return;
                        }
                        if (selected.size > 10 * 1024 * 1024) {
                          toast.error("Image file must be under 10 MB.");
                          return;
                        }
                        setEditFile(selected);
                        setEditPreview(URL.createObjectURL(selected));
                      }
                    }}
                  />
                </label>
                {editFile && (
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[0.65rem] text-slate-400">
                      Existing photo will be replaced upon saving.
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditFile(null);
                        setEditPreview(null);
                        const inp = document.getElementById("social-edit-file-input") as HTMLInputElement;
                        if (inp) inp.value = "";
                      }}
                      className="text-[0.65rem] text-red-500 hover:text-red-700 hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <X className="w-3 h-3" /> Revert to current photo
                    </button>
                  </div>
                )}
              </div>

              {/* Social Media URL */}
              <div className="space-y-1">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-slate-500 font-bold">
                  Social Media URL
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="url"
                    required
                    value={editUrl}
                    onChange={(e) => setEditUrl(e.target.value)}
                    placeholder="https://instagram.com/p/..."
                    className="w-full bg-slate-50 border border-slate-200 focus:border-emerald focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-slate-700 text-xs transition-all"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={editingLoading}
                  className="w-full py-3 bg-emerald-deep hover:bg-[#0c2a21] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {editingLoading ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving Changes...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
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
