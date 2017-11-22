//Promise per query su mongoDB
var Persona = require('./persona');
var selectField = require('./selectField');
function findCourse(corso_cod){
  var aiTxt='';
  return new Promise(function(resolve, reject){
    try {
      Persona.find().exec(function(err, dbres){
        for (var i = 0; i < dbres.length; i++) {
          for (var j = 0; j < dbres[i].corsi.length; j++){
              if(dbres[i].corsi[j].codice == corso_cod){
                  aiTxt += aiTxt + selectField(dbres[i], "" ) + '</br>';
              }

          }
        }
      resolve(aiTxt);
     });
    }
    catch (e) {
      reject(e);
    }
  });
};

module.exports = findCourse
