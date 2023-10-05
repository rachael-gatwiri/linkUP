describe('Reset Password Page Tests', () => {
    it('Should reset the password with valid input', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/resetPwd.html?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhY2hhZWx0ZW1zQGdtYWlsLmNvbSIsImlhdCI6MTY5NTE5MzcwMywiZXhwIjoxNjk1MjgwMTAzfQ.DVohY73WwGmpA3atEtPSCs_kwGXLf9d3__uR5IBTXas');
      cy.get('#password').type('NewValidPassword123@');
      cy.get('#re-password').type('NewValidPassword123@');
      cy.get('form').submit();
    });
  
    it('Should display an error for non-matching passwords', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/resetPwd.html?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhY2hhZWx0ZW1zQGdtYWlsLmNvbSIsImlhdCI6MTY5NTE5MzcwMywiZXhwIjoxNjk1MjgwMTAzfQ.DVohY73WwGmpA3atEtPSCs_kwGXLf9d3__uR5IBTXas');
      cy.get('#password').type('MismatchedPassword123@');
      cy.get('#re-password').type('MismatchedPassword456@');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', "Passwords don't match");
    });
  
    it('Should display an error for invalid password format', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/resetPwd.html?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhY2hhZWx0ZW1zQGdtYWlsLmNvbSIsImlhdCI6MTY5NTE5MzcwMywiZXhwIjoxNjk1MjgwMTAzfQ.DVohY73WwGmpA3atEtPSCs_kwGXLf9d3__uR5IBTXas');
      cy.get('#password').type('WeakPassword');
      cy.get('#re-password').type('WeakPassword');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', 'Password must contain:');
    });
  
    it('Should redirect to login page after successful password reset', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/resetPwd.html?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhY2hhZWx0ZW1zQGdtYWlsLmNvbSIsImlhdCI6MTY5NTE5MzcwMywiZXhwIjoxNjk1MjgwMTAzfQ.DVohY73WwGmpA3atEtPSCs_kwGXLf9d3__uR5IBTXas');
      cy.get('#password').type('NewValidPassword123@');
      cy.get('#re-password').type('NewValidPassword123@');
      cy.get('form').submit();
      cy.url().should('include', '/Client/index.html'); 
    });
  });
  