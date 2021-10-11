const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');
const logger = require('../utils/logger');


usersRouter.get('/', async (request, response, next) => {
    try { 
        const users = await User.find({}).populate('blogs', {title: 1, author:1, url:1});
        response.json(users);
    } catch (exception) {
        next(exception);
    }
})

usersRouter.post('/', async (request, response, next) => {
    
    if ( !request.body.password || request.body.password.length < 3) {
        return response.status(400).json({error: 'password must be at least 3 characters long'})
    } 
    
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const newUser = new User( {
        username: request.body.username,
        name: request.body.name,
        passwordHash
    })
    try {
        const result = await newUser.save();
        response.status(201).json(result);
    } catch (exception) {
        next(exception);
    }
})
module.exports = usersRouter;