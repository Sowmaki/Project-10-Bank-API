import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { logout, updateUserProfile } from "../redux/userSlice";

export const UserProfile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);
  // Ajout d'un état pour éviter une redirection immédiate
  const [loading, setLoading] = useState(true);

  const [nameEdition, setNameEdition] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    const checkAuth = () => {
      if (!token) {
        console.log("Token non trouvé, redirection vers login...");
        navigate('/user/login');
      }
      setLoading(false);
    };

    setTimeout(checkAuth, 200); // Laisse le temps à Redux de charger les valeurs
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    alert('Vous allez être déconnecté.e.')
    navigate('/user/login');
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  const handleEditName = async (e) => {
    e.preventDefault()

    setIsUpdating(true); //Facultatif: permet au bouton save d'être desactivé: GOOD UX PRACTICE!
    try {
      await dispatch(updateUserProfile({ firstName, lastName, token })).unwrap();
      // unwrap permet d'’extraire directement la valeur retournée par createAsyncThunk.
      //Si la requête échoue, une erreur est levée (ce qui permet d’aller dans le catch).
      alert("Profil mis à jour avec succès ! 🎉");
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
    }
    setIsUpdating(false);
    setNameEdition(false)
  }

  return (
    <>
      <Navbar />
      {user ? (<main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{firstName} {lastName}</h1>
          {
            !nameEdition ?
              (
                <div className="account__edition">
                  <button className="edit-button" onClick={() => setNameEdition(!nameEdition)}>Edit Name</button>
                </div>
              ) : (
                <div className="account__edition">
                  <form action="POST" className="account__edition-form">
                    <fieldset className="account__edition-form__inputs">
                      <input type="text" name="firstname" id="edit-firstname-input" placeholder={user.firstName} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      <input type="text" name="lastname" id="edit-lastname-input" placeholder={user.lastName} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </fieldset>
                    <div className="account__edition-form__buttons">
                      <button className="account__edition-form__button" onClick={handleEditName} disabled={isUpdating ? true : false}>Save</button>
                      <button className="account__edition-form__button" onClick={() => setNameEdition(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              )
          }
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
      ) : (
        <p>Chargement du profil...</p>
      )}

      <button onClick={handleLogout}>Retourn vers page login</button>

      <Footer />
    </>
  )
}