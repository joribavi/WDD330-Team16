import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const category = getParam("category");
const searchQuery = getParam("search");
const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const titleElement = document.querySelector(".products__title");

if (searchQuery) {
  searchAllCategories(searchQuery, listElement, titleElement, dataSource);
} else if (category) {
  const myList = new ProductList(category, dataSource, listElement);
  myList.init();
  if (titleElement) {
    titleElement.textContent = `Top Products: ${
      category.charAt(0).toUpperCase() + category.slice(1)
    }`;
  }
}

async function searchAllCategories(query, listEl, titleEl, source) {
  if (titleElement) {
    titleElement.textContent = `Search Results: "${query}"`;
  }

  const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
  const allProducts = await Promise.all(
    categories.map(cat => dataSource.getData(cat))
  );

  const flatProducts = allProducts.flat();

  const results = flatProducts.filter(product =>
    product.Name?.toLowerCase().includes(query) ||
    product.NameWithoutBrand?.toLowerCase().includes(query) ||
    product.Brand?.Name?.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    listElement.innerHTML = `
      <li class="no-results">No products found for "${query}"</li>
    `;
  } else {
    listElement.innerHTML = results.map(product => `
      <li class="product-card">
        <a href="/product_pages/?product=${product.Id}">
          <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
          <h3>${product.Brand.Name}</h3>
          <p>${product.NameWithoutBrand}</p>
          <p class="product-card__price">$${product.FinalPrice}</p>
        </a>
      </li>
    `).join("");
  }
}