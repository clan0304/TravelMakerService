import { NextRequest, NextResponse } from 'next/server';
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

export const PUT = async (
  req: Request,
  { params }: { params: { userEmail: string } }
) => {
  const { userEmail } = params;
  const body = await req.json();
  const { id, myRating, comment, type } = body;

  try {
    if (!userEmail) {
      return NextResponse.json({ error: 'Email is undefined or invalid.' });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid' });
    }

    const updatedCafeList = user.cafeList.map((item) =>
      item.id === id
        ? { ...item, myRating: Number(myRating), comment, type }
        : item
    );

    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        cafeList: updatedCafeList,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update CafeItem' });
  }
};
