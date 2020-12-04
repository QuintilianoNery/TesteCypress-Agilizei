///  <reference types = "Cypress" />
//Importar metodos
import Logon from '../support/Pages/Logon';
import Register from '../support/Register';
import Profile from '../support/Pages/Profile';
import NewIncident from '../support/Pages/NewIncident';

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
        Profile.clicarNoBotaoSair;
    });

    //Teste cadastrar novo caso
    it('Poder cadastrar novos casos', () => {
        cy.login();
        Profile.clicarNoBotaoCadastrarNovosCasos;
        NewIncident.preenherCadastroDeCaso;
        NewIncident.validarCadastroDeCaso;   
    });

    //Teste excluir um caso
    it('Poder excluir um caso', () => {
        cy.createNewIncident();
        cy.login();


        //######## parei no ultimo teste 43:35


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
