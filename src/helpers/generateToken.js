const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const generateToken = (subject) => {
    const jwtPayload = {
    sub: subject.id,
  };

  const token = jwt.sign(jwtPayload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '7d',
  });

  return token;
};

module.exports = generateToken;