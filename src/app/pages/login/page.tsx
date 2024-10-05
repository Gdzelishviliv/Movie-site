"use client";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginInValidationSchema } from "@/app/utils/validation-shcheme";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { auth } from "../../config/firebase";
import Image from "next/image";
import "./login.css";
import { useState } from "react"; // Import useState

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // Check if user is authenticated and redirect accordingly
      if (userCredential.user) {
        // Here, you can add additional logic to check user roles or permissions if needed
        router.push("/"); // Redirect to home on successful login
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Invalid email or password. Please try again."); // Set error message
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginInValidationSchema,
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  const getErrorClass = (field: keyof typeof formik.values): string => {
    return touched[field] && errors[field] ? "input-error" : "input";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center h-lvh justify-center gap-14">
      <Image src="/assets/Movie.svg" alt="Logo" width={32} height={25} />
      <div className="login-card flex flex-col gap-10">
        <h1 className="text-white text-3xl">Login</h1>
        {errorMessage && <div className="error-text">{errorMessage}</div>} {/* Display error message */}
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
          {touched.email && errors.email && <div key="email-error" className="error-text">{errors.email}</div>}
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className={getErrorClass("password")}
          />
          {touched.password && errors.password && <div className="error-text">{errors.password}</div>}
        </div>
        <button type="submit">Login to your account</button>
        <span className="text-white text-base text-center">
          Don’t have an account? <Link href="/pages/sign-up">Sign Up</Link>
        </span>
      </div>
    </form>
  );
}
