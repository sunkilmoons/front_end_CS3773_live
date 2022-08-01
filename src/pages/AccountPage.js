import "../styles/Login.css";
import "../styles/AccountPage.css";
import { Link } from 'react-router-dom'

export const AccountPage = () => {
 
  return (
    <div className="AccountPage">
      
      <div className="Login">
      
      <form>
        <h1>Sign-In</h1>   
          <h5 >Email</h5>
          <input type='text'
           placeholder="Email Address"
           autoComplete="on"/>

          <h5>Password</h5>
          <input type="password"
          placeholder="Password"/>

          <button  className="Login_SignIn">Sign In</button>
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


  