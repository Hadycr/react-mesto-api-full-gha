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
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => this._handleResponse(res))
  }

  getInitialCards() {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/cards`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => this._handleResponse(res))
  }
  
  editUserInfo({name, about}) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => this._handleResponse(res))
  }

  addCard({name, link}) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/cards `, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => this._handleResponse(res))
  }

  deleteCard(cardId) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    })
      .then(res => this._handleResponse(res))
  }
  changeLikeCardStatus(cardId, isLiked) {
    const token = localStorage.getItem('token');

    return fetch(`${this.url}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(res => this._handleResponse(res))
  }

  editAvatar({avatar}) {
    const token = localStorage.getItem('token');
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      })
    }) 
      .then(res => this._handleResponse(res))
  }
}

export const api = new Api({
  baseUrl: 'https://api.yakovleva.nomoredomains.rocks',
  headers: {
    // authorization: '51242091-e279-4218-b97f-74ae7ffdb364',
    Accept: "application/json",
  }
})