import React, { useState } from 'react'
//import blogService from '../services/blogs'

const Blog = ({ blog, addLike, remove }) => {
  const [showDetail, setShowDetail] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //if ( showDetail ) {
  return (
    <div style={blogStyle} className="blog">
      {blog.title} <button onClick = {() => setShowDetail(!showDetail)}>{showDetail?'hide':'show'}</button> <br />
      {blog.author}<br />
      <div style={ { display: showDetail ? '' : 'none' } } >
        {blog.url}<br />
        likes <span className="Likes" >{blog.likes}</span> <button onClick = { () => addLike( blog ) }>like</button> <br />
        blog id {blog.id} <br />
        user id {blog.user.id}<br />
        <button onClick = { () => remove( blog ) }>Remove</button> <br />
      </div>
    </div>
  )
  /* return (
      <div style={blogStyle} className="blog">
        {blog.title} <button onClick = {() => setShowDetail(false)}>hide</button> <br />
        {blog.url} <br />
        likes {blog.likes} <button onClick = { () => addLike( blog ) }>like</button> <br />
        {blog.author}<br />
        blog id {blog.id} <br />
        user id {blog.user.id}<br />
        <button onClick = { () => remove( blog ) }>Remove</button> <br />
      </div>
    )
  } else {
    return (
      <div style={blogStyle} className="blog">
        {blog.title} <button onClick = {() => setShowDetail(true)}>show</button><br />
        {blog.author}
      </div>
    )
  }*/
}

export default Blog