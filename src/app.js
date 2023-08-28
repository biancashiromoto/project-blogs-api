const express = require('express');
const { userRouter, categoriesRouter, postsRouter } = require('./routes');
const loginController = require('./controllers');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginController.loginController);

app.use('/user', userRouter);

app.use('/categories', categoriesRouter);

app.use('/post', postsRouter);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
