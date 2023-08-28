const { BlogPost, User, Category } = require('../models');

const findAll = async () => {
  const posts = await BlogPost.findAll(
    { 
      attributes: { exclude: ['user_id'] },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] },
      },
    ],
    },
  );
  return posts;
};

module.exports = {
  findAll,
};