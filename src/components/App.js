import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ApproveDeleteCardPopup from './ApproveDeleteCardPopup';
import api from '../utils/api';

import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isApproveCardDeletePopupOpen, setIsApproveCardDeletePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [deletedCard, setDeletedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  // Загрузка на страницу данных пользователя и карточек с сервера при запуске приложения
  React.useEffect(() => {
    api.getUserInfo()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log('Ошибка при загрузке данных пользователя', err.message);
      });

    api.getInitialCards()
      .then((res) => {
        setCards(res);
      })
      .catch(err => {
        console.log('Ошибка при загрузке карточек', err.message);
      });

  },
  []);

  // Функции открытия модальных окон
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);    
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleApproveDelitionClick() {
    setIsApproveCardDeletePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Функции закрытия модальных окон
  function closeEditAvatarPopup() {
    setIsEditAvatarPopupOpen(false);
  }

  function closeEditProfilePopup() {
    setIsEditProfilePopupOpen(false);
  }

  function closeAddPlacePopup() {
    setIsAddPlacePopupOpen(false);
  }

  function closeApproveCardDeletePopup() {
    setIsApproveCardDeletePopupOpen(false);
  }

  function closeImagePopup() {
    setSelectedCard({});
  }

  // Функции для обновления данных пользователя
  function handleUpdateUser(data, changeButton, resetButton) {
    changeButton();
    api.editUserInfo(data)
      .then((user) => {
        setCurrentUser(user);
        resetButton();
        closeEditProfilePopup();
      })
      .catch(err => {
        console.log('Ошибка при попытке обновить данные пользователя', err.message, data);
      });
  }

  function handleUpdateAvatar(data, changeButton, resetButton, resetInput) {
    changeButton();
    api.changeUserAvatar(data)
      .then((user) => {
        setCurrentUser(user);
        resetButton();
        resetInput();
        closeEditAvatarPopup();
      })
      .catch(err => {
        console.log('Ошибка при попытке обновить фотографию пользователя', err.message);
      });
  }

  // Функция для добавления новой карточки
  function handleAddPlaceSubmit(card, changeButton, resetButton, resetInput) {
    changeButton();
    api.addNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        resetButton();
        resetInput();
        closeAddPlacePopup();
      })
      .catch(err => {
        console.log('Ошибка при попытке добавить новую карточку', err.message);
      });
  }

  // Сохранение объекта карточки, на иконку удаления которой нажали
  function handlePickDeletedCard(card) {
    setDeletedCard(card);
  }

  // Функция для обработки лайков (добавить или убрать лайк, в заисимости от того, лайкали ли Вы эту карточку ранее)
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) {
      api.removeLikeFromCard(card._id)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log('Ошибка при попытке поставить/убрать лайк карточке', err.message);
      })
    } else {
      api.putLikeOnCard(card._id)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => {
        console.log('Ошибка при попытке поставить/убрать лайк карточке', err.message);
      })
    }
  }

  // Функция для удаления карточки
  function handleCardDelete(card, changeButton, resetButton) {
    const isOwn = card.owner._id === currentUser._id;
    if (isOwn) {
      changeButton();
      api.deleteCard(card._id)
        .then(() => {
          setCards((cards) => cards.filter((c) => c._id !== card._id));
          resetButton();
          closeApproveCardDeletePopup();
        })
        .catch(err => {
          console.log('Ошибка при попытке удалить карточку', err.message);
        });
    }
    return undefined;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
      <div className="page__container">

        <Header />

        <Main cards={cards} onCardLike={handleCardLike} onApproveDelition={handleApproveDelitionClick} onPickDeletedCard={handlePickDeletedCard} onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeEditProfilePopup} onUpdateUser={handleUpdateUser} />

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAddPlacePopup} onAddPlace={handleAddPlaceSubmit} /> 

        <ImagePopup card={selectedCard} onClose={closeImagePopup} />

        <ApproveDeleteCardPopup card={deletedCard} isOpen={isApproveCardDeletePopupOpen} onClose={closeApproveCardDeletePopup} onApproveDelition={handleCardDelete} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeEditAvatarPopup} onUpdateAvatar={handleUpdateAvatar} />

      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
