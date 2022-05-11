$(function () {
    // Get the form.
    var form = $("#edit-account-form");
  
    $("#save-account").click(() => {
      // Serialize the form data.
      let password = $("#password").val();
      let newPassword = $("#newPassword").val();
      const formData = { password, newPassword };
  
      $(".basic-login .message-error").text("");
      $(".basic-login .message-error").removeClass("error");
  
      $("#save-account").prop("disabled", true);
      $("#save-account").text("");
      $("#save-account").removeClass("btn btn-primary");
      $("#save-account").html(
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
            $("#save-account").text("Update successful");
            $("#save-account").addClass("btn btn-success");
            $(".basic-login .message-error").text("");
            $(".basic-login .message-error").removeClass("error");
          }
        })
        .fail(function (response) {
          $("#save-account").text("Save changes");
          $("#save-account").addClass("btn btn-primary");
          $("#save-account").prop("disabled", false);
  
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
  
    $("#open-modal-changePassword").click(() => {
      $("#save-account").text("Save changes");
      $("#save-account").removeClass("btn btn-success");
      $("#save-account").addClass("btn btn-primary");
      $("#save-account").prop("disabled", false);
      $("#password").val('');
      $("#newPassword").val('');
      $(".basic-login .message-error").text("");
      $(".basic-login .message-error").removeClass("error");
    });
  });
  