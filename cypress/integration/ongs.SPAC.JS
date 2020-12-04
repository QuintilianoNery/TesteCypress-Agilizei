///  <reference types = "Cypress" />
//Importar metodos
import Logon from '../support/Pages/Logon';
import Register from '../support/Register';

//Teste realizar cadastro de nova Ong
describe('Ongs', ()=>{
    //it.skip é para pular o teste quando o mesmo está pronto
    it('Realizar um cadastro', ()=> {
        Register.acessarCadastro();
        Register.preencherCadastro();
        Register.validarCadastroDeOngComSucesso();
    });

    //Teste realizar login
    it('Realizar login no sistema', () => {
        Logon.acessarLogin();
        Logon.preencherLogin();
    });

    //Teste realizar logout
    it('Poder fazer logout', () => {
        cy.login();
        cy.get('[data-cy=buttonSair]').click();
    });

    //Teste cadastrar novo caso
    it('Poder cadastrar novos casos', () => {
        cy.login();

        cy.get('[data-cy=buttonNovoCaso]').click();
        cy.get('[data-cy=tituloCaso]').type('Animal abandonado.');
        cy.get('[data-cy=descricao]').type('Animal jogado na rua, precisa ser adotado.');
        cy.get('[data-cy=valorReais]').type(100);

        //POST 200 /incidents  // TIRAR O S DO  newIncident
        cy.route('POST', '**/incidents').as('newIncident');
        
        cy.get('[data-cy=buttonCadastrar]').click();

        cy.wait('@newIncident').then((xhr) => {
            expect(xhr.status).to.eq(200);
            expect(xhr.response.body).has.property('id');
            expect(xhr.response.body.id).is.not.null;
        })

    });

    it('Poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();

        // delete 204 http://localhost:3333/incidents/71
        cy.route('DELETE', '**/incidents/*').as('deleteIncidents');

        cy.get('[data-cy=buttonDeletarCaso]').click();

        cy.wait('@deleteIncidents').then((xhr) => {
            expect(xhr.status).to.eq(204);
            expect(xhr.response.body).to.be.empty;
        })
    });

})

//Sempre que tiver acesso ao código fonte da aplicação, se possível adicionar, esta é uma boa prática
//data-cy="name"
//serve para identificar como uma chave especifica para o nome do campo, uma variável global para identificar o campo para o Cypres



//Aula 3 - Page Objects
//Pagina 
//  ações
//  elementos

//Teste de login
