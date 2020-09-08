ajax("http://localhost:3000/api/furniture").then((products) => {
        products.forEach((products) => {
          displayProduct(products);
        });
})


function displayProduct(products) {
    document.getElementById('productList').innerHTML += renderProduct(products, "List");
};
