import prisma from '@/libs/prisma';

export default async function getUser(userEmail: string) {
  try {
    if (!userEmail) {
      return null;
    }
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    if (!user) {
      null;
    }

    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}
