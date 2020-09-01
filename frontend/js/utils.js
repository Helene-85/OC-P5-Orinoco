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
      `;
}
