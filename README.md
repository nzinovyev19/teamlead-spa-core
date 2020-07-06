# teamlead-spa-core

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
