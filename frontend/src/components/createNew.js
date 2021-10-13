import React, {useState}  from "react";

const CreateNew = ( {addBlog} ) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl ]= useState('');

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
        event.preventDefault();
        addBlog({ title, author, url});
    }
    return (
        <form onSubmit={handleCreate} >
            <div>
                title:<input type="text" value={title} name="title" onChange={titleChange}/>
            </div>
            <div>
                author:<input type="text" value={author} name="author" onChange={authorChange} />
            </div>
            <div>
                url:<input type="text" value={url} name="url"  onChange={urlChange}/>
            </div>

            <button type="submit">Create</button>
        </form>
    )
}

export default CreateNew;