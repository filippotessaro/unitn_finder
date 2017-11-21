'use strict';

var Persona = require('./persona.js');
// Restituisce tutti i ruoli esistenti
function allCourse(){
  var aiTxt='';
  return new Promise(function(resolve, reject){
    try {
      Persona.find().exec(function(err, dbres){
        for (var i = 0; i < dbres.length; i++) {
          for (var j = 0; j < dbres[i].corsi.length; j++){
            aiTxt += dbres[i].corsi[j].corso + '</br>';
          }
        }
      resolve(aiTxt);
     });
    }
    catch (e) {
      reject(e);
    }
  });

}
module.exports = allCourse;