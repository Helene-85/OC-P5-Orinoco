if (! has('products')) {
    hide('app');
    show('empty'); 
} else {
    hide('empty');
    let idsInCart =  get('products');
    let total = 0;
    ajax("http://localhost:3000/api/furniture").then((products) => {
        products.forEach((product) => {
            if (idsInCart.includes(product._id)) {
                total += product.price
                displayProduct(product);
                listenForItemRemoving(product._id);
            }
        });

        listenForCartEmptying();
        displayTotal(total);
        listenForCartSubmission();
    })
}

function listenForCartSubmission() {
    document.getElementById('orderForm').addEventListener('submit', (e) => {
        e.preventDefault()
        submitForm().then((response) => {
            console.log('Retour du backend')
            console.log(response)
        });
    });
}


function listenForCartEmptying() {
    document.getElementById('clear').addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}

function listenForItemRemoving(id) {
    document.getElementById('remove-' + id).addEventListener('click', () => {
        // on  récupère les id du storage
        // on retire l'identifiant du pdt du tableau récupéré
        // mis a jour le nouveau tableau avec un id en moins
        // store('products' nouveau tableau)
        localStorage.removeItem('products');
        location.reload();
    })
}

function displayTotal(total) {
    document.getElementById('totalCost').innerHTML = 'Prix total = ' + total / 100 + ',00€';
}

function displayProduct(product) {
    document.getElementById('productCart').innerHTML += renderProduct(product, "Cart");
    };


