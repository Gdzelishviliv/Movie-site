"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { SignupValidationSchema } from "@/app/utils/validation-shcheme";
import "../login/login.css";
import Link from "next/link";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpPage() {
 
  const router =useRouter();

  const signUp = async (email:string,password:string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully");
      router.push("/")
    } catch (error) {
      console.error("Error during sign-up:", error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: SignupValidationSchema,
    onSubmit: (values) => {
      console.log(1)
      if(values.password!==values.repeatPassword){
        formik.setFieldError("repeatPassword", "Passwords do not match");
        return;
      }
      console.log("Form submitted:", values);
      signUp(values.email, values.password);
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
        <h1 className="text-white text-3xl">Sign Up</h1>
        <div className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={values.email}
            onChange={handleChange}
            className={getErrorClass("email")}
          />
          {touched.email && errors.email && (
            <div className="error-text">{errors.email}</div>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className={getErrorClass("password")}
          />
          {touched.password && errors.password && (
            <div className="error-text">{errors.password}</div>
          )}

          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            value={values.repeatPassword}
            onChange={handleChange}
            className={getErrorClass("repeatPassword")}
          />
          {touched.repeatPassword && errors.repeatPassword && (
            <div className="error-text">{errors.repeatPassword}</div>
          )}
        </div>

        <button type="submit">Create an account</button>
        <span className="text-white text-base text-center">
          Don’t have an account? <Link href="/pages/login">Login</Link>
        </span>
      </div>
    </form>
  );
}
