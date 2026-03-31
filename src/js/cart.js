import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";

async function init() {
  await loadHeaderFooter();
  renderCartContents();
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listElement = document.querySelector(".product-list");

  if (cartItems.length === 0) {
    listElement.innerHTML = "<li class='cart-card divider'>Your cart is empty.</li>";
    document.getElementById("cart-total").textContent = "$0.00";
    return;
  }

  listElement.innerHTML = cartItems.map(cartItemTemplate).join("");

  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  // server data uses Images.PrimaryMedium, not Image
  const image = item.Images?.PrimaryMedium 
    || item.Images?.PrimarySmall 
    || item.Image?.replace("../", "/")
    || "/images/camping-products.jpg";

  const color = item.Colors?.[0]?.ColorName || "N/A";

  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${color}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

init();