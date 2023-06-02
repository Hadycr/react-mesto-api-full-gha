class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then(res => this._handleResponse(res))
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers
    })
      .then(res => this._handleResponse(res))
  }
  
  editUserInfo(data) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._handleResponse(res))
  }

  addCard(data) {
    return fetch(`${this.url}/cards `, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(res => this._handleResponse(res))
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: this.headers,
    })
      .then(res => this._handleResponse(res))
  }
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: this.headers,
    })
      .then(res => this._handleResponse(res))
  }

  editAvatar(data) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar,
      })
    }) 
      .then(res => this._handleResponse(res))
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-60',
  headers: {
    authorization: '51242091-e279-4218-b97f-74ae7ffdb364',
    'Content-Type': 'application/json'
  }
})