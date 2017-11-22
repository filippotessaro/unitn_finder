'use strict';

var Persona = require('./persona.js');
// Restituisce tutti i ruoli esistenti
function allCourse(){
  var aiTxt='';
  return new Promise(function(resolve, reject){
    try {
      Persona.find().exec(function(err, dbres){
        aiTxt += "<ul class=\"ullist\">";
        for (var i = 0; i < dbres.length; i++) {
          for (var j = 0; j < dbres[i].corsi.length; j++){
            aiTxt += "<li>" + dbres[i].corsi[j].corso + '</li>';
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
module.exports = allCourse;
