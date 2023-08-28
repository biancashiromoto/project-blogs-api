const httpStatus = {
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INVALID_VALUE: 422,
  INVALID_ENTRY: 400,
};

const mapStatusHTTP = (status) => httpStatus[status] || 500;

module.exports = mapStatusHTTP;