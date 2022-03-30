/**
* @author  QATeam
* @copyright Copyright (c) Inqom
* @license Proprietary
*/

import 'cypress-file-upload'

const pathids = "ids/data.json"
const loginPage = "fr/me/settings/account"
const imagepath = 'img/inqom.png'




describe('Test Case update image profile', () => {
  context('Test case Inqom ', () => {
    before(function () {
      cy.fixture(pathids).then((user) => {
        //variable globale accessibles dans toute la suite de test.
        this.user = user
      })
      cy.visit(loginPage)

    })
    it('step 1 connexion ',function () {
      // je me connecte
      cy.get('#email_login').type(this.user.email)
      cy.get('#password').click().type(this.user.password +"{enter}")


      // cy.get('[data-testid="login-button-submit"]').click()
      // cy.get(' div > img').attachFile(imagepath)

      //Je télécharge l'image j'ai utulisé une bibliothèque cypress
      cy.get('[shape="square"]').first().attachFile(imagepath,{ subjectType: 'drag-n-drop' })

      // J'enregistre les informations
      cy.get('[data-testid="account-edit-button-submit"]').click({force:true})

      // to check if an image has finished loading, the simplest way is to check the image's naturalWidth
      cy.visit(loginPage)
      cy.get('#avatar > div > img')
          .should('be.visible')
          .and(($img) => {
            // "naturalWidth" and "naturalHeight" are set when the image loads
            expect($img[0].naturalWidth).to.be.greaterThan(0)
          })

    })
  })
})
