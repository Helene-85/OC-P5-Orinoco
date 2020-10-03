// On vérifie la conformité des inputs : si ok : on ajoute une class success / si non : on ajoute une class error
function checkInputs() {
    let firstName = document.getElementById('inputFirstName');
    let lastName = document.getElementById('inputLastName');
    let address = document.getElementById('address');
    let city = document.getElementById('city');
    let email = document.getElementById('inputEmail');
   
    const firstNameValue = firstName.value.trim();      // On retire les blancs de début et fin de chaîne
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

// On contrôle la conformité des informations données par les utilisateurs en excluant une liste de caractère : utilisation de RexExp
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

// On contrôle la validité du formulaire, ajout de la classe 'form-control error' en cas d'invalidité
function isFormValid() {
    return (document.getElementsByClassName('form-control error').length == 0)
}

// On contrôle la conformité des informations données par les utilisateurs en excluant une liste de caractère : utilisation de RexExp
function isLastName(lastName) {
    return /^([a-zA-Zàâäéèêëïîôöùûüç' ]+)$/.test(lastName);
}

// On ajoute un message d'erreur si le formulaire est invalidé, on modifie le design du DOM
function setErrorFor(input, message) {
    const formControl = input.parentElement;        // On désigne que .form-control est le parent de l'input
    const small = formControl.querySelector('small'); 

    small.innerText = message;

    formControl.className = 'form-control error';
}

// On modifie le design du DOM en cas de formulaire validé
function setSuccesFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}