import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerWithEmail, loginWithGoogle, getAuthErrorMessage } from "../services/authService";

// ── Icons ────────────────────────────────────────────────────────
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

// Password Strength 
function getStrength(val) {
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  
  const colors = ["bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500"];
  const widths = ["w-1/4", "w-2/4", "w-3/4", "w-full"];
  const labels = ["Weak", "Fair", "Good", "Strong"];
  const textColors = ["text-red-500", "text-orange-500", "text-yellow-500", "text-green-500"];
  
  return {
    widthClass: val.length ? widths[score - 1] || "w-[10%]" : "w-0",
    colorClass: val.length ? colors[score - 1] || "bg-red-500" : "bg-transparent",
    label: val.length ? labels[score - 1] || "Weak" : "",
    textColor: val.length ? textColors[score - 1] || "text-red-500" : "",
  };
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }
    if (form.password.length < 8) {
      return setError("Password must be at least 8 characters.");
    }

    setLoading(true);
    try {
      await registerWithEmail({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });

      setSuccess("Account created! Please check your email to verify.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await loginWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError(getAuthErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  const strength = getStrength(form.password);

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="flex h-screen w-full overflow-hidden">
      
      {/* ══ LEFT PANEL ══════════════════════════════════════════ */}
      <div className="relative flex-[1.1] overflow-hidden bg-[#0d1117]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `
              linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%),
              url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80')
            `,
          }}
        />
        <div className="relative z-10 flex h-full flex-col justify-between p-9">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50">
            The Architectural Editorial
          </span>
          
          <div>
            <h1 className="mb-5 font-serif text-5xl font-extrabold leading-tight text-white">
              Join the<br />Extraordinary<br />Collection.
            </h1>
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/60">
              Create your private account and gain access to exclusive
              listings curated for the discerning few.
            </p>
            
            <div className="mt-8 flex gap-8">
              <div>
                <div className="font-serif text-3xl font-bold text-green-400">500+</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                  Exclusive Listings
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-green-400">12</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                  Global Regions
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl font-bold text-green-400">24/7</div>
                <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                  Concierge Access
                </div>
              </div>
            </div>
          </div>
          
          <span className="text-[10px] tracking-wide text-white/25">
            © 2024 Beaumont Architectural Editorial. All rights reserved.
          </span>
        </div>
      </div>

      {/* ══ RIGHT PANEL ═════════════════════════════════════════ */}
      <div className="flex w-[440px] shrink-0 items-center justify-center overflow-y-auto bg-white px-11 py-8 shadow-[-20px_0_60px_rgba(0,0,0,0.06)]">
        <div className="w-full">
          
          <h2 className="mb-2 font-serif text-3xl font-bold text-[#0d1117]">
            Create Account
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-gray-400">
            Join our exclusive collection of architectural masterpieces.
          </p>

          {/* Social Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              <GoogleIcon /> Google
            </button>
            <button
              type="button"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-60"
            >
              <AppleIcon /> Apple
            </button>
          </div>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <span className="flex-1 border-t border-gray-200" />
            <span className="text-[11px] uppercase tracking-widest text-gray-400">
              or register with email
            </span>
            <span className="flex-1 border-t border-gray-200" />
          </div>

          {/* Success Message */}
          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-center text-sm text-green-600">
              {success}
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+1 (555) 000-0000"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Password
              </label>
              <input
                type={showPw ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-11 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
              >
                <EyeIcon open={showPw} />
              </button>
              
              {/* Password Strength Bar */}
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strength.colorClass} ${strength.widthClass}`}
                />
              </div>
              {strength.label && (
                <span className={`mt-1 block text-[11px] font-medium ${strength.textColor}`}>
                  {strength.label}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-gray-500">
                Confirm Password
              </label>
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm"
                value={form.confirm}
                onChange={handleChange}
                placeholder="Repeat your password"
                required
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-4 pr-11 text-sm text-[#0d1117] outline-none transition focus:border-[#0d1117] focus:bg-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
              >
                <EyeIcon open={showConfirm} />
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full rounded-lg bg-[#2d6a4f] py-3 text-sm font-medium tracking-wide text-white shadow-[0_4px_14px_rgba(45,106,79,0.35)] transition hover:bg-[#1b4332] disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          {/* Terms */}
          <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-400">
            By creating an account you agree to our{" "}
            <a href="#" className="font-medium text-gray-700 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="font-medium text-gray-700 hover:underline">
              Privacy Policy
            </a>
          </p>

          {/* Sign In Link */}
          <p className="mt-5 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#0d1117] hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}''