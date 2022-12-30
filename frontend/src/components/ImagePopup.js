function ImagePopup(props) {
  return (
    <div className={`popup popup_float-image ${props.isOpen ? "popup_open" : ""}`}>
      <div className="popup__container popup__container_type_float-image">
        <div className="popup__image-container">
          <button
            className="popup__close-button popup__close-button_type_float-image"
            type="button"
            onClick={props.onClose}
          ></button>
          <img
            src={props.card.src}
            alt="Image selected card popup"
            className="popup__image popup__image_type_float-image"
          />
        </div>
        <div className="popup__image-description">{props.card.alt}</div>
      </div>
    </div>
  );
}

export default ImagePopup;
