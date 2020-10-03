let order = getDataFromUrl('order');
let price = getDataFromUrl('total');
document.getElementById('orderPrice').innerHTML = money(price);
document.getElementById('productOrder').innerHTML = order;
Storage.clear();