var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CorsoSchema = new Schema({
    corso: String,
    codice: String,
});

var UfficioSchema = new Schema({
    polo: String,
    numero: String,
    img: String,
});

var PersonaSchema = new Schema({
    nome: String,
    cognome: String,
    mail: String,
    telefono: String,
    ufficio: ufficio,
    ruolo: [String],
    corso: [CorsoSchema]

});

module.exports = mongoose.model('Persona', PersonaSchema);
