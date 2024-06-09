import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function GET(
  req: Request,
  { params }: { params: { userEmail: string } }
) {
  const { userEmail } = params;
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
    select: {
      cafeList: true,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user.cafeList);
}
