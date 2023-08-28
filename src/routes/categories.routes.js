const express = require('express');
const { categoriesController } = require('../controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const categoriesRouter = express.Router();

categoriesRouter.get('/', authMiddleware, categoriesController.findAll);
categoriesRouter.post('/', authMiddleware, categoriesController.registerCategory);

module.exports = categoriesRouter;
