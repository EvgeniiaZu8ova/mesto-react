import React from 'react';

import closeIconPath from '../images/close_icon.svg';

function ImagePopup(props) {
  const { card, onClose } = props;

  return (
    <section className={`popup popup_picture ${card.link && 'popup_opened'}`}>
      <div className="popup__card-container">
        <button type="button" name="closeButton" onClick={onClose} className="popup__close-icon popup__close-icon_pic"><img src={closeIconPath} alt="Закрывающий крестик" className="popup__close-image" /></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__paragraph">{card.name}</p>
      </div>
    </section>
  );
}

export default ImagePopup;