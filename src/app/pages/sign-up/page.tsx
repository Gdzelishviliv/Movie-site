'use client';
import Image from 'next/image';
import { useFormik } from 'formik';
import { SignupValidationSchema } from '@/app/utils/validation-shcheme';
import '../login/login.css';

export default function LoginPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: SignupValidationSchema,
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  const { handleChange, handleSubmit, values, errors, touched } = formik;

  const getErrorClass = (field: string) => (touched[field] && errors[field] ? 'input-error' : 'input');

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center h-lvh justify-center gap-14">
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
            className={getErrorClass('email')}
          />
          {touched.email && errors.email && <div className="error-text">{errors.email}</div>}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            className={getErrorClass('password')}
          />
          {touched.password && errors.password && <div className="error-text">{errors.password}</div>}

          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            value={values.repeatPassword}
            onChange={handleChange}
            className={getErrorClass('repeatPassword')}
          />
          {touched.repeatPassword && errors.repeatPassword && <div className="error-text">{errors.repeatPassword}</div>}
        </div>

        <button type="submit">Create an account</button>
      </div>
    </form>
  );
}
