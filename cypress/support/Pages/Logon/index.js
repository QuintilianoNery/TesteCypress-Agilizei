//Ações de interação com a página
        //ações
        //Acessar o login
        //preencher o login

        //Requerer o conteúdo da constante
const el =require('./elements').ELEMENTS;

class Logon{
acessarLogin(){
    cy.visit('http://localhost:3000/');
}

preencherLogin(){
    cy.get(el.id).type(Cypress.env('createdOngId'));
    cy.get(el.buttonEntrar).click();
}
}

export default new Logon();
