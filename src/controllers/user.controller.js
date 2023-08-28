const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await userService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await userService.findById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const registerUser = async (req, res) => {
  const { status, data } = await userService.registerUser(req.body);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
  findById,
  registerUser,
};