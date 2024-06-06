import Photo from '@/public/assets/MainPhoto.jpg';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface MainPhotoProps {
  onSearchClick: () => void;
}

const MainPhoto: FC<MainPhotoProps> = ({ onSearchClick }) => {
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] max-h-[calc(100vh-70px)]">
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="relative w-full h-full text-center">
          <p className="absolute top-[44%] xs:top-[42%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[28px] xs:text-[9vw] font-lato whitespace-nowrap">
            Enjoy Your Time
          </p>
          <p className="absolute top-[58%] xs:top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[10px] xs:text-[4vw] font-kanit whitespace-nowrap tracking-wide">
            In a Great Place
          </p>

          <button
            onClick={onSearchClick}
            className="bg-white font-bold text-xl px-10 py-3 rounded-2xl absolute bottom-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110"
          >
            Search Lists
          </button>
        </div>
      </div>
      <Image
        src={Photo}
        alt="Main Photo"
        fill
        objectFit="cover"
        className="brightness-75"
      />
    </div>
  );
};

export default MainPhoto;
