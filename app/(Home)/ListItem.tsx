'use client';

import Image from 'next/image';
import Favicon from '@/app/favicon.ico';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';

import { User } from '@/type';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaHeart } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BASE_URL_PHOTO =
  'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400';

const ListItem = ({ item }: any) => {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const imageUrl =
    item && item.photos && item.photos.length > 0
      ? `${BASE_URL_PHOTO}&photo_reference=${item.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_API_KEY}`
      : Favicon;

  useEffect(() => {
    const getUserFunction = async () => {
      if (session) {
        const fetchedUser = await axios.get(`/api/user/${session.user.email}`);
        setUser(fetchedUser.data);
      }
    };
    getUserFunction();
  }, [session]);

  const isSaved = useMemo(() => {
    if (!user || !user.cafeList) {
      return null;
    }

    return user.cafeList.some((cafeItem) => cafeItem?.id === item.place_id);
  }, [item.place_id, user]);

  const toggleList = useCallback(async () => {
    if (!session || !user) {
      return null;
    }

    try {
      let request;

      if (isSaved) {
        request = async () =>
          await axios.delete('/api/lists', {
            data: { userEmail: session.user.email, cafeId: item.place_id },
          });
        toast.success('Item is Unsaved');
      } else {
        request = async () =>
          await axios.post('/api/lists', {
            id: item.place_id,
            name: item.name,
            rating: item.rating,
            address: item.formatted_address,
            img: imageUrl,
            userEmail: session.user?.email,
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
          });
        toast.success(
          <div className="flex gap-2">
            Item is Saved.{' '}
            <Link href="/mylist">
              <p className="text-blue-500 underline">View Details</p>
            </Link>
          </div>
        );
      }

      await request();

      const updatedUser = await axios.get(`/api/user/${session.user.email}`);
      setUser(updatedUser.data);
    } catch (error) {
      console.log(error);
      toast.error('Error');
    }
  }, [
    session,
    user,
    isSaved,
    item.place_id,
    item.name,
    item.rating,
    item.formatted_address,
    item.geometry.location.lat,
    item.geometry.location.lng,
    imageUrl,
  ]);

  return (
    <div className="max-w-[400px] min-h-[400px] w-full h-full border-2 border-black flex flex-col rounded-lg">
      <div className="self-center w-full h-1/2 relative aspect-[16/9] rounded-lg">
        <Image
          src={imageUrl}
          alt="List Image"
          fill
          objectFit="cover"
          className="rounded-md"
        />
        <div className="top-1 right-1 absolute">
          {session ? (
            <button type="button" onClick={toggleList}>
              <FaHeart size={25} color={`${isSaved ? 'red' : 'white'}`} />
            </button>
          ) : (
            <button type="button" onClick={() => router.push('/login')}>
              <FaHeart size={25} color="white" />
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full h-1/2 pt-2">
        <p className="font-anton text-xl min-h-[60px] pl-2">{item.name}</p>
        <p className="text-sm flex gap-2 px-2">
          <FaMapMarkerAlt className="pt-1" /> {item.formatted_address}
        </p>
        <div className="flex-grow"></div>
        <div className="flex justify-between gap-2 px-2 pb-3">
          <h3>
            <span className="text-emerald-700 font-semibold">Google</span> :{' '}
            {item.rating}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
