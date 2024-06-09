'use client';

import React, { useEffect, useState } from 'react';
import RangeSelect from './(component)/RangeSelect';
import axios from 'axios';
import GoogleMapView from './(component)/GoogleMapView';
import { useSession } from 'next-auth/react';
import FindByLocationList from './(component)/FindByLocationList';

const FindByLocationPage = () => {
  const [radius, setRadius] = useState(1000);
  const { data: session, status } = useSession();
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [mylists, setMyLists] = useState<any[]>([]);

  console.log(mylists);

  useEffect(() => {
    if (
      status === 'authenticated' &&
      session?.user?.email &&
      lat !== 0 &&
      lng !== 0
    ) {
      getGooglePlace(radius, lat, lng, session.user.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lng, radius]);

  const getGooglePlace = async (
    radius: number,
    lat: number,
    lng: number,
    userEmail: string
  ) => {
    try {
      if (session && session.user.email) {
        const res = await axios.get(`/api/listsByLocation`, {
          params: { userEmail, radius, lat, lng },
        });
        setMyLists(res.data);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <section className="relative flex flex-col gap-5 items-center w-full mt-10">
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
