import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';
// import { useGmailAuth } from '../auth/gmailAuth';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function EmailLogin() {
  const { toScanning } = useAppNavigation();

  const handleGoogleLogin = async (credentialResponse) => {
    const idToken = credentialResponse.credential;
    console.log("✅ Received ID Token:", idToken);

    try {
      const res = await axios.post('http://localhost:5000/auth/google', {
        token: idToken
      });
      const jwt = res.data.token;
      console.log("✅ Authenticated with backend. JWT:", jwt);
      // Optionally store JWT for authenticated requests
      localStorage.setItem('jwt', jwt);
      toScanning();
    } catch (err) {
      console.error("❌ Backend auth failed:", err);
    }
  };

  // window.localStorage.removeItem('gmailAccessToken');
  // const { toScanning } = useAppNavigation();
  // const { signIn } = useGmailAuth();

  // const handleGmail = async () => {
  //   try {
  //     await signIn();
  //     console.log("Navigating to scan");
  //     toScanning();
  //   } catch (err) {
  //     console.error('Gmail sign-in error', err);
  //     // TODO: show error toast to user
  //   }
  // };

  return (
    <div className="h-100 d-flex flex-column bg-white p-4">
      <div className="mb-4">
        <h2 className="fs-3 fw-bold text-dark">Connect your email</h2>
        <p className="small text-muted">Choose your email provider to continue</p>
      </div>

      <div className="flex-grow-1">
        <div className="mb-3">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.log("❌ Google login failed")}
            size="large"
            width="100%"
          />
        </div>
        {/* <button 
          onClick={handleGmail}
          className="btn w-100 d-flex justify-content-between align-items-center border border-secondary-subtle bg-white rounded mb-3"
        >
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-danger bg-opacity-10 me-3" style={{ width: '32px', height: '32px' }}></div>
            <span className="fw-medium">Gmail</span>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </button> */}

        <button className="btn w-100 d-flex justify-content-between align-items-center border border-secondary-subtle bg-white rounded mb-3">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-primary bg-opacity-10 me-3" style={{ width: '32px', height: '32px' }}></div>
            <span className="fw-medium">Outlook</span>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </button>

        <button className="btn w-100 d-flex justify-content-between align-items-center border border-secondary-subtle bg-white rounded mb-3">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-purple bg-opacity-10 me-3" style={{ width: '32px', height: '32px' }}></div>
            <span className="fw-medium">Yahoo Mail</span>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </button>

        <button className="btn w-100 d-flex justify-content-between align-items-center border border-secondary-subtle bg-white rounded">
          <div className="d-flex align-items-center">
            <div className="rounded-circle bg-light me-3" style={{ width: '32px', height: '32px' }}></div>
            <span className="fw-medium">Other Email Provider</span>
          </div>
          <ChevronRight size={20} className="text-secondary" />
        </button>
      </div>

      <div className="mt-4 text-center text-muted small">
        Released will securely access your emails to identify subscriptions.
        <br />We never store your email content.
      </div>
    </div>
  );
}