import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock storage
const mockFavoriteTeams = new Map<string, any[]>();

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const userTeams = mockFavoriteTeams.get(userId) || [];
    const favorite = userTeams.find((t) => t.id === params.id);

    if (!favorite) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const filtered = userTeams.filter((t) => t.id !== params.id);
    mockFavoriteTeams.set(userId, filtered);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting favorite team:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
