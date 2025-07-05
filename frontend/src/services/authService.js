import API from './api';

const TOKEN_KEY = 'token';

// Login and store token
export const login = async (username, password) => {
  try {
    const response = await API.post('/auth/login', { username, password });
    const token = response.data.token;

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    return token;
  } catch (error) {
    throw error;
  }
};

// Logout: Remove token from storage
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Get token from local storage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};
