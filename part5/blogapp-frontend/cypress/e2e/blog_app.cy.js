describe('Blog app', function() {
  beforeEach(function() {
    cy.clearDb()
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.get('input#username-input')
  })

  describe('Test Login', function() {

    beforeEach(function() {
      cy.createUser({ username: 'test', name: 'test guy', password: 'test123' })
    })

    it('Can login', function() {
      cy.get('input#username-input').type('test')
      cy.get('input#password-input').type('test123')
      cy.contains('login').click()
      cy.get('div').contains('test logged in')
    })

    it('Login failed', function() {
      cy.get('input#username-input').type('test')
      cy.get('input#password-input').type('wrongpassword')
      cy.contains('login').click()
      cy.contains('Wrong credentials')
    })
  })

  describe('Test Blog functionality', function() {
    beforeEach(function() {
      cy.createUser({ username: 'test', name: 'test guy', password: 'test123' })
      cy.login({ username: 'test', password: 'test123' })
    })

    const title = 'A new test blog'
    const author = 'Test Person'
    const url = 'www.testing.test'

    it('can add blog', function() {
      cy.createBlog({ title, author, url })
      cy.contains(`${title} by ${author} added`)
      cy.contains(title)
    })

    it('blog can be liked', function() {
      cy.createBlog({ title, author, url })
      cy.contains('view').click()
      cy.get('button#like-button').click()
      cy.get('div#likes').contains('1')
    })

    it('blog can be deleted', function() {
      cy.createBlog({ title, author, url })
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains(title).should('not.exist')
    })

    it('only user can delete blog', function() {
      cy.createBlog({ title, author, url })
      cy.contains('Logout').click()
      cy.createUser({ username: 'admin', name: 'admin', password: 'admin' })
      cy.login({ username: 'admin', password: 'admin' })
      cy.contains('admin logged in')
      cy.contains('view').click()
      cy.contains('remove').should('not.exist')
    })

    it('sorting blogs by likes', function() {
      cy.createBlog({ title: 'Least likes', author: 'Test Guy', url })
      cy.get('input#title').type('Most likes')
      cy.get('input#author').type('Test Guy')
      cy.get('input#url').type(url)
      cy.get('button#add-blog-button').click()
      cy.get('.blog-container').contains('Most likes').contains('view').click()
      cy.get('.blog-container').contains('Least likes').contains('view').click()
      cy.get('.blog-data').eq(0).should('contain', 'Least likes')
      cy.get('.blog-data').get('button#like-button').eq(1).click()
      cy.get('.blog-data').eq(0).should('contain', 'Most likes')
      cy.get('.blog-data').eq(1).should('contain', 'Least likes')
    })
  })
})