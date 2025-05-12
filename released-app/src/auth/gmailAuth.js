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
    // scope: 'https://www.googleapis.com/auth/gmail.metadata',
    scope: 'https://www.googleapis.com/auth/gmail.readonly',
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




// // src/auth/gmailAuth.js

// import * as AuthSession from 'expo-auth-session';
// import * as Crypto from 'expo-crypto';
// import * as Random from 'expo-random';
// import * as SecureStore from 'expo-secure-store';

// /**
//  * === Step 2: OAuth2 config ===
//  */

// // Replace with your Web client ID from Google Cloud Console
// const CLIENT_ID = '<YOUR_WEB_CLIENT_ID>.apps.googleusercontent.com';

// // expo-auth-session will generate the proper redirect URI for mobile or web
// const REDIRECT_URI = AuthSession.makeRedirectUri({
//   useProxy: true,
// });

// const SCOPES = [
//   // minimal for headers/metadata; use gmail.readonly if you need bodies too
//   'https://www.googleapis.com/auth/gmail.metadata',
// ];

// const discovery = {
//   authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
//   tokenEndpoint:         'https://oauth2.googleapis.com/token',
// };

// /**
//  * === Step 3: PKCE helpers ===
//  */
// async function generatePKCE() {
//   // 1) Create a random code verifier
//   const randomBytes = await Random.getRandomBytesAsync(32);
//   const verifier = randomBytes
//     .map(b => b.toString(16).padStart(2, '0'))
//     .join('');

//   // 2) SHA256-hash & base64-url-encode it to get the challenge
//   const digest = await Crypto.digestStringAsync(
//     Crypto.CryptoDigestAlgorithm.SHA256,
//     verifier,
//     { encoding: Crypto.CryptoEncoding.BASE64 }
//   );
//   const challenge = digest
//     .replace(/\+/g, '-')
//     .replace(/\//g, '_')
//     .replace(/=+$/, '');

//   return { verifier, challenge };
// }

// /**
//  * === Step 4: signInWithGmail() ===
//  * - launches the Google OAuth flow
//  * - exchanges the code for tokens
//  * - securely stores tokens in Expo SecureStore
//  */
// export async function signInWithGmail() {
//   // 1) Build PKCE verifier & challenge
//   const { verifier, challenge } = await generatePKCE();

//   // 2) Configure the AuthRequest
//   const authRequest = new AuthSession.AuthRequest({
//     clientId:            CLIENT_ID,
//     redirectUri:         REDIRECT_URI,
//     scopes:              SCOPES,
//     usePKCE:             true,
//     codeChallenge:       challenge,
//     codeChallengeMethod: 'S256',
//   });

//   // 3) Prepare the request URL
//   await authRequest.makeAuthUrlAsync(discovery);

//   // 4) Prompt the user to sign in
//   const result = await authRequest.promptAsync(discovery, { useProxy: true });
//   if (result.type !== 'success') {
//     throw new Error('Authentication canceled or failed');
//   }

//   // 5) Exchange the auth code for access & refresh tokens
//   const tokenResult = await AuthSession.exchangeCodeAsync(
//     {
//       clientId:     CLIENT_ID,
//       code:         result.params.code,
//       redirectUri:  REDIRECT_URI,
//       extraParams:  { code_verifier: verifier },
//     },
//     discovery
//   );

//   // 6) Securely store the tokens
//   await SecureStore.setItemAsync('gmailTokens', JSON.stringify(tokenResult));

//   return tokenResult;
// }

// /**
//  * Optional helper for later: retrieve stored tokens
//  */
// export async function getStoredTokens() {
//   const json = await SecureStore.getItemAsync('gmailTokens');
//   return json ? JSON.parse(json) : null;
// }
