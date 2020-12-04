const el = require('./elements').ELEMENTS;

class NewIncident{
    preenherCadastroDeCaso(){
        cy.get(el.tituloCaso).type('Animal abandonado.');
        cy.get(el.descricao).type('Animal jogado na rua, precisa ser adotado.');
        cy.get(el.valorReais).type(100);
        //POST 200 /incidents  // TIRAR O S DO  newIncident
        cy.route('POST', '**/incidents').as('newIncident');
        cy.get(el.buttonCadastrar).click();
    }

    validarCadastroDeCaso(){
        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        });
    }

}

export default new NewIncident();