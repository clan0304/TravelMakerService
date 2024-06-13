'use client';

import { CafeItem } from '@/type';
import { MarkerF, OverlayView } from '@react-google-maps/api';
import React, { useState } from 'react';
import ListDetail from './ListDetail';

interface MarkersProps {
  list: CafeItem;
  placeLat: number;
  placeLng: number;
  name: string | null;
  onClick: () => void;
}

const Markers = ({ list, placeLat, placeLng, name, onClick }: MarkersProps) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const position = { lat: list.lat, lng: list.lng };

  return (
    <MarkerF
      position={position}
      icon={{
        url: '/assets/bluedot.png',
        scaledSize: new google.maps.Size(15, 15),
      }}
      onClick={onClick}
    />
  );
};

export default Markers;
