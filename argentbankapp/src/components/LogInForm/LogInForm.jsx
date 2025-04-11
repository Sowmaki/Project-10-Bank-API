import axios from 'axios'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from '../../redux/userSlice'
import { API_LOGIN_URL, API_PROFILE_URL } from "../../utils/api"
import { setStoredUser } from '../../utils/storedUser'
import "./LoginForm.scss"

export const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        API_LOGIN_URL,
        { email, password });

      const { token } = response.data.body;

      const userResponse = await axios.post(
        API_PROFILE_URL,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user = userResponse.data.body;

      dispatch(setUser({ token, user, rememberMe }));
      rememberMe && setStoredUser(token, user, rememberMe)

      navigate('/user/profile');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert('Identifiants invalides, veuillez réessayer.');
    }

  };

  return (
    <form className="login-form" action={'POST'} onSubmit={handleLogin}>
      <div className="login-form__input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="login-form__input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="login-form__input-remember">
        <input type="checkbox" id="remember-me" onChange={() => setRememberMe(!rememberMe)} />
        <label htmlFor="remember-me"
        >Remember me</label>
      </div>
      <button type="submit" className="login-form__sign-in-button">Sign In</button>
    </form>
  )
}