import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  function updateTitle(event) {
    setTitle(event.target.value);
  }

  function updateLink(event) {
    setLink(event.target.value);
  }

  React.useEffect(() => {
    setTitle("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="create-card"
      handleSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(title, link);
      }}
      title="New place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button={props.button}
    >
      <input
        id="popup_title"
        type="text"
        className="popup__input"
        placeholder="Title"
        required
        minLength="1"
        maxLength="30"
        value={title || ""}
        onChange={updateTitle}
      />
      <div id="popup_title_error" className="popup__input-error"></div>
      <input
        id="popup_link"
        className="popup__input"
        placeholder="Image link"
        type="url"
        value={link || ""}
        onChange={updateLink}
        required
      />
      <div id="popup_link_error" className="popup__input-error"></div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
