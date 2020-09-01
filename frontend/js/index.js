var request = new XMLHttpRequest();

request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let products = JSON.parse(this.responseText);
        
        products.forEach((meuble) => {
            displayProduct(meuble);
          });
    }
};

request.open("GET", "http://localhost:3000/api/furniture");
request.send();

function displayProduct(meuble) {
  document.getElementById('productList').innerHTML += `
  <div class="card">
    <h2 class="card-name">${meuble.name}<h2>
    <img 
    class="card-img" 
    src="${meuble.imageURL} 
    alt="meuble en chêne"
    />
    <p class="card-id">${meuble._id}</p>
    <p class="card-varnish">${meuble.varnish}<p>
    <p class="card-price">${meuble.price / 100},00€</p>
    <p class="card-description>${meuble.description}</p>
    <a href="pages/product.html" class="card-btn">Description</a>
  </div>
    `
}