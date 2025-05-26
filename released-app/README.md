
# 📨 Released Email App

A smart inbox manager that helps users identify and unsubscribe from unwanted email subscriptions, powered by Google OAuth, Gmail API, and intelligent filters.

---

## 📁 Table of Contents

- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Setup Instructions](#setup-instructions)
  - [Frontend](#frontend-setup)
  - [Backend](#backend-setup)
- [Google Cloud Setup](#google-cloud-setup)
- [Environment Variables](#environment-variables)
- [Authentication Flow](#authentication-flow)
- [License](#license)

---

## ✅ Features

- 🔐 Google Sign-in with OAuth2
- 📬 Read Gmail inbox with scoped permissions
- 📄 Extract and analyze subscription emails
- 🔕 Automatically unsubscribe or create Gmail filters
- 📦 Persistent JWT session for backend communication
- 🌐 Cross-Origin Resource Sharing (CORS) configured for local dev

---

## 🧠 Architecture

```
Frontend (React) <--- Google ID Token / Access Token
       |
       v
Backend (Flask + SQLAlchemy)
       |
       +-- Verifies Google ID token (user identity)
       +-- Issues JWT token (for session auth)
       |
       +-- Communicates with Gmail APIs via Access Token
       |
       +-- Stores user metadata (email)
```

---

## 🛠 Tech Stack

| Layer       | Tech                     |
|-------------|--------------------------|
| Frontend    | React + Bootstrap        |
| OAuth Login | @react-oauth/google      |
| Backend     | Python Flask             |
| DB          | SQLite (via SQLAlchemy)  |
| Auth        | Google OAuth + JWT       |
| APIs        | Gmail API v1             |
| Hosting     | Localhost (dev)          |

---

## 🖼 Screenshots

| Email Login Page | Inbox Scanner | Unsubscribe Process |
|------------------|----------------|----------------------|
| ✅ Gmail Login    | 📬 Email List   | 🔕 Filtering/Unsub   |

---

## 🚀 Setup Instructions

### 1. 📦 Clone the repo

```bash
git clone https://github.com/your-username/released-app.git
cd released-app
```

---

### 2. ⚛️ Frontend Setup (`/released-app`)

```bash
cd released-app

# Install dependencies
npm install

# Start development server
npm start
```

> Make sure you’ve added your `GOOGLE_CLIENT_ID` in the `<GoogleOAuthProvider>` wrapper.

---

### 3. 🐍 Backend Setup (`/backend`)

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Run Flask server
flask run
```

> Ensure `.env` is created in the `/backend` folder.

---

## ☁️ Google Cloud Setup

1. Go to: [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Go to **OAuth Consent Screen** > External > Add Scopes:
   - `openid`
   - `email`
   - `profile`
   - `https://www.googleapis.com/auth/gmail.readonly`
   - `https://www.googleapis.com/auth/gmail.settings.basic`
4. Create OAuth 2.0 credentials (Web Application)
5. Add redirect URI: `http://localhost:3000`
6. Save the `Client ID`

---

## ⚙️ Environment Variables

### 📍 Frontend

Located in `src/index.js`:

```jsx
<GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
```

> Don't expose secret backend keys here — only public client ID.

---

### 📍 Backend (`/backend/.env`)

```env
SECRET_KEY=your-flask-secret
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-oauth-client-id
DATABASE_URL=sqlite:///app.db
```

---

## 🔐 Authentication Flow

1. User clicks **"Sign in with Google"** in the frontend
2. Google returns:
   - `access_token` (used to access Gmail API)
   - `id_token` (JWT from Google, proves identity)
3. Frontend sends `id_token` to Flask backend
4. Flask verifies the token with Google and issues **its own JWT** (`/auth/google`)
5. JWT is stored in `localStorage` for session persistence
6. Gmail `access_token` is also stored securely for API calls (in `localStorage`)
7. Subsequent inbox scanning + unsubscribe actions are performed using that access token

---

## 🧪 Sample Usage

```js
// In frontend
const idToken = credentialResponse.credential;
const accessToken = credentialResponse.access_token;

await axios.post('/auth/google', { id_token });

// Save both
localStorage.setItem('jwt', backendToken);
localStorage.setItem('gmailAccessToken', accessToken);
```

---

## 🧹 Cleanup & Todos

- [ ] Improve error messages
- [ ] Migrate from `localStorage` to `HttpOnly cookies` for tokens (production)
- [ ] Add logout functionality
- [ ] Add dashboard analytics
- [ ] Deploy to Vercel/Render

---

## 📄 License

MIT © 2025 Released Team  
_“Making inboxes lighter, one unsubscribe at a time.”_
