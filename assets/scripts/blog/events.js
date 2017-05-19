'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

// The following functions handled the events associated with creating, deleting, updating, and reading blogs
const checkForBlanks = function (data) {
  // check to see if user entered valid values in form fields
  const userTitle = (data.post.title).replace(/ +?/g, '')
  const userBody = (data.post.body).replace(/ +?/g, '')
  if ((userTitle.length === 0) || (userBody.length === 0)) {
    // if not valid - return true
    return true
  } else {
    // if valid - return false
    return false
  }
}

const onCreateBlog = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (checkForBlanks(data)) {
    // if invalid - notify user and do not send to API
    $('.updateerror').text('An error occurred. You must fill in all fields in order to create an item.')
    // user validation for blog creation fail
    $('#fail-blog-create-alert').alert()
    $('#fail-blog-create-alert').fadeTo(1500, 500).slideUp(500, () => {
      $('#fail-blog-create-alert').slideUp(500)
    })
    $('html, body').animate({ scrollTop: 0 }, 'fast')
  } else {
    api.createBlog(data)
      .then(ui.createBlogSuccess)
      .catch(ui.createBlogFailure)
  }
}
const onGetBlogs = (event) => {
  api.getBlogs()
    .then(ui.getBlogsSuccess)
    .catch(ui.getBlogsfailure)
}

const onGetCurrentUserBlogs = function () {
  api.getCurrentUserBlogs()
    .then(ui.getCurrentUserBlogsSuccess)
    .catch(ui.getCurrentUserBlogsFail)
}

const onUpdateCurrentUserBlogs = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (checkForBlanks(data)) {
    // if invalid - notify user and do not send to API
    $('.updateerror').text('An error occurred. You must fill in all fields in order to create an item.')
    $('#fail-blog-update-alert').alert()
    $('#fail-blog-update-alert').fadeTo(1500, 500).slideUp(500, () => {
      $('#fail-blog-update-alert').slideUp(500)
    })
    $('html, body').animate({ scrollTop: 0 }, 'fast')
  } else {
    const postId = $(this).attr('data-id')
    api.updateCurrentUserBlogs(postId, data)
      .then(ui.updateCurrentUserBlogsSuccess)
      .catch(ui.updateCurrentUserBlogsFail)
      .done(onGetCurrentUserBlogs)
  }
}

const onDeleteCurrentUserBlogs = function () {
  event.preventDefault()
  // makes sure that the data deleted is the data (blogs) of the current_user
  const data = $(this).attr('data-id')
  api.deleteCurrentUserBlogs(data)
    .then(ui.deleteCurrentUserBlogsSuccess)
    .catch(ui.deleteCurrentUserBlogsFail)
    .done(onGetCurrentUserBlogs)
}

const refreshUpdatePostModal = function () {
  onGetCurrentUserBlogs()
}

const blogFieldListener = function (event) {
  if (event.which === 13) {
    event.preventDefault()
  }
}

// event listeners

const addBlogHandlers = () => {
  $('#blogCreateForm').on('submit', onCreateBlog)
  $('#showBlogButton').on('click', onGetBlogs)
  $('#cur-user-blogs').on('click', onGetCurrentUserBlogs)
  $('.blogfield').keypress(blogFieldListener)
  $(document).on('keypress', '.blogfield', blogFieldListener)
  $(document).on('submit', '.update-post', onUpdateCurrentUserBlogs)
  $(document).on('submit', '.remove-post', onDeleteCurrentUserBlogs)
  $(document).on('hidden.bs.modal', '.update-post-modal', refreshUpdatePostModal)
  $('#all-blogs-tab').on('click', onGetBlogs)
}

module.exports = {
  addBlogHandlers,
  onGetBlogs
}
