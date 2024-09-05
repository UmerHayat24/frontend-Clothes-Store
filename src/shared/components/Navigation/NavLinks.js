
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';
import Avatar from '../UIElements/Avatar';

const NavLinks = props => {
  const auth = useContext(AuthContext);

  return (
    <ul className="navi-links">
      {!auth.isLoggedIn && <li>
      <NavLink to="/" exact>HOME</NavLink>

      </li> }
      
      {auth.isLoggedIn && (
        <li>
        <NavLink to={`/${auth.userId}/dresses`}>COLLECTION</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
      <NavLink to="/dresses/new">NEW DRESS</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <img src={auth.imgId} alt="User"/>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
