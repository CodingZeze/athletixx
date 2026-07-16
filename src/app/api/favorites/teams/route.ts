import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock favorite teams storage (in-memory for Vercel)
const mockFavoriteTeams = new Map<string, any[]>();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const teams = mockFavoriteTeams.get(userId) || [];

    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching favorite teams:', error);
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

    const { teamId, teamName, league } = await req.json();

    if (!teamId || !teamName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const userId = (session.user as any).id;
    const userTeams = mockFavoriteTeams.get(userId) || [];

    // Check if already favorited
    if (userTeams.some((t) => t.teamId === teamId)) {
      return NextResponse.json(
        { error: 'Already favorited' },
        { status: 409 }
      );
    }

    const favorite = {
      id: `team-${Date.now()}`,
      userId,
      teamId,
      teamName,
      league: league || 'Unknown',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    userTeams.push(favorite);
    mockFavoriteTeams.set(userId, userTeams);

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error('Error creating favorite team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
