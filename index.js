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

      let nome = response.result.parameters['nome'];
      let cognome = response.result.parameters['cognome'];
      let ruolo = response.result.parameters['ruolo'];
      let azione = response.result.parameters['action'];


      var aiTxt;
      //nessun parametro ricevuto
      if( nome == null && cognome == null && ruolo == null && azione == null){
          console.log('if default');
          aiTxt = defaultf(response);
          console.log('Bot reply: ' + aiTxt);
          socket.emit('bot reply', aiTxt);
          return; //?
      }
      //ricevuto solo parametro nome
      if(nome != '' && cognome === ''){
          console.log('if nome');
          findName(response, socket);
          return;
      }
      //ricevuto solo parametro cognome
      if(nome == '' && cognome !== ''){
          console.log('if cognome');
          aiTxt = findSurname(response);
          console.log('Bot reply: ' + aiTxt);
          socket.emit('bot reply', aiTxt);
          return;
      }
      //ricevuti parametri nome e cognome
      if(nome !== '' && cognome !== ''){
          console.log('if full');
          findFull(response, socket);
          //console.log('Bot reply: ' + aiTxt);
          //socket.emit('bot reply', aiTxt);
          return;
      }
      //ricerca per ruolo
      if(ruolo !== '' && nome == '' && cognome == ''){
          console.log('if ruolo');
          findRole(response);

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
  return res.result.fulfillment.speech; //risposta default smallTalk Dialogflow
};
//ricerca con parametro nome
function findName(res, socket){
  let nome = res.result.parameters['nome'];
  let ruolo = res.result.parameters['ruolo'];
  let azione = res.result.parameters['action'];
  var aiTxt;
  if (ruolo !== ''){
    //ricerca per nome e ruolo
    findPersona(nome,'', ruolo, azione).then(function(aiTxt){
      console.log('Bot reply: ' + aiTxt);
      socket.emit('bot reply', aiTxt); //Invio messaggio HTML
    });
  } else{
    //ricerca solo per nome
    findPersona(nome, azione).then(function(aiTxt){
      console.log('Bot reply: ' + aiTxt);
      socket.emit('bot reply', aiTxt);
    });
  }
};
//Promise per query su mongoDB
function findPersona(nome, cognome, ruolo, azione){
  var aiTxt='';
  var query = {};
  if (nome) query.nome =  nome;
  if (cognome) query.cognome = cognome;
  if (ruolo) query.ruolo = ruolo;

  return new Promise(function(resolve, reject){
    try {
      Persona.find(query).exec(function(err, dbres){
        for (var i = 0; i < dbres.length; i++) {
           aiTxt = aiTxt + selectField(dbres[i], azione) + '</br>\n'; //scrivo la risposta solo con i campi richiesti da azione
       }
       resolve(aiTxt);
      })

    }
    catch (e) {
      reject(e);
    }
  });
};

function findSurname(res){

};

function findFull(res, socket){
  var aiTxt;
  var nome = res.result.parameters['nome'];
  var cognome = res.result.parameters['cognome'];

  //definisco una promise

  provaProm(nome, cognome).then(function(persona){

    var aiTxt = selectField(persona[0], '');
    return aiTxt;
  }).then(function(aiTxt){
    console.log('Console:Bot reply: ' + aiTxt);
    socket.emit('bot reply', aiTxt);

  });

};
function findRole(res){
  return res.result.fulfillment.speech;
};

function selectField(res, act){
  //funzione che dato un parametro act mi ritorna le informazioni sul contatto che sono richieste
  let nome = res.nome;
  let cognome = res.cognome;
  let mail = res.mail;
  let telefono = res.telefono;
  //let u_polo = res[0].ufficio.polo;
  //let u_num = res[0].ufficio.numero;
  //let u_img = res[0].ufficio.img;

  var aiTextRet;

  switch(act){
    case 'mail':
        aiTextRet = nome + " " + cognome + " " + mail;
        break;

    case 'ufficio':
        aiTextRet = nome + " " + cognome + " " + u_polo + " " + u_num + " <img src=\"" + u_img +"\">";
        break;

    case 'telefono':
        aiTextRet = nome + " " + cognome + " " + telefono;
        break;
    default:
        /*aiTextRet = nome + " " + cognome + " " + mail + " " + telefono + " "
        + u_polo + " " + u_num + " <img src=\"" + u_img + "\">";*/
        aiTextRet = nome + " " + cognome + " " + mail + " " + telefono;
        break;
  }

  return aiTextRet;

}


function provaProm(nome, cognome){
        return new Promise(function(resolve, reject) {
          try {
            Persona.find({nome: nome, cognome:cognome}, function(err, persona){
                  if (err) return handleError(err);

                  else{
                    //console.log(persona[0].nome + ' in else');
                    resolve(persona);

                  }
            });
      }

  catch (e) {
      reject(e);
  }
})};
