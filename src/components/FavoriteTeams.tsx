'use client';

import { useEffect, useState } from 'react';
import { FavoriteTeam } from '@prisma/client';
import Link from 'next/link';

export default function FavoriteTeams() {
  const [teams, setTeams] = useState<FavoriteTeam[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/favorites/teams');
      if (res.ok) {
        const data = await res.json();
        setTeams(data);
      } else {
        setError('Failed to fetch favorite teams');
      }
    } catch (err) {
      setError('Error fetching teams');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this team from favorites?')) return;

    try {
      const res = await fetch(`/api/favorites/teams/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setTeams(teams.filter((t) => t.id !== id));
      } else {
        setError('Failed to delete team');
      }
    } catch (err) {
      setError('Error deleting team');
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

  if (teams.length === 0) {
    return (
      <div className="text-center text-gray-600 py-12">
        <p>No favorite teams yet.</p>
        <p className="text-sm mt-2">
          <Link href="/dashboard/search?type=team" className="text-blue-600 hover:underline">
            Search and add teams
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teams.map((team) => (
        <div key={team.id} className="card">
          <h3 className="text-lg font-bold mb-2">{team.teamName}</h3>
          <p className="text-sm text-gray-600 mb-4">League: {team.league}</p>
          <button
            onClick={() => handleDelete(team.id)}
            className="btn btn-danger w-full"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
