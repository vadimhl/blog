const usersRouter = require('express').Router();
const User = require('../models/user');
const logger = require('../utils/logger');


usersRouter.get('/', async (request, response, next) => {
    try { 
        const users = await User.find({});
        response.json(users);
    } catch (exception) {
        next(exception);
    }
})

usersRouter.post('/', async (request, response, next) => {
    const newUser = new User( {
        username: request.body.username,
        name: request.body.name,
    })
    try {
        const result = await newUser.save();
        response.status(201).json(result);
    } catch (exception) {
        next(exception);
    }
})
module.exports = usersRouter;