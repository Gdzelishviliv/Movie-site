"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/pages/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Welcome to the Home Page!</h1>
      </main>
    );
  }

  return null;
}
