describe('Forgot Password Page Tests', () => {
  
    it('Should display an error for an empty email field', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/forgotPwd.html');
      // cy.get('#email').type('');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', 'Email field is required');
    });
  
    it('Should display an error for an invalid email format', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/forgotPwd.html');
      cy.get('#email').type('invalidemail@example');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', 'Please enter a valid email address');
    });
  
    it('Should display a success message for a valid email after submission', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/forgotPwd.html');
      cy.get('#email').type('lily@gmail.com');
      cy.get('form').submit();
      cy.get('#successMessage').should('contain', 'Email sent successfully'); 
    });
  
    it('Should have a link to create a new account', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/forgotPwd.html');
      cy.get('#createAccount').click();
      cy.url().should('include', '/Client/htmlFiles/signup.html');
    });
  
    it('Should redirect to the login page after clicking "Back to Login"', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/forgotPwd.html');
      cy.get('#backToLogin').click();
      cy.url().should('include', '/Client/index.html'); 
  });
});
  