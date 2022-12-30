import editButton from "../images/edit-button.svg";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__image-container">
          <img src={currentUser.avatar} alt="Profile image" className="profile__image" />
          <div className="profile__edit-avatar" onClick={props.onEditAvatarClick}></div>
        </div>
        <div className="profile__content">
          <div className="profile__title-panel">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={props.onEditProfileClick}>
              <img className="profile__edit-image" src={editButton} alt="Edit button" />
            </button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            data={card}
            id={card._id}
            ownerId={card.owner._id}
            title={card.name}
            link={card.link}
            likes={card.likes}
            userId={props.userId}
            onDeleteCard={props.onCardDelete}
            onCardClick={props.onCardClick}
            onLikeClick={props.onCardLike}
            isLiked={props.isLiked}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
