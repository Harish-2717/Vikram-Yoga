import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Outlet, Link, createRootRouteWithContext, useRouter, useLocation, ScrollRestoration } from "@tanstack/react-router";
import { MessageSquarePlus, X, Star, Upload, Heart, CheckCircle2 } from "lucide-react";
import appCss from "../styles.css?url";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Lovable App" },
      { name: "description", content: "Lovable Generated Project" },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "Lovable App" },
      { property: "og:description", content: "Lovable Generated Project" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function FeedbackFloat() {
  const location = useLocation();
  const isEnvAdmin = location.pathname.startsWith("/admin");

  if (isEnvAdmin) return null;

  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      toast.error("Please fill in Name and Message.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role || "Yoga Practitioner");
    formData.append("rating", rating.toString());
    formData.append("message", message);
    if (photo) {
      formData.append("proof", photo); // Reuses server's parsed image upload logic
    }

    try {
      const response = await fetch(getApiUrl("testimonials.php"), {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        toast.success("Thank you for your feedback! It will be visible on the home page once approved by our team.");
        // Reset states
        setName("");
        setRole("");
        setRating(5);
        setMessage("");
        setPhoto(null);
        setIsSubmitted(true);
      } else {
        toast.error("Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      console.error("Feedback error:", err);
      toast.error("An error occurred during submission.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Share Feedback"
        className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-50 w-12 h-12 rounded-full bg-gold-gradient flex items-center justify-center text-emerald-deep shadow-gold hover:-translate-y-1 hover:scale-105 transition-all border border-gold/30 animate-fade-up group"
      >
        <MessageSquarePlus className="w-5 h-5 group-hover:rotate-12 transition-transform" />
        {/* Floating tooltip label */}
        <span className="hidden sm:block absolute right-14 scale-0 group-hover:scale-100 origin-right transition-all duration-200 bg-[#0c1c14] text-cream text-[0.6rem] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full shadow-soft whitespace-nowrap border border-gold/20 pointer-events-none">
          Share Review
        </span>
      </button>

      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#08120d]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="relative w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-luxury border border-gold/10 flex flex-col max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {isSubmitted ? (
              <div className="text-center py-6 space-y-5 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mx-auto border border-emerald-100 shadow-sm">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl text-emerald-deep">Review Submitted!</h3>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto leading-relaxed">
                    Thank you for sharing your experience. Your feedback will be visible on the home page once verified by our administrative team.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="w-full mt-4 py-3 bg-emerald-deep hover:bg-[#0c2a21] text-white text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <span className="font-serif-display text-[0.65rem] tracking-[0.3em] text-gold uppercase font-semibold block">
                    Share Experience
                  </span>
                  <h3 className="font-display text-2xl text-emerald-deep mt-1">
                    Your Feedback
                  </h3>
                  <div className="gold-divider mx-auto mt-3" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-slate-500 font-semibold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Jane Doe"
                      className="border border-slate-200 focus:border-[#55b9b7] focus:outline-none rounded-xl p-3 text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>

                  {/* Role field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-slate-500 font-semibold">
                      Your Role / Title (Optional)
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g. Yoga Student, Retreat Guest"
                      className="border border-slate-200 focus:border-[#55b9b7] focus:outline-none rounded-xl p-3 text-sm text-slate-800 bg-slate-50/50"
                    />
                  </div>

                  {/* Rating field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-slate-500 font-semibold">
                      Rating
                    </label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(null)}
                          className="p-0.5 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 transition-colors ${
                              star <= (hoverRating ?? rating)
                                ? "text-gold fill-gold"
                                : "text-slate-200"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-slate-500 font-semibold">
                      Review / Testimonial
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your experience with Dr. Vikram..."
                      className="border border-slate-200 focus:border-[#55b9b7] focus:outline-none rounded-xl p-3 text-sm text-slate-800 bg-slate-50/50 resize-none"
                    />
                  </div>

                  {/* Photo upload field */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[0.7rem] tracking-[0.15em] uppercase text-slate-500 font-semibold">
                      Profile Photo (Optional)
                    </label>
                    <label className="flex items-center gap-3 border border-dashed border-[#55b9b7]/30 rounded-xl p-3 cursor-pointer bg-[#55b9b7]/5 hover:bg-[#55b9b7]/10 transition-colors">
                      <Upload className="w-4 h-4 text-[#55b9b7]" />
                      <span className="text-xs text-slate-600 truncate font-medium">
                        {photo ? photo.name : "Upload your profile photo"}
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                      />
                    </label>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-4 py-3.5 bg-emerald-deep text-white font-semibold text-xs tracking-widest uppercase rounded-xl hover:bg-[#0c2a21] shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"} <Heart className="w-4 h-4" />
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ScrollRestoration />
      <Outlet />
      <FeedbackFloat />
      <Toaster />
    </QueryClientProvider>
  );
}
