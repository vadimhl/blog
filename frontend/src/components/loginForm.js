import React, { useState } from 'react'
import loginService from '../services/login';


const LoginForm = ({ user, setUser , setMessage}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = async (event) => {
        event.preventDefault();
        //console.log(`login as ${username} with password ${password}.`)
        try {
            const user = await loginService.login({username, password});
            console.log('login user:', user);
            setMessage({text:'logded as'+user.name, color: 'green', time: 3000 });
            setUser(user);
            setUsername('');
            setPassword('');
        } catch (exception) {
            console.log('exception', exception);
            setUser(null);
            setMessage({text:'wrong login or password', color: 'red', time: 5000 });
        }
        
    }
    return <form onSubmit={handleLogin}>
        <div>
            username:
            <input type="text" value={username} name="Username" 
                    onChange = { ({target}) => setUsername(target.value) }
            />
        </div>
        <div>
            password:
            <input type="text" value={password} name="Password" 
                    onChange = { ({target}) => setPassword(target.value) }
            />
        </div>
        <button type="submit">login</button>
    </form>
}

export default LoginForm;
