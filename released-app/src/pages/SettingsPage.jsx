import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Mail, Trello, Settings, Award, BarChart2} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppNavigation } from '../components/Navigation';

export default function SettingsPage() {
  const navigate = useNavigate();
  const {toDashboard, toPremium, toStatistics } = useAppNavigation();
  const [user, setUser] = useState({ email: '', created_at: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return navigate('/');

    axios.get('http://localhost:5000/user/profile', {
      headers: { Authorization: `Bearer ${jwt}` }
    })
      .then(res => {
        setUser(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('❌ Failed to load profile. Check CORS and token:', err);
        setLoading(false);
      });
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem('jwt');
  //   localStorage.removeItem('gmailAccessToken');
  //   navigate('/');
  // };
  const handleDelete = async () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) return;
    const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmed) return;

    try {
      await axios.delete('http://localhost:5000/user/profile', {
        headers: { Authorization: `Bearer ${jwt}` }
      });
      localStorage.removeItem('jwt');
      localStorage.removeItem('gmailAccessToken');
      navigate('/');
    } catch (err) {
      console.error("❌ Failed to delete account:", err);
      alert("Account deletion failed. Please try again.");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className="vh-100 d-flex flex-column bg-white">
      {/* Header */}
      <div className="p-3 bg-primary text-white border-bottom">
        <h2 className="fw-bold">Settings</h2>
      </div>

      {/* Main Content */}
      <div className="px-4 py-3 overflow-auto flex-grow-1">
        {loading ? (
          <p className="text-muted">Loading profile...</p>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="fs-6 fw-semibold">User Profile</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
            </div>

            <hr />

            <div className="mb-4">
              <h5 className="fs-6 fw-semibold">Preferences</h5>
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

            <hr />

            <div>
              <button onClick={handleDelete} className="btn btn-outline-danger fw-bold">
                Delete Account
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom Nav */}
      <nav className="border-top bg-white py-2 sticky-bottom">
        <div className="d-flex justify-content-around">
          <button
            onClick={toDashboard}
            className="btn d-flex flex-column align-items-center text-muted"
          >
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
          <button className="btn d-flex flex-column align-items-center text-primary">
            <Settings size={20} />
            <span className="small mt-1">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
