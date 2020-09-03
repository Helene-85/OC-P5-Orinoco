function ajax(url) {
  return new Promise(function(resolve, reject) {
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
          resolve(JSON.parse(this.responseText));

      }  else  {
          reject("Votre requête n'a pas aboutie")
      }
    };

  request.open("GET", url);
  request.send();
  });
}

function renderProduct(meuble) {
  return `
    <div class="card">
      <img 
      class="card-img" 
      src="${meuble.imageUrl}" 
      alt="meuble en chêne"
      />
      <h2 class="card-name">${meuble.name}<h2>
      <p class="card-description">${meuble.description}</p>
      <p class="card-price">${meuble.price / 100},00€</p>
      <a href="product.html?id" class="card-btn">Description</a>
    </div>
      `
}
