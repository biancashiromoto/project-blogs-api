const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await userService.findAll();
  console.log(data);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
};