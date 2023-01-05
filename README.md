# Сервис по поиску фильмов. Серверная часть.

<img src="https://media.giphy.com/media/2XflxzDAw5pn6WaA372/giphy.gif" width="400" height="400">

Дипломная работа предсталяет собой сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.

## В API должно быть 7 роутов: <img src="https://media.giphy.com/media/l4vdxJO98HZpLbtb2c/giphy.gif" width="90" height="90">

- возвращает информацию о пользователе (email и имя)

  **GET /users/me**

- обновляет информацию о пользователе (email и имя)

  **PATCH /users/me**

- возвращает все сохранённые текущим пользователем фильмы

  **GET /movies**

- создаёт фильм с переданными в теле country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId

  **POST /movies**

- удаляет сохранённый фильм по id

  **DELETE /movies/\_id**

- создаёт пользователя с переданными в теле email, password и name

  **POST /signup**

- проверяет переданные в теле почту и пароль и возвращает JWT

  **POST /signin**

  ## Стек: <img src="https://media.giphy.com/media/lhPfjSaW3bir1xMTSW/giphy.gif" width="90" height="90">

  - Node.js
  - Express
  - MongoDB

  ## Ссылки: <img src="https://media.giphy.com/media/aBvoLqP0XpA2J1aiFq/giphy.gif" width="90" height="90">

  - IP: 158.160.35.0
  - Домен сервера: https://api.movies-gudkova.nomoredomains.club
