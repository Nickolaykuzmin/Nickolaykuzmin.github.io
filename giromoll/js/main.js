// Скрипт scrollto-min
;(function(f){"use strict";"function"===typeof define&&define.amd?define(["jquery"],f):"undefined"!==typeof module&&module.exports?module.exports=f(require("jquery")):f(jQuery)})(function($){"use strict";function n(a){return!a.nodeName||-1!==$.inArray(a.nodeName.toLowerCase(),["iframe","#document","html","body"])}function h(a){return $.isFunction(a)||$.isPlainObject(a)?a:{top:a,left:a}}var p=$.scrollTo=function(a,d,b){return $(window).scrollTo(a,d,b)};p.defaults={axis:"xy",duration:0,limit:!0};$.fn.scrollTo=function(a,d,b){"object"=== typeof d&&(b=d,d=0);"function"===typeof b&&(b={onAfter:b});"max"===a&&(a=9E9);b=$.extend({},p.defaults,b);d=d||b.duration;var u=b.queue&&1<b.axis.length;u&&(d/=2);b.offset=h(b.offset);b.over=h(b.over);return this.each(function(){function k(a){var k=$.extend({},b,{queue:!0,duration:d,complete:a&&function(){a.call(q,e,b)}});r.animate(f,k)}if(null!==a){var l=n(this),q=l?this.contentWindow||window:this,r=$(q),e=a,f={},t;switch(typeof e){case "number":case "string":if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(e)){e= h(e);break}e=l?$(e):$(e,q);if(!e.length)return;case "object":if(e.is||e.style)t=(e=$(e)).offset()}var v=$.isFunction(b.offset)&&b.offset(q,e)||b.offset;$.each(b.axis.split(""),function(a,c){var d="x"===c?"Left":"Top",m=d.toLowerCase(),g="scroll"+d,h=r[g](),n=p.max(q,c);t?(f[g]=t[m]+(l?0:h-r.offset()[m]),b.margin&&(f[g]-=parseInt(e.css("margin"+d),10)||0,f[g]-=parseInt(e.css("border"+d+"Width"),10)||0),f[g]+=v[m]||0,b.over[m]&&(f[g]+=e["x"===c?"width":"height"]()*b.over[m])):(d=e[m],f[g]=d.slice&& "%"===d.slice(-1)?parseFloat(d)/100*n:d);b.limit&&/^\d+$/.test(f[g])&&(f[g]=0>=f[g]?0:Math.min(f[g],n));!a&&1<b.axis.length&&(h===f[g]?f={}:u&&(k(b.onAfterFirst),f={}))});k(b.onAfter)}})};p.max=function(a,d){var b="x"===d?"Width":"Height",h="scroll"+b;if(!n(a))return a[h]-$(a)[b.toLowerCase()]();var b="client"+b,k=a.ownerDocument||a.document,l=k.documentElement,k=k.body;return Math.max(l[h],k[h])-Math.min(l[b],k[b])};$.Tween.propHooks.scrollLeft=$.Tween.propHooks.scrollTop={get:function(a){return $(a.elem)[a.prop]()}, set:function(a){var d=this.get(a);if(a.options.interrupt&&a._last&&a._last!==d)return $(a.elem).stop();var b=Math.round(a.now);d!==b&&($(a.elem)[a.prop](b),a._last=this.get(a))}};return p});


var pagewidth = 0, start_page_width = 0, // для определения ширины устройства
	resizeTimeout = false,

	text_val_text = '', text_val_deftext = '',  // Переменные для работы с формами
    resp_tesis_modal_ok = '', resp_tesis_modal_error = '', // Заголовки для модальных окон результатов отправки
    text_for_modal_title = '', color_tov = false, title_tov = false, price_tov = 0,
    scrollTimeout = null, lastScrollTop = 0,
    top_scroll = new Array(), menu_items = new Array(), active_elem_menu = 1,
    obj_fixed_m = false,
    obj_mobile_m = false;


function  getPageWidth(){
    if (self.innerWidth) { // all except Explorer
        return self.innerWidth;
    } else if (document.documentElement && document.documentElement.clientWidth) { // Explorer 6 Strict Mode
        return document.documentElement.clientWidth;
    } else if (document.body) { // other Explorers
        return document.body.clientWidth;
    }
}

function compare_height_matrix(elems, num_in_line) {
	var i = 0, max_height = 0, el_height = 0;
	$( elems ).each(function() {
		el_height = $(this).height();
		if( max_height < el_height ) {
			max_height = el_height;
		}
		i++;

		if( ( i % num_in_line ) == 0 ) {
			$( elems ).slice( ( i-num_in_line ) , i ).height( max_height );
			max_height = 0;
		}
	});

	//console.log( 'length = ' + elems.length % num_in_line );

	// Если последняя строка не полная
	var last_sum = elems.length % num_in_line;
	if ( last_sum > 0 ) {
		i = 0, max_height = 0, el_height = 0;
		elems.slice( elems.length - last_sum, elems.length ).each(function() {
			el_height = $(this).height();
			if( max_height < el_height ) {
				max_height = el_height;
			}
		});
		elems.slice( elems.length - last_sum, elems.length ).height( max_height );
	}
}

function clear_height( jq_txt ) {
	$( jq_txt ).each(function() {
		$(this).removeAttr('style');
	});
}

function compare_height_howweworks() {
	var obj_how_we_work = $('.how-we-works .how-steps > li');
    var num_el_hww = 0;
    if( pagewidth < 590 ) {
    	num_el_hww = 1;
    } else if( pagewidth < 768 ) {
    	num_el_hww = 2;
    } else if( pagewidth < 1100 ) {
    	num_el_hww = 3;
    } else {
    	num_el_hww = 5;
    }

    if ( num_el_hww > 1 ) {
        compare_height_matrix( obj_how_we_work, num_el_hww );
    } else {
        clear_height('.how-we-works .how-steps > li');
    }
}

function compare_height_service() {

    var obj_serv = $('.service-center .servcentr-wrap > div');
    var num_el_serv = 0;
    if( pagewidth < 590 ) {
        num_el_serv = 1;
    } else if( pagewidth < 768 ) {
        num_el_serv = 2;
    } else {
        num_el_serv = 3;
    }

    if( num_el_serv > 1 ) {
        compare_height_matrix( obj_serv, num_el_serv );
    } else {
        clear_height('.service-center .servcentr-wrap > div');
    }
}


function compare_height_benef() {
    var obj_benef = $('.round-benefits-wrap ul > li');

    if( pagewidth > 840 && pagewidth < 1100 ) {
        compare_height_matrix( obj_benef, 2 );
    } else {
        clear_height('.round-benefits-wrap ul > li');
    }

}


// обработчик события resizing
function get_resizing () {
    pagewidth = getPageWidth(); // Определяем ширину устройства

	compare_height_howweworks();
    compare_height_service();
    compare_height_benef();


    if( pagewidth > 920 ) {
        var obj_mobile_gamb = $('.fixed-menu-top .gamburger-menu');
        var obj_mobile_menu = $('.fixed-menu-top .mobile-menu');
        // Если мобильное меню открыто
        if( obj_mobile_gamb.hasClass('opened') != false ) {
            obj_mobile_gamb.removeClass('opened');

            obj_mobile_menu.removeAttr('style');
        }
    }

    if(pagewidth > 590 ) {
        $('.one-tov .open-txt-container[style]').removeAttr('style');
    }
}

    function validateEmail(email) {
        var reg = /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
        return reg.test(email);
    }

    function validateName(name) {
        var reg = /^[A-zА-яЁё\s]+(\s+|\s?)([A-zА-яЁё]+|[A-zА-яЁё]?)+(\s+|\s?)$|^[A-zА-яЁё]+\s+[A-zА-яЁё]+\s+[A-zА-яЁё]+(\s+|\s?)$/i; //если начинается с русских или английских символов, но не содержит других символов, и может иметь много или ни одного пробела после
        return reg.test(name);
    }

    function validatePhone(phone) {
        var reg = /^[0-9\(\)\-\+\s]+(\s+|\s?)$/i; //если состоит из цифр, скобочек, -, +.
        return reg.test(phone);
    }

    function more_validate(str) {
        var pattern = /\s\s+/g; //указали шаблон для замены двух и более пробелов на один
        str = str.replace(pattern, ' ');

        // Убираем пробелы снаружи
        pattern = /(^\s?|\s?$)/g;

        str = str.replace(pattern, '');
        return str;
    }

    function quick_validate(str) {
        var pattern = /^\s+$/;
        return pattern.test(str);
    }

    function get_after_scroll() {
    var st = $(this).scrollTop();
    if (st > lastScrollTop){
        if( st > 100 ) {  // Если проскроллили вниз, то добавляем класс хеадеру

            var obj_header = $('.fixed-menu-top');
            if( obj_header.hasClass('scrolling') == false ) {
                obj_header.addClass('scrolling');
            }
        }

    } else {
        if( st < 200 ) {   // Если проскролили в самый верх, то удаляем класс скролла

            var obj_header = $('.fixed-menu-top');
            if( obj_header.hasClass('scrolling') == true ) {
                obj_header.removeClass('scrolling'); 
            }
        }
    }

        // Если динамическое меню отображается
        render_dynamic_menu( st );
    lastScrollTop = st;
}

function init_scroll_elements() {
    $('*[data-dynamicmenu]').each(function(v_index) {
        top_scroll[v_index] = {
            value : $(this).offset().top
        };
    });
}

function render_dynamic_menu( st ) {
    init_scroll_elements();
    var part_height_screen = parseInt( $(window).height() ); // узнали высоту экрана в момент скролла
    var line_display = st + part_height_screen;

    var length_mas = top_scroll.length - 1;
    for( i = length_mas; i >= 0; i-- ) {
        if( top_scroll[0].value <= line_display ) { // Если отступ у первого элемента меньше скролла страницы
            if( top_scroll[i].value <= line_display ) {
                if( ( i + 1 ) != active_elem_menu ) {
                    active_elem_menu = i + 1;
                    set_active_item( active_elem_menu );
                }
                return;
            }
        } else { // Если скролл страницы меньше отсупа первого элемента

            if( active_elem_menu != 1 ) {
                active_elem_menu = 1;
                set_active_item( active_elem_menu );
            }
            return;
        }
    }
}

function set_active_item(item) {    // Устанавливаем активный пункт ползунка меню

    obj_fixed_m.filter('.active').removeClass('active');
    obj_fixed_m.eq( item - 1 ).addClass('active');

    obj_mobile_m.filter('.active').removeClass('active');
    obj_mobile_m.eq( item - 1 ).addClass('active');
}



$(document).ready(function() {
	pagewidth = getPageWidth(); // Определяем ширину устройства

    obj_fixed_m = $('.fixed-menu-top .fixed-menu li');
    obj_mobile_m = $('.fixed-menu-top .mobile-menu > ul > li');


	$(".slider-catalog").owlCarousel({
		slideSpeed : 450,
        pagination : true,
		paginationSpeed : 450,
		navigation : false,
        items: 1,
        singleItem : true,
		afterInit: function() {
			var obj_pagination = this.paginationWrapper;
			this.owl.owlItems.each(function(v_index){
				var atr_src = $(this).children('img').attr('src');

				var reg = /\/[A-Za-z0-9_-]*\./i;
				atr_src = atr_src.match( reg );
				atr_src = atr_src[0].slice(0,-1).substr(1);
				//console.log('attr = ' + atr_src );

				obj_pagination.children().eq( v_index ).attr('color', atr_src );
			});
			obj_pagination.before('<p>Выбрать цвет:</p>');

			var parent_obj = this.owl.baseElement;
			if( this.itemsAmount > 9 ) {
				parent_obj.closest('.main-side').addClass('height4');
			} else if( this.itemsAmount > 7 ) {
				parent_obj.closest('.main-side').addClass('height3');
			} else if( this.itemsAmount > 4 ) {
				parent_obj.closest('.main-side').addClass('height2');
			}

            if( this.itemsAmount == 1 ) {
                obj_pagination.parent().css({'display':'block'});
            }
		},
		afterUpdate: function() {
			var obj_pagination = this.paginationWrapper;
			this.owl.owlItems.each(function(v_index){
				var atr_src = $(this).children('img').attr('src');

				var reg = /\/[A-Za-z0-9_-]*\./i;
				atr_src = atr_src.match( reg );
				atr_src = atr_src[0].slice(0,-1).substr(1);
				//console.log('attr = ' + atr_src );

				//console.log( 'v_index = ' + v_index );
				obj_pagination.children().eq( v_index ).attr('color', atr_src );
			});
            
            if( this.itemsAmount == 1 ) {
                obj_pagination.parent().css({'display':'block'});
            }
		}
      });
	

	var owl_partners_main = $(".slider-review");
      owl_partners_main.owlCarousel({
      	itemsCustom : [
        [0, 1],
        [823, 2]
      ],
		navigation : true,
		slideSpeed : 450,
		paginationSpeed : 450,
		margin:20,
		navigationText : ["<span></span>","<span></span>"]
      });



    $('.questions .top-block').on('click', function() {
    	$(this).parent('.quest-list').toggleClass('opened');
    	$(this).siblings('.tesis-quest').slideToggle(450);
    });

    // Обработчик risze
    function onResize(){
        var new_page_width = getPageWidth();
        if ( pagewidth == new_page_width ) return;

        clear_height('.how-we-works .how-steps > li');
        clear_height('.service-center .servcentr-wrap > div');
        clear_height('.round-benefits-wrap ul > li');

        start_page_width = pagewidth; // запомнили величину ширины экрана
        if(resizeTimeout){
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(get_resizing, 300);
    }

    // Resize listener
    $(window).resize(onResize);



    


    $('form .input-wrap').on('click', function() {
    	$(this).children('input').trigger('focus');
    });

    // Обработчик получения фокуса input
        $('form').find('input[type=text], input[type=tel]').focus(function() {
            var obj_this = $(this);

            if( obj_this.hasClass('ready') ) {
                obj_this.removeClass('ready');
            }
            if( obj_this.val() == $(this).data('dvalue') ) {
                obj_this.val('');
            }

            obj_this.parent('.input-wrap').addClass('focused');
        });

        // Обработчик потери фокуса input
        $('form').find('input[type=text], input[type=tel]').blur(function() {
            var obj_this = $(this);

            obj_this.parent('.input-wrap').removeClass('focused');

            if( obj_this.val() == '' || quick_validate( obj_this.val() ) == true ) { // Если значение пусто или состоит из нескольких пробелов
                obj_this.val( obj_this.data('dvalue') );

                if( obj_this.parent('.input-wrap').hasClass('required') ) {
                    obj_this.parent('.input-wrap').removeClass('required');
                }

            } else {
                if( obj_this.val() != obj_this.data('dvalue') ) {

                    if( obj_this.hasClass('fname') ) { // Поле "Ваше имя"

                        var name = obj_this.val();
                        if( name.length < 3) {
                            if( !obj_this.parent('.input-wrap').hasClass('required') ) {
                                obj_this.parent('.input-wrap').addClass('required');
                            }
                            obj_this.removeClass('ready');
                            return;
                        } else {    // Если в имени больше 3 символов
                            result_name = validateName(name);
                            if( result_name == false ) {
                                if( !obj_this.parent('.input-wrap').hasClass('required') ) {
                                    obj_this.parent('.input-wrap').addClass('required');
                                }
                                obj_this.removeClass('ready');
                                return;
                            }
                            var pattern2 = /^Ваш комментарий(\s+|\s?)$/;
                            result_name = pattern2.test(name);
                            if( result_name == true ) {  // если в данном поле введено слово "Сообщение" и пробелы
                                if( !obj_this.parent('.input-wrap').hasClass('required') ) {
                                    obj_this.parent('.input-wrap').addClass('required');
                                }
                                obj_this.removeClass('ready');
                                return;
                            }
                        }
                    } // конец условий для "Ваше имя"

                    if( obj_this.hasClass('fphone') ) { // Поле "Номер телефона"
                        var phone = obj_this.val();
                        if( phone.length < 5) {
                            if( !obj_this.parent('.input-wrap').hasClass('required') ) {
                                obj_this.parent('.input-wrap').addClass('required');
                                
                            }
                            obj_this.removeClass('ready');
                            return;
                        } else {
                            result_phone = validatePhone(phone);
                            if( result_phone == false ) {
                                if( !obj_this.parent('.input-wrap').hasClass('required') ) {
                                    obj_this.parent('.input-wrap').addClass('required');
                                }
                                obj_this.removeClass('ready');
                                return;
                            }
                        }
                    }   // конец условий для "Номер телефона"

                    if( obj_this.hasClass('fmail') ) { // Поле "E-mail"
                        var mail = obj_this.val();
                        result_validate_mail = validateEmail(mail);
                        if( result_validate_mail == false ) {
                            if( !obj_this.parent('.input-wrap').hasClass('required') ) {
                                obj_this.parent('.input-wrap').addClass('required');
                            }
                            obj_this.removeClass('ready');
                            return;
                        }
                    }

                    obj_this.addClass('ready'); 

                    if( obj_this.parent('.input-wrap').hasClass('required') ) {
                        obj_this.parent('.input-wrap').removeClass('required');
                    }
                }
            }
        });




	// Закрытие модальных окон при клике на фоне
	$('.modal-window').on('click', function(event) {
		if( $( event.target ).closest('.content-windows').length != 1 ) {
			$(this).stop(true, true).fadeOut(450);
		}
	});

	// Закрытие модальных окон при клике на внутренних элементах
	$('.modal-window .close-window, .btn-red-inline[data-action=close-this-window]').on('click', function() {
		$(this).closest('.modal-window').stop(true, true).fadeOut(450);
	});

	// Открытие модальных окон
	$("*[data-modw]").on('click', function( event ) {
		event.preventDefault();

		// Если кнопка в карточке товара
        var obj_parent_tov = $(this).closest('.one-tov');
        if( obj_parent_tov.length != false ) {
            color_tov = obj_parent_tov.find('.owl-pagination .active').attr('color');
            title_tov = obj_parent_tov.find('.title-tov').text();
            price_tov = obj_parent_tov.find('.price-tov').text();
        }

		text_for_modal_title = $(this).text();
		$('#send-call').find('.form-send-title').html( text_for_modal_title );

		$('#send-call').stop(true, true).fadeIn(450);

	});

    //Send AJAX!
    $('form .btn-red-inline').on('click', function() { //console.log( 'mail_adress ' + window.mail_adress );

            var bol_form_input = true;  // флажок корректности полей
            var modal_sent = $('#result-sending'); // объект-ссылка на модальное окно
            var emptyfields = $(this).closest('form').find("input.valid,textarea.valid"),
            btn_sending = $(this);

            // проверка полей на содержание ошибки
            emptyfields.each(function() {
                if ( !$(this).hasClass('ready') || ( $(this).val() == $(this).data('dvalue') ) ) {
                    bol_form_input = false;

                    var this_obj = $(this).parent('.input-wrap');
                    this_obj.stop(true, true)
                        .animate({ left: "-5px" }, 100).animate({ left: "5px" }, 100)
                        .animate({ left: "-5px" }, 100).animate({ left: "5px" }, 100)
                        .animate({ left: "0px" }, 100)
                        .addClass("required");
                }
            });

            //если поля введены корректно
            if( bol_form_input == true ) {
                var nameval, phoneval, msgval, emailval,  // переменные обр. форм
                resp_tesis_modal_ok = 'Наш менеджер свяжется с вами в ближайшее время',
                resp_tesis_modal_error = 'Возникли неполадки с соединением, позвоните нам лучше напрямую';

                phoneval = $(this).closest('form').find("input.fphone").val();   //поле "Введите ваш номер телефона"
                nameval = $(this).closest('form').find("input.fname").val();    //поле "Введите ваше имя"
                //emailval = $(this).closest('form').find("input.fmail").val();    //поле "Ваш email
                //msgval = $(this).closest('form').find('textarea').val();  // поле "Комментарий"

                //msgval = msgval ? msgval : '';

                phoneval = more_validate(phoneval); // Убрали лишние пробелы с поля "Телефон"
                nameval = more_validate(nameval); // Убрали лишние пробелы с поля "Имя"
                //emailval = more_validate(emailval);
                var text_for_modal = $('.form-send-title').text();


                // сначала мы скрываем форму отправки
                $('#send-call .close-window').trigger('click'); // закрыли окно
                console.log(text_for_modal);

                if (text_for_modal === 'Заказать гироскутер') {
                    data_sending = {
                         name: nameval,
                        phone: phoneval,
                        title: text_for_modal,
                        color: color_tov,
                        price: price_tov,
                        title_t: title_tov,
                    }
                }
                else{
                    data_sending = {
                        name: nameval,
                        phone: phoneval
                    };
                }


                $.ajax({
                    type: 'POST',
                    url: 'http://giromoll.ru/form.php',
                    dataType: 'json',
                    data: data_sending,
                })
                .success(function(data) {
                    
                        var obj_send_res = $('#result-sending');
                        if(data == "true") {
                            if( obj_send_res.hasClass('send-error') ) {
                                obj_send_res.removeClass('send-error');
                            }

                            // Если нет класса, символиз. успешную отправку, добавляем его
                            if( obj_send_res.hasClass('send-success') == false ) {
                                obj_send_res.addClass('send-success');
                            }

                            // Задали требуемый текст для заголовка и тезиса окна
                            obj_send_res.find('.form-send-tesis').html(resp_tesis_modal_ok);

                        } else {

                            if( obj_send_res.hasClass('send-success') ) {
                                obj_send_res.removeClass('send-success');
                            }

                            // Если нет  класса ошибки, добавляем
                            if( obj_send_res.hasClass('send-error') == false ) {
                                obj_send_res.addClass('send-error');
                            }

                            obj_send_res.find('.form-send-tesis').html(resp_tesis_modal_error);
                        }

                        // Затираем все текстовые поля на дефолтные
                        btn_sending.closest( 'form' ).find( 'input[type=text], input[type=tel]' ).each( function() {
                            $(this).val( $(this).data('dvalue') );
                            $(this).removeClass('ready');
                        });
                        /*
                        // Если в форме есть поле для комментария
                        var obj_textarea_form = btn_sending.closest('form').find('textarea');
                        if( obj_textarea_form.length > 0 ) { // задали дефолтные значения для textarea
                            obj_textarea_form.attr('value', text_val_deftext );
                            obj_textarea_form.removeClass('ready');
                        }*/

                        $('#send-call .close-window').trigger('click'); // Закрываем окно с формой через делегирование события
                        color_tov = false; title_tov = false;
                        $('#result-sending').stop(true, true).fadeIn(450); // показ окна с результатом
                });
            }

    });




	$('form').on('submitеее', function() {
		return false;
	});


	$('a[data-linkbl]').on('click', function(event) {
		event.preventDefault();

		var href_block = $(this).attr('data-linkbl');
        var num_offset = 0;

        var obj_mobile_menu = $('.fixed-menu-top .mobile-menu');
        var obj_fixed_menu = $('.fixed-menu-top');

        if( obj_mobile_menu.css('display') == 'block' ) {
            num_offset = num_offset + obj_mobile_menu.height();
        }
        num_offset = num_offset + obj_fixed_menu.height();
		jQuery.scrollTo( '#'+href_block, 450, {offset: -num_offset} );
	});


    

    // Раскрытие мобильного меню
    $('.fixed-menu-top .gamburger-menu').on('click', function(event) {
        event.preventDefault();

        $(this).toggleClass('opened');
        $('.fixed-menu-top .mobile-menu').fadeToggle(250);
    });

        
    

    // Обработка клика на логотипе
    $('.logo-main').on('click', function(event) {
        event.preventDefault();
        jQuery.scrollTo( 'header', 450 );
    });

    $(window).scroll(function() {
        if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function(){get_after_scroll()},250);
    });

    $('.open-txt-btn').on('click', function(){
        $(this).siblings('.open-txt-container').slideToggle(450);
    });

}); // document ready


function parseGetParams() { 
   var $_GET = {}; 
   var __GET = window.location.search.substring(1).split("&"); 
   for(var i=0; i<__GET.length; i++) { 
      var getVar = __GET[i].split("="); 
      $_GET[getVar[0]] = typeof(getVar[1])=="undefined" ? "" : getVar[1]; 
   } 
   return $_GET; 
} 


$(window).load(function() {
    compare_height_howweworks();
    compare_height_service();
    compare_height_benef();

    init_scroll_elements(); // Инициализация данных для работы скролла страницы
});