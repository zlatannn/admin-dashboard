//basic//
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const advToggle = document.getElementById('toggle-advanced');
  const advBox = document.getElementById('advanced-search');

  // Light/Dark toggle
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      icon.classList.remove('bi-moon-fill');
      icon.classList.add('bi-sun-fill');
    } else {
      icon.classList.remove('bi-sun-fill');
      icon.classList.add('bi-moon-fill');
    }
  });

  // Toggle advanced search box
  advToggle.addEventListener('click', () => {
    advBox.classList.toggle('d-none');
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const authContainer = document.getElementById("auth-container");
  const loggedUser = localStorage.getItem("loggedInUser");

  if (loggedUser) {
    // Xoá nội dung cũ (đăng nhập, đăng ký)
    authContainer.innerHTML = `
      <div class="dropdown">
        <a class="btn btn-success dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" id="auth-button">
          Xin chào, ${loggedUser}
        </a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#" id="logout-btn">Đăng xuất</a></li>
        </ul>
      </div>
        `;

    // Thêm sự kiện logout
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        window.location.reload();
      });
    }
  }
});

//sign up//
const signupBtn = document.getElementById("signup-button");

if (loggedUser && signupBtn) {
  signupBtn.style.display = "none";
}
