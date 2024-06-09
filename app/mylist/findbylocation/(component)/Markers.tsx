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
}

const Markers = ({ list, placeLat, placeLng, name }: MarkersProps) => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const position = { lat: list.lat, lng: list.lng };

  return (
    <>
      <MarkerF
        position={position}
        icon={{
          url: '/assets/bluedot.png',
          scaledSize: new google.maps.Size(15, 15),
        }}
        onClick={() => setIsShowDetail(!isShowDetail)}
      />
      {isShowDetail && (
        <OverlayView
          position={position}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
        >
          <div className="relative">
            <div className="z-30">
              <ListDetail
                list={list}
                placeLat={placeLat}
                placeLng={placeLng}
                name={name}
              />
            </div>
          </div>
        </OverlayView>
      )}
    </>
  );
};

export default Markers;
