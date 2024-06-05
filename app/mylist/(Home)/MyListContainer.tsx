import { CafeItem } from '@/type';
import MyListItem from './MyListItem';

interface MyListContainerProps {
  myLists: CafeItem[];
}
const MyListContainer = ({ myLists }: MyListContainerProps) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-8 px-2">
      {myLists.map((item) => (
        <div key={item.id}>
          <MyListItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default MyListContainer;
