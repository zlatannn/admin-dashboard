document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = document.getElementById("username").value.trim();
    const pass = document.getElementById("password").value.trim();

    if (user === "admin" && pass === "123456") {
      alert("Đăng nhập thành công!");
      window.location.href = "../landing.html"; // chuyển về trang chính
    } else {
      alert("Sai tên đăng nhập hoặc mật khẩu!");
    }
  });
});
