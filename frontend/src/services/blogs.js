import axios from 'axios'
const baseUrl = 'https://3001-copper-peacock-recgkxr0.ws-eu18.gitpod.io/api/blogs'

axios.defaults.withCredentials = true;
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const blogService = { getAll }
export default blogService