import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const teams = await prisma.favoriteTeam.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: 'desc' },
    });

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

    // Check if already favorited
    const existing = await prisma.favoriteTeam.findUnique({
      where: {
        userId_teamId: {
          userId: (session.user as any).id,
          teamId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Already favorited' },
        { status: 409 }
      );
    }

    const favorite = await prisma.favoriteTeam.create({
      data: {
        userId: (session.user as any).id,
        teamId,
        teamName,
        league: league || 'Unknown',
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error('Error creating favorite team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
