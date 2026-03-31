"use client";
import useAppContext from "@/context/AppContext";
import AuthLayout, { Field, Input, SubmitBtn } from "@/components/AuthLayout";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password too short").required("Password is required"),
});

const Login = () => {
  const { setLoggedIn } = useAppContext();
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/authenticate`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          const data = await res.json();
          sessionStorage.setItem("user", JSON.stringify(data));
          setLoggedIn(true);
          toast.success("Welcome back!");
          resetForm();
          router.push("/productView");
        } else if (res.status === 401) {
          toast.error("Invalid credentials");
        } else {
          toast.error("Something went wrong");
        }
      } catch {
        toast.error("Network error");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Sign in to your VOX Market account and continue your voice-powered shopping experience."
      imageSrc="https://www.pngplay.com/wp-content/uploads/6/E-Commerce-Shopping-PNG-Clipart-Background.png"
      imageAlt="Shopping illustration"
    >
      <h2 className="text-2xl font-black text-gray-900 mb-1">Sign in</h2>
      <p className="text-sm text-gray-500 mb-8">
        Don't have an account?{" "}
        <Link href="/signup" className="font-semibold text-[#8C52FF] hover:underline">Register here</Link>
      </p>

      <form onSubmit={form.handleSubmit} className="flex flex-col gap-5">
        <Field label="Email address" id="email" error={form.touched.email && form.errors.email}>
          <Input
            id="email" name="email" type="email"
            placeholder="you@example.com"
            onChange={form.handleChange} value={form.values.email}
            autoComplete="email"
          />
        </Field>

        <Field label="Password" id="password" error={form.touched.password && form.errors.password}>
          <div className="relative">
            <Input
              id="password" name="password"
              type={showPw ? "text" : "password"}
              placeholder="••••••••"
              onChange={form.handleChange} value={form.values.password}
              autoComplete="current-password"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          <div className="flex justify-end">
            <Link href="/reset-password" className="text-xs text-[#8C52FF] hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>
        </Field>

        <SubmitBtn loading={loading}>Sign in</SubmitBtn>
      </form>
    </AuthLayout>
  );
};

export default Login;
