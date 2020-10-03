const Storage = {
    engine: localStorage,

    // On efface tout le contenu du localStorage
    clear() {
        return this.engine.clear();
    },

    /* on récupère les valeurs associée à la clef passé en paramètre
    et on parse le JSON pour obtenir un objet JavaScript */
    get(key) {
        return JSON.parse(this.engine.getItem(key));
    },

    /* on obtient les valeurs associées à la clef 
    quand le localStorage contient des valeurs */
    has(key) {
        return this.engine.getItem(key);
    },

    /* on ajoute à l'emplacement de stockage en lui passant
    le duo clef-valeur */
    store(key, value) {
        return this.engine.setItem(key, JSON.stringify(value));
    }
}