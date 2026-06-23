import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone } = body;

    if (!fullName || !email || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const visitor = await prisma.visitor.create({
      data: {
        fullName,
        email,
        phone,
      },
    });

    return NextResponse.json({ success: true, visitor }, { status: 201 });
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
