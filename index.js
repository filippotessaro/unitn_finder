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

      let azioni = [];
      for (var i = 0; i < response.result.parameters['action'].length; i++){
        azioni[i] = response.result.parameters['action'][i];
      }

      /*
      if (response.result.parameters['action1'] == '') let azione1 = response.result.parameters['action1'];
      if (response.result.parameters['action2'] == '') let azione2 = response.result.parameters['action2'];

      // array di azione per selezionare i campi interessati nella ricerca
      var azioni = [];
      azioni[0] = azione;
      if (azione1) azioni[1] = azione1;
      if (azione2) azioni[2] = azione2;
      */

      console.log(nome);
      console.log(cognome);
      console.log(ruolo);
      for (var i=0; i < azioni.length; i++){
        console.log(azioni[i]);
      }

      console.log(corso_cod);
      console.log(dipartimento);

      var aiTxt;
      //nessun parametro ricevuto
      if( nome == null && cognome == null && ruolo == null && corso_cod == null){
          console.log('if default null');
          aiTxt = defaultf(response);
          console.log('Bot reply: ' + aiTxt);
          socket.emit('bot reply', aiTxt);
          return;
      }
      else{
        //caso in cui non risponda di default
        find(nome, cognome, ruolo, azioni, dipartimento, corso_cod).then(function(aiTxt){
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
function find(nome, cognome, ruolo, azioni, dipartimento, corso_cod){
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
            aiTxt = aiTxt + selectField(dbres[i], azioni) + '</br>'; //scrivo la risposta solo con i campi richiesti da azione
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

  let ruoli = [];
  for (var i = 0; i < res.ruolo.length; i++){
    console.log(res.ruolo[i]);
    ruoli[i] = res.ruolo[i];
  }
  let corsi = [];
  for (var i = 0; i < res.corsi.length; i++){
    console.log(res.corsi[i].corso);
    corsi[i] = res.corsi[i].corso;
  }

  let dip = dipartimento.toLowerCase();
  dip = dip.replace(/ /, "");


  var aiTextRet = nome + " " + cognome + " ";
  for (var i = 0; i < act.length; i++){
    switch(act[i]){
      case 'mail':
          aiTextRet = aiTextRet  + "<a href=\"mailto:" + mail +"\">"+mail+"</a></br>";
          break;

      case 'ufficio':
          aiTextRet = aiTextRet + u_polo + " " + u_num + "<div><img style=\"width: 150px; heigth:250 px;\" src=\"/images/" + dip + "/" + u_num + ".jpg\"></div></br>";
          break;

      case 'telefono':
          aiTextRet = aiTextRet + "<a href=\"" + telefono +"\">"+telefono+"</a></br>";
          break;

      case 'corsi':
          var p = '';
          if (corsi.length == 0) p = "non tiene corsi";
          for (var j=0; j<corsi.length; j++){
            p = p + " " + corsi[j];
          }
          aiTextRet = aiTextRet + p;
          break;
      case 'ruoli':
          var p = '';
          if (ruoli.length == 0) p = "non ricopre ruoli";
          for (var j=0; j<ruoli.length; j++){
            p = p + " " + ruoli[j];
            console.log(p);
          }
          aiTextRet = aiTextRet + p;
          break;


      default:
          aiTextRet = aiTextRet + nome + " " + cognome + " " + mail + " " + telefono + " "
          + u_polo + " " + u_num + "<div><img style=\"width: 150px; heigth:250 px;\" src=\"/images/" + dip +"/" + u_num + ".jpg\"></div></br>";
          /*aiTextRet = nome + " " + cognome + " " + "<a href=\"mailto:" + mail +"\">"+mail+"</a>"
                      + " " + "<a href=\"" + telefono +"\">"+telefono+"</a>";*/
          break;
    }
  }

  return aiTextRet;

}
