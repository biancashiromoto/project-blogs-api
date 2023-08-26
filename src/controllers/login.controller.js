// const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  res.send('HELLOOOO');
};

module.exports = { login };
