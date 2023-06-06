function InfoTooltip({isOpen, img, info, onClose}) {
  return (
    <div className={`popup popup__infotooltip ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__closed button" type="button" onClick={onClose}></button>
        <img className="popup__infotooltip_img" src={img} alt={info} />
        <p className="popup__infotooltip_info">{info}</p>
      </div>
    </div>
  )
}

export default InfoTooltip