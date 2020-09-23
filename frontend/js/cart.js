displayTotalOfProducts();

if (isCartEmpty()) {
    hide('app');
    show('empty'); 
} else {
    hide('empty');
    let idsInCart = get('products');
    let total = 0;
    ajax("http://localhost:3000/api/furniture").then((products) => {
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
        listenForCartSubmission();
        document.getElementById('inputFirstname').focus();
    })
}

function listenForCartSubmission() {
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        checkInputs();
        
        if (!isFormValid()) {
            alert('Merci de bien remplir le formulaire')
            return;
        }
        submitForm().then((response) => {
            window.location.href = 'cart.html?order=' + response.orderId
        });
    });
}


function listenForCartEmptying() {
    document.getElementById('clear').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}

function listenForItemRemoving(id) {
    document.getElementById('remove-' + id).addEventListener('click', () => {
        products = get('products');
        let index = products.indexOf(products, id);
        products.splice(index, 1);
        store('products', products);
        location.reload();
});


function displayTotal(total) {
    document.getElementById('totalCost').innerHTML = 'Prix total = ' + total / 100 + ',00€';
}

function displayProduct(product) {
    document.getElementById('productCart').innerHTML += renderProduct(product, "Cart");
}