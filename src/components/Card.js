import React from 'react';

function Card(props) {
  const { card, onCardClick } = props;

  function handleClick() {
    onCardClick(card);
  }

  return (
    <div className="article">
      <img src={card.link} alt={card.name} onClick={handleClick} className="article__image" />
      <button type="button" name="deleteButton" className="article__delete-button"></button>
      <div className="article__bottom-part">
        <h2 className="article__name">{card.name}</h2>
        <div className="article__like-field">
          <button type="button" name="likeButton" className="article__like-button"></button>
          <p className="article__like-quantity">{card.likes.length}</p>
        </div>         
      </div>
    </div>
  );
}

export default Card;