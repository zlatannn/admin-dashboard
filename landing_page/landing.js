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

//login//
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
          <li><a class="dropdown-item" href="../profile/profile.html">Thông tin cá nhân</a></li>
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

  //sign up//
  const signupBtn = document.getElementById("signup-button");
  if (loggedUser && signupBtn) {
    signupBtn.style.display = "none";
  }
});

//nop ho so//
document.addEventListener("DOMContentLoaded", () => {
  const applyBtn = document.getElementById("apply-btn");

  if (applyBtn) {
    applyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const loggedInUser = localStorage.getItem("loggedInUser");

      if (!loggedInUser) {
        alert("Bạn cần đăng nhập để thực hiện chức năng này");
      } else {
        window.location.href = "../apply/apply.html";
      }
    });
  }
});

//tra cuu ho so//
document.addEventListener("DOMContentLoaded", () => {
  const applyBtn = document.getElementById("lookup-btn");

  if (applyBtn) {
    applyBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const loggedInUser = localStorage.getItem("loggedInUser");

      if (!loggedInUser) {
        alert("Bạn cần đăng nhập để thực hiện chức năng này");
      } else {
        window.location.href = "../lookup/lookup.html";
      }
    });
  }
});

//lien he ho tro//
document.addEventListener("DOMContentLoaded", () => {
  const supportBtn = document.getElementById("contact-btn");

  if (supportBtn) {
    supportBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("Liên hệ A, SĐT: 0123 456 789 để được hỗ trợ.");
    });
  }
});