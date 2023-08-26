const { Category } = require('../models');

const findAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
  findAll,
};