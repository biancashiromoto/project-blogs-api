const { Category } = require('../models');

const categoriesExist = async (ids) => {
 const categories = await Category.findAll({ where: { id: ids } });
 return categories.length === ids.length;
};

module.exports = categoriesExist;