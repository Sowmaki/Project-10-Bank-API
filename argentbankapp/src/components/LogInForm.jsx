import axios from 'axios'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setUser } from '../redux/userSlice'
import { API_LOGIN_URL, API_PROFILE_URL } from "../services/api"

export const LoginForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envoi de la requête POST pour la connexion
      const response = await axios.post(API_LOGIN_URL, {
        email,
        password,
      });

      // Récupérer le token de la réponse
      const { token } = response.data.body; // Le token est renvoyé dans la réponse
      console.log({ token });

      //Récupérer les informations de l'utilisateur
      const userResponse = await axios.post(
        API_PROFILE_URL,
        {}, // Pas besoin de body, car les infos sont dans le token
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const user = userResponse.data.body;

      console.log("Stockage dans Redux avec rememberMe =", rememberMe);
      console.log("Données envoyées :", { token, user, rememberMe });

      // ✅ Stockage dans Redux et éventuellement `localStorage`
      dispatch(setUser({ token, user, rememberMe }));

      // Rediriger vers la page de profil après connexion
      navigate('/user/profile'); // Redirige vers la page du profil
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert('Identifiants invalides, veuillez réessayer.');
    }

  };

  return (
    <form action={'POST'} onSubmit={handleLogin}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" name="emailInput" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="passwordInput" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" onChange={() => setRememberMe(!rememberMe)} />
        <label htmlFor="remember-me"
        >Remember me</label>
      </div>
      <button type="submit" className="sign-in-button">Sign In</button>
    </form>
  )
}