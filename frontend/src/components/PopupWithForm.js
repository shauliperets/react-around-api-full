function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_open" : ""}`}>
      <div className={`popup__container popup__container_type_${props.name}`}>
        <form name={props.name} className={`popup__form popup__form_type_${props.name}`} onSubmit={props.handleSubmit}>
          <button
            className={`popup__close-button popup__close-button_type_${props.name}`}
            type="button"
            onClick={props.onClose}
          ></button>
          <h2 className="popup__title">{props.title}</h2>

          {props.children}

          <button type="submit" className={`popup__button popup__button_type_${props.name}`}>
            {props.button}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
