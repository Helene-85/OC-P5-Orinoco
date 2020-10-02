displayTotalOfProducts();

if (isCartEmpty()) {
    hide('app');
    show('empty'); 
} else {
    hide('empty');
    document.getElementById("inputFirstName").focus();
    let idsInCart = Storage.get('products');
    let total = 0;
    ajax("http://localhost:3000/api/furniture", 'GET').then((products) => {
        products.forEach((product) => {
            if (idsInCart.includes(product._id)) {
                total += product.price
                displayProduct(product);
            }
        });

        idsInCart.forEach((id) => {
            listenForItemRemoving(id);
        })

        listenForCartEmptying();
        displayTotal(total);
        listenForCartSubmission(total);
    })
}

// On affiche les pr
function displayProduct(product) {
    document.getElementById('productCart').innerHTML += renderProduct(product, "Cart");
}

// On affiche le prix total du panier
function displayTotal(total) {
    document.getElementById('totalCost').innerHTML = 'Prix total = ' + (total / 100) + ',00€';
}

// On écoute le click sur le bouton vider le panier 
// On vide le panier
// On recharge la page
function listenForCartEmptying() {
    document.getElementById('clear').addEventListener('click', () => {
        Storage.clear();
        location.reload();
    })
}

// On écoute le click sur la poubelle
// On retire l'article ciblé par son id du localStorage
// On met à jour le tableau du panier sans cet id
// On recharge la page
function listenForItemRemoving(id) {
    document.getElementById('remove-' + id).addEventListener('click', () => {
        products = Storage.get('products');
        let index = products.findIndex((productsId) => productsId == id);
        products.splice(index, 1);
        Storage.store('products', products);
        location.reload();
    });
}

// On écoute la soumission du formulaire de commande
// On vérifie la conformité des informations
// Si non conforme on alerte l'utilisateur
// Si conforme l'order ID est envoyé et affiché sur la page order.html
function listenForCartSubmission(total) {
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();

        if (!isFormValid()) {
            alert('Merci de bien remplir le formulaire')
            return;
        }
        submitForm().then((response) => {
            window.location.href = `order.html?order=${response.orderId}&total=${total}`;
        });
    });
}