describe('Note app', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000');
  });
  it('front page can be opened', function() {
    cy.contains('Notes');
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2021');
  });
  it('login form can be opened', function() {
    cy.contains('log in').click();
    cy.get('#username').type('mluukkai');
    cy.get('#password').type('salainen');
    cy.get('#login-button').click();
    cy.contains('mluukkai logged-in');
  });
});