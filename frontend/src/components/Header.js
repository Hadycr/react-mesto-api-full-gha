import React from 'react';
import { Routes, Route, Link} from 'react-router-dom';

function Header({isLogIn, email, userStatus, isRegistrated, pathname, onClick }) {
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className='header__container'>
        {isLogIn ? <p className='header__email'>{email}</p> : ""}
        {/* <button className='header__button button'>{userStatus}</button> */}
        <Link to={pathname} onClick = {onClick} className='header__button button'>{userStatus}</Link>
        {/* <button className='header__button'>{isLogIn ? Выйти : {isRegistrated ? 'Войти' : 'Регистрация'}}</button>  {userStatus}*/}
      </div>
    
{/* const { pathname } = useLocation()
if (pathname === '/sign-in') { ... } */}

    </header>
  )
}

export default Header;