"use client";
import AuthLayout, { Field, Input, SubmitBtn } from "@/components/AuthLayout";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { FiEye, FiEyeOff } from "react-icons/fi";

const sellerSignupSchema = Yup.object().shape({
  fname: Yup.string().required("First name is required"),
  lname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm password"),
});

const SignUpSeller = () => {
  const router = useRouter();
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useFormik({
    initialValues: { fname: "", lname: "", email: "", password: "", cpassword: "" },
    validationSchema: sellerSignupSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/seller/add`, {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 200) {
          toast.success("Account created! Please log in.");
          resetForm();
          router.push("/sellerLogin");
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
      title="Join as a Seller"
      subtitle="List your products and reach thousands of customers on VOX Market."
      imageSrc="/seller-login-hero.avif"
      imageAlt="Seller illustration"
      isSeller
    >
      <h2 className="text-2xl font-black text-gray-900 mb-1">Create seller account</h2>
      <p className="text-sm text-gray-500 mb-8">
        Already registered?{" "}
        <Link href="/sellerLogin" className="font-semibold text-[#8C52FF] hover:underline">Login here</Link>
      </p>

      <form onSubmit={form.handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="First Name" id="fname" error={form.touched.fname && form.errors.fname}>
            <Input id="fname" name="fname" type="text" placeholder="Jane"
              onChange={form.handleChange} value={form.values.fname} />
          </Field>
          <Field label="Last Name" id="lname" error={form.touched.lname && form.errors.lname}>
            <Input id="lname" name="lname" type="text" placeholder="Doe"
              onChange={form.handleChange} value={form.values.lname} />
          </Field>
        </div>

        <Field label="Email address" id="email" error={form.touched.email && form.errors.email}>
          <Input id="email" name="email" type="email" placeholder="seller@example.com"
            onChange={form.handleChange} value={form.values.email} autoComplete="email" />
        </Field>

        <Field label="Password" id="password" error={form.touched.password && form.errors.password}>
          <div className="relative">
            <Input id="password" name="password" type={showPw ? "text" : "password"}
              placeholder="Min 6 characters"
              onChange={form.handleChange} value={form.values.password}
              className="pr-10" />
            <button type="button" onClick={() => setShowPw(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              {showPw ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </Field>

        <Field label="Confirm Password" id="cpassword" error={form.touched.cpassword && form.errors.cpassword}>
          <Input id="cpassword" name="cpassword" type="password" placeholder="Repeat password"
            onChange={form.handleChange} value={form.values.cpassword} />
        </Field>

        <div className="pt-1">
          <SubmitBtn loading={loading}>Create Seller Account</SubmitBtn>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUpSeller;
