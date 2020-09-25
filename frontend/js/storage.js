// on efface tout le contenu du localStorage
function clear(key) {
    return localStorage.clear(key);
}

/* on récupère les valeurs associée à la clef passé en paramètre
 et on parse le JSON pour obtenir un objet JavaScript */
function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

/* on obtient les valeurs associées à la clef 
quand le localStorage contient des valeurs */
function has(key) {
    return localStorage.getItem(key);
}

// on efface un seul élément du localStorage
function remove(key) {
    return localStorage.removeItem(key);
}

/* on ajoute à l'emplacement de stockage en lui passant
le duo clef-valeur */
function store(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}