const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  
  try {
    const token = authorization.split(' ')[1];
    const validToken = jwt.verify(token, JWT_SECRET);
    if (validToken) {
      next();
    } else {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;
