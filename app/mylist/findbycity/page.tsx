'use client';

import Sidebar from '@/components/Sidebar';
import React, { useEffect, useState } from 'react';
import GoogleMapView from './(Components)/GoogleMapView';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { CafeItem } from '@/type';

const FindByCity = () => {
  const [townName, setTownName] = useState('');
  const [list, setList] = useState<any[]>([]);
  const { data: session } = useSession();

  console.log(list);

  const handleTownNameChange = (newTownName: string) => {
    setTownName(newTownName);
  };

  useEffect(() => {
    if (townName) {
      const fetchListByCity = async (townName: string) => {
        try {
          const [googleResponse, listResponse] = await Promise.all([
            axios.get(`/api/google-place-api?q=${townName}`),
            axios.get(`/api/lists/${session?.user.email}`),
          ]);

          const googleList = googleResponse.data.resp.results;
          const userList = listResponse.data;

          console.log(googleList);
          console.log(userList);

          if (googleList && userList) {
            const matched: CafeItem[] = googleList.flatMap((item: any) =>
              userList.filter((list: CafeItem) => item.place_id === list.id)
            );
            console.log(matched);
          }
        } catch (error: any) {
          console.log(error);
        }
      };
      fetchListByCity(townName);
    }
  }, [session?.user.email, townName]);

  return (
    <main className="flex w-full gap-10 mx-5">
      <section className="max-w-[33%] flex items-center">
        <Sidebar />
      </section>
      <section className="flex flex-1 flex-col">
        <GoogleMapView onTownNameChange={handleTownNameChange} />
      </section>
    </main>
  );
};

export default FindByCity;
