'use strict';

var Persona = require('./persona.js');
// Restituisce tutti i ruoli esistenti
function allCourse(resType){
  var aiTxt='';
  return new Promise(function(resolve, reject){
    try {
      Persona.find().exec(function(err, dbres){
        if(resType == 'html'){
            aiTxt += "<ul class='ullist' >";
            for (var i = 0; i < dbres.length; i++) {
              for (var j = 0; j < dbres[i].corsi.length; j++){
                aiTxt += "<li>" + dbres[i].corsi[j].corso + '</li>';
              }
            }
            aiTxt += "</ul>";
        }
        else if(resType == 'json'){
            aiTxt += '{"corsi":[';
            for (var i = 0; i < dbres.length; i++) {
              for (var j = 0; j < dbres[i].corsi.length; j++){
                if((i == (dbres.length-1)) && j == (dbres[i].corsi.length-1))
                      aiTxt += '{"corso":"' + dbres[i].corsi[j].corso + '"}';

                else aiTxt += '{"corso":"' + dbres[i].corsi[j].corso + '"},';
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
module.exports = allCourse;
