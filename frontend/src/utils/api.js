class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  setUserInfo(username, userJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        about: userJob,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setProfileImage(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((response) => this._checkResponse(response));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((response) => this._checkResponse(response));
  }

  addRemoveLike(id, isliked) {
    if (isliked) {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "DELETE",
        headers: this._headers,
      }).then((response) => this._checkResponse(response));
    } else {
      return fetch(`${this._baseUrl}/cards/likes/${id}`, {
        method: "PUT",
        headers: this._headers,
      }).then((response) => this._checkResponse(response));
    }
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((response) => this._checkResponse(response));
  }

  _checkResponse(response) {
    if (response.ok) return response.json();

    return Promise.reject(`Error: ${response.status}`);
  }
}

export const api = new Api({
  baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  headers: {
    authorization: "7c286de8-6d0b-40ef-bc6e-36b7a6f017e2",
    "Content-Type": "application/json",
  },
});
