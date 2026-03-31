"use client";
import AuthLayout, { Field, Input } from "@/components/AuthLayout";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

const ResetPassword = () => {
  const router = useRouter();
  const emailRef = useRef(null);
  const otpRef = useRef(null);
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [resetting, setResetting] = useState(false);

  const checkMailExists = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/getbymail/${emailRef.current.value}`);
      if (res.status === 200) {
        const data = await res.json();
        setVerifiedUser(data);
        return true;
      }
      return false;
    } catch { return false; }
  };

  const sendOTP = async () => {
    if (!emailRef.current?.value) { toast.error("Enter your email first"); return; }
    setSendingOtp(true);
    try {
      if (!(await checkMailExists())) { toast.error("Email not registered"); return; }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/util/sendotp`, {
        method: "POST",
        body: JSON.stringify({ email: emailRef.current.value }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.status === 201) { toast.success("OTP sent to your email"); setOtpSent(true); }
      else toast.error("Failed to send OTP");
    } catch { toast.error("Network error"); }
    finally { setSendingOtp(false); }
  };

  const verifyOTP = async () => {
    if (!otpRef.current?.value) { toast.error("Enter the OTP"); return; }
    setVerifyingOtp(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/util/verifyotp/${emailRef.current.value}/${otpRef.current.value}`
      );
      if (res.status === 200) { toast.success("OTP verified!"); setShowForm(true); }
      else toast.error("Invalid OTP");
    } catch { toast.error("Network error"); }
    finally { setVerifyingOtp(false); }
  };

  const resetForm = useFormik({
    initialValues: { password: "", cpassword: "" },
    validationSchema: Yup.object({
      password: Yup.string().min(6, "Min 6 characters").required("Required"),
      cpassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required("Required"),
    }),
    onSubmit: async (values) => {
      if (!verifiedUser) return;
      setResetting(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update/${verifiedUser._id}`, {
          method: "PUT",
          body: JSON.stringify({ password: values.password }),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          toast.success("Password reset successful!");
          router.push("/login");
        } else toast.error("Reset failed");
      } catch { toast.error("Network error"); }
      finally { setResetting(false); }
    },
  });

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your registered email, verify with OTP, and set a new password."
      imageSrc="https://www.pngplay.com/wp-content/uploads/6/E-Commerce-Shopping-PNG-Clipart-Background.png"
    >
      <h2 className="text-2xl font-black text-gray-900 mb-1">Change Password</h2>
      <p className="text-sm text-gray-500 mb-8">
        Remembered it?{" "}
        <Link href="/login" className="font-semibold text-[#8C52FF] hover:underline">Back to login</Link>
      </p>

      <div className="flex flex-col gap-5">
        {/* Step 1 — email */}
        <div className={`flex flex-col gap-2 ${showForm ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-6 h-6 rounded-full bg-[#1E2852] text-white text-xs font-bold flex items-center justify-center">1</span>
            <span className="text-sm font-semibold text-gray-700">Enter your email</span>
          </div>
          <div className="flex gap-2">
            <input
              type="email"
              ref={emailRef}
              placeholder="you@example.com"
              disabled={otpSent}
              className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition disabled:opacity-60"
            />
            <button
              type="button"
              onClick={sendOTP}
              disabled={sendingOtp || otpSent}
              className="px-4 py-2.5 bg-[#1E2852] hover:bg-[#2a3a70] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition whitespace-nowrap"
            >
              {sendingOtp ? 'Sending…' : otpSent ? 'Sent ✓' : 'Send OTP'}
            </button>
          </div>
        </div>

        {/* Step 2 — OTP */}
        {otpSent && !showForm && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-[#1E2852] text-white text-xs font-bold flex items-center justify-center">2</span>
              <span className="text-sm font-semibold text-gray-700">Enter OTP</span>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                ref={otpRef}
                placeholder="6-digit OTP"
                maxLength={6}
                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C52FF] focus:border-transparent transition tracking-widest font-mono"
              />
              <button
                type="button"
                onClick={verifyOTP}
                disabled={verifyingOtp}
                className="px-4 py-2.5 bg-[#8C52FF] hover:bg-[#7a3ff0] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition"
              >
                {verifyingOtp ? 'Verifying…' : 'Verify'}
              </button>
            </div>
            <button onClick={sendOTP} className="text-xs text-[#8C52FF] hover:underline self-start">
              Resend OTP
            </button>
          </div>
        )}

        {/* Step 3 — new password */}
        {showForm && (
          <form onSubmit={resetForm.handleSubmit} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold flex items-center justify-center">✓</span>
              <span className="text-sm font-semibold text-gray-700">OTP verified — set a new password</span>
            </div>

            <Field label="New Password" id="password" error={resetForm.touched.password && resetForm.errors.password}>
              <Input id="password" name="password" type="password" placeholder="Min 6 characters"
                onChange={resetForm.handleChange} value={resetForm.values.password} />
            </Field>

            <Field label="Confirm Password" id="cpassword" error={resetForm.touched.cpassword && resetForm.errors.cpassword}>
              <Input id="cpassword" name="cpassword" type="password" placeholder="Repeat new password"
                onChange={resetForm.handleChange} value={resetForm.values.cpassword} />
            </Field>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 rounded border-gray-300 text-[#8C52FF]" />
              I accept the{" "}
              <a href="#" className="text-[#8C52FF] hover:underline font-semibold">Terms and Conditions</a>
            </label>

            <button
              type="submit"
              disabled={resetting}
              className="w-full py-3 bg-[#1E2852] hover:bg-[#2a3a70] disabled:opacity-60 text-white text-sm font-bold rounded-xl transition"
            >
              {resetting ? 'Resetting…' : 'Reset Password'}
            </button>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
