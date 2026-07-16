'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { searchTeams, searchPlayers, Team, Player } from '@/utils/sports-api';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const type = (searchParams?.get('type') || 'team') as 'team' | 'player';
  const { data: session } = useSession();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Team[] | Player[]>([]);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState<Set<string>>(new Set());

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      if (type === 'team') {
        const teams = await searchTeams(query);
        setResults(teams);
      } else {
        const players = await searchPlayers(query);
        setResults(players);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFavorite = async (item: Team | Player) => {
    if (!session?.user) return;

    try {
      const endpoint = type === 'team' ? '/api/favorites/teams' : '/api/favorites/players';
      const body = type === 'team'
        ? {
            teamId: item.id,
            teamName: item.name,
            league: (item as Team).country || 'Unknown',
          }
        : {
            playerId: item.id,
            playerName: item.name,
            team: (item as Player).team,
            position: (item as Player).position,
          };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        setAdded((prev) => new Set([...prev, item.id]));
      }
    } catch (err) {
      console.error('Error adding favorite:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        Search {type === 'team' ? 'Teams' : 'Players'}
      </h1>

      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${type === 'team' ? 'teams' : 'players'}...`}
            className="input-field flex-1"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((item) => {
          const isTeam = type === 'team';
          const isFavorited = added.has(item.id);
          return (
            <div key={item.id} className="card">
              <h3 className="text-lg font-bold mb-2">{item.name}</h3>
              {isTeam ? (
                <>
                  <p className="text-sm text-gray-600 mb-4">
                    {(item as Team).country}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-600">
                    Team: {(item as Player).team}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Position: {(item as Player).position}
                  </p>
                </>
              )}
              <button
                onClick={() => handleAddFavorite(item)}
                disabled={isFavorited}
                className={`btn w-full ${
                  isFavorited
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isFavorited ? 'Added to Favorites' : 'Add to Favorites'}
              </button>
            </div>
          );
        })}
      </div>

      {!loading && results.length === 0 && query && (
        <div className="text-center text-gray-600 py-12">
          <p>No results found for "{query}"</p>
        </div>
      )}
    </div>
  );
}
