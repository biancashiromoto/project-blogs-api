const { BlogPost, User, Category, sequelize } = require('../models');
const categoriesExist = require('../utils/categoriesExist');
const createCategory = require('../utils/createCategory');
const newPostSchema = require('./validations/newPostSchema');
const updatePostSchema = require('./validations/updatePostSchema');

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
  const { error } = newPostSchema.validate(postInfo);
  
  if (error) return { status: 'INVALID_ENTRY', data: { message: error.message } };
  
  const allCategoriesExist = await categoriesExist(categoryIds);
  
  if (!allCategoriesExist) {
    return { status: 'INVALID_ENTRY', data: { message: 'one or more "categoryIds" not found' } };
  }
  
  try {
    const result = await sequelize.transaction(async (transaction) => {
      const newPost = { title, content, userId, updated: new Date(), published: new Date() };
      const createdPost = await BlogPost.create(newPost, { transaction });
      await createCategory(createdPost.id, categoryIds, transaction);
      return { status: 'CREATED', data: createdPost };
    });
    return result;
  } catch (err) {
    return { status: 'INTERNAL_SERVER_ERROR', data: { message: err.message } };
  }
};

const updatePost = async (postInfo, userId, postId) => {
  const { title, content } = postInfo;
  const post = await BlogPost.findByPk(postId);

  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  if (post.userId !== userId) {
    return { status: 'UNAUTHORIZED', data: { message: 'Unauthorized user' } };
  }
  
  const { error } = updatePostSchema.validate(postInfo);

  if (error) return { status: 'INVALID_ENTRY', data: { message: error.message } };

  await BlogPost.update(postInfo, { where: { id: postId } });
  const updatedPost = await BlogPost.findOne({ where: { id: postId },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ] });
  return { status: 'SUCCESSFUL', data: updatedPost };
};

module.exports = {
  findAll,
  findById,
  registerPost,
  updatePost,
};