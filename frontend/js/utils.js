/***********************************************
  Requête ajax de type Get 'url'
  La requête ajax permet la mise en place de la 
  méthode JSON.parse() pour construire l'objet 
  JavaScript
 ***********************************************/

/***********************************************
  Mise en place d'un promesse dans la fonction pour
  y attacher le callback en cas de rejet 
 ***********************************************/

function ajax(url) {
  return new Promise((resolve, reject) => {
    let req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function() {
      if(req.status >=200) {
        resolve(JSON.parse(req.responseText));
      } else {
        reject(req.statusText);
      }
    });
    req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    req.send();
  })
}


function renderProduct(meuble, type) {
// Création du bloc HTML grâce au Template String
// Ajout du type pour cibler sur List ou Single
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
        <a href="./pages/product.html?id=${meuble._id}" class="card-btn">Description</a>
      </div>
        `
  }
  if(type == "Single") {
  // Création d'une boucle pour afficher toutes les options de vernis
    let htmlOptions = '';

    for (let i = 0; i < meuble.varnish.length; i++) {
      console.log(meuble.varnish)
      htmlOptions += `<option>${meuble.varnish[i]}<option>`
    }
  // Création du bloc HTML grâce au Template String
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
          <p class="card__single-price">${meuble.price / 100},00€</p>
          <select id="chooseAnOption" class="card__single-options">${htmlOptions}</select>
        </div>
      </div>
        `
  }
}

/***********************************************
  Création de fonctions permettant d'afficher
  ou de cacher un élément
 ***********************************************/

function show(id) {
  document.getElementById(id).style.display = 'block';
}

function hide(id) {
  document.getElementById(id).style.display = 'none';
}

/***********************************************
  Création de fonctions permettant d'activer
  ou de désactiver un bouton
 ***********************************************/

function disableButton(id) {
  document.getElementById(id).disabled = true;
}

function enableButton(id) {
  document.getElementById(id).disabled = false;
}