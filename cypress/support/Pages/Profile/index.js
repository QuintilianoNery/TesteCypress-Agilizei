const el =require('./elements').ELEMENTS;

class Profile{
    clicarNoBotaoSair(){
    cy.get(el.buttonSair).click();
    }

    clicarNoBotaoCadastrarNovosCasos(){
        cy.get(el.buttonNewIncident).click();

    }

    clicarBotaoExcluirCaso(){
        cy.route('DELETE', '**/incidents/*').as('deleteIncidents');
        cy.get(el.buttonDeletarCaso).click();
    }

    validarExclusaoCasoComSucesso(){
        cy.wait('@deleteIncidents').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        });
    }
}

export default new Profile();