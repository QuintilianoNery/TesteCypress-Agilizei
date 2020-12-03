const el = require('./elements').ELEMENTS;

class Register {
    acessarCadastro(){
        cy.visit('http://localhost:3000/register')
    }
    
    preencherCadastro(){
        //campos do cadastro
        cy.get(el.nome).type('Cypress')
        cy.get(el.email).type('cypress@cy.com.br')
        cy.get(el.whatsapp).type('28999999999')
        cy.get(el.cidade).type('Castelo')
        cy.get(el.uf).type('ES')

        /* fazer uma acerção
        Fazer uma acerção na requisição de cadastro POST  e garantir que sempre  vai retornar um 200
        routing - Escutar onde a aplicação está se conexão está se conectando 
        routing
        start server com cy.server()
        criar uma rota com cy.route()
        atribuir a rota para um alias
        esperar com cy.wit e fazer uma validação
        Para monitorar, devemos passar o Cy.server e o CY.route antes da ação de clique de cadastro,  pois após o clique não é possível monitorar.*/
        cy.route('POST', '**/ongs').as('postOng');
        cy.get(el.submit).click()
    }

    validarCadastroDeOngComSucesso(){
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null;

        })
    }

}

export default new Register();