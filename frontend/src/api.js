// API utility for auth service
const API_BASE_URL = process.env.REACT_APP_AUTH_API_URL || 'http://localhost:8000/auth';

export async function signup({ email, fullname, password }) {
  const res = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, fullname, password })
  });
  if (!res.ok) throw new Error((await res.json()).detail || 'Signup failed');
  return res.json();
}

export async function login({ email, password }) {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error((await res.json()).detail || 'Login failed');
  return res.json();
}
