import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

// In-memory mock database for Vercel deployment
const mockUsers: Map<string, any> = new Map();

// Add demo users
mockUsers.set('demo@athletix.app', {
  id: 'demo-user-1',
  email: 'demo@athletix.app',
  password: '$2a$10$fakehashedpassword', // demo123 hashed
  name: 'Demo User',
  role: 'USER',
});

mockUsers.set('admin@athletix.app', {
  id: 'demo-admin-1',
  email: 'admin@athletix.app',
  password: '$2a$10$fakehashedpassword', // admin123 hashed
  name: 'Admin User',
  role: 'ADMIN',
});

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validation
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    // Check if user already exists
    if (mockUsers.has(email)) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const userId = `user-${Date.now()}`;
    const user = {
      id: userId,
      email,
      name,
      password: hashedPassword,
      role: 'USER',
    };

    mockUsers.set(email, user);

    return NextResponse.json(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Export for use in auth
export { mockUsers };
