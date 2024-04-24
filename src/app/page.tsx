"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { auth } from './config/firebase';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    console.log(auth.currentUser);
    if (!auth.currentUser) {
      router.push('/pages/login');
    }
  }, [router]);

  {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome to the Home Page!</h1>
      </main>
    );
  }

  return null;
}
