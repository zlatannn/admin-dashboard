const users = [
  { username: "super", password: "123", role: "superadmin" },
  { username: "admin1", password: "123", role: "admin" },
  { username: "admin2", password: "123", role: "admin" },
  { username: "viewer", password: "123", role: "viewer" }
];

function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const remember = document.getElementById("rememberMe").checked;

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
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const rememberCheckbox = document.getElementById("rememberMe");

  if (usernameInput && passwordInput && rememberCheckbox) {
    const savedUsername = localStorage.getItem("rememberedUsername");
    const savedPassword = localStorage.getItem("rememberedPassword");

    if (savedUsername) usernameInput.value = savedUsername;
    if (savedPassword) passwordInput.value = savedPassword;
    if (savedUsername || savedPassword) rememberCheckbox.checked = true;
  }

  // Dashboard logic
  const role = sessionStorage.getItem("role");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");

  const superBtn = document.getElementById("specialFunctionBtn");
  const adminList = document.getElementById("adminList");
  const changePwdSection = document.getElementById("changePasswordSection");

  if (!isLoggedIn && (superBtn || adminList)) {
    window.location.href = "login.html";
  }

  if (superBtn) {
    if (role === "superadmin") {
      superBtn.disabled = false;
      superBtn.classList.add("super-active");
      superBtn.addEventListener("click", function () {
        const isActive = adminList.classList.toggle("active");
        if (isActive) {
          renderAccounts();
          populateUserSelect();
          changePwdSection.classList.remove("hidden");
        } else {
          changePwdSection.classList.add("hidden");
        }
      });
    } else {
      superBtn.disabled = true;
    }
  }

  // Theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }
});

function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  const toggleBtn = document.querySelector(".theme-toggle");
  if (body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    toggleBtn.textContent = "☀";
    localStorage.setItem("theme", "light");
  }
}

function handleLogout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}

function renderAccounts() {
  const accounts = users.filter(u => u.role !== "superadmin");
  const list = document.getElementById("accountList");
  list.innerHTML = "";
  accounts.forEach(acc => {
    const li = document.createElement("li");
    li.textContent = `${acc.username} (${acc.role})`;
    list.appendChild(li);
  });
}

function populateUserSelect() {
  const usernames = users.filter(u => u.role !== "superadmin").map(u => u.username);
  const select = document.getElementById("userSelect");
  select.innerHTML = "";
  usernames.forEach(user => {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = user;
    select.appendChild(option);
  });
}

function changeUserPassword() {
  const user = document.getElementById("userSelect").value;
  const newPassword = document.getElementById("newPassword").value;

  if (!newPassword) {
    alert("Vui lòng nhập mật khẩu mới.");
    return;
  }

  alert(`Mật khẩu của ${user} đã được cập nhật thành: ${newPassword}`);
  document.getElementById("newPassword").value = "";
}