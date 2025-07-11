document.addEventListener("DOMContentLoaded", () => {
  const username = localStorage.getItem("loggedInUser");
  const usernameDisplay = document.getElementById("username-display");
  if (username) {
    usernameDisplay.textContent = username;
  }
});