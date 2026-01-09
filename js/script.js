document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Toggle for Mobile
  const toggleBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("menu-close");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.getElementById("overlay");

  function toggleSidebar() {
    const isOpen = sidebar.classList.toggle("open");
    overlay.classList.toggle("active", isOpen);
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
  }

  if (toggleBtn) toggleBtn.addEventListener("click", toggleSidebar);
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // Close sidebar when clicking a link on mobile
  const navLinks = document.querySelectorAll(".sidebar nav a");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
            closeSidebar();
        }
    });
  });

  // Active Link Highlighting
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const links = document.querySelectorAll(".sidebar nav a");

  links.forEach((link) => {
    const linkPath = link.getAttribute("href");
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
});
