const { Category } = require('../models');

const findAll = async () => {
  const categories = await Category.findAll();
  return { status: 200, data: categories };
};

module.exports = {
  findAll,
};