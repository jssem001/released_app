import React, { useState } from 'react';
import { useAppNavigation } from '../components/Navigation';
import { ArrowRight, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function CategoryView() {
  const { toDashboard, toUnsubscribeProcess } = useAppNavigation();
  const location = useLocation();
  // const subscriptions = location.state?.subscriptions || [];
  const { subscriptions = [], title = 'Category' } = location.state || {};


  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-100 d-flex flex-column bg-white">
      <div className="p-3 bg-danger bg-opacity-10 border-bottom border-danger-subtle">
        <div className="d-flex align-items-center mb-2">
          <button onClick={toDashboard} className="btn btn-sm btn-light me-2">
            <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} className="text-secondary" />
          </button>
          {/* <h1 className="fs-6 fw-bold mb-0">Shopping & Retail</h1> */}
          <h1 className="fs-6 fw-bold mb-0">{title}</h1>
        </div>
        {/* <p className="small text-muted mb-0">{subscriptions.length} subscriptions</p> */}
        <p className="small text-muted mb-0">{subscriptions.length} subscription{subscriptions.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="p-3 flex-grow-1 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="small text-muted mb-0">{selected.length} selected</p>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-light text-muted">Sort</button>
            <button className="btn btn-sm btn-light text-muted">Filter</button>
          </div>
        </div>

        {subscriptions.map((sub, index) => {
          const isSelected = selected.includes(sub.id);

          return (
            <div key={sub.id} className="d-flex align-items-center py-2 border-bottom">
              <div
                role="button"
                onClick={() => toggleSelect(sub.id)}
                className={`d-flex align-items-center justify-content-center rounded-circle me-3 ${isSelected ? 'bg-primary text-white' : 'border border-secondary-subtle'}`}
                style={{ width: '24px', height: '24px' }}
              >
                {isSelected && <Check size={14} />}
              </div>

              <div className="d-flex align-items-center flex-grow-1">
                <div className="rounded-circle bg-light me-3" style={{ width: '40px', height: '40px' }}></div>
                <div>
                  <p className="mb-0 fw-medium text-truncate">{sub.from}</p>
                  {/* <p className="mb-0 small text-muted">Last email: 3 days ago</p> */}
                </div>
              </div>

              {/* <button className="btn btn-sm btn-light text-secondary">Weekly</button> */}
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="p-3 border-top bg-white">
          <button
            onClick={toUnsubscribeProcess}
            className="btn btn-primary w-100 fw-medium py-2"
          >
            Unsubscribe ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}



// import React, { useState } from 'react';
// import { useAppNavigation } from '../components/Navigation';
// import { ArrowRight, Check } from 'lucide-react';

// export default function CategoryView() {
//   const { toDashboard, toUnsubscribeProcess } = useAppNavigation();
//   const [selected, setSelected] = useState([]);

//   const toggleSelect = (index) => {
//     setSelected(prev =>
//       prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
//     );
//   };

//   return (
//     <div className="h-100 d-flex flex-column bg-white">
//       <div className="p-3 bg-danger bg-opacity-10 border-bottom border-danger-subtle">
//         <div className="d-flex align-items-center mb-2">
//           <button onClick={toDashboard} className="btn btn-sm btn-light me-2">
//             <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} className="text-secondary" />
//           </button>
//           <h1 className="fs-6 fw-bold mb-0">Shopping & Retail</h1>
//         </div>
//         <p className="small text-muted mb-0">48 subscriptions</p>
//       </div>

//       <div className="p-3 flex-grow-1 overflow-auto">
//         <div className="d-flex justify-content-between align-items-center mb-3">
//           <p className="small text-muted mb-0">{selected.length} selected</p>
//           <div className="d-flex gap-2">
//             <button className="btn btn-sm btn-light text-muted">Sort</button>
//             <button className="btn btn-sm btn-light text-muted">Filter</button>
//           </div>
//         </div>

//         {[1, 2, 3, 4, 5, 6, 7].map((item, index) => {
//           const isSelected = selected.includes(index);
//           const brand = ["Amazon", "Target", "Walmart", "Best Buy", "Macy's", "Gap", "H&M"][index];

//           return (
//             <div key={index} className="d-flex align-items-center py-2 border-bottom">
//               <div
//                 role="button"
//                 onClick={() => toggleSelect(index)}
//                 className={`d-flex align-items-center justify-content-center rounded-circle me-3 ${isSelected ? 'bg-primary text-white' : 'border border-secondary-subtle'}`}
//                 style={{ width: '24px', height: '24px' }}
//               >
//                 {isSelected && <Check size={14} />}
//               </div>

//               <div className="d-flex align-items-center flex-grow-1">
//                 <div className="rounded-circle bg-light me-3" style={{ width: '40px', height: '40px' }}></div>
//                 <div>
//                   <p className="mb-0 fw-medium">{brand}</p>
//                   <p className="mb-0 small text-muted">Last email: 3 days ago</p>
//                 </div>
//               </div>

//               <button className="btn btn-sm btn-light text-secondary">Weekly</button>
//             </div>
//           );
//         })}
//       </div>

//       {selected.length > 0 && (
//         <div className="p-3 border-top bg-white">
//           <button
//             onClick={toUnsubscribeProcess}
//             className="btn btn-primary w-100 fw-medium py-2"
//           >
//             Unsubscribe ({selected.length})
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }
