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

const Markers = ({ list, onClick }: MarkersProps) => {
  const position = { lat: list.lat, lng: list.lng };

  return (
    <MarkerF
      position={position}
      icon={{
        url: '/assets/bluedot.png',
        scaledSize: new google.maps.Size(20, 20),
      }}
      onClick={onClick}
    />
  );
};

export default Markers;
