import React, { useState, useMemo } from 'react';
import { useAppNavigation } from '../components/Navigation';
import { ArrowRight, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function CategoryView() {
  const { toDashboard, toUnsubscribeProcess } = useAppNavigation();
  const location = useLocation();
  const { subscriptions = [], title = 'Category' } = location.state || {};


  const uniqueSubscriptions = useMemo(() => {
    const seen = new Set();
    return subscriptions.filter(sub => {
      const key = sub.from?.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [subscriptions]);

  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };


  const parseSender = (from) => {
    const match = from?.match(/^(.*?)\s*<(.+)>$/);
    return match ? { name: match[1].trim(), email: match[2].trim() } : { name: from, email: '' };
  };

  return (
    <div className="h-100 d-flex flex-column bg-white">
      <div className="p-3 bg-success bg-opacity-50 border-bottom border-success">
        <div className="d-flex align-items-center mb-2">
          <button onClick={toDashboard} className="btn btn-sm btn-success btn-opacity me-2 border-success">
            <ArrowRight size={20} style={{ transform: 'rotate(180deg)' }} className="" />
          </button>
          <h1 className="fs-6 fw-bold mb-0">{title}</h1>
        </div>
        <p className="small text-muted mb-0">{uniqueSubscriptions.length} subscription{uniqueSubscriptions.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="p-3 flex-grow-1 overflow-auto">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <p className="small text-muted mb-0">{selected.length} selected</p>
          <div className="d-flex gap-2">
            <button className="btn btn-sm btn-light border-secondary">Sort</button>
            <button className="btn btn-sm btn-light border-secondary">Filter</button>
          </div>
        </div>

        {uniqueSubscriptions.map((sub, index) => {
          const isSelected = selected.includes(sub.id);
          const { name, email } = parseSender(sub.from);

          return (
            <div key={sub.id} className="d-flex align-items-center py-2 border-bottom">
              <div
                role="button"
                onClick={() => toggleSelect(sub.id)}
                className={`d-flex align-items-center justify-content-center rounded-circle me-3 flex-shrink-0`}
                style={{
                  width: '24px',
                  height: '24px',
                  minWidth: '24px',
                  backgroundColor: isSelected ? '#0d6efd' : 'transparent',
                  color: isSelected ? '#fff' : '',
                  border: isSelected ? 'none' : '1px solid #ced4da'
                }}
              >
                {isSelected && <Check size={14} />}
              </div>

              <div className="d-flex align-items-center flex-grow-1">
                <div>
                  {/* <p className="mb-0 small text-muted">Last email: 3 days ago</p> */}
                  <p className="mb-0 fw-medium text-truncate">{name}</p>
                    {email && <p className="mb-0 small text-muted text-truncate">{email}</p>}
                </div>
              </div>
              {/* <button className="btn btn-sm btn-light text-secondary">Weekly</button> */}
            </div>
          );
        })}
      </div>

      {selected.length > 0 && (
        <div className="p-3 border-top bg-white">
            <button
              onClick={() => {
                const toUnsub = subscriptions.filter(sub => selected.includes(sub.id));
                console.log("🚀 Navigating to unsubscribe with:", toUnsub);
                toUnsubscribeProcess({ subscriptions: toUnsub });
              }}
              className="btn btn-primary w-100 fw-medium py-2"
            >
              Unsubscribe ({selected.length})
            </button>
        </div>
      )}
    </div>
  );
}
