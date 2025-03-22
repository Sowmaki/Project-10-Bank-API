import { Footer } from "../components/Footer"
import { LoginForm } from "../components/LogInForm"
import { Navbar } from "../components/Navbar"

export const SignIn = () => {
  return (
    <>
      <Navbar />
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <LoginForm />
      </section>
      <Footer />
    </>
  )
}