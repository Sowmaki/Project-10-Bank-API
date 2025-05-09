import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer } from "../../components/Footer/Footer";
import { LoginForm } from "../../components/LogInForm/LogInForm";
import { Navbar } from "../../components/Navbar/Navbar";
import "./SignIn.scss";

export const SignIn = () => {
  return (
    <>
      <Navbar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <FontAwesomeIcon icon={faUserCircle} />
          <h1>Sign In</h1>
          <LoginForm />
        </section>
      </main>
      <Footer />
    </>
  )
}