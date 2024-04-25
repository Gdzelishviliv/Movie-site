"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from "./config/firebase";
import Header from "./components/header/Header";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log(auth.currentUser);
    if (!auth.currentUser) {
      router.push("/pages/login");
    }
  }, [router]);

  {
    return (
      <main>
        <Header/>
      </main>
    );
  }
}
