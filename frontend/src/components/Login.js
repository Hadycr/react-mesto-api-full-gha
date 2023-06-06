import {useState} from 'react';
import Header from './Header';

function Login({handleLogin}) {
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
    handleLogin({email, password})
  }

  return (
    <>
    <Header 
      userStatus = "Регистрация"
      pathname = "/sign-up"
    />
    <div className="login">
      <div className='login__container'>
        <p className="login__title">Вход</p>
        <form className="login__form" onSubmit ={handleSubmit} noValidate>
          <input  className="login__input" placeholder="Email" id="email" type="text" name="email" value={email} 
            onChange={ handleChangeEmail } required/>
          <input className="login__input" placeholder="Пароль" id="password" name="password" type="password" value={password} 
            onChange={ handleChangePassword } required/>
          <button type="submit" className="login__link button">Войти</button>
        </form>
      </div>  
    </div>
    </>
  )
}

export default Login