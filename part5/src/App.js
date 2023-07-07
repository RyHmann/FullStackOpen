import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogsappUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } finally {
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogsappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      newBlog.user = { user: user.name, username: user.username }
      setBlogs(blogs.concat(newBlog))
      setNotificationMessage(`${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (error) {
      console.log(error.message)
    }
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogObject)
      updatedBlog.user = { user: user.name, username: user.username }
      setBlogs(blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog).sort((a, b) => b.likes - a.likes))
    } catch (error) {
      console.log(error.message)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)
      setBlogs(blogs.filter(blog => blog.id !== blogId))
    } catch (error) {
      console.log(error.message)
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <Notification message={notificationMessage}/>
        <form onSubmit = {handleLogin}>
          <div>
        Username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
        password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={ ({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  if (!user) {
    return loginForm()
  } else {
    return (
      <div>
        <Notification message={notificationMessage}/>
        <h2>blogs</h2>
        <div>
          {user.username} logged in<button onClick={handleLogout}>Logout</button>
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} likeBlog={updateBlog} deleteBlog={deleteBlog}/>
        )}
        <Togglable buttonLabel="Add blog">
          <BlogForm createBlog={addBlog}/>
        </Togglable>
      </div>
    )
  }
}



export default App