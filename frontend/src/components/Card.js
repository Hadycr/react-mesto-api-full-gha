import {useContext } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  function handleClick() {
    onCardClick(card);
  }  

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (
    `element__like button ${isLiked && 'element__like_dark'}`
  );

  return (
    <div className="element__item">
      <img className="element__img" src={card.link} alt={card.name} onClick={handleClick}/>
      {isOwn && <button className="element__trash button" onClick={handleDeleteClick} type="button"/>}
      <div className="element__description">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="element__count">{card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;