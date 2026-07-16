'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import FavoriteTeams from '@/components/FavoriteTeams';
import FavoritePlayers from '@/components/FavoritePlayers';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [tab, setTab] = useState<'teams' | 'players'>('teams');

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-600">Loading...</p>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600 mb-4">Please sign in to access your dashboard</p>
        <Link href="/login" className="btn btn-primary">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {session?.user?.name}!</h1>
        <p className="text-gray-600">Manage your favorite teams and players</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Link href="/dashboard/search?type=team" className="card hover:shadow-xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">⚽ Search Teams</h2>
          <p className="text-gray-600">Find and add your favorite teams</p>
        </Link>
        <Link href="/dashboard/search?type=player" className="card hover:shadow-xl cursor-pointer">
          <h2 className="text-2xl font-bold mb-2">👥 Search Players</h2>
          <p className="text-gray-600">Find and add your favorite players</p>
        </Link>
      </div>

      <div className="mt-12">
        <div className="flex gap-4 mb-6 border-b">
          <button
            onClick={() => setTab('teams')}
            className={`px-4 py-2 font-medium ${
              tab === 'teams'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Favorite Teams
          </button>
          <button
            onClick={() => setTab('players')}
            className={`px-4 py-2 font-medium ${
              tab === 'players'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            My Favorite Players
          </button>
        </div>

        {tab === 'teams' && <FavoriteTeams />}
        {tab === 'players' && <FavoritePlayers />}
      </div>
    </div>
  );
}
