$(function() {

	// Get the form.
	var form = $('#register-form');

	// Set up an event listener for the form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		let username = $('#username').val();
        let phoneNumber = $('#phoneNumber').val();
        let email = $('#email').val();
        let password = $('#password').val();
        const formData = {username, phoneNumber, email, password};

		$('.basic-login .message-error').text('');
		$('.basic-login .message-error').removeClass('error');

		// Submit the form using AJAX.
		let xhr = $.ajax({
			type: 'POST',
			url: $(form).attr('action'),
            dataType: 'json',
			data: formData,
		})
		.done(function(response) {
            if(response)
            {
				window.location = '/email/notify';
            }
            
		})
		.fail(function(response) {
			let data = response.responseJSON;
			console.log(response);
			let errors = data.error;
			console.log(errors);
			errors.forEach(item => {
				$(`.${item.key}-message`).addClass('error');
				$(`.${item.key}-message`).text(item.err);
			})
		});
	});

});
