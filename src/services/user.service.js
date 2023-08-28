const generateToken = require('../helpers/generateToken');
const { User, sequelize } = require('../models');
const { userSchema } = require('./validations/userSchema');

const findAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return { status: 'SUCCESSFUL', data: users };
};

const registerUser = async (user) => {
  const { error, value } = userSchema.validate(user);
  if (error) {
    return { status: 'INVALID_ENTRY', data: { message: error.message } };
  }

  const existingUser = await User.findOne({ where: { email: value.email } });
  
  if (existingUser) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  const result = await sequelize.transaction(async (transaction) => {
    const newUser = await User.create(value, { transaction });

    const token = generateToken(newUser);

    return { status: 'CREATED', data: { token } };
  });

  return result;
};

const findById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  return { status: 'SUCCESSFUL', data: user };
};

module.exports = {
  findAll,
  registerUser,
  findById,
};