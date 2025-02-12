describe('Central de Atendimento ao Cliente TAT', () => {

  const user = {
    name: 'Joaozinho',
    lastName: 'Daa Silva',
    email: 'joaozinho@email.com',
    text: Cypress._.repeat('texto ', 10)
  }

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
// exc extra 1
  it('preenche os campos origatórios e envia o formulário', () => {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobrenome')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('lalalaallal', {delay: 10})
    cy.contains('Enviar').click()
    cy.get('.success').should('be.visible')
  })
// exc extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobrenome')
    cy.get('#email').type('email')
    cy.get('#open-text-area').type('lalalaallal', {delay: 10})
    cy.contains('Enviar').click()
    cy.get('.error').should('be.visible')
  })
// exc extra 3
  it('campo de telefone permanece vazio ao digitar valores não-numéricos', () => {
    cy.get('#phone')
      .type('a?/;@#$%!%¨&*()_+}?{`^:')
      .should('have.value', '')
  })
// exc extra 4
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobrenome')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('lalalaallal', {delay: 10})
    cy.get('#phone-checkbox').click()
    cy.contains('Enviar').click()

    cy.get('.error').should('be.visible')
  })
// exc extra 5
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('nome')
      .should('have.value', 'nome')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('sobrenome')
      .should('have.value','sobrenome')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('email@email.com')
      .should('have.value', 'email@email.com')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area')
      .type('lalalaallal', {delay: 10})
      .should('have.value', 'lalalaallal')
      .clear()
      .should('have.value', '')

    
  })
// exc extra 6
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {
    cy.get('button').click()

    cy.get('.error').should('be.visible')
  })
// exc extra 7.1
  it('envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')

  })
// exc extra 7.2
  it('envia o form com comando customizado, mas usando parametro', () => {
    cy.fillMandatoryFieldsAndSubmitUsingAObject(user)

    cy.get('.success').should('be.visible')

  })

  it('envia o form com comando customizado, mas usando parametro e valor padrao', () => {
    cy.fillMandatoryFieldsAndSubmitUsingAObjectDefault()

    cy.get('.success').should('be.visible')

  })
})
