
const dialog = $(".window");
const send = $('.send');
const text = $('.textmessage');
const dots = $('.dots');
const graybtn = $('.gray-button');
let start = false;
let n1 = 0;
let n2 = 0;
let count = false;

function check() {
    if (text.val() != '') {
        graybtn.hide();
        send.show();
        dots.removeClass('nodisplay');
    } else {
        graybtn.show();
        send.hide();
        dots.addClass('nodisplay');
    }
}
send.click(async function() {
    let botIcon = $('<img src="img/avatar_b.svg">');
    let userIcon = $('<img src="img/avatar_u.svg">');
    let message = $("<div class='message'></div>");
    let userM = $('<div class="userM"></div>');
    let botM = $('<div class="botM"></div>');
    let answer = $("<div class='message'></div>");
    userM.append('<p>' + text.val() + '</p>');
    message.append(userIcon, userM);
    dialog.append(message);
    message.animate({ opacity: 1 }, 500);
    dialog.animate({ scrollTop: dialog.prop('scrollHeight') }, "slow");

    if (text.val() == '/start') {
        botM.append('<p>Привет, меня зовут Чат-бот, а как зовут тебя?</p>');
        start = true;

    } else if (text.val() !== '/start' && start == false) {
        botM.append('<p>Введите команду /start, для начала общения</p>');

    } else if (start == true) {
        let arr = text.val().split(':');
        if (arr[0] == '/name') {
            botM.append('<p>Привет ' + arr[1] + ', приятно познакомится. Я умею считать, введи числа которые надо посчитать</p>');
        } else if (arr[0] == '/number') {
            count = true;
            let nums = arr[1].split(',');
            n1 = Number(nums[0]);
            n2 = Number(nums[1]);
            botM.append('<p>Введи одно из действий:  -, +, *, / ?</p>');
        } else if (count == true && text.val() == '-') {
            let result = (n1 - n2);
            botM.append('<p>' + n1 + '-' + n2 + '=' + result + '</p>');
            count = false;
        } else if (count == true && text.val() == '+') {
            let result = n1 + n2;
            botM.append('<p>' + n1 + '+' + n2 + '=' + result + '</p>');
            count = false;
        } else if (count == true && text.val() == '*') {
            let result = n1 * n2;
            botM.append('<p>' + n1 + '*' + n2 + '=' + result + '</p>');
            count = false;
        } else if (count == true && text.val() == '/') {
            let result = n1 / n2;
            botM.append('<p>' + n1 + '/' + n2 + '=' + result + '</p>');
            count = false;
        } else if (arr[0] == '/weather') {
           let url = 'http://api.openweathermap.org/data/2.5/weather?q=Moscow&appid=76ad991e0ee553e335a0bbfee4bd6d75';
            let response = await fetch(url);
            let data = await response.json();
            botM.append('<p> Today the weather in Moscow is  ' + data.weather[0].description +' </p>');
       }
        else if (arr[0] == '/stop') {
            botM.append('<p>Всего доброго, если хочешь поговорить пиши /start</p>');
            start = false;
        } else {
            botM.append('<p>Я не понимаю, введите другую команду!</p>');
        }
    }

    answer.append(botIcon, botM);
    setTimeout(function() {
        dialog.append(answer);
        answer.animate({ opacity: 1 }, 500);
        dialog.animate({ scrollTop: dialog.prop('scrollHeight') }, "slow");
    }, 888);
    text.val('');
    check();
});