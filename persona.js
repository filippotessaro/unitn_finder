var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CorsoSchema = new Schema({
    corso: String,
    codice: String,
});

var PersonaSchema = new Schema({
    nome: String,
    cognome: String,
    mail: String,
    telefono: String,
    polo: String,
    numero: String,
    ruolo: [String],
    corso: [CorsoSchema]

});

module.exports = mongoose.model('Persona', PersonaSchema);
