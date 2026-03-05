import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
 
  //initializing array with items , if there is not any data there , ternary operator gives an empty array
  const itemsArray = Array.isArray(getLocalStorage("so-cart")) ? getLocalStorage("so-cart") : [];
  itemsArray.push(product) //adding new products to the empty array
  setLocalStorage("so-cart", itemsArray);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
