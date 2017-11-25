require('dotenv').config();

const DB_URL = process.env.DB_URL;

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

const allRole = require('./allRole');

test('check ricerca tutti i ruoli | Ruoli', () => {
    var azioni = [];
    azioni[0] = '';
    
    var ruolo1 = "Responsabile CdS Ingegneria dell'Informazione e delle Comunicazioni";
    var ruolo2 = "Delegato per l'orientamento";
    var ruolo3 = "Responsabile CdS Ingegneria dell'Informazione e Organizzazione d'Impresa";
    var ruolo4 = "Componente - Commissione brevetti";
    var ruolo5 = "Delegato per l'orientamento";
    var ruolo6 = "Responsabile di dipartimento - Dipartimento di ingegneria e scienza dell'informazione";
    var ruolo7 = "Direttore di dipartimento - Dipartimento di ingegneria e scienza dell'informazione";
    var ruolo8 = "Componente - Consulta dei direttori";
    var ruolo9 = "Delegato per l'orientamento";
    var ruolo10 = "Delegato per lo sport";
    var ruolo11 = "Presidente - Commissione sport";
    var ruolo12 = "Delegato piani di studio Area Informatica";
    var ruolo13 = "Delegato Erasmus+";
    var ruolo14 = "Delegato piani di studio Area Ingeneria";
    var ruolo15 = "Coordinatore - corso di dottorato - Informatica e telecomunicazioni";
    var ruolo16 = "Delegato per i servizi e le tecnologie informatiche";
    var ruolo17 = "Prorettore allo sviluppo internazionale";
    var ruolo18 = "Direttore vicario di dipartimento - Dipartimento di ingegneria e scienza dell'informazione";
    var ruolo19 = "Delegato al posizionamento nazionale e internazionale dell'ateneo";
    var ruolo20 = "Delegato alla Didattica";
    var ruolo21 = "Vice coordinatore - corso di dottorato - Informatica e telecomunicazioni";
    var ruolo22 = "Delegato stage e tirocini";
    var ruolo23 = "Delegato per la qualità";
    var ruolo24 = "Delegato per i tirocini curricolari, placement alumni";
    var ruolo25 = "Componente - Consiglio di biblioteca";
    var ruolo26 = "Responsabile CdS Informatica";
    var ruolo27 = "Delegato disabilità";
    
    return allRole().then( (aiTxt) => {
        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(ruolo2);
        expect(aiTxt).toContain(ruolo3);
        expect(aiTxt).toContain(ruolo4);
        expect(aiTxt).toContain(ruolo5);
        expect(aiTxt).toContain(ruolo6);
        expect(aiTxt).toContain(ruolo7);
        expect(aiTxt).toContain(ruolo8);
        expect(aiTxt).toContain(ruolo9);
        expect(aiTxt).toContain(ruolo10);
        expect(aiTxt).toContain(ruolo11);
        expect(aiTxt).toContain(ruolo12);
        expect(aiTxt).toContain(ruolo13);
        expect(aiTxt).toContain(ruolo14);
        expect(aiTxt).toContain(ruolo15);
        expect(aiTxt).toContain(ruolo16);
        expect(aiTxt).toContain(ruolo17);
        expect(aiTxt).toContain(ruolo18);
        expect(aiTxt).toContain(ruolo19);
        expect(aiTxt).toContain(ruolo20);
        expect(aiTxt).toContain(ruolo21);
        expect(aiTxt).toContain(ruolo22);
        expect(aiTxt).toContain(ruolo23);
        expect(aiTxt).toContain(ruolo24);
        expect(aiTxt).toContain(ruolo25);
        expect(aiTxt).toContain(ruolo26);
        expect(aiTxt).toContain(ruolo27);
    })                       
});

afterAll(() => {
    return mongoose.connection.close();
});