const { User } = require('../models');

const findAll = async () => {
  const users = await User.findAll();
  return users;
};

module.exports = {
  findAll,
};