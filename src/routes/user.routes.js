const express = require('express');
const { userController } = require('../controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const userRouter = express.Router();

userRouter.get('/', authMiddleware, userController.findAll);
userRouter.get('/:id', authMiddleware, userController.findById);
userRouter.post('/', userController.registerUser);

module.exports = userRouter;