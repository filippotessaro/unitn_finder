var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CorsoSchema = new Schema({
    corso: String,
    codice: String,
});

var UfficioSchema = new Schema({
    polo: String,
    numero: String
});

var PersonaSchema = new Schema({
    nome: String,
    cognome: String,
    mail: String,
    telefono: String,
    dipartimento: String,
    ufficio: [UfficioSchema],
    ruolo: [String],
    corsi: [CorsoSchema],

});

module.exports = mongoose.model('Persona', PersonaSchema);
