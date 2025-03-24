import { faRightFromBracket, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/argentBankLogo.png';
import "./Navbar.scss";

export const Navbar = () => {

  const user = useSelector((state) => state.user.user)
  const location = useLocation()

  return (
    <nav className="navbar">
      <Link className="navbar__logo" to="/">
        <img
          className="navbar__logo__image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {
          location.pathname === "/user/profile" && user ? (
            <div className='navbar__items'>
              <Link className="navbar__items__item" to="/user/login">
                <FontAwesomeIcon icon={faUserCircle} color="#2C3E50" className="navbar__items__item--icon" /><span className="navbar__items__item--text">{user.firstName}</span>
              </Link>
              <Link className="navbar__items__item" to="/user/login">
                <FontAwesomeIcon icon={faRightFromBracket} color="#4C5C6B" className="navbar__items__item--icon" /><span className="navbar__items__item--text">Sign Out</span>
              </Link>
            </div>
          ) : (
            <Link className="navbar__items__item" to="/user/login">
              <FontAwesomeIcon icon={faUserCircle} color="#2C3E50" className="navbar__items__item--icon" /><span className="navbar__items__item--text">Sign in</span>
            </Link>
          )
        }

      </div>
    </nav>
  )
}