
import React, { useState, useContext } from 'react';
import Signup from './Signup';
import Login from './Login';
import { AuthProvider, AuthContext } from './AuthContext';

const bgStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Poppins, sans-serif',
};

const cardStyle = {
  background: 'rgba(255,255,255,0.95)',
  borderRadius: '20px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  padding: '2.5rem 2rem',
  minWidth: '350px',
  maxWidth: '400px',
  margin: '1rem',
};

const buttonStyle = {
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '0.7rem 1.5rem',
  margin: '0.5rem',
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.3s',
  boxShadow: '0 2px 8px rgba(102,126,234,0.15)',
};

const tabButtonStyle = isActive => ({
  ...buttonStyle,
  background: isActive
    ? 'linear-gradient(90deg, #764ba2 0%, #667eea 100%)'
    : 'rgba(102,126,234,0.1)',
  color: isActive ? '#fff' : '#764ba2',
  border: isActive ? 'none' : '1px solid #764ba2',
});


function Dashboard() {
  const { user, logout } = useContext(AuthContext);
  return (
    <div style={cardStyle}>
      <h2 style={{ color: '#764ba2', marginBottom: '1.5rem' }}>Welcome,</h2>
      <div style={{ fontSize: '1.2rem', color: '#333', marginBottom: '2rem' }}>{user?.email}</div>
      <button style={buttonStyle} onClick={logout}>Logout</button>
    </div>
  );
}


function Main() {
  const { user } = useContext(AuthContext);
  const [showLogin, setShowLogin] = useState(true);

  if (user) return <Dashboard />;

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <button
          style={tabButtonStyle(showLogin)}
          onClick={() => setShowLogin(true)}
        >
          Login
        </button>
        <button
          style={tabButtonStyle(!showLogin)}
          onClick={() => setShowLogin(false)}
        >
          Sign Up
        </button>
      </div>
      {showLogin ? <Login /> : <Signup onSignup={() => setShowLogin(true)} />}
    </div>
  );
}


export default function App() {
  return (
    <div style={bgStyle}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </div>
  );
}
