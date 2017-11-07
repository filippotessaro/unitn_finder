'use strict';


require('dotenv').config();

const APIAI_TOKEN = process.env.APIAI_TOKEN;
const APIAI_SESSION_ID = process.env.APIAI_SESSION_ID;
const DB_TEST = process.env.DB_TEST;

const express = require('express');
const app = express();
const apiai = require('apiai')(APIAI_TOKEN);

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
});

//richiedo modulo mongoose e schema persona
var mongoose = require('mongoose');
var Persona = require('./persona.js');

//connessione al DB su mLab
mongoose.connect(DB_TEST, {useMongoClient: true});
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

    //creo una sessione con API.ai
    let apiaiReq = apiai.textRequest(text, {
      sessionId: APIAI_SESSION_ID
    });

    apiaiReq.on('response', (response) => {
      //Function default -> @nome="" @cognome="" @ruolo="" -> risposta di api.ai fulfillment.speech
      //Function findSurname -> @cognome="qualcosa" -> ricerca per @cognome + @ruolo se definito -> risposta
      //              tutti i dati o solo richiesti da @action
      //Function findName -> @nome="qualcosa" -> ricerca per @nome + @ruolo se definito -> risposta
      //              tutti i dati o solo richiesti da @action
      //Function findFull -> @cognome="qualcosa" + @nome="qualcosa"-> ricerca per @nome + @cognome
      //              + @ruolo se definito -> risposta tutti i dati o solo richiesti da @action
      //Function findRole -> @ruolo="qualcosa" -> ricerca per @ruolo -> risposta @nome + @cognome + "ruolo"
      //              o "insegnamento con codice" di tutti i risultati della ricerca


/*


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

    */

    let nome = response.result.parameters['nome'];
    let cognome = response.result.parameters['cognome'];
    let ruolo = response.result.parameters['ruolo'];
    let azione = response.result.parameters['action'];


    var aiTxt;

    if( nome == null && cognome == null && ruolo == null && azione == null){
        aiTxt = defaultf(response);
        console.log('Bot reply: ' + aiTxt);
        socket.emit('bot reply', aiTxt);
        return; //?
    }
    if(nome !== null && cognome == null){
        aiTxt = findName(response);
        console.log('Bot reply: ' + aiTxt);
        socket.emit('bot reply', aiTxt);
        return;
    }

    if(nome == null && cognome !== null){
        aiTxt = findSurname(response);
        console.log('Bot reply: ' + aiTxt);
        socket.emit('bot reply', aiTxt);
        return;
    }

    if(nome !== null && cognome !== null){
        aiTxt = findFull(response);
        console.log('Bot reply: ' + aiTxt);
        socket.emit('bot reply', aiTxt);
        return;
    }

    if(ruolo !== null && nome == null && cognome == null){
        aiTxt = findRole(response);
        console.log('Bot reply: ' + aiTxt);
        socket.emit('bot reply', aiTxt);
        return;
    }

    });


    apiaiReq.on('error', (error) => {
      console.log(error);
    });

    apiaiReq.end();

  });
});


function defaultf(res){
  return res.result.fulfillment.speech;
};
function findName(res){
  return res.result.fulfillment.speech;
};
function findSurname(res){
  return res.result.fulfillment.speech;
};
function findFull(res){
  return res.result.fulfillment.speech;
};
function findRole(res){
  return res.result.fulfillment.speech;
}; 
