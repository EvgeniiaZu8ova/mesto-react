import closeIconPath from '../images/close_icon.svg';

function ImagePopup(props) {
  return (
    <section className={props.card ? `popup popup_opened popup_picture` : `popup popup_picture`}>
      <div className="popup__card-container">
        <button type="button" name="closeButton" onClick={props.onClose} className="popup__close-icon popup__close-icon_pic"><img src={closeIconPath} alt="Закрывающий крестик" className="popup__close-image" /></button>
        <img src={props.card.link} alt={props.card.name} className="popup__image" />
        <p className="popup__paragraph">{props.card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;