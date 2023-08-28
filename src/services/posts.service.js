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
  return { status: 'SUCCESSFUL', data: posts };
};

const findById = async (id) => {
  const post = await BlogPost.findByPk(id, {
    include: [
      {
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
  });

  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  
  return { status: 'SUCCESSFUL', data: post };
};

module.exports = {
  findAll,
  findById,
};