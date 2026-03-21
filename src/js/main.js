import { loadHeaderFooter } from "./utils.mjs";
import modal from "./modal.js";

loadHeaderFooter().then(() => {
  // ✅ Search logic runs AFTER header loads
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const query = document.querySelector(".search-input").value.trim();
      if (query) {
        window.location.href = `/product_listing/?category=${query}`;
      }
    });
  }
});

const modalShowed = localStorage.getItem("modal-showed");
if (!modalShowed) {
  document.addEventListener("DOMContentLoaded", () => {
    modal();
  });
  localStorage.setItem("modal-showed", "true");
}