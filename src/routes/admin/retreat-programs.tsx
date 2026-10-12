import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";
import {
  Sparkles,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowUpDown,
  Search,
  X,
  Save,
} from "lucide-react";

export const Route = createFileRoute("/admin/retreat-programs")({
  component: RetreatProgramsPage,
  head: () => ({
    meta: [{ title: "Retreat Programs Management — Admin" }],
  }),
});

interface RetreatProgram {
  id: string;
  name: string;
  description: string;
  duration: string;
  is_active: number;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

function RetreatProgramsPage() {
  const [programs, setPrograms] = useState<RetreatProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState<string>("all");

  // Modal State for Add / Edit
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<RetreatProgram | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    description: "",
    sort_order: 0,
    is_active: 1,
  });
  const [saving, setSaving] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<RetreatProgram | null>(null);
  const [deleting, setDeleting] = useState(false);

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const fetchPrograms = useCallback(async () => {
    const token = getSessionToken();
    try {
      setLoading(true);
      const res = await fetch(getApiUrl("admin/retreat-programs.php"), {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPrograms(Array.isArray(data) ? data : []);
      } else {
        toast.error("Failed to load retreat programs.");
      }
    } catch {
      toast.error("Network error loading retreat programs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  const handleOpenAdd = () => {
    setEditingProgram(null);
    setFormData({
      name: "",
      duration: "Flexible",
      description: "",
      sort_order: programs.length + 1,
      is_active: 1,
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (p: RetreatProgram) => {
    setEditingProgram(p);
    setFormData({
      name: p.name,
      duration: p.duration,
      description: p.description,
      sort_order: p.sort_order,
      is_active: p.is_active,
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error("Program name is required.");
      return;
    }

    const token = getSessionToken();
    setSaving(true);
    try {
      const isEdit = !!editingProgram;
      const res = await fetch(getApiUrl("admin/retreat-programs.php"), {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          isEdit
            ? { id: editingProgram.id, ...formData }
            : formData
        ),
      });

      const result = await res.json();
      if (res.ok && result.success) {
        toast.success(isEdit ? "Program updated successfully." : "New retreat program created.");
        setModalOpen(false);
        fetchPrograms();
      } else {
        toast.error(result.error || "Failed to save program.");
      }
    } catch {
      toast.error("Network error while saving program.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (p: RetreatProgram) => {
    const token = getSessionToken();
    try {
      const newActive = p.is_active ? 0 : 1;
      const res = await fetch(getApiUrl("admin/retreat-programs.php"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: p.id,
          name: p.name,
          duration: p.duration,
          description: p.description,
          sort_order: p.sort_order,
          is_active: newActive,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(newActive ? "Program activated." : "Program deactivated.");
        fetchPrograms();
      } else {
        toast.error(data.error || "Failed to update status.");
      }
    } catch {
      toast.error("Network error.");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const token = getSessionToken();
    setDeleting(true);
    try {
      const res = await fetch(getApiUrl("admin/retreat-programs.php"), {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: deleteTarget.id }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success(data.message || "Program deleted.");
        setDeleteTarget(null);
        fetchPrograms();
      } else {
        toast.error(data.error || "Failed to delete program.");
      }
    } catch {
      toast.error("Network error deleting program.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredPrograms = programs.filter((p) => {
    const matchesSearch =
      searchTerm === "" ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.duration.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive =
      filterActive === "all" ||
      (filterActive === "active" && p.is_active === 1) ||
      (filterActive === "inactive" && p.is_active === 0);
    return matchesSearch && matchesActive;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald-deep" />
            <h1 className="text-2xl font-serif text-[#0c1c14] font-bold">
              Retreat Programs Management
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Configure courses and retreat offerings shown dynamically in the application form dropdown.
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-deep text-cream hover:bg-[#0c1c14] transition-all font-medium text-xs tracking-wider uppercase shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Program</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search programs..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-deep/20 focus:border-emerald-deep"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status:</span>
          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="px-3 py-2 text-sm rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-deep/20"
          >
            <option value="all">All Programs ({programs.length})</option>
            <option value="active">Active Only ({programs.filter((p) => p.is_active === 1).length})</option>
            <option value="inactive">Inactive Only ({programs.filter((p) => p.is_active === 0).length})</option>
          </select>
        </div>
      </div>

      {/* Program List Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep mx-auto mb-3"></div>
            Loading retreat programs...
          </div>
        ) : filteredPrograms.length === 0 ? (
          <div className="p-12 text-center text-slate-400">
            <Sparkles className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium">No retreat programs found.</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search or add a new program.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4 font-semibold">Order</th>
                  <th className="py-3.5 px-4 font-semibold">Program Name</th>
                  <th className="py-3.5 px-4 font-semibold">Duration</th>
                  <th className="py-3.5 px-4 font-semibold">Description</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPrograms.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-mono text-xs text-slate-400">
                      #{p.sort_order}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-900">
                      <div>{p.name}</div>
                      <div className="font-mono text-[10px] text-slate-400">{p.id}</div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                        <Clock className="w-3 h-3" />
                        {p.duration || "Flexible"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-500 max-w-xs truncate">
                      {p.description || "—"}
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => handleToggleActive(p)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                          p.is_active === 1
                            ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                        }`}
                        title="Click to toggle status"
                      >
                        {p.is_active === 1 ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Active</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5 text-slate-400" />
                            <span>Inactive</span>
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
                          title="Edit Program"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(p)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Program"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* ADD / EDIT MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <h2 className="text-lg font-serif font-bold text-slate-900">
                {editingProgram ? "Edit Retreat Program" : "Add New Retreat Program"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Program Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. 7 Days & 14 Days Holistic Wellness Retreat"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-deep/20 focus:border-emerald-deep"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g. 7 or 14 Days, Flexible"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-deep/20 focus:border-emerald-deep"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Display Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-deep/20 focus:border-emerald-deep"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Description (Optional)
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of what this retreat encompasses..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-deep/20 focus:border-emerald-deep resize-none"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="prog_active"
                  checked={formData.is_active === 1}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                  className="w-4 h-4 text-emerald-deep rounded border-slate-300 focus:ring-emerald-deep"
                />
                <label htmlFor="prog_active" className="text-sm text-slate-700 font-medium">
                  Active (visible in public application dropdown)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-deep text-cream hover:bg-[#0c1c14] transition-all font-semibold text-xs tracking-wider uppercase shadow-sm disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{saving ? "Saving..." : editingProgram ? "Update Program" : "Create Program"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
              Confirm Program Deletion
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              Are you sure you want to delete <span className="font-semibold text-slate-900">"{deleteTarget.name}"</span>?
            </p>
            <p className="text-xs text-slate-500 bg-amber-50 p-3 rounded-xl border border-amber-200/60 mb-5">
              Note: If any submitted applications already reference this retreat program, it will be automatically deactivated instead of permanently deleted to preserve historical application records.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition-colors text-xs font-semibold uppercase tracking-wider disabled:opacity-50"
              >
                {deleting ? "Processing..." : "Delete Program"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
