// src/auth/gmailAuth.js

import { useGoogleLogin } from '@react-oauth/google';

// Key under which we'll persist the token—swap to a secure store in production
const STORAGE_KEY = 'gmailAccessToken';

/**
 * Hook that returns a `signIn` function to initiate Gmail OAuth.
 * On success, stores the access token in localStorage.
 */
export function useGmailAuth() {
  const login = useGoogleLogin({
    scope: [
     'https://www.googleapis.com/auth/gmail.readonly',
     'https://www.googleapis.com/auth/gmail.settings.basic'
    ].join(' '),
    flow:  'implicit', // browser-friendly flow
    onSuccess: tokenResponse => {
      // tokenResponse.access_token is your Bearer token
      window.localStorage.setItem(STORAGE_KEY, tokenResponse.access_token);
    },
    onError: err => {
      console.error('Gmail login failed:', err);
      throw new Error('Gmail login failed');
    }
  });

  // Call this to open Google’s consent screen
  const signIn = () => login();

  return { signIn };
}

/**
 * Retrieve the stored Gmail access token.
 * Throws if none is found.
 */
export function getAccessToken() {
  const token = window.localStorage.getItem(STORAGE_KEY);
  if (!token) {
    throw new Error('No Gmail access token found; please sign in.');
  }
  console.log("Token: ", token);
  return token;
}

