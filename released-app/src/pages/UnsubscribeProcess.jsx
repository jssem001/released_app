import React, { useState } from "react";
import { RefreshCw, Check, X } from "lucide-react";
import { useAppNavigation } from "../components/Navigation";

export default function UnsubscribeProcess() {
  const {toDashboard} = useAppNavigation();  

  const [status, setStatus] = useState('processing');
  
  // Simulate processing
  setTimeout(() => {
    if (status === 'processing') {
      setStatus('complete');
    }
  }, 3000);
  
  return (
    <div className="h-full flex flex-col bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Unsubscribing</h2>
        <p className="text-sm text-gray-600">Please wait while we process your request</p>
      </div>
      
      <div className="flex-1">
        {status === 'processing' ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <RefreshCw size={16} className="text-blue-600 animate-spin" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Amazon</p>
                <p className="text-xs text-gray-500">Processing...</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <RefreshCw size={16} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Target</p>
                <p className="text-xs text-gray-500">Queued</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <RefreshCw size={16} className="text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Walmart</p>
                <p className="text-xs text-gray-500">Queued</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check size={16} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Amazon</p>
                <p className="text-xs text-green-600">Successfully unsubscribed</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Check size={16} className="text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Target</p>
                <p className="text-xs text-green-600">Successfully unsubscribed</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                <X size={16} className="text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Walmart</p>
                <p className="text-xs text-yellow-600">Manual action required</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {status === 'complete' && (
        <button 
          onClick={toDashboard}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl"
        >
          Back to Dashboard
        </button>
      )}
    </div>
  );
}