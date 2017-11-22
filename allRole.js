'use strict';

var Persona = require('./persona.js');
// Restituisce tutti i ruoli esistenti
function allRole(){
  var aiTxt='';
  return new Promise(function(resolve, reject){
    try {
      Persona.find().exec(function(err, dbres){
        aiTxt += "<ul class=\"ullist\">";
        for (var i = 0; i < dbres.length; i++) {
          for (var j = 0; j < dbres[i].ruolo.length; j++){
            aiTxt += "<li>" + dbres[i].ruolo[j] + '</li>';
          }
        }
        aiTxt += "</ul>";
      resolve(aiTxt);
     });
    }
    catch (e) {
      reject(e);
    }
  });

}
module.exports = allRole;
