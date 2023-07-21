import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLike = () => {
    likeBlog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id: blog.id
    })
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        deleteBlog(blog.id)
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  return(
    <div style={blogStyle} className='blog-container'>
      <div style={hideWhenVisible} className='blog'>
        {blog.title} {blog.author}<button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='blog-data'>
        <div>{blog.title} {blog.author}<button onClick={toggleVisibility}>hide</button></div>
        <div>{blog.url}</div>
        <div id='likes'>{blog.likes} <button id='like-button' onClick={handleLike}>like</button></div>
        <div>{blog.user.username}</div>
        {blog.user.username === user && (
          <button onClick={handleDelete}>remove</button>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog