import {useState} from 'react';
import Header from './Header';
import * as Auth from '../utils/Auth.js';
import {useNavigate, Link } from 'react-router-dom';


// function Register({onStatus, onRegister}) {
  function Register({handleRegistration}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [isRegistrated, setIsRegistrated] = useState(false);
  
  const navigate = useNavigate(); 

  // const handleChange = (e) => {
  //   const {name, value} = e.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value
  //   });
  // }
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


//   function handleSubmit(e) {
//     e.preventDefault()
//     const { email, password } = formValue;
//     Auth.register(email, password)
//     .then((data) => {
//       console.log(data);
//       if(data !== undefined) {
//         onStatus(successImg);
//         onRegister()
//         navigate('/sign-in', {replace: true})
//       } else {
//         onStatus(failureImg);
//         onRegister();
//       }
//     })
//     .catch((err) => console.log(err));
// };



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
            <Link to="/sign-in" className="login__info-link">Войти</Link>
          </div>
{/*           
          <p>Уже зарегистрированы?</p>
          <Link to="login" className="register__login-link">Войти</Link>
          <p className="login__info">Уже зарегистрированы? Войти</p> */}
        </form>
      </div>  
    </div>
    </>
  )

}

export default Register