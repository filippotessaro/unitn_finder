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
    //var dipartimento = "DISI"
    var ruoli = "Non ricopre ruoli"
    var corsi = "Ingegneria del software 2"
    
    return find('Fabio', 'Casati', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
        //expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(ruoli);
        expect(aiTxt).toContain(corsi);
        
    })                       
});


afterAll(() => {
    console.log('AfterAll');
    return mongoose.connection.close();
});

