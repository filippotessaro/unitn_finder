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
        console.log('if default');
        aiTxt = defaultf(response);
        console.log('Bot reply: ' + aiTxt);
        socket.emit('bot reply', aiTxt);
        return; //?
    }
    if(nome != '' && cognome === ''){
        console.log('if nome');
        aiTxt = findName(response);
        console.log('Bot reply: ' + aiTxt);
        socket.emit('bot reply', aiTxt);
        return;
    }

    if(nome == '' && cognome !== ''){
        console.log('if cognome');
        aiTxt = findSurname(response);
        console.log('Bot reply: ' + aiTxt);
        socket.emit('bot reply', aiTxt);
        return;
    }

    if(nome !== '' && cognome !== ''){
        console.log('if full');
        findFull(response, socket);
        //console.log('Bot reply: ' + aiTxt);
        //socket.emit('bot reply', aiTxt);
        return;
    }

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
  return res.result.fulfillment.speech;
};
function findName(res){
  //return res.result.fulfillment.speech;

    /*if (ruolo !== ''){

    }
    else {
      new Promise(function(){
        console.log('qua1');
        Persona.find({
            nome: nome
        },function(res){
          console.log(selectField(res, ''))
           console.log('qua3');
           return res;

        });
      }).
      then(function(res){
        if (azione == ''){
            console.log('qua2');
            aiTxt = selectField(res, '');
            return aiTxt;
        }else {
            aiTxt = 'prova else';
            return aiTxt;
        }
      });
    }
    //aiTxt = 'not if';
    //return aiTxt;*/

};
function findSurname(res){

};

function findFull(res, socket){
  var aiTxt;
  var nome = res.result.parameters['nome'];
  var cognome = res.result.parameters['cognome'];

  //definisco una promise
  var promise = new Promise(function(resolve, reject) {
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
  }).then(function(persona){

    var aiTxt = selectField(persona, '');
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
  let nome = res[0].nome;
  let cognome = res[0].cognome;
  let mail = res[0].mail;
  let telefono = res[0].telefono;
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
