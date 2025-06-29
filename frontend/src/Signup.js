
import React, { useState } from 'react';
import { signup } from './api';

const inputStyle = {
  width: '100%',
  padding: '0.8rem',
  margin: '0.5rem 0',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  background: '#f7f7fa',
};

const submitStyle = {
  width: '100%',
  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  padding: '0.8rem',
  fontWeight: 600,
  fontSize: '1rem',
  marginTop: '1rem',
  cursor: 'pointer',
  boxShadow: '0 2px 8px rgba(102,126,234,0.15)',
  transition: 'background 0.3s',
};

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ email: '', fullname: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const res = await signup(form);
      setSuccess('Signup successful! Please login.');
      if (onSignup) onSignup();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ color: '#764ba2', marginBottom: '1.5rem', textAlign: 'center' }}>Sign Up</h2>
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required style={inputStyle} />
      <input name="fullname" placeholder="Full Name" value={form.fullname} onChange={handleChange} required style={inputStyle} />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required style={inputStyle} />
      <button type="submit" style={submitStyle}>Sign Up</button>
      {error && <div style={{color:'#e74c3c', marginTop:'1rem', textAlign:'center'}}>{error}</div>}
      {success && <div style={{color:'#27ae60', marginTop:'1rem', textAlign:'center'}}>{success}</div>}
    </form>
  );
}
