// src/screens/Dashboard.jsx
// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { subscriptions = [] } = useLocation().state || {};

//   const total = subscriptions.length;
//   // For now, unsubscribed count is zero; update when implementing unsubscribe flow
//   const unsubscribed = subscriptions.filter(s => s.unsubscribed).length;

//   const handleCategory = () => {
//     navigate('/category', { state: { subscriptions } });
//   };
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const subscriptions = useLocation().state || [];
  // const { state } = useLocation();              
  // const subscriptions = Array.isArray(state)     // guard in case it's undefined
  //   ? state
  //   : [];

  // Debug: see exactly what was passed
  useEffect(() => {
    console.log('🏠 Dashboard state array:', subscriptions);
  }, [subscriptions]);

  const total = subscriptions.length;
  const unsubscribed = subscriptions.filter(s => s.unsubscribed).length;

  const handleCategory = () => {
    navigate('/category-view', { state: subscriptions });
  };

  return (
    <div className="h-100 d-flex flex-column bg-white">
      {/* Header */}
      <div className="p-4 bg-primary text-white">
        <h1 className="fs-4 fw-bold mb-2">Released</h1>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="small opacity-75 mb-1">Total subscriptions</p>
            <p className="display-6 fw-bold mb-0">{total}</p>
          </div>
          <div className="text-end">
            <p className="small opacity-75 mb-1">Unsubscribed</p>
            <p className="display-6 fw-bold mb-0">{unsubscribed}</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4 flex-grow-1">
        <h2 className="fs-6 fw-semibold mb-3">Subscriptions</h2>
        <div role="button" onClick={handleCategory} className="cursor-pointer">
          {subscriptions.slice(0,5).map((sub, idx) => (
            <div key={sub.id} className="d-flex align-items-center justify-content-between p-3 mb-3 rounded bg-light-subtle">
              <div className="d-flex align-items-center">
                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                  <Mail size={20} className="text-secondary" />
                </div>
                <div>
                  <p className="mb-0 fw-medium text-truncate" style={{ maxWidth: '200px' }}>{sub.subject}</p>
                  <p className="mb-0 small text-muted">{sub.from}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted" />
            </div>
          ))}
          {total > 5 && (
            <p className="small text-primary">View all {total}</p>
          )}
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="border-top bg-white">
        <div className="d-flex justify-content-around py-3">
          <button className="btn btn-link d-flex flex-column align-items-center text-primary">
            <Trello size={20} />
            <span className="small mt-1">Home</span>
          </button>
          <button className="btn btn-link d-flex flex-column align-items-center text-muted">
            <BarChart2 size={20} />
            <span className="small mt-1">Stats</span>
          </button>
          <button className="btn btn-link d-flex flex-column align-items-center text-muted">
            <Award size={20} />
            <span className="small mt-1">Premium</span>
          </button>
          <button className="btn btn-link d-flex flex-column align-items-center text-muted">
            <Settings size={20} />
            <span className="small mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
)}


// import React from 'react';
// import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';
// import { useAppNavigation } from '../components/Navigation';

// export default function Dashboard() {
//   const { toCategoryView } = useAppNavigation();

//   return (
//     <div className="h-100 d-flex flex-column bg-white">
//       {/* Header */}
//       <div className="p-4 bg-primary text-white">
//         <h1 className="fs-4 fw-bold mb-2">Released</h1>
//         <div className="d-flex justify-content-between align-items-center">
//           <div>
//             <p className="small opacity-75 mb-1">Total subscriptions</p>
//             <p className="display-6 fw-bold mb-0">143</p>
//           </div>
//           <div className="text-end">
//             <p className="small opacity-75 mb-1">Unsubscribed</p>
//             <p className="display-6 fw-bold mb-0">26</p>
//           </div>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="p-4 flex-grow-1">
//         <h2 className="fs-6 fw-semibold mb-3">Categories</h2>

//         <div onClick={toCategoryView} role="button">
//           {/* Category blocks */}
//           {[
//             { name: 'Shopping & Retail', count: 48, color: 'danger' },
//             { name: 'News & Publications', count: 32, color: 'primary' },
//             { name: 'Entertainment', count: 27, color: 'success' },
//             { name: 'Social Media', count: 36, color: 'purple' }, // fallback to custom
//           ].map((cat, idx) => (
//             <div
//               key={cat.name}
//               className={`d-flex align-items-center justify-content-between p-3 mb-3 rounded bg-${cat.color}-subtle`}
//             >
//               <div className="d-flex align-items-center">
//                 <div className={`rounded-circle bg-${cat.color} bg-opacity-25 d-flex align-items-center justify-content-center me-3`} style={{ width: '40px', height: '40px' }}>
//                   <Mail size={20} className={`text-${cat.color}`} />
//                 </div>
//                 <div>
//                   <p className="mb-0 fw-medium">{cat.name}</p>
//                   <p className="mb-0 small text-muted">{cat.count} subscriptions</p>
//                 </div>
//               </div>
//               <ChevronRight size={20} className="text-muted" />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Nav */}
//       <div className="border-top bg-white">
//         <div className="d-flex justify-content-around py-3">
//           <button className="btn btn-link d-flex flex-column align-items-center text-primary">
//             <Trello size={20} />
//             <span className="small mt-1">Home</span>
//           </button>
//           <button className="btn btn-link d-flex flex-column align-items-center text-muted">
//             <BarChart2 size={20} />
//             <span className="small mt-1">Stats</span>
//           </button>
//           <button className="btn btn-link d-flex flex-column align-items-center text-muted">
//             <Award size={20} />
//             <span className="small mt-1">Premium</span>
//           </button>
//           <button className="btn btn-link d-flex flex-column align-items-center text-muted">
//             <Settings size={20} />
//             <span className="small mt-1">Settings</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
