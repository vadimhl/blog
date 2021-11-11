import React, { useState }  from 'react'

const CreateNew = ( { addBlog } ) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl ]= useState('')

  const titleChange = (event) => {
    setTitle(event.target.value)
  }

  const authorChange = (event) => {
    setAuthor(event.target.value)
  }

  const urlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreate = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
  }
  
  return (
    <div className="formDiv">
      <form onSubmit={handleCreate} >
        <div>
          title:<input id="title" type="text" value={title} name="title" onChange={titleChange}/>
        </div>
        <div>
          author:<input id="author" type="text" value={author} name="author" onChange={authorChange} />
        </div>
        <div>
          url:<input id="url" type="text" value={url} name="url"  onChange={urlChange}/>
        </div>
        <button  type="submit" id="create-button">Create</button>
      </form>
    </div>
  )
}

export default CreateNew