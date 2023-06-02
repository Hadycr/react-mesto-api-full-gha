import {useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import {api} from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import * as Auth from '../utils/Auth.js';
import successImg from '../img/success.svg';
import failureImg from '../img/fail.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setСurrentUser] = useState({
    about:"",
    avatar:"",
    name:"",
  });
  const [cards, setCards] = useState([]);
  const [isLogIn, setisLogIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isRegistrated, setIsRegistrated] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [statusInfoTooltip, setstatusInfoTooltip] = useState(false);
  const [infoTooltipImage, setInfoTooltipImage] = useState("");
  const [popupTitle, setPopupTitle] = useState("");
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;
  const navigate = useNavigate();

  // const [formValue, setFormValue] = useState({
  //   email: '',
  //   password: '',
  // });

  // const handleChangeFormValue = (e) => {
  //   const { name, value } = e.target;

  //   setFormValue({
  //     ...formValue,
  //     [name]: value,
  //   });
  // };



  useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setСurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  useEffect(() => {
    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }, []);

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  useEffect(() => {
    // настало время проверить токен
  tokenCheck();
  }, [])

function tokenCheck() {

  if (localStorage.getItem('jwt')){
    const jwt = localStorage.getItem('jwt');

    if (jwt){
      // проверим токен
              Auth.checkToken(jwt).then((res) => {
          if (res){
            // const userData = {
            //   username: res.username,
            //   email: res.email
            
                      // авторизуем пользователя
                      setisLogIn(true);
                      // setUserData(userData)
            navigate("/", {replace: true})
          }
        });
    }
  } 
}

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
 
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card)
  }
  
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((res) => {
        setCards((cardDel) => cardDel.filter((item  => item._id  !== card._id)))
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateUser(currentUser) {
    api.editUserInfo(currentUser)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

  function handleUpdateAvatar(newAvatar) {
    api.editAvatar(newAvatar)
      .then((data) => {
        setСurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
  
  function handleAddPlaceSubmit(newCard) {
    api.addCard(newCard)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups()
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }

function handleLogin({email, password}) {
  Auth.authorize({email, password})
  
    .then((data) => {
      console.log(data);
    if (data.jwt){
        // setFormValue({email: '', password: ''});
        // handleLogin();
        navigate('/', {replace: true});
    }
      // нужно проверить, есть ли у данных jwt
      // сбросьте стейт, затем в колбэке установите
      // стейт loggedIn родительского App как true,
      // затем перенаправьте его в /diary
    })
    .catch(() => {
      setInfoTooltipImage(failureImg);
          setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.");
          handleRegister()
})
}

function handleRegister() {
  setIsInfoTooltipOpen(!isInfoTooltipOpen);
}


function handleRegistration({email, password}) {
    
      Auth.register({email, password})
      .then((data) => {
        console.log(data);
        if(data !== undefined) {
          setInfoTooltipImage(successImg);
          setPopupTitle("Вы успешно зарегистрировались!")
          navigate('/sign-in', {replace: true})
        } else {
          setInfoTooltipImage(failureImg);
          setPopupTitle("Что-то пошло не так! Попробуйте ещё раз.")
        }
      })
      .catch((err) => console.log(err))
      .finally(
        handleRegister()
    );
  }
  
  return (
    <div className="page">
      <div className="page__container">
      
        
        <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path="/sign-up" element={<Register 
            handleRegistration = {handleRegistration}
         
          />}
        //  onStatus={setInfoTooltipImage}
        //   onRegister={setPopupTitle}
          />
          <Route path="/sign-in" element={<Login 
          handleLogin={handleLogin} />}/>
          <Route path="/" element={<ProtectedRoute 
            path="/"
            loggedIn = {isLogIn}
            component={
            <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
              email={email}
            />}
            />
          }
            />
        </Routes>
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser ={ handleUpdateUser }/>
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace  ={ handleAddPlaceSubmit }/>
            <PopupWithForm name="delete" title="Вы уверены?" submit="Да"/>
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar ={ handleUpdateAvatar }/>  
            <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
          
        </CurrentUserContext.Provider>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          img={infoTooltipImage}
          info={popupTitle}
        />
      </div>
    </div>
  );
}

export default App;
