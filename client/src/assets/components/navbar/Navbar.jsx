import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <>
      <nav className='navbar'>
        <NavLink to='/' className='logo'>
          CryptoLogo
        </NavLink>
        <NavLink
          to='/'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inActiveStyle"
          }
        >
          Home
        </NavLink>
        <NavLink
          to='/crypto'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inActiveStyle"
          }
        >
          Crypto Currencies
        </NavLink>
        <NavLink
          to='/blog'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inActiveStyle"
          }
        >
          blogs
        </NavLink>
        <NavLink
          to='/submit'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inActiveStyle"
          }
        >
          Submit a blog
        </NavLink>
        <NavLink
          to='sign-in'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inActiveStyle"
          }
        >
          sign in
        </NavLink>
        <NavLink
          to='sign-up'
          className={({ isActive }) =>
            isActive ? "activeStyle" : "inActiveStyle"
          }
        >
          sign up
        </NavLink>
      </nav>
    </>
  );
}
export default Navbar;
