///  <reference types = "Cypress" />
//Aula 01

describe('Ongs', ()=>{
    //it.skip é para pular o teste quando o mesmo está pronto
    it('Realizar um cadastro', ()=> {
        //cy.visit - visita uma página
        //cy.get - busca um elemento
        //cy.type - insere um texto

        //Aplicação usada
        //https://confident-kare-1f5021.netlify.app/   
        //http://localhost:3000/
        //login direto na página, pois teste não deve depender do outro    
        cy.visit('http://localhost:3000/')

        //clicar não tenho cadastro
        cy.get('.back-link').click()

        //campos do cadastro
        cy.get('[placeholder="Nome da ONG"]').type('Cypress')
        cy.get('[type="email"]').type('cypress@cy.com.br')
        cy.get('[placeholder="WhatsApp"]').type('28999999999')
        cy.get('[placeholder="Cidade"]').type('Castelo')
        cy.get('[placeholder="UF"]').type('ES')


        //fazer uma acerção
        //Fazer uma acerção na requisição de cadastro POST  e garantir que sempre  vai retornar um 200
        //routing - Escutar onde a aplicação está se conexão está se conectando 

        //routing
        //start server com cy.server()
        //criar uma rota com cy.route()
        //atribuir a rota para um alias
        //esperar com cy.wit e fazer uma validação

        //Para monitorar, devemos passar o Cy.server e o CY.route antes da ação de clique de cadastro, pois após o clique não é possível monitorar.
        cy.route('POST', '**/ongs').as('postOng');

        //Clica no botão de cadastrar
        cy.get('.button').click()

        //utilizar a roque que foi salva para fazer uma acerção
        cy.wait('@postOng').then((xhr) => {
            expect(xhr.status).be.eq(200);
            expect(xhr.response.body).has.property('id')
            expect(xhr.response.body.id).is.not.null;

        })
    });

    //-----------------------------------------------------------------------------

        //Ver support/commands.js
    it('Realizar login no sistema', () => {
        //Acessando a aplicação 
   /*      const createOngId = Cypress.env('createdOngId');
        cy.log(createOngId); */

        cy.visit('http://localhost:3000/');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();


    });
    
    //-----------------------------------------------------------------------------
        
    //Aula 2
    //que ongs  podem fazer logout
    //que ongs  podem cadastrar novos casos
    //que ongs  podem excluir um caso
    //667e17ef
    
    it('Poder fazer logout', () => {
        //ver /support/commands.js
        cy.login();
        cy.get('button').click();
    });
  
    //-----------------------------------------------------------------------------

   //20:58


    it('Poder cadastrar novos casos', () => {
        cy.login();

        cy.get('.button').click();

        cy.get('[placeholder="Título do caso"]').type('Animal abandonado.');
        cy.get('textarea').type('Animal jogado na rua, precisa ser adotado.');
        cy.get('[placeholder="Valor em reais"]').type(100);
        
        //POST 200 /incidents  // TIRAR O S DO  newIncident
        cy.route('POST', '**/incidents').as('newIncident');
        
        cy.get('.button').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

    });

    //-----------------------------------------------------------------------------

    it('Poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();

        // delete 204 http://localhost:3333/incidents/71
        cy.route('DELETE', '**/incidents/*').as('deleteIncidents');

        cy.get('li > button > svg').click();

        cy.wait('@deleteIncidents').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    });

})