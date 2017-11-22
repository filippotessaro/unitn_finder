const index = require ('./index')
const find = require('./find');


test('check nome e cognome - Fabio Casati', () => {
    var azioni = [];
    azioni[0] = '';
        
    var nome = "Fabio";
    var cognome = "Casati"
    var numero = "+390461282044"
    var mail = "fabio.casati@unitn.it"
    var polo = "Povo 1"
    var ufficio = "Ufficio 224"
    var image = "/images/povo1/224.jpg"
    //var dipartimento = "DISI"
    var ruoli = "Non ricopre ruoli"
    var corsi = "Ingegneria del software 2"
    
    return find('Fabio', 'Casati', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toContain(nome);
        expect(aiTxt).toContain(cognome);
        expect(aiTxt).toContain(numero);
        expect(aiTxt).toContain(mail);
        expect(aiTxt).toContain(polo);
        expect(aiTxt).toContain(ufficio);
        expect(aiTxt).toContain(image);
        //expect(aiTxt).toContain(dipartimento);
        expect(aiTxt).toContain(ruoli);
        expect(aiTxt).toContain(corsi);
    })                               
});