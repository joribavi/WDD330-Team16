import { loadHeaderFooter } from "./utils.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

async function init() {
  await loadHeaderFooter();

  const checkout = new CheckoutProcess("so-cart", "#order-summary");
  checkout.init();

  // calculate order total when zip code is filled in
  document.getElementById("zip").addEventListener("blur", () => {
    const zip = document.getElementById("zip").value;
    if (zip.length === 5) {
      checkout.calculateOrderTotal();
    }
  });

  // handle form submission
  document.getElementById("checkout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      await checkout.checkout(e.target);
      alert("Order placed successfully!");
      localStorage.removeItem("so-cart");
      window.location.href = "/index.html";
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("There was a problem placing your order. Please try again.");
    }
  });
}

init();