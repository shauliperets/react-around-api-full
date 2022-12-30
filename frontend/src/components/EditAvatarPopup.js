import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="edit-avatar"
      handleSubmit={(event) => {
        event.preventDefault();
        props.onSubmit(avatarRef.current.value);
      }}
      title="Update profile picture"
      isOpen={props.isOpen}
      onClose={props.onClose}
      button={props.button}
    >
      <input
        id="popup_avatar_link"
        className="popup__input"
        placeholder="Avatar link"
        type="url"
        ref={avatarRef}
        required
      />
      <div id="popup_avatar_link_error" className="popup__input-error"></div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
