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

    const players = await prisma.favoritePlayer.findMany({
      where: { userId: (session.user as any).id },
      orderBy: { createdAt: 'desc' },
    });

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

    // Check if already favorited
    const existing = await prisma.favoritePlayer.findUnique({
      where: {
        userId_playerId: {
          userId: (session.user as any).id,
          playerId,
        },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Already favorited' },
        { status: 409 }
      );
    }

    const favorite = await prisma.favoritePlayer.create({
      data: {
        userId: (session.user as any).id,
        playerId,
        playerName,
        team: team || 'Unknown',
        position: position || 'Unknown',
      },
    });

    return NextResponse.json(favorite, { status: 201 });
  } catch (error) {
    console.error('Error creating favorite player:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
