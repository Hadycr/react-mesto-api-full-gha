import {useState} from 'react';
import Header from './Header';
import * as Auth from '../utils/Auth.js';
import {useNavigate } from 'react-router-dom';

function Login(handleLogin) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [formValue, setFormValue] = useState({
  //   email: '',
  //   password: '',
  // })

  function handleChangeEmail(e) {
    setEmail (e.target.value);
  }

  function handleChangePassword(e) {
    setPassword (e.target.value);
  }

  // const navigate = useNavigate(); 

  function handleSubmit(e) {
    
    e.preventDefault();
    handleLogin({email, password})
//     const { email, password } = formValue;

//     Auth.authorize(formValue.email, formValue.password)
  
//     .then((data) => {
//       console.log(data);
//     if (data.jwt){
//         setFormValue({email: '', password: ''});
//         handleLogin();
//         navigate('/', {replace: true});
//     }
//       // нужно проверить, есть ли у данных jwt
//       // сбросьте стейт, затем в колбэке установите
//       // стейт loggedIn родительского App как true,
//       // затем перенаправьте его в /diary
//     })
//     .catch(err => console.log(err));
// }
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