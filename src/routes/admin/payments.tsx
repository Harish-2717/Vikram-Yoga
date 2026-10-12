import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getApiUrl, resolveImageUrl } from "@/lib/utils";
import {
  Check,
  X as XIcon,
  Eye,
  MessageSquare,
  FileImage,
  FolderOpen,
  Calendar,
  User,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/admin/payments")({
  component: PaymentsPage,
});

function PaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected Image for Lightbox Modal
  const [activeImage, setActiveImage] = useState<string | null>(null);

  // Reject Modal States
  const [activeReject, setActiveReject] = useState<any>(null);
  const [remarks, setRemarks] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const fetchPayments = async () => {
    const token = getSessionToken();
    try {
      const response = await fetch(getApiUrl("admin/payments.php"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setPayments(res || []);
      } else {
        toast.error("Failed to load payments.");
      }
    } catch {
      toast.error("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleVerify = async (id: string) => {
    const token = getSessionToken();
    try {
      const response = await fetch(getApiUrl("admin/payments-status.php"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
          status: "Verified",
          remarks: "Payment matches requirements. Verified.",
        }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Payment verified successfully!");
        fetchPayments();
      } else {
        toast.error(res.error || "Failed to verify payment");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const handleRejectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReject) return;

    setRejectLoading(true);
    const token = getSessionToken();
    try {
      const response = await fetch(getApiUrl("admin/payments-status.php"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: activeReject.id,
          status: "Rejected",
          remarks: remarks || "Payment proof rejected by admin.",
        }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Payment proof rejected.");
        setActiveReject(null);
        setRemarks("");
        fetchPayments();
      } else {
        toast.error(res.error || "Failed to reject payment");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setRejectLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-up">
        <div>
          <h1 className="font-serif-display text-3xl text-emerald-deep font-semibold">
            Payment Verification
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Review student transaction screenshots, Wise transfers, and UPI proofs.
          </p>
        </div>

        {/* PAYMENTS TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep"></div>
            </div>
          ) : payments.length === 0 ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center">
              <FolderOpen className="w-12 h-12 mb-3 stroke-1" />
              <h3 className="font-serif-display text-lg font-bold text-slate-700">
                No transactions recorded
              </h3>
              <p className="text-xs mt-1">
                Transactions will appear here when students submit application forms with proof.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Applicant / App ID</th>
                    <th className="px-6 py-4">Proof Screenshot</th>
                    <th className="px-6 py-4">Upload Date</th>
                    <th className="px-6 py-4">Remarks</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {payments.map((pay) => (
                    <tr key={pay.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        <div className="font-medium">{pay.applicantName}</div>
                        <div className="text-[0.65rem] text-slate-400 font-mono font-normal mt-0.5">
                          {pay.applicationId}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {pay.paymentProofScreenshot ? (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setActiveImage(pay.paymentProofScreenshot)}
                              className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-200 shadow-sm shrink-0 group hover:border-emerald/40 transition-colors"
                            >
                              <img
                                src={resolveImageUrl(pay.paymentProofScreenshot)}
                                alt="Proof Thumbnail"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='%23f1f5f9'%3E%3Crect width='100' height='100'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.35em' fill='%2394a3b8' font-size='10' font-family='sans-serif'%3ENo image%3C/text%3E%3C/svg%3E";
                                }}
                              />
                              <div className="absolute inset-0 bg-[#08120d]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Eye className="w-3.5 h-3.5" />
                              </div>
                            </button>
                            <span className="text-[0.65rem] text-slate-400 font-medium">
                              Screenshot
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-slate-400 font-medium">
                            <FileImage className="w-5 h-5 stroke-1" />
                            <span>None Uploaded</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(pay.uploadDate).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate" title={pay.remarks}>
                        {pay.remarks ? (
                          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                            <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{pay.remarks}</span>
                          </div>
                        ) : (
                          <span className="text-slate-300 italic">No notes added.</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider ${
                            pay.status === "Verified"
                              ? "bg-emerald-100 text-emerald-800"
                              : pay.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {pay.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleVerify(pay.id)}
                            className="p-2 bg-emerald-50 hover:bg-emerald-deep text-emerald-800 hover:text-white rounded-lg transition-all border border-emerald-100/50"
                            title="Approve & Verify"
                            disabled={pay.status === "Verified"}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setActiveReject(pay);
                              setRemarks(pay.remarks || "");
                            }}
                            className="p-2 bg-red-50 hover:bg-red-600 text-red-800 hover:text-white rounded-lg transition-all border border-red-100/50"
                            title="Reject Proof"
                            disabled={pay.status === "Rejected"}
                          >
                            <XIcon className="w-4 h-4" />
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
      </div>

      {/* LIGHTBOX MODAL */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 bg-[#08120d]/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#08120d]/80 border border-white/10 text-white hover:text-gold transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
            <img
              src={resolveImageUrl(activeImage)}
              alt="Payment Proof Full Size"
              className="rounded-2xl shadow-luxury max-w-full max-h-[85vh] object-contain border border-white/5 bg-[#0c1c14]"
            />
          </div>
        </div>
      )}

      {/* REJECT WITH REMARKS MODAL */}
      {activeReject && (
        <div className="fixed inset-0 z-50 bg-[#08120d]/60 backdrop-blur-sm flex items-center justify-center px-4 animate-fade-in">
          <div className="bg-white rounded-2xl border border-slate-100 max-w-md w-full p-6 shadow-luxury relative">
            <button
              onClick={() => setActiveReject(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>

            <h3 className="font-serif-display text-lg text-emerald-deep font-bold mb-2 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-red-600" /> Reject Payment Proof
            </h3>
            <p className="text-slate-400 text-xs mb-4">
              Please state why this proof is invalid (e.g. amount mismatch, duplicate upload).
              Remarks will help clarify the rejection.
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[0.65rem] tracking-[0.2em] uppercase text-slate-400 font-bold block mb-1">
                  Rejection Remarks
                </label>
                <textarea
                  required
                  rows={4}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="e.g. Transaction reference is blurry. Please upload a clear receipt showing account number..."
                  className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald focus:outline-none rounded-xl p-3 text-slate-700 text-xs transition-all resize-none"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setActiveReject(null)}
                  className="px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rejectLoading}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors disabled:opacity-50"
                >
                  {rejectLoading ? "Rejecting..." : "Reject Proof"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
