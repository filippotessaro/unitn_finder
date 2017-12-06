'use strict';

var Persona = require('./persona.js');
// Restituisce tutti i ruoli esistenti
function allRole(resType){
  var aiTxt='';
  return new Promise(function(resolve, reject){
    try {
      Persona.find().exec(function(err, dbres){
        if(resType == 'html'){
          aiTxt += "<ul class=\"ullist\">";
          for (var i = 0; i < dbres.length; i++) {
            for (var j = 0; j < dbres[i].ruolo.length; j++){
              aiTxt += "<li>" + dbres[i].ruolo[j] + '</li>';
            }
          }
          aiTxt += "</ul>";
        }
        else if(resType == 'json'){
          aiTxt += '{"ruoli":[';
          var temp = 0;
          for (var i = 0; i < dbres.length; i++) {
            for (var j = 0; j < dbres[i].ruolo.length; j++){
              if(temp != 0) {aiTxt += ',';}
              aiTxt += '{"ruolo":"' + dbres[i].ruolo[j] + '"}';
              temp++;
            }
          }
          aiTxt += ']}';
        }
      resolve(aiTxt);
     });
    }
    catch (e) {
      reject(e);
    }
  });

}
module.exports = allRole;
