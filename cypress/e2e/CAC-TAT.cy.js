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
// Lição 1 - Primeiro teste automatizado escrito com Cypress
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
// Lição 2 - Digitando em campos e clicando em elementos
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
  it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',() => {
    cy.clock()
    
    cy.get('button')
    .click()

    cy.get('.error')
    cy.contains('.error', 'Valide os campos obrigatórios!')

    cy.tick(3000)

    cy.contains('.error', 'Valide os campos obrigatórios!')
    .should('not.be.visible')
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

// Lição 3 - Selecionando opções em campos de seleção suspensa
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

// Lição 4 - Marcando inputs do tipo radio
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

// Lição 5 - Marcando (e desmarcando) inputs do tipo checkbox
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })

// Lição 6 - Fazendo upload de arquivos com Cypress
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    })
  })
// exc extra 1
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    })
  })
// exc extra 2
  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json')
    .as('arquivo')

    cy.get('#file-upload')
    .selectFile('@arquivo')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json');
    })
  })
//Lição 7 - Lidando com links que abrem em outra aba
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })
// exc extra 1
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
  })
})
