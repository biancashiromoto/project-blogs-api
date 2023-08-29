const { BlogPost, User, Category, sequelize } = require('../models');
const categoriesExist = require('../utils/categoriesExist');
const findUser = require('../utils/findUser');
const postSchema = require('./validations/postSchema');

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

const registerPost = async (post) => {
  const { categoryIds } = post;
  const { error, value } = postSchema.validate(post);
  if (error) return { status: 'INVALID_ENTRY', data: { message: error.message } };
  
  const allCategoriesExist = await categoriesExist(categoryIds);
    if (!allCategoriesExist) {
      return { status: 'INVALID_ENTRY', data: { message: 'one or more "categoryIds" not found' } };
    }
    
  const result = await sequelize.transaction(async (transaction) => {
    const currDate = new Date();
    const newPost = await BlogPost.create(value, { transaction });
    newPost.updated = currDate;
    newPost.published = currDate;
    return { status: 'CREATED', data: newPost };
  });
  return result;
};

module.exports = {
  findAll,
  findById,
  registerPost,
};