"use client";
import AuthLayout, { Field, Input, SubmitBtn } from "@/components/AuthLayout";
import useSellerContext from "@/context/SellerContext";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

const sellerLoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SellerLogin = () => {
  const router = useRouter();
  const { setSellerLoggedIn } = useSellerContext();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: sellerLoginSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller/authenticate`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          const data = await res.json();
          sessionStorage.setItem("seller", JSON.stringify(data));
          setSellerLoggedIn(true);
          toast.success("Welcome back!");
          resetForm();
          router.push("/seller/sellerdashboard");
        } else {
          toast.error("Invalid credentials");
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
      title="Seller Portal"
      subtitle="Manage your listings, track orders, and grow your business on VOX Market."
      imageSrc="/seller-login-hero.avif"
      imageAlt="Seller illustration"
      isSeller
    >
      <h2 className="text-2xl font-black text-gray-900 mb-1">Hey Seller, welcome back!</h2>
      <p className="text-sm text-gray-500 mb-8">
        New seller?{" "}
        <Link href="/sellersignup" className="font-semibold text-[#8C52FF] hover:underline">Register here</Link>
      </p>

      <form onSubmit={form.handleSubmit} className="flex flex-col gap-5">
        <Field label="Email address" id="email" error={form.touched.email && form.errors.email}>
          <Input id="email" name="email" type="email" placeholder="seller@example.com"
            onChange={form.handleChange} value={form.values.email} autoComplete="email" />
        </Field>

        <Field label="Password" id="password" error={form.touched.password && form.errors.password}>
          <div className="relative">
            <Input id="password" name="password" type={showPw ? "text" : "password"}
              placeholder="••••••••"
              onChange={form.handleChange} value={form.values.password}
              className="pr-10" />
            <button type="button" onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
          <div className="flex justify-end">
            <Link href="/resetPassword" className="text-xs text-[#8C52FF] hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>
        </Field>

        <SubmitBtn loading={loading}>Sign in</SubmitBtn>
      </form>
    </AuthLayout>
  );
};

export default SellerLogin;
