import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prisma';

export async function GET() {
  const updates = await prisma.update.findMany({
    where: { userId: 'user123' },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(updates);
}

export async function POST(req: Request) {
  const { content } = await req.json();
  if (!content) {
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }
  const update = await prisma.update.create({
    data: { userId: 'user123', content },
  });
  return NextResponse.json(update, { status: 201 });
}