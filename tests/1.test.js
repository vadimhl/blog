const bcrypt = require('bcrypt');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const api = supertest(app);
let userId ;

describe( 'user', () => {
    beforeEach( async () => {
        const root = await User.findOne({});
        
        //userId = users[0]._id;
        /*await User.deleteMany({});
        const saltRounds = 10
        const passwordHash = await bcrypt.hash('123456', saltRounds)
        const users = await Blog.find({});
        const root = new User({
            username: 'root',
            name: 'name root',
            passwordHash,
        })*/
        await root.save();
        await Blog.deleteMany({});
        const blogObjects = helper.testBlogs.map ( blog => new Blog({...blog, user: root._id}));
        const promiseArr = blogObjects.map( bo => bo.save() );
        await Promise.all(promiseArr)
    
    })
    test ( 'json', async () => {
        await api.get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    })
    test ( 'jsonb', async () => {
        await api.get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    })
})

afterAll(() => {
    mongoose.connection.close()
})

  //beforeAll ( async () => {
    //onst users = await User.find({});
    //userId = users[0]._id;
  //})
