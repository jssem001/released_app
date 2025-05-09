import React from 'react';
import ReleasedAppWireframes from './components/ReleasedAppWireframes';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Released App Wireframes</h1>
        <ReleasedAppWireframes />
      </div>
    </div>
  );
}

export default App;
