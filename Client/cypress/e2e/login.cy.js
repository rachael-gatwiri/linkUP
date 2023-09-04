describe('The  visit link works', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/Client/index.html')
  })
})

describe(' All links and buttons are clickable', () => {
  it('links and buttons are clickable', () => {
    cy.visit('http://127.0.0.1:5500/Client/index.html')
    cy.get('#signupButton').click()
    cy.get('#forgotPwdLink').click()
    cy.visit('http://127.0.0.1:5500/Client/index.html')
    cy.get('#registerLink').click()
  })
})

describe('It is redirecting you to the right pages', () => {
  it('Should redirect you to homepage', () => {
    cy.visit('http://127.0.0.1:5500/Client/index.html')
    cy.get('#signupButton').click()
    cy.url().should('include', '/home.html')
  })
  it('Should redirect you to the signup page', () => {
   cy.visit('http://127.0.0.1:5500/Client/index.html')
   cy.get('#registerLink').click()
   cy.url().should('include', '/signup.html')
  })
   it('Should redirect you to the forgot password page', () => {
     cy.visit('http://127.0.0.1:5500/Client/index.html')
     cy.get('#forgotPwdLink').click()
     cy.url().should('include', '/forgotPwd.html')
   })
 })

describe('Testing if inputs works appropriately', () => {
  it('Should show an error if all fields are empty', () => {
    cy.visit('http://127.0.0.1:5500/Client/index.html')
    cy.get('#signupButton').click()
    cy.get('#errorMessage').should('be.visible')
  })
  it('Should show an error if password field is empty', () => {
    cy.visit('http://127.0.0.1:5500/Client/index.html')
    cy.get('#email').type('test@gmail.com')
    cy.get('#signupButton').click()
    cy.get('#errorMessage').should('be.visible')
  })
  it('Should show an error if email field is empty', () => {
    cy.visit('http://127.0.0.1:5500/Client/index.html')
    cy.get('#password').type('test')
    cy.get('#signupButton').click()
    cy.get('#errorMessage').should('be.visible')
  })
})

  describe('Credentials must be in the right format', () => {
    it('Should show an error if email is in the wrong format', () => {
      cy.visit('http://127.0.0.1:5500/Client/index.html')
      cy.get('#email').type('test')
      cy.get('#password').type('test')
      cy.get('#signupButton').click()
      cy.get('#errorMessage').should('be.visible')
    })

  })

  

