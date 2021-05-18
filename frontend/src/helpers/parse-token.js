export const parseToken = accessToken => {
  try {
    const payload = accessToken.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};
