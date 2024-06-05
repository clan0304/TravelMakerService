import React from 'react';
import ListItem from './ListItem';

const ListContainer = ({ lists }: any) => {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 px-8">
      {lists.map((item: any) => (
        <div key={item.place_id}>
          <ListItem item={item} />
        </div>
      ))}
    </div>
  );
};

export default ListContainer;
