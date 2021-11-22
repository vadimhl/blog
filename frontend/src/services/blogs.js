import axios from 'axios'
import config  from '../utils/config'

let token = null
axios.defaults.withCredentials = true

const setToken = ( newToken ) => { token =  `bearer ${newToken}`}
const getAll = async () => {
  //console.log('get token = ', token);
  if (token) {
    const response = await axios.get(config.baseUrl+'/api/blogs', { headers: { Authorization: token }, })
    return response.data
  } else {
    return []
  }
}

const create = async (blog) => {
  try {
    const response = await axios.post(config.baseUrl+'/api/blogs', blog, { headers: { Authorization: token } })
    //console.log('post ok:', response.data)
    return response.data
  } catch (exception){
    //console.log('post err:', exception.response.data)
    return exception.response.data
  }
}

const like = async (blog) => {
  try {
    const response = await axios.put(config.baseUrl+'/api/blogs/like/'+blog.id)
    //console.log('put like ok:', response.data)
    return response.data
  } catch (exception){
    //console.log('put like err:', exception.response.data)
    return exception.response.data
  }
}

const update = async (blog) => {
  try {
    const response = await axios.put(config.baseUrl+'/api/blogs/'+blog.id, blog, { headers: { Authorization: token } })
    //console.log('put ok:', response.data)
    return response.data
  } catch (exception){
    //console.log('post err:', exception.response.data)
    return exception.response.data
  }
}

const remove = async (blog) => {
  try {
    const response = await axios.delete(config.baseUrl+'/api/blogs/'+blog.id,  { headers: { Authorization: token } })
    //console.log('delete ok:', response.data)
    return response.data
  } catch (exception){
    //console.log('deletet err:', exception.response.data)
    return exception.response.data
  }
}

const blogService = { getAll, create, setToken, update, remove, like }

export default blogService