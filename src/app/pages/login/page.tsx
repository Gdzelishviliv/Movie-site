import Link from "next/link";
import Image from "next/image";
import "./login.css";

export default function page() {
  return (
    <div className="flex flex-col items-center h-lvh justify-center gap-14">
      <Image src="/assets/Movie.svg" alt="Logo" width={32} height={25} />
      <div className="login-card flex flex-col gap-10">
        <h1 className="text-white text-3xl">Login</h1>
        <div className="flex flex-col gap-5" >
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <button>
          Login to your account
        </button>
        <span className="text-white text-base text-center">
          Don’t have an account? <Link href="/pages/sign-up">Sign Up</Link>
        </span>
      </div>
    </div>
  );
}
