document.getElementById("signup-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("new-username").value.trim();
    const password = document.getElementById("new-password").value.trim();

    if (username && password) {
    // Lưu user về localStorage để login giả lập
        localStorage.setItem("loggedInUser", username);
        alert("Đăng ký thành công!");
        window.location.href = "../landing_page/landing.html";
      } else {
        alert("Vui lòng nhập đủ thông tin!");
    }
});