// Fonction permettant de faire une requête ajax
// Si la requête est validée : construction d'un objet JavaScript grâce à JSON.parse()
function ajax(url, verb, payload = {}) {
  return new Promise((resolve, reject) => {   // Promesse permettant d'indiquer la marche à suivre en cas de succès ou de rejet
    let req = new XMLHttpRequest();
    req.open(verb, url);
    req.addEventListener("load", function() {
      if(req.status >=200) {
        resolve(JSON.parse(req.responseText));
      } else {
        reject(req.statusText);
      }
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send(JSON.stringify(payload));
  })
}

// Fonction permettant d'indiquer la quantité de panier dans la panier si celui-ci est rempli
function countQtyOfProductsInCart() {
  if (isCartEmpty()) {
    return 0;
  }

  return Storage.get('products').length
}

// Fonction permettant de désactiver un bouton
function disableButton(id) {
  document.getElementById(id).disabled = true;
  document.getElementById(id).innerHTML = "Produit déjà ajouté"
}

// Affichage du nombre total de produits
function displayTotalOfProducts() {
  let qty = countQtyOfProductsInCart();
  document.getElementById('totalProducts').innerHTML = qty;
}

// Fonction permettant d'activer un bouton
function enableButton(id) {
  document.getElementById(id).disabled = false;
  document.getElementById(id).innerHTML = "Ajouter le produit"
}

// Fonction permettant de mettre le focus sur un élément ciblé par l'id passé en paramètre
function focus(id) {
  document.getElementById(id).focus();
}

// Fonction permettant de récupérer les données passées en paramètres dans l'url
function getDataFromUrl(param) {
  let urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Fonction permettant de cacher un élément
function hide(id) {
  document.getElementById(id).style.display = 'none';
}

// Fonction indiquant si le panier contient des produits ou est vide
function isCartEmpty() {
  return (!Storage.has('products') || Storage.get('products').length == 0);
}

// Division du prix par 100 avec ajout de ,00€
function money(price) {
  return `${price / 100},00€`;
}

// Fonction permettant d'afficher les produits, ciblés grâce aux paramètres meuble et type
// Création des bloc HTML avec les Templates Strings
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
        <p class="card-price">${money(meuble.price)}</p>
        <a href="./pages/product.html?id=${meuble._id}" class="card-btn">Description</a>
      </div>
        `
  }
  if(type == "Single") {
    let htmlOptions = '';       // Boucle permettant d'afficher toutes les options de vernis

    for (let i = 0; i < meuble.varnish.length; i++) {
      console.log(meuble.varnish)
      htmlOptions += `<option>${meuble.varnish[i]}</option>`
    }

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
          <p class="card__single-description">${meuble.description}</p>
          <p class="card__single-price">${money(meuble.price)}</p>
          <select id="chooseAnOption" class="card__single-options">${htmlOptions}</select>
        </div>
      </div>
        `
  }

  if (type == "Cart") {
    return`
      <div class="cart__single-product">
        <div class="cart__left-side">
          <img 
          class="cart__single-img" 
          src="${meuble.imageUrl}" 
          alt="meuble en chêne"
          />
        </div>
        <div class="cart__right-side">
          <p class="cart__single-price">${money(meuble.price)}</p>
          <p class="cart__single-name">${meuble.name}<p>
          <button class="suppr" id="remove-${meuble._id}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
        `
  }
}

// Fonction permettant d'afficher un élément
function show(id) {
  document.getElementById(id).style.display = 'block';
}