import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = {
      id: (session.user as any).id,
      email: session.user?.email,
      name: session.user?.name,
      role: (session.user as any).role || 'USER',
      createdAt: new Date().toISOString(),
      _count: {
        favoriteTeams: 0,
        favoritePlayers: 0,
      },
    };

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
