import {useState, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup ({isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
 
  function handleChangeName(e) {
    setName (e.target.value);
  }
  function handleChangePlace (e) {
    setPlace (e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace ({
      name,
      link: place,
    });
  }

  useEffect(() => {
    setName('');
    setPlace('');
  }, [isOpen]);

  return (
    <PopupWithForm name="place" title="Новое место" submit="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <label className="popup__label">
        <input className="popup__input popup__input-title popup__input_type_name" id="title"
          placeholder="Название" type="text" name="name" minLength="2" maxLength="30" value={name||""}
          onChange={ handleChangeName } required/>
        <span className="title-error popup__error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__input popup__input-link popup__input_type_profession" id="description"
          placeholder="Ссылка на картинку" name="link" type="url" value={place}
          onChange={ handleChangePlace } required/>
        <span className="description-error popup__error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup