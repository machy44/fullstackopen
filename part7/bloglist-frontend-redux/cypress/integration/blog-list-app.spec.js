describe('blog-list app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.createUser();
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
      it('A blog can be created', function() {
        cy.contains('create new blog').click();
        cy.get('[data-testid=title]').type('cypress');
        cy.get('[data-testid=author]').type('cypress');
        cy.get('[data-testid=url]').type('cypress');
        cy.get('[data-testid=new-blog-form-submit]').click();

        cy.get('[data-testid=success]').should('contain', 'a new blog cypress by cypress')
          .and('have.css', 'border-color', 'rgb(0, 128, 0)');
      });
      describe.only('several blogs exist', function() {
        beforeEach(function() {
          cy.login({
            username: 'mluukkai', password: 'salainen'
          });
          cy.createBlog({
            title: 'first blog',
            author: 'first author',
            url:'first blog url'
          });
          cy.createBlog({
            title: 'second blog',
            author: 'second author',
            url:'second blog url'
          });
          cy.createBlog({
            title: 'third blog',
            author: 'third author',
            url:'third blog url'
          });
          cy.get('[data-testid=blog-main-info]').parent().eq(0).as('firstBlog');
          cy.get('[data-testid=toggle-visibility-button]').eq(0).as('firstBlogButton');
          cy.get('[data-testid=blog-main-info]').parent().eq(1).as('secondBlog');
          cy.get('[data-testid=toggle-visibility-button]').eq(1).as('secondBlogButton');
          cy.get('[data-testid=blog-main-info]').parent().eq(2).as('thirdBlog');
          cy.get('[data-testid=toggle-visibility-button]').eq(2).as('thirdBlogButton');

        });
        it('should like a blog', function () {
          cy.get('@firstBlogButton').click();
          cy.contains('likes 0');
          cy.get('[data-testid=blog-likes]').find('button').click();
          cy.contains('likes 1');
        });
        it('should delete a blog', function () {
          cy.get('[data-testid=blog-main-info]').should('have.length', 3);
          cy.get('@firstBlogButton').click();
          cy.get('[data-testid=remove-button]').should('be.visible');
          cy.get('[data-testid=remove-button]').click();
          cy.get('[data-testid=blog-main-info]').should('have.length', 2);
        });
        it('other users cannot delete the blog', function() {
          cy.logout();
          cy.createSecondaryUser();
          cy.login({
            username: 'test', password: 'test'
          });
          cy.get('@firstBlogButton').click();
          cy.get('[data-testid=remove-button]').should('not.exist');
        });
        it.only('blogs should be ordered by number of likes', function () {
          cy.get('@firstBlogButton').click();
          cy.get('[data-testid=blog-likes]').find('button').as('firstBlogLikeButton');
          cy.get('@firstBlogLikeButton').click();
          cy.wait(500);
          cy.get('@firstBlogLikeButton').click();
          cy.wait(500);
          cy.get('@firstBlogLikeButton').click();
          cy.get('@secondBlogButton').click();
          cy.get('@secondBlog').find('[data-testid=blog-likes]').find('button').as('secondBlogLikeButton');
          cy.get('@secondBlogLikeButton').click();
          cy.wait(500);
          cy.get('@secondBlogLikeButton').click();
          cy.wait(500);
          cy.get('@secondBlogLikeButton').click();
          cy.wait(500);
          cy.get('@secondBlogLikeButton').click();
          cy.get('[data-testid=blog-main-info]').then(elements => {
            cy.wrap(elements[0]).contains('second blog');
            cy.wrap(elements[1]).contains('first blog');
            cy.wrap(elements[2]).contains('third blog');
          });
        });
      });
    });
  });
});