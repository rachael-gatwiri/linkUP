describe('Login Page Tests', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5501/Client/index.html')
  })

  it('Should show an error if email is in the wrong format', () => {
    cy.visit('http://127.0.0.1:5501/Client/index.html')
    cy.get('#email').type('test')
    cy.get('#password').type('test')
    cy.get('#signupButton').click()
    cy.get('#errorMessage').should('be.visible')
  })

it('Should submit the form with valid credentials', () => {
    cy.visit('http://127.0.0.1:5501/Client/index.html');
    cy.get('#email').type('rachaeltems@gmail.com');
    cy.get('#password').type('Testing12345678.');
    cy.get('#signupButton').click();
})

it('Should store user ID in local storage after login', () => {
  cy.visit('http://127.0.0.1:5501/Client/index.html');
  cy.get('#email').type('validemail@example.com');
  cy.get('#password').type('validpassword');
  cy.get('#signupButton').click();
  // cy.window().its('localStorage.userId').should('not.be.empty');
});

it('Should display an error message for server errors', () => {
  cy.visit('http://127.0.0.1:5501/Client/index.html');
  cy.get('#email').type('validemail@example.com');
  cy.get('#password').type('invalidpassword'); 
  cy.get('#signupButton').click();
  cy.get('#errorMessage').should('contain', 'This email is not registered');
});

it('Should show an error if all fields are empty', () => {
  cy.visit('http://127.0.0.1:5501/Client/index.html')
  cy.get('#signupButton').click()
  cy.get('#errorMessage').should('be.visible')
})

it('Should show an error if password field is empty', () => {
  cy.visit('http://127.0.0.1:5501/Client/index.html')
  cy.get('#email').type('test@gmail.com')
  cy.get('#signupButton').click()
  cy.get('#errorMessage').should('be.visible')
})

it('Should show an error if email field is empty', () => {
  cy.visit('http://127.0.0.1:5501/Client/index.html')
  cy.get('#password').type('test')
  cy.get('#signupButton').click()
  cy.get('#errorMessage').should('be.visible')
})


it('Should redirect you to the signup page', () => {
 cy.visit('http://127.0.0.1:5501/Client/index.html')
 cy.get('#registerLink').click()
 cy.url().should('include', '/signup.html')
})

 it('Should redirect you to the forgot password page', () => {
   cy.visit('http://127.0.0.1:5501/Client/index.html')
   cy.get('#forgotPwdLink').click()
   cy.url().should('include', '/forgotPwd.html')
 })

 it('Should navigate to the forgot password page', () => {
  cy.visit('http://127.0.0.1:5501/Client/index.html');
  cy.get('#forgotPwdLink').click();
  cy.url().should('include', '/forgotPwd.html');
});

it('links and buttons are clickable', () => {
  cy.visit('http://127.0.0.1:5501/Client/index.html')
  cy.get('#signupButton').click()
  cy.get('#forgotPwdLink').click()
  cy.visit('http://127.0.0.1:5501/Client/index.html')
  cy.get('#registerLink').click()
})
})






  
  
  

  

