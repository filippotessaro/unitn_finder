require('dotenv').config();

const DB_URL = process.env.DB_URL;

//richiedo modulo mongoose e schema persona
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Persona = require('./persona.js');

//connessione al DB su mLab
mongoose.connect(DB_URL, {useMongoClient: true});
const db = mongoose.connection;
db.on('error', err => {
  console.error(`Error while connecting to DB: ${err.message}`);
});
db.once('open', () => {
  console.log('DB connected successfully!');
});


const find = require('./find');


test('check nome e cognome - Fabio Casati', () => {
    var azioni = [];
    azioni[0] = '';

    var nome = "Fabio"
    var cognome = "Casati"
    var numero = "+390461282044"
    var mail = "fabio.casati@unitn.it"
    var polo = "Povo 1"
    var ufficio = "Ufficio 224"
    var image = "/images/povo1/224.jpg"
    var dipartimento = "DISI"
    var ruolo = "Non ricopre ruoli"
    var corso = "Ingegneria del software 2"

    return find('Fabio', 'Casati', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
        expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(ruolo);
        expect(aiTxt).toContain(corso);

    })
});

test('check solo nome | più corrispondenze - Roberto', () => {
    var azioni = [];
    azioni[0] = '';

    var nome1 = "Roberto"
    var cognome1 = "Sebastiani"
    var ruolo1 = "Delegato per l'orientamento"
    var corso11 = "Formal methods"
    var corso12 = "Programmazione 1"
    var corso13 = "Project course"
    var corso14 = "Research project"

    var nome2 = "Roberto"
    var cognome2 = "Battiti"
    var ruolo2 = "Non ricopre ruoli"
    var corso21 = "Intelligent Optimization for data science"
    var corso22 = "Research project"
    var corso23 = "Science, technology and business"

    var nome3 = "Roberto"
    var cognome3 = "Passerone"
    var ruolo3 = "Non ricopre ruoli"
    var corso31 = "Advanced computing architectures"
    var corso32 = "Elettronica"
    var corso33 = "Fondamenti di elettronica"
    var corso34 = "Reti logiche (modulo 1)"
    var corso35 = "Reti logiche (modulo 2)"

    return find('Roberto', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome1);
        expect(aiTxt).toContain(cognome1);
        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(corso11);
        expect(aiTxt).toContain(corso12);
        expect(aiTxt).toContain(corso13);
        expect(aiTxt).toContain(corso14);

        expect(aiTxt).toContain(nome2);
        expect(aiTxt).toContain(cognome2);
        expect(aiTxt).toContain(ruolo2);
        expect(aiTxt).toContain(corso21);
        expect(aiTxt).toContain(corso22);
        expect(aiTxt).toContain(corso23);

        expect(aiTxt).toContain(nome3);
        expect(aiTxt).toContain(cognome3);
        expect(aiTxt).toContain(ruolo3);
        expect(aiTxt).toContain(corso31);
        expect(aiTxt).toContain(corso32);
        expect(aiTxt).toContain(corso33);
        expect(aiTxt).toContain(corso34);
        expect(aiTxt).toContain(corso35);

    })
});

test('check solo nome | una sola corrispondenza - Claudio', () => {
    var azioni = [];
    azioni[0] = '';

    var nome = "Claudio"
    var cognome = "Sacchi"
    var numero = "+390461283907"
    var mail = "claudio.sacchi@unitn.it"
    var polo = "Povo 1"
    var ufficio = "Ufficio 244"
    var image = "/images/povo1/244.jpg"
    var dipartimento = "DISI"
    var ruolo = "Non ricopre ruoli"
    var corso1 = "Communication systems"
    var corso2 = "Design of networs and communication systems"
    var corso3 = "Progettazione di reti e sistemi di comunicazione"
    var corso4 = "Teoria dei segnali"

    return find('Claudio', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
        expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(ruolo);
        expect(aiTxt).toContain(corso1);
        expect(aiTxt).toContain(corso2);
        expect(aiTxt).toContain(corso3);
        expect(aiTxt).toContain(corso4);

    })
});

test('check ricerca per ruolo | singolo docente - Responsabile CdS Ingegneria dell"Informazione e Organizzazione d"Impresa', () => {
    var azioni = [];
    azioni[0] = '';

    var nome = "Giuseppe"
    var cognome = "Riccardi"
    var numero = "+390461282087"
    var mail = "giuseppe.riccardi@unitn.it"
    var polo = "Povo 1"
    var ufficio = "Ufficio 207"
    var image = "/images/povo1/207.jpg"
    var dipartimento = "DISI"
    var ruolo1 = "Responsabile CdS Ingegneria dell'Informazione e Organizzazione d'Impresa"
    var ruolo2 = "Componente - Commissione brevetti"
    var corso1 = "Laboratorio di programmazione per sistemi mobili e tablet"
    var corso2 = "Language Understanding System"
    var corso3 = "Programmazione 1"

    return find('', '', ruolo1,azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
        expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(ruolo2);
        expect(aiTxt).toContain(corso1);
        expect(aiTxt).toContain(corso2);
        expect(aiTxt).toContain(corso3);

    })
});

test('check ricerca per dipartimento - DISI', () => {
    var azioni = [];
    azioni[0] = '';
    var dipartimento = "DISI";

    var nome1 = "John"
    var cognome1 = "Mylopoulos"
    var nome2 = "Giacomo"
    var cognome2 = "Oliveri"
    var nome3 = "Andrea"
    var cognome3 = "Passerini"
    var nome4 = "Paolo"
    var cognome4 = "Rocca"
    var nome5 = "Yannis"
    var cognome5 = "Velegrakis"
    var nome6 = "Giuseppe"
    var cognome6 = "Riccardi"
    var nome7 = "Roberto"
    var cognome7 = "Sebastiani"
    var nome8 = "Nicu"
    var cognome8 = "Sebe"
    var nome9 = "Roberto"
    var cognome9 = "Battiti"
    var nome10 = "Raffaella"
    var cognome10 = "Bernardi"
    var nome11 = "Enrico"
    var cognome11 = "Blanzieri"
    var nome12 = "Giulia"
    var cognome12 = "Boato"
    var nome13 = "Paolo"
    var cognome13 = "Bouquet"
    var nome14 = "Mauro"
    var cognome14 = "Brunato"
    var nome15 = "Fabio"
    var cognome15 = "Casati"
    var nome16 = "Lorenzo"
    var cognome16 = "Bruzzone"
    var nome17 = "Nicola"
    var cognome17 = "Conci"
    var nome18 = "Bruno"
    var cognome18 = "Crispo"
    var nome19 = "Vincenzo"
    var cognome19 = "D'Andrea"
    var nome20 = "Antonella"
    var cognome20 = "De Angeli"
    var nome21 = "Francesco"
    var cognome21 = "De Natale"
    var nome22 = "Begum"
    var cognome22 = "Demir"
    var nome23 = "Massimo"
    var cognome23 = "Donelli"
    var nome24 = "Paolo"
    var cognome24 = "Giorgini"
    var nome25 = "Fausto"
    var cognome25 = "Giunchiglia"
    var nome26 = "Gabriel Mark"
    var cognome26 = "Kuper"
    var nome27 = "Fabrizio"
    var cognome27 = "Granelli"
    var nome28 = "Leonardo"
    var cognome28 = "Maccari"
    var nome29 = "Renato"
    var cognome29 = "Lo Cigno"
    var nome30 = "Maurizio"
    var cognome30 = "Marchese"
    var nome31 = "Andrea"
    var cognome31 = "Massa"
    var nome32 = "Fabio"
    var cognome32 = "Massacci"
    var nome33 = "Farid"
    var cognome33 = "Melgani"
    var nome34 = "Alberto"
    var cognome34 = "Montresor"
    var nome35 = "Alessandro"
    var cognome35 = "Moschitti"
    var nome36 = "Luigi"
    var cognome36 = "Palopoli"
    var nome37 = "Roberto"
    var cognome37 = "Passerone"
    var nome38 = "Gian Pietro"
    var cognome38 = "Picco"
    var nome39 = "Paola"
    var cognome39 = "Quaglia"
    var nome40 = "Marco"
    var cognome40 = "Ronchetti"
    var nome41 = "Claudio"
    var cognome41 = "Sacchi"

    var ruolo1 = "Responsabile CdS Ingegneria dell'Informazione e delle Comunicazioni";
    var ruolo2 = "Delegato per l'orientamento";
    var ruolo3 = "Responsabile CdS Ingegneria dell'Informazione e Organizzazione d'Impresa";
    var ruolo4 = "Componente - Commissione brevetti";
    var ruolo5 = "Delegato per l'orientamento";
    var ruolo6 = "Responsabile di dipartimento - Dipartimento di ingegneria e scienza dell'informazione";
    var ruolo7 = "Direttore di dipartimento - Dipartimento di ingegneria e scienza dell'informazione";
    var ruolo8 = "Componente - Consulta dei direttori";
    var ruolo9 = "Delegato per l'orientamento";
    var ruolo10 = "Delegato per lo sport";
    var ruolo11 = "Presidente - Commissione sport";
    var ruolo12 = "Delegato piani di studio Area Informatica";
    var ruolo13 = "Delegato Erasmus+";
    var ruolo14 = "Delegato piani di studio Area Ingeneria";
    var ruolo15 = "Coordinatore - corso di dottorato - Informatica e telecomunicazioni";
    var ruolo16 = "Delegato per i servizi e le tecnologie informatiche";
    var ruolo17 = "Prorettore allo sviluppo internazionale";
    var ruolo18 = "Direttore vicario di dipartimento - Dipartimento di ingegneria e scienza dell'informazione";
    var ruolo19 = "Delegato al posizionamento nazionale e internazionale dell'ateneo";
    var ruolo20 = "Delegato alla Didattica";
    var ruolo21 = "Vice coordinatore - corso di dottorato - Informatica e telecomunicazioni";
    var ruolo22 = "Delegato stage e tirocini";
    var ruolo23 = "Delegato per la qualità";
    var ruolo24 = "Delegato per i tirocini curricolari, placement alumni";
    var ruolo25 = "Componente - Consiglio di biblioteca";
    var ruolo26 = "Responsabile CdS Informatica";
    var ruolo27 = "Delegato disabilità";

    var corso1 = "Mobile and satellite communications";
    var corso2 = "Propagazione elettromagnetica";
    var corso3 = "Data mining";
    var corso4 = "Informatica";
    var corso5 = "Machine Learning";
    var corso6 = "Imaging and diagnostic techniques";
    var corso7 = "Inverse problems and optimization";
    var corso8 = "Radar and 5G architectures and systems";
    var corso9 = "Radar architectures and systems";
    var corso10 = "Basi di dati";
    var corso11 = "Big data and social networks";
    var corso12 = "Data mining";
    var corso13 = "Research project";
    var corso14 = "Laboratorio di programmazione per sistemi mobili e tablet";
    var corso15 = "Language Understanding System";
    var corso16 = "Programmazione 1";
    var corso17 = "Formal methods";
    var corso18 = "Programmazione 1";
    var corso19 = "Project course";
    var corso20 = "Research project";
    var corso21 = "Affective computing";
    var corso22 = "Informatica";
    var corso23 = "Intelligent Optimization for data science";
    var corso24 = "Research project";
    var corso25 = "Science, technology and business";
    var corso26 = "Computational linguistics";
    var corso27 = "Text processing";
    var corso28 = "Bioinformatics";
    var corso29 = "Data mining";
    var corso30 = "Laboratory of biological data mining";
    var corso31 = "Programmazione ad oggetti";
    var corso32 = "Data hiding";
    var corso33 = "Multimedia Data Security";
    var corso34 = "Probabilità e statistica per l'ingegneria dell'informazione";
    var corso35 = "Informatica e rappresentazione della conoscenza";
    var corso36 = "Informatica ed elementi di programmazione 1";
    var corso37 = "Sistemi informativi";
    var corso38 = "Algoritmi avanzati";
    var corso39 = "Machine learning for data science";
    var corso40 = "Reti avanzate";
    var corso41 = "Reti avanzate e sicurezza";
    var corso42 = "Sicurezza dei dati";
    var corso43 = "Ingegneria del software 2";
    var corso44 = "Advanced remote sensing systems";
    var corso45 = "Comunicazioni elettriche";
    var corso46 = "Fondamenti di comunicazioni digitali";
    var corso47 = "Radar and radiolocalization";
    var corso48 = "Sistemi di telerilevamento";
    var corso49 = "Computer vision";
    var corso50 = "Computer vision and multimedia analysis";
    var corso51 = "Computer vision and multimedia analysis";
    var corso52 = "Comunicazioni multimediali";
    var corso53 = "Project course";
    var corso54 = "Project course on media retrieval";
    var corso55 = "Project course on computer graphics";
    var corso56 = "Fondamenti di stistemi operativi";
    var corso57 = "Network security";
    var corso58 = "Research Project";
    var corso59 = "Sistemi operativi 1";
    var corso60 = "Design experience";
    var corso61 = "Laboratorio di ricerca su sistemi informativi";
    var corso62 = "Participatory design";
    var corso63 = "Privacy and Intellectual Property Rights";
    var corso64 = "Sistemi informativi (a sociologia)";
    var corso65 = "Design experience";
    var corso66 = "Interazione Uomo - Macchina";
    var corso67 = "Research Project";
    var corso68 = "User experience / HCI";
    var corso69 = "User-centerd design";
    var corso70 = "Comunicazioni elettriche";
    var corso71 = "Comunicazioni multimediali";
    var corso72 = "Eleborazione e trasmissione delle immagini";
    var corso73 = "Algoritmi e tecniche di ottimizzazione";
    var corso74 = "Wired communications systems and devices";
    var corso75 = "Agent-oriented software engineering";
    var corso76 = "Gestione dati e business intelligence";
    var corso77 = "Ingegneria del software 1";
    var corso78 = "Knowledge and Data Integration";
    var corso79 = "Knowledge and representation in an open world";
    var corso80 = "Logica";
    var corso81 = "Computability and computational complexity";
    var corso82 = "Linguaggi di programmazione";
    var corso83 = "Programmazione 2";
    var corso84 = "Advanced network modelling and design";
    var corso85 = "Design of networks and communication systems";
    var corso86 = "Network modelling and design";
    var corso87 = "Progettazione di reti e sistemi di comunicazione";
    var corso88 = "Project course on software defined networking";
    var corso89 = "Reti";
    var corso90 = "Laboratory of Nomadic communication";
    var corso91 = "Research Project";
    var corso92 = "Reti";
    var corso93 = "Simulation and performance evaluation";
    var corso94 = "Wireless mesh and vehicular networks";
    var corso95 = "Innovation and Entrepeneurship studies in ICT";
    var corso96 = "Introduction to service design and engineering";
    var corso97 = "Research project";
    var corso98 = "Campi elettromagnetici";
    var corso99 = "Fondamenti di campi elettromagnetici";
    var corso100 = "Industrial trends in communications";
    var corso101 = "Tecniche di diagnostica biomedicale";
    var corso102 = "Cyber Security Risk Assessment";
    var corso103 = "ICT Innovation";
    var corso104 = "ICT Innovation - Product Design and Development";
    var corso105 = "Offensive Technologies";
    var corso106 = "Project course";
    var corso107 = "Research Project";
    var corso108 = "Recognition systems";
    var corso109 = "Trasmissione numerica";
    var corso110 = "Algoritmi e strutture dati";
    var corso111 = "Algorimti e strutture dati (I UD)";
    var corso112 = "Algorimti e strutture dati (II UD)";
    var corso113 = "Fondamenti di algoritmi e strutture dati";
    var corso114 = "Project course";
    var corso115 = "Research Project";
    var corso116 = "Scientific Programming";
    var corso117 = "Advanced Natural Language Processing nad Information Retrieval";
    var corso118 = "Introduzione alla programmazione per il web";
    var corso119 = "Project course";
    var corso120 = "Architettura degli elaboratori";
    var corso121 = "Calcolatori";
    var corso122 = "Fondamenta di Architetture digitali";
    var corso123 = "Laboratory of applied of robotics";
    var corso124 = "Real time operating system and middleware";
    var corso125 = "Research Project";
    var corso126 = "Teoria dei sistemi";
    var corso127 = "Advanced computing architectures";
    var corso128 = "Elettronica";
    var corso129 = "Fondamenti di elettronica";
    var corso130 = "Reti logiche (modulo 1)";
    var corso131 = "Reti logiche (modulo 2)";
    var corso132 = "Distributed system 1";
    var corso133 = "Laboratory of wireless sensor networks";
    var corso134 = "Linguaggi di programmazione";
    var corso135 = "Concurrency";
    var corso136 = "Linguaggi formali e compilatori";
    var corso137 = "E-learning";
    var corso138 = "Laboratorio di programmazione per sistemi mobili e tablet";
    var corso139 = "Linguaggi di programmazione";
    var corso140 = "Research project";
    var corso141 = "Web architecture";
    var corso142 = "Communication systems";
    var corso143 = "Design of networs and communication systems";
    var corso144 = "Progettazione di reti e sistemi di comunicazione";
    var corso145 = "Teoria dei segnali";

    return find('', '', '',azioni,dipartimento).then( (aiTxt) => {
        expect(aiTxt).toContain(nome1);
        expect(aiTxt).toContain(cognome1);
        expect(aiTxt).toContain(nome2);
        expect(aiTxt).toContain(cognome2);
        expect(aiTxt).toContain(nome3);
        expect(aiTxt).toContain(cognome3);
        expect(aiTxt).toContain(nome4);
        expect(aiTxt).toContain(cognome4);
        expect(aiTxt).toContain(nome5);
        expect(aiTxt).toContain(cognome5);
        expect(aiTxt).toContain(nome6);
        expect(aiTxt).toContain(cognome6);
        expect(aiTxt).toContain(nome7);
        expect(aiTxt).toContain(cognome7);
        expect(aiTxt).toContain(nome8);
        expect(aiTxt).toContain(cognome8);
        expect(aiTxt).toContain(nome9);
        expect(aiTxt).toContain(cognome9);
        expect(aiTxt).toContain(nome10);
        expect(aiTxt).toContain(cognome10);
        expect(aiTxt).toContain(nome11);
        expect(aiTxt).toContain(cognome11);
        expect(aiTxt).toContain(nome12);
        expect(aiTxt).toContain(cognome12);
        expect(aiTxt).toContain(nome13);
        expect(aiTxt).toContain(cognome13);
        expect(aiTxt).toContain(nome14);
        expect(aiTxt).toContain(cognome14);
        expect(aiTxt).toContain(nome15);
        expect(aiTxt).toContain(cognome15);
        expect(aiTxt).toContain(nome16);
        expect(aiTxt).toContain(cognome16);
        expect(aiTxt).toContain(nome17);
        expect(aiTxt).toContain(cognome17);
        expect(aiTxt).toContain(nome18);
        expect(aiTxt).toContain(cognome18);
        expect(aiTxt).toContain(nome19);
        expect(aiTxt).toContain(cognome19);
        expect(aiTxt).toContain(nome20);
        expect(aiTxt).toContain(cognome20);
        expect(aiTxt).toContain(nome21);
        expect(aiTxt).toContain(cognome21);
        expect(aiTxt).toContain(nome22);
        expect(aiTxt).toContain(cognome22);
        expect(aiTxt).toContain(nome23);
        expect(aiTxt).toContain(cognome23);
        expect(aiTxt).toContain(nome24);
        expect(aiTxt).toContain(cognome24);
        expect(aiTxt).toContain(nome25);
        expect(aiTxt).toContain(cognome25);
        expect(aiTxt).toContain(nome26);
        expect(aiTxt).toContain(cognome26);
        expect(aiTxt).toContain(nome27);
        expect(aiTxt).toContain(cognome27);
        expect(aiTxt).toContain(nome28);
        expect(aiTxt).toContain(cognome28);
        expect(aiTxt).toContain(nome29);
        expect(aiTxt).toContain(cognome29);
        expect(aiTxt).toContain(nome30);
        expect(aiTxt).toContain(cognome30);
        expect(aiTxt).toContain(nome31);
        expect(aiTxt).toContain(cognome31);
        expect(aiTxt).toContain(nome32);
        expect(aiTxt).toContain(cognome32);
        expect(aiTxt).toContain(nome33);
        expect(aiTxt).toContain(cognome33);
        expect(aiTxt).toContain(nome34);
        expect(aiTxt).toContain(cognome34);
        expect(aiTxt).toContain(nome35);
        expect(aiTxt).toContain(cognome35);
        expect(aiTxt).toContain(nome36);
        expect(aiTxt).toContain(cognome36);
        expect(aiTxt).toContain(nome37);
        expect(aiTxt).toContain(cognome37);
        expect(aiTxt).toContain(nome38);
        expect(aiTxt).toContain(cognome38);
        expect(aiTxt).toContain(nome39);
        expect(aiTxt).toContain(cognome39);
        expect(aiTxt).toContain(nome40);
        expect(aiTxt).toContain(cognome40);
        expect(aiTxt).toContain(nome41);
        expect(aiTxt).toContain(cognome41);

        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(ruolo2);
        expect(aiTxt).toContain(ruolo3);
        expect(aiTxt).toContain(ruolo4);
        expect(aiTxt).toContain(ruolo5);
        expect(aiTxt).toContain(ruolo6);
        expect(aiTxt).toContain(ruolo7);
        expect(aiTxt).toContain(ruolo8);
        expect(aiTxt).toContain(ruolo9);
        expect(aiTxt).toContain(ruolo10);
        expect(aiTxt).toContain(ruolo11);
        expect(aiTxt).toContain(ruolo12);
        expect(aiTxt).toContain(ruolo13);
        expect(aiTxt).toContain(ruolo14);
        expect(aiTxt).toContain(ruolo15);
        expect(aiTxt).toContain(ruolo16);
        expect(aiTxt).toContain(ruolo17);
        expect(aiTxt).toContain(ruolo18);
        expect(aiTxt).toContain(ruolo19);
        expect(aiTxt).toContain(ruolo20);
        expect(aiTxt).toContain(ruolo21);
        expect(aiTxt).toContain(ruolo22);
        expect(aiTxt).toContain(ruolo23);
        expect(aiTxt).toContain(ruolo24);
        expect(aiTxt).toContain(ruolo25);
        expect(aiTxt).toContain(ruolo26);
        expect(aiTxt).toContain(ruolo27);

        expect(aiTxt).toContain(corso1);
        expect(aiTxt).toContain(corso2);
        expect(aiTxt).toContain(corso3);
        expect(aiTxt).toContain(corso4);
        expect(aiTxt).toContain(corso5);
        expect(aiTxt).toContain(corso6);
        expect(aiTxt).toContain(corso7);
        expect(aiTxt).toContain(corso8);
        expect(aiTxt).toContain(corso9);
        expect(aiTxt).toContain(corso10);
        expect(aiTxt).toContain(corso11);
        expect(aiTxt).toContain(corso12);
        expect(aiTxt).toContain(corso13);
        expect(aiTxt).toContain(corso14);
        expect(aiTxt).toContain(corso15);
        expect(aiTxt).toContain(corso16);
        expect(aiTxt).toContain(corso17);
        expect(aiTxt).toContain(corso18);
        expect(aiTxt).toContain(corso19);
        expect(aiTxt).toContain(corso20);
        expect(aiTxt).toContain(corso21);
        expect(aiTxt).toContain(corso22);
        expect(aiTxt).toContain(corso23);
        expect(aiTxt).toContain(corso24);
        expect(aiTxt).toContain(corso25);
        expect(aiTxt).toContain(corso26);
        expect(aiTxt).toContain(corso27);
        expect(aiTxt).toContain(corso28);
        expect(aiTxt).toContain(corso29);
        expect(aiTxt).toContain(corso30);
        expect(aiTxt).toContain(corso31);
        expect(aiTxt).toContain(corso32);
        expect(aiTxt).toContain(corso33);
        expect(aiTxt).toContain(corso34);
        expect(aiTxt).toContain(corso35);
        expect(aiTxt).toContain(corso36);
        expect(aiTxt).toContain(corso37);
        expect(aiTxt).toContain(corso38);
        expect(aiTxt).toContain(corso39);
        expect(aiTxt).toContain(corso40);
        expect(aiTxt).toContain(corso41);
        expect(aiTxt).toContain(corso42);
        expect(aiTxt).toContain(corso43);
        expect(aiTxt).toContain(corso44);
        expect(aiTxt).toContain(corso45);
        expect(aiTxt).toContain(corso46);
        expect(aiTxt).toContain(corso47);
        expect(aiTxt).toContain(corso48);
        expect(aiTxt).toContain(corso49);
        expect(aiTxt).toContain(corso50);
        expect(aiTxt).toContain(corso51);
        expect(aiTxt).toContain(corso52);
        expect(aiTxt).toContain(corso53);
        expect(aiTxt).toContain(corso54);
        expect(aiTxt).toContain(corso55);
        expect(aiTxt).toContain(corso56);
        expect(aiTxt).toContain(corso57);
        expect(aiTxt).toContain(corso58);
        expect(aiTxt).toContain(corso59);
        expect(aiTxt).toContain(corso60);
        expect(aiTxt).toContain(corso61);
        expect(aiTxt).toContain(corso62);
        expect(aiTxt).toContain(corso63);
        expect(aiTxt).toContain(corso64);
        expect(aiTxt).toContain(corso65);
        expect(aiTxt).toContain(corso66);
        expect(aiTxt).toContain(corso67);
        expect(aiTxt).toContain(corso68);
        expect(aiTxt).toContain(corso69);
        expect(aiTxt).toContain(corso70);
        expect(aiTxt).toContain(corso71);
        expect(aiTxt).toContain(corso72);
        expect(aiTxt).toContain(corso73);
        expect(aiTxt).toContain(corso74);
        expect(aiTxt).toContain(corso75);
        expect(aiTxt).toContain(corso76);
        expect(aiTxt).toContain(corso77);
        expect(aiTxt).toContain(corso78);
        expect(aiTxt).toContain(corso79);
        expect(aiTxt).toContain(corso80);
        expect(aiTxt).toContain(corso81);
        expect(aiTxt).toContain(corso82);
        expect(aiTxt).toContain(corso83);
        expect(aiTxt).toContain(corso84);
        expect(aiTxt).toContain(corso85);
        expect(aiTxt).toContain(corso86);
        expect(aiTxt).toContain(corso87);
        expect(aiTxt).toContain(corso88);
        expect(aiTxt).toContain(corso89);
        expect(aiTxt).toContain(corso90);
        expect(aiTxt).toContain(corso91);
        expect(aiTxt).toContain(corso92);
        expect(aiTxt).toContain(corso93);
        expect(aiTxt).toContain(corso94);
        expect(aiTxt).toContain(corso95);
        expect(aiTxt).toContain(corso96);
        expect(aiTxt).toContain(corso97);
        expect(aiTxt).toContain(corso98);
        expect(aiTxt).toContain(corso99);
        expect(aiTxt).toContain(corso100);
        expect(aiTxt).toContain(corso101);
        expect(aiTxt).toContain(corso102);
        expect(aiTxt).toContain(corso103);
        expect(aiTxt).toContain(corso104);
        expect(aiTxt).toContain(corso105);
        expect(aiTxt).toContain(corso106);
        expect(aiTxt).toContain(corso107);
        expect(aiTxt).toContain(corso108);
        expect(aiTxt).toContain(corso109);
        expect(aiTxt).toContain(corso110);
        expect(aiTxt).toContain(corso111);
        expect(aiTxt).toContain(corso112);
        expect(aiTxt).toContain(corso113);
        expect(aiTxt).toContain(corso114);
        expect(aiTxt).toContain(corso115);
        expect(aiTxt).toContain(corso116);
        expect(aiTxt).toContain(corso117);
        expect(aiTxt).toContain(corso118);
        expect(aiTxt).toContain(corso119);
        expect(aiTxt).toContain(corso120);
        expect(aiTxt).toContain(corso121);
        expect(aiTxt).toContain(corso122);
        expect(aiTxt).toContain(corso123);
        expect(aiTxt).toContain(corso124);
        expect(aiTxt).toContain(corso125);
        expect(aiTxt).toContain(corso126);
        expect(aiTxt).toContain(corso127);
        expect(aiTxt).toContain(corso128);
        expect(aiTxt).toContain(corso129);
        expect(aiTxt).toContain(corso130);
        expect(aiTxt).toContain(corso131);
        expect(aiTxt).toContain(corso132);
        expect(aiTxt).toContain(corso133);
        expect(aiTxt).toContain(corso134);
        expect(aiTxt).toContain(corso135);
        expect(aiTxt).toContain(corso136);
        expect(aiTxt).toContain(corso137);
        expect(aiTxt).toContain(corso138);
        expect(aiTxt).toContain(corso139);
        expect(aiTxt).toContain(corso140);
        expect(aiTxt).toContain(corso141);
        expect(aiTxt).toContain(corso142);
        expect(aiTxt).toContain(corso143);
        expect(aiTxt).toContain(corso144);
        expect(aiTxt).toContain(corso145);
    })
});

/*TEST SPECIFICI*/
test('mail scrivendo nome cognome - Roberto Passerone', () => {
    var azioni = [];
    azioni[0] = 'mail';

    var nome = "Roberto"
    var cognome = "Passerone"
    var mail = "roberto.passerone@unitn.it"

    return find('Roberto', 'Passerone', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(mail);
    })
});

test('mail scrivendo nome - Fabio', () => {
    var azioni = [];
    azioni[0] = 'mail';

    var nome1 = "Fabio"
    var cognome1 = "Casati"
    var mail1 = "fabio.casati@unitn.it"

    var nome2 = "Fabio"
    var cognome2 = "Massacci"
    var mail2 = "fabio.massacci@unitn.it"

    return find('Fabio', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome1);
        expect(aiTxt).toContain(cognome1);
        expect(aiTxt).toContain(mail1);
        expect(aiTxt).toContain(nome2);
        expect(aiTxt).toContain(cognome2);
        expect(aiTxt).toContain(mail2);
    })
});

test('mail scrivendo cognome - Battiti', () => {
    var azioni = [];
    azioni[0] = 'mail';

    var nome = "Roberto"
    var cognome = "Battiti"
    var mail = "roberto.battiti@unitn.it"

    return find('', 'Battiti', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(mail);
    })
});

test('telefono scrivendo nome cognome  - Giuseppe Riccardi', () => {
    var azioni = [];
    azioni[0] = 'telefono';

    var nome = "Giuseppe"
    var cognome = "Riccardi"
    var telefono = "+390461282087"

    return find('Giuseppe', 'Riccardi', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(telefono);
    })
});

test('telefono scrivendo cognome - Rocca', () => {
    var azioni = [];
    azioni[0] = 'telefono';

    var nome = "Paolo"
    var cognome = "Rocca"
    var telefono = "+390461283998"

    return find('', 'Rocca', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(telefono);
    })
});

test('telefono scrivendo cognome - Paolo', () => {
    var azioni = [];
    azioni[0] = 'telefono';

    var nome1 = "Paolo"
    var cognome1 = "Rocca"
    var telefono1 = "+390461283998"

    var nome2 = "Paolo"
    var cognome2 = "Bouquet"
    var telefono2 = "+390461282088"

    var nome3 = "Paolo"
    var cognome3 = "Giorgini"
    var telefono3 = "+390461282052"

    return find('Paolo', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome1);
        expect(aiTxt).toContain(cognome1);
        expect(aiTxt).toContain(telefono1);
        expect(aiTxt).toContain(nome2);
        expect(aiTxt).toContain(cognome2);
        expect(aiTxt).toContain(telefono2);
        expect(aiTxt).toContain(nome3);
        expect(aiTxt).toContain(cognome3);
        expect(aiTxt).toContain(telefono3);
    })
});


test('ufficio scrivendo nome cognome  - Yannis Velegrakis', () => {
    var azioni = [];
    azioni[0] = 'ufficio';

    var nome = "Yannis"
    var cognome = "Velegrakis"
    var polo = "Povo 2"
    var ufficio = "Ufficio 112"
    var image = "/images/povo2/112.jpg"

    return find('Yannis', 'Velegrakis', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
    })
});

test('ufficio scrivendo cognome  - Palopoli', () => {
    var azioni = [];
    azioni[0] = 'ufficio';

    var nome = "Luigi"
    var cognome = "Palopoli"
    var polo = "Povo 2"
    var ufficio = "Ufficio 184"
    var image = "/images/povo2/184.jpg"

    return find('', 'Palopoli', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
    })
});


test('ufficio scrivendo nome  - Roberto', () => {
    var azioni = [];
    azioni[0] = 'ufficio';

    var nome1 = "Roberto"
    var cognome1 = "Sebastiani"
    var polo1 = "Povo 2"
    var ufficio1 = "Ufficio 189"
    var image1 = "/images/povo2/189.jpg"

    var nome2 = "Roberto"
    var cognome2 = "Battiti"
    var polo2 = "Povo 1"
    var ufficio2 = "Ufficio 223"
    var image2 = "/images/povo1/223.jpg"

    var nome3 = "Roberto"
    var cognome3 = "Passerone"
    var polo3 = "Povo 2"
    var ufficio3 = "Ufficio 113"
    var image3 = "/images/povo2/113.jpg"

    return find('Roberto', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome1);
        expect(aiTxt).toContain(cognome1);
        expect(aiTxt).toContain(polo1);
        expect(aiTxt).toContain(ufficio1);
        expect(aiTxt).toContain(image1);
        expect(aiTxt).toContain(nome2);
        expect(aiTxt).toContain(cognome2);
        expect(aiTxt).toContain(polo2);
        expect(aiTxt).toContain(ufficio2);
        expect(aiTxt).toContain(image2);
        expect(aiTxt).toContain(nome3);
        expect(aiTxt).toContain(cognome3);
        expect(aiTxt).toContain(polo3);
        expect(aiTxt).toContain(ufficio3);
        expect(aiTxt).toContain(image3);
    })
});


test('ruoli scrivendo nome cognome  - Paolo Rocca', () => {
    var azioni = [];
    azioni[0] = 'ruoli';

    var nome = "Paolo"
    var cognome = "Rocca"
    var ruolo1 = "Responsabile CdS Ingegneria dell'Informazione e delle Comunicazioni"
    var ruolo2 = "Delegato per l'orientamento"

    return find('Paolo', 'Rocca', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(ruolo2);
    })
});


test('ruoli scrivendo cognome - Donelli', () => {
    var azioni = [];
    azioni[0] = 'ruoli';

    var nome = "Massimo"
    var cognome = "Donelli"
    var ruolo = "Delegato piani di studio Area Ingeneria"

    return find('', 'Donelli', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(ruolo);
    })
});

test('ruoli scrivendo nome - Paolo', () => {
    var azioni = [];
    azioni[0] = 'ruoli';

    var nome1 = "Paolo"
    var cognome1 = "Rocca"
    var ruolo1 = "Responsabile CdS Ingegneria dell'Informazione e delle Comunicazioni"
    var ruolo12 = "Delegato per l'orientamento"

    var nome2 = "Paolo"
    var cognome2 = "Bouquet"
    var ruolo2 = "Delegato per lo sport"
    var ruolo21 = "Presidente - Commissione sport"

    var nome3 = "Paolo"
    var cognome3 = "Giorgini"
    var ruolo3 = "Coordinatore - corso di dottorato - Informatica e telecomunicazioni"

    return find('Paolo', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome1);
        expect(aiTxt).toContain(cognome1);
        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(ruolo1);
        expect(aiTxt).toContain(nome2);
        expect(aiTxt).toContain(cognome2);
        expect(aiTxt).toContain(ruolo2);
        expect(aiTxt).toContain(ruolo21);
        expect(aiTxt).toContain(nome3);
        expect(aiTxt).toContain(cognome3);
        expect(aiTxt).toContain(ruolo3);
    })
});

test('ruoli scrivendo nome e cognome | caso non ricopre ruoli - Leonardo Maccari', () => {
    var azioni = [];
    azioni[0] = 'ruoli';

    var nome = "Leonardo"
    var cognome = "Maccari"
    var corso1 = "Non ricopre ruoli"

    return find('', cognome, '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(corso1);
    })
});

test('corsi scrivendo nome cognome  - Claudio Sacchi', () => {
    var azioni = [];
    azioni[0] = 'corsi';

    var nome = "Claudio"
    var cognome = "Sacchi"
    var corso1 = "Communication systems"
    var corso2 = "Design of networs and communication systems"
    var corso3 = "Progettazione di reti e sistemi di comunicazione"
    var corso4 = "Teoria dei segnali"

    return find('Claudio', 'Sacchi', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(corso1);
        expect(aiTxt).toContain(corso2);
        expect(aiTxt).toContain(corso3);
        expect(aiTxt).toContain(corso4);

    })
});


test('corsi scrivendo cognome - Picco', () => {
    var azioni = [];
    azioni[0] = 'corsi';

    var nome = "Gian Pietro"
    var cognome = "Picco"
    var corso1 = "Distributed system 1"
    var corso2 = "Laboratory of wireless sensor networks"
    var corso3 = "Linguaggi di programmazione"

    return find('', 'Picco', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(corso1);
        expect(aiTxt).toContain(corso2);
        expect(aiTxt).toContain(corso3);
    })
});

test('corsi scrivendo nome - Mauro', () => {
    var azioni = [];
    azioni[0] = 'corsi';

    var nome = "Mauro"
    var cognome = "Brunato"
    var corso1 = "Algoritmi avanzati"
    var corso2 = "Machine learning for data science"
    var corso3 = "Reti avanzate"
    var corso4 = "Reti avanzate e sicurezza"
    var corso5 = "Sicurezza dei dati"

    return find('Mauro', '', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(corso1);
        expect(aiTxt).toContain(corso2);
        expect(aiTxt).toContain(corso3);
        expect(aiTxt).toContain(corso4);
        expect(aiTxt).toContain(corso5);

    })
});

test('corsi scrivendo nome e cognome | caso non tiene corsi - Leonardo Maccari', () => {
    var azioni = [];
    azioni[0] = 'corsi';

    var nome = "Leonardo"
    var cognome = "Maccari"
    var corso1 = "Non tiene corsi"

    return find('', cognome, '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(corso1);
    })
});

test('check nome e cognome | nessun ufficio - Leonardo Maccari', () => {
    var azioni = [];
    azioni[0] = '';

    var nome = "Leonardo"
    var cognome = "Maccari"
    var numero = "+390461285323"
    var mail = "leonardo.maccari@unitn.it"
    var dipartimento = "DISI"
    var corso = "Non tiene corsi"
    var ruolo = "Non ricopre ruoli"

    return find('Leonardo', 'Maccari', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(corso);
        expect(aiTxt).toContain(ruolo);

    })
});

test('ufficio scrivendo nome | nessun ufficio - Leonardo Maccari', () => {
    var azioni = [];
    azioni[0] = 'ufficio';

    var nome = "Leonardo"
    var cognome = "Maccari"
    var ufficio = "non ha un ufficio"

    return find('Leonardo', 'Maccari', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(ufficio);

    })
});

afterAll(() => {
    return mongoose.connection.close();
});
