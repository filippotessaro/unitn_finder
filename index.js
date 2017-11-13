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
mongoose.Promise = global.Promise;
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
      //let insegnamento = response.result.parameters['insegnamento']

      console.log(nome);
      console.log(cognome);
      console.log(ruolo);
      console.log(azione);

      var aiTxt;
      //nessun parametro ricevuto
      if( (nome == null && cognome == null && ruolo == null)/*&& insegnamento == ''*/){
          console.log('if default');
          aiTxt = defaultf(response);
          console.log('Bot reply: ' + aiTxt);
          socket.emit('bot reply', aiTxt);
          return;
      };
      if(nome == '' && cognome == '' && ruolo == ''/*&& insegnamento == ''*/){
          console.log('if default');
          //aiTxt = defaultf(response);
          aiTxt = 'Dammi maggiori informazioni';
          console.log('Bot reply: ' + aiTxt);
          socket.emit('bot reply', aiTxt);
          return;
      }

      else{
        //caso in cui non risponda di default
        find(nome, cognome, ruolo, azione /*,insegnamento*/).then(function(aiTxt){
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
function find(nome, cognome, ruolo, azione/*, insegnamento*/){
  var aiTxt='';
  var query = {};
  if (nome) query.nome =  nome;
  if (cognome) query.cognome = cognome;
  if (ruolo) query.ruolo = ruolo;

  //if (insegnamento) query.insegnamento = insegnamento;

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
