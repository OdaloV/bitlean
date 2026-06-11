// BitLearn API client
// Set REACT_APP_API=http://localhost:8080 in .env to use the Go backend.
// Falls back to localStorage when the env var is unset.

const BASE = process.env.REACT_APP_API || '';

const post = async (path, body) => {
  if (!BASE) return null;
  const res = await fetch(BASE + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'Request failed');
  }
  return res.json();
};

export const apiSignup = (name, email, password) =>
  post('/api/signup', { name, email, password });

export const apiLogin = (email, password) =>
  post('/api/login', { email, password });

export const apiProgress = (userId, levelId, xp, badge) =>
  post('/api/progress', { userId, levelId, xp, badge });

export const apiQuestions = async (level, count = 4) => {
  if (!BASE) return null;
  const res = await fetch(`${BASE}/api/questions?level=${level}&count=${count}`);
  if (!res.ok) return null;
  return res.json();
};
