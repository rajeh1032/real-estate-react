import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginWithEmail, loginWithGoogle, getAuthErrorMessage } from "../services/authService";
function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" className="shrink-0">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [remember, setRemember]     = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [showResend, setShowResend] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setShowResend(false);
    setLoading(true);
    try {
      await loginWithEmail(email, password);
      navigate("/account");
    } catch (err) {
      setError(getAuthErrorMessage(err));
      if (err.message === "EMAIL_NOT_VERIFIED") setShowResend(true);
    }
    setLoading(false);
  }

  // Login with Google + Firebase
  async function handleGoogle() {
    setError("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/account");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    }
    setLoading(false);
  }
  async function handleResend() {
    const { resendVerificationEmail } = await import("../services/authService");
    try {
      await resendVerificationEmail();
      setError("Verification email resent! Check your inbox.");
      setShowResend(false);
    } catch {
      setError("Please wait before resending.");
    }
  }
  return (
    <div className="flex h-screen w-full overflow-hidden">

      {/* ══ LEFT ══════════════════════════════════════════════ */}
      <div className="relative flex-[1.1] overflow-hidden bg-[#0d1117]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%),
              url('https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&q=80')
            `,
          }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-10">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
            The Architectural Editorial
          </span>
          <div>
            <h1 className="mb-5 font-serif text-5xl font-extrabold leading-tight text-white">
              Curating Spaces<br />for the<br />Extraordinary.
            </h1>
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/60">
              Access your curated portfolio of high-end real estate listings and architectural masterpieces.
            </p>
            <div className="mt-9 flex gap-9">
              <div>
                <div className="font-serif text-3xl font-bold text-green-400">500+</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">Exclusive Listings</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-green-400">12</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">Global Regions</div>
              </div>
            </div>
          </div>
          <span className="text-[10px] tracking-wide text-white/25">
            © 2026 Beaumont Architectural Editorial. All rights reserved.
          </span>
        </div>
      </div>

      {/* ══ RIGHT ═════════════════════════════════════════════ */}
      <div className="flex w-[420px] shrink-0 items-center justify-center bg-white px-12 shadow-[-20px_0_60px_rgba(0,0,0,0.06)]">
        <div className="w-full">
          <h2 className="mb-2 font-serif text-3xl font-bold text-[#0d1117]">Welcome Back</h2>
          <p className="mb-7 text-sm leading-relaxed text-gray-400">
            Please enter your credentials to access your private concierge.
          </p>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
              {showResend && (
                <button onClick={handleResend} className="mt-2 block font-semibold underline">
                  Resend verification email →
                </button>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Email Address
              </label>
              <input
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
              />
            </div>

            <div className="relative">
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Password
              </label>
              <input
                type={showPw ? "text" : "password"} value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-3 pl-4 pr-11 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
              />
              <button type="button" onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-[38px] text-gray-400">
                <EyeIcon open={showPw} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-xs text-gray-500">
                <input type="checkbox" checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-[#0d1117]" />
                Remember device
              </label>
              <a href="#" className="text-xs text-gray-500 hover:text-[#0d1117]">Forgot Password?</a>
            </div>

            <button type="submit" disabled={loading}
              className="w-full rounded-lg bg-[#2d6a4f] py-3 text-sm font-medium tracking-wide text-white shadow-[0_4px_14px_rgba(45,106,79,0.35)] transition hover:bg-[#1b4332] disabled:opacity-60">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <span className="flex-1 border-t border-gray-200" />
            <span className="text-[11px] uppercase tracking-widest text-gray-400">or continue with</span>
            <span className="flex-1 border-t border-gray-200" />
          </div>

          {/* Social */}
          <div className="flex gap-3">
            <button type="button" onClick={handleGoogle} disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60">
              <GoogleIcon /> Google
            </button>
            <button type="button" disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60">
              <AppleIcon /> Apple
            </button>
          </div>

          <p className="mt-7 text-center text-sm text-gray-400">
            New to the collection?{" "}
            <Link to="/register" className="font-semibold text-[#0d1117] hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
