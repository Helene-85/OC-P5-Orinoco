// On appelle la fonction displayTotalOfProducts() pour afficher le nombre de produits dans le panier
displayTotalOfProducts();

// On appelle la fonction disableButton qui prévient l'utilisateur que le produit est déjà ajouté s'il se trouve déjà dans le panier
disableButton('addToCartButton');

// On appelle la fonction ajax() en lui passant les paramètres ciblés (url, verb)
ajax("http://localhost:3000/api/furniture/" + getDataFromUrl('id'), 'GET')
.then((meuble) => {
    displayProduct(meuble);
    show('addToCartButton');
    focus('chooseAnOption')
    if (Storage.has('products')) {
        products = Storage.get('products');
    } else {
        products = [];
    }
    if (! products.includes(getDataFromUrl('id'))) {    // Si le panier ne contient pas l'id du produit, le bouton "Ajouter au panier" est affiché
        enableButton('addToCartButton');
        listenForCartAddition();
    }
})

// Fonction permettant d'afficher les produits, appel de la fonction renderProduct avec des paramètres ciblés
function displayProduct(meuble) {
    document.getElementById('productSingle').innerHTML += renderProduct(meuble, "Single");
};

// On écoute le clic de l'utilisateur afin d'ajouter le produit dans la localStorage et désactiver le bouton
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