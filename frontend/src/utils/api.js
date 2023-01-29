class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  getHeader(token) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this.getHeader(token),
    }).then((response) => this._checkResponse(response));
  }

  setUserInfo(token, username, userJob) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeader(token),
      body: JSON.stringify({
        name: username,
        about: userJob,
      }),
    }).then((response) => this._checkResponse(response));
  }

  setProfileImage(token, avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeader(token),
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((response) => this._checkResponse(response));
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this.getHeader(token),
    }).then((response) => this._checkResponse(response));
  }

  addCard(token, name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeader(token),
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

  deleteCard(token, id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.getHeader(token),
    }).then((response) => this._checkResponse(response));
  }

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Error: ${response.status}`);
  }
}

export const api = new Api({
  //baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
  baseUrl: "http://localhost:3200",
});
