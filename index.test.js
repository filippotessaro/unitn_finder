const index = require ('./index')
const find = require('./find');


it('check nome e cognome', () => {
    
    /*find("Fabio", "Casati").then(function(aiTxt){
        
        expect(aiTxt).toContain('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');
    }); */ 
    
    /*expect(find("Fabio", "Casati")).toContain('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');*/
    
    /*return find("Fabio", "Casati").then(function(aiTxt){
                                        
            expect(function(aiTxt)).toContain('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');
    });*/
    expect.find("Fabio","Casati");
    return expect(Persona.find("Fabio","Casati")).resolves.toEqual('Fabio Casati <a href="mailto:fabio.casati@unitn.it">fabio.casati@unitn.it</a> +390461282044 Povo 1 Ufficio: 224<div><img style="width: 150px; heigth: 250 px;" src="/images/povo1/224.jpg"></div></br></br>');
    
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