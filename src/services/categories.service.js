const { Category, sequelize } = require('../models');
const { categorySchema } = require('./validations/categorySchema');

const findAll = async () => {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
};

const registerCategory = async (category) => {
  const { error, value } = categorySchema.validate(category);
  if (error) {
    return { status: 'INVALID_ENTRY', data: { message: error.message } };
  }
  const result = await sequelize.transaction(async (transaction) => {
    const newCategory = await Category.create(value, { transaction });
    return { status: 'CREATED', data: newCategory };
  });

  return result;
};

module.exports = {
  findAll,
  registerCategory,
};