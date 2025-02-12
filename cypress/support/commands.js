Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobrenome')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('lalalaallal', {delay: 10})
    cy.contains('Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitUsingAObject', user => {
    cy.get('#firstName').type(user.name)
    cy.get('#lastName').type(user.lastName)
    cy.get('#email').type(user.email)
    cy.get('#open-text-area').type(user.text)
    cy.contains('Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmitUsingAObjectDefault', (user = {
    name: 'Nome',
    lastName: 'Sobrenome',
    email: 'email@email.com',
    text: 'lalalaallal'
}) => {
    cy.get('#firstName').type(user.name)
    cy.get('#lastName').type(user.lastName)
    cy.get('#email').type(user.email)
    cy.get('#open-text-area').type(user.text)
    cy.contains('Enviar').click()
})