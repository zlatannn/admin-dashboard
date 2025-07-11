document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    // Giả lập xác thực
    if (user === "admin" && pass === "123456") {
      localStorage.setItem("loggedInUser", user);  // ✅ Lưu vào localStorage
      window.location.href = "../landing_page/landing.html";
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  });
});
