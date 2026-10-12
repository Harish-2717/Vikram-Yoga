import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";
import {
  Search,
  Download,
  Trash2,
  Eye,
  RefreshCw,
  Filter,
  ChevronDown,
  X as XIcon,
  CheckCircle2,
  Clock,
  AlertCircle,
  PhoneCall,
  XCircle,
  Hotel,
  StickyNote,
  UserCheck,
} from "lucide-react";

export const Route = createFileRoute("/admin/retreat-applications")({
  component: RetreatApplicationsPage,
});

const STATUS_COLORS: Record<string, string> = {
  New: "bg-blue-100 text-blue-800",
  "Under Review": "bg-amber-100 text-amber-800",
  Contacted: "bg-purple-100 text-purple-800",
  Confirmed: "bg-emerald-100 text-emerald-800",
  Rejected: "bg-red-100 text-red-800",
};

const STATUS_OPTIONS = ["New", "Under Review", "Contacted", "Confirmed", "Rejected"];

const STATUS_ICONS: Record<string, React.ComponentType<any>> = {
  New: Clock,
  "Under Review": AlertCircle,
  Contacted: PhoneCall,
  Confirmed: CheckCircle2,
  Rejected: XCircle,
};

function getSessionToken() {
  if (typeof document === "undefined") return undefined;
  return document.cookie
    .split("; ")
    .find((r) => r.startsWith("session_token="))
    ?.split("=")[1];
}

function DetailRow({ label, value }: { label: string; value?: any }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className="flex flex-col sm:flex-row sm:gap-3 py-2 border-b border-slate-100 last:border-0">
      <span className="text-[0.72rem] font-bold text-slate-400 uppercase tracking-wider sm:w-48 shrink-0">{label}</span>
      <span className="text-sm text-slate-700 mt-0.5 sm:mt-0">{String(value)}</span>
    </div>
  );
}

function RetreatApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterAccommodation, setFilterAccommodation] = useState("All");
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchApps = useCallback(async () => {
    const token = getSessionToken();
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (filterStatus !== "All") params.set("status", filterStatus);
      if (filterAccommodation !== "All") params.set("accommodation", filterAccommodation === "Yes" ? "yes" : "no");
      const res = await fetch(getApiUrl(`admin/retreat-applications.php?${params}`), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setApps(data || []);
      } else {
        toast.error("Failed to load retreat applications.");
      }
    } catch {
      toast.error("Network error loading applications.");
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus, filterAccommodation]);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  useEffect(() => {
    let result = [...apps];
    setFiltered(result);
  }, [apps]);

  const updateStatus = async (id: string, newStatus: string) => {
    const token = getSessionToken();
    setUpdatingStatus(true);
    try {
      const res = await fetch(getApiUrl("admin/retreat-applications.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Status updated.");
        setApps((prev) => prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)));
        if (selectedApp?.id === id) setSelectedApp((prev: any) => ({ ...prev, status: newStatus }));
      } else {
        toast.error(data.error || "Failed to update status.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const saveNotes = async () => {
    if (!selectedApp) return;
    const token = getSessionToken();
    setSavingNotes(true);
    try {
      const res = await fetch(getApiUrl("admin/retreat-applications.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: selectedApp.id, admin_notes: notesValue }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Notes saved.");
        setApps((prev) => prev.map((a) => (a.id === selectedApp.id ? { ...a, admin_notes: notesValue } : a)));
        setSelectedApp((prev: any) => ({ ...prev, admin_notes: notesValue }));
        setEditingNotes(false);
      } else {
        toast.error(data.error || "Failed to save notes.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setSavingNotes(false);
    }
  };

  const deleteApp = async (id: string) => {
    const token = getSessionToken();
    try {
      const res = await fetch(getApiUrl("admin/retreat-applications-delete.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Application deleted.");
        setApps((prev) => prev.filter((a) => a.id !== id));
        if (selectedApp?.id === id) setSelectedApp(null);
      } else {
        toast.error(data.error || "Failed to delete.");
      }
    } catch {
      toast.error("Network error.");
    } finally {
      setDeleteConfirm(null);
    }
  };

  const exportCSV = () => {
    const headers = [
      "ID", "Program", "First Name", "Surname", "Email", "Phone", "Age", "Gender",
      "Accommodation", "Accommodation Pref", "Check-in", "Check-out", "Nights",
      "Practised Yoga", "Yoga Duration", "Yoga Styles",
      "Health Conditions", "Health Details", "Dietary", "Dietary Other",
      "Expectations", "Special Requests", "Referral", "Status", "Submitted"
    ];
    const rows = filtered.map((a) => [
      a.id, a.program_name, a.first_name, a.surname, a.email, a.phone, a.age, a.gender,
      a.requires_accommodation ? "Yes" : "No", a.accommodation_preference, a.checkin_date, a.checkout_date, a.num_nights,
      a.practised_yoga_before ? "Yes" : "No", a.yoga_duration, a.yoga_styles,
      a.has_health_conditions ? "Yes" : "No", a.health_details, a.dietary_requirements, a.dietary_other,
      a.expectations, a.special_requests, a.referral_source, a.status,
      new Date(a.created_at).toLocaleDateString("en-IN")
    ].map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`));

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `retreat-applications-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif-display text-3xl text-emerald-deep font-semibold">
            Retreat Applications
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage all yoga & wellness retreat applications.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchApps}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-emerald/40 text-slate-500 hover:text-emerald-deep transition-all"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-deep text-cream text-xs font-semibold rounded-xl hover:bg-emerald transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-slate-100 p-4 flex flex-col sm:flex-row gap-3 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or application ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/20 focus:border-emerald/50 transition-all"
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald/20 bg-white min-w-[140px]"
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          value={filterAccommodation}
          onChange={(e) => setFilterAccommodation(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald/20 bg-white min-w-[160px]"
        >
          <option value="All">All Accommodation</option>
          <option value="Yes">Requires Accommodation</option>
          <option value="No">No Accommodation</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-700">
            {filtered.length} application{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center py-16 text-slate-400">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" /> Loading…
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <UserCheck className="w-10 h-10 mb-2 stroke-1" />
              <p className="text-sm">No retreat applications found.</p>
            </div>
          ) : (
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="px-5 py-3.5">Applicant</th>
                  <th className="px-5 py-3.5">Program</th>
                  <th className="px-5 py-3.5">Contact</th>
                  <th className="px-5 py-3.5">Accommodation</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5">Submitted</th>
                  <th className="px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {filtered.map((app) => {
                  const StatusIcon = STATUS_ICONS[app.status] || Clock;
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-semibold text-slate-800">
                          {app.first_name} {app.surname}
                        </div>
                        <div className="text-slate-400 text-[0.68rem] font-mono mt-0.5">{app.id}</div>
                      </td>
                      <td className="px-5 py-4 max-w-[160px]">
                        <div className="truncate text-slate-700">{app.program_name}</div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-slate-700">{app.email}</div>
                        <div className="text-slate-400 mt-0.5">{app.phone}</div>
                      </td>
                      <td className="px-5 py-4">
                        {app.requires_accommodation ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[0.65rem] font-bold">
                            <Hotel className="w-2.5 h-2.5" /> {app.accommodation_preference || "Yes"}
                          </span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.6rem] font-bold uppercase ${STATUS_COLORS[app.status] || "bg-slate-100 text-slate-600"}`}>
                          <StatusIcon className="w-2.5 h-2.5" /> {app.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-400 whitespace-nowrap">
                        {new Date(app.created_at).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => { setSelectedApp(app); setNotesValue(app.admin_notes || ""); setEditingNotes(false); }}
                            className="p-1.5 rounded-lg hover:bg-emerald-50 text-emerald hover:text-emerald-deep transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(app.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                            title="Delete Application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ── Details Modal ── */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/40 backdrop-blur-sm" onClick={() => setSelectedApp(null)}>
          <div
            className="w-full max-w-2xl h-full bg-white overflow-y-auto shadow-2xl animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#0c1c14] text-cream px-6 py-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.65rem] text-gold/70 tracking-widest uppercase font-bold mb-1">Retreat Application</p>
                <h2 className="font-serif-display text-xl font-bold">
                  {selectedApp.first_name} {selectedApp.surname}
                </h2>
                <p className="text-cream/50 text-xs font-mono mt-0.5">{selectedApp.id}</p>
              </div>
              <button onClick={() => setSelectedApp(null)} className="p-2 rounded-xl hover:bg-white/10 transition-colors mt-1">
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Status Bar */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-slate-500 mr-1">Status:</span>
              {STATUS_OPTIONS.map((s) => (
                <button
                  key={s}
                  disabled={updatingStatus}
                  onClick={() => updateStatus(selectedApp.id, s)}
                  className={`px-3 py-1.5 rounded-full text-[0.65rem] font-bold uppercase transition-all border ${
                    selectedApp.status === s
                      ? `${STATUS_COLORS[s]} border-transparent scale-105 shadow-sm`
                      : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-6">
              {/* Program */}
              <section>
                <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">Program</h3>
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
                  <p className="font-semibold text-emerald-deep">{selectedApp.program_name}</p>
                </div>
              </section>

              {/* Section 1: Personal */}
              <section>
                <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">1. Personal Information</h3>
                <div className="space-y-0.5">
                  <DetailRow label="Full Name" value={`${selectedApp.first_name} ${selectedApp.surname}`} />
                  <DetailRow label="Email" value={selectedApp.email} />
                  <DetailRow label="Phone / WhatsApp" value={selectedApp.phone} />
                  <DetailRow label="Age" value={selectedApp.age} />
                  <DetailRow label="Gender" value={selectedApp.gender} />
                </div>
              </section>

              {/* Section 2: Accommodation */}
              <section>
                <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">2. Accommodation</h3>
                <div className="space-y-0.5">
                  <DetailRow label="Requires Accommodation" value={selectedApp.requires_accommodation ? "Yes" : "No"} />
                  {selectedApp.requires_accommodation ? (
                    <>
                      <DetailRow label="Preference" value={selectedApp.accommodation_preference} />
                      <DetailRow label="Check-in Date" value={selectedApp.checkin_date} />
                      <DetailRow label="Check-out Date" value={selectedApp.checkout_date} />
                      <DetailRow label="Number of Nights" value={selectedApp.num_nights} />
                    </>
                  ) : null}
                </div>
              </section>

              {/* Section 3: Yoga Experience */}
              <section>
                <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">3. Yoga & Wellness Experience</h3>
                <div className="space-y-0.5">
                  <DetailRow label="Practised Yoga Before" value={selectedApp.practised_yoga_before ? "Yes" : "No"} />
                  <DetailRow label="Duration of Practice" value={selectedApp.yoga_duration} />
                  <DetailRow label="Yoga Styles Practised" value={selectedApp.yoga_styles} />
                </div>
              </section>

              {/* Section 4: Health */}
              <section>
                <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">4. Health Information</h3>
                <div className="space-y-0.5">
                  <DetailRow label="Health Conditions" value={selectedApp.has_health_conditions ? "Yes" : "No"} />
                  <DetailRow label="Health Details" value={selectedApp.health_details} />
                  <DetailRow label="Dietary Requirements" value={selectedApp.dietary_requirements} />
                  <DetailRow label="Dietary (Other)" value={selectedApp.dietary_other} />
                  <DetailRow label="Dietary Details" value={selectedApp.dietary_details} />
                </div>
              </section>

              {/* Section 5: Expectations */}
              <section>
                <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">5. Expectations</h3>
                <div className="space-y-0.5">
                  <DetailRow label="Goals & Expectations" value={selectedApp.expectations} />
                  <DetailRow label="Special Requests" value={selectedApp.special_requests} />
                </div>
              </section>

              {/* Section 6: Referral */}
              <section>
                <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">6. Referral</h3>
                <div className="space-y-0.5">
                  <DetailRow label="Heard About Us" value={selectedApp.referral_source} />
                  <DetailRow label="Referral (Other)" value={selectedApp.referral_other} />
                </div>
              </section>

              {/* Section 7: Declaration */}
              <section>
                <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider mb-3">7. Declaration</h3>
                <div className="space-y-0.5">
                  <DetailRow label="Declaration Agreed" value={selectedApp.declaration_agreed ? "✓ Yes" : "✗ No"} />
                  <DetailRow label="Submitted At" value={new Date(selectedApp.created_at).toLocaleString("en-IN")} />
                </div>
              </section>

              {/* Admin Notes */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[0.65rem] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <StickyNote className="w-3.5 h-3.5" /> Admin Notes
                  </h3>
                  {!editingNotes && (
                    <button
                      onClick={() => { setEditingNotes(true); setNotesValue(selectedApp.admin_notes || ""); }}
                      className="text-[0.65rem] font-semibold text-emerald hover:text-emerald-deep uppercase tracking-wider"
                    >
                      {selectedApp.admin_notes ? "Edit" : "Add Notes"}
                    </button>
                  )}
                </div>
                {editingNotes ? (
                  <div className="space-y-2">
                    <textarea
                      rows={4}
                      value={notesValue}
                      onChange={(e) => setNotesValue(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald/20 resize-none"
                      placeholder="Add internal notes about this application…"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={saveNotes}
                        disabled={savingNotes}
                        className="px-4 py-2 bg-emerald-deep text-cream text-xs font-semibold rounded-xl hover:bg-emerald transition-colors disabled:opacity-50"
                      >
                        {savingNotes ? "Saving…" : "Save Notes"}
                      </button>
                      <button
                        onClick={() => setEditingNotes(false)}
                        className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-semibold rounded-xl hover:bg-slate-200 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-slate-700 min-h-[60px]">
                    {selectedApp.admin_notes || <span className="text-slate-400 italic">No notes added yet.</span>}
                  </div>
                )}
              </section>

              {/* Danger Zone */}
              <section className="border-t border-slate-200 pt-5">
                <button
                  onClick={() => setDeleteConfirm(selectedApp.id)}
                  className="flex items-center gap-2 text-xs text-red-500 hover:text-red-700 font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete This Application
                </button>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-7 text-center">
            <Trash2 className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="font-serif-display text-lg text-slate-800 font-bold mb-2">Delete Application?</h3>
            <p className="text-slate-500 text-sm mb-6">This action is permanent and cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteApp(deleteConfirm)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
