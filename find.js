//Promise per query su mongoDB
var Persona = require('./persona');
var selectField = require('./selectField');
function find(nome, cognome, ruolo, azioni, dipartimento){
  var aiTxt='';
  var query = {};
  if (nome) query.nome =  nome;
  if (cognome) query.cognome = cognome;
  if (ruolo) query.ruolo = { $regex: new RegExp("^" + ruolo.toLowerCase(), "i") };
  if (dipartimento) query.dipartimento = dipartimento;

  return new Promise(function(resolve, reject){
    try {
       Persona.find(query).exec(function(err, dbres){
           if(dbres.length == 1 && azioni == ""){
               azioni[0] = "singola";
               aiTxt = aiTxt + selectField(dbres[0], azioni);
           }else{
               for (var i = 0; i < dbres.length; i++) {
                    aiTxt = aiTxt + selectField(dbres[i], azioni);
                    if(i != ((dbres.length)-1)){
                      aiTxt +='</br>'; // Scrivo la risposta solo con i campi richiesti da azione
                    }
               };
           };

       resolve(aiTxt);
     });
    }
    catch (e) {
      reject(e);
    }
  });

};

module.exports = find;
