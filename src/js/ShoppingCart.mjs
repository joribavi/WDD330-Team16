export default class ShoppingCart {
  constructor(key, parentSelector) {
    this.key = key; // localStorage key e.g. "so-cart"
    this.parentSelector = parentSelector; // where to render the cart items
  }

  async init() {
    const cartItems = this.getCartItems();
    const parentElement = document.querySelector(this.parentSelector);

    if (cartItems.length === 0) {
      parentElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    this.renderCartWithTemplate(cartItems, parentElement);
    this.calculateTotal(cartItems);
  }

  getCartItems() {
    return JSON.parse(localStorage.getItem(this.key)) || [];
  }

  cartItemTemplate(item) {
    return `
      <li class="cart-card divider">
        <a href="../product_pages/index.html?id=${item.id}" class="cart-card__image">
          <img src="${item.image}" alt="${item.name}" />
        </a>
        <a href="../product_pages/index.html?id=${item.id}">
          <h2 class="card__name">${item.name}</h2>
        </a>
        <p class="cart-card__color">${item.color}</p>
        <p class="cart-card__quantity">qty: ${item.quantity}</p>
        <p class="cart-card__price">$${item.finalPrice}</p>
        <button class="cart-card__button" data-id="${item.id}">Remove</button>
      </li>
    `;
  }

  renderCartWithTemplate(cartItems, parentElement) {
    const htmlString = cartItems.map(item => this.cartItemTemplate(item)).join("");
    parentElement.innerHTML = htmlString;

    // Add remove button listeners
    parentElement.querySelectorAll(".cart-card__button").forEach(button => {
      button.addEventListener("click", (e) => {
        this.removeItem(e.target.dataset.id);
      });
    });
  }

  removeItem(id) {
    let cartItems = this.getCartItems();
    cartItems = cartItems.filter(item => item.id !== id);
    localStorage.setItem(this.key, JSON.stringify(cartItems));
    this.init(); // re-render after removal
  }

  calculateTotal(cartItems) {
    const total = cartItems.reduce((sum, item) => sum + item.finalPrice * item.quantity, 0);
    const totalElement = document.querySelector(".cart-footer__total");
    if (totalElement) {
      totalElement.textContent = `Total: $${total.toFixed(2)}`;
    }
  }
}