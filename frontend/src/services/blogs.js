import axios from 'axios'
import config  from '../utils/config';

axios.defaults.withCredentials = true;
const getAll = () => {
  const request = axios.get(config.baseUrl+'/api/blogs')
  return request.then(response => response.data)
}
const blogService = { getAll }
export default blogService