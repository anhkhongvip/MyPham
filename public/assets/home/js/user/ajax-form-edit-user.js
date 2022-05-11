$(function () {
  // Get the form.
  var form = $("#edit-user-form");

  $("#save-user").click(() => {
    // Serialize the form data.
    let username = $("#username").val();
    let phoneNumber = $("#phoneNumber").val();
    const formData = { username, phoneNumber };

    $(".basic-login .message-error").text("");
    $(".basic-login .message-error").removeClass("error");

    $("#save-user").prop("disabled", true);
    $("#save-user").text("");
    $("#save-user").removeClass("btn btn-primary");
    $("#save-user").html(
      '<div class="snippet" data-title=".dot-pulse">' +
        '<div class="stage">' +
        '<div class="dot-pulse"></div>' +
        "</div>" +
        "</div>"
    );

    // Submit the form using AJAX.
    $.ajax({
      type: $(form).attr("method"),
      url: $(form).attr("action"),
      dataType: "json",
      data: formData,
    })
      .done(function (response) {
        if (response) {
          console.log(response);
          let data = response.user;
          $("#save-user").text("Update successful");
          $("#save-user").addClass("btn btn-success");
          $(".item-value.item-userName").text(data.userName);
          $(".item-value.item-phoneNumber").text(data.phoneNumber);
          $(".basic-login .message-error").text("");
          $(".basic-login .message-error").removeClass("error");
        }
      })
      .fail(function (response) {
        $("#save-user").text("Save changes");
        $("#save-user").addClass("btn btn-primary");
        $("#save-user").prop("disabled", false);

        let data = response.responseJSON;
        console.log(response);
        let errors = data.error;
        console.log(errors);
        errors.forEach((item) => {
          $(`.${item.key}-message`).addClass("error");
          $(`.${item.key}-message`).text(item.err);
        });
      });
  });

  $("#open-modal-changeUser").click(() => {
    $("#save-user").text("Save changes");
    $("#save-user").removeClass("btn btn-success");
    $("#save-user").addClass("btn btn-primary");
    $("#save-user").prop("disabled", false);
    $("#username").val($(".item-value.item-userName").text().trim());
    $("#phoneNumber").val($(".item-value.item-phoneNumber").text().trim());
    $(".basic-login .message-error").text("");
    $(".basic-login .message-error").removeClass("error");
  });
});
