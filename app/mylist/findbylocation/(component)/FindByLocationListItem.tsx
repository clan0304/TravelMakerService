import { CafeItem } from '@/type';
import Image from 'next/image';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface FindByLocationListItemProps {
  list: CafeItem;
}

const FindByLocationListItem = ({ list }: FindByLocationListItemProps) => {
  return (
    <div className="w-[200px] h-[300px]  border-2 border-black flex flex-col rounded-lg">
      <div className="w-full  relative aspect-[16/9] rounded-lg">
        <Image
          src={list.img}
          alt="List Image"
          fill
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col w-full pt-2 flex-grow">
        <p className="font-anton text-xl min-h-[60px] pl-2">{list.name}</p>
        <p className="text-sm flex gap-2 px-2">
          <FaMapMarkerAlt /> {list.address}
        </p>
        <div className="flex-grow"></div>
        <div className="flex justify-between gap-2 px-2 pb-1">
          <p>Google: {list.rating}</p>
          <p>My : 0</p>
        </div>
      </div>
    </div>
  );
};

export default FindByLocationListItem;
