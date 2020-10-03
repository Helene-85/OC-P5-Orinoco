// On appelle la fonction displayTotalOfProducts() pour afficher le nombre de produits dans le panier
displayTotalOfProducts();

if (isCartEmpty()) {                                    // Si le panier est vide
    hide('app');                                        // On cache une partie du DOM
    show('empty');                                      // On affiche "Votre panier est vide"
} else {
    hide('empty');                                      // Sinon on cache "Votre panier est vide"
    focus('inputFirstName');                            // On met le focus sur l'input prénom
    let idsInCart = Storage.get('products');
    let total = 0;
    ajax("http://localhost:3000/api/furniture", 'GET').then((products) => {
        products.forEach((product) => {
            if (idsInCart.includes(product._id)) {
                total += product.price
                displayProduct(product);                // On fait une boucle et on affiche tous les produits qui sont dans le panier
            }
        });

        idsInCart.forEach((id) => {                     // On refait une boucle pour s'assurer que listenForItemRemoving() s'éxecute après renderProduct()
            listenForItemRemoving(id);                  // On écoute si un produit est supprimé
        })

        listenForCartEmptying();                        // On écoute si le panier est entièrement vidé
        displayTotal(total);                            // On affiche le montant total du panier
        listenForCartSubmission(total);                 // On écoute la soumission de la commande
    })
}

// On affiche les produits contenu dans la panier dans le DOM
function displayProduct(product) {
    document.getElementById('productCart').innerHTML += renderProduct(product, "Cart");
}

// On affiche le prix total du panier
function displayTotal(total) {
    document.getElementById('totalCost').innerHTML = 'Prix total = ' + money(total);
}

// On écoute le click sur le bouton vider le panier 
function listenForCartEmptying() {
    document.getElementById('clear').addEventListener('click', () => {
        Storage.clear();        // On vide le panier
        location.reload();      // On recharge la page
    })
}

// On écoute le click sur la poubelle
function listenForItemRemoving(id) {
    document.getElementById('remove-' + id).addEventListener('click', () => {
        products = Storage.get('products');
        let index = products.findIndex((productsId) => productsId == id);
        products.splice(index, 1);                  // On retire l'article ciblé par son id du localStorage
        Storage.store('products', products);        // On met à jour le tableau du panier sans cet id
        location.reload();                          // On recharge la page
    });
}

// On écoute la soumission du formulaire de commande
function listenForCartSubmission(total) {
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();      // On vérifie la conformité des informations

        if (!isFormValid()) {
            alert('Merci de bien remplir le formulaire')
            return;
        }

        let payload = {     // Création de l'objet payload qui contient les données produits et utilisateurs
            products : Storage.get('products'),
            contact: {
                firstName: document.getElementById('inputFirstName').value,
                lastName: document.getElementById('inputLastName').value,
                address: document.getElementById('address').value,
                city: document.getElementById('city').value,
                email: document.getElementById('inputEmail').value,
            }
        };

        ajax("http://localhost:3000/api/furniture/order", "POST", payload).then((response) => { 
            window.location.href = `order.html?order=${response.orderId}&total=${total}`;
        });             // Si le formulaire est validé on affiche l'order ID et le montant total dans le DOM
    });
}