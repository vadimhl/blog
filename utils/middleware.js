const logger = require('./logger')
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const requestLogger = (request, response, next) => {
  logger.info(`Method: ${request.method} Path: ${request.path} Body:`, request.body);
  logger.info('----------------------------')
  next()
}

const tokenExtractor = ( request, response, next) => {
    const authorization = request.get('authorization');
    if ( authorization && authorization.toLowerCase().startsWith('bearer ')) {
      request.token = authorization.substring(7);
    } else {
      request.token = null;
    }
    next();
}

const userExtractor = async (request, response, next) => {
  request.user = null;
  //console.log('-- userExtr --');
  if ( !request.token ) {
    //console.log('-- userExtr no token --');
    return next();
  }
  try {
    //console.log('-- userExtr -- 11');
    decodedToken = jwt.verify(request.token, process.env.SECRET);
    //console.log('-- userExtr -- 22');
    if ( decodedToken && decodedToken.id ) { 
      //console.log('-- userExtr -- 33');
      request.user = await User.findById(decodedToken.id);
      //console.log('-- userExtr --', request.user.username);
    }
  } catch (exception) {
    next(exception);
  }
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  //logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({error: 'invalid token'})
  } else {
    return response.status(400).json({ error: error.name+': '+error.message })
  };
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}