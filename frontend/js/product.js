hide('addToCartButton');
disableButton('addToCartButton');

ajax("http://localhost:3000/api/furniture/" + getIdFromUrl())
.then((meuble) => {
    displayProduct(meuble);
    show('addToCartButton');
    
    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    } else {
        products = [];
    }

    if (! products.includes(getIdFromUrl())) {
        enableButton('addToCartButton');
        listenForCartAddition();
    }
})


function displayProduct(meuble) {
    document.getElementById('productSingle').innerHTML += renderProduct(meuble, "Single");
};

function getIdFromUrl() {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("id");
}

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