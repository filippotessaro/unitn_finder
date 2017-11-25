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


const find = require('./find');


test('check nome e cognome - Fabio Casati', () => {
    var azioni = [];
    azioni[0] = '';
        
    var nome = "Fabio";
    var cognome = "Casati"
    var numero = "+390461282044"
    var mail = "fabio.casati@unitn.it"
    var polo = "Povo 1"
    var ufficio = "Ufficio 224"
    var image = "/images/povo1/224.jpg"
    var dipartimento = "DISI"
    var ruolo = "Non ricopre ruoli"
    var corso = "Ingegneria del software 2"
    
    return find('Fabio', 'Casati', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
        expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(ruolo);
        expect(aiTxt).toContain(corso);
        
    })                       
});

test('check solo nome | più corrispondenze - Roberto', () => {
    var azioni = [];
    azioni[0] = '';
        
    var nome1 = "Roberto";
    var cognome1 = "Sebastiani"
    var ruolo1 = "Delegato per l'orientamento"
    var corso11 = "Formal methods"
    var corso12 = "Programmazione 1"
    var corso13 = "Project course"
    var corso14 = "Research project"
    
    var nome2 = "Roberto";
    var cognome2 = "Battiti"
    var ruolo2 = "Non ricopre ruoli"
    var corso21 = "Intelligent Optimization for data science"
    var corso22 = "Research project"
    var corso23 = "Science, technology and business"
    
    var nome3 = "Roberto";
    var cognome3 = "Passerone"
    var ruolo3 = "Non ricopre ruoli"
    var corso31 = "Advanced computing architectures"
    var corso32 = "Elettronica"
    var corso33 = "Fondamenti di elettronica"
    var corso34 = "Reti logiche (modulo 1)"
    var corso35 = "Reti logiche (modulo 2)"
    
    return find('Roberto', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome1);
        expect(aiTxt).toContain(cognome1);
        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(corso11);
        expect(aiTxt).toContain(corso12);
        expect(aiTxt).toContain(corso13);
        expect(aiTxt).toContain(corso14);
        
        expect(aiTxt).toContain(nome2);
        expect(aiTxt).toContain(cognome2);
        expect(aiTxt).toContain(ruolo2);
        expect(aiTxt).toContain(corso21);
        expect(aiTxt).toContain(corso22);
        expect(aiTxt).toContain(corso23);
        
        expect(aiTxt).toContain(nome3);
        expect(aiTxt).toContain(cognome3);
        expect(aiTxt).toContain(ruolo3);
        expect(aiTxt).toContain(corso31);
        expect(aiTxt).toContain(corso32);
        expect(aiTxt).toContain(corso33);
        expect(aiTxt).toContain(corso34);
        expect(aiTxt).toContain(corso35);
        
    })                       
});

test('check solo nome | una sola corrispondenza - Claudio', () => {
    var azioni = [];
    azioni[0] = '';
        
    var nome = "Claudio";
    var cognome = "Sacchi"
    var numero = "+390461283907"
    var mail = "claudio.sacchi@unitn.it"
    var polo = "Povo 1"
    var ufficio = "Ufficio 244"
    var image = "/images/povo1/244.jpg"
    var dipartimento = "DISI"
    var ruolo = "Non ricopre ruoli"
    var corso1 = "Communication systems"
    var corso2 = "Design of networs and communication systems"
    var corso3 = "Progettazione di reti e sistemi di comunicazione"
    var corso4 = "Teoria dei segnali"
    
    return find('Claudio', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
        expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(ruolo);
        expect(aiTxt).toContain(corso1);
        expect(aiTxt).toContain(corso2);
        expect(aiTxt).toContain(corso3);
        expect(aiTxt).toContain(corso4);
        
    })                       
});

test('check ricerca per ruolo | singolo docente - Responsabile CdS Ingegneria dell"Informazione e Organizzazione d"Impresa', () => {
    var azioni = [];
    azioni[0] = '';
        
    var nome = "Giuseppe";
    var cognome = "Riccardi"
    var numero = "+390461282087"
    var mail = "giuseppe.riccardi@unitn.it"
    var polo = "Povo 1"
    var ufficio = "Ufficio 207"
    var image = "/images/povo1/207.jpg"
    var dipartimento = "DISI"
    var ruolo1 = "Responsabile CdS Ingegneria dell'Informazione e Organizzazione d'Impresa"
    var ruolo2 = "Componente - Commissione brevetti"
    var corso1 = "Laboratorio di programmazione per sistemi mobili e tablet"
    var corso2 = "Language Understanding System"
    var corso3 = "Programmazione 1"
    
    return find('', '', ruolo1,azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
        expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(ruolo2);
        expect(aiTxt).toContain(corso1);
        expect(aiTxt).toContain(corso2);
        expect(aiTxt).toContain(corso3);
        
    })                       
});

afterAll(() => {
    return mongoose.connection.close();
});

