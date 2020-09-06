ajax("http://localhost:3000/api/furniture");


function displayProduct(products) {
    document.getElementById('productList').innerHTML += renderProduct(products, "List");
};
