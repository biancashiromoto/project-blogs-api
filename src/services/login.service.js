const { User } = require('../models');
const generateToken = require('../helpers/generateToken');

const unauthenticated = {
  status: 'UNAUTHENTICATED',
  data: { message: 'Invalid fields' },
};

const loginService = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user || user.password !== password) {
    return unauthenticated;
  }

  const token = generateToken(user);

  return ({
    status: 'SUCCESSFUL',
    data: { token },
  });
};

module.exports = loginService;