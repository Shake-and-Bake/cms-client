'use strict'

const store = require('../store')
const api = require('./api')
// const showItemsTemplate = require('../templates/item-listing-grid.handlebars')

const signUpSuccess = (data) => {
  store.user = data.user
  console.log('signup success')
  const credentials = {
    email: $('#sign-up-email').val(),
    password: $('#sign-up-password').val()
  }
  // api.signIn({ credentials })
  //   .then(signInSuccess)
  //   .catch(signInFailure)
  // $('#sign-up-email').val('')
  // $('#sign-up-password').val('')
  // $('#sign-up-password-confirmation').val('')
  //
  // $('#sign-up-modal').modal('hide')
  // $('#sign-in-modal').modal('show')
}

const signUpFailure = (error) => {
  console.log('sign up fail')
  console.log(error)
  $('#sign-up-email').val('')
  $('#sign-up-password').val('')
  $('#sign-up-password-confirmation').val('')
  $('#sign-up-error').text('You may have entered invalid credentials, please try again.')
  // $('#sign-up-status').show()
}

const signInSuccess = (data) => {
  console.log('sign in success, data: ', data)
  const userEmail = data.user.email
  console.log(userEmail)
  store.user = data.user // this stores the entire user object
  $('#welcomeEmail').html('Welcome ' + userEmail)
  $('#sign-in-email').val('')
  $('#sign-in-password').val('')
  $('#sign-in-modal').modal('toggle')
  // $('nav').show()
  // $('.splash-jumbo').hide()
  // $('.item-jumbo').show()
}

const signInFailure = (error) => {
  console.log('sign in fail')
  $('#sign-in-email').val('')
  $('#sign-in-password').val('')
  $('#sign-in-error').text('You may have entered invalid credentials, please try again.')
  console.log(error)
  // $('#sign-in-status').show()
}

const signOutSuccess = () => {
  store.user = null
  $('#welcomeEmail').html('')
  console.log('sign out success')

  // $('.splash-jumbo').show()
  // $('nav').hide()
  // $('.item-jumbo').hide()
  // $('#bs-example-navbar-collapse-1').collapse('hide')
  // $('#collapseTwo').collapse('hide')
  // $('.item_input').val('')
}

const signOutFailure = (error) => {
  console.log('sign out fail')
  console.log(error)
}

const changePasswordSuccess = (data) => {
  console.log('change pass success')
  $('#old-password').val('')
  $('#new-password').val('')
  $('#change-password-modal').modal('toggle')
}

const changePasswordFailure = (error) => {
  console.log('change pass fail')
  $('#change-password-failure').text('You may have an invalid password, please try again.')
  console.log(error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutFailure,
  signOutSuccess,
  changePasswordSuccess,
  changePasswordFailure
}
