import "../styles/Register.css";
import "../styles/RegistrationPage.css";
import { Link } from 'react-router-dom'

export const RegistrationPage = () => {
  

  return (
    <div className="RegistrationPage">
      
      <div className="Register">
      
      <form>
        <h1>Create an account</h1>
          
          <h5 >Email</h5>
          <input type='text'
          placeholder="Email Address"/>

          <h5>Password</h5>
          <input type='password'
          placeholder="Password"/>

          <h5>Re-Enter Password</h5>
          <input type='password'
          placeholder="Re-Enter Password"/>

          <button  className="Register_Button">Create</button>

      </form>
      <p>
        Already have an account? 
      <Link to="/account">
       Sign In
      </Link>
        </p>
      </div>
    </div>
  );
}