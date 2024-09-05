import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  let isAuthenticated = false;
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
          Coins
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
          Publish blog
        </NavLink>

        {isAuthenticated ? (
          <div>
            <NavLink to='/'>
              <button className='signOut'>sign out</button>
            </NavLink>
          </div>
        ) : (
          <div>
            <NavLink
              to='sign-in'
              className={({ isActive }) =>
                isActive ? "activeStyle" : "inActiveStyle"
              }
            >
              <button className='logInButton'>sign in</button>
            </NavLink>
            <NavLink
              to='sign-up'
              className={({ isActive }) =>
                isActive ? "activeStyle" : "inActiveStyle"
              }
            >
              <button className='logOutButton'>sign up</button>
            </NavLink>
          </div>
        )}
      </nav>
      <div className='seperator'></div>
    </>
  );
}
export default Navbar;
