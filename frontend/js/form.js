/******************************************************
Vise à contrôler que les inputs sont remplis et 
conformes
On récupère les inputs
La méthode trim() retire les blancs de début et fin de 
chaîne
Si ok : on ajoute une class success (CSS)
Si non : on ajoute une class error (CSS)
*******************************************************/

function checkInputs() {
    let firstName = document.getElementById('inputFirstName');
    let lastName = document.getElementById('inputLastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('inputEmail');
   
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const addressValue = address.value.trim();
    const cityValue = city.value.trim();
    const emailValue = email.value.trim();

    if(firstNameValue === '') {
        setErrorFor(firstName, 'Veuillez remplir avec votre prénom');
    } else if(!isFirstName(firstNameValue)) {
        setErrorFor(firstName, 'Votre prénom n\'est pas valide');
    } else {
        setSuccesFor(firstName);
    }

    if(lastNameValue === '') {
        setErrorFor(lastName, 'Veuillez remplir avec votre nom');
    } else if(!isLastName(lastNameValue)) {
        setErrorFor(lastName, 'Votre nom n\'est pas valide');
    } else {
        setSuccesFor(lastName);
    }

    if(addressValue === '') {
        setErrorFor(address, 'Veuillez remplir avec votre addresse');
    } else if(!isAddress(addressValue)) {
        setErrorFor(address, 'Votre addresse n\'est pas valide');
    } else {
        setSuccesFor(address);
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

function getFocus() {
    document.getElementById("inputFirstName").focus();
}

/******************************************************
On contrôle la conformité des informations données par
les utilisateurs en excluant une liste de caractère 
: utilisation de RexExp
*******************************************************/

function isAddress(address) {
    return /^([0-9]{1,3}(([,. ]?){1}[a-zA-Zàâäéèêëïîôöùûüç' ]+))$/.test(address);
}

function isCity(city) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/.test(city);
}

function isEmail(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

function isFirstName(firstName) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç']+)$/.test(firstName);
}

/******************************************************
Dans la fonction checkInputs, cela permet de vérifier
que le formulaire est rempli / valide.
Si non on ajoute la classe 'form-control error' qui
signifie à l'utlisateur que le formulaire est mal
rempli grâce au CSS.
*******************************************************/
function isFormValid() {
    return (document.getElementsByClassName('form-control error').length == 0)
}

/******************************************************
On contrôle la conformité du nom de famille
en excluant une liste de caractère : utilisation d'un RexExp
*******************************************************/
function isLastName(lastName) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/.test(lastName);
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
Création de l'object contact en prévision de l'envoi au 
serveur
On récupère les emplacements des éléments dans le DOM
On écoute le click sur submit pour éxécuter la fonction checkInputs()
*******************************************************/

function submitForm() {
    let payload = {
        products : Storage.get('products'),
        contact: {
            firstName: document.getElementById('inputFirstName').value,
            lastName: document.getElementById('inputLastName').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            email: document.getElementById('inputEmail').value,
        }
    };
    console.log(payload);

    return ajax("http://localhost:3000/api/furniture/order", "POST", payload);
};
