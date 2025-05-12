import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all page components
import Layout from './Layout';
import Onboarding from '../pages/Onboarding';
import EmailLogin from '../pages/EmailLogin';
import Scanning from '../pages/Scanning';
import Dashboard from '../pages/Dashboard';
import CategoryView from '../pages/CategoryView';
import UnsubscribeProcess from '../pages/UnsubscribeProcess'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Onboarding />} />
          <Route path="email-login" element={<EmailLogin />} />
          <Route path="scanning" element={<Scanning />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category-view" element={<CategoryView />} />
          <Route path="unsubscribe-process" element={<UnsubscribeProcess />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;