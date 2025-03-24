import { useSelector } from "react-redux"
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import './App.scss'
import { Erreur } from './pages/Error/Error'
import { Home } from './pages/Home/Home'
import { SignIn } from './pages/SignIn/SignIn'
import { UserProfile } from "./pages/UserProfile/UserProfile"

function App() {
  const token = useSelector((state) => state.user.token)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<SignIn />} />
        <Route path="/user/profile" element={token ? <UserProfile /> : <Navigate to="/user/login" />} />
        <Route path="*" element={<Erreur />} />
      </Routes>
    </Router>
  )
}

export default App
