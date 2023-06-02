function PopupWithForm({name, title, submit, children, isOpen, onClose, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__closed button" type="button" onClick={onClose}></button>
        <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form-${name}`} name={name} onSubmit ={onSubmit}>
          {children}
          <button className="popup__save button" type="submit">{submit}</button>
        </form> 
      </div>
    </div>
  )
}

export default PopupWithForm;