export function getToken() {
  return localStorage.getItem("access");
}

export function getRole() {
  return localStorage.getItem("role");
}

export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

export function logout() {
  localStorage.clear();
  window.location.replace("/#/login");
}
