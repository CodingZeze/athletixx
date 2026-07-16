import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock favorite players storage (in-memory for Vercel)
const mockFavoritePlayers = new Map<string, any[]>();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const players = mockFavoritePlayers.get(userId) || [];

    return NextResponse.json(players);
  } catch (error) {
    console.error('Error fetching favorite players:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { playerId, playerName, team, position } = await req.json();

    if (!playerId || !playerName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;
    const userPlayers = mockFavoritePlayers.get(userId) || [];

    // Check if already favorited
    if (userPlayers.some((p) => p.playerId === playerId)) {
      return NextResponse.json(
        { error: 'Already favorited' },
        { status: 409 }
      );
    }

    const favorite = {
      id: `player-${Date.now()}`,
      userId,
      playerId,
      playerName,
      team: team || 'Unknown',
      position: position || 'Unknown',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userPlayers.push(favorite);
    mockFavoritePlayers.set(userId, userPlayers);

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error('Error creating favorite player:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
