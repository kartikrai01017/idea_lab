const API_URL = import.meta.env.VITE_API_URL || '';

export const apiFetch = (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });
};
