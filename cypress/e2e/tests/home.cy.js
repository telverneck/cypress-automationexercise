describe('Home Page', () => {
    it('Should Load Home Page', () => {
        cy.visit('/');
        cy.contains('Automation Exercise').should('be.visible');
    });
});
