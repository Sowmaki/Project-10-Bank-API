import { useState } from "react"
import { useDispatch } from "react-redux"

export const LoginForm = () => {

  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const handleLoginEvent = (e) => {
    e.preventDefault();
    // let userCredentials = {
    //   email, password
    // }
    // dispatch(loginUser(userCredentials))

  }

  return (
    <form action={'POST'} onSubmit={handleLoginEvent}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" />
        <label htmlFor="remember-me"
        >Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">Sign In</button>
    </form>
  )
}