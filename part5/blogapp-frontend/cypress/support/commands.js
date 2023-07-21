Cypress.Commands.add('clearDb', () => {
  cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
})

Cypress.Commands.add('createUser', ({ username, name, password }) => {
  const user = {
    username: username,
    name: name,
    password: password
  }
  cy.request('POST', 'http://localhost:3003/api/users', user)
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogsappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.contains('Add blog').click()
  cy.get('input#title').type(title)
  cy.get('input#author').type(author)
  cy.get('input#url').type(url)
  cy.get('button#add-blog-button').click()
})