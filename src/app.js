const express = require('express');
const { postsService } = require('./services');
const { userRouter, categoriesRouter } = require('./routes');
const loginController = require('./controllers');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.post('/login', loginController.loginController);

app.use('/user', userRouter);

app.use('/categories', categoriesRouter);

app.get('/post', authMiddleware, async (req, res) => {
  const { status, data } = await postsService.findAll();
  res.status(status).json(data);
});

app.get('/post/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postsService.findById(Number(id));
  res.status(status).json(data);
});

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
