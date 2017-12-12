'use strict';

const socket = io();
var textarea = $("#message"),
  chatForm = $("#chatform"),
  chats = $(".chats"),
  messageTimeSent = $(".timesent");

textarea.keypress(function(e){

  //Premuto tasto di invio
  if(e.which == 13) {
    e.preventDefault();
    chatForm.trigger('submit');
  }

});

//Submit Button
chatForm.on('submit', function(e){

  e.preventDefault();
  var text = document.getElementById('message').value;
  if (text != ''){
    var name='me';
    createChatMessage(text, name, moment());
    scrollToBottom();

    socket.emit('chat message', text);
    textarea.val("");
  }else {
    alert('Scrivere qualcosa')
  };
});

function setResponse(val) {

    outputBot.textContent = text(val);

};

//Creazione del messaggio di risposta del bot
socket.on('bot reply', function(replyText) {

    console.log(replyText);
    var name='';
    if(replyText == '') replyText = '(Per favore ripeti...)';

    createChatMessage(replyText, name, moment());
		scrollToBottom();
});

//Funzione di aggiornamento delle date
setInterval(function(){

		messageTimeSent.each(function(){
			var each = moment($(this).data('time'));
			$(this).text(each.fromNow());
		});

	},60000);

//Funzione che crea il messaggio (Bolla)
function createChatMessage(msg,user,now){

		var who = '';
		if(user==='me') {
			who = 'me';
		}
		else {
			who = 'you';
		}

		var li = $(
			'<li class=' + who + '>'+
                '<p></p>'+
				'<div class="image">' +

					'<i class="timesent" data-time=' + now + '></i> ' +
				'</div>' +
			'</li>');

    //si utilizza append per andare a inserire il testo nella chat
		li.find('p').append(msg);
		li.find('b').append(user);

		chats.append(li);

		messageTimeSent = $(".timesent");
		messageTimeSent.last().text(now.fromNow());
};

//Animazione alla creazione del messaggio di chat
function scrollToBottom(){
	$("html, body").animate({ scrollTop: $(document).height()-$(window).height() },1000);
};


//Funzione che prende l'immagine dalla chat e poi apre la maschera sopra
function openPhoto(src){
  console.log("chiamata openPhoto");
  var modal = document.getElementById('myModal');
  var modalImg = document.getElementById("img01");
  modal.style.display = "block";
  modalImg.src = src;
  $('body').css('overflow','hidden');
  $("#footerId").hide();
}

//Funzione closePhoto attivata se premo ESC
$( document ).on( 'keydown', function ( a ) {
    if ( a.keyCode === 27 ) { // ESC
        if($("#myModal").length){closePhoto();}//Verifico se myModal è attivo
    }
});

//Funzione che chiude la foto visualizzata
function closePhoto(){
  console.log("chiamata closePhoto");
  $('body').css('overflow','visible');
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
  $("#footerId").show();
};


function clickForInfo(value){
  console.log(value);
  socket.emit('chat message', value);
};
