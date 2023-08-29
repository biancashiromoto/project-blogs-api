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
  const { status, data } = await postsService.registerPost(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  registerPost,
};