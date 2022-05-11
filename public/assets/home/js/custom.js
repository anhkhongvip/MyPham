$(document).ready(function () {
  $(".product-modal-cart-btn").click(function (e) {
    e.preventDefault();
    let totalMoney = $(".cartmini__total span").text().replace("$", "");
    totalMoney = Number(totalMoney);
    
    let product_id = $(this).attr("data-id");
    let stock = $(".product__modal-available span").attr("stock");
    stock = stock.replace(/[^0-9]/g, "");
    let name = $(".product__modal-title a").text();
    let price = $(".product__modal-price .price").text().replace("$", "");
    let image = $(".product__modal-thumb img").attr("src");
    let quantity = $(".product-quantity input").val();
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      let index = cart.findIndex((item) => item.product_id == product_id);
      if (index != -1) {
        let s = Number(quantity) + Number(cart[index].quantity);
        if (s > Number(stock)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Số lượng hàng trong kho không đủ!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Thêm vào giỏ thành công!",
            timer: 1500,
          });
          cart[index].quantity = s;
          $(`#item-${cart[index].product_id} .cartmini__price`).text(
            `${s} × ${cart[index].price}`
          );
          localStorage.setItem("cart", JSON.stringify(cart));
          totalMoney += Number(quantity) * Number(price);
          $(".cartmini__total span").text(`$${totalMoney}`);

          let countProduct = $("#countProduct").text();
          countProduct = Number(countProduct) + Number(quantity);
          $("#countProduct").text(countProduct);
        }
      } else {
        if (Number(quantity) > Number(stock)) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Số lượng hàng trong kho không đủ!",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Thêm vào giỏ thành công!",
            timer: 1500,
          });

          cart.push({ product_id, name, price, quantity, image, stock });
          localStorage.setItem("cart", JSON.stringify(cart));
          addProductToCart(
            product_id,
            image,
            name,
            quantity,
            price,
            totalMoney
          );
        }
      }
    } else {
      if (Number(quantity) > Number(stock)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Số lượng hàng trong kho không đủ!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Thêm vào giỏ thành công!",
          timer: 1500,
        });
        $(".cartmini__list ul").html(""); // Xóa bỏ chữ danh sách trống
        localStorage.setItem(
          "cart",
          JSON.stringify([{ product_id, name, price, quantity, image, stock }])
        );
        addProductToCart(product_id, image, name, quantity, price, totalMoney);
      }
    }
  });
});

function addProductToCart(
  product_id,
  image,
  name,
  quantity,
  price,
  totalMoney
) {
  let content =
    "" +
    `<li class="cartmini__item p-rel d-flex align-items-start" id="item-${product_id}">` +
    '                            <div class="cartmini__thumb mr-15">' +
    '                                <a href="javascript:void(0)">' +
    `                                    <img src="${image}" alt="">` +
    "                                </a>" +
    "                            </div>" +
    '                            <div class="cartmini__content">' +
    '                                <h3 class="cartmini__title">' +
    `                                    <a href="javascript:void(0)">${name}</a>` +
    "                                </h3>" +
    '                                <span class="cartmini__price">' +
    `                                    <span class="price">${quantity} × $${price}</span>` +
    "                                </span>" +
    "                            </div>" +
    `                            <a href="#" class="cartmini__remove" onclick="RemoveItemCart(\'${product_id}\')">` +
    '                                <i class="fa-light fa-x"></i>' +
    "                            </a>" +
    "                        </li>" +
    "";
  $(".cartmini__list ul").append(content);
  totalMoney += Number(quantity) * Number(price);
  $(".cartmini__total span").text(`$${totalMoney}`);
  let countProduct = $("#countProduct").text();
  countProduct = Number(countProduct) + Number(quantity);
  $("#countProduct").text(countProduct);
}

function btnShowProduct(id) {
  $.ajax({
    url: `${location.protocol}//${location.host}/api/product/${id}`,
    method: "GET",
  })
    .done(function (response) {
      let product = response.product;
      $(".product__modal-thumb img").attr(
        "src",
        `/assets/uploads/${product.productImage}`
      );
      $(".product__modal-title a").text(product.nameProduct);
      $(".product__modal-price .price").text(`$${product.prices}`);
      $(".product__modal-des p").text(product.description);
      $(".product-quantity input").val("1");
      let stock = product.stock;
      let content = "";
      product.colorId.forEach((item) => {
        content +=
          "" +
          ` <li class="me-2"><span class="d-block" style="background-color: ${item.codeColor}; width: 20px; height: 20px; border-radius: 50%;"></span></li>` +
          "";
      });
      $(".product__modal-color ul").html(content);
      $(".product__modal-available span").attr("stock", stock);
      let data = Number(stock) > 0 ? "Còn hàng" : "Hết hàng";
      if (Number(stock) == 0) {
        $(".product__modal-available span").css("color", "red");
      } else {
        $(".product__modal-available span").css("color", "green");
      }
      $(".product__modal-available span").text(data + ` (${stock} còn lại)`);
      $(".product__modal-categories .title-category").text(
        product.categoryId.nameCategory
      );
      $(".product-modal-cart-btn").attr("data-id", id);
    })
    .fail(function (error) {});
}
