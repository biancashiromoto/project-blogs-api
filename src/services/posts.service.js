const { BlogPost, User, Category, sequelize } = require('../models');
const categoriesExist = require('../utils/categoriesExist');
const createCategory = require('../utils/createCategory');
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

const registerPost = async (postInfo, userId) => {
  const { title, content, categoryIds } = postInfo;
  const { error } = postSchema.validate(postInfo);
  
  if (error) return { status: 'INVALID_ENTRY', data: { message: error.message } };
  
  const allCategoriesExist = await categoriesExist(categoryIds);
  
  if (!allCategoriesExist) {
    return { status: 'INVALID_ENTRY', data: { message: 'one or more "categoryIds" not found' } };
  }
  
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const newPost = { title, content, userId, updated: new Date(), published: new Date() };
      const createdPost = await BlogPost.create(newPost, { transaction });
      await createCategory(postInfo, categoryIds, transaction);
      return { status: 'CREATED', data: createdPost };
    });
    return result;
  } catch (err) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: err.message } };
  }
};

module.exports = {
  findAll,
  findById,
  registerPost,
};