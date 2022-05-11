$(document).ready(function () {
  getListCategories();
});

function getListCategories() {
  $.ajax({
    type: "GET",
    url: location.protocol + "//" + location.host + `/api/categories`,
    dataType: "json",
  })
    .done(function (response) {
      console.log(response);
      let data =
        '<li class="nk-menu-item">' +
        '                                <a href="/admin/categories" class="nk-menu-link"><span' +
        '                                        class="nk-menu-text">Xem tất cả danh mục</span></a>' +
        '                            </li><li class="nk-menu-item">' +
        '                                <a href="/admin/products" class="nk-menu-link"><span' +
        '                                        class="nk-menu-text">Xem tất cả sản phẩm</span></a>' +
        "                            </li>";
      response.category.forEach(function (item, index) {
        data +=
          '<li class="nk-menu-item">' +
          `                                <a href="/admin/${item._id}/products" class="nk-menu-link"><span` +
          `                                       class="nk-menu-text">${item.nameCategory}</span></a>` +
          "                            </li>";
      });
      $("#list-categories").html(data);
    })
    .fail(function (response) {});
}
