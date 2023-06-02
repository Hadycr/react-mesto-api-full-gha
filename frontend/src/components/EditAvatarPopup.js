import {useRef, useEffect} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar }) {
  const avatar = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: `${avatar.current.value}`
    });
  }
  
  useEffect(() => {
    avatar.current.value = ""
  }, [isOpen]);

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" submit="Сохранить"
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={handleSubmit}>
      <input className="popup__input popup__input-link popup__input_type_avatar" id="avatar"
         ref={ avatar }  placeholder="Ссылка на аватар" name="avatar" type="url" required/>
      <span className="avatar-error popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
