import {useState, useEffect, useContext } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName (e.target.value);
  }

  function handleChangeDescription (e) {
    setDescription (e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm name="description" title="Редактировать профиль" submit="Сохранить"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={handleSubmit}>
      <label className="popup__label">
        <input className="popup__input popup__input-name popup__input_type_name" id="username" value={name||""} 
          onChange={ handleChangeName }
          placeholder="Имя" type="text" name="name" minLength="2" maxLength="40" required/>
        <span className="username-error popup__error"></span>
      </label>
      <label className="popup__label">
        <input className="popup__input popup__input-profession popup__input_type_profession" id="profession" value={ description } 
          onChange={ handleChangeDescription }
          placeholder="Описание" name="about" minLength="2" maxLength="200" required/>
        <span className="profession-error popup__error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup
