if (! localStorage.getItem('products')) {
    hide('app');
    show('empty'); 
} else {
    hide('empty');
    let idsInCart =  JSON.parse(localStorage.getItem('products'));
    let total = 0;
    ajax("http://localhost:3000/api/furniture").then((products) => {
        products.forEach((product) => {
            if (idsInCart.includes(product._id)) {
                total += product.price
                displayProduct(product);
                displayTotal(total);
                listenForCartEmptying();
            }
        });
    })
}

function listenForCartEmptying() {
    document.getElementById('clear').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}

function displayTotal(total) {
    document.getElementById('totalCost').innerHTML = 'Prix total = ' + total / 100 + ',00€';
}

function displayProduct(product) {
    document.getElementById('productCart').innerHTML += renderProduct(product, "Cart");
    };


