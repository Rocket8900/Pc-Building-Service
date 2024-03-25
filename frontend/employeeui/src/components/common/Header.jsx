import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-999 bg-blue-800 flex w-full bg-dark drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="hidden sm:block mx-auto py-5">
          <a href='/dashboard' className='text-neutral-300 font-2xl font-bold'> ESDTIME ADMIN PORTAL</a>
           
        </div>

      </div>
    </header>
  );
};

export default Header;
