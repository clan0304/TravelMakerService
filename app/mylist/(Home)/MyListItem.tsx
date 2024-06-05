'use client';

import { CafeItem, User } from '@/type';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Favicon from '@/app/favicon.ico';
import axios from 'axios';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

interface MyListItemProps {
  item: CafeItem;
}

const ListItem = ({ item }: MyListItemProps) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);

  const imageUrl = item && item.img && item.img.length > 0 ? item.img : Favicon;

  useEffect(() => {
    const getUserFunction = async () => {
      if (session) {
        const fetchedUser = await axios.get(`/api/user/${session.user.email}`);
        setUser(fetchedUser.data);
      }
    };
    getUserFunction();
  }, [session]);

  const toggleList = useCallback(async () => {
    try {
      if (!session) {
        return null;
      }
      await axios.delete('/api/lists', {
        data: { userEmail: session.user.email, cafeId: item.id },
      });

      window.location.reload();
      toast.success('Item is Unsaved');
    } catch (error) {
      console.log(error);
      toast.error('Error');
    }
  }, [session, item.id]);

  return (
    <div className="max-w-[400px] min-h-[400px] w-full h-full border-2 border-black flex flex-col rounded-lg">
      <div className="w-full h-1/2 relative aspect-[16/9] rounded-lg">
        <Image
          src={imageUrl}
          alt="List Image"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col w-full h-1/2 pt-2">
        <p className="font-anton text-xl min-h-[60px] pl-2">{item.name}</p>
        <p className="text-sm flex gap-2 px-2">
          <FaMapMarkerAlt /> {item.address}
        </p>
        <div className="flex-grow"></div>
        <div className="flex justify-between gap-2 px-2 pb-3">
          <p>Google: {item.rating}</p>
          <p>My : 0</p>
        </div>

        <button
          className=" bg-red-500 w-full py-1 rounded-b-md hover:opacity-70"
          onClick={toggleList}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ListItem;
