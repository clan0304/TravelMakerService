import { CafeItem } from '@/type';
import MyListItem from './MyListItem';

interface MyListContainerProps {
  myLists: CafeItem[];
}
const MyListContainer = ({ myLists }: MyListContainerProps) => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3  gap-8 px-2 z-0">
      {myLists.map((item) => (
        <div key={item.id}>
          <MyListItem item={item} listId={item.id} />
        </div>
      ))}
    </div>
  );
};

export default MyListContainer;
