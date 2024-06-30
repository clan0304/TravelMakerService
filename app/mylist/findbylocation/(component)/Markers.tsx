'use client';

import { CafeItem } from '@/type';
import { MarkerF, OverlayView } from '@react-google-maps/api';
import React, { useState } from 'react';

interface MarkersProps {
  list: CafeItem;
  placeLat: number;
  placeLng: number;
  name: string | null;
  onClick: () => void;
}

const iconMapping: { [key: string]: string } = {
  accomodation: '/assets/accomodation.png',
  cafe: '/assets/cafe.png',
  restaurant: '/assets/restaurant.png',
  attraction: '/assets/attraction.png',
  shopping: '/assets/shopping.png',
  other: '/assets/bluedot.png',
};

const Markers = ({ list, onClick }: MarkersProps) => {
  const position = { lat: list.lat, lng: list.lng };
  const iconUrl = list.type
    ? iconMapping[list.type] || '/assets/bluedot.png'
    : '/assets/bluedot.png';

  return (
    <MarkerF
      position={position}
      icon={{
        url: iconUrl,
        scaledSize: new google.maps.Size(20, 20),
      }}
      onClick={onClick}
    />
  );
};

export default Markers;
