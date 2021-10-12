import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import blogService from './services/blogs'
import Message from './components/message'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState({ text: '', color: 'gray', time: 0 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <Message message={message} setMessage={setMessage} />
      <LoginForm usern={user}  setUser={setUser} setMessage={setMessage} />
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App