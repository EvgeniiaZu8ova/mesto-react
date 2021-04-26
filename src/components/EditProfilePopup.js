import React from 'react';

import PopupWithForm from './PopupWithForm';

import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const { isOpen, onClose, onUpdateUser } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isNameValid, setIsNameValid] = React.useState(true);
  const [isAboutValid, setIsAboutValid] = React.useState(true);
  const [nameError, setNameError] = React.useState('');
  const [aboutError, setAboutError] = React.useState('');

  const [buttonText, setButtonText] = React.useState('Сохранить');
  const [isFormValid, setIsFormValid] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  React.useEffect(() => {
    resetButtonText();
  }, [isOpen]);

  // Функции для валидации полей формы
  function handleNameInput(e) {
    setIsNameValid(e.target.validity.valid);
    if (!e.target.validity.valid) {
      setNameError(e.target.validationMessage);
      setIsFormValid(false);
    } else if (description && isAboutValid) {
      setIsFormValid(true);
    }
  }

  function handleAboutInput(e) {
    setIsAboutValid(e.target.validity.valid);
    if (!e.target.validity.valid) {
      setAboutError(e.target.validationMessage);
      setIsFormValid(false);
    } else if (name && isNameValid) {
      setIsFormValid(true);
    }
  }

  // Функции для передачи данных стейт-переменным
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  // Функции для изменения текста на кнопке отправки
  function changeButtonText() {
    setButtonText('Сохранение...');
  }

  function resetButtonText() {
    setButtonText('Сохранить');
  }

  // Обработчик отправки данных
  function handleSubmit(e) {
    e.preventDefault();
    changeButtonText();
    setIsFormValid(false);

    onUpdateUser({
      userName: name,
      userJob: description
    })    
  }

  // Функция для закрытия окна
  function closePopup() {
    onClose();
    setName(currentUser.name);
    setDescription(currentUser.about);
    setIsNameValid(true);
    setIsAboutValid(true);
    setIsFormValid(false);
  }

  return (
    <PopupWithForm isOpen={isOpen} name="edition" onClose={closePopup} title="Редактировать профиль" buttonText={buttonText} onSubmit={handleSubmit} isFormValid={isFormValid}>
      <input id="name-input" value={name || ''} onInput={handleNameInput} onChange={handleNameChange} required type="text" name="userName" placeholder="Имя пользователя" minLength="2" maxLength="40" className={`popup__text ${isNameValid === false && "popup__text_type_error"}`} />
      <span className={`popup__text-error ${isNameValid === false && "popup__text-error_visible"}`}>{nameError}</span>
      <input id="job-input" value={description || ''} onInput={handleAboutInput} onChange={handleDescriptionChange} required type="text" name="userJob" placeholder="Профессия пользователя" minLength="2" maxLength="200" className={`popup__text ${isAboutValid === false && "popup__text_type_error"}`} />
      <span className={`popup__text-error ${isAboutValid === false && "popup__text-error_visible"}`}>{aboutError}</span>
    </PopupWithForm>  
  );
}

export default EditProfilePopup;