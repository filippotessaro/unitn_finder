'use strict';


require('dotenv').config();

const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
const DB_TEST = process.env.DB_TEST;

const express = require('express');
const app = express();

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

const apiai = require('apiai')(APIAI_TOKEN);

//richiedo modulo mongoose e schema persona
var mongoose = require('mongoose');
var Persona = require('./persona.js');

//connessione al DB su mLab
mongoose.connect(DB_TEST, {useMongoClient: true});//, {useMongoClient: true}
const db = mongoose.connection;
db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});


// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    // Get a reply from API.ai

    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {

      let aiText = response.result.fulfillment.speech;

      if (response.result.parameters['nome']){

          let prof_name = response.result.parameters['nome'];
          let prof_surname = response.result.parameters['cognome'];
          //let phone = '';
          Persona.find({
              nome: prof_name,
              cognome: prof_surname
          }).
              exec(function(err, res){
                  var phone = res[0].telefono;
                  var email = res[0].mail;

                  //console.log(res);
              console.log(prof_name + ' ' + prof_surname + ' '+ email + ' ' + phone);
              socket.emit('bot reply', prof_name + ' ' + prof_surname + ' ' + email + ' ' + phone);
              });
      }
      else {
          console.log('Bot reply: ' + aiText);
          socket.emit('bot reply', aiText);
      }

    });

    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});
