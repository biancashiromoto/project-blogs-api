const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { JWT_SECRET } = process.env;

const unauthenticated = {
  status: 'UNAUTHENTICATED',
  data: { message: 'Invalid fields' },
};

const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  console.log(user);
  if (!user || user.password !== password) {
    return unauthenticated;
  }
  const jwtPayload = {
    sub: user.id,
  };

  const token = jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return ({
    status: 'SUCCESS',
    data: { token },
  });
};

module.exports = loginService;