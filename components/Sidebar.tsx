import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex justify-between gap-10 w-full">
      <Link href="/mylist" className="w-1/2">
        <button className="bg-cyan-400 px-5 py-2 w-full rounded-md hover:scale-105">
          All Lists
        </button>
      </Link>

      <Link href="/mylist/findbylocation" className="w-1/2">
        <button className="bg-cyan-400 px-5 py-2 w-full rounded-md hover:scale-105">
          Find by Location
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;