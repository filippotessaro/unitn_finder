// Promise per query su mongoDB
var Persona = require('./persona');
var selectField = require('./selectField');
function findCourse(corso_cod){
  var aiTxt='';
    var azioni = [];
    azioni[0]='singola';
    var arrayTemp = [];
    var ind = 0;

return new Promise(function(resolve, reject){
    try {
      Persona.find().exec(function(err, dbres){
        for (var i = 0; i < dbres.length; i++) {
          for (var j = 0; j < dbres[i].corsi.length; j++){
              if(dbres[i].corsi[j].codice == corso_cod){
                  arrayTemp[ind] = dbres[i];
                  ind++;
                  //aiTxt += selectField(dbres[i], "" ) + '</br>';
              }
          }
        }
      if (arrayTemp.length == 1) {
        aiTxt += selectField(arrayTemp[0], azioni) + '</br>';
      }else {
        azioni[0] = 'mail';
        for (var i = 0; i < arrayTemp.length; i++){
          aiTxt += selectField(arrayTemp[i], azioni)
          if(i != (arrayTemp.length-1)) aiTxt +='</br>';
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
