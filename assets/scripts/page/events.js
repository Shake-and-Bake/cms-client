'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const checkForBlanks = function(data) {
  // check to see if user entered valid values in form fields
  const userTitle = (data.page.title).replace(/ +?/g, '')
  const userBody = (data.page.body).replace(/ +?/g, '')
  const userFooter = (data.page.footer).replace(/ +?/g, '')
  if ((userTitle.length === 0) ||
    (userBody.length === 0) ||
    (userFooter.length === 0)) {
    // if not valid - return true
    return true
  } else {
    // if valid - return false
    return false
  }
}

const onCreatePage = function(event) {
  event.preventDefault()
  // assign form fields inputs to data
  const data = getFormFields(event.target) // same as this
  if (checkForBlanks(data)) {
    // if invalid - notify user and do not send to API
    $('.updateerror').text('An error occurred. You must fill in all fields in order to create an item.')
    $('#fail-page-create-alert').alert()
    $('#fail-page-create-alert').fadeTo(1500, 500).slideUp(500, () => {
      $('#fail-page-create-alert').slideUp(500)
    })
    $('html, body').animate({
      scrollTop: 0
    }, 'fast')
  } else {
    // if no blanks - send ajax request
    api.createPage(data)
      .then(ui.createPageSuccess)
      .catch(ui.createPageFailure)
  }
}

const onGetPages = (event) => {
  api.getPages()
    .then(ui.getPagesSuccess)
    .catch(ui.getPagesfailure)
}

const onGetCurrentUserPages = function(event) {
  api.getCurrentUserPages()
    .then(ui.getCurrentUserPagesSuccess)
    .catch(ui.getCurrentUserPagesFail)
}

const onGetOthersPages = function(event) {
  api.getPages()
    .then(ui.getOthersPagesSuccess)
    .catch(ui.getOthersPagesfailure)
}

const onUpdateCurrentUserPages = function(event) {
  event.preventDefault()
  // assign input form fields to data
  const data = getFormFields(event.target)
  if (checkForBlanks(data)) {
    // if invalid - notify user and do not send to API
    $('.updateerror').text('An error occurred. You must fill in all fields in order to create an item.')
    $('#fail-page-update-alert').alert()
    $('#fail-page-create-alert').fadeTo(1500, 500).slideUp(500, () => {
      $('#fail-page-create-alert').slideUp(500)
    })
  } else {
    // use id to update that page id
    const pageId = $(this).attr('data-id')
    api.updateCurrentUserPages(pageId, data)
      .then(ui.updateCurrentUserPagesSuccess)
      .catch(ui.updateCurrentUserPagesFail)
      .done(onGetCurrentUserPages)
  }
}

const onDeleteCurrentUserPages = function() {
  event.preventDefault()
  // use data-id in html to delete that page id
  const data = $(this).attr('data-id')
  api.deleteCurrentUserPages(data)
    .then(ui.deleteCurrentUserPagesSuccess)
    .catch(ui.deleteCurrentUserPagesFail)
    .done(onGetCurrentUserPages)
}

const refreshUpdatePageModal = function() {
  // when modal closes, run a GET request
  onGetCurrentUserPages()
}

const pageFieldListener = function(event) {
  // prevent user from using return key
  if (event.which === 13) {
    event.preventDefault()
  }
}

const addPageHandlers = () => {
  $('#create-page-form').on('submit', onCreatePage)
  $('#showPageButton').on('click', onGetPages)
  $('#cur-user-pages').on('click', onGetCurrentUserPages)
  $('.pagefield').keypress(pageFieldListener)
  $(document).on('keypress', '.pagefield', pageFieldListener)
  $(document).on('submit', '.update-page', onUpdateCurrentUserPages)
  $(document).on('submit', '.remove-page', onDeleteCurrentUserPages)
  $(document).on('hidden.bs.modal', '.update-page-modal', refreshUpdatePageModal)
  $('#all-pages-tab').on('click', onGetOthersPages)
}

module.exports = {
  addPageHandlers,
  onGetPages,
  onGetCurrentUserPages,
  onUpdateCurrentUserPages,
  onDeleteCurrentUserPages
}
