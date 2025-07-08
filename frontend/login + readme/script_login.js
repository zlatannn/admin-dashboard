const users = [
  { username: "super", password: "123", role: "superadmin" },
  { username: "admin1", password: "123", role: "admin" },
  { username: "viewer1", password: "123", role: "viewer" }
];

function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("rememberMe").checked;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    if (remember) {
      localStorage.setItem("rememberedUsername", username);
      localStorage.setItem("rememberedPassword", password);
    } else {
      localStorage.removeItem("rememberedUsername");
      localStorage.removeItem("rememberedPassword");
    }

    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("role", user.role);
    sessionStorage.setItem("username", user.username);

    window.location.href = "dashboard.html";
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("rememberMe");

  const savedUsername = localStorage.getItem("rememberedUsername");
  const savedPassword = localStorage.getItem("rememberedPassword");

  if (savedUsername) usernameInput.value = savedUsername;
  if (savedPassword) passwordInput.value = savedPassword;
  if (savedUsername || savedPassword) rememberCheckbox.checked = true;
});
