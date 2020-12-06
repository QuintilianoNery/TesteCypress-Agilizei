// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'



//####17:39 - parei aula 4

/* 

import '@shelex/cypress-allure-plugin';
require('@shelex/cypress-allure-plugin'); 






// Alternatively you can use CommonJS syntax:
// require('./commands')

// ***********************************************************

//coisas para semre executadas antes de cada teste
beforeEach(() => {
        //cy.server - para route e request sempre obrigatório
        cy.server();
        //Esse comando personalizado foi criado no arquivo commands.js
        cy.createOng();
});

//npx cypress run --config video=false --env allure=true
//npx - baixa temp 
//cypress run  - executa os testes no modo hreadless / sem interface
//--config video=false - Não precisa salvar o vídeo
//--env allure=true - gerar relatório allure