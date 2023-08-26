const express = require('express');
const { userService, categoriesService } = require('./services');
const { loginController } = require('./controllers');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/user', async (req, res) => {
  const users = await userService.findAll();
  res.json(users);
});

app.get('/categories', async (req, res) => {
  const categories = await categoriesService.findAll();
  res.json(categories);
});

app.post('/login', loginController);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
