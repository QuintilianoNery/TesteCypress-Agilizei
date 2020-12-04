const el =require('./elements').ELEMENTS;

class Profile{
    clicarNoBotaoSair(){
    cy.get(el.buttonSair).click();
    }

    clicarNoBotaoCadastrarNovosCasos(){
        cy.get(el.buttonNewIncident).click();

    }
}

export default new Profile();