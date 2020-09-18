// Création de l'object contact en prévision de l'envoi au serveur

class contact {
    constructor(firstName, lastName, adress, city, email) {
        (this.firstName = firstName),
        (this.lastName = lastName),
        (this.adress = adress),
        (this.city = city),
        (this.email = email);
    }
}

// On récupère les emplacements des éléments dans le DOM

const form = document.getElementById('orderForm');
const firstName = document.getElementById('inputFirstName');
const lastName = document.getElementById('inputLastName');
const email = document.getElementById('inputEmail');
const adress = document.getElementById('adress');
const city = document.getElementById('city');

// On écoute le click sur submit pour éxécuter la fonction checkInputs()

form.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();

    /* let newContact = new Contact(
        firstName.value,
        lastName.value,
        adress.value,
        city.value,
        email.value
        );
        
    POST à l'API ?
        */
});

function checkInputs() {
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
