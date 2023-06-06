function ImagePopup({card, onClose}) {

  return (
    <div className={`popup popup_type_picture ${card? 'popup_opened' : ''}`}>
      <div className="popup__container-photo">
        <button className="popup__closed popup__closed-img button" type="button" onClick={onClose}></button>
        <div className="popup__img">
          <img className="popup__photo" src={card? card.link: ''} alt={card? card.name: ''} name="name"/>
          <h2 className="popup__title-photo" name="link">{card? card.name: ''}</h2>
        </div>
      </div>
    </div>
  )
}

export default ImagePopup;