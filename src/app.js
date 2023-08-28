const express = require('express');
const { json } = require('sequelize');
const { userService, categoriesService, postsService } = require('./services');
const { loginController } = require('./controllers');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginController);

app.get('/user', authMiddleware, async (req, res) => {
  const { status, data } = await userService.findAll();
  res.status(status).json(data);
});

app.post('/user', async (req, res) => {
  const { status, data } = await userService.registerUser(req.body);
  if (status === 400) return res.status(status).json(data);
  if (status === 409) return res.status(status).json(data);
  res.status(status).json({ token: data });
});

app.get('/categories', authMiddleware, async (req, res) => {
  const { status, data } = await categoriesService.findAll();
  res.status(status).json(data);
});

app.get('/post', authMiddleware, async (req, res) => {
  const { status, data } = await postsService.findAll();
  res.status(status).json(data);
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
