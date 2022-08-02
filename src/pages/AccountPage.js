import "../styles/Login.css";
import "../styles/AccountPage.css";
import { useState } from "react";
import { useDatabase } from '../hooks'
import { Link } from 'react-router-dom'


export const AccountPage = () => {
  
  const [ state, dispatch] = useDatabase()
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  
  return (
    <div className="AccountPage">
      
      <div className="Login">
      
      <form>
        <h1>Sign-In</h1>   
          <h5 >Email</h5>
          <input type='text'
           placeholder="Email Address"
           autoComplete="on"
           value={email}
           onChange={e => setUsername(e.target.value)}/>

          <h5>Password</h5>
          <input type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}/>

          <button  
          type='submit'
          onClick={() =>
            dispatch({
              type: 'login' , payload:{
                username: email ,
                password: password
              }
            })
          }
          className="Login_SignIn">Sign In</button>
      </form>
      <p>
      Don’t have an account?
      <Link to="/register">
      Create an account here
      </Link>
        </p>
      </div>
    </div>
  );
}


  