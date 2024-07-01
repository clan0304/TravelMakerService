import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between gap-1 sm:gap-10 w-full text-white font-semibold font-ubuntu">
      <Link href="/mylist" className="w-full sm:w-1/2">
        <button className="bg-black px-5 py-2 w-full rounded-md hover:scale-105">
          All Lists
        </button>
      </Link>

      <Link href="/mylist/findbylocation" className="w-full sm:w-1/2">
        <button className="bg-black px-5 py-2 w-full rounded-md hover:scale-105">
          Find by Location
        </button>
      </Link>
    </div>
  );
};

export default Sidebar;
