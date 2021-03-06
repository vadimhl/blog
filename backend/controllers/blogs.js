const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');


blogsRouter.get('/', async (request, response, next) => {

  try {
    const blogs = await Blog.find({}).populate('user', {name: 1, username:1});
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', {name: 1, username:1});
    if ( blog ) {
      response.json(blog);
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const user = request.user;
    console.log('-- post user --', user);
    if (!user) {
      return response.status(401).json({error: 'Authorization error'})
    }
    const blog = new Blog({
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes || 0,
      user: user._id,
    })

    const result = await blog.save();
    user.blogs = user.blogs.concat(result._id);
    await user.save();
    response.status(201).json(result);
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  const user = request.user;
  console.log('-- delete user --', user);
  if (!user) {
    return response.status(401).json({error: 'delete: Authorization error'})
  }
  try {
    const blog = await Blog.findById(request.params.id);
    if ( !blog) {
      return response.status(400).json({error: `Blog id ${request.params.id} does not exist`})
    }
    if ( blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({error: `Wrong user`})
    }
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/like/:id',  async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if ( !blog ) {
      return response.status(404).json({error: `Blog id ${request.params.id} does not exist`}).end(); 
    }
    blog.likes++
    const updBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', {name: 1, username:1}); 
    response.json(updBlog);
  } catch (exception) {
    next(exception);
  } 
})
blogsRouter.put('/:id',  async (request, response, next) => {
  const user = request.user;
  console.log('-- put user --', user);
  if (!user) {
    return response.status(401).json({error: 'put: Authorization error'})
  }  
  const blog = await Blog.findById(request.params.id);
  //console.log('-- blog ---', blog);
  if ( !blog ) {
    return response.status(404).json({error: `Blog id ${request.params.id} does not exist`}).end(); 
  }
  if ( blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({error: `Wrong user`})
  }

  //const users = await User.find({}) ;

  const newBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: request.body?.user?.id //|| users[0]._id,
  }
  //console.log('-- newblog ---', newBlog);
  try {
    const updBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }).populate('user', {name: 1, username:1}); 
    //console.log('-- updblog ---', updBlog);
    response.json(updBlog);
  } catch (exception) {
    next(exception);
  }
})
module.exports = blogsRouter;