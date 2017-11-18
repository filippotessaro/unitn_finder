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
  var aiTextRet = nome + " " + cognome;
  for (var i = 0; i < act.length; i++){
    switch(act[i]){
      case 'mail':
          aiTextRet += " <a href=\"mailto:" + mail +"\">"+mail+"</a></br>";
          break;

      case 'ufficio':
        if (u_polo==""){
          aiTextRet += " non ha un ufficio";
        }
        else{
          aiTextRet += " " + u_polo + " Ufficio: " + u_num + "<div><img id=\"myImg\" id=\"myImg\" onclick=\"openPhoto()\" src=\"/images/" + polo + "/" + u_num + ".jpg\"></div></br>"+"<div id=\"myModal\" class=\"modal\"></br>"+
          "<span class=\"close\" onclick=\"closePhoto()\">&times;</span></br>"+
          "<img class=\"modal-content\" id=\"img01\"></br>"+
          "<div id=\"caption\"></div></br>"+
          "</div></br>";
        }
          break;

      case 'telefono':
          aiTextRet += " <a href=\"" + telefono +"\">"+telefono+"</a></br>";
          break;

      case 'corsi':
          var p = '';
          if (corsi.length == 0) p = " non tiene corsi";
          for (var j=0; j<corsi.length; j++){
            p += " " + corsi[j] + "</br>";
          }
          aiTextRet += p;
          break;
      case 'ruoli':
          var p = '';
          if (ruoli.length == 0) p = " non ricopre ruoli";
          for (var j=0; j<ruoli.length; j++){
            p += " " + ruoli[j] + "</br>";
          }
          aiTextRet += p;
          break;

      default:
        if (polo == ''){
          aiTextRet += " <a href=\"mailto:" + mail +"\">" + mail + "</a> " + telefono;
        }
        else{
          aiTextRet += " <a href=\"mailto:" + mail +"\">" + mail + "</a> " + telefono + " "
          + u_polo + " Ufficio: " + u_num + "<div><img id=\"myImg\" onclick=\"openPhoto()\" src=\"/images/" + polo + "/" + u_num + ".jpg\"></div>"+"<div id=\"myModal\" class=\"modal\">"+
          "<span onclick=\"closePhoto()\"class=\"close\">&times;</span>"+
          "<img class=\"modal-content\" id=\"img01\">"+
          "<div id=\"caption\"></div>"+
          "</div>";
        }
        break;
    }
  }

  return aiTextRet;

}

module.exports = selectField;
