const index = require ('./index')
const find = require('./find');


test('check nome e cognome', () =>{
    
    find("Fabio", "Casati").then(function(aiTxt){
        
        expect(aiTxt).toContain('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');
    });  
    
});