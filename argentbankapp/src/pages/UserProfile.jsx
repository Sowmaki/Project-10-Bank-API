import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

export const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token); // Récupérer le token depuis Redux
  const user = useSelector((state) => state.user.user); // Récupérer l'utilisateur depuis Redux
  // ✅ Ajout d'un état pour éviter une redirection immédiate
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!token) {
        console.log("Token non trouvé, redirection vers login...");
        navigate('/user/login');
      }
      setLoading(false);
    };

    setTimeout(checkAuth, 200); // 🔹 Laisse le temps à Redux de charger les valeurs
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    alert('Vous allez être déconnecté.e.')
    navigate('/user/login');
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  return (
    <>
      <div>
        <h1>Profil de l'utilisateur</h1>
        {user ? (
          <div>
            <p>Nom : {user.firstName}</p>
            <p>Prénom : {user.lastName}</p>
          </div>
        ) : (
          <p>Chargement du profil...</p>
        )}
        <button onClick={handleLogout}>Retourn vers page login</button>
      </div>
    </>
  )
}