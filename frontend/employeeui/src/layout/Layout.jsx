import React, { useState } from 'react';
import Header from '../components/common/Header';
import Sidebar from '../components/common/sidebar';
import { useLocation } from 'react-router-dom';

const { pathname } = location;

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        {pathname === "/dashboard" ? null : <div className='w-72'>  <Sidebar /> </div>}
        <div className="flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <main className="max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}    
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
