displayTotalOfProducts();

/***********************************************
  Appel de la fonction ajax située dans utils.js
  Création d'une boucle forEach afin d'afficher 
  tous les produits
 ***********************************************/

ajax("http://localhost:3000/api/furniture").then((products) => {
  products.forEach((products) => {
    displayProduct(products);
  });
})


/***********************************************
  La fonction displayProduct affiche les produits
  sur la page index.html
  Appel de la fonction renderProduct, située dans 
  utils.js avec ciblage sur le Template String 
  "List"
 ***********************************************/

function displayProduct(products) {
    document.getElementById('productList').innerHTML += renderProduct(products, "List");
};