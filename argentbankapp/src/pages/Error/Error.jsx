import { Footer } from "../../components/Footer/Footer";
import { Navbar } from "../../components/Navbar/Navbar";

export const Erreur = () => {
  return (
    <>
      <Navbar />
      <h1 className="erreur-title">
        Oups...
      </h1>
      <h2 className="erreur-subtitle">
        La page que vous demandez n'existe pas
      </h2>
      <Footer />
    </>
  )
}