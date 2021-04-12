function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="article">
      <img src={props.card.link} alt={props.card.name} onClick={handleClick} className="article__image" />
      <button type="button" name="deleteButton" className="article__delete-button"></button>
      <div className="article__bottom-part">
        <h2 className="article__name">{props.card.name}</h2>
        <div className="article__like-field">
          <button type="button" name="likeButton" className="article__like-button"></button>
          <p className="article__like-quantity">{props.card.likes.length}</p>
        </div>         
      </div>
    </div>
  );
}

export default Card;