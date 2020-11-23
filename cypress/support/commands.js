// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


//Sempre essa requisição de cadastro para retornar ID deve ser criada sempre antes fazer o login
//Para garantir que o ID da ong vai ser criada antes de fazer outro teste, vamos colocar um comando before no /suporte/index.js
//não preciso mais do coando comentado
        
Cypress.Commands.add("createOng", () =>{
    cy.request({
        method: 'POST',
        url: 'http://localhost:3333/ongs',
        body: {
            city: "Irupi",
            email: "animais@mail.com",
            name: "Ong Hero",
            uf: "ES",
            whatsapp: "28999999999"
        }
    }).then(response =>{
        expect(response.body.id).is.not.null;
        cy.log(response.body.id);
        //salvar a propriedade, que cria uma variavel de ambiente temporária 
        Cypress.env('createdOngId', response.body.id);
    });
}) 

Cypress.Commands.add('createNewIncident', () =>{
    
    cy.request({
        method:'POST',
        url:'http://localhost:3333/incidents',
        headers: {'Authorization': '${ Cypress.env(createdOngId)}',},
        body: {
            title: "Animal Faminto",
            description: "Animal jogado na rua, precisa ser adotado.",
            value: "100"
        }

    }).then(response => {
        expect(response.body.id).is.not.null;
        cy.log(response.body.id);

        Cypress.env('createdIncidentId', response.body.id);
    })
})

Cypress.Commands.add('login',() => {
    //##Muito importante para usar no cadastro do Geoserviços que tem muitas páginas
    //Parâmetro para informar que antes da página carregar, quero que faça alguma coisa, nesse caso fazer o login antes
    //Foi setado o id da ong e o nome da ong por padrão, mas poderia ser um e-mail e senha, pois iria bem mais rápido
    cy.visit('http://localhost:3000/profile', {
        onBeforeLoad:(browser) => {
            browser.localStorage.setItem('ongId', Cypress.env('createdOngId'))
            browser.localStorage.setItem('ongName', 'Ong Hero');
        }
        });
})