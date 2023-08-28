const { BlogPost, User } = require('../models');

const findAll = async () => {
  const posts = await BlogPost.findAll(
    { 
      attributes: { exclude: ['user_id'] },
      include: {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
    },
  );
  return posts;
};

module.exports = {
  findAll,
};