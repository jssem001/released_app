import React, { useState } from 'react';
import { useAppNavigation } from '../components/Navigation';
import { ArrowRight, Check } from 'lucide-react';

export default function CategoryView() {
  const { toDashboard } = useAppNavigation();
  const {toUnsubscribeProcess} =useAppNavigation();

  const [selected, setSelected] = useState([]);
  
  const toggleSelect = (index) => {
    if (selected.includes(index)) {
      setSelected(selected.filter(i => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="p-4 bg-red-50 border-b border-red-100">
        <div className="flex items-center mb-2">
          <button onClick={toDashboard} className="mr-2">
            <ArrowRight size={20} className="transform rotate-180 text-gray-600" />
          </button>
          <h1 className="text-lg font-bold">Shopping & Retail</h1>
        </div>
        <p className="text-sm text-gray-600">48 subscriptions</p>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">{selected.length} selected</p>
          <div className="flex gap-2">
            <button className="text-xs bg-gray-200 px-3 py-1 rounded-full">Sort</button>
            <button className="text-xs bg-gray-200 px-3 py-1 rounded-full">Filter</button>
          </div>
        </div>
        
        {[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
          <div key={index} className="flex items-center p-3 border-b border-gray-100">
            <div 
              onClick={() => toggleSelect(index)}
              className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${selected.includes(index) ? 'bg-blue-600' : 'border border-gray-300'}`}
            >
              {selected.includes(index) && <Check size={14} className="text-white" />}
            </div>
            <div className="flex-1 flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
              <div>
                <p className="font-medium">{["Amazon", "Target", "Walmart", "Best Buy", "Macy's", "Gap", "H&M"][index]}</p>
                <p className="text-xs text-gray-500">Last email: 3 days ago</p>
              </div>
            </div>
            <button className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600">Weekly</button>
          </div>
        ))}
      </div>
      
      {selected.length > 0 && (
        <div className="p-4 bg-white border-t border-gray-200">
          <button 
            onClick={toUnsubscribeProcess}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl"
          >
            Unsubscribe ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}