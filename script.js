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

function handleLogout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}

function toggleDarkMode() {
  const body = document.body;
  const btn = document.querySelector(".theme-toggle");
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    btn.textContent = "🌙";
    localStorage.setItem("theme", "dark");
  } else {
    btn.textContent = "☀";
    localStorage.setItem("theme", "light");
  }
}

function toggleDropdown(id) {
  const dropdown = document.getElementById(id);
  dropdown.classList.toggle("hidden");
}

function toggleAdminList() {
  const role = sessionStorage.getItem("role");
  const adminBtn = document.getElementById("specialFunctionBtn");
  const content = document.getElementById("mainContent");

  if (role === "superadmin") {
    const list = users.filter(u => u.role !== "superadmin").map(u => `<li>${u.username} (${u.role})</li>`).join("");
    content.innerHTML = `
      <h3>Danh sách tài khoản</h3>
      <ul>${list}</ul>
      <div id="changePasswordSection">
        <h4>Đổi mật khẩu người dùng</h4>
        <label for="userSelect">Chọn người dùng:</label>
        <select id="userSelect">
          ${users.filter(u => u.role !== "superadmin").map(u => `<option value="${u.username}">${u.username}</option>`).join("")}
        </select>
        <label for="newPassword">Mật khẩu mới:</label>
        <input type="password" id="newPassword" placeholder="Nhập mật khẩu mới">
        <button onclick="changeUserPassword()">Cập nhật mật khẩu</button>
      </div>
    `;
  }
}

function changeUserPassword() {
  const username = document.getElementById("userSelect").value;
  const newPassword = document.getElementById("newPassword").value;

  if (!newPassword) {
    alert("Vui lòng nhập mật khẩu mới.");
    return;
  }

  const user = users.find(u => u.username === username);
  if (user) {
    user.password = newPassword;
    alert(`Đã cập nhật mật khẩu cho ${username}`);
    document.getElementById("newPassword").value = "";
  }
}

function showPanel() {
  document.getElementById("mainContent").innerHTML = `<h3>Bảng điều khiển</h3><p>Hiển thị thống kê tổng quan...</p>`;
}

function showDocuments(type) {
  const label = type === "in" ? "Văn bản đến" : "Văn bản đi";
  document.getElementById("mainContent").innerHTML = `<h3>${label}</h3><p>Nội dung ${label.toLowerCase()} sẽ hiển thị ở đây.</p>`;
}

function showTasks(type) {
  const label = type === "pending" ? "Hồ sơ chờ" : "Hồ sơ hoàn tất";
  document.getElementById("mainContent").innerHTML = `<h3>${label}</h3><p>Nội dung ${label.toLowerCase()} sẽ hiển thị ở đây.</p>`;
}

function showCalendar() {
  document.getElementById("mainContent").innerHTML = `<h3>Lịch làm việc</h3><p>Lịch sẽ hiển thị tại đây.</p>`;
}

function showContacts() {
  document.getElementById("mainContent").innerHTML = `<h3>Danh bạ điện tử</h3><p>Thông tin liên hệ sẽ hiển thị ở đây.</p>`;
}

function showPersonalInfo() {
  const username = sessionStorage.getItem("username") || "";
  const role = sessionStorage.getItem("role") || "";
  document.getElementById("mainContent").innerHTML = `<h3>Thông tin cá nhân</h3><p>Tài khoản: <b>${username}</b><br>Quyền: <b>${role}</b></p>`;
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

  const role = sessionStorage.getItem("role");
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const username = sessionStorage.getItem("username");
  const userDisplay = document.getElementById("currentUser");
  const specialBtn = document.getElementById("specialFunctionBtn");

  if (!isLoggedIn) {
    if (window.location.pathname.includes("dashboard.html")) {
      window.location.href = "login.html";
    }
    return;
  }

  if (userDisplay) userDisplay.textContent = username;
  if (specialBtn && role === "superadmin") {
    specialBtn.disabled = false;
  }

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    const toggleBtn = document.querySelector(".theme-toggle");
    if (toggleBtn) toggleBtn.textContent = "🌙";
  }
});