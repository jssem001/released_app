
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useAppNavigation } from '../components/Navigation';

// Keyword-based classifier
function getCategory(sub) {
  const text = `${sub.from} ${sub.subject}`.toLowerCase();
  if (/\b(amazon|shop|retail|store|claim|offer|buy|sale|hm)\b/.test(text)) {
    return 'Shopping & Retail';
  }
  if (/\b(news|times|daily|monthly|journal|magazine)\b/.test(text)) {
    return 'News & Publications';
  }
  if (/\b(netflix|entertain|experience|ticket|apple|movie|music)\b/.test(text)) {
    return 'Entertainment';
  }
  if (/\b(alerts|twitter|instagram|linkedin|social|snapchat)\b/.test(text)) {
    return 'Social Media';
  }
  return 'Miscellaneous';
}


export default function Dashboard() {
  const {toSettings, toPremium, toStatistics} = useAppNavigation();
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const jwt = localStorage.getItem('jwt');
        const resp = await axios.get('http://localhost:5000/subscriptions', {
          headers: { Authorization: `Bearer ${jwt}` }
        });
        setSubscriptions(resp.data); 
      } catch (err) {
        console.error('⚠️ Failed to load subscriptions:', err);
        setError('Could not load subscriptions');
      } finally {
        setLoading(false);
      }
    }
    fetchSubscriptions();
  }, []);

  const uniqueSubscriptions = useMemo(() => {
    const seen = new Map();
    subscriptions.forEach(s => {
      // use the sender string as the key, not the message id
      const key = s.from;  
      if (!seen.has(key)) seen.set(key, s);
    });
    return Array.from(seen.values());
  }, [subscriptions]);

  // Then group into categories
  const byCategory = useMemo(() => {
    const map = {
      'Shopping & Retail': [],
      'News & Publications': [],
      'Entertainment': [],
      'Social Media': [],
      'Miscellaneous': [],
    };
    uniqueSubscriptions.forEach(sub => {
      const cat = getCategory(sub);
      map[cat].push(sub);
    });
    return map;
  }, [uniqueSubscriptions]);

  // Total / unsubscribed
  const total = uniqueSubscriptions.length;
  const unsubscribed = uniqueSubscriptions.filter(s => s.unsubscribed).length;

  const handleCategory = (category) => {
    navigate('/category-view', {
      state: {
        title: category,
        subscriptions: byCategory[category]
      }
    });
  };
  
return (
  <div className="d-flex flex-column vh-100 bg-white">
    {/* Header */}
    <div className="px-2 py-2 bg-primary text-white flex-shrink-0">
      {/* <h1 className="fs-4 fw-bold mb-2">Released</h1> */}
      <div className="d-flex justify-content-between align-items-center px-2">
        <div>
          <p className="fw-bold small opacity-75 mb-1">Total Subscriptions</p>
          <p className="display-6 fw-bold mb-0">{total}</p>
        </div>
        <div className="text-end">
          <p className="fw-bold small opacity-75 mb-1">Unsubscribed</p>
          <p className="display-6 fw-bold mb-0">{unsubscribed}</p>
        </div>
      </div>
    </div>

    {/* Scrollable Category blocks */}
    <div
      className="p-2 flex-grow-1 overflow-auto"
      style={{ minHeight: 0 }}
    >
      <h2 className="fs-6 fw-semibold px-4 mb-2">Categories</h2>

      {Object.entries(byCategory).map(([category, subs]) => (
        <div
          key={category}
          role="button"
          onClick={() => handleCategory(category)}
          className="d-flex align-items-center justify-content-between p-3 mb-3 rounded bg-light-subtle"
        >
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-secondary bg-opacity-10 d-flex align-items-center justify-content-center me-3"
              style={{ width: '40px', height: '40px' }}
            >
              <Mail size={20} className="text-secondary" />
            </div>
            <div>
              <p className="mb-0 fw-medium">{category}</p>
              <p className="mb-0 small text-muted">
                {subs.length} subscription{subs.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <ChevronRight size={20} className="text-muted" />
        </div>
      ))}
    </div>

    {/* Bottom Nav */}
   <nav
    className="position-sticky bottom-0 start-0 end-0 border-top bg-white"
    style={{ zIndex: 1030 }}
   >
    <div className="d-flex justify-content-around py-2">
      <button className="btn d-flex flex-column align-items-center text-primary">
        <Trello size={20} />
        <span className="small mt-1">Home</span>
      </button>
      <button 
      onClick={toStatistics}
      className="btn d-flex flex-column align-items-center text-muted">
        <BarChart2 size={20} />
        <span className="small mt-1">Stats</span>
      </button>
      <button 
      onClick={toPremium}
      className="btn d-flex flex-column align-items-center text-muted">
        <Award size={20} />
        <span className="small mt-1">Premium</span>
      </button>
      <button
        onClick={toSettings}
        className="btn d-flex flex-column align-items-center text-muted"
      >
        <Settings size={20} />
        <span className="small mt-1">Settings</span>
      </button>
    </div>
   </nav>
  </div>
);

}
