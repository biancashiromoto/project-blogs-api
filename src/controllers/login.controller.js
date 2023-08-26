// const Joi = require('joi');
const jwt = require('jsonwebtoken');
const { loginService } = require('../services');

const { JWT_SECRET } = process.env;

const loginController = async (req, res) => {
  const { email, password } = req.body;
  await loginService(email, password);
  res.send('HELLOOOO');
};

module.exports = { loginController };
