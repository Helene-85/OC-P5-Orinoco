displayTotalOfProducts();

/***********************************************
  Appels des fonctions hide et disableButton
  pour l'id addToCartButton
 ***********************************************/

hide('addToCartButton');
disableButton('addToCartButton');

/***********************************************
  Appel de la fonction ajax située dans utils.js
  l'url est récupéré dans le localStorage grâce 
  à l'appel de la fonction getDataFromUrl 
 ***********************************************/

ajax("http://localhost:3000/api/furniture/" + getDataFromUrl('id'), 'GET')
.then((meuble) => {
    displayProduct(meuble);
    show('addToCartButton');
    if (Storage.has('products')) {
        products = Storage.get('products');
    } else {
        products = [];
    }
 /***********************************************
    Si le produit est ajouté au panier, le bouton
    est désactivé grâce à la fonction
    enableButton située dans utils.js
 ***********************************************/
    if (! products.includes(getDataFromUrl('id'))) {
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
  La fonction listenForCartAddition écoute le
  clic de l'utilisateur afin d'ajouter le produit
  dans la localStorage puis de désactiver le
  bouton 
 ***********************************************/

function listenForCartAddition() {
    document.getElementById('addToCartButton').addEventListener('click', () => {
        if (Storage.has('products')) {
            products = Storage.get('products');
        } else {
            products = [];
        }

        products.push(getDataFromUrl('id'));
        Storage.store('products', products);
        disableButton('addToCartButton')
        displayTotalOfProducts();
    });
}