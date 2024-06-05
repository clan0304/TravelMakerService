'use client';

import { CafeItem } from '@/type';
import { MarkerF } from '@react-google-maps/api';
import React, { useState } from 'react';

interface MarkersProps {
  list: CafeItem;
}

const Markers = ({ list }: MarkersProps) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const position = { lat: list.lat, lng: list.lng };
  return (
    <div>
      <MarkerF
        position={position}
        icon={{
          url: '/assets/marker.png',
          scaledSize: new google.maps.Size(30, 30),
        }}
      />
    </div>
  );
};

export default Markers;
