import '../styles/Login.css'
import '../styles/AccountPage.css'
import { useState } from 'react'
import { useDatabase } from '../hooks'
import { Link } from 'react-router-dom'

export const AccountPage = () => {
  const [state, dispatch] = useDatabase()
  const [email, setUsername] = useState('')
  const [password, setPassword] = useState('')

  if (state.loggedInUser)
    return (
      <div
        style={{
          display: 'flex',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <button onClick={() => dispatch({ type: 'sign out' })}>sign out</button>
      </div>
    )

  return (
    <div className="AccountPage">
      <div className="Login">
        <form>
          <h1>Sign-In</h1>
          {state.errorMessage && <h3>{state.errorMessage}</h3>}
          <h5>Username</h5>
          <input
            type="text"
            placeholder="Username"
            autoComplete="on"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            onClick={() =>
              dispatch({
                type: 'login',
                payload: {
                  username: email,
                  password: password,
                },
              })
            }
            className="Login_SignIn"
          >
            Sign In
          </button>
        </form>
        <p>
          Don’t have an account?
          <Link to="/register">Create an account here</Link>
        </p>
      </div>
    </div>
  )
}
