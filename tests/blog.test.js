const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const helper = require('./test_helper');
const api = supertest(app);
let userId ;
describe( 'blog list',  () => {
  beforeEach( async () => {
    const user = await User.findOne({});
    await Blog.deleteMany({});
    const blogObjects = helper.testBlogs.map ( blog => new Blog({...blog, user: user._id}));
    const promiseArr = blogObjects.map( bo => bo.save() );
    await Promise.all(promiseArr)
  })
  test ( 'json', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  })
  test ( 'count', async () => {
    const response = await api.get('/api/blogs/'); 
    expect( response.body.length).toBe( helper.testBlogs.length)
  })
  test ( 'id', async () => {
    const response = await api.get('/api/blogs');
    expect( response.body[0].id).toBeDefined();
  })
  test ( 'post', async () => {
    const newBlog = await api
      .post('/api/blogs')
      .send(
        {
          title: "ForTest",
          author: "Test ttt",
          url: "127.0.0.1",
          likes: 13
        }
      )
      .expect(201)
      .expect('Content-Type', /application\/json/);
    //console.log(newBlog.body);
    expect( newBlog.body.title).toBe("ForTest");
    expect( newBlog.body.author).toBe("Test ttt");
    expect( newBlog.body.url).toBe("127.0.0.1");
    expect( newBlog.body.likes).toBe(13);
    const response = await api.get('/api/blogs');
    expect( response.body.length)
    .toBe(helper.testBlogs.length+1);
    expect( response.body.map(bl => bl.title))
    .toContain('ForTest');
    expect( response.body.map(bl => bl.author))
    .toContain('Test ttt');

  })
  test ('likes', async () =>{
    const newBlog = await api
      .post('/api/blogs')
      .send(
        {
          title: "ForTest",
          author: "Test ttt",
          url: "127.0.0.1",
          //no likes: 
        }
      )
      .expect(201)
      .expect('Content-Type', /application\/json/);  
      expect( newBlog.body.likes).toBe(0);
  })
  test ( 'title', async () => {
    await api
      .post('/api/blogs')
      .send(
        {
          author: "Test ttt",
          url: "127.0.0.1",
          likes: 1
        }
      )
      .expect(400);
  })
  test ( 'url', async () => {
    await api
      .post('/api/blogs')
      .send(
        {
          author: "Test ttt",
          title: "ForTest",
          likes: 1
        }
      )
      .expect(400);
  })  
  test('put', async () => {
    const resp1 = await api.get('/api/blogs/5a422b3a1b54a676234d17f9');
    await api
      .put('/api/blogs/5a422b3a1b54a676234d17f9')
      .send( { likes: resp1.body.likes + 1 } )
      .expect(200)
    const resp2 = await api.get('/api/blogs/5a422b3a1b54a676234d17f9');
    expect( resp2.body.likes).toBe(resp1.body.likes + 1 );
  })
  test ('delete', async () => {
    await api
      .delete('/api/blogs/5a422b3a1b54a676234d17f9')
      .expect(204);
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(helper.testBlogs.length-1);
    //console.log(response.body);
    expect(response.body.map( bl => bl.title ))
    .not.toContain('Canonical string reduction');
  })
  
})
afterAll( () => {
    mongoose.connection.close();
  
})