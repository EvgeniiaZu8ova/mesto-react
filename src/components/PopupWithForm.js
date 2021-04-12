import closeIconPath from '../images/close_icon.svg';

function PopupWithForm(props) {
  return (
    <section className={props.isOpen ? `popup popup_opened popup_${props.name}` : `popup popup_${props.name}`}>
      <button type="button" name="closeButton" onClick={props.onClose} className="popup__close-icon"><img src={closeIconPath} alt="Закрывающий крестик" className="popup__close-image" /></button>
      <form noValidate name={`${props.name}-form`} className={`popup__container popup__container_${props.name}`}>
        <h2 className="popup__title">{props.title}</h2>
        {props.children}
        <button type="submit" name="submitButton" className={`popup__button popup__button_${props.name}`}>Сохранить</button>
      </form>
    </section>    
  );
}

export default PopupWithForm;