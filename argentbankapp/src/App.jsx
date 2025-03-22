import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import './App.css'
import { Erreur } from './pages/Error'
import { Home } from './pages/Home'
import { SignIn } from './pages/SignIn'
import { UserProfile } from './pages/UserProfile'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user/login" element={<SignIn />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="*" element={<Erreur />} />
      </Routes>
    </Router>
  )
}

export default App
