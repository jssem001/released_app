import React, { useState, useEffect } from "react";
import { RefreshCw, Check, X } from "lucide-react";
import { useAppNavigation } from "../components/Navigation";

export default function UnsubscribeProcess() {
  const { toDashboard } = useAppNavigation();  
  const [status, setStatus] = useState('processing');

  // Simulate unsubscribe process
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('complete');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-100 d-flex flex-column bg-white p-4">
      <div className="mb-4">
        <h2 className="h5 fw-bold text-dark">Unsubscribing</h2>
        <p className="small text-muted mb-0">Please wait while we process your request</p>
      </div>

      <div className="flex-grow-1">
        {status === 'processing' ? (
          <div className="d-flex flex-column gap-3">
            <UnsubRow
              name="Amazon"
              status="processing"
              icon={<RefreshCw size={16} className="text-primary spinner-border spinner-border-sm" />}
              color="primary"
              message="Processing..."
            />
            <UnsubRow
              name="Target"
              status="queued"
              icon={<RefreshCw size={16} className="text-secondary" />}
              color="secondary"
              message="Queued"
            />
            <UnsubRow
              name="Walmart"
              status="queued"
              icon={<RefreshCw size={16} className="text-secondary" />}
              color="secondary"
              message="Queued"
            />
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            <UnsubRow
              name="Amazon"
              status="done"
              icon={<Check size={16} className="text-success" />}
              color="success"
              message="Successfully unsubscribed"
            />
            <UnsubRow
              name="Target"
              status="done"
              icon={<Check size={16} className="text-success" />}
              color="success"
              message="Successfully unsubscribed"
            />
            <UnsubRow
              name="Walmart"
              status="manual"
              icon={<X size={16} className="text-warning" />}
              color="warning"
              message="Manual action required"
            />
          </div>
        )}
      </div>

      {status === 'complete' && (
        <button 
          onClick={toDashboard}
          className="btn btn-primary w-100 fw-medium mt-4"
        >
          Back to Dashboard
        </button>
      )}
    </div>
  );
}

function UnsubRow({ name, icon, color, message }) {
  return (
    <div className="d-flex align-items-center">
      <div
        className={`rounded-circle bg-${color} bg-opacity-25 d-flex align-items-center justify-content-center me-3`}
        style={{ width: '32px', height: '32px' }}
      >
        {icon}
      </div>
      <div className="flex-grow-1">
        <p className="mb-0 fw-medium">{name}</p>
        <p className={`mb-0 small text-${color}`}>{message}</p>
      </div>
    </div>
  );
}
