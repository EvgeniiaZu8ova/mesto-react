import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);    
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="page">
      <div className="page__container">

        <Header />

        <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />

        <Footer />

        <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} name="edition" title="Редактировать профиль" buttonText="Сохранить">
          <input id="name-input" required type="text" name="userName" placeholder="Имя пользователя" minLength="2" maxLength="40" className="popup__text popup__text_input_name" />
          <span className="name-input-error popup__text-error"></span>
          <input id="job-input" required type="text" name="userJob" placeholder="Профессия пользователя" minLength="2" maxLength="200" className="popup__text popup__text_input_job" />
          <span className="job-input-error popup__text-error"></span>
        </PopupWithForm> 

        <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} name="addition" title="Новое место" buttonText="Создать">
          <input id="place-input" required type="text" name="name" placeholder="Название места" minLength="2" maxLength="30" className="popup__text popup__text_disabled popup__text_input_place" />
          <span className="place-input-error popup__text-error"></span>
          <input id="link-input" required type="url" name="link" placeholder="Ссылка на изображение" className="popup__text popup__text_disabled popup__text_input_link" />
          <span className="link-input-error popup__text-error"></span>
        </PopupWithForm> 

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm name="delition" title="Вы уверены?" buttonText="Да" />

        <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} name="change-avatar" title="Обновить аватар" buttonText="Сохранить">
          <input id="avatar-input" required type="url" name="avatar" placeholder="Ссылка на изображение" 
          className="popup__text popup__text_disabled popup__text_input_avatar-link" />
          <span className="avatar-input-error popup__text-error"></span>
        </PopupWithForm>

      </div>
    </div>
    
  );
}

export default App;
