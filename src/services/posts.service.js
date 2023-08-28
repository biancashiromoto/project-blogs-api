const { BlogPost } = require('../models');

const findAll = async () => {
  const posts = await BlogPost.findAll();
  return posts;
};

module.exports = {
  findAll,
};