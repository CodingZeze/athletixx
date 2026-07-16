import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center py-20">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to <span className="text-blue-600">AthletiX</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your ultimate platform for managing favorite teams and players with real-time sports statistics.
        </p>
        <div className="flex gap-4 justify-center">
          {session ? (
            <>
              <Link href="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
              {(session.user as any)?.role === 'ADMIN' && (
                <Link href="/admin" className="btn btn-secondary">
                  Admin Panel
                </Link>
              )}
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-primary">
                Sign In
              </Link>
              <Link href="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-2">⚽ Track Teams</h3>
            <p className="text-gray-600">Save your favorite teams and track their performance in real-time.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">👥 Follow Players</h3>
            <p className="text-gray-600">Keep tabs on your favorite athletes with detailed statistics.</p>
          </div>
          <div className="card">
            <h3 className="text-xl font-bold mb-2">📊 Live Stats</h3>
            <p className="text-gray-600">Access live statistics and standings from various sports leagues.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
