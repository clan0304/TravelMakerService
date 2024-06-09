import { CafeItem } from '@/type';
import Image from 'next/image';
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface ListDetailProps {
  list: CafeItem;
  showDir?: false;
  placeLat: number;
  placeLng: number;
  address: string | null;
}

const ListDetail = ({
  list,
  showDir,
  placeLat,
  placeLng,
  address,
}: ListDetailProps) => {
  console.log(placeLat, placeLng);

  const onDirectionClick = () => {
    if (address && list.address) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${address}&destination=${list.address}&travelmode=transit`
      );
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${placeLat},${placeLng}&destination=${list.lat},${list.lng}&travelmode=transit`
      );
    }
  };

  return (
    <div className="absolute top-0 right-0 min-w-[200px] max-h-[300px] border-2 border-black flex flex-col rounded-lg z-30">
      <div className="w-full  relative aspect-[16/9] rounded-lg">
        <Image
          src={list.img}
          alt="List Image"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col w-full pt-2 bg-white rounded-md">
        <p className="font-anton text-xl min-h-[40px] pl-2">{list.name}</p>
        <p className="text-sm flex gap-2 px-2">
          <FaMapMarkerAlt /> {list.address}
        </p>
        <div className="flex-grow"></div>
        <div className="flex justify-between gap-2 px-2 ">
          <p>Google: {list.rating}</p>
          <p onClick={onDirectionClick}>Direction</p>
        </div>
      </div>
    </div>
  );
};

export default ListDetail;
