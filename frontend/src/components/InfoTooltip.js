import {useState} from 'react';


function InfoTooltip({isOpen, img, info, onClose}) {
  // let messageClassName = "popup__info-message"
  // if({isOpen}) {
  //   messageClassName += message.isSucess ? '...' : '...'

  // }
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  
  // function handleChangeEmail(e) {
  //   setEmail (e.target.value);
  // }

  // function handleChangePassword(e) {
  //   setPassword (e.target.value);
  // }

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