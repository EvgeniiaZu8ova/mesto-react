import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const { card, onCardClick, onCardLike, onApproveDelition, onPickDeletedCard } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (`article__delete-button ${isOwn && 'article__delete-button_active'}`);
  const cardLikeButtonClassName = (`article__like-button ${isLiked && 'article__like-button_active'}`);

  function handleClick() {
    onCardClick(card);
  }

  function handleLike() {
    onCardLike(card);
  }

  function handleApproveDelete() {
    onApproveDelition();
    onPickDeletedCard(card);
  }

  return (
    <div className="article">
      <img src={card.link} alt={card.name} onClick={handleClick} className="article__image" />
      <button type="button" name="deleteButton" className={cardDeleteButtonClassName} onClick={handleApproveDelete}></button>
      <div className="article__bottom-part">
        <h2 className="article__name">{card.name}</h2>
        <div className="article__like-field">
          <button type="button" name="likeButton" className={cardLikeButtonClassName} onClick={handleLike}></button>
          <p className="article__like-quantity">{card.likes.length}</p>
        </div>         
      </div>
    </div>
  );
}

export default Card;