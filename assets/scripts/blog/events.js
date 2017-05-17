'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)

const api = require('./api')
const ui = require('./ui')

const checkForBlanks = function (data) {
  // check to see if user entered valid values in form fields
  if ((data.post.title === '') || (data.post.body === '')) {
    // if not valid - return true
    return true
  } else {
    // if valid - return false
    return false
  }
}

const onCreateBlog = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target) // same as this
  if (checkForBlanks(data)) {
    // if invalid - notify user and do not send to API
    $('.updateerror').text('An error occurred. You must fill in all fields in order to create an item.')
  } else {
    api.createBlog(data)
      .then(ui.createBlogSuccess)
      .catch(ui.createBlogFailure)
    // .done(onGetPosts)
  }
}

const onGetBlogs = (event) => {
  // event.preventDefault()
  api.getBlogs()
    .then(ui.getBlogsSuccess)
    .catch(ui.getBlogsfailure)
}

const onGetCurrentUserBlogs = function () {
  console.log('get current user blogs click is heard')
  api.getCurrentUserBlogs()
    .then(ui.getCurrentUserBlogsSuccess)
    .catch(ui.getCurrentUserBlogsFail)
}

const onUpdateCurrentUserBlogs = function (event) {
  event.preventDefault()
  console.log(' update user blogs click is heard')
  const data = getFormFields(event.target)
  if (checkForBlanks(data)) {
    // if invalid - notify user and do not send to API
    $('.updateerror').text('An error occurred. You must fill in all fields in order to update an item.')
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
  console.log('remove current user blogs click is heard')
  const data = $(this).attr('data-id')
  api.deleteCurrentUserBlogs(data)
    .then(ui.deleteCurrentUserBlogsSuccess)
    .catch(ui.deleteCurrentUserBlogsFail)
    .done(onGetCurrentUserBlogs)
}

const addBlogHandlers = () => {
  $('#blogCreateForm').on('submit', onCreateBlog)
  $('#showBlogButton').on('click', onGetBlogs)
  $('#cur-user-blogs').on('click', onGetCurrentUserBlogs)
  $(document).on('submit', '.update-post', onUpdateCurrentUserBlogs)
  $(document).on('submit', '.remove-post', onDeleteCurrentUserBlogs)
}

module.exports = {
  addBlogHandlers,
  onGetBlogs
}
