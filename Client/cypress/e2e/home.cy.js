describe('Home Page Tests', () => {
    it('should display the Home Page with correct title and elements', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#homeLink').should('contain', 'Home');
        cy.get('#addpostLink').should('contain', 'Add Post');
        cy.get('#profileLink').should('contain', 'Profile');
        cy.get('#logOutLink').should('contain', 'Logout');
        cy.get('#userProfileImg').should('be.visible');
        cy.get('#userProfileName').should('be.visible');
        cy.get('#userProfileusername').should('be.visible');
        cy.get('#postDiv').should('exist');
    });

    it('should navigate to Add Post and Profile pages', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#addpostLink').click();
        cy.url().should('include', '/htmlFiles/addpost.html');
        cy.go('back');
        cy.get('#profileLink').click();
        cy.url().should('include', '/htmlFiles/userProfile.html');
        //navigate to other users profile
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
        cy.get('.post-content').first().as('post'); 
        cy.get('@post').find('.comment-input').type('This is a test comment{enter}');
        cy.get('@post').find('.comment').should('contain', 'This is a test comment');
        cy.get('@post').find('#postComment').click();
        cy.get('#successMessage').should('contain', 'Comment added successfully');
        cy.get('@post').find('.comment-count').should('contain', '1 comment');
    })

    it('shhould allow user to vie all comments on a post', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('.post-content').first().as('post');
        cy.get('@post').find('.view-comments').click();
        cy.url().should('include', '/htmlFiles/comments.html');
    })

    it('should allow users to like and unlike a post', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('.post-content').first().as('post');
        cy.get('@post').find('.like-button').click();
        cy.get('@post').find('.like-count').should('contain', '1 like');
        cy.get('@post').find('.like-button').should('have.class', 'liked');
        cy.get('@post').find('.like-button').click();
        cy.get('@post').find('.like-count').should('not.contain', '1 like');
        cy.get('@post').find('.like-button').should('not.have.class', 'liked');
    });

    it('should allow user to follow and unfolow another user', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#userProfileImg').first().click();
        cy.get('#followButton').click();
        cy.get('#successMessage').should('contain', 'User followed successfully');
        cy.get('#followButton').should('contain', 'Unfollow');
        cy.get('#followButton').click();
        cy.get('#successMessage').should('contain', 'User unfollowed successfully');
        cy.get('#followButton').should('contain', 'Follow');
    })

    it('should allow users to search for a post', () => {
        cy.visit('http://127.0.0.1:5501/Client/htmlFiles/home.html');
        cy.get('#searchInput').type('This is a test post{enter}');
        cy.get('#searchResults').should('contain', 'Updated');
    })
});
