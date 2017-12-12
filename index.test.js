const fetch = require('node-fetch');
//const root = 'https://unitnfinder.herokuapp.com/';
const root = 'localhost:5000/api/'
const urlGETCorsi= root  +'corsi';
const getCorsi = function (){
  return fetch(urlGETCorsi, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then((response) => {
    if(response.ok) {
      return response.json();
    } else {
      console.log('ack failed', response.statusText)
    }
  })
  .catch((ex) => {
    throw new Error('fetch failed' + ex)
  });
}
const urlGETRuoli = root + 'ruoli';
const getRuoli = function (){
  return fetch(urlGETRuoli, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then((response) => {
    if(response.ok) {
      return response.json();
    } else {
      console.log('ack failed', response.statusText)
    }
  })
  .catch((ex) => {
    throw new Error('fetch failed' + ex)
  });
}
const urlGETFind = root + 'find/#{nome}&#{cognome}';
const getFind = function (nome, cognome){
  return fetch(urlGETFind, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
  .then((response) => {
    if(response.ok) {
      return response.json();
    } else {
      console.log('ack failed', response.statusText)
    }
  })
  .catch((ex) => {
    throw new Error('fetch failed' + ex)
  });
}

test ('API get function allCourses',() => {
  getCorsi()
    .then((data) => {
      console.log(data);
      var corso = '';
      corso.append('{"corsi":[');
      corso.append('{"corso": "Mobile and satellite communications"},');
      corso.append('{"corso": "Propagazione elettromagnetica"},');
      corso.append('{"corso": "Data mining"},');
      corso.append('{"corso": "Informatica"},');
      corso.append('{"corso": "Machine Learning"},');
      corso.append('{"corso": "Imaging and diagnostic techniques"},');
      corso.append('{"corso": "Inverse problems and optimization"},');
      corso.append('{"corso": "Radar and 5G architectures and systems"},');
      corso.append('{"corso": "Radar architectures and systems"},');
      corso.append('{"corso": "Basi di dati"},');
      corso.append('{"corso": "Big data and social networks"},');
      corso.append('{"corso": "Data mining"},');
      corso.append('{"corso": "Research project"},');
      corso.append('{"corso": "Laboratorio di programmazione per sistemi mobili e tablet"},');
      corso.append('{"corso": "Language Understanding System"},');
      corso.append('{"corso": "Programmazione 1"},');
      corso.append('{"corso": "Formal methods"},');
      corso.append('{"corso": "Programmazione 1"},');
      corso.append('{"corso": "Project course"},');
      corso.append('{"corso": "Research project"},');
      corso.append('{"corso": "Affective computing"},');
      corso.append('{"corso": "Informatica"},');
      corso.append('{"corso": "Intelligent Optimization for data science"},');
      corso.append('{"corso": "Research project"},');
      corso.append('{"corso": "Science, technology and business"},');
      corso.append('{"corso": "Computational linguistics"},');
      corso.append('{"corso": "Text processing"},');
      corso.append('{"corso": "Bioinformatics"},');
      corso.append('{"corso": "Data mining"},');
      corso.append('{"corso": "Laboratory of biological data mining"},');
      corso.append('{"corso": "Programmazione ad oggetti"},');
      corso.append('{"corso": "Data hiding"},');
      corso.append('{"corso": "Multimedia Data Security"},');
      corso.append('{"corso": "Probabilità e statistica per l\'ingegneria dell\'informazione"},');
      corso.append('{"corso": "Informatica e rappresentazione della conoscenza"},');
      corso.append('{"corso": "Informatica ed elementi di programmazione 1"},');
      corso.append('{"corso": "Sistemi informativi"},');
      corso.append('{"corso": "Algoritmi avanzati"},');
      corso.append('{"corso": "Machine learning for data science"},');
      corso.append('{"corso": "Reti avanzate"},');
      corso.append('{"corso": "Reti avanzate e sicurezza"},');
      corso.append('{"corso": "Sicurezza dei dati"},');
      corso.append('{"corso": "Ingegneria del software 2"},');
      corso.append('{"corso": "Advanced remote sensing systems"},');
      corso.append('{"corso": "Comunicazioni elettriche"},');
      corso.append('{"corso": "Fondamenti di comunicazioni digitali"},');
      corso.append('{"corso": "Radar and radiolocalization"},');
      corso.append('{"corso": "Sistemi di telerilevamento"},');
      corso.append('{"corso": "Computer vision"},');
      corso.append('{"corso": "Computer vision and multimedia analysis"},');
      corso.append('{"corso": "Computer vision and multimedia analysis"},');
      corso.append('{"corso": "Comunicazioni multimediali"},');
      corso.append('{"corso": "Project course"},');
      corso.append('{"corso": "Project course on media retrieval"},');
      corso.append('{"corso": "Project course on computer graphics"},');
      corso.append('{"corso": "Fondamenti di stistemi operativi"},');
      corso.append('{"corso": "Network security"},');
      corso.append('{"corso": "Research Project"},');
      corso.append('{"corso": "Sistemi operativi 1"},');
      corso.append('{"corso": "Design experience"},');
      corso.append('{"corso": "Laboratorio di ricerca su sistemi informativi"},');
      corso.append('{"corso": "Participatory design"},');
      corso.append('{"corso": "Privacy and Intellectual Property Rights"},');
      corso.append('{"corso": "Sistemi informativi (a sociologia)"},');
      corso.append('{"corso": "Design experience"},');
      corso.append('{"corso": "Interazione Uomo - Macchina"},');
      corso.append('{"corso": "Research Project"},');
      corso.append('{"corso": "User experience / HCI"},');
      corso.append('{"corso": "User-centerd design"},');
      corso.append('{"corso": "Comunicazioni elettriche"},');
      corso.append('{"corso": "Comunicazioni multimediali"},');
      corso.append('{"corso": "Eleborazione e trasmissione delle immagini"},');
      corso.append('{"corso": "Algoritmi e tecniche di ottimizzazione"},');
      corso.append('{"corso": "Wired communications systems and devices"},');
      corso.append('{"corso": "Agent-oriented software engineering"},');
      corso.append('{"corso": "Gestione dati e business intelligence"},');
      corso.append('{"corso": "Ingegneria del software 1"},');
      corso.append('{"corso": "Knowledge and Data Integration"},');
      corso.append('{"corso": "Knowledge and representation in an open world"},');
      corso.append('{"corso": "Logica"},');
      corso.append('{"corso": "Computability and computational complexity"},');
      corso.append('{"corso": "Linguaggi di programmazione"},');
      corso.append('{"corso": "Programmazione 2"},');
      corso.append('{"corso": "Advanced network modelling and design"},');
      corso.append('{"corso": "Design of networks and communication systems"},');
      corso.append('{"corso": "Network modelling and design"},');
      corso.append('{"corso": "Progettazione di reti e sistemi di comunicazione"},');
      corso.append('{"corso": "Project course on software defined networking"},');
      corso.append('{"corso": "Reti"},');
      corso.append('{"corso": "Laboratory of Nomadic communication"},');
      corso.append('{"corso": "Research Project"},');
      corso.append('{"corso": "Reti"},');
      corso.append('{"corso": "Simulation and performance evaluation"},');
      corso.append('{"corso": "Wireless mesh and vehicular networks"},');
      corso.append('{"corso": "Innovation and Entrepeneurship studies in ICT"},');
      corso.append('{"corso": "Introduction to service design and engineering"},');
      corso.append('{"corso": "Research project"},');
      corso.append('{"corso": "Campi elettromagnetici"},');
      corso.append('{"corso": "Fondamenti di campi elettromagnetici"},');
      corso.append('{"corso": "Industrial trends in communications"},');
      corso.append('{"corso": "Tecniche di diagnostica biomedicale"},');
      corso.append('{"corso": "Cyber Security Risk Assessment"},');
      corso.append('{"corso": "ICT Innovation"},');
      corso.append('{"corso": "ICT Innovation - Product Design and Development"},');
      corso.append('{"corso": "Offensive Technologies"},');
      corso.append('{"corso": "Project course"},');
      corso.append('{"corso": "Research Project"},');
      corso.append('{"corso": "Recognition systems"},');
      corso.append('{"corso": "Trasmissione numerica"},');
      corso.append('{"corso": "Algoritmi e strutture dati"},');
      corso.append('{"corso": "Algorimti e strutture dati (I UD)"},');
      corso.append('{"corso": "Algorimti e strutture dati (II UD)"},');
      corso.append('{"corso": "Fondamenti di algoritmi e strutture dati"},');
      corso.append('{"corso": "Project course"},');
      corso.append('{"corso": "Research Project"},');
      corso.append('{"corso": "Scientific Programming"},');
      corso.append('{"corso": "Advanced Natural Language Processing nad Information Retrieval"},');
      corso.append('{"corso": "Introduzione alla programmazione per il web"},');
      corso.append('{"corso": "Project course"},');
      corso.append('{"corso": "Architettura degli elaboratori"},');
      corso.append('{"corso": "Calcolatori"},');
      corso.append('{"corso": "Fondamenta di Architetture digitali"},');
      corso.append('{"corso": "Laboratory of applied of robotics"},');
      corso.append('{"corso": "Real time operating system and middleware"},');
      corso.append('{"corso": "Research Project"},');
      corso.append('{"corso": "Teoria dei sistemi"},');
      corso.append('{"corso": "Advanced computing architectures"},');
      corso.append('{"corso": "Elettronica"},');
      corso.append('{"corso": "Fondamenti di elettronica"},');
      corso.append('{"corso": "Reti logiche (modulo 1)"},');
      corso.append('{"corso": "Reti logiche (modulo 2)"},');
      corso.append('{"corso": "Distributed system 1"},');
      corso.append('{"corso": "Laboratory of wireless sensor networks"},');
      corso.append('{"corso": "Linguaggi di programmazione"},');
      corso.append('{"corso": "Concurrency"},');
      corso.append('{"corso": "Linguaggi formali e compilatori"},');
      corso.append('{"corso": "E-learning"},');
      corso.append('{"corso": "Laboratorio di programmazione per sistemi mobili e tablet"},');
      corso.append('{"corso": "Linguaggi di programmazione"},');
      corso.append('{"corso": "Research project"},');
      corso.append('{"corso": "Web architecture"},');
      corso.append('{"corso": "Communication systems"},');
      corso.append('{"corso": "Design of networs and communication systems"},');
      corso.append('{"corso": "Progettazione di reti e sistemi di comunicazione"},');
      corso.append('{"corso": "Teoria dei segnali"}}');
      corso.append(']}</br>');

      expect(data).toBe(corso)
    })
});
test ('API get function allCourses',() => {
  getCorsi()
    .then((data) => {
      console.log(data);
      var ruolo = '';
      ruolo.append('{"ruoli":[')
      ruolo.append('{"corso": "Responsabile CdS Ingegneria dell\'Informazione e delle Comunicazioni"},');
      ruolo.append('{"corso": "Delegato per l\'orientamento"},');
      ruolo.append('{"corso": "Responsabile CdS Ingegneria dell\'Informazione e Organizzazione d\'Impresa"},');
      ruolo.append('{"corso": "Componente - Commissione brevetti"},');
      ruolo.append('{"corso": "Delegato per l\'orientamento"},');
      ruolo.append('{"corso": "Responsabile di dipartimento - Dipartimento di ingegneria e scienza dell\'informazione"},');
      ruolo.append('{"corso": "Direttore di dipartimento - Dipartimento di ingegneria e scienza dell\'informazione"},');
      ruolo.append('{"corso": "Componente - Consulta dei direttori"},');
      ruolo.append('{"corso": "Delegato per l\'orientamento"},');
      ruolo.append('{"corso": "Delegato per lo sport"},');
      ruolo.append('{"corso": "Presidente - Commissione sport"},');
      ruolo.append('{"corso": "Delegato piani di studio Area Informatica"},');
      ruolo.append('{"corso": "Delegato Erasmus+"},');
      ruolo.append('{"corso": "Delegato piani di studio Area Ingeneria"},');
      ruolo.append('{"corso": "Coordinatore - corso di dottorato - Informatica e telecomunicazioni"},');
      ruolo.append('{"corso": "Delegato per i servizi e le tecnologie informatiche"},');
      ruolo.append('{"corso": "Prorettore allo sviluppo internazionale"},');
      ruolo.append('{"corso": "Direttore vicario di dipartimento - Dipartimento di ingegneria e scienza dell\'informazione"},');
      ruolo.append('{"corso": "Delegato al posizionamento nazionale e internazionale dell\'ateneo"},');
      ruolo.append('{"corso": "Delegato alla Didattica"},');
      ruolo.append('{"corso": "Vice coordinatore - corso di dottorato - Informatica e telecomunicazioni"},');
      ruolo.append('{"corso": "Delegato stage e tirocini"},');
      ruolo.append('{"corso": "Delegato per la qualità"},');
      ruolo.append('{"corso": "Delegato per i tirocini curricolari, placement alumni"},');
      ruolo.append('{"corso": "Componente - Consiglio di biblioteca"},');
      ruolo.append('{"corso": "Responsabile CdS Informatica"},');
      ruolo.append('{"corso": "Delegato disabilità"}');
      ruolo.append(']}</br>')
      expect(data).toBe(ruolo)
    })
});
test ('API get function find by name | Fabio Casati', () => {
  var nome = 'Fabio'
  var cognome = 'Casati'
  getFind(nome, cognome)
  .then((data) => {
    console.log(data)
    var json = '{"professore":[{"nome":"Fabio"},{"cognome":"Casati"},{"mail": "fabio.casati@unitn.it"},{"telefono": "+390461282044"},{"dipartimento": "DISI"},{"polo": "Povo 1"},{"ufficio": "224"},{"corso0":"Ingegneria del software 2"}]}</br>'
    expect(data).toBe(json);
  })
})
