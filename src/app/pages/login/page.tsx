"use client";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginInValidationSchema } from "@/app/utils/validation-shcheme";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { auth } from "../../config/firebase";
import Image from "next/image";
import "./login.css";
import { useState } from "react";
import Effect from "@/app/layouts/enteranceAnimation/enteranceAnimation";
import CustomCursor from "@/app/components/customCursor/customCursor";

export default function LoginPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        router.push("/"); 
      }
    } catch (error) {
      console.error("Error during login:", error); // Log the entire error object
      let message = "An unexpected error occurred. Please try again."; 
      if (error && typeof error === "object" && 'code' in error) {
        const errorCode = (error as any).code; // Accessing the code property
        
        switch (errorCode) {
          case 'auth/user-not-found':
            message = "No user found with this email.";
            break;
          case 'auth/wrong-password':
            message = "Incorrect password. Please try again.";
            break;
          // Add more cases if needed
          default:
            message = "Email or assword is incorrect. Please try again.";
        }
      }
  
      setErrorMessage(message); // Set the determined error message
    }
  };
  

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginInValidationSchema, // Make sure this schema is set up for immediate validation
    validateOnChange: true, // This enables validation on each input change
    validateOnBlur: true, // This enables validation when the input loses focus
    onSubmit: (values) => {
      setErrorMessage("");
      login(values.email, values.password);
    },
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = formik;

  const getErrorClass = (field: keyof typeof formik.values): string => {
    return touched[field] && errors[field] ? "input-error" : "input";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center h-lvh justify-center gap-14">
      <Effect/>
      <CustomCursor/>
      <Image src="/assets/Movie.svg" alt="Logo" width={32} height={25} />
      <div className="login-card flex flex-col gap-10">
        <h1 className="text-white text-3xl">Login</h1>
        {errorMessage && <div className="error-text">{errorMessage}</div>}
        <div className="flex flex-col gap-5">
          <div className={"relative"}>
             <input
               type="email"
               name="email"
               id="email"
               placeholder="Email address"
               autoComplete={"off"}
               value={values.email}
               onChange={handleChange}
               onBlur={handleBlur}
               className={getErrorClass("email")}
             />
             {touched.email && errors.email && (
               <div key="email-error" className="error-text absolute right-0 top-1">
                 {errors.email}
               </div>
             )}
          </div>
          <div className={"relative"}>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                autoComplete={"off"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={getErrorClass("password")}
            />
            {touched.password && errors.password && (
                <div className="error-text absolute right-0 top-1">{errors.password}</div>
            )}
          </div>
        </div>
        <button type="submit">Login to your account</button>
        <span className="text-white text-base text-center">
          Don’t have an account? <Link href="/pages/sign-up">Sign Up</Link>
        </span>
      </div>
    </form>
  );
}
