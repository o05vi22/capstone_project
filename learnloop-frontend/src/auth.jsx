export const getUserId = () => {
  const v = localStorage.getItem("userId");
  return v ? Number(v) : null;
};

export const isLoggedIn = () => !!getUserId();

export const logout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
};