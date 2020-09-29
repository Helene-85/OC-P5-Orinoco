let order = getDataFromUrl('order');
let price = getDataFromUrl('total');
document.getElementById('orderPrice').innerHTML = (price / 100) + ',00€';
document.getElementById('productOrder').innerHTML = order;
clear();