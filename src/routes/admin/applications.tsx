import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Search,
  Filter,
  Download,
  Trash2,
  Eye,
  Check,
  X as XIcon,
  RefreshCw,
  FolderOpen,
  Calendar,
  Layers,
  Heart,
  ChevronDown,
} from "lucide-react";

export const Route = createFileRoute("/admin/applications")({
  component: ApplicationsPage,
});

function ApplicationsPage() {
  const [apps, setApps] = useState<any[]>([]);
  const [filteredApps, setFilteredApps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Selected Application for Details Modal
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const fetchApps = async () => {
    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/applications", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setApps(res || []);
      } else {
        toast.error("Failed to load applications.");
      }
    } catch {
      toast.error("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApps();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...apps];

    if (searchTerm) {
      const query = searchTerm.toLowerCase();
      result = result.filter(
        (app) =>
          app.name.toLowerCase().includes(query) ||
          app.email.toLowerCase().includes(query) ||
          app.address.toLowerCase().includes(query),
      );
    }

    if (filterCourse !== "All") {
      result = result.filter((app) => app.course === filterCourse);
    }

    if (filterStatus !== "All") {
      result = result.filter((app) => app.status === filterStatus);
    }

    setFilteredApps(result);
  }, [apps, searchTerm, filterCourse, filterStatus]);

  const handleStatusUpdate = async (id: string, newStatus: "Pending" | "Verified" | "Rejected") => {
    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/applications/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success(`Application status updated to ${newStatus}`);
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({ ...selectedApp, status: newStatus });
        }
        fetchApps();
      } else {
        toast.error(res.error || "Failed to update status");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this application? All linked payment information will also be deleted.",
      )
    ) {
      return;
    }

    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/applications/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Application deleted successfully.");
        setSelectedApp(null);
        fetchApps();
      } else {
        toast.error(res.error || "Failed to delete.");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  const handleCSVExport = () => {
    if (filteredApps.length === 0) {
      toast.error("No data available to export.");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Email",
      "Course",
      "Minor Option",
      "Date of Course",
      "Gender",
      "DOB",
      "Accommodation",
      "Address",
      "Practised Yoga Before",
      "Practice Details",
      "Why Teacher Training",
      "Meaning of Yoga",
      "Injuries/Conditions",
      "Additional Info",
      "Status",
      "Submission Date",
    ];

    const rows = filteredApps.map((app) => [
      app.id,
      app.name,
      app.email,
      app.course,
      app.minorOption,
      app.dateOfCourse,
      app.gender,
      app.dob || "N/A",
      app.accommodation || "N/A",
      app.address || "N/A",
      app.practisedYoga || "N/A",
      app.howLong || "N/A",
      app.whyTeacherTraining || "N/A",
      app.meaningOfYoga || "N/A",
      app.injuries || "N/A",
      app.additionalInfo || "N/A",
      app.status,
      new Date(app.created_at).toLocaleDateString(),
    ]);

    const csvContent =
      "\uFEFF" +
      [
        headers.join(","),
        ...rows.map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")),
      ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `dr_vikram_applications_${new Date().toISOString().slice(0, 10)}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file exported successfully!");
  };

  const courses = [
    "Yoga Classes",
    "Wellness Therapies",
    "Retreat Programs",
    "Certification Courses",
  ];

  return (
    <>
      <div className="space-y-8 animate-fade-up">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif-display text-3xl text-emerald-deep font-semibold">
              Applications
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Review student admissions, health backgrounds, and course signups.
            </p>
          </div>
          <button
            onClick={handleCSVExport}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-700 hover:text-emerald hover:border-emerald/40 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all shadow-[0_4px_15px_rgba(0,0,0,0.01)]"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* FILTER PANEL */}
        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email..."
              className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald focus:outline-none rounded-xl py-2 pl-10 pr-4 text-slate-700 text-xs transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs font-medium shrink-0">Course:</span>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 focus:outline-none focus:border-emerald rounded-xl py-2 px-3 text-slate-600 text-xs"
            >
              <option value="All">All Courses</option>
              {courses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-xs font-medium shrink-0">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-slate-50/50 border border-slate-200 focus:outline-none focus:border-emerald rounded-xl py-2 px-3 text-slate-600 text-xs"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* APPLICATIONS TABLE */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep"></div>
            </div>
          ) : filteredApps.length === 0 ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center">
              <FolderOpen className="w-12 h-12 mb-3 stroke-1" />
              <h3 className="font-serif-display text-lg font-bold text-slate-700">
                No applications found
              </h3>
              <p className="text-xs mt-1">Try resetting your filters or check back later.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Selected Category</th>
                    <th className="px-6 py-4">Start Date</th>
                    <th className="px-6 py-4">Submitted</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        <div className="font-medium">{app.name}</div>
                        <div className="text-[0.65rem] text-slate-400 font-normal mt-0.5">
                          {app.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium max-w-[200px] truncate">
                        <div>{app.course}</div>
                        <div className="text-[0.65rem] text-slate-400 font-normal mt-0.5">
                          {app.minorOption}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{app.dateOfCourse}</td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(app.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider ${
                            app.status === "Verified"
                              ? "bg-emerald-100 text-emerald-800"
                              : app.status === "Rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald hover:bg-slate-50 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(app.id, "Verified")}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald hover:bg-emerald-50 transition-colors"
                            title="Verify Application"
                            disabled={app.status === "Verified"}
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(app.id, "Rejected")}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Reject Application"
                            disabled={app.status === "Rejected"}
                          >
                            <XIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(app.id)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Record"
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
      </div>

      {/* DETAILS MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-[#08120d]/60 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-luxury relative">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif-display text-xl text-emerald-deep font-bold">
                  Application Details
                </h3>
                <span className="text-[0.65rem] text-slate-400 font-semibold uppercase tracking-wider mt-1 block">
                  ID: {selectedApp.id}
                </span>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 overflow-y-auto space-y-6 text-slate-600 text-xs">
              {/* Profile Card Summary */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                    Full Name
                  </span>
                  <span className="font-bold text-slate-800 text-[0.85rem]">
                    {selectedApp.name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                    Gender / DOB
                  </span>
                  <span className="font-semibold text-slate-700">
                    {selectedApp.gender || "Unspecified"} / {selectedApp.dob || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                    Accommodation
                  </span>
                  <span className="font-semibold text-slate-700">
                    {selectedApp.accommodation || "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                    Status
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 mt-0.5 rounded-full text-[0.55rem] font-bold uppercase tracking-wider ${
                      selectedApp.status === "Verified"
                        ? "bg-emerald-100 text-emerald-800"
                        : selectedApp.status === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {selectedApp.status}
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="space-y-3">
                <h4 className="font-serif-display text-emerald-deep font-bold border-b border-slate-100 pb-1.5 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald" /> Program & Timing
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">
                      Selected Category
                    </span>
                    <span className="font-medium text-slate-700">{selectedApp.course}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">
                      Selected Course
                    </span>
                    <span className="font-medium text-slate-700">{selectedApp.minorOption}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">Selected Date</span>
                    <span className="font-medium text-slate-700">{selectedApp.dateOfCourse}</span>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <h4 className="font-serif-display text-emerald-deep font-bold border-b border-slate-100 pb-1.5">
                  Contact Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">Email Address</span>
                    <a
                      href={`mailto:${selectedApp.email}`}
                      className="font-medium text-emerald hover:underline"
                    >
                      {selectedApp.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block mb-0.5">
                      Postal Address
                    </span>
                    <span className="font-medium text-slate-700 whitespace-pre-wrap">
                      {selectedApp.address || "No address provided."}
                    </span>
                  </div>
                </div>
              </div>

              {/* Yoga Background */}
              <div className="space-y-3">
                <h4 className="font-serif-display text-emerald-deep font-bold border-b border-slate-100 pb-1.5 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-emerald" /> Yoga Experience & Motivation
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">
                      Has practiced yoga before?
                    </span>
                    <span className="font-medium text-slate-700">
                      {selectedApp.practisedYoga || "Unspecified"}
                    </span>
                  </div>
                  {selectedApp.howLong && (
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">
                        Practice Duration & Style Details
                      </span>
                      <p className="font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                        {selectedApp.howLong}
                      </p>
                    </div>
                  )}
                  {selectedApp.whyTeacherTraining && (
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">
                        Why do you want to complete teacher training?
                      </span>
                      <p className="font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                        {selectedApp.whyTeacherTraining}
                      </p>
                    </div>
                  )}
                  {selectedApp.meaningOfYoga && (
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">
                        What does yoga mean to you?
                      </span>
                      <p className="font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                        {selectedApp.meaningOfYoga}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Medical Conditions */}
              <div className="space-y-3">
                <h4 className="font-serif-display text-emerald-deep font-bold border-b border-slate-100 pb-1.5">
                  Medical History & Queries
                </h4>
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-400 font-semibold block mb-1">
                      Declared injuries or medical conditions:
                    </span>
                    <p className="font-medium text-slate-700 bg-red-50/50 p-3 rounded-lg border border-red-100/50 leading-relaxed">
                      {selectedApp.injuries || "No medical injuries or conditions declared."}
                    </p>
                  </div>
                  {selectedApp.additionalInfo && (
                    <div>
                      <span className="text-slate-400 font-semibold block mb-1">
                        Additional queries or remarks:
                      </span>
                      <p className="font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed">
                        {selectedApp.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedApp.id)}
                className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider font-semibold text-[0.65rem]"
              >
                <Trash2 className="w-4 h-4" /> Delete Record
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate(selectedApp.id, "Rejected")}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-semibold tracking-wider uppercase transition-colors"
                  disabled={selectedApp.status === "Rejected"}
                >
                  Reject
                </button>
                <button
                  onClick={() => handleStatusUpdate(selectedApp.id, "Verified")}
                  className="px-4 py-2 bg-emerald-deep hover:bg-[#0c2a21] text-white rounded-lg font-semibold tracking-wider uppercase transition-colors"
                  disabled={selectedApp.status === "Verified"}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
