//We simulate user input via the .type() method with { force: true },
//submits the form using .click({ force: true }), and validates expected DOM changes. 
//The test suite checks successful form submission, required field validation on empty input, 
//and validation triggering on blur events.



describe('Form Component Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should submit a new post when form is filled correctly', () => {
    cy.get('input').first().type('Test Title', { force: true });
    cy.get('input').eq(1).type('Test Note Content', { force: true });

    cy.get('button[type="submit"]').click({ force: true });

    cy.contains('Test Title').should('exist');
    cy.contains('Test Note Content').should('exist');
  });

  it('should show error message when inputs are empty', () => {
    cy.get('button[type="submit"]').click({ force: true });
    cy.contains('Write!').should('exist');
  });

  it('should validate input fields on blur', () => {
    cy.get('input').first().focus().blur();
    cy.get('input').eq(1).focus().blur();
    cy.contains('Write!').should('exist');
  });
});
