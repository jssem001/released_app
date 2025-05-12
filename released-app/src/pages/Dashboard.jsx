import React from 'react';
import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';

export default function Dashboard() {
  const { toCategoryView } = useAppNavigation();

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-6 bg-blue-600 text-white">
        <h1 className="text-2xl font-bold mb-2">Released</h1>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Total subscriptions</p>
            <p className="text-3xl font-bold">143</p>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-80">Unsubscribed</p>
            <p className="text-3xl font-bold">26</p>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        
        <div onClick={toCategoryView} className="cursor-pointer">
          <div className="flex items-center justify-between mb-3 p-3 bg-red-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mr-3">
                <Mail size={20} className="text-red-600" />
              </div>
              <div>
                <p className="font-medium">Shopping & Retail</p>
                <p className="text-xs text-gray-600">48 subscriptions</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between mb-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <Mail size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">News & Publications</p>
                <p className="text-xs text-gray-600">32 subscriptions</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between mb-3 p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <Mail size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium">Entertainment</p>
                <p className="text-xs text-gray-600">27 subscriptions</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                <Mail size={20} className="text-purple-600" />
              </div>
              <div>
                <p className="font-medium">Social Media</p>
                <p className="text-xs text-gray-600">36 subscriptions</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="bg-white border-t border-gray-200">
        <div className="flex justify-around p-3">
          <button className="flex flex-col items-center">
            <Trello size={20} className="text-blue-600" />
            <span className="text-xs mt-1 text-blue-600">Home</span>
          </button>
          
          <button className="flex flex-col items-center">
            <BarChart2 size={20} className="text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Stats</span>
          </button>
          
          <button className="flex flex-col items-center">
            <Award size={20} className="text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Premium</span>
          </button>
          
          <button className="flex flex-col items-center">
            <Settings size={20} className="text-gray-400" />
            <span className="text-xs mt-1 text-gray-400">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}