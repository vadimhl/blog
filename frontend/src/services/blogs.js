import axios from 'axios'
import config  from '../utils/config';
let token = null;
axios.defaults.withCredentials = true;
const setToken = ( newToken ) => { token = newToken};
const getAll = () => {
  console.log('get token = ', token);
  if (token) {
    const request = axios.get(config.baseUrl+'/api/blogs', {headers: { Authorization: token },})
    return request.then(response => response.data)
  } else {
    return Promise.resolve([]);
  }
}
const blogService = { getAll, setToken }
export default blogService