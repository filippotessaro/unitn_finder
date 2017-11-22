const index = require ('./index')
const find = require('./find');


test('check nome e cognome - Fabio Casati', () => {
    var string = "<b><button id='callInfo' href='#' onclick='clickForInfo(this.value)' value='Fabio Casati'>Fabio Casati</button></b></br> <a href=\"mailto:fabio.casati@unitn.it\">fabio.casati@unitn.it</a></br> +390461282044</br> Povo 1 - Ufficio 224</br><img id=\"myImg\" onclick=\"openPhoto(this.src)\" src=\"/images/povo1/224.jpg\"><div id=\"myModal\" class=\"modal\"><span onclick=\"closePhoto()\"class=\"close\">&times;</span><img class=\"modal-content\" id=\"img01\"><div id=\"caption\"></div></div></br></br>Ruoli:<ul class=\"ullist\"><li>Non ricopre ruoli</li></ul>Corsi:<ul class=\"ullist\"> <li>Ingegneria del software 2</li></ul>";
    var azioni = [];
    azioni[0] = '';
    
    return find('Fabio', 'Casati', '',azioni,'').then( (aiTxt) => {
        expect(aiTxt).toBe(string);
    })
    
    /*find("Fabio", "Casati").then(function(aiTxt){
        
        expect(aiTxt).toContain('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');
    }); */ 
    
    /*expect(find("Fabio", "Casati")).toContain('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');*/
    
    /*return find("Fabio", "Casati").then(function(aiTxt){
                                        
            expect(function(aiTxt)).toContain('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');
    });*/
    /*
    expect.find("Fabio","Casati");
    return expect(Persona.find("Fabio","Casati")).resolves.toEqual('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');
    */
    /*return expect(find("Fabio", "Casati").resolves.toEqual('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>'));*/
    
        /*it('works with promises', () => {
          expect.assertions(1);
          return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
        });
    
        it('works with resolves', () => {
          expect.assertions(1);
          return expect(user.getUserName(5)).resolves.toEqual('Paul');
        });*/
    
    
    
                                           
});