'use client';

import React, { useEffect, useState } from 'react';
import RangeSelect from './(component)/RangeSelect';
import GoogleMapView from './(component)/GoogleMapView';
import { useSession } from 'next-auth/react';
import FindByLocationList from './(component)/FindByLocationList';
import Sidebar from '@/components/Sidebar';

async function fetchListByLocation(
  userEmail: string,
  radius: number,
  lat: number,
  lng: number
) {
  const res = await fetch(
    `/api/listsByLocation?userEmail=${userEmail}&radius=${radius}&lat=${lat}&lng=${lng}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch');
  }
  return res.json();
}

const FindByLocationPage = () => {
  const [radius, setRadius] = useState(5000);
  const { data: session, status } = useSession();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [mylists, setMyLists] = useState<any[]>([]);

  useEffect(() => {
    if (
      status === 'authenticated' &&
      session?.user?.email &&
      lat !== 0 &&
      lng !== 0
    ) {
      fetchListByLocation(session.user.email, radius, lat, lng)
        .then(setMyLists)
        .catch(console.error);
    }
  }, [lat, lng, radius, session, status]);

  return (
    <section className="relative flex flex-col gap-10 items-center w-full mt-10 px-5">
      <Sidebar />
      <RangeSelect onRadiusChange={(value: number) => setRadius(value)} />
      <GoogleMapView
        onLatChange={(value: number) => setLat(value)}
        onLngChange={(value: number) => setLng(value)}
        lists={mylists}
        lat={lat}
        lng={lng}
      />
      <FindByLocationList lists={mylists} />
    </section>
  );
};

export default FindByLocationPage;
