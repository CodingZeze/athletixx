// Free sports API client using public endpoints
import axios from 'axios';

const API_BASE_URL = 'https://api.api-sports.io';

export interface Team {
  id: string;
  name: string;
  logo?: string;
  country?: string;
  founded?: number;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  number?: number;
  photo?: string;
}

export interface TeamStats {
  played: number;
  wins: number;
  draws: number;
  loses: number;
  points: number;
}

// Mock data for free use (replace with real API calls if you have a paid key)
const mockTeams: Team[] = [
  { id: '1', name: 'Manchester United', logo: '🔴', country: 'England', founded: 1878 },
  { id: '2', name: 'Liverpool FC', logo: '❤️', country: 'England', founded: 1892 },
  { id: '3', name: 'Chelsea', logo: '🔵', country: 'England', founded: 1905 },
  { id: '4', name: 'Manchester City', logo: '🔷', country: 'England', founded: 1880 },
  { id: '5', name: 'Real Madrid', logo: '⚪', country: 'Spain', founded: 1902 },
];

const mockPlayers: Player[] = [
  { id: '1', name: 'Cristiano Ronaldo', team: 'Manchester United', position: 'Forward', number: 7, photo: '🏃' },
  { id: '2', name: 'Harry Kane', team: 'Manchester City', position: 'Forward', number: 9, photo: '⚽' },
  { id: '3', name: 'Bukayo Saka', team: 'Arsenal', position: 'Winger', number: 7, photo: '🏃‍♂️' },
  { id: '4', name: 'Mohamed Salah', team: 'Liverpool FC', position: 'Forward', number: 11, photo: '⚽' },
  { id: '5', name: 'Erling Haaland', team: 'Manchester City', position: 'Forward', number: 9, photo: '🏃' },
];

export async function searchTeams(query: string): Promise<Team[]> {
  // Mock implementation - returns filtered teams
  return mockTeams.filter(team =>
    team.name.toLowerCase().includes(query.toLowerCase())
  );
}

export async function searchPlayers(query: string): Promise<Player[]> {
  // Mock implementation - returns filtered players
  return mockPlayers.filter(player =>
    player.name.toLowerCase().includes(query.toLowerCase()) ||
    player.team.toLowerCase().includes(query.toLowerCase())
  );
}

export async function getTeamStats(teamId: string): Promise<TeamStats> {
  // Mock implementation - returns sample stats
  return {
    played: 38,
    wins: 28,
    draws: 5,
    loses: 5,
    points: 89,
  };
}

export async function getAllTeams(): Promise<Team[]> {
  return mockTeams;
}

export async function getAllPlayers(): Promise<Player[]> {
  return mockPlayers;
}
