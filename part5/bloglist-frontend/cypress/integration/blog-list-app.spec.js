describe('blog-list app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit('http://localhost:3000');
  });
  it('Login form is shown', function() {
    cy.contains('login to application');
  });
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('[data-testid=username]').type('mluukkai');
      cy.get('[data-testid=password]').type('salainen');
      cy.get('[data-testid=submit]').click();
      cy.contains('Matti Luukkainen is logged in');
    });

    it('fails with wrong credentials', function() {
      cy.get('[data-testid=username]').type('mluukkai');
      cy.get('[data-testid=password]').type('wrong');
      cy.get('[data-testid=submit]').click();
      cy.get('[data-testid=error]').should('contain', 'Wrong username or password').and('have.css', 'border-color', 'rgb(255, 0, 0)');
    });
    describe('when logged in', function() {
      beforeEach(function() {
        cy.login({
          username: 'mluukkai', password: 'salainen'
        });
      });
      it.only('A blog can be created', function() {
        cy.contains('create new blog').click();
        cy.get('[data-testid=title]').type('cypress');
        cy.get('[data-testid=author]').type('cypress');
        cy.get('[data-testid=url]').type('cypress');
        cy.get('[data-testid=new-blog-form-submit]').click();

        cy.get('[data-testid=success]').should('contain', 'a new blog cypress by cypress').and('have.css', 'border-color', 'rgb(0, 128, 0)');

      });
    });
  });
});