import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  // Validate required fields
  if (!email || !name || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Validate data types
  if (typeof email !== 'string' || typeof name !== 'string' || typeof password !== 'string') {
    return NextResponse.json({ error: 'Invalid data types' }, { status: 400 });
  }

  // Check for email uniqueness
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
  }

  // Hash the password
  const hashPassword = await bcrypt.hash(password, 12);

  try {
    // Create the new user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashPassword,
      },
    });

    // Return the created user
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}