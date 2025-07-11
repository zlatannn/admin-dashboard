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
