import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getApiUrl } from "@/lib/utils";
import logo from "@/assets/logo.png";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Images as ImagesIcon,
  FileSpreadsheet,
  CreditCard,
  Mail,
  LogOut,
  Menu,
  X,
  Lock,
  User as UserIcon,
  MessageSquare,
  Layers,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [
      { title: "Admin Panel — Dr. Vikram Yoga & Wellness Centre" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");

  // Login Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate();

  const getSessionToken = () => {
    if (typeof document === "undefined") return undefined;
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_token="))
      ?.split("=")[1];
  };

  const checkAuth = async () => {
    const token = getSessionToken();
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(getApiUrl("admin/check-auth.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const res = await response.json();
      setIsAuthenticated(res.authenticated);
      if (res.authenticated) {
        // Restore persisted username from localStorage
        const savedUser = localStorage.getItem("admin_user") ?? "";
        setLoggedInUser(savedUser);
      }
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch(getApiUrl("admin/login.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const res = await response.json();
      if (response.ok && res.success && res.token) {
        document.cookie = `session_token=${res.token}; path=/; max-age=${24 * 60 * 60};`;
        localStorage.setItem("admin_user", username);
        setLoggedInUser(username);
        setIsAuthenticated(true);
        toast.success("Successfully logged in!");
        navigate({ to: "/admin" });
      } else {
        setLoginError(res.error || "Login failed");
        toast.error(res.error || "Login failed");
      }
    } catch {
      setLoginError("An error occurred. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    const token = getSessionToken();
    try {
      await fetch(getApiUrl("admin/logout.php"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
    } catch {}
    document.cookie = "session_token=; path=/; max-age=0;";
    localStorage.removeItem("admin_user");
    setLoggedInUser("");
    setIsAuthenticated(false);
    toast.success("Successfully logged out!");
    navigate({ to: "/admin" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08120d] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  // RENDER LOGIN PAGE IF NOT AUTHENTICATED
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#08120d] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent)] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#0c1c14]/80 backdrop-blur-xl border border-gold/20 rounded-3xl p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_50px_rgba(212,175,55,0.05)]">
          <div className="flex flex-col items-center mb-8">
            <img
              src={logo}
              alt="Dr Vikram Logo"
              className="h-20 w-auto mb-4 drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]"
            />
            <h1 className="font-serif-display text-xs tracking-[0.3em] text-gold uppercase text-center font-bold">
              DR. VIKRAM CENTRE
            </h1>
            <p className="text-cream/50 text-[0.7rem] uppercase tracking-widest mt-1">
              Administrative Login
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="bg-red-950/40 border border-red-500/30 text-red-200 text-xs px-4 py-3 rounded-lg text-center font-medium">
                {loginError}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/70 font-semibold block">
                Username
              </label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3.5 w-4 h-4 text-gold/60" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-[#08120d]/60 border border-gold/10 hover:border-gold/20 focus:border-gold focus:outline-none rounded-xl py-3 pl-10 pr-4 text-cream placeholder:text-cream/20 text-sm transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[0.65rem] tracking-[0.25em] uppercase text-cream/70 font-semibold block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 w-4 h-4 text-gold/60" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#08120d]/60 border border-gold/10 hover:border-gold/20 focus:border-gold focus:outline-none rounded-xl py-3 pl-10 pr-4 text-cream placeholder:text-cream/20 text-sm transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 bg-gold-gradient text-emerald-deep font-semibold text-xs tracking-widest uppercase rounded-xl shadow-gold hover:scale-[1.01] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // RENDER ADMIN INTERFACE IF AUTHENTICATED
  const sidebarLinks = [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/gallery", label: "Gallery Images", icon: ImagesIcon },
    { to: "/admin/service-images", label: "Service Images", icon: Layers },
    { to: "/admin/social-media", label: "Social Media Images", icon: ImageIcon },
    { to: "/admin/applications", label: "Applications", icon: FileSpreadsheet },
    { to: "/admin/payments", label: "Payment Verification", icon: CreditCard },
    { to: "/admin/contact-messages", label: "Contact Messages", icon: Mail },
    { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  ];

  return (
    <div className="h-screen bg-[#f8fafc] flex overflow-hidden">
      {/* SIDEBAR FOR DESKTOP */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0c1c14] text-cream border-r border-gold/10 shrink-0 h-screen sticky top-0">
        <div className="p-6 border-b border-cream/10 flex items-center gap-3 shrink-0">
          <img src={logo} alt="Dr Vikram" className="h-10 w-auto" />
          <div>
            <div className="font-serif-display text-[0.65rem] text-gold tracking-widest font-bold">
              DR. VIKRAM
            </div>
            <div className="text-[0.5rem] text-cream/50 tracking-widest uppercase mt-0.5">
              Admin Area
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                activeProps={{ className: "bg-gold/15 text-gold border-l-4 border-gold pl-3" }}
                activeOptions={{ exact: link.to === "/admin" }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs tracking-wider uppercase text-cream/70 hover:bg-cream/5 hover:text-cream transition-all"
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-cream/10 shrink-0 space-y-2">
          {/* Logged-in user display */}
          {loggedInUser && (
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-cream/5 border border-cream/10">
              <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                <UserIcon className="w-3.5 h-3.5 text-gold" />
              </div>
              <div className="min-w-0">
                <div className="text-[0.6rem] text-cream/40 tracking-widest uppercase">Logged in as</div>
                <div className="text-xs text-cream font-semibold tracking-wide truncate">{loggedInUser}</div>
              </div>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs tracking-wider uppercase text-red-400 hover:bg-red-950/20 transition-all font-medium"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE MENU / NAVBAR */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="lg:hidden bg-[#0c1c14] border-b border-gold/10 text-cream px-6 py-4 flex items-center justify-between z-30 shadow-md shrink-0">
          <Link to="/admin" className="flex items-center gap-2">
            <img src={logo} alt="Dr Vikram" className="h-9 w-auto" />
            <span className="font-serif-display text-xs text-gold tracking-widest font-bold uppercase">
              Admin Panel
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-cream hover:text-gold transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* MOBILE SIDEBAR DRAWERS */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-20 bg-[#08120d]/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="w-72 bg-[#0c1c14] h-full text-cream border-r border-gold/10 flex flex-col pt-20"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setSidebarOpen(false)}
                      activeProps={{
                        className: "bg-gold/15 text-gold border-l-4 border-gold pl-3",
                      }}
                      activeOptions={{ exact: link.to === "/admin" }}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs tracking-wider uppercase text-cream/70 hover:bg-cream/5 hover:text-cream transition-all"
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-cream/10 shrink-0 space-y-2">
                {/* Logged-in user display (mobile) */}
                {loggedInUser && (
                  <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-cream/5 border border-cream/10">
                    <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                      <UserIcon className="w-3.5 h-3.5 text-gold" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[0.6rem] text-cream/40 tracking-widest uppercase">Logged in as</div>
                      <div className="text-xs text-cream font-semibold tracking-wide truncate">{loggedInUser}</div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => {
                    setSidebarOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs tracking-wider uppercase text-red-400 hover:bg-red-950/20 transition-all font-medium"
                >
                  <LogOut className="w-4 h-4 shrink-0" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN PANEL CONTENT VIEWPORT */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
