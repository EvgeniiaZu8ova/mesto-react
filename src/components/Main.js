import React from 'react';

import editImagePath from '../images/pen.svg';
import addButtonPath from '../images/add_button.svg';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
    const { onEditAvatar, onEditProfile, onAddPlace, onCardClick } = props;

    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
      api.getUserInfo()
        .then((res) => {
          setUserName(res.name);
          setUserDescription(res.about);
          setUserAvatar(res.avatar);
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

    return(
    <main className="content">
    <section className="profile">
      <div className="profile__avatar" onClick={onEditAvatar}>
        <img src={userAvatar} alt="Фотография профиля" className="profile__photo" />
        <div className="profile__shadow">
          <img src={editImagePath} alt="Перо" className="profile__edit-image" />
        </div>
      </div>
      <div className="profile__info">
        <div className="profile__edition">
          <h1 className="profile__title">{userName}</h1>
          <button type="button" name="editButton" className="profile__button profile__button_edit" onClick={onEditProfile}></button>
        </div>
        <p className="profile__subtitle">{userDescription}</p>
      </div>
      <button type="button" name="addButton" className="profile__button profile__button_add" onClick={onAddPlace}><img src={addButtonPath} alt="Кнопка добавления" className="profile__icon" /></button>
    </section>

    <section className="elements">
      {cards.map((el, i) => (
        <div key={el._id}>
          <Card card={el} onCardClick={onCardClick} />
        </div>
      ))}
    </section>
  </main>
  );
}

export default Main;