'use strict';

require('dotenv').config();

const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
const DB_URL = process.env.DB_URL;

const express = require('express');
const app = express();
const apiai = require('apiai')(APIAI_TOKEN);

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

//richiedo modulo mongoose e schema persona
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Persona = require('./persona.js');

//connessione al DB su mLab
mongoose.connect(DB_URL, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});

//richiedo le funzoni
const selectField = require('./selectField');
const allRole = require('./allRole');
const find = require('./find');

// Web UI
app.get('/', (req, res) => {
  res.sendFile('index.html');
});

const io = require('socket.io')(server);
io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', (text) => {
    console.log('Message: ' + text);

    //creo una sessione con API.ai
    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {

      let nome = response.result.parameters['nome'];
      let cognome = response.result.parameters['cognome'];
      let corso_cod = response.result.parameters['corso'];
      let ruolo = response.result.parameters['ruolo'];
      let dipartimento = response.result.parameters['dipartimento'];

      let azioni = [];
        if (response.result.parameters['action']){
            var i=0;
            do {
                azioni[i] = response.result.parameters['action'][i];
                i++;
            }while(i < response.result.parameters['action'].length);
        };

      var aiTxt;
      //nessun parametro ricevuto
      if( nome == null && cognome == null && ruolo == null && corso_cod == null){
          aiTxt = response.result.fulfillment.speech;
          console.log('Bot reply: ' + aiTxt);
          socket.emit('bot reply', aiTxt);
          return;
      }
      else{
        if (azioni == "ruoli"){
          allRole()
          .then(function(aiTxt){
             console.log('Bot reply: ' + aiTxt);
             socket.emit('bot reply', aiTxt);
          });
        };
        if (azioni != 'ruoli' && azioni != "corsi"){
          find(nome, cognome, ruolo, azioni, dipartimento, corso_cod).then(function(aiTxt){
              console.log('Bot reply: ' + aiTxt);
              socket.emit('bot reply', aiTxt);
            });
        }
      }
    });


    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});
