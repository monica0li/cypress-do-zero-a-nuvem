describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos origatórios e envia o formulário', () => {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobrenome')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('lalalaallal', {delay: 10})
    cy.get('button').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobrenome')
    cy.get('#email').type('email')
    cy.get('#open-text-area').type('lalalaallal', {delay: 10})
    cy.get('button').click()
    cy.get('.error').should('be.visible')
  })

  it('campo de telefone permanece vazio ao digitar valores não-numéricos', () => {
    cy.get('#phone').type('a?/;@#$%!%¨&*()_+}?{`^:').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
    cy.get('#firstName').type('nome')
    cy.get('#lastName').type('sobrenome')
    cy.get('#email').type('email@email.com')
    cy.get('#open-text-area').type('lalalaallal', {delay: 10})
    cy.get('#phone-checkbox').click()
    cy.get('button').click()
    cy.get('.error').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {
    cy.get('button').click()
    cy.get('.error').should('be.visible')
  })
})
