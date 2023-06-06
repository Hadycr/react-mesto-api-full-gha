import {useContext } from 'react';
import pen from '../img/pen.svg';
import plus from '../img/plus.svg';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards, email, isLogIn, onClick}) {
  const user = useContext(CurrentUserContext);

  return (
    <>
      <Header 
        userStatus = 'Выйти'
        pathname = "/sign-in"
        email = {email}
        isLogIn = {isLogIn}
        onClick ={onClick}
      />
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button className="profile__avatar-edit-button" type="button" onClick={onEditAvatar}>
            <img className="profile__avatar" src={user.avatar} alt="Аватар"/>
          </button>
          <div className="profile__profile-info">
            <h1 className="profile__name">{user.name}</h1>
            <button className="profile__button button" onClick={onEditProfile} type="button">
              <img className="profile__pen" src={pen} alt="Кнопка редактирования"/></button>
            <p className="profile__description">{user.about}</p>
          </div>
        </div>
        <button className="profile__add-button button" onClick={onAddPlace} type="button">
          <img className="profile__plus" src={plus} alt="Кнопка добавления"/></button> 
      </section>
      <section className="elements">
        <div className="elements__items">
          {cards.map((card) =>  (
            <Card 
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />)
          )}
        </div>     
      </section>   
    </main>
    </>
  )
}

export default Main;

