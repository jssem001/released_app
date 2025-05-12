import React from 'react';
import { Outlet } from 'react-router-dom';
// import Navigation from './Navigation';

function Layout() {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-80 h-160 bg-gray-100 rounded-3xl overflow-hidden shadow-lg relative">
        <Outlet />
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        Released: Unsubscribe with ease
      </div>
    </div>
  );
}

export default Layout;