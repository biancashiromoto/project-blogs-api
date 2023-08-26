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

app.post('/user', async (req, res) => {
  const { status, data } = await userService.registerUser(req.body);
  if (status === 400) return res.status(status).json(data);
  res.status(status).json({ token: data });
});

app.get('/categories', async (req, res) => {
  const categories = await categoriesService.findAll();
  res.json(categories);
});

app.post('/login', loginController);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
