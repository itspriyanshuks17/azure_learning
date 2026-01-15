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


  // --- Search Logic ---
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");
  let searchIndex = [];

  if (searchInput) {
      // Fetch Search Index
      const searchPath = window.SEARCH_PATH || "search.json";
      fetch(searchPath)
          .then(res => res.json())
          .then(data => {
              searchIndex = data;
              console.log("🔍 Search Index Loaded:", searchIndex.length, "items");
          })
          .catch(err => console.error("Failed to load search index:", err));

      // Event Listener
      searchInput.addEventListener("input", (e) => {
          const query = e.target.value.toLowerCase().trim();
          
          if (query.length < 2) {
              searchResults.style.display = "none";
              searchResults.innerHTML = "";
              return;
          }

          // Filter Results
          const results = searchIndex.filter(item => 
              item.title.toLowerCase().includes(query) || 
              item.content.includes(query)
          ).slice(0, 10); // Limit to 10 results

          displaySearchResults(results, query);
      });
      
      // Close results when clicking outside
      document.addEventListener("click", (e) => {
          if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
              searchResults.style.display = "none";
          }
      });
  }

  function displaySearchResults(results, query) {
      if (results.length === 0) {
          searchResults.innerHTML = `<div class="search-item">No results found for "${query}"</div>`;
          searchResults.style.display = "block";
          return;
      }

      const html = results.map(item => `
          <a href="${(window.RELATIVE_PATH || '') + item.url}" class="search-item">
              <div class="search-title">${item.title}</div>
              <div class="search-excerpt">...${getExcerpt(item.content, query)}...</div>
          </a>
      `).join("");

      searchResults.innerHTML = html;
      searchResults.style.display = "block";
  }

  function getExcerpt(content, query) {
      const index = content.indexOf(query);
      if (index === -1) return content.substring(0, 50);
      
      const start = Math.max(0, index - 20);
      const end = Math.min(content.length, index + query.length + 30);
      return content.substring(start, end);
  }
});
