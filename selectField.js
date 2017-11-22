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
  var aiTextRet = "<b><button id='callInfo' href='#' onclick='clickForInfo(this.value)' value='"+ nome + " "+ cognome +"'>" + nome + " " + cognome + "</button></b>";
  for (var i = 0; i < act.length; i++){
    switch(act[i]){
      case 'mail':
          aiTextRet += " </br><a href=\"mailto:" + mail +"\">"+mail+"</a>";
          break;

      case 'ufficio':
        if (u_polo==""){
          aiTextRet += " non ha un ufficio";
        }
        else{
          aiTextRet += "</br> " + u_polo + " - Ufficio " + u_num +
          "</br><img id=\"myImg\" onclick=\"openPhoto(this.src)\" src=\"/images/" + polo + "/" + u_num + ".jpg\"></br>"+
          "<div id=\"myModal\" class=\"modal\" ></br>"+
          "<span class=\"close\" onclick=\"closePhoto()\">&times;</span></br>"+
          "<img class=\"modal-content\" id=\"img01\"></br>"+
          "<div id=\"caption\"></div></div></br>"+
          "</br>";
        }
          break;

      case 'telefono':
          aiTextRet += " </br><a href=\"" + telefono +"\">"+telefono+"</a>";
          break;

      case 'corsi':
          var p = '';
          p += "<ul class=\"ullist\">";
          if (corsi.length == 0) p += "<li>Non tiene corsi</li>";

          for (var j=0; j<corsi.length; j++){
            p += "<li>" + corsi[j] + "</li>";
          }
          p += "</ul>"
          aiTextRet += p;
          break;
      case 'ruoli':
          var p = '';
          p += "<ul class=\"ullist\">"
          if (ruoli.length == 0) p += "<li>Non ricopre ruoli</li>";
          for (var j=0; j<ruoli.length; j++){
            p += "<li>" + ruoli[j] + "</li>";
          }
          p += "</ul>"
          aiTextRet += p;
          break;
    case 'singola':
        if (polo == ''){
          aiTextRet += "</br> <a href=\"mailto:" + mail +"\">" + mail + "</a> " + telefono;
        }
        else{
          aiTextRet += "</br> <a href=\"mailto:" + mail +"\">" + mail + "</a></br> " + telefono + "</br> "
          + u_polo + " - Ufficio " + u_num + "</br><img id=\"myImg\" onclick=\"openPhoto(this.src)\" src=\"/images/" + polo + "/" + u_num + ".jpg\">"+"<div id=\"myModal\" class=\"modal\">"+
          "<span onclick=\"closePhoto()\"class=\"close\">&times;</span>"+
          "<img class=\"modal-content\" id=\"img01\">"+
          "<div id=\"caption\"></div>"+
          "</div>";
          var p = '</br></br>Ruoli:';
          p += "<ul class=\"ullist\">";
          if (ruoli.length == 0) {
              p += "<li>Non ricopre ruoli</li>";
          }
          else{
            for (var j=0; j<ruoli.length; j++){
                p += "<li>" + ruoli[j] + "</li>";
            }
          }
          p += '</ul>Corsi:<ul class=\"ullist\">';
          if (corsi.length == 0){
              p = "<li>Non tiene corsi</li>";
          }else{
              for (var j=0; j<corsi.length; j++){
                p += " <li>" + corsi[j] + "</li>";
              }
          }
          p += "</ul>"
          aiTextRet += p;
        }
        break;
      default:
       var p = '</br>Ruoli:';
          p += "<ul class=\"ullist\">";
          if (ruoli.length == 0) {
              p += "<li>Non ricopre ruoli</li>";
          }
          else{
            for (var j=0; j<ruoli.length; j++){
                p += "<li>" + ruoli[j] + "</li>";
            }
          }
          p += '</ul></br>Corsi:<ul class=\"ullist\">';
          if (corsi.length == 0){
              p = "<li>Non tiene corsi</li>";
          }else{
              for (var j=0; j<corsi.length; j++){
                p += " <li>" + corsi[j] + "</li>";
              }
          }
          p += "</ul>"
          aiTextRet += p;
        break;
    }
  }

  return aiTextRet;

}

module.exports = selectField;
