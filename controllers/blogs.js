const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const logger = require('../utils/logger');
const jwt = require('jsonwebtoken');


const getToken = request => {
  const authorization = request.get('authorization');
  if ( authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
}

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
  const cToken = getToken(request);
  
  try {
    const token = cToken? await jwt.verify(cToken, process.env.SECRET) : null;
  
    if ( !token || !token.id) {
      return response.status(401).json({error: 'Invalid token'})
    }
    
    const user = await User.findById(token.id) ;
  
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
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (exception) {
    next(exception)
  }
})
blogsRouter.put('/:id',  async (request, response, next) => {
  const users = await User.find({}) ;

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: users[0]._id,
  }
  
  try {
    const updBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', {name: 1, username:1}); 
    response.json(updBlog);
  } catch (exception) {
    next(exception);
  }
})
module.exports = blogsRouter;