import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', created_at: '' });
  const [darkMode, setDarkMode] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const jwt = localStorage.getItem('jwt');
//     if (!jwt) return navigate('/');

//     axios.get('http://localhost:5000/user/profile', {
//       headers: { Authorization: `Bearer ${jwt}` }
//     })
//     .then(res => {
//       setUser(res.data);
//       setLoading(false);
//     })
//     .catch(err => {
//       console.error('Failed to load profile:', err);
//       navigate('/');
//     });
//   }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('gmailAccessToken');
    navigate('/');
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode'); // Simplified
  };

//   if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="h-100 p-4 bg-white">
      <h2 className="fw-bold mb-4">Settings</h2>

      <div className="mb-4">
        <h5 className="fw-semibold">User Profile</h5>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
      </div>

      <div className="mb-4">
        <h5 className="fw-semibold">Preferences</h5>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="darkModeToggle"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <label className="form-check-label" htmlFor="darkModeToggle">
            Dark Mode
          </label>
        </div>
      </div>

      <div>
        <button onClick={handleLogout} className="btn btn-outline-danger">
          Log Out
        </button>
      </div>
    </div>
  );
}
