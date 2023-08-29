const express = require('express');
const { postsController } = require('../controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const postsRouter = express.Router();

postsRouter.get('/', authMiddleware, postsController.findAll);
postsRouter.get('/:id', authMiddleware, postsController.findById);
postsRouter.post('/', authMiddleware, postsController.registerPost);

module.exports = postsRouter;
