import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource){
  this.productId = productId;
  this.product = {};
  this.dataSource = dataSource;
}
    
  async init(){

     this.product = await this.dataSource.findProductById(this.productId);   
     this.renderProductDetails();
      document
      .getElementById('addToCart')
      .addEventListener('click', this.addProductToCart.bind(this));
  } 
     addProductToCart() {
            
     //initializing array with items , if there is not any data there , ternary operator gives an empty array
     const itemsArray = Array.isArray(getLocalStorage("so-cart")) ? getLocalStorage("so-cart") : [];
     itemsArray.push(this.product) //adding new products to the empty array
     setLocalStorage("so-cart", itemsArray);
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
         subTitle.textContentL = product.Brand.Name;
         productImage.src = product.Image;
         productPrice.innerHTML = product.FinalPrice;
         productColor.innerHTML = product.Colors[0].ColorName;
         productDescription.innerHTML = product.DescriptionHtmlSimple;

         document.getElementById('addToCart').dataset.id = product.Id;

   }



