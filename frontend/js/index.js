// On appelle la fonction displayTotalOfProducts() pour afficher le nombre de produits dans le panier
displayTotalOfProducts();

// On appelle la fonction ajax() en lui passant les paramètres ciblées (url, verb)
ajax("http://localhost:3000/api/furniture", 'GET').then((products) => { // Si la requête est validée on exécute le code suivant
  products.forEach((products) => { // On fait une boucle pour afficher tous les produits
    displayProduct(products);
  });
})

// On affiche tous les produits dans le DOM
function displayProduct(products) {
  document.getElementById('productList').innerHTML += renderProduct(products, "List");
};