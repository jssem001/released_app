import { useState } from 'react';
import { Mail, Trello, Settings, Award, BarChart2, ChevronRight, Check, X, ArrowRight, RefreshCw } from 'lucide-react';

export default function ReleasedAppWireframes() {
  const [currentScreen, setCurrentScreen] = useState('onboarding');

  const screens = {
    onboarding: <OnboardingScreen navigate={setCurrentScreen} />,
    emailLogin: <EmailLoginScreen navigate={setCurrentScreen} />,
    scanning: <ScanningScreen navigate={setCurrentScreen} />,
    dashboard: <DashboardScreen navigate={setCurrentScreen} />,
    categoryView: <CategoryViewScreen navigate={setCurrentScreen} />,
    unsubscribeProcess: <UnsubscribeProcessScreen navigate={setCurrentScreen} />
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-80 h-160 bg-gray-100 rounded-3xl overflow-hidden shadow-lg relative">
        {screens[currentScreen]}
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-600">
        Click through the wireframes to see the different screens
      </div>
    </div>
  );
}

function OnboardingScreen({ navigate }) {
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
        onClick={() => navigate('emailLogin')}
        className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl mb-4">
        Get Started
      </button>
    </div>
  );
}

function EmailLoginScreen({ navigate }) {
  return (
    <div className="h-full flex flex-col bg-white p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Connect your email</h2>
        <p className="text-sm text-gray-600">Choose your email provider to continue</p>
      </div>
      
      <div className="flex-1">
        <button 
          onClick={() => navigate('scanning')}
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

function ScanningScreen({ navigate }) {
  const [progress, setProgress] = useState(35);
  
  // Simulate progress
  setTimeout(() => {
    if (progress < 100) {
      setProgress(progress + 5);
    } else {
      navigate('dashboard');
    }
  }, 500);
  
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

function DashboardScreen({ navigate }) {
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
        
        <div onClick={() => navigate('categoryView')} className="cursor-pointer">
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

function CategoryViewScreen({ navigate }) {
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
          <button onClick={() => navigate('dashboard')} className="mr-2">
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
            onClick={() => navigate('unsubscribeProcess')}
            className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl"
          >
            Unsubscribe ({selected.length})
          </button>
        </div>
      )}
    </div>
  );
}

function UnsubscribeProcessScreen({ navigate }) {
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
          onClick={() => navigate('dashboard')}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl"
        >
          Back to Dashboard
        </button>
      )}
    </div>
  );
}