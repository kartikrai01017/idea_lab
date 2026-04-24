// In production (Vercel), VITE_API_URL is set to the Render backend URL.
// In local dev, it falls back to the local Express server.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:10000';

export const apiFetch = (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
};

