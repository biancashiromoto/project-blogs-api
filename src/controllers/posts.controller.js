const { postsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await postsService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await postsService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const registerPost = async (req, res) => {
  const user = req.user.sub;
  const { status, data } = await postsService.registerPost(req.body, user);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updatePost = async (req, res) => {
  const user = req.user.sub;
  const { id } = req.params;
  const { status, data } = await postsService.updatePost(req.body, user, id);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  registerPost,
  updatePost,
};