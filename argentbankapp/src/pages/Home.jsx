import '../assets/img/icon-chat.png';
import iconChat from "../assets/img/icon-chat.png";
import iconMoney from "../assets/img/icon-money.png";
import iconSecurity from "../assets/img/icon-security.png";
import { Feature } from "../components/Feature";
import { Footer } from '../components/Footer';
import { Navbar } from "../components/Navbar";
import "./Home.scss";

export const Home = () => {
  return (
    <>
      <Navbar />
      <main className='home'>
        <div className="home__hero">
          <section className="home__hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <p className="subtitle">No fees.</p>
            <p className="subtitle">No minimum deposit.</p>
            <p className="subtitle">High interest rates.</p>
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="home__features">
          <Feature img={iconChat} title={"You are our #1 priority"} text={"Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."} />
          <Feature img={iconMoney} title={"More savings means higher rates"} text={"The more you save with us, the higher your interest rate will be!"} />
          <Feature img={iconSecurity} title={"Security you can trust"} text={"We use top of the line encryption to make sure your data and money is always safe."} />
        </section>
      </main>
      <Footer />
    </>
  )
}