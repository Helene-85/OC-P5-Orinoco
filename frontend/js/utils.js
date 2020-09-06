function ajax(url) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function() {
      if(req.status >=200) {
        resolve(JSON.parse(req.responseText));
        let products = JSON.parse(this.responseText);
        products.forEach((products) => {
          displayProduct(products);
        });
      } else {
        reject(req.statusText);
      }
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send();
  })
}

function renderProduct(meuble, type) {
  if(type == "List") {
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
        <a href="./pages/product.html" class="card-btn">Description</a>
      </div>
        `
  }
  if(type == "Single") {
    return`
      <div class="card__single-product">
        <div class="card__left-side">
          <img 
          class="card__single-img" 
          src="${meuble.imageUrl}" 
          alt="meuble en chêne"
          />
        </div>
        <div class="card__right-side">
          <h2 class="card__single-name">${meuble.name}<h2>
          <p class="card__single-id">${meuble._id}</p>
          <p class="card__single-description">${meuble.description}</p>
          <p class="card__single-price">${meuble.price / 100},00€</p>
          <a href="./pages/cart.html" class="card__single-btn">Ajouter au panier</a>
        </div>
      </div>
        `
  }
}
