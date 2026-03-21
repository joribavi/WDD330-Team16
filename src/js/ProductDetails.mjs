import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource){
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
}
    
  async init(){

     this.product = await this.dataSource.findProductById(this.productId);   
     console.log("1. Product fetched:", this.product); 
     this.renderProductDetails();
      document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
      console.log("2. Add to cart listener attached");
  } 
     addProductToCart() {
      console.log("3. Add to cart clicked, product:", this.product);
            
     //initializing array with items , if there is not any data there , ternary operator gives an empty array
     const itemsArray = Array.isArray(getLocalStorage("so-cart")) ? getLocalStorage("so-cart") : [];
     itemsArray.push(this.product) //adding new products to the empty array
     setLocalStorage("so-cart", itemsArray);
     console.log("5. Cart after adding:", getLocalStorage("so-cart"));
    }

    renderProductDetails(){
        
        productDetailsTemplate(this.product);

    }
 }
   function productDetailsTemplate(product) {
  const title = document.querySelector("h2");
  const subTitle = document.querySelector("h3");
  const productImage = document.getElementById("productImage");
  const productPrice = document.getElementById("productPrice");
  const productColor = document.getElementById("productColor");
  const productDescription = document.getElementById("productDesc");

  title.textContent = product.NameWithoutBrand;
  subTitle.textContent = product.Brand.Name;

  // ✅ Only this line - delete the duplicate below it
  productImage.src = product.Images?.PrimaryLarge 
    || product.Images?.PrimaryMedium 
    || "../images/camping-products.jpg";

  productPrice.innerHTML = product.FinalPrice;
  productColor.innerHTML = product.Colors?.[0]?.ColorName || "N/A";
  productDescription.innerHTML = product.DescriptionHtmlSimple || "";

  document.getElementById("addToCart").dataset.id = product.Id;
}



