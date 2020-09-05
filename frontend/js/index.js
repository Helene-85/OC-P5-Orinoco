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