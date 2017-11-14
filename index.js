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


const io = require('socket.io')(server);
io.on('connection', function(socket){
  console.log('a user connected');
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

      let nome = response.result.parameters['nome'];
      let cognome = response.result.parameters['cognome'];
      let corso_cod = response.result.parameters['corso'];
      let ruolo = response.result.parameters['ruolo'];
      let dipartimento = response.result.parameters['dipartimento'];
      let azione = response.result.parameters['action'];

      console.log(nome);
      console.log(cognome);
      console.log(ruolo);
      console.log(azione);
      console.log(corso);
      console.log(dipartimento);

      var aiTxt;
      //nessun parametro ricevuto
      if( nome == null && cognome == null && ruolo == null && corso == null){
          console.log('if default null');
          aiTxt = defaultf(response);
          console.log('Bot reply: ' + aiTxt);
          socket.emit('bot reply', aiTxt);
          return;
      };


      else{
        //caso in cui non risponda di default
        find(nome, cognome, ruolo, azione, dipartimento, corso_cod).then(function(aiTxt){
            console.log('Bot reply: ' + aiTxt);
            socket.emit('bot reply', aiTxt);
          });

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
  var a = res.result.fulfillment.speech; //risposta default smallTalk Dialogflow
  return a;
};

//Promise per query su mongoDB
function find(nome, cognome, ruolo, azione, dipartimento, corso_cod){
  var aiTxt='';
  var query = {};
  if (nome) query.nome =  nome;
  if (cognome) query.cognome = cognome;
  if (ruolo) query.ruolo = ruolo;
  if (dipartimento) query.dipartimento = dipartimento;
  if (corso_cod) query.corso = corso_cod;

  return new Promise(function(resolve, reject){
    try {
       Persona.find(query).exec(function(err, dbres){
        for (var i = 0; i < dbres.length; i++) {
            aiTxt = aiTxt + selectField(dbres[i], azione) + '</br>'; //scrivo la risposta solo con i campi richiesti da azione
       }


       resolve(aiTxt);
     });

    }
    catch (e) {
      reject(e);
    }
  });

};




function selectField(res, act){
  //funzione che dato un parametro act mi ritorna le informazioni sul contatto che sono richieste
  let nome = res.nome;
  let cognome = res.cognome;
  let mail = res.mail;
  let telefono = res.telefono;
  let dipartimento = res.dipartimento;
  let u_polo = res.ufficio[0].polo;
  let u_num = res.ufficio[0].numero;

  let ruolo = res.ruolo;
  let corso = res.corsi;




  var aiTextRet;

  switch(act){
    case 'mail':
        aiTextRet = nome + " " + cognome + " " + "<a href=\"mailto:" + mail +"\">"+mail+"</a>";
        break;

    case 'ufficio':
        aiTextRet = nome + " " + cognome + " " + u_polo + " " + u_num + "<div><img style=\"width: 150px; heigth:250 px;\" src=\"/images/povo1/" + u_num + ".jpg\"></div>";
        break;

    case 'telefono':
        aiTextRet = nome + " " + cognome + " " + "<a href=\"" + telefono +"\">"+telefono+"</a>";
        break;

    default:
        aiTextRet = nome + " " + cognome + " " + mail + " " + telefono + " "
        + u_polo + " " + u_num + "<div><img style=\"width: 150px; heigth:250 px;\" src=\"/images/povo1/" + u_num + ".jpg\"></div>";
        /*aiTextRet = nome + " " + cognome + " " + "<a href=\"mailto:" + mail +"\">"+mail+"</a>"
                    + " " + "<a href=\"" + telefono +"\">"+telefono+"</a>";*/
        break;
  }

  return aiTextRet;

}


/*

switch(act){
  case 'mail':
      aiTextRet = nome + " " + cognome + " " + "<a href=\"mailto:" + mail +"\">"+mail+"</a>";
      break;

  case 'ufficio':
      aiTextRet = nome + " " + cognome + " " + u_polo + " " + u_num + "<div><img style=\"width: 150px; heigth:250 px;\" src=\"/images/povo1/" + u_num + ".jpg\"></div>";
      break;

  case 'telefono':
      aiTextRet = nome + " " + cognome + " " + "<a href=\"" + telefono +"\">"+telefono+"</a>";
      break;

  default:
      aiTextRet = nome + " " + cognome + " " + mail + " " + telefono + " "
      + u_polo + " " + u_num + "<div><img style=\"width: 150px; heigth:250 px;\" src=\"/images/povo1/" + u_num + ".jpg\"></div>";
      /*aiTextRet = nome + " " + cognome + " " + "<a href=\"mailto:" + mail +"\">"+mail+"</a>"
                  + " " + "<a href=\"" + telefono +"\">"+telefono+"</a>";
      break;
}

*/
