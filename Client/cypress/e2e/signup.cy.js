describe('Signup Page Tests', () => {
    it('Should submit the form with valid information', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/signup.html');
      cy.get('#name').type('John Doe');
      cy.get('#username').type('johnd123');
      cy.get('#email').type('johnd@example.com');
      cy.get('#password').type('ValidPassword123@');
      cy.get('form').submit();
      cy.url().should('include', '/Client/htmlFiles/login.html');
    });
  
    it('Should display an error message for server errors during signup', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/signup.html');
      cy.get('#name').type('John Doe');
      cy.get('#username').type('johnd123');
      cy.get('#email').type('rachaeltems@example.com');
      cy.get('#password').type('InvalidPassword1.');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', 'Account creation failed! This email is already registered'); 
    });
  
    it('Should show password strength requirements', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/signup.html');
      cy.get('#password').type('Weak');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', 'Password must contain: number, special character (@#$%^&+.,=)');
    });
  
    it('Should display an error for empty required fields', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/signup.html');
      cy.get('#name').type('John Doe');
      cy.get('#username').type();
      cy.get('#email').type('johndoe@example.com');
      cy.get('#password').type('InvalidPassword.');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', 'All fields are required');
    });
  
    it('Should display an error for a username shorter than 4 characters', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/signup.html');
      cy.get('#name').type('John Doe');
      cy.get('#username').type('joh');
      cy.get('#email').type('johndoe@example.com');
      cy.get('#password').type('InvalidPassword');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', 'Username must be at least 4 characters');
    });

    it('Should display an error for a name with less than two name', () => {
      cy.visit('http://127.0.0.1:5501/Client/htmlFiles/signup.html');
      cy.get('#name').type('John');
      cy.get('#username').type('johndoe123');
      cy.get('#email').type('johndoe@example.com');
      cy.get('#password').type('InvalidPassword');
      cy.get('form').submit();
      cy.get('#errorMessage').should('contain', 'Please enter at least two names');
    })
  });
  