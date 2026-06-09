import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileSpreadsheet, Clock, CreditCard, Mail, ArrowRight, Layers, Inbox } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
});

function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const loadData = async () => {
    const token = getSessionToken();
    try {
      const response = await fetch("/api/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setData(res);
      } else {
        console.error("Dashboard loading failed");
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep"></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-slate-500">Failed to retrieve dashboard metrics.</div>
    );
  }

  const { stats, recentApps, recentMessages } = data;

  const cards = [
    {
      title: "Total Applications",
      value: stats.totalApps,
      icon: FileSpreadsheet,
      bg: "bg-blue-500/10",
      color: "text-blue-600",
      desc: "Course registrations",
    },
    {
      title: "Pending Applications",
      value: stats.pendingApps,
      icon: Clock,
      bg: "bg-amber-500/10",
      color: "text-amber-600",
      desc: "Requires verification",
    },
    {
      title: "Verified Payments",
      value: stats.verifiedPayments,
      icon: CreditCard,
      bg: "bg-emerald-500/10",
      color: "text-emerald-600",
      desc: "Confirmed transactions",
    },
    {
      title: "Contact Messages",
      value: stats.totalMessages,
      icon: Mail,
      bg: "bg-purple-500/10",
      color: "text-purple-600",
      desc: `${stats.pendingMessages} awaiting replies`,
    },
  ];

  return (
    <div className="space-y-8 animate-fade-up">
      <div>
        <h1 className="font-serif-display text-3xl text-emerald-deep font-semibold">
          Overview Dashboard
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Real-time metrics, recent submissions, and quick action logs.
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex items-center justify-between group hover:shadow-soft transition-all duration-300"
            >
              <div>
                <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">
                  {card.title}
                </span>
                <span className="text-3xl font-semibold text-slate-800 mt-2 block">
                  {card.value}
                </span>
                <span className="text-slate-400 text-[0.7rem] font-medium block mt-1">
                  {card.desc}
                </span>
              </div>
              <div
                className={`w-12 h-12 rounded-2xl ${card.bg} ${card.color} flex items-center justify-center transition-transform group-hover:scale-105`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* RECENT APPLICATIONS */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-serif-display text-lg text-emerald-deep font-bold">
              Recent Applications
            </h2>
            <Link
              to="/admin/applications"
              className="text-emerald text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:text-emerald-deep transition-colors"
            >
              All Applications <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {recentApps.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Layers className="w-10 h-10 mb-2 stroke-1" />
                <p className="text-sm">No applications submitted yet.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Applicant</th>
                    <th className="px-6 py-4">Course</th>
                    <th className="px-6 py-4">Start Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {recentApps.map((app: any) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[0.65rem] uppercase">
                          {app.name.substring(0, 2)}
                        </div>
                        {app.name}
                      </td>
                      <td className="px-6 py-4 max-w-[150px] truncate">{app.course}</td>
                      <td className="px-6 py-4 font-medium">{app.dateOfCourse}</td>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* RECENT CONTACT MESSAGES */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden flex flex-col">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-serif-display text-lg text-emerald-deep font-bold">
              Recent Contact Enquiries
            </h2>
            <Link
              to="/admin/contact-messages"
              className="text-emerald text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:text-emerald-deep transition-colors"
            >
              All Enquiries <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex-1 overflow-x-auto">
            {recentMessages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-slate-400">
                <Inbox className="w-10 h-10 mb-2 stroke-1" />
                <p className="text-sm">No enquiry messages received yet.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Interest</th>
                    <th className="px-6 py-4">Reply Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {recentMessages.map((msg: any) => (
                    <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-[0.65rem] uppercase">
                          {msg.name.substring(0, 2)}
                        </div>
                        {msg.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">{msg.email}</td>
                      <td className="px-6 py-4 font-medium">{msg.interest}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider ${
                            msg.status === "Replied"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {msg.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
