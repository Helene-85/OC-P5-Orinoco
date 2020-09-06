ajax("http://localhost:3000/api/furniture");

function displayProduct(products) {
    document.getElementById('productSingle').innerHTML += renderProduct(meuble, "Single");
};