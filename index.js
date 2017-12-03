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
const allCourse = require('./allCourse');
const find = require('./find');
const findCourse = require('./findCourse');

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
        if (nome == '' && cognome == ''){
          switch (azioni[0]){
            case 'ruoli':
              allRole()
              .then(function(aiTxt){
                 console.log('Bot reply: ' + aiTxt);
                 socket.emit('bot reply', aiTxt);
              });
              break;
            case 'corsi':
              allCourse('html')
              .then(function(aiTxt){
                 console.log('Bot reply: ' + aiTxt);
                 socket.emit('bot reply', aiTxt);
              });
              break;
          }
        };
        if (nome != '' || cognome != '' || corso_cod != '' || ruolo != '' || dipartimento != ''){
            if(corso_cod == ""){
               find(nome, cognome, ruolo, azioni, dipartimento).then(function(aiTxt){
                  console.log('Bot reply: ' + aiTxt);
                  socket.emit('bot reply', aiTxt);
               });
            }else{
                findCourse(corso_cod).then(function(aiTxt){
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


//-------------------API------------------------------------
// instanzio express Router
var router = express.Router();
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*'); //* IL BROWSER RISPONDE COSI A TUTTI I DOMINI. POSSO ANCHE SPECIFICARE DOMINI PRECISI
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    //OPERAZIONI DI SCRUTTURA - PREFLIGHT
    if (req.method == 'OPTIONS') {
        //IL SERVER DEVE RISPONDERE TUTTI I METODI SUPPORTATI DALL'INDIRIZZO
        res.header('Access-Control-Allow-Methods', 'GET');
        return res.status(200).json({});
    }
    // make sure we go to the next routes
    //INDIRIZZA LA CHIAMATA AI MIDDLEWARE SUCCESSIVI
    next();
});

// registriamo router -> /api
app.use('/api', router);

// inviamo un errore esterno nel caso in cui si verificasse
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//errore interno
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: { message: err.message } });
});

var accepts = require('accepts');
var http = require('http');

router.get('/corsi', function(req, res) {

  var accept = accepts(req);

  // the order of this list is significant; should be server preferred order
  switch (accept.type(['json', 'html'])) {
    case 'json':
      res.setHeader('Content-Type', 'application/json')
      allCourse('json')
      .then(function(aiTxt){
        console.log(aiTxt);
        res.send(aiTxt);
        res.end()
      });
    break;

    case 'html':
      res.setHeader('Content-Type', 'text/html');
      allCourse('html')
      .then(function(aiTxt){
         console.log(aiTxt);
         res.send(aiTxt);
         res.end()
      });
      break;

    default:
      // the fallback is text/plain, so no need to specify it above
      res.setHeader('Content-Type', 'application/json')
      res.json({ error: { message: 'Richiedi un formato valido' } });
      break;
  }


});

router.get('/ruoli', function(req, res) {
    res.json({ message: 'RUOLI' });
});
