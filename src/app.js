const express = require('express');
const { User, Category } = require('./models');
const { login } = require('./controllers');

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/user', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

app.get('/categories', async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
});

console.log(login);
app.post('/login', login);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
