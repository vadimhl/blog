import React, {useState} from 'react'


const Blog = ({blog}) => {
  const [showDetail, setShowDetail] = useState(false);
  const like = () => {console.log(blog.user)};
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if ( showDetail ) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick = {() => setShowDetail(false)}>hide</button> <br /> 
        {blog.url} <br /> 
        likes {blog.likes} <button onClick = {like}>like</button> <br /> 
        {blog.author}<br /> 
        blog id {blog.id} <br /> 
        user id {blog.user.id}<br /> 
      </div>  
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick = {() => setShowDetail(true)}>show</button>
      </div>  
    )

  }
}

export default Blog