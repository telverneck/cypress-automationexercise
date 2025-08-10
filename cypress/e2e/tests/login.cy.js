import HomePage from '../../support/pages/HomePage';
import LoginPage from '../../support/pages/LoginPage';

describe('Login', () => {
    beforeEach(() => {
        cy.fixture('users').as('usersData');
    });

    it('Deve realizar login com sucesso', function() {
        HomePage.visit();
        HomePage.clickSignupLogin();
        LoginPage.login(this.usersData.validUser.email, this.usersData.validUser.password);
        cy.contains('Logged in as').should('be.visible');
    });
    it('Deve exibir mensagem de erro ao tentar login com credenciais inválidas', function() {
        HomePage.visit();
        HomePage.clickSignupLogin();
        LoginPage.login(this.usersData.validUser.email + 'invalid', this.usersData.validUser.password + 'invalid');
        LoginPage.checkLoginError();

    });
});
