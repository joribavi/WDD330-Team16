import { getLocalStorage, alertMessage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: 1,
  }));
}

function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
  }

  calculateItemSubTotal() {
    this.itemTotal = this.list.reduce((sum, item) => sum + item.FinalPrice, 0);

    const itemCount = document.querySelector(`${this.outputSelector} #item-count`);
    const subtotal = document.querySelector(`${this.outputSelector} #subtotal`);

    if (itemCount) itemCount.textContent = this.list.length;
    if (subtotal) subtotal.textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;
    this.shipping = this.list.length > 0
      ? 10 + (this.list.length - 1) * 2
      : 0;
    this.orderTotal = this.itemTotal + this.tax + this.shipping;
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const tax = document.querySelector(`${this.outputSelector} #tax`);
    const shipping = document.querySelector(`${this.outputSelector} #shipping`);
    const orderTotal = document.querySelector(`${this.outputSelector} #order-total`);

    if (tax) tax.innerText = `$${this.tax.toFixed(2)}`;
    if (shipping) shipping.innerText = `$${this.shipping.toFixed(2)}`;
    if (orderTotal) orderTotal.innerText = `$${this.orderTotal.toFixed(2)}`;
  }

    async checkout(form) {
        try {
            const formData = formDataToJSON(form);

            if (formData.cardNumber) {
                formData.cardNumber = formData.cardNumber.replace(/\s/g, "");
            }

            const order = {
                ...formData,
                orderDate: new Date().toISOString(),
                orderTotal: this.orderTotal.toFixed(2),
                tax: this.tax.toFixed(2),
                shipping: this.shipping,
                items: packageItems(this.list),
            };

            const services = new ExternalServices();
            await services.checkout(order);

            // success — clear cart and redirect
            localStorage.removeItem("so-cart");
            window.location.href = "/checkout/success.html";

        } catch (err) {
            // show each error message from the server
            if (err.name === "servicesError") {
                const messages = err.message;
                Object.values(messages).forEach((message) => {
                    alertMessage(message);
                });
            } else {
                alertMessage("There was a problem placing your order. Please try again.");
            }
        }
    }
}