$(document).ready(function ($) {

    $('#hamburger').click(function () {
        if(!$('#navigation_menu').hasClass('active')){
        	$('#navigation_menu').addClass('active');
        	$('#navigation_menu').slideToggle('slow');
        	alert('ad');
		}
		else{
        	$('#navigation_menu').removeClass('active');
            $('#navigation_menu').slideToggle('slow');
		}
    });

    $('.popup').magnificPopup({
		'type': 'inline'
	});

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	$('a[href*=additional_info]').click(function () {
		event.preventDefault();

		var cart_item = $(this).closest('.cart_item');
		if (cart_item.length !== false){
			var title = cart_item.find('.head_cart_item h4').text();
			$('.additional_info').find('.header_form h3').text(title);

		}
    });

	$('a[href*=additional_button]').click(function () {
        event.preventDefault();

        var cart_item = $(this).closest('.button_cart').find('input').val();
        console.log(cart_item);
            var title = cart_item;
            console.log(title);
            $('.additional_button').find('.header_form h3').text(cart_item);
    });

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});
