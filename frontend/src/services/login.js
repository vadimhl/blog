import axios from 'axios'
import config  from '../utils/config';

axios.defaults.withCredentials = true;

const login = async credentials => {
    const response = await axios.post( config.baseUrl+'/api/login', credentials);
    return response.data;
}
const loginService = {login};
export default  loginService ;