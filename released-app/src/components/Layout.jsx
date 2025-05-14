import React from 'react';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="d-flex flex-column align-items-center w-100">
      <div className="bg-light rounded-4 overflow-hidden shadow-lg position-relative" style={{ width: '20rem', height: '40rem' }}>
        <Outlet />
      </div>

      <div className="mt-4 text-center text-muted small">
        Released: Unsubscribe with ease
      </div>
    </div>
  );
}

export default Layout;



// import React from 'react';
// import { Outlet } from 'react-router-dom';

// function Layout() {
//   return (
//     <div className="flex flex-col items-center w-full">
//       <div className="w-80 h-160 bg-gray-100 rounded-3xl overflow-hidden shadow-lg relative">
//         <Outlet />
//       </div>
      
//       <div className="mt-6 text-center text-sm text-gray-600">
//         Released: Unsubscribe with ease
//       </div>
//     </div>
//   );
// }

// export default Layout;