import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock user data for Vercel deployment
const mockUsers = [
  {
    id: 'mock-user-1',
    email: 'demo@athletix.app',
    name: 'Demo User',
    role: 'USER',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'mock-admin-1',
    email: 'admin@athletix.app',
    name: 'Admin User',
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
  },
];

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Return mock data
    return NextResponse.json(mockUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
