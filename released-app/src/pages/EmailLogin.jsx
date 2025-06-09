import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useAppNavigation } from '../components/Navigation';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

export default function EmailLogin() {
  const { toScanning } = useAppNavigation();

  const login = useGoogleLogin({
    flow: 'implicit',
    prompt: 'consent',
    scope: [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/gmail.settings.basic'
    ].join(' '),
    onSuccess: async tokenResponse => {
      const accessToken = tokenResponse.access_token;
      console.log("✅ Access Token:", accessToken);

      try {
        const res = await axios.post('http://localhost:5000/auth/google', {
          access_token: accessToken
        });
        const jwt = res.data.token;
        console.log("✅ Authenticated with backend. JWT:", jwt);
        localStorage.setItem('gmailAccessToken', accessToken);
        localStorage.setItem('jwt', jwt);
        toScanning();
      } catch (err) {
        console.error("❌ Backend auth failed:", err);
      }
    },
    onError: err => console.error("❌ Google login failed:", err)
  });


  return (
    <div className="h-100 d-flex flex-column bg-white p-4">
      <div className="mb-4">
        <h2 className="fs-3 fw-bold text-dark">Connect Your Email</h2>
        <p className="small text-muted">Choose your email provider to continue</p>
      </div>

      <div className="flex-grow-1">
        <div className="mb-3">
         <button
            onClick={() => login()}
            className="btn w-100 d-flex justify-content-between align-items-center border border-secondary-subtle bg-white rounded"
          >
            <div className="d-flex align-items-center">
              <div className="rounded-circle bg-danger bg-opacity-10 me-3" style={{ width: '32px', height: '32px' }}></div>
              <span className="fw-medium">Sign in with Google</span>
            </div>
            <ChevronRight size={20} className="text-secondary" />
          </button>
        </div>

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