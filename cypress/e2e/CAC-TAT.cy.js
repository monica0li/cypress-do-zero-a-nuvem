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
// lição 1
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
// lição 2
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
    cy.get('#phone-checkbox').check()
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

// exc extra 8
  it('envia o form com comando customizado, mas usando parametro e valor padrao', () => {
    cy.fillMandatoryFieldsAndSubmitUsingAObjectDefault()

    cy.get('.success').should('be.visible')
  })

// lição 3
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select')
    .select('YouTube')
    .should('have.value', 'youtube')
  })

//exc extra 1
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('select')
    .select('mentoria')
    .should('have.value','mentoria')
  })

//exc extra 2
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select')
    .select(1)
    .should('have.value','blog')

  })

// lição 4
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
  })

// exc extra
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((radio) => {
        cy.wrap(radio).check();
        cy.wrap(radio).should("be.checked");
      });
  })

// lição 5
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

// lição 6
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    })
  })
//extra 1
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    })
  })
//extra 2
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json')
    .as('arquivo')

    cy.get('#file-upload')
    .selectFile('@arquivo')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    })
  })
})
