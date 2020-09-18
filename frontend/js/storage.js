function store(key, value) {
    return localStorage.setItem(key, JSON.stringify(value));
}

function get(key) {
    return JSON.parse(localStorage.getItem(key));
}

function has(key) {
    return localStorage.getItem(key);
}

function clear(key) {
    return localStorage.clear(key);
}

function remove(key) {
    return localStorage.removeItem(key);
}

