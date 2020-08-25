var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var products = JSON.parse(this.responseText);

        products.forEach((liste) => {
            displayProduct(liste);
        });
    }
};

request.open("GET", "http://localhost:3000/api/furniture");
request.send();

function displayProducts(liste) {
    document.getElementById('productlist').innerHTML += renderProducts(liste);
}

