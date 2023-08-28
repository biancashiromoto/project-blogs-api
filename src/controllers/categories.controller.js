const { categoriesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (req, res) => {
  const { status, data } = await categoriesService.findAll();
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  findAll,
};