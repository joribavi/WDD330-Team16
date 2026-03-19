export default class Search {
  // Add more category names here if you have more JSON files
  constructor(categories = ["tents"]) {
    this.categories = categories;
    this.basePath = "/json/";
  }

  // Fetch one category JSON file
  async fetchCategory(category) {
    const res = await fetch(`${this.basePath}${category}.json`);
    if (!res.ok) throw new Error(`Failed to load ${category}`);
    const data = await res.json();
    // Tag each product with its category so we can build the correct link
    return data.map((product) => ({ ...product, category }));
  }

  // Fetch all categories and merge into one array
  async getAllProducts() {
    const results = await Promise.all(
      this.categories.map((cat) => this.fetchCategory(cat))
    );
    return results.flat();
  }

  // Search products by term — matches name, brand, or description
  async search(term) {
    const allProducts = await this.getAllProducts();
    const lower = term.toLowerCase();
    return allProducts.filter((product) => {
      const name = (product.Name || product.NameWithoutBrand || "").toLowerCase();
      const brand = (product.Brand?.Name || "").toLowerCase();
      const desc = (product.DescriptionHtmlSimple || "").toLowerCase();
      return name.includes(lower) || brand.includes(lower) || desc.includes(lower);
    });
  }
}