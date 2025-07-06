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

