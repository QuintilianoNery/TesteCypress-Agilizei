///  <reference types = "Cypress" />

describe('Ongs', ()=>{
    //it.skip é para pular o teste quando o mesmo está pronto
    it('Realizar um cadastro', ()=> {
        //cy.visit - visita uma página
        //cy.get - busca um elemento
        //cy.type - insere um texto
        
        //Aplicação usada
        //https://confident-kare-1f5021.netlify.app/   
        //login direto na página, pois teste não deve depender do outro    
        cy.visit('https://confident-kare-1f5021.netlify.app')

        //clicar não tenho cadastro
        cy.get('.back-link').click()

        //campos do cadastro
        cy.get('[placeholder="Nome da ONG"]').type('Cypress')
        cy.get('[type="email"]').type('cypress@cy.com.br')
        cy.get('[placeholder="Whatsapp"]').type('22222222222')
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

        //Sempre essa requisição de cadastro para retornar ID deve ser criada sempre antes fazer o login
        //Para garantir que o ID da ong vai ser criada antes de fazer outro teste, vamos colocar um comando before no /suporte/index.js
        //não preciso mais do coando comentado
        /* cy.request({
            method: 'POST',
            url: 'https://omnistack-be-the-hero.herokuapp.com/ongs',
            body: {
                city: "Irupi",
                email: "animais@mail.com",
                name: "Animais",
                uf: "ES",
                whatsapp: "2822222222"
            }
        }).then(response =>{
            expect(response.body.id).is.not.null;
            cy.log(response.body.id);
            
            //salvar a propriedade, que cria uma variavel de ambiente temporária 
            Cypress.env('createdOngId', response.body.id);
            
        });
 */

    it('Realizar login no sistema', () => {
        //Acessando a aplicação 
   /*      const createOngId = Cypress.env('createdOngId');
        cy.log(createOngId); */

        cy.visit('https://confident-kare-1f5021.netlify.app');
        cy.get('input').type(Cypress.env('createdOngId'));
        cy.get('.button').click();

        
    });

})

