import prisma from '@/libs/prisma';
import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  const body = await req.json();
  const { id, userEmail, name, address, rating, img, lng, lat } = body;

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

    let updatedCafeLists = [...(user.cafeList || [])];

    updatedCafeLists.push({ id, name, address, rating, img, lng, lat });

    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        cafeList: updatedCafeLists,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: error });
  }
};

export const DELETE = async (req: Request) => {
  const { userEmail, cafeId } = await req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' });
    }

    let updatedCafeLists = [...(user.cafeList || [])];
    updatedCafeLists = updatedCafeLists.filter((item) => item.id !== cafeId);

    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        cafeList: updatedCafeLists,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error handling DELETE:', error);
    return NextResponse.json({ error: 'Server error' });
  }
};
