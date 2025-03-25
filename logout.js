function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("username");
  alert("You have been logged out.");
  window.location.href = "login.html";
}
