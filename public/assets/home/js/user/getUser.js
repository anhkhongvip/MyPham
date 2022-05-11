$(document).ready(function () {
  getUser();
});

function getUser() {
  $.ajax({
    url: `${location.protocol}//${location.host}/api/getUser`,
    method: "GET",
  })
    .done(function (response) {
      if (response.message == "OK") {
        let user = response.user;
        let content =
          "" +
          ' <a href="/user/personal" id="profile-user" class="d-none d-xxl-inline-block mr-15"></a> ' +
          '                                    <a href="/auth/logout" id="logout-user" class="d-none d-xxl-inline-block "><i class="fa-light fa-arrow-right-from-bracket"></i></a>' +
          "";
        $(".auth-user").html(content);
        $("#profile-user").text(user.userName);
      } 
      else {
        let content =
          "" +
          ' <a href="/login" id="login-user" class="d-none d-xxl-inline-block">Đăng nhập</a>' +
          "";
        $(".auth-user").html(content);
      }
    })
    .fail(function (error) {
      console.log(error);
    });
}
