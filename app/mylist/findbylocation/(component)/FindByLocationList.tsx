import { CafeItem } from '@/type';
import FindByLocationListItem from './FindByLocationListItem';

interface FindByLocationListProps {
  lists: CafeItem[];
}

const FindByLocationList = ({ lists }: FindByLocationListProps) => {
  return (
    <section className="flex flex-nowrap w-screen overflow-x-auto gap-3 px-2">
      {lists.map((item) => (
        <FindByLocationListItem key={item.id} list={item} />
      ))}
    </section>
  );
};

export default FindByLocationList;
