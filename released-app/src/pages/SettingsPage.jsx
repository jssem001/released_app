import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Mail, Trello, Settings, Award, BarChart2} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppNavigation } from '../components/Navigation';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { toSettings, toDashboard } = useAppNavigation();
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

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('gmailAccessToken');
    navigate('/');
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
              <button onClick={handleLogout} className="btn btn-outline-danger fw-bold">
                Log Out
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
          <button className="btn d-flex flex-column align-items-center text-muted">
            <BarChart2 size={20} />
            <span className="small mt-1">Stats</span>
          </button>
          <button className="btn d-flex flex-column align-items-center text-muted">
            <Award size={20} />
            <span className="small mt-1">Premium</span>
          </button>
          <button
            onClick={toSettings}
            className="btn d-flex flex-column align-items-center text-primary"
          >
            <Settings size={20} />
            <span className="small mt-1">Settings</span>
          </button>
        </div>
      </nav>
    </div>
  );
}



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Mail, Trello, Settings, Award, BarChart2, ChevronRight } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAppNavigation } from '../components/Navigation';

// export default function SettingsPage() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ email: '', created_at: '' });
//   const [darkMode, setDarkMode] = useState(false);
//   const {toSettings, toDashboard} = useAppNavigation();
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
//       // console.error('Failed to load profile:', err);
//       console.error('❌ Failed to load profile. Ensure CORS is set and token is valid:', err);
//       setLoading(false);
//       // navigate('/');
//     });
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('jwt');
//     localStorage.removeItem('gmailAccessToken');
//     navigate('/');
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(prev => !prev);
//     document.body.classList.toggle('dark-mode'); // Simplified
//   };

// //   if (loading) return <div className="p-4">Loading...</div>;

//   return (
    
//     // <div className="vh-100 bg-white">
//     <div className="vh-100 d-flex flex-column bg-white">
//       {/* header */}
//       <div className="p-2 py-3 bg-primary text-white flex-shrink-0 border-bottom border-green">
//         <h2 className="fw-bold px-3">Settings</h2>
//       </div>
//       <div className="mb-4 px-4 py-2">
//         <h2 className="fs-6 fw-semibold">User Profile</h2>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Joined:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
//       </div>

//       <div className="mb-4 px-4">
//         <h5 className="fs-6 fw-semibold">Preferences</h5>
//         <div className="form-check form-switch">
//           <input
//             className="form-check-input"
//             type="checkbox"
//             role="switch"
//             id="darkModeToggle"
//             checked={darkMode}
//             onChange={toggleDarkMode}
//           />
//           <label className="form-check-label" htmlFor="darkModeToggle">
//             Dark Mode
//           </label>
//         </div>
//       </div>

//       <div className='px-4'>
//         <button onClick={handleLogout} className="btn btn-outline-danger fw-bold">
//           Log Out
//         </button>
//       </div>
//       {/* figure out a fix for this...lol */}
//       <div className="py-4"></div>
//       <div className="py-4"></div>
//       <div className="py-4"></div>
//       <div className="py-4"></div>
//       <div className="py-4"></div>
//       <div className="py-4"></div>
//       {/* bottom nav */}
//       <nav
//         className="position-sticky bottom-0 start-0 end-0 border-top bg-white"
//         style={{ zIndex: 1030 }}
//       >
//         <div className="d-flex justify-content-around py-2">
//           <button 
//             onClick={toDashboard}
//             className="btn d-flex flex-column align-items-center text-muted">
//             <Trello size={20} />
//             <span className="small mt-1">Home</span>
//           </button>
//           <button className="btn d-flex flex-column align-items-center text-muted">
//             <BarChart2 size={20} />
//             <span className="small mt-1">Stats</span>
//           </button>
//           <button className="btn d-flex flex-column align-items-center text-muted">
//             <Award size={20} />
//             <span className="small mt-1">Premium</span>
//           </button>
//           <button
//             onClick={toSettings}
//             className="btn d-flex flex-column align-items-center text-primary"
//           >
//             <Settings size={20} />
//             <span className="small mt-1">Settings</span>
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }
