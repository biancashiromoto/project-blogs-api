const { User, sequelize } = require('../models');
const { userSchema } = require('./validations/schemas');

const findAll = async () => {
  const users = await User.findAll();
  return users;
};

const registerUser = async (user) => {
  const { error, value } = userSchema.validate(user);
  if (error) {
    return { status: 400, data: { message: error.message } };
  }

  const result = await sequelize.transaction(async (transaction) => {
    const newUser = await User.create(value, { transaction });
    return { status: 201, data: newUser.dataValues };
  });

  return result;
};

module.exports = {
  findAll,
  registerUser,
};