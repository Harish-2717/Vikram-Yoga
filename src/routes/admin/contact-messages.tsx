import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";
import {
  Mail,
  MailOpen,
  Send,
  Eye,
  Clock,
  Check,
  Trash2,
  X as XIcon,
  Phone,
  MessageSquare,
  HelpCircle,
  Inbox,
} from "lucide-react";

export const Route = createFileRoute("/admin/contact-messages")({
  component: ContactMessagesPage,
});

function ContactMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected message for details/reply modal
  const [selectedMsg, setSelectedMsg] = useState<any>(null);

  // Reply Form States
  const [subject, setSubject] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [sending, setSending] = useState(false);

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const fetchMessages = async () => {
    const token = getSessionToken();
    try {
      const response = await fetch(getApiUrl("admin/contact-messages.php"), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const res = await response.json();
        setMessages(res || []);
      } else {
        toast.error("Failed to load messages.");
      }
    } catch {
      toast.error("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleOpenMsg = (msg: any) => {
    setSelectedMsg(msg);
    setSubject(`RE: Enquiry regarding ${msg.interest} - Dr. Vikram Yoga & Wellness Centre`);
    setReplyBody("");
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMsg) return;

    setSending(true);
    const token = getSessionToken();
    try {
      const response = await fetch(getApiUrl("admin/contact-messages-reply.php"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: selectedMsg.id,
          replySubject: subject,
          replyBody: replyBody,
        }),
      });
      const res = await response.json();

      if (response.ok && res.success) {
        toast.success("Reply email sent successfully via SMTP!");
        // Refresh selected message to show reply history
        const updatedMsg = {
          ...selectedMsg,
          replyStatus: "Replied" as const,
          replies: [
            ...selectedMsg.replies,
            {
              id: "rep-" + Date.now(),
              message: replyBody,
              sent_at: new Date().toISOString(),
            },
          ],
        };
        setSelectedMsg(updatedMsg);
        setReplyBody("");
        fetchMessages();
      } else {
        toast.error(res.error || "Failed to send email. Please check SMTP settings.");
      }
    } catch (err) {
      toast.error("An error occurred while sending the email.");
    } finally {
      setSending(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this enquiry message?")) {
      return;
    }

    const token = getSessionToken();
    try {
      const response = await fetch(getApiUrl("admin/contact-messages-delete.php"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      const res = await response.json();
      if (response.ok && res.success) {
        toast.success("Enquiry message deleted successfully.");
        setSelectedMsg(null);
        fetchMessages();
      } else {
        toast.error(res.error || "Failed to delete message.");
      }
    } catch {
      toast.error("An error occurred.");
    }
  };

  return (
    <>
      <div className="space-y-8 animate-fade-up">
        <div>
          <h1 className="font-serif-display text-3xl text-emerald-deep font-semibold">
            Contact Messages
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage general enquiries, wellness consulting requests, and SMTP replies.
          </p>
        </div>

        {/* MESSAGES LIST */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_30px_rgba(0,0,0,0.01)] overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center h-48">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-deep"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center">
              <Inbox className="w-12 h-12 mb-3 stroke-1" />
              <h3 className="font-serif-display text-lg font-bold text-slate-700">
                No messages found
              </h3>
              <p className="text-xs mt-1">
                General enquiries submitted from the Contact Us page will be listed here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="px-6 py-4">Sender Info</th>
                    <th className="px-6 py-4">Interest Category</th>
                    <th className="px-6 py-4">Message Snippet</th>
                    <th className="px-6 py-4">Received At</th>
                    <th className="px-6 py-4">Reply Status</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  {messages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-50/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        <div className="font-medium">{msg.name}</div>
                        <div className="text-[0.65rem] text-slate-400 font-normal mt-0.5">
                          {msg.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">
                        <div>{msg.interest}</div>
                        <div className="text-[0.65rem] text-slate-400 font-normal mt-0.5">
                          {msg.specificInterest || "General"}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-[200px] truncate text-slate-500 font-medium">
                        {msg.message}
                      </td>
                      <td className="px-6 py-4 text-slate-400">
                        {new Date(msg.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[0.6rem] font-bold uppercase tracking-wider ${
                            msg.replyStatus === "Replied"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {msg.replyStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleOpenMsg(msg)}
                            className="p-2 bg-emerald-50 hover:bg-emerald-deep text-emerald-800 hover:text-white rounded-lg transition-all border border-emerald-100/50 flex items-center gap-1 font-semibold"
                          >
                            <Eye className="w-4 h-4" /> View / Reply
                          </button>
                          <button
                            onClick={() => handleDelete(msg.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Message"
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

      {/* VIEW & REPLY MODAL */}
      {selectedMsg && (
        <div className="fixed inset-0 z-50 bg-[#08120d]/60 backdrop-blur-sm flex items-center justify-center px-4 py-8 overflow-y-auto animate-fade-in">
          <div className="bg-white rounded-3xl border border-slate-100 max-w-2xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-luxury relative">
            {/* Header */}
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-serif-display text-xl text-emerald-deep font-bold">
                  Enquiry Message
                </h3>
                <span className="text-[0.65rem] text-slate-400 font-semibold uppercase tracking-wider mt-1 block">
                  Category: {selectedMsg.interest} ({selectedMsg.specificInterest || "General"})
                </span>
              </div>
              <button
                onClick={() => setSelectedMsg(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
              >
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 overflow-y-auto space-y-6 text-slate-600 text-xs">
              {/* Contact Card Summary */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                    Sender Name
                  </span>
                  <span className="font-bold text-slate-800 text-[0.85rem]">
                    {selectedMsg.name}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedMsg.email}`}
                    className="font-semibold text-emerald hover:underline"
                  >
                    {selectedMsg.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                    Phone Number
                  </span>
                  <a
                    href={`tel:${selectedMsg.phone}`}
                    className="font-semibold text-slate-800 hover:text-emerald transition-colors"
                  >
                    {selectedMsg.phone || "N/A"}
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <span className="text-slate-400 font-semibold uppercase tracking-wider block">
                  Submitted Message:
                </span>
                <p className="font-medium text-slate-700 bg-slate-50/50 p-4 rounded-xl border border-slate-100 leading-relaxed whitespace-pre-wrap text-[0.85rem]">
                  {selectedMsg.message}
                </p>
                <span className="text-[0.6rem] text-slate-400 block text-right mt-1">
                  Submitted at {new Date(selectedMsg.created_at).toLocaleString()}
                </span>
              </div>

              {/* SMTP Reply History */}
              {selectedMsg.replies && selectedMsg.replies.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-serif-display text-emerald-deep font-bold border-b border-slate-100 pb-1.5 flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald" /> Sent Responses History
                  </h4>
                  <div className="space-y-3">
                    {selectedMsg.replies.map((reply: any) => (
                      <div
                        key={reply.id}
                        className="bg-emerald-50/20 border border-emerald-100/50 p-4 rounded-xl relative"
                      >
                        <p className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                          {reply.message}
                        </p>
                        <span className="text-[0.55rem] text-emerald-800 block text-right mt-2 font-semibold">
                          Sent at {new Date(reply.sent_at).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Draft SMTP Reply Form */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <h4 className="font-serif-display text-emerald-deep font-bold flex items-center gap-2">
                  <Send className="w-4 h-4 text-emerald" /> Send Response Email (via SMTP)
                </h4>
                <form onSubmit={handleSendReply} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[0.6rem] tracking-wider uppercase text-slate-400 font-semibold">
                      Subject
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="Email Subject"
                      className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald focus:outline-none rounded-xl py-2 px-3 text-slate-700 text-xs font-semibold transition-all"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[0.6rem] tracking-wider uppercase text-slate-400 font-semibold">
                      Response Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={replyBody}
                      onChange={(e) => setReplyBody(e.target.value)}
                      placeholder="Write your reply here..."
                      className="w-full bg-slate-50/50 border border-slate-200 focus:border-emerald focus:outline-none rounded-xl p-3 text-slate-700 text-xs transition-all resize-none leading-relaxed"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-5 py-2.5 bg-emerald-deep hover:bg-[#0c2a21] text-white rounded-lg font-semibold tracking-wider uppercase text-xs flex items-center gap-2 shadow-md transition-all disabled:opacity-50"
                  >
                    {sending ? "Sending via SMTP..." : "Send Reply Email"}{" "}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => handleDelete(selectedMsg.id)}
                className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider font-semibold text-[0.65rem]"
              >
                <Trash2 className="w-4 h-4" /> Delete enquiry
              </button>
              <button
                onClick={() => setSelectedMsg(null)}
                className="px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg font-semibold tracking-wider uppercase transition-colors text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
