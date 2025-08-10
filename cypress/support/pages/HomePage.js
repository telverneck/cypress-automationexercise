import selectors from '../selectors/homeSelectors';

class HomePage {
    elements = {
        logo: () => cy.get(selectors.logo),
        signupLoginBtn: () => cy.get(selectors.signupLoginBtn)
    }
    visit() {
        cy.visit('/');
    }

    getLogo() {
        return this.elements.logo();
    }

    clickSignupLogin() {
        this.elements.signupLoginBtn().click();
    }
}

export default new HomePage();
