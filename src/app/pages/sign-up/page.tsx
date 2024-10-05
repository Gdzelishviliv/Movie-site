"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { SignupValidationSchema } from "@/app/utils/validation-shcheme";
import "../login/login.css";
import Link from "next/link";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useState } from "react"; // Import useState

export default function SignUpPage() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  const checkIfEmailExists = async (email: string): Promise<boolean> => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      return signInMethods.length > 0;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  };

  const signUp = async (email: string, password: string) => {
    const emailExists = await checkIfEmailExists(email);
  
    if (emailExists) {
      setErrorMessage("This email is already in use. Please try another one.");
      return;
    }
  
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully");
      router.push("/");
    } catch (error: unknown) {
      console.error("Error during sign-up:", error);
  
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/invalid-email':
            setErrorMessage("The email address is badly formatted.");
            break;
          case 'auth/email-already-in-use':
            setErrorMessage("This email is already in use. Please try another one.");
            break;
          default:
            setErrorMessage("An error occurred during sign-up. Please try again.");
            break;
        }
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: SignupValidationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      if (values.password !== values.repeatPassword) {
        formik.setFieldError("repeatPassword", "Passwords do not match");
        return;
      }
      signUp(values.email, values.password);
    },
  });

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = formik;

  const getErrorClass = (field: keyof typeof formik.values): string => {
    return touched[field] && errors[field] ? "input-error" : "input";
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center h-lvh justify-center gap-14">
      <Image src="/assets/Movie.svg" alt="Logo" width={32} height={25} />
      <div className="login-card flex flex-col gap-10">
        <h1 className="text-white text-3xl">Sign Up</h1>
        {errorMessage && <div className="error-text">{errorMessage}</div>} {/* Display error message */}
        <div className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getErrorClass("email")}
          />
          {touched.email && errors.email && <div className="error-text">{errors.email}</div>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getErrorClass("password")}
          />
          {touched.password && errors.password && <div className="error-text">{errors.password}</div>}

          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            value={values.repeatPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className={getErrorClass("repeatPassword")}
          />
          {touched.repeatPassword && errors.repeatPassword && <div className="error-text">{errors.repeatPassword}</div>}
        </div>
        <button type="submit">Create an account</button>
        <span className="text-white text-base text-center">
          Don’t have an account? <Link href="/pages/login">Login</Link>
        </span>
      </div>
    </form>
  );
}
