import selectors from '../selectors/loginSelectors';

class LoginPage {
    elements = {
        loginError: () => cy.contains(selectors.loginErrorMessage),
        loginEmail: () => cy.get(selectors.loginEmail),
        loginPassword: () => cy.get(selectors.loginPassword),
        loginButton: () => cy.get(selectors.loginButton)
    }

    login(email, password) {
        this.elements.loginEmail().type(email);
        this.elements.loginPassword().type(password);
        this.elements.loginButton().click();
    }
    checkLoginError() {
        this.elements.loginError()
            .should('be.visible');
    }
}

export default new LoginPage();
