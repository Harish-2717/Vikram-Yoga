import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Check,
  X as XIcon,
  Trash2,
  Star,
  Search,
  MessageSquare,
  Clock,
  Sparkles,
  Inbox,
  Eye,
  Calendar,
} from "lucide-react";

export const Route = createFileRoute("/admin/testimonials")({
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Detailed Modal View
  const [selectedMsg, setSelectedMsg] = useState<any>(null);

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const fetchTestimonials = async () => {
    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/testimonials", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setTestimonials(res || []);
      } else {
        toast.error("Failed to load testimonials.");
      }
    } catch {
      toast.error("Failed to load testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleUpdateStatus = async (id: string, status: "Approved" | "Rejected") => {
    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/testimonials/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success(`Review successfully ${status.toLowerCase()}!`);
        fetchTestimonials();
        if (selectedMsg && selectedMsg.id === id) {
          setSelectedMsg({ ...selectedMsg, status });
        }
      } else {
        toast.error(res.error || "Failed to update status");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this testimonial?")) return;

    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/testimonials/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          action: "delete",
        }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Review deleted successfully!");
        fetchTestimonials();
        setSelectedMsg(null);
      } else {
        toast.error(res.error || "Failed to delete review");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  // Filter and Search logic
  const filtered = testimonials.filter((t) => {
    const matchesStatus = filterStatus === "all" || t.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalReviews = testimonials.length;
  const pendingReviews = testimonials.filter((t) => t.status === "Pending").length;
  const approvedReviews = testimonials.filter((t) => t.status === "Approved").length;

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-deep"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-serif-display font-semibold text-slate-800 tracking-wide">
          Testimonials & Feedbacks
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review, approve, or delete student feedbacks. Approved reviews are displayed on the home page.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-600">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Total Reviews</span>
            <span className="text-xl font-bold text-slate-800">{totalReviews}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Pending Approval</span>
            <span className="text-xl font-bold text-slate-800">{pendingReviews}</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-soft border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-medium block">Approved Reviews</span>
            <span className="text-xl font-bold text-slate-800">{approvedReviews}</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-5 rounded-2xl shadow-soft border border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, role, review..."
            className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald-deep focus:outline-none rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-700 transition-all placeholder:text-slate-400"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase border transition-all ${
                filterStatus === status
                  ? "bg-emerald-deep text-white border-emerald-deep"
                  : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Table */}
      <div className="bg-white rounded-3xl shadow-soft border border-slate-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center justify-center gap-4 text-slate-400">
            <Inbox className="w-12 h-12 stroke-[1.2] text-slate-300" />
            <p className="text-sm font-medium">No reviews found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[0.65rem] tracking-[0.2em] uppercase text-slate-400 font-bold">
                  <th className="py-4 px-6">Reviewer</th>
                  <th className="py-4 px-6">Rating</th>
                  <th className="py-4 px-6">Review Text</th>
                  <th className="py-4 px-6">Submitted At</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.id} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/30 transition-all group">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        {t.image ? (
                          <img
                            src={t.image}
                            alt={t.name}
                            className="w-10 h-10 rounded-full object-cover border border-slate-100"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-emerald-deep/15 text-emerald-deep font-bold flex items-center justify-center text-sm border border-emerald-deep/10">
                            {t.name.substring(0, 1).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <span className="font-semibold text-slate-800 text-sm block">
                            {t.name}
                          </span>
                          <span className="text-slate-400 text-xs font-medium block">
                            {t.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex gap-0.5">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 text-gold fill-gold" />
                        ))}
                      </div>
                    </td>

                    <td className="py-5 px-6 max-w-xs md:max-w-sm">
                      <p className="text-slate-600 text-xs truncate font-medium leading-relaxed italic">
                        "{t.message}"
                      </p>
                    </td>

                    <td className="py-5 px-6">
                      <span className="text-xs text-slate-500 font-medium">
                        {new Date(t.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    <td className="py-5 px-6">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-[0.65rem] tracking-wider uppercase font-semibold border ${
                          t.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : t.status === "Rejected"
                              ? "bg-rose-50 text-rose-700 border-rose-100"
                              : "bg-amber-50 text-amber-700 border-amber-100"
                        }`}
                      >
                        {t.status}
                      </span>
                    </td>

                    <td className="py-5 px-6 text-right">
                      <div className="flex gap-2 justify-end opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => setSelectedMsg(t)}
                          className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        {t.status !== "Approved" && (
                          <button
                            onClick={() => handleUpdateStatus(t.id, "Approved")}
                            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors"
                            title="Approve Review"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {t.status !== "Rejected" && (
                          <button
                            onClick={() => handleUpdateStatus(t.id, "Rejected")}
                            className="p-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                            title="Reject Review"
                          >
                            <XIcon className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(t.id)}
                          className="p-2 rounded-lg bg-slate-100 text-slate-500 hover:bg-red-550 hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Details Modal */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08120d]/50 backdrop-blur-xs animate-in fade-in duration-300">
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 md:p-8 shadow-luxury border border-slate-150 animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMsg(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
              {selectedMsg.image ? (
                <img
                  src={selectedMsg.image}
                  alt={selectedMsg.name}
                  className="w-12 h-12 rounded-full object-cover border border-slate-100"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-emerald-deep/15 text-emerald-deep font-bold flex items-center justify-center text-lg border border-emerald-deep/10">
                  {selectedMsg.name.substring(0, 1).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="font-semibold text-slate-800 text-lg leading-snug">
                  {selectedMsg.name}
                </h3>
                <span className="text-slate-400 text-xs font-medium block">
                  {selectedMsg.role}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                  Review Rating
                </span>
                <div className="flex gap-1">
                  {[...Array(selectedMsg.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">
                  Submitted At
                </span>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>{new Date(selectedMsg.created_at).toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold block">
                  Testimonial text
                </span>
                <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 text-sm text-slate-700 italic leading-relaxed font-serif-display">
                  "{selectedMsg.message}"
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex gap-3 justify-end">
                {selectedMsg.status !== "Approved" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedMsg.id, "Approved")}
                    className="px-4 py-2 rounded-xl bg-emerald-deep text-white text-xs font-semibold uppercase tracking-wider shadow hover:bg-[#0c2a21] transition-all flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Approve
                  </button>
                )}
                {selectedMsg.status !== "Rejected" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedMsg.id, "Rejected")}
                    className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold uppercase tracking-wider border border-rose-150 transition-all flex items-center gap-1.5"
                  >
                    <XIcon className="w-4 h-4" /> Reject
                  </button>
                )}
                <button
                  onClick={() => handleDelete(selectedMsg.id)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50 text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
