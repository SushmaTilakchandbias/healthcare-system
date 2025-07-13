import API from './api';

const TOKEN_KEY = 'token';

// ✅ Login: Send credentials to backend, store JWT token
export const login = async (username, password) => {
  try {
    const response = await API.post('/auth/login', { username, password });
    const token = response.data.token;

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      console.log('✅ Token saved to localStorage:', token);
    } else {
      console.error('❌ No token received from backend');
    }

    return token;
  } catch (error) {
    console.error('❌ Login error:', error.response || error.message);
    throw new Error('Login failed: ' + (error.response?.data?.message || error.message));
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
    return payload.role || payload.authorities?.[0] || null;
  } catch (error) {
    console.error("❌ Token decode error:", error);
    return null;
  }
};

// ✅ Decode token to extract user ID
export const getUserIdFromToken = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId || payload.id || payload.sub || null;
  } catch (error) {
    console.error("❌ Failed to extract user ID:", error);
    return null;
  }
};

// ✅ Check if token is expired
export const isTokenExpired = (token = getToken()) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiry = payload.exp * 1000; // Convert to ms
    return Date.now() > expiry;
  } catch (error) {
    console.error("❌ Failed to check token expiration:", error);
    return true;
  }
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  console.log('👋 Logged out and token removed');
};