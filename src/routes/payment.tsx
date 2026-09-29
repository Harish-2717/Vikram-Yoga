import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";
import { Navbar, Footer, WhatsAppFloat, BookNowFloat } from "./about";
import { ArrowLeft, Building2, Smartphone, ShieldCheck, Heart, Upload, CheckCircle2, Home, RefreshCw, Copy } from "lucide-react";

export const Route = createFileRoute("/payment")({
  component: PaymentPage,
  head: () => ({
    meta: [
      { title: "Payment — Dr. Vikram Yoga & Wellness Centre" },
      { name: "description", content: "Complete your payment." },
    ],
  }),
});

function PaymentPage() {
  const navigate = useNavigate();
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [applicationId, setApplicationId] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const appId = params.get("applicationId") || "";
      setApplicationId(appId);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!applicationId) {
      toast.error("Application ID is missing. Please start from the Apply page.");
      return;
    }

    
    setIsSubmitting(true);
    const submitData = new FormData();
    submitData.append("applicationId", applicationId);
    submitData.append("paymentMethod", "Online Payment");
    if (proofFile) {
      submitData.append("proof", proofFile);
    }
    
    try {
      const resp = await fetch(getApiUrl("payment.php"), {
        method: "POST",
        body: submitData,
      });
      const res = await resp.json();
      if (res.success) {
        toast.success("Payment details submitted successfully!");
        setSubmitted(true);
      } else {
        toast.error(res.error || "Payment submission failed.");
      }
    } catch (err: any) {
      toast.error("Error submitting payment: " + (err?.message || String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="overflow-x-hidden bg-[#fafafa] min-h-screen">
        <Navbar />
        <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto bg-white p-8 md:p-10 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-green-900/10 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100 shadow-sm">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl text-emerald-deep font-serif tracking-wide font-semibold">
                Payment Details Received!
              </h1>
              <p className="text-slate-500 text-[0.95rem] max-w-md mx-auto">
                Thank you. We have received your payment information.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 text-left space-y-4 max-w-md mx-auto">
              <h4 className="font-semibold text-emerald-deep text-sm uppercase tracking-wider border-b border-slate-200 pb-2">
                Submission Summary
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-slate-400 font-medium">Application ID:</span>
                  <div className="flex items-center gap-1.5 font-mono text-emerald-950 font-bold bg-slate-200/50 px-2 py-0.5 rounded text-xs">
                    <span>{applicationId}</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(applicationId);
                        toast.success("Application ID copied!");
                      }}
                      className="text-slate-400 hover:text-emerald-deep transition-colors"
                      title="Copy ID"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 font-medium">Payment Method:</span>
                  <span className="text-slate-800 font-semibold">Online Payment (UPI / QR)</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl text-xs text-emerald-800 leading-relaxed max-w-md mx-auto font-medium text-center">
              Our administrative team will review and verify your payment proof shortly.
            </div>

            <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/"
                className="px-6 py-3 bg-emerald-deep text-white text-[0.9rem] font-medium rounded-xl shadow-md hover:bg-[#0c2a21] transition-all flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Home className="w-4 h-4" /> Go to Homepage
              </a>
            </div>
          </div>
        </div>
        <Footer />
        <WhatsAppFloat />
        <BookNowFloat />
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden bg-[#fafafa] min-h-screen">
      <Navbar />
      <div className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <h1 className="text-3xl text-center text-[#55b9b7] font-serif mb-10 tracking-wide">Payment</h1>
               <div className="bg-white px-6 sm:px-10 py-10 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">

          {/* Bank Details & UPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Bank Details Card */}
            <div className="bg-white p-7 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-green-900/10 relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#55b9b7]" />
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#55b9b7]/10 flex items-center justify-center text-[#55b9b7]">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-emerald-deep font-semibold tracking-wide">1. Bank Details</h3>
              </div>
              <div className="space-y-4 text-[0.875rem]">
                <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                  <span className="text-slate-500">Account Holder:</span>
                  <span className="font-medium text-slate-800 text-right">S. Vikrampandy</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                  <span className="text-slate-500">Bank Name:</span>
                  <span className="font-medium text-slate-800 text-right">Indian Bank</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                  <span className="text-slate-500">Branch:</span>
                  <span className="font-medium text-slate-800 text-right">Nimmiyampattu</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                  <span className="text-slate-500">Account Number:</span>
                  <span className="font-medium text-slate-800 text-right">6462666324</span>
                </div>
                <div className="flex justify-between items-center bg-gray-50/50 p-2 rounded">
                  <span className="text-slate-500">IFSC Code:</span>
                  <span className="font-medium text-slate-800 text-right">IDIB000N142</span>
                </div>
              </div>
              <div className="mt-8 p-3.5 bg-green-50 rounded-lg flex items-center justify-center gap-3 border border-green-100">
                <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-xs text-green-800 font-medium">Secure. Fast. Trusted.<br/>Your payment is safe with Wise.</span>
              </div>
            </div>

            {/* UPI Card */}
            <div className="bg-white p-7 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-green-900/10 relative overflow-hidden group hover:shadow-lg transition-shadow">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#55b9b7]" />
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-[#55b9b7]/10 flex items-center justify-center text-[#55b9b7]">
                  <Smartphone className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-emerald-deep font-semibold tracking-wide">2. UPI ID</h3>
              </div>
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <span className="text-slate-500 mb-3 text-sm">Transfer easily using UPI</span>
                <div className="font-medium text-[0.95rem] text-emerald-950 tracking-wider bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 w-full mb-8 shadow-inner select-all">
                  vikrampandy1998@okaxis
                </div>
                <div className="w-full space-y-4 text-left px-2">
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500" /> Instant &amp; Easy Transfers
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500" /> Secure &amp; Reliable
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <div className="w-2 h-2 rounded-full bg-green-500" /> Accepted in India
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="text-center max-w-md mx-auto">
            {applicationId && (
              <div className="mb-6 flex flex-col gap-2 text-left">
                <label className="text-[0.85rem] text-slate-500 font-medium tracking-wide">Application ID :</label>
                <input
                  type="text"
                  value={applicationId}
                  readOnly
                  className="border border-gray-200 rounded-[0.5rem] p-3 outline-none bg-gray-50 text-[0.9rem] w-full text-slate-700"
                />
              </div>
            )}



            <button type="submit" disabled={isSubmitting} className="px-8 py-3.5 bg-emerald-deep text-white text-[0.95rem] font-medium rounded-lg shadow-md hover:bg-[#0c2a21] transition-all focus:ring-4 focus:ring-green-900/20 w-full inline-flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
              {isSubmitting ? "Submitting..." : "Complete Payment"} <Heart className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <WhatsAppFloat />
      <BookNowFloat />
    </main>
  );
}
