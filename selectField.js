function selectField(res, act){
  //funzione che dato un parametro act mi ritorna le informazioni sul contatto che sono richieste
  let nome = res.nome;
  let cognome = res.cognome;
  let mail = res.mail;
  let telefono = res.telefono;
  let dipartimento = res.dipartimento;
  let u_polo = res.ufficio[0].polo;
  let u_num = res.ufficio[0].numero;

  let ruoli = [];
  for (var i = 0; i < res.ruolo.length; i++){
    ruoli[i] = res.ruolo[i];
  }
  let corsi = [];
  for (var i = 0; i < res.corsi.length; i++){
    corsi[i] = res.corsi[i].corso;
  }

  let polo = u_polo.toLowerCase();
  polo = polo.replace(/ /, "");


  var aiTextRet = nome + " " + cognome + " ";
  for (var i = 0; i < act.length; i++){
    switch(act[i]){
      case 'mail':
          aiTextRet = aiTextRet  + "<a href=\"mailto:" + mail +"\">"+mail+"</a></br>";
          break;

      case 'ufficio':
        if (u_polo==""){
          aiTextRet = "non ha un ufficio";
        }
        else{
          aiTextRet = aiTextRet + u_polo + " " + u_num + "<div><img style=\"width: 150px; heigth:250 px;\" src=\"/images/" + polo + "/" + u_num + ".jpg\"></div></br>";
        }
          break;

      case 'telefono':
          aiTextRet = aiTextRet + "<a href=\"" + telefono +"\">"+telefono+"</a></br>";
          break;

      case 'corsi':
          var p = '';
          if (corsi.length == 0) p = "non tiene corsi";
          for (var j=0; j<corsi.length; j++){
            p = p + " " + corsi[j];
          }
          aiTextRet = aiTextRet + p;
          break;
      case 'ruoli':
          var p = '';
          if (ruoli.length == 0) p = "non ricopre ruoli";
          for (var j=0; j<ruoli.length; j++){
            p = p + " " + ruoli[j];
            console.log(p);
          }
          aiTextRet = aiTextRet + p;
          break;


      default:
        if (u_polo){
          aiTextRet = aiTextRet + mail + " " + telefono;
        }
        else{
          aiTextRet = aiTextRet + mail + " " + telefono + " "
          + u_polo + " " + u_num + "<div><img style=\"width: 150px; heigth:250 px;\" src=\"/images/" + polo +"/" + u_num + ".jpg\"></div></br>";
        }
        break;
    }
  }

  return aiTextRet;

}

module.exports = selectField;
