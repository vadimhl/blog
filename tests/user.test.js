const bcrypt = require('bcrypt');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);
const helper = require('./test_helper');

describe( 'user', () => {
    beforeEach( async () => {
        await User.deleteMany({});
        const saltRounds = 10
        const passwordHash = await bcrypt.hash('123456', saltRounds)
    
        const root = new User({
            username: 'root',
            name: 'name root',
            passwordHash,
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
        userToAdd = { username: 'posted', name: 'Posted User', password: 'qwer'};
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
    test( 'post no username', async () => {
        userToAdd = { name: 'Posted User', password: 'qwer'};
        const newUser = await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
    })
    test( 'post  too short username', async () => {
        userToAdd = { username: 'po', name: 'Posted User', password: 'qwer'};
        const newUser = await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
    })
    test( 'post no password', async () => {
        userToAdd = { username: 'posted1', name: 'Posted User1'};
        const newUser = await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
    })
    test( 'post bad password', async () => {
        userToAdd = { username: 'posted2', name: 'Posted User', password: 'qw'};
        const newUser = await api
        .post('/api/users')
        .send(userToAdd)
        .expect(400)
    })

})

afterAll(() => {
    mongoose.connection.close()
})