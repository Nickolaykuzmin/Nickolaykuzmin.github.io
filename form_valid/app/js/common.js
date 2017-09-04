'use strict';

var $ = function(id) { return document.getElementById(id) };
var sendFormButton = $('send');
var errorColor = 'red';
var doneColor = 'blue';

// site url
var URI = 'https://devdocs.io';

function showErrorMessage(container, error) {
    container.className = 'error';
    var msgElem = document.createElement('span');
    msgElem.className = 'error-message';
    msgElem.style.color = errorColor;
    msgElem.style.fontSize = '12px';
    msgElem.innerHTML = error;
    container.appendChild(msgElem);
    container.querySelector('input').style.border = '1px solid ' + errorColor;

}

function validateEmail(email) {
    var reg = /^\s*(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))\s*$/;
    return reg.test(email);
}

function validatePhone(phone) {
    var reg = /^[0-9\(\)\-\+\s]+(\s+|\s?)$/i; //если состоит из цифр, скобочек, -, +.
    return reg.test(phone);
}

function resetError(container) {
    container.className = '';
    if (container.lastChild.className == "error-message") {
        container.removeChild(container.lastChild);
        container.querySelector('input').style.border = 'none';
    }
}

// function validateDone() {
//     var divs = Array.from(document.querySelectorAll('.head_form div'));

//     divs.map(function(container) {
//         container.querySelector('input').style.border = '1px solid ' + doneColor;
//     });
// }

// query принимаем адрес роута (например users, тогда будет www.site.com/users)
// method принимаем тип запроса (get post update delete)
// data принимаем параметры запроса
function fetchController(query, method, data) {
    var options = {};
    if (method) options.method = method;
    if (method !== 'GET') options.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
    };
    if (data) options.body = JSON.stringify(data);
    return fetch(URI + '/' + query, options)
        .then(function(data) { return data.json() })
        .catch(function(e) { console.log(e) });
}

function sendDataToServer(data) {
    return fetchController('', 'POST', data);
}

sendFormButton.onclick = function() {
    var elems = {
        username: $('username'),
        email: $('email'),
        tel: $('tel'),
        password: $('password')
    }

    resetError(elems.username.parentNode);
    resetError(elems.email.parentNode);
    resetError(elems.tel.parentNode);
    resetError(elems.password.parentNode);

    var emailCheck = validateEmail(elems.email.value);
    var telCheck = validatePhone(elems.tel.value);

    var checkEmptyUsername = !elems.username.value || elems.username.value < 3;
    var checkEmptyEmail = !elems.email.value && !emailCheck;
    var checkWrongEmail = elems.email.value && !emailCheck;
    var checkEmptyTel = !elems.tel.value && !telCheck;
    var checkWrongTel = elems.tel.value && !telCheck;
    var checkEmptyPass = !elems.password.value || elems.password.value < 3;


    if (checkEmptyUsername) {
        showErrorMessage(elems.username.parentNode, 'Укажите пользователя!');
    }

    if (checkEmptyEmail) {
        showErrorMessage(elems.email.parentNode, 'Укажите Email!');
    } else if (checkWrongEmail) {
        showErrorMessage(elems.email.parentNode, 'Неправильный формат Email!');
    }

    if (checkEmptyTel) {
        showErrorMessage(elems.tel.parentNode, 'Укажите Телефон!');
    } else if (checkWrongTel) {
        showErrorMessage(elems.tel.parentNode, 'Неправильный формат телефона!');
    }

    if (checkEmptyPass) {
        showErrorMessage(elems.password.parentNode, 'Укажите Пароль!');
    }

    if (!checkEmptyUsername && !checkEmptyEmail && !checkEmptyTel && !checkEmptyPass) {

        // validateDone();

        document.getElementById('head_form').style.display = 'none';

        document.getElementById('thankyou').style.display = "block";

        var username = elems.username.value || '...'; // || - значение по умолчанию
        var email = elems.email.value || '...';
        var tel = elems.tel.value || '...';
        var password = elems.password.value || '...';

        sendDataToServer({ username, email, tel, password }).then(function(data) {
            // тут принимается ответ от сервера
        });

    }
}