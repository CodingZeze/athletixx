'use client';

import { useEffect, useState } from 'react';
import { FavoritePlayer } from '@prisma/client';
import Link from 'next/link';

export default function FavoritePlayers() {
  const [players, setPlayers] = useState<FavoritePlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const res = await fetch('/api/favorites/players');
      if (res.ok) {
        const data = await res.json();
        setPlayers(data);
      } else {
        setError('Failed to fetch favorite players');
      }
    } catch (err) {
      setError('Error fetching players');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this player from favorites?')) return;

    try {
      const res = await fetch(`/api/favorites/players/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setPlayers(players.filter((p) => p.id !== id));
      } else {
        setError('Failed to delete player');
      }
    } catch (err) {
      setError('Error deleting player');
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-12">Loading...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  if (players.length === 0) {
    return (
      <div className="text-center text-gray-600 py-12">
        <p>No favorite players yet.</p>
        <p className="text-sm mt-2">
          <Link href="/dashboard/search?type=player" className="text-blue-600 hover:underline">
            Search and add players
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {players.map((player) => (
        <div key={player.id} className="card">
          <h3 className="text-lg font-bold mb-2">{player.playerName}</h3>
          <p className="text-sm text-gray-600">Team: {player.team}</p>
          <p className="text-sm text-gray-600 mb-4">Position: {player.position}</p>
          <button
            onClick={() => handleDelete(player.id)}
            className="btn btn-danger w-full"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
