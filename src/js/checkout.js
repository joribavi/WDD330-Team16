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
  document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if (chk_status) {
    checkout.checkout(e.target);
  }
});
}

init();