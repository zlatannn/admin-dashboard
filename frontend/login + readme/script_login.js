const users = [
  { username: "super", password: "123", role: "superadmin" },
  { username: "admin1", password: "123", role: "admin" },
  { username: "admin2", password: "123", role: "admin" },
  { username: "viewer", password: "123", role: "viewer" }
];

document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("rememberMe");
  const captchaCodeEl = document.getElementById("captchaCode");
  const captchaInput = document.getElementById("captchaInput");
  const refreshCaptchaBtn = document.getElementById("refreshCaptcha");

  const savedUsername = localStorage.getItem("rememberedUsername");
  const savedPassword = localStorage.getItem("rememberedPassword");

  if (savedUsername) usernameInput.value = savedUsername;
  if (savedPassword) passwordInput.value = savedPassword;
  if (savedUsername || savedPassword) rememberCheckbox.checked = true;

  function generateCaptcha() {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    captchaCodeEl.textContent = code;
    sessionStorage.setItem("captcha", code);
  }

  generateCaptcha();

  refreshCaptchaBtn.addEventListener("click", generateCaptcha);

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const remember = rememberCheckbox.checked;
    const enteredCaptcha = captchaInput.value.trim();
    const savedCaptcha = sessionStorage.getItem("captcha");

    if (enteredCaptcha !== savedCaptcha) {
      alert("Mã xác nhận không đúng!");
      generateCaptcha();
      captchaInput.value = "";
      return;
    }

    if (username === "admin" && password === "123") {
      if (remember) {
        localStorage.setItem("rememberedUsername", username);
        localStorage.setItem("rememberedPassword", password);
      } else {
        localStorage.removeItem("rememberedUsername");
        localStorage.removeItem("rememberedPassword");
      }

      sessionStorage.setItem("isLoggedIn", "true");
      window.location.href = "dashboard.html";
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  });
});
