function getProductFromLocalStorage() {
    let productInCart = localStorage.getItem('product');
    if (productInCart) {
        ajax("http://localhost:3000/api/furniture").then((products) => {
        products.forEach((products) => {
        displayProduct(products);
        });
    });
    } else {
        return `
        <h3>Votre panier est vide</h3>
        `
    }
}

getProductFromLocalStorage();

function displayProduct(products) {
document.getElementById('productCart').innerHTML += renderProduct(products, "Cart");
};