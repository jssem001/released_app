import React from 'react';
import { Mail, Check } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';

export default function Onboarding() {
  const { toEmailLogin } = useAppNavigation();

  return (
    <div className="h-100 d-flex flex-column justify-content-between align-items-center bg-white p-4">
      <div className="flex-grow-1"></div>

      <div className="text-center mb-5">
        <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center mx-auto mb-4" style={{ width: '96px', height: '96px' }}>
          <Mail size={40} color="white" />
        </div>
        <h1 className="fs-2 fw-bold text-primary mb-2">Released</h1>
        <p className="text-muted mb-4">Free yourself from unwanted subscriptions</p>

        <div className="d-flex flex-column gap-3 mb-4">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
              <Check size={20} className="text-success" />
            </div>
            <p className="small mb-0 text-start text-body">Identify all your email subscriptions</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
              <Check size={20} className="text-success" />
            </div>
            <p className="small mb-0 text-start text-body">Categorize subscriptions automatically</p>
          </div>
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
              <Check size={20} className="text-success" />
            </div>
            <p className="small mb-0 text-start text-body">Unsubscribe with a single tap</p>
          </div>
        </div>
      </div>

      <button 
        onClick={toEmailLogin}
        className="btn btn-primary w-100 mb-3 py-2 fw-medium">
        Get Started
      </button>
    </div>
  );
}




// import React from 'react';
// import { Mail, Check } from 'lucide-react';
// import { useAppNavigation } from '../components/Navigation';

// export default function Onboarding() {
//   const { toEmailLogin } = useAppNavigation();

//   return (
//     <div className="h-full flex flex-col items-center justify-between bg-white p-6">
//       <div className="flex-1"></div>
      
//       <div className="text-center mb-12">
//         <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
//           <Mail size={40} color="white" />
//         </div>
//         <h1 className="text-3xl font-bold text-blue-600 mb-2">Released</h1>
//         <p className="text-gray-600 mb-6">Free yourself from unwanted subscriptions</p>
        
//         <div className="flex flex-col gap-4 mb-8">
//           <div className="flex items-center">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//               <Check size={20} className="text-green-600" />
//             </div>
//             <p className="text-sm text-left text-gray-700">Identify all your email subscriptions</p>
//           </div>
//           <div className="flex items-center">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//               <Check size={20} className="text-green-600" />
//             </div>
//             <p className="text-sm text-left text-gray-700">Categorize subscriptions automatically</p>
//           </div>
//           <div className="flex items-center">
//             <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
//               <Check size={20} className="text-green-600" />
//             </div>
//             <p className="text-sm text-left text-gray-700">Unsubscribe with a single tap</p>
//           </div>
//         </div>
//       </div>
      
//       <button 
//         onClick={toEmailLogin}
//         className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl mb-4">
//         Get Started
//       </button>
//     </div>
//   );
// }