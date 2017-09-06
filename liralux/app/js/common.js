$(function() {

    $('.search_icon i').click(function() {
        $('.search_icon input').animate({
            opacity: 1
        }, 1500, function() {})
    });

    /*--------------------------------------------------*/
    /*  Mobile Navigation
    /*--------------------------------------------------*/
    var jPanelMenu = $.jPanelMenu({
        menu: '#responsive',
        animated: false,
        duration: 200,
        keyboardShortcuts: false,
        closeOnContentClick: true
    });


    // Desktop devices
    $('.menu-trigger').click(function() {
        var jpm = $(this);

        if (jpm.hasClass('active')) {
            jPanelMenu.off();
            jpm.removeClass('active');
        } else {
            jPanelMenu.on();
            jPanelMenu.open();
            jpm.addClass('active');
            // Removes SuperFish Styles
            $('#jPanelMenu-menu').removeClass('menu');
            $('ul#jPanelMenu-menu li').removeClass('dropdown');
            $('ul#jPanelMenu-menu li ul').removeAttr('style');
            $('ul#jPanelMenu-menu li div').removeClass('mega');
            $('ul#jPanelMenu-menu li div').removeAttr('style');
            $('ul#jPanelMenu-menu li div div').removeClass('mega-container');
        }
        return false;
    });

    $('.search-trigger')
        .on('click', function() {
            $('.responsive-search').slideToggle(200);
            $('.search-trigger').toggleClass("active");
        });

    //SVG Fallback
    if (!Modernizr.svg) {
        $("img[src*='svg']").attr("src", function() {
            return $(this).attr("src").replace(".svg", ".png");
        });
    };

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