'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '@/public/assets/logo.png';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <div className="flex mx-3 justify-between min-h-[80px] items-center">
      <div className="hover:opacity-70">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={70} height={50} />
        </Link>
      </div>
      <div className="flex gap-2">
        <Link href={`${session?.user ? '/mylist' : '/login'}`}>
          <button className="bg-black text-white px-5 py-1 rounded-xl font-semibold hover:opacity-70">
            My List
          </button>
        </Link>
        {session?.user ? (
          <Image
            src={session.user.image!}
            alt="User Image"
            width={30}
            height={20}
            onClick={() => signOut()}
            className="rounded-full"
          />
        ) : (
          <button
            className="bg-white text-black border-black border-2 px-4 rounded-xl font-semibold hover:opacity-40"
            onClick={() => router.push('/login')}
          >
            Sign in
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
