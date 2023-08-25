'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'categoriess'
  });
  return Categories;
};