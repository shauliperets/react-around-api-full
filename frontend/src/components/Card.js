import React from "react";
import whiteHeartIcon from "../images/heart.svg";
import blackHeartIcon from "../images/heart-black.svg";
import binIcon from "../images/delete-icon.svg";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  function isOwned(ownerId) {
    return currentUser._id === ownerId;
  }

  return (
    <div className="card" card_id={props.id}>
      <button
        className={isOwned(props.ownerId) ? "card__delete-button card__delete-button_active" : "card__delete-button"}
        type="button"
        onClick={() => {
          props.onDeleteCard(props.id);
        }}
      >
        <img src={binIcon} alt="Delete card" />
      </button>
      <img src={props.link} alt={props.title} className="card__image" onClick={props.onCardClick} />
      <div className="card__title-panel">
        <h2 className="card__title">{props.title}</h2>
        <div className="card__like-container">
          <button
            className="card__like-button"
            type="button"
            onClick={() => {
              props.onLikeClick(props.data);
            }}
          >
            <img
              src={props.isLiked(props.likes, currentUser._id) ? blackHeartIcon : whiteHeartIcon}
              className="card__icon"
              alt="Heart icon"
            />
          </button>
          <div className="card__like-counter">{props.likes.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Card;
