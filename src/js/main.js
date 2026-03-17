import modal from "./modal.js";



//setting element to store if modal was displayed on local storage, it will render only once
const modalShowed = localStorage.getItem("modal-showed");
if (!modalShowed) {
  document.addEventListener("DOMContentLoaded", () => {
    modal();
  });

  localStorage.setItem("modal-showed", "true");
}
