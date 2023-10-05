describe('Home Page Tests', () => {
   
    it('should navigate to Add Post and Profile pages', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#addpostLink').click();
        cy.url().should('include', '/htmlFiles/addpost.html');
        cy.go('back');
        cy.get('#profileLink').click();
        cy.url().should('include', '/htmlFiles/userProfile.html');
        cy.get('#userProfileImg').first().click();
        cy.url().should('include', '/htmlFiles/userProfile.html');
    });

    it('should log out when clicking Logout link', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#logOutLink').click();
        cy.url().should('include', '/htmlFiles/logout.html');
    });

    it('should allow users to add comments to a post and post them and add count', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#addComment').type('This is a test comment');
        cy.get('#postComment').click();
        cy.get('#commentCount').should('contain', '4');
        
    })

    it('should allow user to view all comments on a post', () => {
         cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
         cy.get('#viewAllCommentsLink').click();
    })

    it('should allow users to like and unlike a post', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#likeIcon').click();
        cy.get('#likeCount').should('contain', '3');
        cy.get('#likeIcon').click();
        cy.get('#likeIcon').should('not.contain', '3');
    });

    it('should allow user to follow and unfolow another user', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#followStatus').click();
        cy.get('#followStatus').click();
    })

    it('should allow users to search for a post', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#search-input').type('update');
    })
});
