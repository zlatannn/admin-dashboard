document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("apply-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("place").value;
    const file = document.getElementById("document").files[0];

    if (!file) {
      alert("Vui lòng chọn tệp để gửi.");
      return;
    }

    // Giả lập xử lý nộp hồ sơ
    alert(`Hồ sơ của bạn (${fullname}) đã được gửi thành công!`);

    form.reset();
  });
});
