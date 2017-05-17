'use strict'

// const store = require('../store')
// const api = require('./api')
const showBlogsTemplate = require('../templates/blog-listing.handlebars')

const createBlogSuccess = (data) => {
  console.log('create blog success')
}

const createBlogFailure = (error) => {
  console.log('create blog fail')
  console.log(error)
}
const getBlogsSuccess = (data) => {
  console.log('inside get blogs, data is', data)
  const showBlogsHtml = showBlogsTemplate({
    posts: data.posts
  })
  $('.visitorDiv').html(showBlogsHtml)
}
module.exports = {
  createBlogSuccess,
  createBlogFailure,
  getBlogsSuccess
}
