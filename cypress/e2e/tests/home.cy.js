describe('Home Page', () => {
    it('Should Load Home Page', () => {
        cy.visit('/');
        cy.contains('AutomationExercise').should('be.visible');
    });
});
