/* let request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let products = JSON.parse(this.responseText);
        
        products.forEach((meuble) => {
            displayProduct(meuble);
          });
    }
};

request.open("GET", "http://localhost:3000/api/furniture");
request.send(); */

ajax("http://localhost:3000/api/furniture")
.then((products) => {
    displayProduct(products)
  })
.catch((msg) => {
  alert("Votre requête n'a pas aboutie")
})

function displayProduct(meubles) {
  products.forEach((meuble) => {
    document.getElementById('productList').innerHTML += renderProduct(meuble);
  });
}