'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-400">
          AthletiX
        </Link>

        <div className="flex gap-6 items-center">
          {session?.user ? (
            <>
              <Link href="/dashboard" className="hover:text-blue-400 transition">
                Dashboard
              </Link>
              {(session.user as any)?.role === 'ADMIN' && (
                <Link href="/admin" className="hover:text-blue-400 transition">
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-3">
                <span className="text-sm">{session.user?.email}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-secondary text-sm"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary text-sm">
                Sign In
              </Link>
              <Link href="/signup" className="btn btn-secondary text-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
