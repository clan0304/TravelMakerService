import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export const GET = async (
  req: NextRequest,
  { params }: { params: { userEmail: string; listId: string } }
) => {
  const { userEmail } = params;
  const { listId } = params;

  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  const listItem = user.cafeList.find((item) => item.id === listId);

  if (!listItem) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(listItem);
};
