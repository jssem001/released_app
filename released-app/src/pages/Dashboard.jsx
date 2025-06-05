
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';
import axios from 'axios';

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

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { state } = useLocation();
//   const subscriptions = state?.subscriptions || [];
export default function Dashboard() {
  const navigate = useNavigate();

  // ----------------------------
  // STEP 1: local state to hold subscriptions from DB
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // STEP 2: fetch from backend on mount
  useEffect(() => {
    async function fetchSubscriptions() {
      try {
        const jwt = localStorage.getItem('jwt');
        const resp = await axios.get('http://localhost:5000/subscriptions', {
          headers: { Authorization: `Bearer ${jwt}` }
        });
        setSubscriptions(resp.data); // assume resp.data is an array of { id, from, subject, unsubscribeLink, category, ... }
      } catch (err) {
        console.error('⚠️ Failed to load subscriptions:', err);
        setError('Could not load subscriptions');
      } finally {
        setLoading(false);
      }
    }
    fetchSubscriptions();
  }, []);

  // Build a map: category -> [subs]
  const byCategory = useMemo(() => {
    const map = {
      'Shopping & Retail': [],
      'News & Publications': [],
      'Entertainment': [],
      'Social Media': [],
      'Miscellaneous': [],
    };
    subscriptions.forEach(sub => {
      const cat = getCategory(sub);
      map[cat].push(sub);
    });
    return map;
  }, [subscriptions]);

  // Total / unsubscribed
  const total = subscriptions.length;
  const unsubscribed = subscriptions.filter(s => s.unsubscribed).length;

  const handleCategory = (category) => {
    navigate('/category-view', {
      state: {
        title: category,
        subscriptions: byCategory[category]
      }
    });
  };
  

  return (
    <div className="d-flex flex-column bg-white vh-100">
      {/* Header */}
      <div className="p-4 bg-primary text-white">
        <h1 className="fs-4 fw-bold mb-2">Released</h1>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <p className="small opacity-75 mb-1">Total subscriptions</p>
            <p className="display-6 fw-bold mb-0">{total}</p>
          </div>
          <div className="text-end">
            <p className="small opacity-75 mb-1">Unsubscribed</p>
            <p className="display-6 fw-bold mb-0">{unsubscribed}</p>
          </div>
        </div>
      </div>

      {/* Category blocks */}
    
      <div className="p-4 flex-grow-1 overflow-auto">
        <h2 className="fs-6 fw-semibold mb-3">Categories</h2>

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
                <p className="mb-0 small text-muted">{subs.length} subscription{subs.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-muted" />
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="border-top bg-white flex-shrink-0">
        <div className="d-flex justify-content-around py-3">
          <button className="btn btn-link d-flex flex-column align-items-center text-primary">
            <Trello size={20} />
            <span className="small mt-1">Home</span>
          </button>
          <button className="btn btn-link d-flex flex-column align-items-center text-muted">
            <BarChart2 size={20} />
            <span className="small mt-1">Stats</span>
          </button>
          <button className="btn btn-link d-flex flex-column align-items-center text-muted">
            <Award size={20} />
            <span className="small mt-1">Premium</span>
          </button>
          <button className="btn btn-link d-flex flex-column align-items-center text-muted">
            <Settings size={20} />
            <span className="small mt-1">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
