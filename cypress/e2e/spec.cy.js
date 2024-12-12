describe('template spec', () => {
  it('Generate random password', () => {
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')
    cy.get('[data-test="upper-check"]').as('click-upper-check').click()
    cy.get('[data-test="lower-check"]').as('click-lower-check').click()
    cy.get('[data-test="level-name"]').should('have.text', 'Fraca.')
    cy.get('[data-test="generate-password-button"]').as('generate-password-button').click()

    cy.get('[data-test="password-input"]').as('password-input').invoke('val').then(val => {
      let resp = true
      val = val.split('')
      for (let index = 0; index < val.length; index++) if (!isNumber(val[index])) resp = false
      expect(resp).to.equal(true);
    })

    cy.get('@click-lower-check').click()
    cy.get('[data-test="numbers-check"]').as('click-number-check').click()


    cy.get('@generate-password-button').click()
    cy.get('@password-input').invoke('val').then(val => {
      let resp = true
      val = val.split('')
      for (let index = 0; index < val.length; index++) if (!isLowerCase(val[index])) resp = false
      expect(resp).to.equal(true);
    })

    cy.get('@click-upper-check').click()
    cy.get('@click-lower-check').click()

    cy.get('@generate-password-button').click()
    cy.get('@password-input').invoke('val').then(val => {
      let resp = true
      val = val.split('')
      for (let index = 0; index < val.length; index++) if (!isUpperCase(val[index])) resp = false
      expect(resp).to.equal(true);
    })

    cy.get('[data-test="symbols-check"]').as('click-symbols-check').click()
    cy.get('@click-upper-check').click()

    cy.get('@generate-password-button').click()
    cy.get('@password-input').invoke('val').then(val => {
      let resp = true
      val = val.split('')
      for (let index = 0; index < val.length; index++) if (!isSymbol(val[index])) resp = false
      expect(resp).to.equal(true);
    })

    cy.get('[data-test="level-name"]').as('level-name').should('have.text', 'Fraca.')
    cy.get('@click-upper-check').click()
    cy.get('@click-lower-check').click()
    cy.get('@level-name').should('have.text', 'Media.')
  })
  it('save password local', () => {
    let siteName = 'site generico'
    let siteName2 = 'outro site generico'
    let password = 'test-password'
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')
    cy.get('[data-test="notification-container"]').should('not.exist')
    cy.get('[data-test="save-button"]').as('save-button').click()
    cy.get('[data-test="notification-container"]').as('notification-container').should('be.visible')
    cy.get('@notification-container').should('contain.text', 'Por favor insira uma senha.')
    cy.get('[data-test="password-input"]').type(password)
    cy.get('[data-test="save-modal"]').should('not.exist')
    cy.get('@save-button').click()
    cy.get('[data-test="save-modal"]').should('be.visible')
    cy.get('[data-test="save-password-button"]').as('save-password-button').click()
    cy.get('@notification-container').should('contain.text', 'Insira o nome do site')
    cy.get('[data-test="site-name-input"]').type(siteName)
    cy.get('[data-test="save-cloud-check"]').click()
    cy.get('@save-password-button').click()
    cy.get('[data-test="save-modal"]').should('not.exist')
    cy.get('[data-test="password-card-container"]').as('password-card-container').should('be.visible')
    cy.get('@password-card-container').within(() => {
      cy.get('[data-test="password-card-input-name"]').as('password-card-input-name').should('have.value', siteName)
      cy.get('[data-test="password-card-input-value"]').as('password-card-input-value').should('have.value', password)
      cy.get('[type="password"]').should('be.visible')
      cy.get('[data-test="show-password"]').as('show-password').click()
      cy.get('[type="password"]').should('not.exist')
      cy.get('[data-test="hide-password"]').as('hide-password').click()
      cy.get('[type="password"]').should('be.visible')
      cy.get('[data-test="local-alert"]').as('local-alert').should('be.visible')
    })
    cy.get('[data-test="generate-password-button"]').as('generate-password-button').click()
    cy.get('@save-button').click()
    cy.get('[data-test="site-name-input"]').type(siteName2)
    cy.get('[data-test="save-cloud-check"]').click()
    cy.get('@save-password-button').click()
    cy.get('@password-card-container').should('have.length', 2)
    cy.get('@password-card-container').its(1).within(() => {
      cy.get('[data-test="password-card-input-name"]').as('password-card-input-name').should('have.value', siteName2)
    })
  })
  it('create account', () => {
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')
    let user = {
      name: 'TestUser',
      wrongName: 'Test User',
      takenName: 'miratkd',
      email: 'TestUser@hotmail.com',
      password: '123123'
    }
    cy.get('[data-test="create-account-modal"]').should('not.exist')
    cy.get('[data-test="create-account-button"]').click()
    cy.get('[data-test="create-account-modal"]').should('be.visible')
    cy.get('[data-test="modal-create-account-button"]').as('create-account').click()

    cy.get('[data-test="user-message"]').as('user-message').should('have.text', 'Campo obrigatório.')
    cy.get('[data-test="email-message"]').as('email-message').should('have.text', 'Campo obrigatório.')
    cy.get('[data-test="password-message"]').as('password-message').should('have.text', 'Campo obrigatório.')
    cy.get('[data-test="check-password-message"]').as('check-password-message').should('have.text', 'Campo obrigatório.')

    cy.get('[data-test="user-name-input"]').as('user-input').type(user.wrongName)
    cy.get('[data-test="user-email-input"]').as('email-input').type(user.wrongName)
    cy.get('[data-test="user-password1-input"]').as('password1-input').type(user.password)
    cy.get('[data-test="user-password2-input"]').as('password2-input').type(user.password + 'asdasd')

    cy.get('@create-account').click()

    cy.get('@check-password-message').should('have.text', 'As senhas não estão iguais.')

    cy.get('@password2-input').clear()
    cy.get('@password2-input').type(user.password)

    cy.get('@create-account').click()


    cy.intercept('POST', 'https://easy-password.up.railway.app/account/', {
      statusCode: 400,
      fixture: 'notValidEmailName.json'
    })
    cy.get('@create-account').click()
    cy.get('@email-message').should('have.text', 'Insira um endereço de email válido.')
    cy.get('@user-message').should('have.text', 'Informe um nome de usuário válido. Este valor pode conter apenas letras, números e os seguintes caracteres @/./+/-/_.')

    cy.get('@user-input').clear()
    cy.get('@user-input').type(user.takenName)
    cy.get('@email-input').clear()
    cy.get('@email-input').type(user.email)

    cy.intercept('POST', 'https://easy-password.up.railway.app/account/', {
      statusCode: 400,
      fixture: 'nameTaken.json'
    })

    cy.get('@create-account').click()

    cy.get('@user-message').should('have.text', 'Um usuário com este nome de usuário já existe.')

    cy.intercept('POST', 'https://easy-password.up.railway.app/account/', {
      statusCode: 201,
      fixture: 'createAccount.json'
    })
    cy.intercept('POST', 'https://easy-password.up.railway.app/o/token/', {
      statusCode: 200,
      fixture: 'token.json'
    })
    cy.intercept('GET', 'https://easy-password.up.railway.app/account/me/', {
      statusCode: 200,
      fixture: 'me.json'
    })
    // cy.intercept('POST', 'https://mylinkback-production.up.railway.app/api/login', {
    //   statusCode: 403,
    //   fixture: 'wrongCredentials.json'
    // })

    cy.get('@user-input').clear()
    cy.get('@user-input').type(user.name)

    cy.get('@create-account').click()
    cy.get('[data-test="create-account-modal"]').should('not.exist')

    cy.get('[data-test="page-title"]').should('have.text', 'Bem vindo ' + user.name)
    cy.get('[data-test="notification-container"]').as('notification-container').should('be.visible')
    cy.get('@notification-container').should('contain.text', 'Conta criada com sucesso')
  })
  it('save password on cloud', ()=>{
    cy.visit('')
    cy.get('[id="nuxt-devtools-anchor"]')
    let user = {
      name: 'TestUser',
      wrongName: 'Test User',
      takenName: 'miratkd',
      email: 'TestUser@hotmail.com',
      password: '123123'
    }
    let siteName = 'site generico'
    let password = 'test-password'
    cy.get('[data-test="create-account-button"]').click()
    cy.get('[data-test="user-name-input"]').as('user-input').type(user.name)
    cy.get('[data-test="user-email-input"]').as('email-input').type(user.email)
    cy.get('[data-test="user-password1-input"]').as('password1-input').type(user.password)
    cy.get('[data-test="user-password2-input"]').as('password2-input').type(user.password)

    cy.intercept('POST', 'https://easy-password.up.railway.app/account/', {
      statusCode: 201,
      fixture: 'createAccount.json'
    })
    cy.intercept('POST', 'https://easy-password.up.railway.app/o/token/', {
      statusCode: 200,
      fixture: 'token.json'
    })
    cy.intercept('GET', 'https://easy-password.up.railway.app/account/me/', {
      statusCode: 200,
      fixture: 'me.json'
    })
    cy.get('[data-test="modal-create-account-button"]').as('create-account').click()

    cy.get('[data-test="password-input"]').type(password)
    cy.get('[data-test="save-button"]').as('save-button').click()

    cy.get('[data-test="site-name-input"]').type(siteName)

    cy.intercept('POST', 'https://easy-password.up.railway.app/account/save_password/', {
      statusCode: 200,
      fixture: 'savePassword.json'
    })
    cy.intercept('GET', 'https://easy-password.up.railway.app/account/passwords/', {
      statusCode: 200,
      fixture: 'getPassword.json'
    })

    cy.get('[data-test="save-password-button"]').as('save-password-button').click()

    cy.get('[data-test="password-card-container"]').as('password-card-container').within(() => {
      cy.get('[data-test="password-card-input-name"]').as('password-card-input-name').should('have.value', siteName)
      cy.get('[data-test="password-card-input-value"]').as('password-card-input-value').should('have.value', password)
      cy.get('[data-test="local-alert"]').should('not.exist')
    })


  })
})

function isNumber(params) {
  return !isNaN(params)
}
function isLowerCase(params) {
  return !isNumber(params) && params == params.toLowerCase()
}
function isUpperCase(params) {
  return !isNumber(params) && params == params.toUpperCase()
}
function isSymbol(params) {
  return '!@#$%^&*()'.split('').includes(params)
}