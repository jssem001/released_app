import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';
import { useGmailAuth } from '../auth/gmailAuth';

export default function EmailLogin() {
  const { toScanning } = useAppNavigation();
  const { signIn } = useGmailAuth();

  const handleGmail = async () => {
    try {
      await signIn();
      console.log("Navigating to scan")
      toScanning();
    } catch (err) {
      console.error('Gmail sign-in error', err);
      // TODO: show error toast to user
    }
  };

  return (
    <div className="h-full flex flex-col bg-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Connect your email</h2>
        <p className="text-sm text-gray-600">Choose your email provider to continue</p>
      </div>
      
      <div className="flex-1">
        <button 
          onClick={handleGmail}
          className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 mb-3 hover:bg-gray-50">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-red-100 rounded-full mr-3"></div>
            <span className="font-medium">Gmail</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full mr-3"></div>
            <span className="font-medium">Outlook</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full mr-3"></div>
            <span className="font-medium">Yahoo Mail</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
        
        <button className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-100 rounded-full mr-3"></div>
            <span className="font-medium">Other Email Provider</span>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </button>
      </div>
      
      <div className="mt-6 text-xs text-center text-gray-500">
        Released will securely access your emails to identify subscriptions.
        <br/>We never store your email content.
      </div>
    </div>
  );
}

// import React from 'react';
// import { ChevronRight } from 'lucide-react';
// import { useAppNavigation } from '../components/Navigation';

// export default function EmailLogin() {
//   const { toScanning } = useAppNavigation();

//   return (
//     <div className="h-full flex flex-col bg-white p-6">
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Connect your email</h2>
//         <p className="text-sm text-gray-600">Choose your email provider to continue</p>
//       </div>
      
//       <div className="flex-1">
//         <button 
//           onClick={toScanning}
//           className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 mb-3 hover:bg-gray-50">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-red-100 rounded-full mr-3"></div>
//             <span className="font-medium">Gmail</span>
//           </div>
//           <ChevronRight size={20} className="text-gray-400" />
//         </button>
        
//         <button className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 mb-3">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-blue-100 rounded-full mr-3"></div>
//             <span className="font-medium">Outlook</span>
//           </div>
//           <ChevronRight size={20} className="text-gray-400" />
//         </button>
        
//         <button className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4 mb-3">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-purple-100 rounded-full mr-3"></div>
//             <span className="font-medium">Yahoo Mail</span>
//           </div>
//           <ChevronRight size={20} className="text-gray-400" />
//         </button>
        
//         <button className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-lg p-4">
//           <div className="flex items-center">
//             <div className="w-8 h-8 bg-gray-100 rounded-full mr-3"></div>
//             <span className="font-medium">Other Email Provider</span>
//           </div>
//           <ChevronRight size={20} className="text-gray-400" />
//         </button>
//       </div>
      
//       <div className="mt-6 text-xs text-center text-gray-500">
//         Released will securely access your emails to identify subscriptions.
//         <br/>We never store your email content.
//       </div>
//     </div>
//   );
// }