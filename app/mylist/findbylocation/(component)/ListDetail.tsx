import { CafeItem } from '@/type';
import Image from 'next/image';
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface ListDetailProps {
  list: CafeItem;
  showDir?: false;
  placeLat: number;
  placeLng: number;
  name: string | null;
  onClose: () => void;
}

const ListDetail = ({
  list,
  showDir,
  placeLat,
  placeLng,
  name,
  onClose,
}: ListDetailProps) => {
  console.log(placeLat, placeLng);

  const onDirectionClick = () => {
    if (name && list.name) {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${name}&destination=${list.name}&travelmode=transit`
      );
    } else {
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${placeLat},${placeLng}&destination=${list.lat},${list.lng}&travelmode=transit`
      );
    }
  };

  return (
    <div className="absolute top-0 right-0  border-2 border-black flex flex-col rounded-lg z-30">
      <button className="absolute top-2 right-2 z-40" onClick={onClose}>
        &times;
      </button>
      <div className="w-full  relative aspect-[16/9] rounded-lg">
        <Image
          src={list.img}
          alt="List Image"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col w-full pt-2 bg-white rounded-md min-h-[200px]">
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
