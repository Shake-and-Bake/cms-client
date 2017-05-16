'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this) // 'this' is reffering to event.target
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()
  const data = getFormFields(this) // 'this' is reffering to event.target
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  api.signOut()
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

const onChangePassword = function (event) {
  console.log('change pass click is heard')
  event.preventDefault()
  const data = getFormFields(event.target)
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}
const addAuthHandlers = () => {
  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#sign-out').on('click', onSignOut)
  $('#change-password-modal').on('submit', onChangePassword)
  // $('#sign-in-modal-btn').on('click', function () {
  //   $('.auth-status').hide()
  // })
  // $('#sign-up-modal-trigger-link').on('click', function () {
  //   $('#sign-in-modal').modal('hide')
  // })
  // $('#change-password-modal-link').on('click', function () {
  //   $('#change-password-modal').modal('toggle')
  //   $('.auth-status').hide()
  // })
}

module.exports = {
  addAuthHandlers
}
