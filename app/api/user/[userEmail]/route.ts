import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const GET = async (
  req: Request,
  { params }: { params: { userEmail: string } }
) => {
  const { userEmail } = params;
  const user = await prisma?.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return null;
  }

  return NextResponse.json(user);
};
