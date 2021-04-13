import React from 'react';

import closeIconPath from '../images/close_icon.svg';

function PopupWithForm(props) {
  const { isOpen, name, onClose, title, children, buttonText } = props;

  return (
    <section className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <button type="button" name="closeButton" onClick={onClose} className="popup__close-icon"><img src={closeIconPath} alt="Закрывающий крестик" className="popup__close-image" /></button>
      <form noValidate name={`${name}-form`} className={`popup__container popup__container_${name}`}>
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="submit" name="submitButton" className={`popup__button popup__button_${name}`}>{buttonText}</button>
      </form>
    </section>    
  );
}

export default PopupWithForm;