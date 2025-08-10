import HomePage from '../../support/pages/HomePage';
import LoginPage from '../../support/pages/LoginPage';

describe('Login', () => {
    beforeEach(() => {
        cy.fixture('users').as('usersData');
    });

    it('Should login', function() {
        HomePage.visit();
        HomePage.clickSignupLogin();
        LoginPage.login(this.usersData.validUser.email, this.usersData.validUser.password);
        cy.contains('Logged in as').should('be.visible');
    });
    it('Should check wrong credentials error', function() {
        HomePage.visit();
        HomePage.clickSignupLogin();
        LoginPage.login(this.usersData.validUser.email + 'invalid', this.usersData.validUser.password + 'invalid');
        LoginPage.checkLoginError();

    });
});
