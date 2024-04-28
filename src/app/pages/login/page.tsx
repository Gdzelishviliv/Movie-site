"use client";
import Link from "next/link";
import { signInWithEmailAndPassword,getAuth } from "firebase/auth";
import {  loginInValidationSchema } from "@/app/utils/validation-shcheme";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { auth } from "../../config/firebase";
import Image from "next/image";
import "./login.css";

export default function LoginPage() {

  const router = useRouter();
  const login = async (email: string, password: string) => {
    console.log("Attempting login with:", email, password);
    try {
      console.log(email,password)
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/pages/home");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginInValidationSchema,
    onSubmit: (values) => {
      console.log(1)
      login(values.email, values.password);
      console.log("Form submitted:", values);
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  const getErrorClass = (field: keyof typeof formik.values): string => {
    return touched[field] && errors[field] ? "input-error" : "input";
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center h-lvh justify-center gap-14"
    >
      <Image src="/assets/Movie.svg" alt="Logo" width={32} height={25} />
      <div className="login-card flex flex-col gap-10">
        <h1 className="text-white text-3xl">Login</h1>
        <div className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            value={values.email}
            onChange={handleChange}
            className={getErrorClass("email")}
          />
          {touched.email && errors.email && (
            <div key="email-error" className="error-text">{errors.email}</div>
          )}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className={getErrorClass("password")}
          />
          {touched.password && errors.password && (
            <div className="error-text">{errors.password}</div>
          )}
        </div>
        <button type="submit">Login to your account</button>
        <span className="text-white text-base text-center">
          Don’t have an account? <Link href="/pages/sign-up">Sign Up</Link>
        </span>
      </div>
    </form>
  );
}
