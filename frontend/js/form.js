// Création de l'object contact en prévision de l'envoi au serveur
// On récupère les emplacements des éléments dans le DOM
// On écoute le click sur submit pour éxécuter la fonction checkInputs()
function submitForm(e) {
    e.preventDefault();
    checkInputs();
    let payload = {
        products : get('products'),
        contact: {
            firstName: document.getElementById('inputFirstName').value,
            lastName: document.getElementById('inputLastName').value,
            adress: document.getElementById('adress').value,
            city: document.getElementById('city').value,
            email: document.getElementById('inputEmail').value,
        }
    };
    console.log(payload);
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open("POST", "http://localhost:3000/api/furniture/order");
        req.addEventListener("load", function() {
            if(req.status >=200) {
                resolve(JSON.parse(req.responseText));
            } else {
                reject(req.statusText);
            }
        });
        req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        req.send(payload);
      })
};


function checkInputs() {
    let firstName = document.getElementById('inputFirstName');
    let lastName = document.getElementById('inputLastName');
    let adress = document.getElementById('adress');
    let city = document.getElementById('city');
    let email = document.getElementById('inputEmail');
    // On récupère les inputs
    // La méthode trim() retire les blancs de début et fin de chaîne
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const adressValue = adress.value.trim();
    const cityValue = city.value.trim();
    const emailValue = email.value.trim();

    if(firstNameValue === '') {
        // Montrer qu'il y a une erreur lorsque le champ est vide
        // On ajoute une class error
        setErrorFor(firstName, 'Veuillez remplir avec votre prénom');
    } else if(!isFirstName(firstNameValue)) {
        setErrorFor(firstName, 'Votre prénom n\'est pas valide');
    } else {
        // On ajoute une class success
        setSuccesFor(firstName);
    }

    if(lastNameValue === '') {
            setErrorFor(lastName, 'Veuillez remplir avec votre nom');
        } else if(!isLastName(lastNameValue)) {
            setErrorFor(lastName, 'Votre nom n\'est pas valide');
        } else {
            setSuccesFor(lastName);
        }

    if(adressValue === '') {
        setErrorFor(adress, 'Veuillez remplir avec votre adresse');
    } else if(!isAdress(adressValue)) {
        setErrorFor(adress, 'Votre adresse n\'est pas valide');
    } else {
        setSuccesFor(adress);
    }

    if(cityValue === '') {
        setErrorFor(city, 'Veuillez remplir avec votre ville');
    } else if(!isCity(cityValue)) {
        setErrorFor(city, 'Votre ville n\'est pas valide');
    } else {
        setSuccesFor(city);
    } 
        
    if(emailValue === '') {
        setErrorFor(email, 'Veuillez remplir avec votre email');
    } else if(!isEmail(emailValue)) {
        setErrorFor(email, 'Votre email n\'est pas valide');
    } else {
        setSuccesFor(email);
    }
}

/******************************************************
Création de fonctions setErrorFor et setSuccesFor
=> Si l'input est invalidé : 
On désigne que .form-control est le parent de l'input
On ajoute le message d'erreur dans la balise small
On ajoute la class form-control error pour activer le 
CSS correspondant
=> Si l'input est validé :
On désigne que .form-control est le parent de l'input
On ajoute la class form-control success pour activer le 
CSS correspondant
*******************************************************/

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small'); 

    small.innerText = message;

    formControl.className = 'form-control error';
}

function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

/******************************************************
Création de fonctions contenant les reg exp pour la 
validation de chaque input de l'utilisateur
*******************************************************/

function isFirstName(firstName) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç']+)$/.test(firstName);
}

function isLastName(lastName) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/.test(lastName);
}

function isAdress(adress) {
    return /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/.test(adress);
}

function isCity(city) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/.test(city);
}

function isEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

