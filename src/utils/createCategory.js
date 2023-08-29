const { PostCategory } = require('../models');

const createCategory = async (post, categories) => {
  const promises = categories.map(async (category) => {
    await PostCategory.create({ post, categoryId: category });
  });
  await Promise.all(promises);
};

module.exports = createCategory;