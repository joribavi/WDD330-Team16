import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import modal from "./modal.js";
import { loadHeaderFooter } from "./utils.mjs";

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const myProductList = new ProductList("Tents", dataSource, element);

myProductList.init();

//setting element to store if modal was displayed on local storage, it will render only once
const modalShowed = localStorage.getItem("modal-showed");
if (!modalShowed) {
  document.addEventListener("DOMContentLoaded", () => {
    modal();
    
  });

  localStorage.setItem("modal-showed", "true");
}

loadHeaderFooter();