// script.js

document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("rememberMe");
  const captchaCodeEl = document.getElementById("captchaCode");
  const captchaInput = document.getElementById("captchaInput");
  const refreshBtn = document.getElementById("refreshCaptcha");
  const loginForm = document.getElementById("loginForm");

  function generateCaptcha() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    captchaCodeEl.textContent = code;
    sessionStorage.setItem("captcha", code);
  }

  const savedUsername = localStorage.getItem("rememberedUsername");
  const savedPassword = localStorage.getItem("rememberedPassword");

  if (savedUsername) usernameInput.value = savedUsername;
  if (savedPassword) passwordInput.value = savedPassword;
  if (savedUsername || savedPassword) rememberCheckbox.checked = true;

  generateCaptcha();

  refreshBtn.addEventListener("click", generateCaptcha);

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;
    const enteredCaptcha = captchaInput.value.trim();
    const savedCaptcha = sessionStorage.getItem("captcha");

    if (enteredCaptcha !== savedCaptcha) {
      alert("Mã xác nhận không đúng!");
      generateCaptcha();
      return;
    }

    const users = [
      { username: "super", password: "123", role: "superadmin" },
      { username: "admin1", password: "123", role: "admin" },
      { username: "admin2", password: "123", role: "admin" },
      { username: "viewer", password: "123", role: "viewer" }
    ];

    const user = users.find(u => u.username === username && u.password === password);

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
      generateCaptcha(); // 🔄 Tự động làm mới captcha nếu đăng nhập sai
    }
  });
});


