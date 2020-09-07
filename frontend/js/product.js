let urlParams = new URLSearchParams(window.location.search);
console.log(urlParams);
let id = urlParams.get("id");
console.log(id);

ajax("http://localhost:3000/api/furniture/" + id).then((meuble) => {
    displayProduct(meuble);
    console.log(displayProduct);
})


function displayProduct(meuble) {
    document.getElementById('productSingle').innerHTML += renderProduct(meuble, "Single");
};