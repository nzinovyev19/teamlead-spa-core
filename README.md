# teamlead-spa-core

## Tasks
Тестовое задание “Аналог Medium”.
### Аутентификация.
Реализовать прототип аутентификации используя логин и пароль из базы данных.
Форма аутентификации должна валидироваться перед отправкой запроса. Для прототипа логин производится на фронте, подразумевается что Вы получите пользователя по полю email, сверите пароли и если они совпадают то “залогините” пользователя опираясь на его role.
Также должен быть реализован выход пользователя.
### Не залогиненный пользователь.
Не залогиненый пользователь может лишь просматривать посты, он не может ни создавать новые, ни “хлопать” за существующие.
### Читатель (role: reader).
Читатель не может создавать и редактировать существующие посты, но может хлопать за существующие, количество хлопков по типу Medium, не ограничено.
### Писатель (role: writer).
Писатель может создавать, редактировать и удалять свои посты, но не может “хлопать”.


## Test users
```
Writers: [
  {
    login: 'admin',
    password: '12345'
  },
  {
    login: 'writer',
    password: '12345',
  }
]
Readers: [
  {
    login: 'reader',
    password: '12345'
  }
]
```

## For run Project
```
npm install
json-server ./src/initDbData.js
npm run serve
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Run json-server
```
json-server ./src/initDbData.js
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
