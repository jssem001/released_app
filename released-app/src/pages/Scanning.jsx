import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';

export default function Scanning() {
  const [progress, setProgress] = useState(35);
  const { toDashboard } = useAppNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prevProgress => prevProgress + 5);
      } else {
        toDashboard();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [progress, toDashboard]);
  
  return (
    <div className="h-full flex flex-col items-center justify-center bg-white p-6">
      <div className="mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
          <RefreshCw size={32} className="text-blue-600 animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-800">Scanning your inbox</h2>
        <p className="text-sm text-center text-gray-600 mt-2">Identifying your subscriptions...</p>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="text-xs text-gray-500">{progress}% complete</p>
      
      <div className="mt-8 w-full">
        <div className="flex items-center mb-3 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
          <div>
            <p className="text-sm font-medium">Netflix</p>
            <p className="text-xs text-gray-500">Subscription found</p>
          </div>
        </div>
        
        <div className="flex items-center mb-3 pb-3 border-b border-gray-100">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
          <div>
            <p className="text-sm font-medium">Amazon</p>
            <p className="text-xs text-gray-500">Subscription found</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
          <div>
            <p className="text-sm font-medium">The New York Times</p>
            <p className="text-xs text-gray-500">Subscription found</p>
          </div>
        </div>
      </div>
    </div>
  );
}