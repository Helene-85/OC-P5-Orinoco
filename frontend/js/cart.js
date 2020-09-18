if (! has('products')) {
    hide('app');
    show('empty'); 
} else {
    hide('empty');
    let idsInCart =  get('products');
    let total = 0;
    ajax("http://localhost:3000/api/furniture").then((products) => {
        products.forEach((product) => {
            if (idsInCart.includes(product._id)) {
                total += product.price
                displayProduct(product);
                displayTotal(total);
                listenForCartEmptying();
                listenForItemRemoving();
            }
        });
        document.getElementById('orderForm').addEventListener('submit', (e) => {
            e.preventDefault()
            submitForm().then((e) => {
                console.log('Retour du backend')
                console.log(e)
            });
        });
    })
}

function listenForCartEmptying() {
    document.getElementById('clear').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}

function listenForItemRemoving() {
    document.getElementById('remove').addEventListener('click', () => {
        localStorage.removeItem('product');
        location.reload();
    })
}

function displayTotal(total) {
    document.getElementById('totalCost').innerHTML = 'Prix total = ' + total / 100 + ',00€';
}

function displayProduct(product) {
    document.getElementById('productCart').innerHTML += renderProduct(product, "Cart");
    };


