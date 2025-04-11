import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "../../components/Account/Account";
import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";
import { updateUserProfile } from "../../redux/userSlice";
import "./UserProfile.scss";

export const UserProfile = () => {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user.user);

  const [nameEdition, setNameEdition] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [isUpdating, setIsUpdating] = useState(false)


  const handleEditName = async (e) => {
    e.preventDefault()

    setIsUpdating(true); //Facultatif: permet au bouton save d'être desactivé.
    try {
      await dispatch(updateUserProfile({ firstName, lastName, token })).unwrap()
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
      {user ? (<main className="userProfile main bg-dark">
        <div className="userProfile__header">
          <h1>Welcome back<br />{firstName} {lastName}!</h1>
          {
            !nameEdition ?
              (
                <div className="userProfile-edition">
                  <button className="edit-button" onClick={() => setNameEdition(!nameEdition)}>Edit Name</button>
                </div>
              )
              :
              (
                <div className="userProfile-edition">
                  <form action="POST" className="userProfile-edition__form">
                    <fieldset className="userProfile-edition__form__inputs">
                      <input type="text" name="firstname" id="edit-firstname-input" placeholder={user.firstName} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                      <input type="text" name="lastname" id="edit-lastname-input" placeholder={user.lastName} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </fieldset>
                    <div className="userProfile-edition__form__buttons">
                      <button className="userProfile-edition__form__button button" onClick={handleEditName} disabled={isUpdating ? true : false}>Save</button>
                      <button className="userProfile-edition__form__button button" onClick={() => setNameEdition(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              )
          }
        </div>
        <h2 className="sr-only">Accounts</h2>
        <div className="accounts-wrapper">
          <Account title={"Argent Bank Checking (x8349)"} amount={"2,082.79"} amountDescription={"Available Balance"} />
          <Account title={"Argent Bank Savings (x6712)"} amount={"10,928.42"} amountDescription={"Available Balance"} />
          <Account title={"Argent Bank Credit Card (x8349)"} amount={"184.30"} amountDescription={"Current Balance"} />
        </div>
      </main>
      ) : (
        <p>Chargement du profil...</p>
      )}
      <Footer />
    </>
  )
}