'use strict';

const socket = io();
var textarea = $("#message"),
  chatForm = $("#chatform"),
  chats = $(".chats"),
  messageTimeSent = $(".timesent");

textarea.keypress(function(e){

  // Testo premuto invio
  if(e.which == 13) {
    e.preventDefault();
    chatForm.trigger('submit');
  }

});

chatForm.on('submit', function(e){

  e.preventDefault();
  var text = document.getElementById('message').value;

  //outputYou.textContent = text;
  var name='me';
  createChatMessage(text, name, moment());
  scrollToBottom();

  socket.emit('chat message', text);
  textarea.val("");
});

function setResponse(val) {

    //$("#response").text(val);
    outputBot.textContent = text(val);

}

socket.on('bot reply', function(replyText) {
  //synthVoice(replyText);
    console.log(replyText);
    var name='';
    if(replyText == '') replyText = '(Per favore ripeti...)';
    //outputBot.textContent = replyText;
    createChatMessage(replyText, name, moment());
		scrollToBottom();
});


setInterval(function(){

		messageTimeSent.each(function(){
			var each = moment($(this).data('time'));
			$(this).text(each.fromNow());
		});

	},60000);


	// Function that creates a new chat message
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
					/*'<b></b>' +*/
					'<i class="timesent" data-time=' + now + '></i> ' +
				'</div>' +
				/*'<p></p>' +*/
			'</li>');

		// use the 'append' method to escape malicious user input
    
		li.find('p').append(msg);
		li.find('b').append(user);

		chats.append(li);

		messageTimeSent = $(".timesent");
		messageTimeSent.last().text(now.fromNow());
	}

	function scrollToBottom(){
		$("html, body").animate({ scrollTop: $(document).height()-$(window).height() },1000);
	}


  // Get the image and insert it inside the modal - use its "alt" text as a caption

function openPhoto(){
  var modal = document.getElementById('myModal');
  var img = document.getElementById('myImg');
  var modalImg = document.getElementById("img01");
  modal.style.display = "block";
  modalImg.src = img.src;
  $("#divchatForm").hide();
}

function closePhoto(){
  var modal = document.getElementById('myModal');
  modal.style.display = "none";
  $("#divchatForm").show();
}

function clickForInfo(value){
  console.log(value);
  socket.emit('chat message', value);
};