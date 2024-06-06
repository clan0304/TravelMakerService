'use client';

import { CafeItem } from '@/type';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import MyListContainer from './(Home)/MyListContainer';

import Sidebar from '@/components/Sidebar';

const MyListPage = () => {
  const { data: session } = useSession();
  const [myList, setMyList] = useState<CafeItem[]>([]);

  useEffect(() => {
    const getUserLists = async () => {
      if (session && session.user && session.user.email) {
        const res = await axios.get(`/api/mylist/${session.user.email}`);
        setMyList(res.data);
      }
    };
    getUserLists();
  }, [session]);

  return (
    <main className="flex flex-col items-center w-full gap-10 px-5 mt-10">
      <section className="w-full">
        <Sidebar />
      </section>
      <section className="flex flex-1 flex-col">
        <MyListContainer myLists={myList} />
      </section>
    </main>
  );
};

export default MyListPage;
