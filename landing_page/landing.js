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
        <button class="btn btn-success dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" id="auth-button">
          Xin chào, ${loggedUser}
        </button>
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

//goi y tim kiem//
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("suggestions");
  const clearBtn = document.getElementById("clear-search");

  const services = [
    "Cấp giấy khai sinh",
    "Gia hạn hộ chiếu",
    "Cấp giấy đăng ký kinh doanh",
    "Đăng ký thường trú",
    "Cấp giấy phép xây dựng",
    "Nộp thuế điện tử",
    "Tra cứu hồ sơ",
    "Xin cấp chứng chỉ hành nghề",
    "Cấp thẻ BHYT",
    "Tạm trú tạm vắng"
  ];

  function showSuggestions(query = "") {
  suggestionsBox.innerHTML = "";
  const matched = services.filter(item =>
    item.toLowerCase().includes(query)
  );

  matched.forEach(match => {
    const item = document.createElement("a");
    item.classList.add("list-group-item", "list-group-item-action");
    item.href = "#";

    // Highlight phần khớp
    if (query) {
      const regex = new RegExp(`(${query})`, "gi");
      const highlighted = match.replace(regex, `<span class="highlight">$1</span>`);
      item.innerHTML = highlighted;
    } else {
      item.textContent = match;
    }

    item.addEventListener("click", (e) => {
      e.preventDefault();
      searchInput.value = match;
      suggestionsBox.innerHTML = "";
      clearBtn.style.display = "block";
    });

    suggestionsBox.appendChild(item);
  });
}

  // Khi người dùng gõ vào input
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    showSuggestions(query);
    clearBtn.style.display = query ? "block" : "none";
  });

  // Khi input được focus → hiển thị tất cả gợi ý
  searchInput.addEventListener("focus", () => {
    showSuggestions(searchInput.value.trim().toLowerCase());
  });

  // Click nút xoá
  clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    clearBtn.style.display = "none";
    suggestionsBox.innerHTML = "";
    searchInput.focus();
  });

  // Click ra ngoài → ẩn gợi ý
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
      suggestionsBox.innerHTML = "";
    }
  });
});

//toggle search in home//
document.getElementById("nav-home").addEventListener("click", function (e) {
  e.preventDefault();
  const section = document.getElementById("home-section");
  if (section.style.display === "none" || !section.style.display) {
    section.style.display = "block";
  } else {
    section.style.display = "none";
  }
});

//strip//
const newsItems = document.querySelector('.news-items');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let scrollPos = 0;
const itemWidth = 160; // Độ rộng trung bình mỗi mục tin + khoảng cách

prevBtn.addEventListener('click', () => {
  scrollPos = Math.max(scrollPos - itemWidth, 0);
  newsItems.style.transform = `translateX(-${scrollPos}px)`;
});

nextBtn.addEventListener('click', () => {
  const maxScroll = newsItems.scrollWidth - document.querySelector('.news-items-wrapper').clientWidth;
  scrollPos = Math.min(scrollPos + itemWidth, maxScroll);
  newsItems.style.transform = `translateX(-${scrollPos}px)`;
});