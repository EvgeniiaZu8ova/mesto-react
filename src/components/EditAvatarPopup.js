import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const { isOpen, onClose, onUpdateAvatar } = props;
  const avatarRef = React.useRef();

  const [buttonText, setButtonText] = React.useState('Сохранить');
  const [avatarError, setAvatarError] = React.useState('');
  const [isAvatarValid, setIsAvatarValid] = React.useState(true);
  const [isFormValid, setIsFormValid] = React.useState(false);

  // Функции для изменения текста на кнопке отправки
  function changeButtonText() {
    setButtonText('Сохранение...');
  }

  function resetButtonText() {
    setButtonText('Сохранить');
  }

  // Функция для сброса полей формы
  function resetInput() {
    avatarRef.current.value = '';
  }

  // Функция для валидации полей формы
  function handleAvatarInput(e) {
    setIsAvatarValid(e.target.validity.valid);
    if (!e.target.validity.valid) {
      setAvatarError(e.target.validationMessage);
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }

  // Обработчик отправки данных
  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value
    },
    changeButtonText,
    resetButtonText,
    resetInput
    );

    setIsFormValid(false);
  }

  // Функция для закрытия окна
  function closePopup() {
    onClose();
    resetInput();
    setIsAvatarValid(true);
    setIsFormValid(false);
  }

  return (
    <PopupWithForm isOpen={isOpen} name="avatar" onClose={closePopup} title="Обновить аватар" buttonText={buttonText} onSubmit={handleSubmit} isFormValid={isFormValid}>
      <input id="avatar-input" ref={avatarRef} onInput={handleAvatarInput} required type="url" name="avatar" placeholder="Ссылка на изображение"
      className={`popup__text ${isAvatarValid === false && "popup__text_type_error"}`} />
      <span className={`popup__text-error ${isAvatarValid === false && "popup__text-error_visible"}`}>{avatarError}</span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;