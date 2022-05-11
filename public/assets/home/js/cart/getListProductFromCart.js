$(document).ready(function () {
  loadCart();
});

function loadCart() {
  let cart = localStorage.getItem("cart");
  cart = JSON.parse(cart);
  if (cart) {
    let content = "";
    let totalMoney = 0;
    let countProduct = 0;
    cart.forEach((item, index) => {
      countProduct += Number(item.quantity);
      totalMoney += Number(item.quantity) * Number(item.price);
      content +=
        "" +
        `<li class="cartmini__item p-rel d-flex align-items-start" id="item-${item.product_id}">` +
        '                            <div class="cartmini__thumb mr-15">' +
        '                                <a href="javascript:void(0)">' +
        `                                    <img src="${item.image}" alt="">` +
        "                                </a>" +
        "                            </div>" +
        '                            <div class="cartmini__content">' +
        '                                <h3 class="cartmini__title">' +
        `                                    <a href="javascript:void(0)">${item.name}</a>` +
        "                                </h3>" +
        '                                <span class="cartmini__price">' +
        `                                    <span class="price">${item.quantity} × $${item.price}</span>` +
        "                                </span>" +
        "                            </div>" +
        `                            <a href="#" class="cartmini__remove" onClick="RemoveItemCart(\'${item.product_id}\')">` +
        '                                <i class="fa-light fa-x"></i>' +
        "                            </a>" +
        "                        </li>" +
        "";
    });
    $("#countProduct").text(countProduct);
    $(".cartmini__list ul").html(content);
    $(".cartmini__total span").text(`$${totalMoney}`);
  } else {
    $(".cartmini__total span").text(`$0`);
  }
}

function RemoveItemCart(product_id) {
  let countProduct = $("#countProduct").text();
  let totalMoney = $(".cartmini__total span").text().replace("$", "");
  totalMoney = Number(totalMoney);
  let cart = localStorage.getItem('cart');
  if(cart) {
    cart = JSON.parse(cart);
    let index = cart.findIndex(item => item.product_id == product_id);
    let quantity = Number(cart[index].quantity);
    let price = Number(cart[index].price);
    totalMoney = totalMoney - (quantity * price);
    $(`#item-${product_id}`).remove();
    $(".cartmini__total span").text(`$${totalMoney}`);
    countProduct = Number(countProduct) - quantity;
    $("#countProduct").text(countProduct)
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
