'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'blog_posts',
        key: 'id'
      },
      primaryKey: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id'
      },
      primaryKey: true
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories'
  });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'postId',
      otherKey: 'categoryId'
    });
    models.Category.belongsToMany(models.BlogPost, {
      through: PostCategory,
      as: 'categories',
      foreignKey: 'categoryId',
      otherKey: 'postId'
    });
  }

  return PostCategory;
};