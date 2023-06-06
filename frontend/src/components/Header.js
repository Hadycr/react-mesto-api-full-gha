import React from 'react';
import { Link} from 'react-router-dom';

function Header({isLogIn, email, userStatus, pathname, onClick }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className='header__container'>
        {isLogIn ? <p className='header__email'>{email}</p> : ""}
        <Link to={pathname} onClick = {onClick} className='header__button button'>{userStatus}</Link>
      </div>
    </header>
  )
}

export default Header;