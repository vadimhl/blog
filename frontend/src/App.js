import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Logout from './components/logout'
import CreateNew from './components/createNew'
import LoginForm from './components/loginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/message'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState({ text: '', color: 'gray', time: 0 })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const createNewRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [user])

  useEffect( () => {
    const userJSON = window.localStorage.getItem('loggedUser')
    if ( userJSON ) {
      const loggedUser = JSON.parse(userJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await loginService.login({ username, password })
      console.log('login user:', loggedUser)
      setMessage({ text:'logded as'+loggedUser.name, color: 'green', time: 3000 })
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser))
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('exception', exception)
      blogService.setToken(null)
      setMessage({ text:'wrong login or password', color: 'red', time: 5000 })
    }
  }

  const addBlog = async (blog) => {
    const response = await blogService.create(blog)
    if (!response.error) {
      createNewRef.current.toggleVisible()
      //setBlogs(blogs.concat(response))
      setBlogs( await blogService.getAll() )
      setMessage({ text: `Blog ${response.title} added` , color: 'green', time: 3000 })
    } else {
      setMessage({ text: 'Error creating blog -' +response.error, color: 'red', time: 5000 })
    }
  }

  const addLike = async (blog) => {
    try {
      const response = await blogService.update({ ...blog, likes:blog.likes+1 })
      if (!response.error) {
        setBlogs(blogs.map(  b => b.id===response.id? response: b ) )
      } else {
        setMessage({ text: 'Error updating blog -' +response.error, color: 'red', time: 5000 })
      }
    } catch ( e ) {
      setMessage({ text: 'Error updating blog -' +e, color: 'red', time: 5000 })
    }
  }

  const remove = async (blog) => {
    if ( ! window.confirm(`Remove blog +${blog.title}?`) ) return
    try {
      const response = await blogService.remove(blog)
      if (!response.error) {
        setBlogs(blogs.filter(  b => b.id !== blog.id) )
        setMessage({ text: `blog ${blog.title} removed` , color: 'green', time: 3000 })
      } else {
        setMessage({ text: 'Error deleting blog -' +response.error, color: 'red', time: 5000 })
      }
    } catch ( e ) {
      setMessage({ text: 'Error deleting blog -' +e.response, color: 'red', time: 5000 })
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken(null)
    setUsername('')
    setPassword('')
    window.localStorage.removeItem('loggedUser')
  }

  const loginForm = () => {
    return (
      <LoginForm
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
      />
    )
  }

  return (
    <div>
      <Message message={message} setMessage={setMessage} />
      { user?
        <div>
          <h2>blogs</h2>
          <Logout user={user} handleLogout={handleLogout}/>
          <Togglable buttonLabel='Create new' ref={ createNewRef }>
            <CreateNew addBlog={addBlog} />
          </Togglable>
          {blogs.sort((a,b) => b.likes-a.likes ).map(blog => <Blog key={blog.id} blog={blog} addLike={addLike} remove={remove}/> )}
        </div>
        :
        loginForm()
      }
    </div>
  )
}

export default App