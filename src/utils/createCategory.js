const { PostCategory } = require('../models');

const createCategory = async (postId, categories, transaction) => {
  const promises = categories.map(async (category) => {
    await PostCategory.create({ postId, categoryId: category }, { transaction });
  });
  await Promise.all(promises);
};

module.exports = createCategory;