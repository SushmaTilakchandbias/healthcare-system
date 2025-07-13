import {jwtDecode} from 'jwt-decode';

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 < Date.now(); // Token expired?
  } catch (err) {
    return true; // Token invalid
  }
}

export const getUserRoleFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    return payload.role || 'USER';
  } catch (e) {
    return null;
  }
};

export const getUserIdFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const base64Payload = token.split('.')[1];
    const payload = JSON.parse(atob(base64Payload));
    console.log("🎯 JWT Payload:", payload);
    return payload.sub || payload.userId || payload.id || null;
  } catch (e) {
    console.error("❌ Error decoding token:", e);
    return null;
  }
};

