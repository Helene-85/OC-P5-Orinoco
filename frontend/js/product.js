/***********************************************
  Appels des fonctions hide et disableButton
  pour l'id addToCartButton
 ***********************************************/

hide('addToCartButton');
disableButton('addToCartButton');

/***********************************************
  Appel de la fonction ajax située dans utils.js
  l'url est récupéré dans le localStorage grâce 
  à l'appel de la fonction getIdFromUrl 
 ***********************************************/

ajax("http://localhost:3000/api/furniture/" + getIdFromUrl())
.then((meuble) => {
    displayProduct(meuble);
    show('addToCartButton');
    
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    } else {
        products = [];
    }
 /***********************************************
    Si le produit est ajouté au panier, le bouton
    est désactivé grâce à la fonction
    enableButton située dans utils.js
 ***********************************************/
    if (! products.includes(getIdFromUrl())) {
        enableButton('addToCartButton');
        listenForCartAddition();
    }
})

/***********************************************
  La fonction displayProduct affiche les produits
  sur la page index.html
  Appel de la fonction renderProduct, située dans 
  utils.js avec ciblage sur le Template String 
  "Single"
 ***********************************************/

function displayProduct(meuble) {
    document.getElementById('productSingle').innerHTML += renderProduct(meuble, "Single");
};

/***********************************************
  La fonction getIdFromUrl permet de récupérer
  l'id du produit 
 ***********************************************/

function getIdFromUrl() {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

/***********************************************
  La fonction listenForCartAddition écoute le
  clic de l'utilisateur afin d'ajouter le produit
  dans la localStorage puis de désactiver le
  bouton 
 ***********************************************/

function listenForCartAddition() {
    document.getElementById('addToCartButton').addEventListener('click', () => {
        alert('Article ajouté au panier');
        if (localStorage.getItem('products')) {
            products = JSON.parse(localStorage.getItem('products'));
        } else {
            products = [];
        }

        products.push(getIdFromUrl());
        localStorage.setItem('products', JSON.stringify(products));
        disableButton('addToCartButton')
    });
}