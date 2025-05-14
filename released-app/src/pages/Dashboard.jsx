
import React, { useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';

// Simple keyword-based classifier
function getCategory(sub) {
  const text = `${sub.from} ${sub.subject}`.toLowerCase();
  if (/\b(amazon|shop|retail|store|target|walmart|best buy|gap|hm)\b/.test(text)) {
    return 'Shopping & Retail';
  }
  if (/\b(news|times|daily|press|journal|magazine)\b/.test(text)) {
    return 'News & Publications';
  }
  if (/\b(netflix|entertain|hulu|prime|spotify|movie|music)\b/.test(text)) {
    return 'Entertainment';
  }
  if (/\b(facebook|twitter|instagram|linkedin|social|snapchat)\b/.test(text)) {
    return 'Social Media';
  }
  return 'Miscellaneous';
}

export default function Dashboard() {
  const navigate = useNavigate();
  const subscriptions = useLocation().state || [];

  // Build a map: category -> [subs]
  const byCategory = useMemo(() => {
    const map = {
      'Shopping & Retail': [],
      'News & Publications': [],
      Entertainment: [],
      'Social Media': [],
      Miscellaneous: [],
    };
    subscriptions.forEach(sub => {
      const cat = getCategory(sub);
      map[cat].push(sub);
    });
    return map;
  }, [subscriptions]);

  // Total / unsubscribed
  const total = subscriptions.length;
  const unsubscribed = subscriptions.filter(s => s.unsubscribed).length;

  // Navigate to category view with only that category’s items
  const handleCategory = (category) => {
    navigate('/category-view', { state: byCategory[category] });
  };

  return (
    // <div className="h-100 d-flex flex-column bg-white">
    <div className="d-flex flex-column bg-white vh-100">
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

      {/* Category blocks */}
      {/* <div className="p-4 flex-grow-1"> */}
      <div className="p-4 flex-grow-1 overflow-auto">
        <h2 className="fs-6 fw-semibold mb-3">Categories</h2>

        {Object.entries(byCategory).map(([category, subs]) => (
          <div
            key={category}
            role="button"
            onClick={() => handleCategory(category)}
            className="d-flex align-items-center justify-content-between p-3 mb-3 rounded bg-light-subtle"
          >
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
                style={{ width: '40px', height: '40px' }}
              >
                <Mail size={20} className="text-secondary" />
              </div>
              <div>
                <p className="mb-0 fw-medium">{category}</p>
                <p className="mb-0 small text-muted">{subs.length} subscription{subs.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted" />
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="border-top bg-white flex-shrink-0">
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
  );
}






// import React, { useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const subscriptions = useLocation().state || [];

//   // Debug: see exactly what was passed
//   useEffect(() => {
//     console.log('🏠 Dashboard state array:', subscriptions);
//   }, [subscriptions]);

//   const total = subscriptions.length;
//   const unsubscribed = subscriptions.filter(s => s.unsubscribed).length;

//   const handleCategory = () => {
//     navigate('/category-view', { state: subscriptions });
//   };

//   return (
//     <div className="h-100 d-flex flex-column bg-white">
//       {/* Header */}
//       <div className="p-4 bg-primary text-white">
//         <h1 className="fs-4 fw-bold mb-2">Released</h1>
//         <div className="d-flex justify-content-between align-items-center">
//           <div>
//             <p className="small opacity-75 mb-1">Total subscriptions</p>
//             <p className="display-6 fw-bold mb-0">{total}</p>
//           </div>
//           <div className="text-end">
//             <p className="small opacity-75 mb-1">Unsubscribed</p>
//             <p className="display-6 fw-bold mb-0">{unsubscribed}</p>
//           </div>
//         </div>
//       </div>

//       {/* Categories */}
//       <div className="p-4 flex-grow-1">
//         <h2 className="fs-6 fw-semibold mb-3">Subscriptions</h2>
//         <div role="button" onClick={handleCategory} className="cursor-pointer">
//           {subscriptions.slice(0,5).map((sub, idx) => (
//             <div key={sub.id} className="d-flex align-items-center justify-content-between p-3 mb-3 rounded bg-light-subtle">
//               <div className="d-flex align-items-center">
//                 <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
//                   <Mail size={20} className="text-secondary" />
//                 </div>
//                 <div>
//                   <p className="mb-0 fw-medium text-truncate" style={{ maxWidth: '200px' }}>{sub.subject}</p>
//                   <p className="mb-0 small text-muted">{sub.from}</p>
//                 </div>
//               </div>
//               <ChevronRight size={20} className="text-muted" />
//             </div>
//           ))}
//           {total > 5 && (
//             <p className="small text-primary">View all {total}</p>
//           )}
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
// )}


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
