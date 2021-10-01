const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/user');
const api = supertest(app);

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
})

afterAll(() => {
    mongoose.connection.close()
})