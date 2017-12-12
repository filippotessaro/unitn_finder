const fetch = require('node-fetch');
const root = 'https://unitnfinder.herokuapp.com/api/';
//const root = 'localhost:5000/api/'
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
const urlGETFind = root + 'find/Fabio&Casati';
const getFind = function (){
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
    .then((corsi) => {
      var corsi_string = JSON.stringify(corsi)
      var corso = '';
      corso = corso.concat('{"corsi":[');
      corso = corso.concat('{"corso":"Mobile and satellite communications"},');
      corso = corso.concat('{"corso":"Propagazione elettromagnetica"},');
      corso = corso.concat('{"corso":"Data mining"},');
      corso = corso.concat('{"corso":"Informatica"},');
      corso = corso.concat('{"corso":"Machine Learning"},');
      corso = corso.concat('{"corso":"Imaging and diagnostic techniques"},');
      corso = corso.concat('{"corso":"Inverse problems and optimization"},');
      corso = corso.concat('{"corso":"Radar and 5G architectures and systems"},');
      corso = corso.concat('{"corso":"Radar architectures and systems"},');
      corso = corso.concat('{"corso":"Basi di dati"},');
      corso = corso.concat('{"corso":"Big data and social networks"},');
      corso = corso.concat('{"corso":"Data mining"},');
      corso = corso.concat('{"corso":"Research project"},');
      corso = corso.concat('{"corso":"Laboratorio di programmazione per sistemi mobili e tablet"},');
      corso = corso.concat('{"corso":"Language Understanding System"},');
      corso = corso.concat('{"corso":"Programmazione 1"},');
      corso = corso.concat('{"corso":"Formal methods"},');
      corso = corso.concat('{"corso":"Programmazione 1"},');
      corso = corso.concat('{"corso":"Project course"},');
      corso = corso.concat('{"corso":"Research project"},');
      corso = corso.concat('{"corso":"Affective computing"},');
      corso = corso.concat('{"corso":"Informatica"},');
      corso = corso.concat('{"corso":"Intelligent Optimization for data science"},');
      corso = corso.concat('{"corso":"Research project"},');
      corso = corso.concat('{"corso":"Science, technology and business"},');
      corso = corso.concat('{"corso":"Computational linguistics"},');
      corso = corso.concat('{"corso":"Text processing"},');
      corso = corso.concat('{"corso":"Bioinformatics"},');
      corso = corso.concat('{"corso":"Data mining"},');
      corso = corso.concat('{"corso":"Laboratory of biological data mining"},');
      corso = corso.concat('{"corso":"Programmazione ad oggetti"},');
      corso = corso.concat('{"corso":"Data hiding"},');
      corso = corso.concat('{"corso":"Multimedia Data Security"},');
      corso = corso.concat('{"corso":"Probabilità e statistica per l\'ingegneria dell\'informazione"},');
      corso = corso.concat('{"corso":"Informatica e rappresentazione della conoscenza"},');
      corso = corso.concat('{"corso":"Informatica ed elementi di programmazione 1"},');
      corso = corso.concat('{"corso":"Sistemi informativi"},');
      corso = corso.concat('{"corso":"Algoritmi avanzati"},');
      corso = corso.concat('{"corso":"Machine learning for data science"},');
      corso = corso.concat('{"corso":"Reti avanzate"},');
      corso = corso.concat('{"corso":"Reti avanzate e sicurezza"},');
      corso = corso.concat('{"corso":"Sicurezza dei dati"},');
      corso = corso.concat('{"corso":"Ingegneria del software 2"},');
      corso = corso.concat('{"corso":"Advanced remote sensing systems"},');
      corso = corso.concat('{"corso":"Comunicazioni elettriche"},');
      corso = corso.concat('{"corso":"Fondamenti di comunicazioni digitali"},');
      corso = corso.concat('{"corso":"Radar and radiolocalization"},');
      corso = corso.concat('{"corso":"Sistemi di telerilevamento"},');
      corso = corso.concat('{"corso":"Computer vision"},');
      corso = corso.concat('{"corso":"Computer vision and multimedia analysis"},');
      corso = corso.concat('{"corso":"Computer vision and multimedia analysis"},');
      corso = corso.concat('{"corso":"Comunicazioni multimediali"},');
      corso = corso.concat('{"corso":"Project course"},');
      corso = corso.concat('{"corso":"Project course on media retrieval"},');
      corso = corso.concat('{"corso":"Project course on computer graphics"},');
      corso = corso.concat('{"corso":"Fondamenti di stistemi operativi"},');
      corso = corso.concat('{"corso":"Network security"},');
      corso = corso.concat('{"corso":"Research Project"},');
      corso = corso.concat('{"corso":"Sistemi operativi 1"},');
      corso = corso.concat('{"corso":"Design experience"},');
      corso = corso.concat('{"corso":"Laboratorio di ricerca su sistemi informativi"},');
      corso = corso.concat('{"corso":"Participatory design"},');
      corso = corso.concat('{"corso":"Privacy and Intellectual Property Rights"},');
      corso = corso.concat('{"corso":"Sistemi informativi (a sociologia)"},');
      corso = corso.concat('{"corso":"Design experience"},');
      corso = corso.concat('{"corso":"Interazione Uomo - Macchina"},');
      corso = corso.concat('{"corso":"Research Project"},');
      corso = corso.concat('{"corso":"User experience / HCI"},');
      corso = corso.concat('{"corso":"User-centerd design"},');
      corso = corso.concat('{"corso":"Comunicazioni elettriche"},');
      corso = corso.concat('{"corso":"Comunicazioni multimediali"},');
      corso = corso.concat('{"corso":"Eleborazione e trasmissione delle immagini"},');
      corso = corso.concat('{"corso":"Algoritmi e tecniche di ottimizzazione"},');
      corso = corso.concat('{"corso":"Wired communications systems and devices"},');
      corso = corso.concat('{"corso":"Agent-oriented software engineering"},');
      corso = corso.concat('{"corso":"Gestione dati e business intelligence"},');
      corso = corso.concat('{"corso":"Ingegneria del software 1"},');
      corso = corso.concat('{"corso":"Knowledge and Data Integration"},');
      corso = corso.concat('{"corso":"Knowledge and representation in an open world"},');
      corso = corso.concat('{"corso":"Logica"},');
      corso = corso.concat('{"corso":"Computability and computational complexity"},');
      corso = corso.concat('{"corso":"Linguaggi di programmazione"},');
      corso = corso.concat('{"corso":"Programmazione 2"},');
      corso = corso.concat('{"corso":"Advanced network modelling and design"},');
      corso = corso.concat('{"corso":"Design of networks and communication systems"},');
      corso = corso.concat('{"corso":"Network modelling and design"},');
      corso = corso.concat('{"corso":"Progettazione di reti e sistemi di comunicazione"},');
      corso = corso.concat('{"corso":"Project course on software defined networking"},');
      corso = corso.concat('{"corso":"Reti"},');
      corso = corso.concat('{"corso":"Laboratory of Nomadic communication"},');
      corso = corso.concat('{"corso":"Research Project"},');
      corso = corso.concat('{"corso":"Reti"},');
      corso = corso.concat('{"corso":"Simulation and performance evaluation"},');
      corso = corso.concat('{"corso":"Wireless mesh and vehicular networks"},');
      corso = corso.concat('{"corso":"Innovation and Entrepeneurship studies in ICT"},');
      corso = corso.concat('{"corso":"Introduction to service design and engineering"},');
      corso = corso.concat('{"corso":"Research project"},');
      corso = corso.concat('{"corso":"Campi elettromagnetici"},');
      corso = corso.concat('{"corso":"Fondamenti di campi elettromagnetici"},');
      corso = corso.concat('{"corso":"Industrial trends in communications"},');
      corso = corso.concat('{"corso":"Tecniche di diagnostica biomedicale"},');
      corso = corso.concat('{"corso":"Cyber Security Risk Assessment"},');
      corso = corso.concat('{"corso":"ICT Innovation"},');
      corso = corso.concat('{"corso":"ICT Innovation - Product Design and Development"},');
      corso = corso.concat('{"corso":"Offensive Technologies"},');
      corso = corso.concat('{"corso":"Project course "},');
      corso = corso.concat('{"corso":"Research Project"},');
      corso = corso.concat('{"corso":"Recognition systems"},');
      corso = corso.concat('{"corso":"Trasmissione numerica"},');
      corso = corso.concat('{"corso":"Algoritmi e strutture dati"},');
      corso = corso.concat('{"corso":"Algorimti e strutture dati (I UD)"},');
      corso = corso.concat('{"corso":"Algorimti e strutture dati (II UD)"},');
      corso = corso.concat('{"corso":"Fondamenti di algoritmi e strutture dati"},');
      corso = corso.concat('{"corso":"Project course "},');
      corso = corso.concat('{"corso":"Research Project"},');
      corso = corso.concat('{"corso":"Scientific Programming"},');
      corso = corso.concat('{"corso":"Advanced Natural Language Processing nad Information Retrieval"},');
      corso = corso.concat('{"corso":"Introduzione alla programmazione per il web"},');
      corso = corso.concat('{"corso":"Project course"},');
      corso = corso.concat('{"corso":"Architettura degli elaboratori"},');
      corso = corso.concat('{"corso":"Calcolatori"},');
      corso = corso.concat('{"corso":"Fondamenta di Architetture digitali"},');
      corso = corso.concat('{"corso":"Laboratory of applied of robotics"},');
      corso = corso.concat('{"corso":"Real time operating system and middleware"},');
      corso = corso.concat('{"corso":"Research Project"},');
      corso = corso.concat('{"corso":"Teoria dei sistemi"},');
      corso = corso.concat('{"corso":"Advanced computing architectures"},');
      corso = corso.concat('{"corso":"Elettronica"},');
      corso = corso.concat('{"corso":"Fondamenti di elettronica"},');
      corso = corso.concat('{"corso":"Reti logiche (modulo 1)"},');
      corso = corso.concat('{"corso":"Reti logiche (modulo 2)"},');
      corso = corso.concat('{"corso":"Distributed system 1"},');
      corso = corso.concat('{"corso":"Laboratory of wireless sensor networks"},');
      corso = corso.concat('{"corso":"Linguaggi di programmazione"},');
      corso = corso.concat('{"corso":"Concurrency"},');
      corso = corso.concat('{"corso":"Linguaggi formali e compilatori"},');
      corso = corso.concat('{"corso":"E-learning"},');
      corso = corso.concat('{"corso":"Laboratorio di programmazione per sistemi mobili e tablet"},');
      corso = corso.concat('{"corso":"Linguaggi di programmazione"},');
      corso = corso.concat('{"corso":"Research project"},');
      corso = corso.concat('{"corso":"Web architecture"},');
      corso = corso.concat('{"corso":"Communication systems"},');
      corso = corso.concat('{"corso":"Design of networks and communication systems"},');
      corso = corso.concat('{"corso":"Progettazione di reti e sistemi di comunicazione"},');
      corso = corso.concat('{"corso":"Teoria dei segnali"}');
      corso = corso.concat(']}');

      expect(corsi_string).toBe(corso)
    })
});
test ('API get function allCourses',() => {
  getRuoli()
    .then((data) => {
      var data_string = JSON.stringify(data)
      var ruolo = '';
      ruolo = ruolo.concat('{"ruoli":[')
      ruolo = ruolo.concat('{"ruolo":"Responsabile CdS Ingegneria dell\'Informazione e delle Comunicazioni"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato per l\'orientamento"},');
      ruolo = ruolo.concat('{"ruolo":"Responsabile CdS Ingegneria dell\'Informazione e Organizzazione d\'Impresa"},');
      ruolo = ruolo.concat('{"ruolo":"Componente - Commissione brevetti"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato per l\'orientamento"},');
      ruolo = ruolo.concat('{"ruolo":"Responsabile di dipartimento - Dipartimento di ingegneria e scienza dell\'informazione"},');
      ruolo = ruolo.concat('{"ruolo":"Direttore di dipartimento - Dipartimento di ingegneria e scienza dell\'informazione"},');
      ruolo = ruolo.concat('{"ruolo":"Componente - Consulta dei direttori"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato per l\'orientamento"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato per lo sport"},');
      ruolo = ruolo.concat('{"ruolo":"Presidente - Commissione sport"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato piani di studio Area Informatica"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato Erasmus+"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato piani di studio Area Ingeneria"},');
      ruolo = ruolo.concat('{"ruolo":"Coordinatore - corso di dottorato - Informatica e telecomunicazioni"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato per i servizi e le tecnologie informatiche"},');
      ruolo = ruolo.concat('{"ruolo":"Prorettore allo sviluppo internazionale"},');
      ruolo = ruolo.concat('{"ruolo":"Direttore vicario di dipartimento - Dipartimento di ingegneria e scienza dell\'informazione"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato al posizionamento nazionale e internazionale dell\'ateneo"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato alla Didattica"},');
      ruolo = ruolo.concat('{"ruolo":"Vice coordinatore - corso di dottorato - Informatica e telecomunicazioni"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato stage e tirocini"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato per la qualità"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato per i tirocini curricolari, placement alumni"},');
      ruolo = ruolo.concat('{"ruolo":"Componente - Consiglio di biblioteca"},');
      ruolo = ruolo.concat('{"ruolo":"Responsabile CdS Informatica"},');
      ruolo = ruolo.concat('{"ruolo":"Delegato disabilità"}');
      ruolo = ruolo.concat(']}')
      expect(data_string).toContain(ruolo)
    })
});
test ('API get function find by name and surname | Fabio Casati', () => {
  getFind()
  .then((data) => {
    var data_string = JSON.stringify(data)
    var json = '{"professore":[{"nome":"Fabio"},{"cognome":"Casati"},{"mail":"fabio.casati@unitn.it"},{"telefono":"+390461282044"},{"dipartimento":"DISI"},{"polo":"Povo 1"},{"ufficio":"224"},{"corso0":"Ingegneria del software 2"}]}'
    expect(data_string).toBe(json);
  })
})
