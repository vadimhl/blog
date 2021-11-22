describe('blog app 2', function(){
    beforeEach(function (){
        cy.request('POST', 'http://130.61.49.110:3001/api/testing/reset')

        const user = {
            username : 'root',
            name : 'Super user',
            password : 'qazwsx'
        }
        cy.request('POST', 'http://130.61.49.110:3001/api/users', user)
        
        const user2 = {
            username : 'user',
            name : 'Test user',
            password : '123456'
        }
        
        cy.request('POST', 'http://130.61.49.110:3001/api/users', user2)        
        cy.visit('http://130.61.49.110:3001')
    })
    it('login form shown', function(){
        cy.contains('blogs')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })
    describe('login', function(){
        it('correct login', function(){
            cy.get('#username').type('root')
            cy.get('#password').type('qazwsx')
            cy.get('#login-button').click()
            cy.get('.Message').contains('root logged in')
        })
       it('fails with wrong password', function(){
            cy.get('#username').type('rot')
            cy.get('#password').type('qazwsx')
            cy.get('#login-button').click()
            cy.get('.Message').should('be.visible')
            cy.get('.Message').should('contain', 'wrong username or password') 
            cy.get('.Message').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
        it('fails with wrong username', function(){
            cy.get('#username').type('root')
            cy.get('#password').type('gazwsx')
            cy.get('#login-button').click()
            cy.get('.Message').should('contain', 'wrong username or password')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })
    describe('When logged in', function () {
        beforeEach( function () {
            cy.login({username:'root', password: 'qazwsx'})
        })
        it ('A blog can be created', function() {
            cy.contains('Create new').click()
            cy.get('#title').type('title added by Cypress')
            cy.get('#author').type('author added by Cypress')
            cy.get('#url').type('url added by Cypress')
            cy.get('#create-button').click()
            cy.contains('title added by Cypress')
            cy.contains('author added by Cypress')
        })
        describe('When blog exist', function() {
            beforeEach(function(){
                cy.createBlog({
                    title: 'title added by Cypress',
                    author: 'author added by Cypress',
                    url: 'url added by Cypress',
                })
            })
            it ('Show and hide', function() {
                cy.contains('title added by Cypress')
                cy.contains('author added by Cypress')
                cy.contains('url added by Cypress').should('have.css', 'display', 'none')
                cy.contains('show').click()
                cy.contains('title added by Cypress')
                cy.contains('author added by Cypress')
                cy.contains('url added by Cypress').should('not.have.css', 'display', 'none')
                cy.contains('hide').click()
                cy.contains('title added by Cypress')
                cy.contains('author added by Cypress')
                cy.contains('url added by Cypress').should('have.css', 'display', 'none')

            })
            it('Users can like a blog', function() {
                cy.contains('show').click()
                cy.contains('likes 0')
                cy.contains('like').click()
                cy.contains('likes 1')
            })
            it('Users can remove a blog', function() {
                cy.contains('show').click()
                cy.contains('title added by Cypress')
                cy.contains('Remove').click()
                cy.contains('title added by Cypress').should('not.exist')
            })
            describe('Other user', function()  {
                beforeEach(function() {
                    cy.login({username:'user', password: '123456'})
                })
                it ('Other user can Show and hide', function() {
                    cy.contains('title added by Cypress')
                    cy.contains('author added by Cypress')
                    cy.contains('url added by Cypress').should('have.css', 'display', 'none')
                    cy.contains('show').click()
                    cy.contains('title added by Cypress')
                    cy.contains('author added by Cypress')
                    cy.contains('url added by Cypress').should('not.have.css', 'display', 'none')
                    cy.contains('hide').click()
                    cy.contains('title added by Cypress')
                    cy.contains('author added by Cypress')
                    cy.contains('url added by Cypress').should('have.css', 'display', 'none')
    
                })
                it('Other user can like a blog', function() {
                    cy.contains('show').click()
                    cy.contains('likes 0')
                    cy.contains('like').click()
                    cy.contains('likes 1')
                })
                it('Other users can\'t remove a blog', function() {
                    cy.contains('show').click()
                    cy.contains('title added by Cypress')
                    cy.contains('Remove').click()
                    cy.get('.Message').should('contain', 'Error deleting blog - Wrong user')
                    cy.get('.Message').should('have.css', 'color', 'rgb(255, 0, 0)')
                    cy.contains('title added by Cypress').should('exist')
                })
        
            })
        })
    })
    it('Sort order', function() {
        const blogList = [
            {
                title: '1title added by Cypress',
                author: '1author added by Cypress',
                url: '1url added by Cypress',
                likes: 3
            },
            {
                title: '2title added by Cypress',
                author: '2author added by Cypress',
                url: '2url added by Cypress',
                likes: 2
            },
            {
                title: '3title added by Cypress',
                author: '3author added by Cypress',
                url: '3url added by Cypress',
                likes: 1
            }  
        ]
        cy.login({username:'root', password: 'qazwsx'})
        cy.createList( blogList )
        //cy.contains('title added by Cypress').should('exist')      
        //cy.get('.Likes').then ( likes => likes.map( (i, like) => like.contains('3') ) )
        let maxLike = Number.MAX_SAFE_INTEGER
        cy.get('.Likes').then ( 
            likes => {
                let maxLike = Number.MAX_SAFE_INTEGER;
                likes.map( (i, like, qq) => {
                    console.log(qq,'------',i,likes[i]);
                    expect(parseInt(like.innerText)).to.be.at.most(maxLike)
                } )
            } 
        ) 
        
    })
})