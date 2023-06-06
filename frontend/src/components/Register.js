import {useState} from 'react';
import Header from './Header';
import { Link } from 'react-router-dom';

function Register({handleRegistration}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  function handleChangeEmail(e) {
    setEmail (e.target.value);
  }

  function handleChangePassword(e) {
    setPassword (e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleRegistration({email, password})
  }

  return (
    <>
    <Header
      userStatus = 'Войти'
      pathname = "/sign-in"
    />
    <div className="login">  
      <div className='login__container'>
        <p className="login__title">Регистрация</p>
        <form className="login__form" onSubmit ={handleSubmit}>
          <input  className="login__input" placeholder="Email" id="email" type="text" name="email" value={email} 
            onChange={ handleChangeEmail } required/>
          <input className="login__input" placeholder="Пароль" id="password" name="password" type="password" value={password} 
            onChange={ handleChangePassword } required/>
          <button type="submit" className="login__link button">Зарегистрироваться</button>
          <div className="login__info">
            <p>Уже зарегистрированы?</p>
            <Link to="/sign-in" className="login__info">Войти</Link>
          </div>
        </form>
      </div>  
    </div>
    </>
  )
}

export default Register