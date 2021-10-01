const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);
const helper = require('./test_helper');

describe( 'user', () => {
    beforeEach( async () => {
        await User.deleteMany({});
        const root = new User({
            username: 'root',
            name: 'name root'
        })
        await root.save();
    })
    test ( 'json', async () => {
        await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    })
    test ( 'count', async () => {
        const response = await api.get('/api/users/'); 
        expect( response.body.length).toBe( 1 )
    })
    test ('post', async () => {
        userToAdd = { username: 'posted', name: 'Posted User'};
        const newUser = await api
        .post('/api/users')
        .send(userToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/);
        
        expect(newUser.body.username).toBe('posted');
        expect(newUser.body.name).toBe('Posted User');

        const allUsers = await helper.usersInDb();
        expect( allUsers.map( u => u.username)).toContain('posted');
        expect( allUsers.map( u => u.name)).toContain('Posted User');

    })
})

afterAll(() => {
    mongoose.connection.close()
})