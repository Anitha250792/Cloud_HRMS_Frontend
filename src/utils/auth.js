export const isLoggedIn = () => {
  return !!localStorage.getItem("access");
};

export const logoutUser = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  window.location.href = "/login";
};
