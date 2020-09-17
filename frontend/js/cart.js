let items =  JSON.parse(localStorage.getItem('products'));
console.log(items);

let res = items.find(showItem)

console.log(res);

function showItem(item) {
    /* for (let i = 0; i < res.length; i++) {
        if (res == i) {
            ajax("http://localhost:3000/api/furniture").then((products) => {
            products.forEach((products) => {
            displayProduct(products);
            });
        })
    }} */
    return item === "5beaadda1c9d440000a57d98";
}


function displayProduct(products) {
    document.getElementById('productCart').innerHTML += renderProduct(products, "Cart");
    };


