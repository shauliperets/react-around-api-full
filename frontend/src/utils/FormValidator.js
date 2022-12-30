/* Refactoring needed - see notes file */
export class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;

    this._inputs = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    this._button = this._formElement.querySelector(this._settings.submitButtonSelector);
  }

  resetValidation() {
    this._inputs.forEach((input) => {
      input.value = "";
      this._hideInputError(input);
    });

    this._toggleButtonState();
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}_error`);
    errorElement.textContent = input.validationMessage;
    input.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(`#${input.id}_error`);
    input.classList.remove(this._settings.inputErrorClass);
    errorElement.classList.remove(this._settings.errorClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._button.classList.add(this._settings.inactiveButtonClass);
      this._button.disabled = true;
    } else {
      this._button.classList.remove(this._settings.inactiveButtonClass);
      this._button.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);

        this._toggleButtonState();
      });

      this._formElement.addEventListener("submit", (event) => {
        event.preventDefault();
      });
    });
  }

  enableValidation() {
    this._toggleButtonState();
    this._setEventListeners();
  }
}
