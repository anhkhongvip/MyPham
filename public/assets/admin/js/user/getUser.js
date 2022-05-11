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
          $(".user-info .user-name").text(user.userName);
          $(".user-info .lead-text").text(user.userName);
        } 
      })
      .fail(function (error) {
        console.log(error);
      });
  }
  