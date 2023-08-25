const express = require('express');
const { User } = require('./models');

// ...

const app = express();

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

app.get('/user', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
})

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
