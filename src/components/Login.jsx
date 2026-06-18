import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

export default function Login({ onSuccess }) {
  const handleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const user = {
      name: payload.name,
      email: payload.email,
      picture: payload.picture,
    };
    localStorage.setItem('user', JSON.stringify(user));
    onSuccess(user);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Internal Efficiency Tools</h1>
        <p>Sign in with your Google account to continue</p>
        <div className="login-btn-wrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => console.error('Login failed')}
            theme="filled_blue"
            size="large"
            width="280"
          />
        </div>
      </div>
    </div>
  );
}
