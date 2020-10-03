// Mise en place d'un objet pour améliorer la lecture du code et sa maintenabilité
const Storage = {
    engine: localStorage,

    // On efface tout le contenu du localStorage
    clear() {
        return this.engine.clear();
    },

    // On récupère les valeurs associée à la clef passé en paramètre et on parse le JSON pour obtenir un objet JavaScript
    get(key) {
        return JSON.parse(this.engine.getItem(key));
    },

    // On obtient les valeurs associées à la clef quand le localStorage contient des valeurs
    has(key) {
        return this.engine.getItem(key);
    },

    // On ajoute à l'emplacement de stockage en lui passant le duo clef-valeur
    store(key, value) {
        return this.engine.setItem(key, JSON.stringify(value));
    }
}