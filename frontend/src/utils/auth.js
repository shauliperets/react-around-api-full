//export const BASE_URL = "https://register.nomoreparties.co";
export const BASE_URL = "http://localhost:3200";

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then((response) => {
    return _checkResponse(response);
  });
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": BASE_URL,
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return _checkResponse(response);
    })
    .then((data) => {
      if (data.data) {
        localStorage.setItem("token", data.data);
        return data;
      } else {
        return;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((response) => {
    return _checkResponse(response);
  });
};

function _checkResponse(response) {
  if (response.ok) return response.json();

  return Promise.reject(`Error: ${response.status}`);
}
