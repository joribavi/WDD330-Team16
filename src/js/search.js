import { getParam } from "./utils.mjs";
import Search from "./Search.mjs";

const query = getParam("q");
const searchInstance = new Search(["tents"]); // add more categories as needed

const titleEl = document.getElementById("search-title");
const listEl = document.getElementById("search-results");

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="${product.Name}" />
      <h3 class="card__brand">${product.Brand?.Name || ""}</h3>
      <h2 class="card__name">${product.NameWithoutBrand || product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

async function displayResults() {
  if (!query) {
    titleEl.textContent = "Please enter a search term.";
    return;
  }

  titleEl.textContent = `Results for "${query}"`;

  const results = await searchInstance.search(query);

  if (results.length === 0) {
    listEl.innerHTML = `<li class="no-results">No products found for "<strong>${query}</strong>".</li>`;
    return;
  }

  listEl.innerHTML = results.map(productCardTemplate).join("");
}

displayResults();