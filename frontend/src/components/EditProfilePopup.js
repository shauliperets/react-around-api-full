import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [about, setAbout] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, props.isOpen]);

  function updateProfileName(event) {
    setName(event.target.value);
  }

  function updateProfileAbout(event) {
    setAbout(event.target.value);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      handleSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(name, about);
      }}
      title="Edit profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button={props.button}
    >
      <input
        id="popup_name"
        type="text"
        className="popup__input"
        placeholder="Name"
        required
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={(event) => updateProfileName(event)}
      />
      <div id="popup_name_error" className="popup__input-error"></div>
      <input
        id="popup_about_me"
        type="text"
        className="popup__input"
        placeholder="About me"
        required
        minLength="2"
        maxLength="200"
        value={about || ""}
        onChange={(event) => updateProfileAbout(event)}
      />
      <div id="popup_about_me_error" className="popup__input-error"></div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
