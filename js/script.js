// document ready
$(() =>{
    $('a#submit').click( sendComment );
});


var sendComment = function() {

    if ( validate() ) {
        var reqest = $('#form').serialize();

        $.get(
            '/api',
            reqest,
            data => {
                renderCards(data);
            }
        )
    }

    return false;
}

var validate = function(){

    if ($('#name_inp').val().length < 3) {
        alert('Поле "имя" не заполнено!');
        return false;
    }

    // regexp for email
    var RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( !RE.test( $('#email_inp').val() ) ) {
        alert('Поле "email" не заполнено!');
        return false;
    }

    if ($('#comment_inp').val().length < 3) {
        alert('Поле "комментарий" не заполнено!');
        return false;
    }
    return true;
}


var renderCards = function(data) {

    var cards = JSON.parse( data ),
        HTML = "";

    cards.map( card => {
        var cardHTML = 
        '<div class="col-9 col-sm-6 col-lg-4 card_wrapper">' +
            '<div class="card">'+
                '<div class="card_title">'+ card.name +'</div>'+
                '<div class="card_body">'+
                    '<div class="card_email">'+ card.email +'</div>'+
                    '<div class="card_msg">'+ card.message +'</div>'+
                '</div>'+
            '</div>'+
        '</div>';
        HTML += cardHTML;
    } );

    $('#cards_container').html( HTML );

    $('section.cards').slideDown(300);
}