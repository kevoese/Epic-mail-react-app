/* eslint-disable no-undef */
describe('Test Epic mail Landing Page', () => {
  after(() => {
    cy.clearCookies();
  });
  it('should open sign up modal', () => {
    cy.visit('/');
    cy.get('button')
      .contains('Joingfji')
      .click();
    // cy.get('input[type=email]').type('patron.user@gmail.com');
    // cy.get('input[type=password]').type('password');
    // cy.get('button')
    //     .contains('Sign in')
    //     .click()
    //     .should('be.disabled');
    // cy.get('div')
    //     .contains('Borrowed Books')
    //     .click();
    // cy.url().should('include', '/borrowed');
  });
});
