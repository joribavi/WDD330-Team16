import { loadHeaderFooter } from "./utils.mjs";
import modal from "./modal.js";

loadHeaderFooter();

const modalShowed = localStorage.getItem("modal-showed");
if (!modalShowed) {
  document.addEventListener("DOMContentLoaded", () => {
    modal();
  });
  localStorage.setItem("modal-showed", "true");
}