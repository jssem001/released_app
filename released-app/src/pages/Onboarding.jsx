import React from 'react';
import { Mail, Check } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';

export default function Onboarding() {
  const { toEmailLogin } = useAppNavigation();

  return (
    <div className="h-full flex flex-col items-center justify-between bg-white p-6">
      <div className="flex-1"></div>
      
      <div className="text-center mb-12">
        <div className="w-24 h-24 bg-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Mail size={40} color="white" />
        </div>
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Released</h1>
        <p className="text-gray-600 mb-6">Free yourself from unwanted subscriptions</p>
        
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Check size={20} className="text-green-600" />
            </div>
            <p className="text-sm text-left text-gray-700">Identify all your email subscriptions</p>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Check size={20} className="text-green-600" />
            </div>
            <p className="text-sm text-left text-gray-700">Categorize subscriptions automatically</p>
          </div>
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
              <Check size={20} className="text-green-600" />
            </div>
            <p className="text-sm text-left text-gray-700">Unsubscribe with a single tap</p>
          </div>
        </div>
      </div>
      
      <button 
        onClick={toEmailLogin}
        className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl mb-4">
        Get Started
      </button>
    </div>
  );
}