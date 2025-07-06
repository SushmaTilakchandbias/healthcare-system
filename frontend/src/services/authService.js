import API from './api';

const TOKEN_KEY = 'token';

// ✅ Login: Send credentials to backend, store JWT token
export const login = async (username, password) => {
  try {
    const response = await API.post('/auth/login', { username, password });
    const token = response.data.token;

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }

    return token;
  } catch (error) {
    throw new Error('Login failed: ' + error.response?.data || error.message);
  }
};

// ✅ Retrieve token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// ✅ Decode token to extract role (helper)
export const getUserRoleFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.role;
  } catch (error) {
    console.error("Token decode error:", error);
    return null;
  }
};

// ✅ Check if token exists
export const isAuthenticated = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem('token');
};
