// components/AuthLayout.jsx
import Link from "next/link";

/**
 * Shared split-screen layout for all auth pages.
 * Left = decorative panel, Right = form slot.
 */
const AuthLayout = ({ title, subtitle, imageSrc, imageAlt = "", children, isSeller = false }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* ── Left decorative panel ── */}
        <div className={`relative hidden md:flex md:w-5/12 flex-col justify-between p-10 ${isSeller ? 'bg-[#1E2852]' : 'bg-[#1E2852]'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-black text-[#8C52FF]">VOX</span>
            <span className="text-2xl font-black text-white">Market</span>
          </Link>

          {/* Headline */}
          <div>
            <h2 className="text-3xl font-black text-white leading-snug mb-3">{title}</h2>
            {subtitle && <p className="text-sm text-blue-200 leading-relaxed">{subtitle}</p>}
          </div>

          {/* Illustration */}
          <div className="flex items-end justify-center">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full max-h-52 object-contain"
            />
          </div>

          {/* Decorative blobs */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#8C52FF]/20 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#8C52FF]/10 rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        </div>

        {/* ── Right form panel ── */}
        <div className="flex-1 flex flex-col justify-center px-8 py-10 md:px-12 overflow-y-auto max-h-screen">
          {/* Mobile logo */}
          <Link href="/" className="flex items-center gap-1 mb-6 md:hidden">
            <span className="text-xl font-black text-[#8C52FF]">VOX</span>
            <span className="text-xl font-black text-gray-900">Market</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};

// Reusable form field components
export const Field = ({ label, id, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-sm font-semibold text-gray-700">{label}</label>
    {children}
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

export const Input = ({ className = "", ...props }) => (
  <input
    {...props}
    className={`w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900
      placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition ${className}`}
  />
);

export const SubmitBtn = ({ children, loading = false }) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full py-3 bg-[#1E2852] hover:bg-[#2a3a70] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-all active:scale-[0.98] shadow-md"
  >
    {loading ? 'Please wait…' : children}
  </button>
);

export default AuthLayout;
